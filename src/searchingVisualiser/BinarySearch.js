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

        let message = "Number not found";
        
        this.setState( { buttonDisabled: true } );
        let numberFoundAt = null
        
        const prevBoxes = document.getElementsByClassName("outer-box");

        let left = 0; 
        let right = this.state.array.length - 1;
        let count = 0;

        this.hightlightWithinBounds(left, right, prevBoxes);

        while ( left < right ){
            let middle = Math.round( left + (right - left)/2 ); // This is preferred over let middle = (left + right) / 2;
            // console.table( { left, right, middle} );
            count++;

            if( this.state.array[middle] == userInput ){                
                message = "Found number at " + middle;
                setTimeout(() => {
                    this.resetAllTiles(prevBoxes);

                    prevBoxes[middle].style.backgroundColor = myConstClass.NUMBER_FOUND_BOX_COLOR;
                    prevBoxes[middle].classList.add("grow-find");
                    prevBoxes[middle].classList.add("highlight");

                    numberFoundAt = middle;
                }, ( count + 1 ) * myConstClass.BINARY_ANIMATION_SPEED_SECONDS * 1000);                
                break;            
            }         
            else if ( this.state.array[middle] > userInput ) {
                right = middle - 1;
            }
            else {
                left = middle + 1;
            }

            setTimeout(() => {             
                this.resetAllTiles(prevBoxes);
                this.hightlightWithinBounds(left, right, prevBoxes);
            }, count * 1000 * myConstClass.BINARY_ANIMATION_SPEED_SECONDS );
        }

        setTimeout(() => {
            this.setState({ buttonDisabled: false });
        }, count * 1000 * myConstClass.BINARY_ANIMATION_SPEED_SECONDS);

    } //end of binarySearchOnClick() method

    hightlightWithinBounds(start, end, arrayTiles) {
        for (let i = start; i <= end; i++) {
            arrayTiles[i].style.backgroundColor = myConstClass.NOT_FOUND_COLOR;
            arrayTiles[i].style.transition = "100ms all";
        }
    }

    resetAllTiles(arrayTiles) {
        for (let i = 0; i < arrayTiles.length; i++) {
            arrayTiles[i].style.backgroundColor = myConstClass.DEFAULT_BOX_COLOR;
            arrayTiles[i].style.transition = "100ms all";
        }
    }

    render() {
        const { buttonDisabled, array } = this.state;

        return (
            <div>

                <Header title = "Binary Search" />

                 {/*Input bar */}
                 <input 
                    type="number" 
                    id="userInputBinary" 
                    // className="form-control" 
                    placeholder="Please enter number"
                />

                 {/*Search btn */}
                 <button
                    type="button"
                    onClick={ () => this.binarySearchOnClick() }
                    className="btn-green"
                    id="search-button"
                    disabled={ buttonDisabled }
                >
                    Search
                </button>
                                 
                 {/* Reset Array */}
                <button
                    type="button"
                    onClick={ () => this.resetArray() }
                    className="btn btn-red"
                    id="reset-button"
                    disabled={ buttonDisabled }
                >
                    Reset Array
                </button>

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