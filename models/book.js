const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  _id: { type: String, required: true },
  title: { type: String, required: true },
  author: { type: Array, required: true },
  synopsis: String,
  image: String,
  link: String,
  date: { type: Date, default: Date.now }
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
