export const USERS_NAVIGATE = 'USERS_NAVIGATE';
export const USERS_FETCHING = 'USERS_FETCHING';
export const USERS_FETCHED = 'USERS_FETCHED';
export const USERS_FETCHING_ONE = 'USERS_FETCHING_ONE';
export const USERS_FETCHED_ONE = 'USERS_FETCHED_ONE';
export const USERS_DELETING = 'USERS_DELETING';
export const USERS_SET_SIMULATION = 'USERS_SET_SIMULATION';

import localApi from '../libs/localApi';
import countries from '../libs/countries';


// define a local db for users (simulated async api)
let myAPI = new localApi(
  {
    tableName: 'users', // used as local storage key
    fields: {               // row structure (pre loaded for new item)
      _id: null,            // row key (required)
      name: 'Name',
      surname: 'Surname',
      country: 'Country',
      birthday: 'Birthday'
    },
    delay: 0,               // simulated delay
  }
);

export function navigate(value) {
  return {
    type: USERS_NAVIGATE,
    payload: value
  };
}

export function fetch(values = null) {
  

  return function (dispatch) {
  // show a loading
    dispatch(fetching(values))

    // async load
    myAPI.getAll().then(
      (data) => dispatch(fetched(data))
    );
  }

}

export function fetching(values) {
  return {
    type: USERS_FETCHING,
    data:values
  };
}

export function fetched(data) {
  return {
    type: USERS_FETCHED,
    payload: data
  };
}

export function fetchOne(id = null) {
  
  return function (dispatch) {

    // show a loading
    dispatch(fetchingOne())

    // async load
    myAPI.get(id).then(
      (data) => dispatch(fetchedOne(data))
    );
  }
}

export function fetchingOne() {
  return {
    type: USERS_FETCHING_ONE
  };
}

export function fetchedOne(data) {
  return {
    type: USERS_FETCHED_ONE,
    payload: data
  };
}

export function save(values, callback) {
 
  return function (dispatch) {
    // return the save promise
    return myAPI.save(values);
  }

}

export function remove(id = null) {
  return function (dispatch) {

    // async delete
    myAPI.remove(id).then(
      (data) => dispatch(fetched(data))
    );
  }
}

export function setSimulation(status) {
  if (status) {
    myAPI.delay = 10;
  } else {
    myAPI.delay = 0;
  }

  return {
    type: USERS_SET_SIMULATION,
    payload: status
  };
}
