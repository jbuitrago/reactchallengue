import React from 'react';
import { Component } from 'react';

import {SceneLink} from '../Scenes';

export default class List extends Component {
  componentWillMount() {
    this.props.fetch();
  }

  renderList(items) {
    return items.map((item) => {
      return (
        <tr key={item._id}>
          <td>
            {item.name}&nbsp;{item.surname}
          </td>
          <td>
            {item.country}
          </td>
          <td>
            {item.birthday}
          </td>
          <td>
            <SceneLink param={item._id} onClick={this.props.remove}>Remove</SceneLink>
          </td>
        </tr>
      );
    });
  }

  render() {
    const { items, itemsFetching } = this.props;

    if (itemsFetching) {
      return (
        <div className="alert alert-warning" role="alert">
          Loading...
        </div>
      );
    }

    if (!items || items.length<1) {
      return (
        <div className="alert alert-info" role="alert">
           No hay usuarios registrados.
        </div>
      );
    }

    return (
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Country</th>
            <th>Birthday</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {this.renderList(items)}
        </tbody>
      </table>
    );

  }

}
