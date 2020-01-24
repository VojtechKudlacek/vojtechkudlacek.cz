import { connect } from 'react-redux';
import Section from './Section';
const mapStateToProps = (state: AppState) => ({
	sceneChanging: state.sceneChanging
});
export default connect(mapStateToProps)(Section);
