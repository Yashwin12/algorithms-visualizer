import React, { Component } from 'react';
import Header from '../commonUtils/Header';
import Boxes from '../commonUtils/Boxes';
import * as myConstClass from '../commonUtils/Constants';

class LinearSearch extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            buttonDisabled: null,
            array : [],
            numberFoundAt : null,
            message: "",          
         };
    }

    componentDidMount(){
        this.resetArray();
    }

    resetArray(){
        
        let randomArray = [];
        const prevBoxes = document.getElementsByClassName("outer-box"); 
        
        document.getElementById("userInput").value = "";

        for ( let i = 0; i < prevBoxes.length; i++ ){
            prevBoxes[i].style.backgroundColor = myConstClass.DEFAULT_BOX_COLOR;
            prevBoxes[i].classList.remove("highlight");
        }

        for ( let i = 0; i < myConstClass.TOTAL_ARRAY_SIZE; i++ ){                        
            randomArray.push( this.randomNumber( myConstClass.STARTING_ARRAY_RANGE, myConstClass.ENDING_ARRAY_RANGE ) );
        }
        this.setState( { array : randomArray } ); 
    }

    // method to generate random number  
    randomNumber(min, max) {  
        return Math.floor(Math.random() * (max - min) + min); 
    }
    
    linearSearchOnClick(){
        let userInput = document.getElementById("userInput").value;
        
        if( !userInput )
            return;

        let message = "Number not found";
        
        this.setState( { buttonDisabled: true } );
        let numberFoundAt = null
        
        const prevBoxes = document.getElementsByClassName("outer-box");

        for( let idx = 0; idx < this.state.array.length; idx++ ) {
            
            if( this.state.array[idx] ===  parseInt(userInput) ){
                
                message = "Found number at: " ;
                numberFoundAt = idx;

                setTimeout(() => {
                    prevBoxes[idx].style.backgroundColor = myConstClass.NUMBER_FOUND_BOX_COLOR;
                    prevBoxes[idx].classList.add("grow-find");
                    prevBoxes[idx].classList.add("highlight");
                }, idx * myConstClass.LINEAR_ANIMATION_SPEED_SECONDS * 1000);
                
                break;                
            }
            else{
                setTimeout(() => {
                    prevBoxes[idx].style.backgroundColor = myConstClass.VISITED_BOX_COLOR;
                    prevBoxes[idx].classList.add("grow-find");
                    // prevBoxes[idx].classList.add("highlight");

                }, idx * myConstClass.LINEAR_ANIMATION_SPEED_SECONDS * 1000);
            }
        }

        this.setState( { buttonDisabled: false, numberFoundAt, message } );
    }

    resetCurrentViewAndNotArray() {        
        document.getElementById("userInput").value = "";
        this.setState({ message : "", numberFoundAt: null });

        const prevBoxes = document.getElementsByClassName("outer-box"); 
    
        for ( let i = 0; i < prevBoxes.length; i++ ){
            prevBoxes[i].style.backgroundColor = myConstClass.DEFAULT_BOX_COLOR;
            prevBoxes[i].classList.remove("highlight");
        }        
    }

    render() {
        const { buttonDisabled, array, numberFoundAt, message } = this.state;

        return (
            <div>
                <Header title = "Linear Search" />

                <div className="input-group col-xl-11 container justify-content-center">

                    {/*Input bar */}
                    <input 
                        type="number" 
                        id="userInput" 
                        className="form-control col-xl-3" 
                        placeholder="Please enter number"
                    />

                    {/*Search btn */}
                    <button
                        type="button"
                        onClick={ () => this.linearSearchOnClick() }
                        className="btn btn-success col-xl-1"
                        id="search-button"
                        disabled={ buttonDisabled }
                    >
                        Search
                    </button>

                    {/* Reset button */}
                    <button
                        onClick={ () => this.resetCurrentViewAndNotArray() }
                        className="btn btn-dark col-xl-1"
                        type="button"
                        id="binarySearchReset"
                        disabled={ buttonDisabled }
                    > 
                        Reset
                    </button>
                                    
                    {/* Reset Array */}
                    <button
                        type="button"
                        onClick={ () => this.resetArray() }
                        className="btn btn-danger col-xl-1"
                        id="reset-button"
                        disabled={ buttonDisabled }
                    >
                        Reset Array
                    </button>
                
                </div>            

                {/* { numberFoundAt != null ? 
                    (
                        <div> 
                            <label className="number-found-msg font-weight-bold">{message}</label>
                            <label className = "font-weight-bold"> {numberFoundAt} </label>
                        </div>                        
                    ) :
                    (
                        <label className="number-not-found-msg font-weight-bold">{message}</label>
                    ) 
                }     */}

                 {/* Final Boxes */}                                
                <Boxes
                    array = {array}
                    type = "LinearSearch"
                />

            </div>
        );
    }
}

export default LinearSearch;