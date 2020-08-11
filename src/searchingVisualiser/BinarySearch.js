import React, { Component } from 'react';
import Header from '../commonUtils/Header';
import Boxes from '../commonUtils/Boxes';
import * as myConstClass from '../commonUtils/Constants';

class BinarySearch extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            buttonDisabled: null,
            array : [],
            numberFoundAt : null,
            message: "",          
         };
    }

    componentDidMount() {
        this.resetArray();
    }

    resetArray(){
        
        let randomArray = [];
        const prevBoxes = document.getElementsByClassName("outer-box"); 
        
        document.getElementById("userInputBinary").value = "";

        for ( let i = 0; i < prevBoxes.length; i++ ){
            prevBoxes[i].style.backgroundColor = myConstClass.DEFAULT_BOX_COLOR;
            prevBoxes[i].classList.remove("highlight");
            prevBoxes[i].classList.remove("growFind");
        }

        for ( let i = 0; i < myConstClass.TOTAL_ARRAY_SIZE; i++ ){                        
            randomArray.push( this.randomNumber( myConstClass.STARTING_ARRAY_RANGE, myConstClass.ENDING_ARRAY_RANGE ) );
        }
        randomArray.sort( (a,b) =>{
            return a - b; 
        });
        
        this.setState( { array : randomArray } ); 
    }

    // method to generate random number  
    randomNumber(min, max) {  
        return Math.floor(Math.random() * (max - min) + min); 
    }
    
    binarySearchOnClick(){
        let userInput = document.getElementById("userInputBinary").value;
        
        if( !userInput )
            return;

        const prevBoxes = document.getElementsByClassName("outer-box");        
        let animations = []; // Conists of left, right, mid and numberFound
        let count = 0;

        this.setState( { buttonDisabled: true } );

        this.binarySearchAnimations(0, this.state.array.length - 1, parseInt(userInput), animations);

        while ( count < animations.length ){

            const [left, right, middle, numberFound] = animations[count];
            console.table( {left, right, middle, numberFound} );
            
            if( count === animations.length - 1 && numberFound ===true ){
                setTimeout(() => {
                    this.setState({ numberFoundAt: middle, message : "Number found at: " });

                    this.resetAllTiles(prevBoxes);
                
                    prevBoxes[middle].style.backgroundColor = myConstClass.NUMBER_FOUND_BOX_COLOR;
                    prevBoxes[middle].classList.add("grow-find");
                    prevBoxes[middle].classList.add("highlight");
    
                }, ( count + 1 ) * 1000 * myConstClass.BINARY_ANIMATION_SPEED_SECONDS );                 
                
            }

            else if ( count === animations.length - 1 && numberFound === false ) {
                setTimeout(() => {
                    console.log("Number not found");
                    this.setState({
                        message: `Number not found`
                    });
                    this.resetAllTiles(prevBoxes);
                }, (count + 1) * myConstClass.BINARY_ANIMATION_SPEED_SECONDS * 1000);
            }

            setTimeout(() => {
                this.resetAllTiles(prevBoxes);
                this.hightlightWithinBounds(left, right, prevBoxes);
            }, count * 1000 * myConstClass.BINARY_ANIMATION_SPEED_SECONDS);
            count++;
            
        } // end of for loop

        setTimeout(() => {
            this.setState({ buttonDisabled: false });
        }, count * 1000 * myConstClass.BINARY_ANIMATION_SPEED_SECONDS);

    } //end of binarySearchOnClick() method

    binarySearchAnimations( left, right, userInput, animations ){

        while ( left <= right ){
            let middle = Math.floor( left + (right - left) /2 ); // This is preferred over let middle = (left + right) / 2;

            if( this.state.array[middle] === userInput ){                
                animations.push( [left, right, middle, true] );               
                break;            
            }         
            else if ( this.state.array[middle] > userInput ) {
                animations.push( [left, right, middle, false] );
                right = middle - 1;
            }
            else {
                animations.push( [left, right, middle, false]) ;
                left = middle + 1;
            }
        }      
    }

    hightlightWithinBounds(start, end, arrayTiles) {
        for (let i = start; i <= end; i++) {
            arrayTiles[i].style.backgroundColor = myConstClass.NOT_FOUND_COLOR;
            arrayTiles[i].style.transition = "100ms all";
        }
    }

    resetAllTiles(arrayTiles) {
        for (let i = 0; i < arrayTiles.length; i++) {
            arrayTiles[i].style.backgroundColor = myConstClass.DEFAULT_BOX_COLOR;
            arrayTiles[i].classList.remove("highlight");
            arrayTiles[i].style.transition = "100ms all";
        }
    }

    resetCurrentViewAndNotArray() {        
        document.getElementById("userInputBinary").value = "";
        this.setState({ message : "", numberFoundAt: null });
        this.resetAllTiles( document.getElementsByClassName("outer-box") );
    }

    render() {
        const { buttonDisabled, array, numberFoundAt, message } = this.state;

        return (
            <div>

                <Header title = "Binary Search" />
                 
                <div className="input-group col-xl-11 container justify-content-center">

                    {/*Input bar */}
                    <input 
                        type="number" 
                        id="userInputBinary" 
                        className="form-control col-xl-3" 
                        placeholder="Please enter number"
                    />      

                     {/*Search btn */}
                    <button
                        type="button"
                        onClick={ () => this.binarySearchOnClick() }
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
                
                { numberFoundAt != null ? 
                    (
                        <div> 
                            <label className="number-found-msg font-weight-bold">{message}</label>
                            <label className = "font-weight-bold"> {numberFoundAt} </label>
                        </div>                        
                    ) :
                    (
                        <label className="number-not-found-msg font-weight-bold">{message}</label>
                    ) 
                }
        
                 {/* Final Boxes */}
                <Boxes
                    array = {array}
                    type = "BinarySearch"
                />

            </div>
        );
    }
}

export default BinarySearch;