import React, { Component } from 'react';
import './Home.css'
const findRecipes = require('../../net/findRecipes');
const findInstructions = require('../../net/findInstructions');

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: [],
            img: [],
            id: [],
            step: [],
            name: [],
            equipment: [],
            length: [], //missing
        }
        new findInstructions().data()
        .then(r=> {
            r.forEach(doc => {
                doc.steps.forEach(steps => {
                    console.log(steps)
                    this.setState(prevState => ({
                        step: [...prevState.step, steps.step],
                    }));
                    steps.equipment.forEach(equipment => {
                        this.setState(prevState => ({
                            equipment: [...prevState.equipment, equipment.name],
                        }));
                    })
                    steps.ingredients.forEach(ingredients => {
                        this.setState(prevState => ({
                            name: [...prevState.name, ingredients.name],
                        }));
                    })
                })
            })
        })
        new findRecipes().data()
        .then(r=> {
            r.forEach(doc => {
                this.setState(prevState => ({
                    title: [...prevState.title, doc.title],
                    img: [...prevState.img, doc.img],
                    id: [...prevState.id, doc.id],
                }));
            })
        })
    }

    render() {
        return (
        <div>
            {this.state.title.map((item, index) => {
                        return (
                            <div className={"recipe"} key={index}>
                                <h1>{this.state.title[index]}</h1>
                                <h1>{this.state.id[index]}</h1>
                                {/* eslint-disable-next-line jsx-a11y/alt-text */}
                                <img src={this.state.img[index]}/>
                            </div>
                        )
                    })}
        </div>
        )
    }
}

export default Home;