import {Router} from "express";
import {getAllItems} from "../controller/itemController";

export const router = Router();

router.get("/", getAllItems);
