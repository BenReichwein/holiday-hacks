import React, {Component} from 'react';

const mobilenet = require('@tensorflow-models/mobilenet')
const tf = require('@tensorflow/tfjs')

let net;

class ImageSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: 'https://images.pexels.com/photos/102104/pexels-photo-102104.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
        }
    }

    app = async () => {
        const img = document.getElementById('img');
        console.log('Loading mobilenet..');

        net = await mobilenet.load();
        console.log('Successfully loaded model');

        const result = await net.classify(img);
        console.log(result);
    }

    render() {

        return (
            <div>
                {/* eslint-disable-next-line jsx-a11y/alt-text */}
                <img crossorigin='anonymous' id={'img'} src={this.state.image}/>
                <button onClick={this.app}/>
            </div>
        )
    }

}

export default ImageSearch;
