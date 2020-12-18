import React, {Component} from 'react';
import './Home.css'

const Serialize = require('../../net/serialize');

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            food: [],
            loading: true,
        }
        Serialize.data()
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
                                <center><h1 className={'recipe-title'}>{food[index].title}</h1></center>
                                {/* eslint-disable-next-line jsx-a11y/alt-text */}
                                <center><img className={'recipe-img'} src={food[index].img}/></center>
                                <center><button className={'recipe-instructions'} onClick={()=> this.findInstructions(food[index.id])}><i class="fas fa-book"/></button></center>
                            </div>
                        )
                    })}
            </div>
        )
    }

}

export default Home;
