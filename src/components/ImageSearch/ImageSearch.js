import React, {Component} from 'react';
import {Button, Container, Jumbotron} from "react-bootstrap";
import {Link} from "react-router-dom";
import '@tensorflow/tfjs';
import './ImageSearch.css'

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
            display: ''
        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        this.setState({
            image: URL.createObjectURL(event.target.files[0]),
            display: '5px solid #285B52'
        })
    }

    app = async () => {
        if (this.state.image) {
            this.setState({loading: true})
        const img = document.getElementById('img');

        net = await mobilenet.load();

        return await net.classify(img);
        } else {
            alert('Upload an image before clicking search')
            window.location.reload()
        }
    }

    recipeLoad = () => {
        Serialize.foodData(`https://api.spoonacular.com/recipes/complexSearch/?query=${this.state.search}&apiKey=${keys.food()}&number=100&includeNutrition=false`)
            .then(r => {
                this.setState({
                    food: r,
                    foodResults: true,
                });
            })
    }


    render() {
        let {name, prob, loading} = this.state.result;
        let {food, foodResults} = this.state;
        return (
            <Container>
                <div className='container'>
                    {/* eslint-disable-next-line jsx-a11y/alt-text */}
                    <img style={{border: this.state.display}} className='image-upload' crossOrigin='anonymous' id={'img'} src={this.state.image}/>
                    <h1 className='image-search-title'>SEARCH WITH AN IMAGE</h1>
                    <form className='form' style={{marginBottom: 30}}>
                        <input className='upload-file' onChange={this.handleChange} id='uploaded' type='file' accept="image/png, image/jpeg"/>
                    </form>
                    <div className='button'>
                        <Button size="lg" style={{width: '50%'}} block onClick={() => this.app().then(value => {
                            this.setState({
                                loading: false, 
                                result: {'name': value[0]['className'], 'prob': value[0]['probability']},
                                search: value[0]['className'],
                                })
                                this.recipeLoad();
                        })}
                                variant="primary">
                            Upload
                        </Button>
                    </div>
                    <Jumbotron style={{'marginTop': 0, padding: 0, display: 'block'}}>
                        {loading ?
                            <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
                            :
                            <div className='container'>
                                <h5 className='image-search-title'>{name == null ? null : `Name: ${name.toUpperCase()}`}</h5>
                                <h5 className='image-search-title'>{prob == null ? null : `Confidence: ${prob.toFixed(2)*100}%`}</h5>
                            </div>
                        }
                        {foodResults === true ? 
                            food.map((item, index) => {
                                    return (
                                        <div className={"recipe"} key={index}>
                                            <Link to={{pathname: '/instructions', item: item}}>
                                            <img className={'recipe-img'} src={item.img} alt={item.title} />
                                            <h1 className={'recipe-title'}>{item.title}</h1>
                                            </Link>
                                        </div>
                                    )
                                }
                            )
                        : <br />}
                    </Jumbotron>
                </div>
            </Container>
        )
    }

}

export default ImageSearch;
