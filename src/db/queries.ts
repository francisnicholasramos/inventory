import {pool} from './pool';
import {InputTypes, CategoryType} from "../types/InputTypes";

export async function getItems() {
    return await pool.query("SELECT * FROM items");
}

export async function insertItem(params: InputTypes) {
    await pool.query("INSERT INTO items (item_name, description, price, category_id) VALUES ($1, $2, $3, $4)",
      [
        params.item_name,
        params.description,
        params.price,
        params.category
      ])
}

export async function addCategory(params: CategoryType) {
    await pool.query("INSERT INTO categories (category) VALUES ($1)", [params.category_name])
}

export async function searchItem(params: string) {
    const {rows} = await pool.query("SELECT id, item_name FROM items WHERE item_name ILIKE $1", [`%${params}%`])
    return rows;
}

export async function deleteItem(id: number) {
    const {rows} = await pool.query("DELETE FROM items WHERE id=$1", [id])
    return rows;
}

export async function updateItem(id: number, params: InputTypes) {
    const {rows} = await pool.query(
        `UPDATE items 
         SET item_name=$2, description=$3, price=$4, category_id=$5 
         WHERE id=$1`, 
        [
            id, 
            params.item_name,
            params.description,
            params.price,
            params.category
        ])
    return rows;
}

export async function getItemId(id: number) {
    const {rows} = await pool.query("SELECT * FROM items WHERE id=$1", [id])
    return rows;
}

export async function getCategories() {
    const categories = await pool.query("SELECT * FROM categories")
    return categories;
}

export async function filterItems(params: number[]) {
    const { rows } = await pool.query(`SELECT * FROM items WHERE category_id= ANY($1)`, [params]);
    console.log(rows)
    return rows;
}
