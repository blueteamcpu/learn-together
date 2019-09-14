import { connect } from 'react-redux';
import Cards from './ExploreCardsDumb';

const mapStateToProps = ({ explore }) => explore;

export default connect(mapStateToProps)(Cards);
