import express from "express";
import * as airplaneController from "../controllers/airplane";

const router = express.Router();

router.get("/", airplaneController.load);
router.get("/manufacturer/:manufacturer", airplaneController.loadByManufacturer);
router.get("/name/:name", airplaneController.loadByName);

export default router;