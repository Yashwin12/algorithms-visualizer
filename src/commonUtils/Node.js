import React, { Component, useRef } from "react";
import shallowCompare from 'react-addons-shallow-compare'; // ES6

class Node extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            rootNodeFound : false,
            context: null
         };
        this.canvasRef = React.createRef();      
    }

    componentDidMount() {        
        this.setState( { context: this.canvasRef.current.getContext('2d') } ) // We would be setting the context once in the state and then refer it elsewhere.  
    }

    visualizeTree( tree ){
        this.preOrderHelperMethod ( tree );        
    }

    preOrderHelperMethod ( tree ){

        this.drawCircle( tree.xAxis, tree.yAxis, tree.value, "white", "black", "black" );

        if( tree.left != null ){
            this.drawLine( tree.left.xAxis, tree.left.yAxis, tree.left.parentXAxis, tree.left.parentYAxis, "black");
            this.preOrderHelperMethod ( tree.left );  
        }  
        
        if( tree.right != null ){
            this.drawLine( tree.right.xAxis, tree.right.yAxis, tree.right.parentXAxis, tree.right.parentYAxis, "black");
            this.preOrderHelperMethod ( tree.right );  
        }   
    }

    drawCircle( xAxis, yAxis, value, circleBackgroundColor, circleBorder, fontColor ){
        
        var context = this.state.context;

        context.beginPath();
        context.lineWidth = 5;

        // arc( x, y, circle's radius, startingAngle, endingAngle, counterClockWise )
        context.arc( xAxis, yAxis, 20, 0, 2 * Math.PI, true);  

        context.fillStyle = circleBackgroundColor;
        context.fill();       
        context.strokeStyle = circleBorder;
        context.stroke();

        // ******************* This is for the text inside the circle ****************************
        context.beginPath()
        context.font = "15px Arial"
        context.fillStyle = fontColor;
        context.fill();
        context.textAlign = "center";
        context.fillText(value, xAxis, yAxis + 5)
        context.stroke();
    }

    drawLine( xAxis, yAxis, parentXAxis, parentYAxis, lineColor ){

        var context = this.state.context;   
        // Reset the current path
        context.beginPath(); 
        // Staring point (x1,y1)
        context.moveTo(parentXAxis - 5, parentYAxis + 20);        
        // End point (x2,y2)
        context.lineTo(xAxis,yAxis - 20 );
        // Line color       
        context.strokeStyle = lineColor;
        // Make the line visible
        context.stroke();        
    }

    visualizeSearchNumber( tree, searchNumber ){
        
        this.drawCircle( tree.xAxis, tree.yAxis, tree.value, "red", "red", "white");
        
        // This is for the circle animation...
        setTimeout(() => {
            this.drawCircle( tree.xAxis, tree.yAxis, tree.value, "white", "red", "red" );          
        }, 500 );     

        if ( tree.value == searchNumber ){
            setTimeout(() => {
                this.drawCircle( tree.xAxis, tree.yAxis, tree.value, "green", "black", "white" );          
            }, 1500 );            
        }        
        else if ( tree.value > searchNumber && tree.left != null ){
            // Go left 

            setTimeout(() => {                
                this.drawLine( tree.left.xAxis, tree.left.yAxis, tree.left.parentXAxis, tree.left.parentYAxis, "red");                         
                return this.visualizeSearchNumber( tree.left, searchNumber );
            }, 1500 );               
        }
        else if( tree.value < searchNumber && tree.right != null ) {
            // Go right            
            
            setTimeout(() => {              
                this.drawLine( tree.right.xAxis, tree.right.yAxis, tree.right.parentXAxis, tree.right.parentYAxis, "red");           
                return this.visualizeSearchNumber( tree.right, searchNumber );
            }, 1500 );        
        }
    }

    render() {
        let { tree, searchNumber } = this.props;

        if( tree == null )
            return;

        return (
            <span>                                                              
                <canvas ref = {this.canvasRef} width={window.screen.width} height={window.screen.height} />
                { this.state.context != null && this.visualizeTree(tree) }  
                { searchNumber != null && this.visualizeSearchNumber( tree, searchNumber ) }  
            </span>
        );
    }
}

export default Node;