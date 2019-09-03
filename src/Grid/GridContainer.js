import { connect } from 'react-redux';
import Grid from './Grid';
import { fetchPhotosAction } from '../actions/photosAction';

const mapDispatchToProps = dispatch => ({
  fetchPhotosAction: payload => dispatch(fetchPhotosAction(payload))
});

const mapStateToProps = ({ photos }) => ({
  photos
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Grid);
