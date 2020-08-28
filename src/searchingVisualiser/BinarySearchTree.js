import React, { Component } from "react";

import Header from "../commonUtils/Header";
import * as myConstClass from "../commonUtils/Constants";
import Node from "../commonUtils/Node";

class BinarySearchTree extends Component {
  constructor(props) {
    super(props);
    this.state = {
        tree : null       // Consists of value, left, right, xAxis, yAxis, parentXAxis, parentYAxis properties
    };
  }

  addNode(){ 
    let userInput = parseInt( document.getElementById("userInput").value );    

    if( !userInput )
        return;

    let tree = this.state.tree;

    if( tree == null ){
        // Tree is empty, so we can blindly create new tree from the userInput. The current userInput would be the root node.         
        tree = new BST(userInput, Math.floor(window.screen.width / 2), Math.floor(window.screen.height / 5), null, null );
    }
    else{
        // There is at least one node present, so we can directly call insert method of BST.        
        tree.insert(userInput);
    }


    this.setState( { tree } );
  }

  BSTReset() {
    document.getElementById("userInput").value = "";
    this.setState( { tree: null });
  }

  searchNodeInTree() {
    // TODO: Implement me
  }

  render() {
      let { tree } = this.state;
    return (
      <div>
        <Header title="Binary Search Tree" />

        <div className="input-group col-xl-11 container justify-content-center">
          {/*Input bar */}
          <input
            type="number"
            id="userInput"
            className="form-control col-xl-3"
            placeholder="Please enter number"
          />

          {/*Add btn */}
          <button
            type="button"
            onClick={() => this.addNode()}
            className="btn btn-success col-xl-1"
            id="search-button"
            // disabled={buttonDisabled}
          >
            Add
          </button>

          {/*Search btn */}
          <button
            type="button"
            onClick={() => this.searchNodeInTree()}
            className="btn btn-success col-xl-1"
            id="search-button"
            // disabled={buttonDisabled}
          >
            Search
          </button>

          {/*Reset btn */}
          <button
            type="button"
            onClick={() => this.BSTReset()}
            className="btn btn-danger col-xl-1"
            id="search-button"
            // disabled={buttonDisabled}
          >
            Reset
          </button>
        </div>
        <br/>

        {/* Final Tree */}
        {
          tree != null ? 
          (                
              <Node className="number-found-msg font-weight-bold" tree = {tree}/>                                    
          ) :
          (
              <label className="number-not-found-msg font-weight-bold">Please enter an element</label>
          ) 
        }        

      </div>
    );
  }
}

class BST {    
    constructor( value, xAxis, yAxis, parentXAxis, parentYAxis ){
        this.value = value;
        this.left = null;
        this.right = null;
        this.xAxis = xAxis;
        this.yAxis = yAxis;
        this.parentXAxis = parentXAxis;
        this.parentYAxis = parentYAxis;
    }

    insert( value ) {
        let currentNode = this;

        while ( currentNode != null ){
            if ( currentNode.value > value ){
                // Go to the left side of tree

                if( currentNode.left == null ){
                    // 1. Draw a slant line from the parent node on left side.

                    // 2. Add an actual node to the currentNode.

                    if( currentNode.parentXAxis == null || currentNode.parentYAxis == null ){
                      // This would be second level node
                      currentNode.left = new BST(value, this.xAxis - myConstClass.DISTANCE_BETWEEN_NODES, this.yAxis + myConstClass.DISTANCE_BETWEEN_NODES, this.xAxis, this.yAxis );
                    }
                    else{
                      currentNode.left = new BST(value, currentNode.xAxis - myConstClass.DISTANCE_BETWEEN_NODES, currentNode.yAxis + myConstClass.DISTANCE_BETWEEN_NODES, currentNode.xAxis, currentNode.yAxis );
                    }
                    
                    // 3. Draw circle and display value in the circle. 

                    break;
                }
                currentNode = currentNode.left;
            }   
            else { 
                // Go to the right side of tree
                if( currentNode.right == null ){

                    if( currentNode.parentXAxis == null || currentNode.parentYAxis == null ){
                      // This would be second level node
                      currentNode.right = new BST(value, this.xAxis + myConstClass.DISTANCE_BETWEEN_NODES, this.yAxis + myConstClass.DISTANCE_BETWEEN_NODES, this.xAxis, this.yAxis );
                    }
                    else{
                      currentNode.right = new BST(value, currentNode.xAxis + myConstClass.DISTANCE_BETWEEN_NODES, currentNode.yAxis + myConstClass.DISTANCE_BETWEEN_NODES, currentNode.xAxis, currentNode.yAxis );
                    }

                    break;                    
                }
                currentNode = currentNode.right;
            }    
        }
        return this;
    }
}

export default BinarySearchTree;
