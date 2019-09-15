import { connect } from 'react-redux';
import ExploreForm from './ExploreFormDumb';

const mapStateToProps = ({ explore: { category } }) => ({ category });

export default connect(mapStateToProps)(ExploreForm);
