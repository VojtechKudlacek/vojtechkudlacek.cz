import { connect } from 'react-redux';
import Projects from './Projects';
const mapStateToProps = (state: AppState) => ({
	projects: state.projects
});
export default connect(mapStateToProps)(Projects);
