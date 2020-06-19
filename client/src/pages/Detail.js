import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
import Thumbnail from "../components/Thumbnail"
import { DeleteBtn, SaveBtn, LinkBtn, DeleteBtnLg} from "../components/Buttons"
import API from "../utils/API";

class Detail extends Component {
  state = {
    book: {}
  };
  componentDidMount() {
    const id = this.props.match.params.id
    API.getBook(id).then(res => this.setState({ book: res.data }))
      .catch(err => console.log(err));
  }
  deleteBook = id => {
    API.deleteBook(id)
      .then(res => this.loadBooks())
      .catch(err => console.log(err));
  };
  goToLink = link => window.location.assign(link)

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1>
                {this.state.book.title} by {this.state.book.author}
              </h1>
            </Jumbotron>
          </Col>
        </Row>
        <Row>
          <Col size="md-2">
            <Thumbnail
              title={this.state.book.title}
              image={this.state.book.image}
            />
          </Col>
          <Col size="md-8">
            <article>
              <h1>Synopsis</h1>
              <p>{this.state.book.synopsis}</p>
            </article>
          </Col>
          <Col size="md-2">
            <LinkBtn onClick={() => this.goToLink(this.state.book.link)} />
            <DeleteBtnLg onClick={() => this.deleteBook(this.state.book._id)} />
          </Col>
        </Row>
        <Row>
          <Col size="md-2">
            <Link to="/">← Go to Search</Link>
          </Col>
          <Col size="md-2">
            <Link to="/reading-list">← Go to Reading List</Link>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Detail;
