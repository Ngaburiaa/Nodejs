export const createdSchema = {
  imageUrl: {
    notEmpty: {
      errorMessage: "imageUrl should not be empty",
    },
    isLength: {
      options: { max: 10 },
      errorMessage: "Url should be less than 10",
    },
  },
  title: {
    notEmpty: {
      errorMessage: "title should not be empty",
    },
  },
  price: {
    notEmpty: {
      errorMessage: "Price should not be empty",
    },
  },
  date: {
    notEmpty: {
      errorMessage: "date should not be empty",
    },
    isDate: {
      errorMessage: "Date should be a date",
    },
  },
  location: {
    notEmpty: {
      errorMessage: "location should not be empty",
    },
  },
  company: {
    notEmpty: {
      errorMessage: "company should not be empty",
    },
  },
};
