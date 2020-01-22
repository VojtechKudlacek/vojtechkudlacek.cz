import { connect } from 'react-redux';
import SideLink from './SideLink';
const mapStateToProps = (state: AppState) => ({
	sceneChanging: state.sceneChanging
});
export default connect(mapStateToProps)(SideLink);
