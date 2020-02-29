import { JOURNEY_DATA } from "../constants/action-types";
const initialState = {
  journey: [],
};
// function rootReducer(state = initialState, action) {
//   if (action.type === ADD_BOOK) {
//     state.books.push(action.payload);
//   }
//   return state;
// }
function rootReducer(state = initialState, action) {
    if (action.type === JOURNEY_DATA) {
      console.log("processing in reducer")
      return Object.assign({}, state, {
        journey: state.journey.concat(action.payload)
      });
    }
    return state;
  }
  
export default rootReducer;