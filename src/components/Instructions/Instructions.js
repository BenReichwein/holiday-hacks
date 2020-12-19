import React, {Component} from 'react';
import Serialize from "../../net/serialize";
import './Instructions.css'

const keys = require('../../api_keys');


class Instructions extends Component {

    constructor(props) {
        super(props);
        this.state = {
            instructions: [],
            ingredients: [],
            loading: true,
        }
        Serialize.instructionData(`https://api.spoonacular.com/recipes/${this.props.location.item.id}/analyzedInstructions?includeNutrition=false&apiKey=${keys.food()}`, this.props.location.item)
            .then(r => {
                this.setState({instructions: r, loading: false})
            })
    }

    render() {
        let {instructions, ingredients, loading} = this.state
        if (loading === false) {
            for (let i = 0; i < instructions.steps.length; i++) {
                for (let x = 0; x < instructions.steps[i].ingredients.length; x++) {
                    this.state.ingredients.push(instructions.steps[i].ingredients[x].name)
                }
            }
            return (
                <div className={'instructions'}>
                    <p className={'instructions-needed'}><span>Ingredients Needed: </span>{ingredients.join(" ")}</p>
                    <hr/>
                    {instructions.steps.map((item, index) => {
                                return (
                                    <div key={index}>
                                        <h5 className={'instructions-steps'}>Step #{index+1}</h5>
                                        <p className={'instructions-step'}> {instructions.steps[index]['step']}</p>
                                    </div>
                                )
                            }
                        )
                    }
                </div>
            )
        } else {
            return (
                <div>
                    <p>Loading...</p>
                </div>
            )
        }
    }

}

export default Instructions;
