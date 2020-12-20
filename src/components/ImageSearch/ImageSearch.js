import React, {Component} from 'react';
import {Button, Container, Jumbotron} from "react-bootstrap";

const mobilenet = require('@tensorflow-models/mobilenet')
require('@tensorflow/tfjs')

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


    render() {
        let {name, prob} = this.state.result;
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
                        this.setState({loading: false, result: {'name': value[0]['className'], 'prob': value[0]['probability']}})
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


                    </Jumbotron>
                </div>
            </Container>
        )
    }

}

export default ImageSearch;
