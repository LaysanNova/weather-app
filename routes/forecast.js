import express from "express";
import {getForecast} from "../controller/forecast.js";

const router = express.Router();

router.get("/", getForecast);
// router.post("/", postUsers);
// router.delete("/", deleteUsers);
// router.get("/:id", getUserById);
// router.delete("/:id", deleteUserById);
// router.patch("/:id", patchUserById);

export default router;


