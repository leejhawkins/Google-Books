import React, { Component } from "react";
import { DeleteBtn, SaveBtn, LinkBtn,DeleteBtnLg } from "../components/Buttons";
import Jumbotron from "../components/Jumbotron";
import Thumbnail from "../components/Thumbnail";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, FormBtn } from "../components/Form";

class ReadingList extends Component {
    state = {
        books: [],
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
    goToLink = link => window.location.assign(link)

    render() {
        return (
            <Container fluid>
                  
                    <Jumbotron>
                        <h1>Reading List</h1>
                    </Jumbotron>
                        <Row>
                        <List>
                            {this.state.books.map(book => (
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
                                        
                                        <LinkBtn onClick={() => this.goToLink(book.link)} />
                                        <DeleteBtnLg onClick={() => this.deleteBook(book._id)} />
                                    </Col>

                                </Row>
                            ))}
                        </List>
                    </Row>
            </Container >
        );
    }
}

export default ReadingList;
