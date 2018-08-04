import React, { Component } from 'react';
import Header from "./components/Header";
import { Input, FormBtn } from "./components/Search";
import Container from "./components/Grid";
import API from "./utils/API";

class App extends Component {

  state = {
    articles: [],
    title: "",
    url: "",
    dateSaved: "",
    synopsis: ""
  };

  componentDidMount() {
    this.loadArticles();
  }

  loadArticles = () => {
    API.getArticles()
      .then(res =>
        this.setState({ articles: res.data, title: "", url: "", dateSaved: "", synopsis: "" })
      )
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.term) {
      API.saveBook({
        title: this.state.title,
        author: this.state.author,
        synopsis: this.state.synopsis
      })
        .then(res => this.loadBooks())
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <Container fluid>
      <Header />
      <form>
        <Input
          value={this.state.term}
          onChange={this.handleInputChange}
          name="term"
          placeholder="Search Term (required)"
        />
        <FormBtn
          disabled={!(this.state.term)}
          onClick={this.handleFormSubmit}
        >
          Search
        </FormBtn>
      </form>
      </Container>
    );
  }
}

export default App;
