import express from "express";
import airplaneRoutes from  './airplanes'
import configurationRoutes from './configuration'

const router = express.Router()

router.use('/airplane', airplaneRoutes)
router.use('/configuration', configurationRoutes)

export default router