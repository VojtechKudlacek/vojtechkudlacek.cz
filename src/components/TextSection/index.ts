import { connect } from 'react-redux';
import TextSection from './TextSection';
const mapStateToProps = (state: AppState) => ({
	sceneChanging: state.sceneChanging
});
export default connect(mapStateToProps)(TextSection);
