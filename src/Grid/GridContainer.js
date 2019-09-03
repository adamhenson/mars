import { connect } from 'react-redux';
import Grid from './Grid';

const mapStateToProps = ({ photos }) => ({
  photos
});

export default connect(mapStateToProps)(Grid);
