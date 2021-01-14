import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

const getUserList = asyncHandler(async (req, res, next) => {
    let page = +req.query.page || 1
    const pageSize = +req.query.size || 50 //limit

    const count = await User.getUserCount()
    const maxPage = Math.ceil(count / pageSize)

    if(page < 1) page = 1
    else if (page > maxPage + 1) page = maxPage

    const users = await User.getAll(pageSize, (page - 1) * pageSize)

    res.json({users, page, maxPage})
})

const isValidDate = (dateStr) => {
    const date = new Date(dateStr)
    if (isNaN(date.getTime())) return false

    const pad = num => num.toString().padStart(2, '0')

    const newDateStr = date.getFullYear() + '-' + pad(date.getMonth() + 1) + '-' + pad(date.getDate())
    return newDateStr === dateStr
}

const getUser = asyncHandler(async (req, res, next) => {
    const uid = +req.params.uid
    const dateFrom = req.query.dateFrom
    const dateTo = req.query.dateTo

    if (dateFrom && !isValidDate(dateFrom)) {
        res.status(400)
        throw new Error('invalid date from')
    }

    if (dateTo && !isValidDate(dateTo)) {
        res.status(400)
        throw new Error('invalid date to')
    }

    if (dateFrom && dateTo && new Date(dateFrom) > new Date(dateTo)){
        res.status(400)
        throw new Error('invalid dates')
    }

    const user = await User.getById(uid, dateFrom, dateTo)

    if (user) {
        res.json(user)
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})


export {getUserList, getUser}