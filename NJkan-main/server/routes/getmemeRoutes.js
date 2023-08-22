import express from 'express'
const router = express.Router()
import {getAllMemes} from '../controllers/getMemesController.js'

router.route('/allmemes').get(getAllMemes)





export default router