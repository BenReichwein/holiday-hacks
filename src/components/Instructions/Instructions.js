import React, {Component} from 'react';
import {Container, Jumbotron, Card} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import './Instructions.css'
import Serialize from "../../net/serialize";

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
                    this.state.ingredients.push(instructions.steps[i].ingredients[x].name + ',')
                }
            }
            return (
                <Container>
                    <div className={'instructions'}>
                        <Card className="instructions-card">
                            <h2>{this.props.location.item.title}</h2>
                            <Card.Img variant="top" src={this.props.location.item.img}/>
                            <p style={{marginTop: 20, marginBottom: 20}} className={'instructions-needed'}><b>Ingredients Needed: <br/> </b>{ingredients.join(" ")}
                            </p>
                        </Card>
                        <hr/>
                        <Jumbotron>
                            {instructions.steps.map((item, index) => {
                                    return (
                                        <div key={index} style={{marginBottom: 50}}>
                                            <h5 className={'instructions-steps'}><i style={{color:'#217947'}} class="fas fa-check-circle"/> <b>Step <span style={{color:'#EA4630'}}>#{index + 1}</span></b></h5>
                                            <p className={'instructions-step'}> {instructions.steps[index]['step']}</p>
                                        </div>
                                    )
                                }
                            )
                            }
                        </Jumbotron>
                    </div>
                </Container>

            )
        } else {
            return (
                <div class="lds-dual-ring"></div>
            )
        }
    }

}

export default Instructions;
