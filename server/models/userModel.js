import database from '../database/connect.js'

class User {
    static async getAll(offset = null, limit = null) {
        return new Promise(((resolve, reject) => {
            let request = 'SELECT * FROM user'
            if (limit) request += ` LIMIT ${limit}`
            if (offset) request += ` OFFSET ${offset}`
            console.log(request)
            database.all(request, (err, data) => {
                if (err) reject(err)
                else resolve(data)
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