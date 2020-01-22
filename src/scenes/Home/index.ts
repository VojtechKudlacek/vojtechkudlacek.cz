import { connect } from 'react-redux';
import Home from './Home';
const mapStateToProps = (state: AppState) => ({
	sceneChanging: state.sceneChanging
});
export default connect(mapStateToProps)(Home);
