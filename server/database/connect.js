import path from 'path'
import fs from 'fs'
import sqlite3 from 'sqlite3'

const __dirname = path.resolve()
const db = new sqlite3.Database(path.resolve(__dirname, 'db.sqlite'));

const onErr = (err) => {
    if (err) {
        console.log(err.message)
        throw err
    }
}

const createAndInsert = (tableName, createReq, filename, insertReq) => {
    db.get(`SELECT name FROM sqlite_master  WHERE type='table' AND name='${tableName}'`, (err, data) => {
        onErr(err)
        if (data) return
        db.run(createReq, (err) => {
            onErr(err)
            const jsonData = fs.readFileSync(path.resolve(__dirname, filename), 'utf-8')
            const dataList = JSON.parse(jsonData)
            const stmt = db.prepare(insertReq)

            db.serialize(() => {
                db.run("begin transaction");

                for (const item of dataList) {
                    stmt.run(Object.values(item))
                }

                stmt.finalize();
                db.run("commit");
            })
        })
    })
}

const createUserTableReq = 'CREATE TABLE user (\
                id INTEGER PRIMARY KEY AUTOINCREMENT,\
                first_name text, \
                last_name text, \
                email text UNIQUE, \
                gender text, \
                ip_address text \
                )'

const createUserStatTableReq = 'CREATE TABLE users_stat (\
                user_id INTEGER, \
                date DATE, \
                page_views INTEGER, \
                clicks INTEGER \
                )'

createAndInsert(
    'user',
    createUserTableReq,
    'data/users.json',
    'INSERT INTO user (id, first_name, last_name, email, gender, ip_address) VALUES (?,?,?,?,?,?)'
)

createAndInsert(
    'users_stat',
    createUserStatTableReq,
    'data/users_statistic.json',
    'INSERT INTO users_stat (user_id, date, page_views, clicks) VALUES (?,?,?,?)'
)

const closeDatabase = () => {
    db.close()
}

export { db as default, closeDatabase }
