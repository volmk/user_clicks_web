import express from "express"
import {getUser, getUserList} from "../controllers/userController.js"


const router = express.Router()

router.route('/')
    .get(getUserList)

router.route('/:uid')
    .get(getUser)

export default router