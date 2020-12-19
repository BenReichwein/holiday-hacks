import React, {Component} from 'react';
import {Link} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import './Home.css'
import {Container, Jumbotron, Row} from "react-bootstrap";

const keys = require('../../api_keys');
const Serialize = require('../../net/serialize');

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            food: [],
            loading: true,
            search: 'christmas'
        }
        this.recipeLoad();
    }

    recipeLoad = () => {
        Serialize.foodData(`https://api.spoonacular.com/recipes/complexSearch/?query=${this.state.search}&apiKey=${keys.food()}&includeNutrition=false`)
            .then(r => {
                this.setState({
                    food: r,
                    loading: false
                });
            })
    }

    recipeSearch = (e) => {
        this.setState({
            search: [e.target.value.toLowerCase()]
        })
        this.recipeLoad();
    }

    render() {
        let {food, loading} = this.state
        return (
            <Container fluid style={{marginTop: 50}}>
            <input
                    className="search-bar"
                    style={{width: '50%'}}
                    type="text"
                    placeholder='Search Recipe'
                    onChange={this.recipeSearch} />
                <Jumbotron>
                    <Row>
                        {loading ?
                            <p style={{margin: "auto"}}>Loading...</p>
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
                    </Row>
                </Jumbotron>
            </Container>
        )
    }

}

export default Home;
