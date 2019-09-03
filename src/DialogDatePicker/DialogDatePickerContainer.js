import { connect } from 'react-redux';
import DialogDatePicker from './DialogDatePicker';
import { fetchPhotosAction } from '../actions/photosAction';

const mapDispatchToProps = dispatch => ({
  fetchPhotosAction: payload => dispatch(fetchPhotosAction(payload))
});

export default connect(
  null,
  mapDispatchToProps
)(DialogDatePicker);
