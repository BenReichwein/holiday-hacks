import React, {Component} from 'react';
import './Home.css'

const Serialize = require('../../net/serialize');

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            food: []
        }
        Serialize.data()
            .then(r => {
                this.setState(prevState => ({
                    food: r,
                }));
            })
    }

    render() {
        return (
            <div>
                {this.state.food.map((item, index) => {
                    return (
                        <div className={"recipe"} key={index}>
                            <h1>{this.state.food[index].title}</h1>
                            {/* eslint-disable-next-line jsx-a11y/alt-text */}
                            <img src={this.state.food[index].img}/>
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default Home;
