import {Request, Response} from "express";
import {getItems, getItemId, searchItem, insertItem, updateItem, filterItems, getCategories} from "../db/queries";

export async function getAllItems(req: Request, res: Response) {
  try {
    const {rows} = await getItems();
    const categoryList = await getCategories();

    const categories = categoryList.rows.map((category: any) => ({
        ...category, }))

    const items = rows.map((item) => ({
        ...item,
    }))

    res.render("main", {
        categories, 
        selectedCategory: [], 
        items
    })

  } catch (error) {
      console.log("Failed to get items:", error);
      res.status(500).send("Something went wrong while fetching items.");
  } 
}

export async function addItem(req: Request, res: Response) {
    const id = req.query.category;
    
    const addNewItem = {
        item_name: req.body.name, // item_name: property req.body.NAME_HERE: name attribute from the form
        description: req.body.description,
        price: req.body.price,
        category: req.body.category
    };

    try {
        await insertItem(addNewItem);
        res.redirect("/");
    } catch (error) {
        console.log(error);
        res.status(500).send("Failed to add an item.")
    }
}

export async function editItemGet(req: Request, res: Response) {
    const {id} = req.params

    try {
        const rows = await getItemId(Number(id));
        const categoryList = await getCategories();
        const categories = categoryList.rows.map((category) => ({
            ...category
        }))

        if (rows.length === 0) return res.status(404).send("Item not found");

        const item = rows[0];

        res.render("edit", {item, categories})
    } catch(error) {
        console.log(error);
        res.status(500).send("Failed to get an item.")
    }
}

export async function editItemPost(req: Request, res: Response) {
    const {id} = req.params
    const updateCurrentItem = {
        item_name: req.body.name, 
        description: req.body.description,
        price: req.body.price,
        category: req.body.category
    }

    try {
        await updateItem(Number(id), updateCurrentItem)
        res.redirect(`/components/${id}`)
    } catch(error) {
        res.status(500).send("Failed to updated an item.")
    }
}

export async function viewProduct(req: Request, res: Response) {
    const {id} = req.params;

    try {
        const rows = await getItemId(Number(id));
        if (rows.length === 0) return res.status(404).send("Item not found");

        const item = rows[0];

        res.render("view", { item });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}

export async function filterItem(req: Request, res: Response) {
  try {
    // req.query if GET method 
    // req.body if POST method
    const selected = req.query.category;
    let selectedCategory: number[];
    
    if (!selected) {
        const {rows} = await getItems();
        const categoryList = await getCategories();

        const categories = categoryList.rows.map((category: any) => ({
            ...category,
        }))

        const items = rows.map((item) => ({
            ...item,
        }))

        res.render("main", {
            categories, 
            selectedCategory: [], 
            items
        })
    }

    // selectd category
    if (selected) {
        if (Array.isArray(selected)) {
            selectedCategory = selected.map(Number) // map it when there's multiple selections
        } else {
            selectedCategory = [Number(selected)] // single selection
        }
    } else {
        selectedCategory = [] // default
    }

    const filtered = selectedCategory.length
        ? await filterItems(selectedCategory)
        : await getItems()

    const categoryList = await getCategories();

    const categories = categoryList.rows.map((category: any) => ({
        ...category,
    }))

    res.render("main", {
        items: filtered,
        categories,
        selectedCategory
    })

  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to filter items.");
  }
}

export async function searchQuery(req: Request, res: Response) {
    const q = req.query.q as string;
     
    try {
        const rows = await searchItem(q)
        res.json(rows)
    } catch(error) {
        res.status(500).send("Search error...")
    }
}
