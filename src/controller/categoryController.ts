import {Request, Response} from "express";
import {matchedData, validationResult} from "express-validator"
import {CategoryType} from "../types/InputTypes"
import {addCategory, getCategories} from "../db/queries";

export async function addNewCategory(req: Request, res: Response) {
    const errors = validationResult(req)
    
    if (!errors.isEmpty()) {
        res.status(500).send(errors.mapped());
        return;
    }

    const validated = matchedData(req) as CategoryType;

    try {
        await addCategory(validated);
        res.redirect("/categories")
    } catch (error) {
        res.status(500).send(error);
    }
}

export async function formCategory(req: Request, res: Response) {
    try {
        const categoryList = await getCategories();

        const mapped = categoryList.rows.map((cat: any) => ({
            ...cat,
        }));

        res.render("form", {categories: mapped})
    } catch (error) {
        res.status(500).send("Internal Server Error.")
    }
}

export async function categories(req: Request, res: Response) {
    try {
        const categories = await getCategories();

        const categoryList = categories.rows.map((category: any) => ({
            ...category,
        }));

        res.render("category", { categoryList })
    } catch (error) {
        res.status(500).send("Internal Server Error.")
    }
}

export async function getAllCategories(req: Request, res: Response) {
    try {
        const categories = await getCategories();

        const categoryList = categories.rows.map((category: any) => ({
            ...category,
        }));

        res.render("index", {items: res.locals.items, categoryList, selectedCategory: []})
    } catch (error) {
        res.status(500).send("Internal Server Error.")
    }
}
