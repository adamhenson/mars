import { connect } from 'react-redux';
import App from './App';

const mapStateToProps = ({ loader }) => ({
  isLoading: loader.isActive
});

export default connect(mapStateToProps)(App);
