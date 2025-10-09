import {pool} from './pool';

export async function getItems() {
    const {rows} = await pool.query("SELECT * FROM usernames")
    console.log(rows)
    return rows;
}

export async function insertItem(params: string) {
    const {rows} = await pool.query("INSERT INTO usernames (username) VALUES ($1)", [params])
    return rows;
}

export async function searchItem(params: string) {
    const {rows} = await pool.query("SELECT username FROM usernames WHERE username ILIKE $1", [`%${params}%`])
    console.log(rows);
    return rows;
}

export async function deleteItem(id: number) {
    const {rows} = await pool.query("DELETE FROM usernames WHERE id=$1", [id])
    console.log(rows);
    return rows;
}

export async function updateItem(id: number, params: string) {
    const {rows} = await pool.query("UPDATE usernames SET username=$2 WHERE id=$1", [id, params])
    console.log(rows)
    return rows;
}

export async function getItemId(id: number) {
    const {rows} = await pool.query("SELECT username FROM usernames WHERE id=$1", [id])
    console.log(rows);
    return rows;
}
