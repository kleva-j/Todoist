import {
  FETCH_PROJECT_REQUEST,
  FETCH_PROJECT_FULLFILLED,
  FETCH_PROJECT_SUCCESS,
  FETCH_PROJECT_FAILURE
} from "../actionCreators/projectActions";


const initialState = {
  projects: []
};

export const projectReducer = (state = initialState, action) => {

  switch (action.type) {
    case FETCH_PROJECT_REQUEST:
      return state;

    case FETCH_PROJECT_FULLFILLED:
      const { payload } = action;
      return { ...state, projects: payload };

    case FETCH_PROJECT_SUCCESS:
      return state;

    case FETCH_PROJECT_FAILURE:
      return state;
  
    default:
      return state;
  }
};
