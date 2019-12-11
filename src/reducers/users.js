import {
  USERS_NAVIGATE,
  USERS_FETCHING,
  USERS_FETCHED,
  USERS_FETCHING_ONE,
  USERS_FETCHED_ONE,
  USERS_SET_SIMULATION
} from '../actions/users';

const INITIAL_STATE = {
  scene: 'list',          
  items: [],              
  itemsFetching: false,   
  item: null,             
  itemFetching: false,    
  simulated: false,      
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    // change the scene (form / list)
    case USERS_NAVIGATE:
      return { ...state, scene: action.payload };

    // the list is being loaded, show the loading.. and reset the items
    case USERS_FETCHING:
      return { ...state, itemsFetching: true, items: [] };

    // hide the loading and set the loaded data into items
    case USERS_FETCHED:
      return { ...state, itemsFetching: false, items: action.payload};

    // one item is being loaded, show a loading.. inside the form and reset the current item
    case USERS_FETCHING_ONE:
      return { ...state, itemFetching: true, item: null};

    // hide the loading.. inside the form and set the loaded data into our 'item'
    case USERS_FETCHED_ONE:
      return { ...state, itemFetching: false, item: action.payload};

    // status change on the simulation checkbox
    case USERS_SET_SIMULATION:
      return { ...state, simulated: action.payload};

    // do nothing
    default:
      return state;
  }
}
