import React, { Component } from 'react';

class Boxes extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        
        return (
            <div>
                {
                    this.props.array.map( (ele, idx) => (
                        <div className= "outer-box" key = {idx}>
                            {ele}
                            <span>{idx}</span>
                        </div> 
                    ))
                }                            
            </div>
        );
    }
}

export default Boxes;