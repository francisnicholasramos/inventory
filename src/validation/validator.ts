import {checkSchema} from "express-validator";

export const validateInput = checkSchema({
  item_name: {
    in: ["body"],
    isString: { errorMessage: "Item name must be a string."},
    isLength: {
      options: {max: 50},
      errorMessage: "Max length character is 50."
    }, 
    notEmpty: {
      errorMessage: "Item name is required."
    }
  },

  description: {
    in: ["body"],
    isString: { errorMessage: "Item name must be a string."},
    isLength: {
      options: {max: 255},
      errorMessage: "Description for the item should not exceed by 255 long."
    },
    notEmpty: { errorMessage: "Description cannot be empty."}
  },

  price: {
    in: ["body"],
    isNumeric: { errorMessage: "Price must be a number."},
    isLength: {
      options: {max: 5},
      errorMessage: "Max of 5 digits only."
    },
    notEmpty: { errorMessage: "Price is required."}
  },

  category: {
    in: ["body"],
    isString: {errorMessage: "It should have a category"},
    isLength: {
      options: {max: 35},
      errorMessage: "Are you nuts? 35 characters long is a form of autism."
    },
    notEmpty: {errorMessage: "Items should have a category."}
  }
});
