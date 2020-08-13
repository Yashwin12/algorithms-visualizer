import React, { Component } from "react";

import Header from "../commonUtils/Header";
import * as myConstClass from "../commonUtils/Constants";
import Node from "../commonUtils/Node";

class BinarySearchTree extends Component {
  constructor(props) {
    super(props);
    this.state = {
        // BSTArray = [],
        tree : null       // Consists of value, left and right properties
    };
  }

  addNode(){ 
    let userInput = parseInt( document.getElementById("userInput").value );    

    if( !userInput )
        return;

    let tree = this.state.tree;

    if( tree == null ){
        // Tree is empty, so we can blindly create new tree from the userInput. The current userInput would be the root node. 
        tree = new BST(userInput);
    }
    else{
        // There is at least one node present, so we can directly call insert method of BST.
        tree.insert(userInput);
    }

    // console.log(tree);

    this.setState( { tree } );

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
            onClick={() => this.findNodeInTree()}
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
            className="btn btn-success col-xl-1"
            id="search-button"
            // disabled={buttonDisabled}
          >
            Reset
          </button>
        </div>
        <br/>

        {/* Final Tree */}
        {/* TODO: Complete BST construnction over here using BST class */}
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
    constructor( value ){
        this.value = value;
        this.left = null;
        this.right = null;
    }

    insert( value ) {
        let currentNode = this;

        while ( currentNode != null ){
            if ( currentNode.value > value ){
                // Go to the left side of tree

                if( currentNode.left == null ){
                    currentNode.left = new BST(value);
                    break;
                }
                currentNode = currentNode.left;
            }   
            else { 
                // Go to the right side of tree
                if( currentNode.right == null ){
                    currentNode.right = new BST(value);
                    break;
                }
                currentNode = currentNode.right;
            }    
        }
        return this;
    }
}

export default BinarySearchTree;
