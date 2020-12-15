import React, { Component } from 'react';
import axios from 'axios'
import './Home.css'

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            joke: '',
            trivia: '',
        }
        this.getJoke();
        this.getTrivia();
    }

    getJoke = () => {
        axios.get('https://api.spoonacular.com/food/jokes/random?apiKey=82dcf2c72fbe4c4eb58964d820e2430b')
        .then((Response) => {
            const Joke = Response.data.text;
            this.setState({joke:Joke})
        })
        .catch(error => console.error(`Error: ${error}`))
    }

    getTrivia = () => {
        axios.get('https://api.spoonacular.com/food/trivia/random?apiKey=82dcf2c72fbe4c4eb58964d820e2430b')
        .then((Response) => {
            const Trivia = Response.data.text;
            this.setState({trivia:Trivia})
        })
        .catch(error => console.error(`Error: ${error}`))
    }

    render() {
        return (
        <div>
            <h1>Holiday Hacks - Benny, Christian, Ian</h1>
            <p>Joke: {this.state.joke}</p>
            <p>Trivia: {this.state.trivia}</p>
        </div>
        )
    }
}

export default Home;