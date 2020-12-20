import React, {Component} from 'react';
import {Button, Container, Jumbotron} from "react-bootstrap";
import {Link} from "react-router-dom";
import '@tensorflow/tfjs';

require('@tensorflow/tfjs')
const mobilenet = require('@tensorflow-models/mobilenet')
const Serialize = require('../../net/serialize');
const keys = require('../../api_keys');

let net;

class ImageSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: null,
            result: {
                'name': null,
                'prob': null,
            },
            food: [],
            search: '',
            foodResults: false,
            loading: false,
        }

        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        this.setState({
            image: URL.createObjectURL(event.target.files[0])
        })
    }

    app = async () => {
        this.setState({loading: true})
        const img = document.getElementById('img');

        net = await mobilenet.load();

        return await net.classify(img);
    }

    recipeLoad = () => {
        Serialize.foodData(`https://api.spoonacular.com/recipes/complexSearch/?query=${this.state.search}&apiKey=${keys.food()}&number=100&includeNutrition=false`)
            .then(r => {
                console.log(r)
                this.setState({
                    food: r,
                    foodResults: true,
                });
            })
    }


    render() {
        let {name, prob} = this.state.result;
        let {food, foodResults} = this.state;
        let loading = this.state.loading;
        return (
            <Container>
                <div>
                    {/* eslint-disable-next-line jsx-a11y/alt-text */}
                    <img style={{marginTop: 50, marginBottom: 50}} crossOrigin='anonymous' id={'img'} src={this.state.image}/>
                    <form style={{marginBottom: 30}}>
                        <input onChange={this.handleChange} id='uploaded' type='file' accept="image/png, image/jpeg"/>
                    </form>
                    <Button size="lg" block onClick={() => this.app().then(value => {
                        this.setState({
                            loading: false, 
                            result: {'name': value[0]['className'], 'prob': value[0]['probability']},
                            search: value[0]['className'],
                            })
                            this.recipeLoad();
                    })}
                            variant="primary">Search</Button>
                    <Jumbotron style={{'marginTop': 50}}>
                        {loading ?
                            <p>Loading...</p>
                            :
                            <div>
                                <p>{name == null ? null : `Name: ${name}`}</p>
                                <p>{prob == null ? null : `Confidence: ${prob.toFixed(3)*100}%`}</p>
                            </div>
                        }
                        {foodResults === true ? 
                            food.map((item, index) => {
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
                        : <p></p>}
                    </Jumbotron>
                </div>
            </Container>
        )
    }

}

export default ImageSearch;
