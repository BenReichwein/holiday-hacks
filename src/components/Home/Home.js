import React, { Component } from 'react';
import './Home.css'
const Serialize = require('../../net/serialize');

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: [],
            img: [],
        }
        new Serialize().data()
        .then(r=> {
            r.forEach(doc => {
                this.setState(prevState => ({
                    title: [...prevState.title, doc.title],
                    img: [...prevState.img, doc.img],
                }));
            })
        })
    }

    render() {
        return (
        <div>
            {this.state.title.map((item, index) => {
                        return (
                            <div className={"recipe"} key={index}>
                                <h1>{this.state.title[index]}</h1>
                                {/* eslint-disable-next-line jsx-a11y/alt-text */}
                                <img src={this.state.img[index]}/>
                            </div>
                        )
                    })}
        </div>
        )
    }
}

export default Home;