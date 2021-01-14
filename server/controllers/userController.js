import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

const getAll = asyncHandler(async (req, res, next) => {
    const page = +req.query.page || 1
    const pageSize = +req.query.size || 10

    const count = await User.getUserCount()

    const users = await User.getAll((page - 1) * pageSize, pageSize)

    res.json({users, page, pages: Math.ceil(count / pageSize)})
})

export {getAll}