import React, { Component } from "react";
import {DeleteBtn, SaveBtn, LinkBtn} from "../components/Buttons";
import Jumbotron from "../components/Jumbotron";
import Thumbnail from "../components/Thumbnail";
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
  saveBook = (id,title,author,synopsis,image,link) => {
    let newAuthor = ""
    if (author==='undefined') {
      newAuthor = ""
    } else {
      newAuthor = author[0]
    }
    API.saveBook({
      _id: id,
      title: title,
      author: newAuthor,
      synopsis: synopsis,
      image:image,
      link:link
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
  goToLink = link => window.location.assign(link)

  render() {
    return (
      <Container fluid>
        <Row>
          
          <Col size="md-8">
            <Jumbotron>
              <h1>Search</h1>
            </Jumbotron>
            <form style={{marginBottom: 60}}>
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
            {this.state.searchBooks.length ? (
              <List>
                {this.state.searchBooks.map(book => (
                  <Row className="search-row" key={book.id}>
                    <Col size="md-3">
                      <Thumbnail
                        title={book.title}
                        image={book.image}
                      />
                      <strong>
                        {book.title} by {book.author}
                      </strong>
                    </Col>
                    <Col size="md-7">
                      {book.synopsis}
                    </Col>
                    <Col size="md-2">
                      <SaveBtn onClick={() => this.saveBook(
                        book.id,
                        book.title,
                        book.author,
                        book.synopsis,
                        book.image,
                        book.link)
                      } />
                      <LinkBtn onClick={() => this.goToLink(book.link)}/>

                    </Col>
                   
                  </Row>
                ))}
              </List>
            ) : (
                <h3>Enter Title and Author to Search</h3>
              )}
          </Col>
          <Col size="md-4 sm-12">
            <h1>Current Reading List</h1>
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
