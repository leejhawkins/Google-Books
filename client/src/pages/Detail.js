import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
import Thumbnail from "../components/Thumbnail"
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
          <Col size="md-10">
            <article>
              <h1>Synopsis</h1>
              <p>{this.state.book.synopsis}</p>
            </article>
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
