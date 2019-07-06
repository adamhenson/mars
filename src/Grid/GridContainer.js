import { connect } from 'react-redux';
import Grid from './Grid';
import { fetchPhotosAction } from '../actions/photosAction';

const mapDispatchToProps = dispatch => ({
  fetchPhotosAction: () => dispatch(fetchPhotosAction()),
});

const mapStateToProps = ({ photos }) => ({
  photos,
});

export default connect(mapStateToProps, mapDispatchToProps)(Grid);
