import express from 'express'
import * as configurationController from "../controllers/configuration";

const router = express.Router()

router.post("/", configurationController.create)

export default router