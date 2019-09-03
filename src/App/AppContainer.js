import { connect } from 'react-redux';
import { fetchPhotosAction } from '../actions/photosAction';
import App from './App';

const mapDispatchToProps = dispatch => ({
  fetchPhotosAction: payload => dispatch(fetchPhotosAction(payload))
});

const mapStateToProps = ({ loader }) => ({
  isLoading: loader.isActive
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
