import database from '../database/connect.js'

//{"id":1,"first_name":"Christie","last_name":"Gann","email":"cgann0@hostgator.com","gender":"Female","ip_address":"57.14.195.231"}
//{"user_id":390,"date":"2019-10-02","page_views":693,"clicks":588}
class User {
    static async getAll(limit = null, offset = null) {
        return new Promise(((resolve, reject) => {
            let request = `SELECT user.id,
                                  user.first_name,
                                  user.last_name,
                                  user.email,
                                  user.gender,
                                  user.ip_address,
                                  SUM(users_stat.page_views) as total_views,
                                  SUM(users_stat.clicks)     as total_clicks
                           FROM user
                                    INNER JOIN users_stat ON user.id = users_stat.user_id
                           GROUP BY user.id`

            if (limit !== null) {
                request += ` LIMIT ${limit}`
                if (offset !== null) request += ` OFFSET ${offset}`
            }

            database.all(request, (err, data) => {
                if (err) reject(err)
                else resolve(data)
            })
        }))
    }

    static async getById(uid, dateFrom = null, dateTo = null) {
        return new Promise(((resolve, reject) => {

            const requestUser = database.prepare(`SELECT first_name, last_name
                                                  FROM user
                                                  WHERE id = ?`)
            requestUser.get([uid], (err, user) => {
                if (err) reject(err)
                else {
                    let requestUsersStat = `SELECT date, page_views, clicks
                                              FROM users_stat
                                              WHERE user_id = ${uid}`
                    if (dateFrom && dateTo) {
                        requestUsersStat += ` AND date BETWEEN '${dateFrom}' AND '${dateTo}'`
                    }
                    database.all(requestUsersStat, (err, statList) => {
                        if (err) reject(err)
                        else {
                            resolve({
                                first_name: user.first_name,
                                last_name: user.last_name,
                                stat: statList
                            })
                        }
                    })
                }
            })
        }))
    }

    static async getUserCount() {
        return new Promise(((resolve, reject) => {
            database.get('SELECT COUNT(*) FROM user;', (err, data) => {
                if (err) reject(err)
                else resolve(data['COUNT(*)'])
            })
        }))
    }
}

export default User