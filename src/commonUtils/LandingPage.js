import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <h1> Happy Visualization! </h1>
        <br/>
        <table className="table table-striped">
          <thead className = "thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Algorithm Visualiser</th>
              <th scope="col">Algorithm Type</th>
              <th scope="col">Average Time Complexity</th>
              <th scope="col">Average Space Complexity</th>
              <th scope = "col">External Reference</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td scope="row">1</td>
              <NavLink to="/linear-search">Linear Search</NavLink>              
              <td>Searching</td>
              <td>O(n)</td>
              <td>O(1)</td>
              <a target="_blank" href= "https://www.tutorialspoint.com/data_structures_algorithms/linear_search_algorithm.htm">Linear Search</a>
            </tr>

            <tr>
              <td scope="row">2</td>
              <NavLink to="/binary-search">Binary Search</NavLink>
              <td>Searching</td>
              <td>O(n)</td>
              <td>O(log(n))</td>
              <a target="_blank" href= "https://www.tutorialspoint.com/data_structures_algorithms/binary_search_algorithm.htm">Binary Search</a>
            </tr>            
          </tbody>
        </table>
      </div>
    );
  }
}

export default LandingPage;
