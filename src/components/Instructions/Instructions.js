import React, {Component} from 'react';
import Serialize from "../../net/serialize";

const keys = require('../../api_keys');


class Instructions extends Component {

    constructor(props) {
        super(props);
        this.state = {
            instructions: [],
            loading: true
        }
        Serialize.instructionData(`https://api.spoonacular.com/recipes/${this.props.location.item.id}/analyzedInstructions?includeNutrition=false&apiKey=${keys.food()}`, this.props.location.item)
            .then(r => {
                this.setState({instructions: r, loading: false})
            })
    }


    render() {

        let {instructions, loading} = this.state

        return (
            <div>
                {loading ? <p>Loading...</p> : <p>{instructions.steps[0]['step']}</p>}

            </div>
        )
    }

}

export default Instructions;
