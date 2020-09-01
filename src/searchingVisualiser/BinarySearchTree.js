import React, { Component } from "react";

import Header from "../commonUtils/Header";
import * as myConstClass from "../commonUtils/Constants";
import Node from "../commonUtils/Node";

class BinarySearchTree extends Component {
  constructor(props) {
    super(props);
    this.state = {
        tree : null,       // Consists of value, left, right, xAxis, yAxis, parentXAxis, parentYAxis properties
        searchNumber: null
    };
  }

  addNode(){ 
    let userInput = parseInt( document.getElementById("userInput").value );    

    if( !userInput && userInput != 0 )
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

    let searchNumber = parseInt( document.getElementById("userInput").value );  

    if( !searchNumber && searchNumber != 0 )
      return;

      this.setState({ searchNumber });
  }

  render() {
      let { tree, searchNumber } = this.state;
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
            <Node className="number-found-msg font-weight-bold" tree = {tree} searchNumber = {searchNumber} />
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
                   
                    if( currentNode.parentXAxis == null || currentNode.parentYAxis == null ){
                      // This would be second level node
                      currentNode.left = new BST(value, this.xAxis - myConstClass.SECOND_LEVEL_NODE_X_AXIS, this.yAxis + myConstClass.SECOND_LEVEL_NODE_Y_AXIS, this.xAxis, this.yAxis );
                    }
                    else{
                      currentNode.left = new BST(value, currentNode.xAxis - myConstClass.DISTANCE_BETWEEN_NODES, currentNode.yAxis + myConstClass.DISTANCE_BETWEEN_NODES, currentNode.xAxis, currentNode.yAxis );
                    }
                    
                    break;
                }
                currentNode = currentNode.left;
            }   
            else { 
                // Go to the right side of tree
                if( currentNode.right == null ){

                    if( currentNode.parentXAxis == null || currentNode.parentYAxis == null ){
                      // This would be second level node
                      currentNode.right = new BST(value, this.xAxis + myConstClass.SECOND_LEVEL_NODE_X_AXIS, this.yAxis + myConstClass.SECOND_LEVEL_NODE_Y_AXIS, this.xAxis, this.yAxis );
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
