import { connect } from 'react-redux';
import ExploreForm from './ExploreFormDumb';
import { changeTerm } from '../../../actions/explore';

const mapStateToProps = ({ explore: { category, term } }) => ({
  category,
  term,
});

const mapDispatchToProps = dispatch => ({
  handleChange(e) {
    dispatch(changeTerm(e.target.value));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExploreForm);
