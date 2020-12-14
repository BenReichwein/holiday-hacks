import React, { Component } from 'react';
import './Home.css'

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            something: false,
        }
    }

    render() {
        return (
        <div>
            <h1>Holiday Hacks - Benny, Christian, Ian</h1>
        </div>
        )
    }
}

export default Home;