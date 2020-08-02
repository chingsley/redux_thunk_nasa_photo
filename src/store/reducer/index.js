import {
  FETCH_PHOTO_START,
  FETCH_PHOTO_SUCCESS,
  FETCH_PHOTO_FAILURE,
} from '../actions';

const initialState = {
  photoOfTheDay: null,
  isLoading: false,
  error: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PHOTO_START:
      return {
        ...state,
        isLoading: true,
        photoOfTheDay: null,
        error: '',
      };
    case FETCH_PHOTO_SUCCESS:
      return {
        ...state,
        photoOfTheDay: action.payload,
        isLoading: false,
        error: '',
      };
    case FETCH_PHOTO_FAILURE:
      return {
        ...state,
        photoOfTheDay: null,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
