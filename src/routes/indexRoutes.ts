import {Router} from "express";
import {validateInput} from "../validation/validator";
import {getAllItems, 
        addItem, 
        filterItem, 
        viewProduct, 
        searchQuery, 
        editItemGet, 
        editItemPost
} from "../controller/itemController";

export const router  = Router();

router.route("/")
      .get((req, res) => {
          res.render("index");
      })

router.route("/components")
      .get(getAllItems, (req, res) => { 
          res.render("index")
      });

router.get("/filter/components", filterItem)

router.route("/item/new")
      .post(validateInput, addItem)

router.get("/search", searchQuery)

router.route("/components/:id")
      .get(viewProduct)

router.route("/edit/:id")
      .get(editItemGet)

router.route("/item/update/:id")
      .post(validateInput, editItemPost)
          
