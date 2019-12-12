import React from 'react';
import { Component } from 'react';

import List from './List';
import Form from './Form';


export default class Users extends Component {

  componentWillMount() {
    this.props.setSimulation(this.props.simulated);

  }

  render() {
    return (
      <div className="row">
        <h1>
          Users
        </h1>
         <div className="col-md-4">
          <Form {...this.props} />
         </div>
         <div className="col-md-8">
          <List {...this.props} />
           </div>
         
      </div>

    );
  }

}
