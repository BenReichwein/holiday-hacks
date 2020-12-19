import React, {Component} from 'react';

const mobilenet = require('@tensorflow-models/mobilenet')
const ts2 = require('@tensorflow/tfjs')

let net;

class ImageSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: 'https://images.pexels.com/photos/102104/pexels-photo-102104.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
        }
        this.app();
    }

    app = async () => {
        console.log('Loading mobilenet..');

        // Load the model.
        net = await mobilenet.load();
        console.log('Successfully loaded model');

        // Make a prediction through the model on our image.
        const result = await net.classify(this.state.image);
        console.log(result);
    }

    render() {
        return (
            <div>
                {/* eslint-disable-next-line jsx-a11y/alt-text */}
                <img id={'img'} src={this.state.image}/>
            </div>
        )
    }

}

export default ImageSearch;
