import { connect } from 'react-redux';
import BackgroundImage from './BackgroundImage';
const mapStateToProps = (state: AppState) => ({
	sceneChanging: state.sceneChanging
});
export default connect(mapStateToProps)(BackgroundImage);
