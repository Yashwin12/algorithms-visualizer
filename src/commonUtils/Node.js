import React, { Component } from "react";
import shallowCompare from 'react-addons-shallow-compare'; // ES6


import * as myConstClass from "../commonUtils/Constants";

class Node extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            rootNodeFound : false
         };
    }

    // TODO_YASH: Implement this properly.
    shouldComponentUpdate(nextProps, nextState) {

        return shallowCompare(nextProps.tree, this.props.tree);
    }

    visualizeTree( tree ){
        return this.preOrderHelperMethod ( tree, [] );
    }

    preOrderHelperMethod ( tree, renderedNodes ){

        renderedNodes.push(
            <span className = "circle" style = { { position: "absolute", left: tree.xAxis, top: tree.yAxis } }>
                {tree.value}
            </span>                
        )

        if( tree.left != null ){
            this.preOrderHelperMethod ( tree.left, renderedNodes );  
        }

        if( tree.right != null ){
            this.preOrderHelperMethod ( tree.right, renderedNodes );  
        }

        return renderedNodes;
    }


    // visualizeTree( tree ){
        
    //     let renderedNodes = [];

    //     let currentNode = tree;
        
    //     while( currentNode != null && ( currentNode.left != null || currentNode.right != null || this.state.rootNodeFound == false ) ){            
    //         if( currentNode.value != null && this.state.rootNodeFound == false ){
    //             // First (root) node of the tree, let's welcome him.
    //             renderedNodes.push(
    //                 <span className = "circle">
    //                     {currentNode.value}
    //                 </span>                
    //             )
    //             this.setState({ rootNodeFound : true });
    //         }

    //         if ( currentNode.left != null ){

    //             renderedNodes.push( 
    //                 <span>
    //                     <svg height="400" width="400">
    //                         <path id="e4" className="ude" d="M243.21275476013105,106.11043191730121L151.78724523986892,143.8895680826988" stroke="#334" stroke-width="3"> </path>  Sorry, your browser does not support inline SVG.
    //                     </svg>
    //                     <span className = "circle">
    //                         {currentNode.left.value}
    //                     </span>         
    //                 </span>                                        
    //             )                
    //             // this.visualizeTree( current.left )
    //         }

    //         if ( currentNode.right != null ){

    //             renderedNodes.push( 
    //                 <span>
    //                     <svg height="400" width="400">
    //                         <path id="e4" className="ude" d="M243.21275476013105,106.11043191730121L151.78724523986892,143.8895680826988" stroke="#334" stroke-width="3"> </path>  Sorry, your browser does not support inline SVG.
    //                     </svg>
    //                     <span className = "circle">
    //                         {currentNode.right.value}
    //                     </span>         
    //                 </span>                                        
    //             )            
    //         }

    //         // return;

    //     return renderedNodes;
    //     }

    //     return renderedNodes;

    //     // return(
    //     //     <div>
    //     //         <span className = "circle">
    //     //             {tree.value}
    //     //         </span>
                
    //     //     </div>
                        
    //     // );
        
    // }

    render() {
        let { tree } = this.props;

        if( tree == null )
            return;

        console.table({tree});
        return (
            <div>
                { this.visualizeTree(tree) }
            </div>
        );
    }
}

export default Node;