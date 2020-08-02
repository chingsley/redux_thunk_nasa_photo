import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import Loader from 'react-loader-spinner';

import { getPhoto } from '../store/actions';

class NASAPhoto extends React.Component {
  state = {
    date: moment().format('YYYY-MM-DD'),
    imgLoaded: false,
  };

  // setDate = (value) => {
  //   this.setState({ date: value });
  // };

  // fetchPhoto = (e) => {
  //   e.preventDefault();
  //   this.setState({ imgLoaded: false });
  //   this.props.getPhoto(this.state.date);
  // };

  fetchPhotoForToday = (e) => {
    e.preventDefault();
    this.setState({ imgLoaded: false });
    this.props.getPhoto(moment().format('YYYY-MM-DD'));
  };

  getPhotoByDate = (e) => {
    e.preventDefault();
    const selectedDate = e.target.value;
    this.setState({ imgLoaded: false, date: selectedDate });
    this.props.getPhoto(selectedDate);
  };

  render() {
    return (
      <>
        <h2>
          NASA Photo of the day{' '}
          <span role="img" aria-label="rocket">
            🚀
          </span>
        </h2>
        <form className="date-input-wrap" onSubmit={this.handleDateUpload}>
          <input
            className="date-picker"
            required
            type="date"
            value={this.state.date}
            // onChange={({ target: { value } }) => this.setDate(value)}
            onChange={this.getPhotoByDate}
            placeholder="Select Date"
            min="2000-01-01"
            max={moment().format('YYYY-MM-DD')}
          />
          <Button color="info" onClick={this.fetchPhotoForToday}>
            <span role="img" aria-label="satelite"></span>🛰 See today's photo{' '}
            <span role="img" aria-label="camera">
              📸
            </span>
          </Button>
        </form>
        <div className="display-unit">
          {this.props.photoOfTheDay && (
            <div>
              <h4>{this.props.photoOfTheDay.title}</h4>
              <div className="img-container">
                <img
                  src={this.props.photoOfTheDay.url}
                  alt="NASA pic of the day"
                  style={this.state.imgLoaded ? {} : { display: 'none' }}
                  onLoad={() => this.setState({ imgLoaded: true })}
                />
              </div>
              <p>{this.props.photoOfTheDay.explanation}</p>
            </div>
          )}
          {this.props.isLoading && (
            <Loader
              type="Ball-Triangle"
              color="#00BFFF"
              height="90"
              width="60"
            />
          )}
          {this.props.error && <p className="error">{this.props.error}</p>}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  photoOfTheDay: state.photoOfTheDay,
  error: state.error,
  isLoading: state.isLoading,
});

export default connect(mapStateToProps, { getPhoto })(NASAPhoto);
