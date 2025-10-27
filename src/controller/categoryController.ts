import {Request, Response} from "express";
import {addCategory, getCategories} from "../db/queries";

export async function addNewCategory(req: Request, res: Response) {
    const newCategory = {
        category_name: req.body.category
    }

    console.log("test", newCategory)
    try {
        await addCategory(newCategory);
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
