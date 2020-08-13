import React, { Component } from "react";

import * as myConstClass from "../commonUtils/Constants";

class Node extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            rootNode : false
         };
    }

    visualizeTree( tree ){
        
     return(
         <span className = "circle">
             {tree.value}
         </span>
     );
        
    }

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