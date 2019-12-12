import React from 'react';
import { Component } from 'react';
import { reduxForm, initialize } from 'redux-form';
import validation from './validation';

// scenes is a silly trick to avoid routes, check the file to see it how works
import {SceneLink} from '../Scenes';

class UserForm extends Component {

  constructor(props) {
    super(props)
    this.state = { countries: [] }
  }


  componentWillMount() {
    fetch('https://restcountries.eu/rest/v2/all')
      .then((response) => {
        return response.json()
      })
      .then((countries) => {
        
        this.setState({ countries: countries })
      })
  }




  render() {

    const { fields: {name, surname,country,birthday}, item, itemFetching, handleSubmit, submitting, error,items2 } = this.props;

    if (itemFetching) {
      return (
        <div className="alert alert-warning" role="alert">
          Loading...
        </div>
      );
    }

   /* if (!item) {
      return (
        <div className="alert alert-danger" role="alert">
          Failed to load
        </div>
      );
    }*/

    return (
      <fieldset disabled={this.props.submitting}>
        <form onSubmit={handleSubmit(this.props.save)}>
          <div className="form-group">
            <label>Name</label>
            <input className="form-control" type="text" placeholder="Name" {...name}/>
            {name.touched && name.error && <div className="help-block">{name.error}</div>}
          </div>

          <div className="form-group">
            <label>Surname</label>
            <input className="form-control" type="text" placeholder="surname" {...surname}/>
            {surname.touched && surname.error && <div className="help-block">{surname.error}</div>}
          </div>
          <div className="form-group">
            <label>Country</label>
            <select  className="form-control" placeholder="country" {...country}>
            {this.state.countries.map( (country)=> {

                return (<option>{country.name}</option>);

              })}
            
            </select>
              
          </div>
          <div className="form-group">
            <label>Birthday</label>
            <input className="form-control" type="date" placeholder="birthday" {...birthday}/>
          </div>          
          {error && <div className="help-block">{error}</div>}

          <button className="btn btn-default btn-success" type="submit">
            Save
          </button>
 
        </form>
        {items2 && <div className="alert alert-info" role="alert"> Hello {items2.name} from {items2.country}  on {items2.birthday} of {items2.birthday} you will have {items2.birthday}</div>}
        </fieldset>

    );
  }

}

UserForm = reduxForm({
  form: 'newUserForm',
  fields: ['name', 'surname','country','birthday','_id'],
  validate: validation
},
state => ({ // mapStateToProps
  initialValues: state.users.item, // will pull state into form's initialValues
  items2:state.users.items2
})
)(UserForm);

export default UserForm;
