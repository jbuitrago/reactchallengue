import React from 'react';
import { Component } from 'react';
import { reduxForm, initialize } from 'redux-form';
import validation from './validation';

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
    //Set date
    var birthdayP = new Date();
    var now = new Date();
    var years = 0;
    var month = 0;
    var day = 0;
    if(items2!=null){
      birthdayP = new Date(items2.birthday);
      month = birthdayP.getMonth() + 1;
      day = birthdayP.getDate() + 1;
      years = calcularEdad(birthdayP);
    }
    
    function calcularEdad(fecha) {
      var hoy = new Date();
      var cumpleanos = new Date(fecha);
      var edad = hoy.getFullYear() - cumpleanos.getFullYear();
      var m = hoy.getMonth() - cumpleanos.getMonth();
  
      if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
          edad--;
      }
  
      return edad;
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
          {birthday.touched && birthday.error && <div className="help-block">{birthday.error}</div>}

          <button className="btn btn-default btn-success" type="submit">
            Save
          </button>
 
        </form>
       
        
       
        {items2 && <div className="alert alert-info" role="alert"> 
       
        Hello {items2.name} from {items2.country}  on {day} of {month} you will have {years}</div>}
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
