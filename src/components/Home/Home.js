import React, {Component} from 'react';
import {Link} from "react-router-dom";

import './Home.css'

const Serialize = require('../../net/serialize');

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            food: [],
            loading: true,
        }
        Serialize.foodData()
            .then(r => {
                this.setState({
                    food: r,
                    loading: false
                });
            })
    }


    render() {
        let {food, loading} = this.state
        return (
            <div>
                {loading ?
                    <p>Loading...</p>
                    : food.map((item, index) => {
                            return (
                                <div className={"recipe"} key={index}>
                                    <h1 className={'recipe-title'}>{item.title}</h1>
                                    {/* eslint-disable-next-line jsx-a11y/alt-text */}
                                    <img className={'recipe-img'} src={item.img}/>
                                    <Link
                                        className={'recipe-instructions'}
                                        to={{
                                            pathname: '/instructions',
                                            item: item,
                                        }}>
                                        <i className="fas fa-book"/>
                                    </Link>
                                </div>
                            )
                        }
                    )
                }
            </div>
        )
    }

}

export default Home;
