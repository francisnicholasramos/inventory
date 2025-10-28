import {Router} from "express";
import {categoryInputValidate} from "../validation/validator";
import {addNewCategory, formCategory, categories} from "../controller/categoryController";
import {filterItem} from "../controller/itemController"

export const category = Router();

category.get("/form", formCategory);

category.get("/filter/components/", filterItem)

category.route("/category/new").post(categoryInputValidate, addNewCategory) 

category.route("/categories").get(categories, (req, res) => {res.render("category")})


