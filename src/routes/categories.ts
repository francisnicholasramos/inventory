import {Router} from "express";
import {validateInput} from "../validation/validator";
import {addNewCategory, formCategory} from "../controller/categoryController";

export const category = Router();

category.get("/form", formCategory);

category.route("/category/new")
      .post(validateInput, addNewCategory) 
