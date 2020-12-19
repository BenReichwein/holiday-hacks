import React, {Component} from 'react';
import {Link} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import './Home.css'
import {Container, Jumbotron, Row} from "react-bootstrap";

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
            <Container fluid style={{marginTop: 50}}>
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
