import {Router} from "express";
import {validateInput} from "../validation/validator";
import {addNewCategory, formCategory, categories} from "../controller/categoryController";
import {filterItem} from "../controller/itemController"

export const category = Router();

category.get("/form", formCategory);

category.get("/filter/components/", filterItem)

category.route("/category/new").post(validateInput, addNewCategory) 
category.route("/categories").get(categories, (req, res) => {res.render("category")})


