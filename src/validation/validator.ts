import {checkSchema} from "express-validator";

// properties and input "name" attribute should be the same

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
    },
  custom: {
      options: (value) => isNaN(Number(value)),
      errorMessage: "Cannot be a number."
    }
  },

  description: {
    in: ["body"],
    isString: { errorMessage: "Item name must be a string."},
    isLength: {
      options: {max: 255},
      errorMessage: "Description for the item should not exceed by 255 long."
    },
    notEmpty: { errorMessage: "Description cannot be empty."},
    custom: {
        options: (value) => isNaN(Number(value)),
        errorMessage: "Cannot be a number."
    }

  },

  price: {
    in: ["body"],
    notEmpty: { errorMessage: "Price is required."},
    isNumeric: { errorMessage: "Price must be a number."},
    isLength: {
      options: {max: 5},
      errorMessage: "Max of 5 digits only."
    },
  },

  category: {
    in: ["body"],
    isString: {errorMessage: "It should have a category"},
    isLength: {
      options: {max: 35},
      errorMessage: "Are you nuts? 35 characters long is a form of autism."
    },
    notEmpty: {errorMessage: "Items should have a category."}
  },
});

export const categoryInputValidate = checkSchema({ 
    category_name: {
        in: ["body"],
        isString: {errorMessage: "Category cannot be a number."},
        notEmpty: {errorMessage: "Input cannot be empty."},
        custom: {
            options: (value) => isNaN(Number(value)),
            errorMessage: "Cannot be a number."
        }
    }
}) 
