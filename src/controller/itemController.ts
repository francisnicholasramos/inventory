import {Request, Response} from "express";
import {getItems} from "../db/queries";

export async function getAllItems(req: Request, res: Response) {
  try {
    const {rows} = await getItems();
    const items = rows.map((item) => ({
      ...item,
    }))

    res.render("index", {items})

  } catch (error) {
      return;
  } 
}
