import axios from 'axios';

export const FETCH_PHOTO_START = 'FETCH_PHOTO_START';
export const FETCH_PHOTO_SUCCESS = 'FETCH_PHOTO_SUCCESS';
export const FETCH_PHOTO_FAILURE = 'FETCH_PHOTO_FAILURE';

export const getPhoto = (date) => async (dispatch) => {
  try {
    console.log(date);
    dispatch({ type: FETCH_PHOTO_START });
    const response = await axios.get(
      `https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date=${date}`
    );
    // console.log('response = ', response);
    const { data } = response;
    dispatch({ type: FETCH_PHOTO_SUCCESS, payload: data });
  } catch (err) {
    console.log('error = ', JSON.stringify(err));
    if (err.response) {
      const { data } = err.response;
      if (data.error) {
        dispatch({ type: FETCH_PHOTO_FAILURE, payload: data.error.message });
      } else if (data.msg) {
        dispatch({ type: FETCH_PHOTO_FAILURE, payload: data.msg });
      } else {
        dispatch({ type: FETCH_PHOTO_FAILURE, payload: err.message });
      }
    } else {
      dispatch({ type: FETCH_PHOTO_FAILURE, payload: err.message });
    }
  }
};
