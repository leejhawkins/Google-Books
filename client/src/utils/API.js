import axios from "axios";

export default {
  searchForBook: function (query) {
    console.log(query)
    return axios.get("/search", { params: { title: query.title, author: query.author, limit: 1 } })

  },
  getBook: function (id) {
    return axios.get("/api/books/" + id);
  },
  getBooks: function () {
    return axios.get("/api/books");
  },
  saveBook: function (bookData) {
    return axios.post("/api/books", bookData);
  },
  deleteBook: function (id) {
    return axios.delete("/api/books/" + id);
  },
}
