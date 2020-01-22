import { connect } from 'react-redux';
import Projects from './Projects';
const mapStateToProps = (state: AppState) => ({
	sceneChanging: state.sceneChanging
});
export default connect(mapStateToProps)(Projects);
