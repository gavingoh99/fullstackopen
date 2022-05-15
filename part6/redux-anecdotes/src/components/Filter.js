import { connect } from 'react-redux';
import { createFilter } from '../reducers/filterReducer';
const Filter = (props) => {
  const addFilter = (event) => {
    const filter = event.target.value;
    props.createFilter(filter);
  };
  return (
    <div style={{ marginBottom: 10 }}>
      <label htmlFor='filter'>filter</label>
      <input id='filter' name='filter' onChange={addFilter} />
    </div>
  );
};
const mapDispatchToProps = {
  createFilter,
};

export default connect(null, mapDispatchToProps)(Filter);
