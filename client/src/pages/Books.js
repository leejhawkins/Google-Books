import React, { Component } from "react";
import SaveBtn from "../components/SaveBtn"
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, FormBtn } from "../components/Form";

class Books extends Component {
  state = {
    books: [],
    searchBooks: [],
    title: "",
    author: "",
    synopsis: ""
  };

  componentDidMount() {
    this.loadBooks();
  }

  loadBooks = () => {
    API.getBooks()
      .then(res =>
        this.setState({ books: res.data, title: "", author: "", synopsis: "" })
      )
      .catch(err => console.log(err));
  };

  deleteBook = id => {
    API.deleteBook(id)
      .then(res => this.loadBooks())
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };
  saveBook = (title,author,synopsis) => {
    let newAuthor = ""
    if (author==='undefined') {
      newAuthor = ""
    } else {
      newAuthor = author[0]
    }
    API.saveBook({
      title: title,
      author: newAuthor,
      synopsis: synopsis
    })
      .then(res => this.loadBooks())
      .catch(err => console.log(err));

  };
  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.title && this.state.author) {
      console.log(this.state.title)
      API.searchForBook({
        title: this.state.title,
        author: this.state.author,
      })
        .then(res => {
          console.log(res.data)
          this.setState({ searchBooks: res.data, title: "", author: "", synopsis: "" })
        })

        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            <form>
              <Input
                value={this.state.title}
                onChange={this.handleInputChange}
                name="title"
                placeholder="Title (required)"
              />
              <Input
                value={this.state.author}
                onChange={this.handleInputChange}
                name="author"
                placeholder="Author (required)"
              />
              <FormBtn
                disabled={!(this.state.author && this.state.title)}
                onClick={this.handleFormSubmit}
              >
                Submit Book
              </FormBtn>
            </form>
            {this.state.books.length ? (
              <List>
                {this.state.searchBooks.map(book => (
                  <ListItem key={book.id}>
                    <Link to={"/books/" + book.title}>
                      <strong>
                        {book.title} by {book.author}
                      </strong>
                    </Link>
                    <SaveBtn onClick={() => this.saveBook(book.title, book.author, book.synopsis)} />
                  </ListItem>
                ))}
              </List>
            ) : (
                <h3>No Results to Display</h3>
              )}
          </Col>
          <Col size="md-6 sm-12">
            <Jumbotron>
              <h1>Books On My List</h1>
            </Jumbotron>
            {this.state.books ? (
              <List>
                {this.state.books.map(book => (
                  <ListItem key={book._id}>
                    <Link to={"/books/" + book._id}>
                      <strong>
                        {book.title} by {book.author}
                      </strong>
                    </Link>
                    <DeleteBtn onClick={() => this.deleteBook(book._id)} />
                  </ListItem>
                ))}
              </List>
            ) : (
                <h3>No Results to Display</h3>
              )}

          </Col>
        </Row>
      </Container>
    );
  }
}

export default Books;
