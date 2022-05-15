import { connect } from 'react-redux';
const Notification = (props) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  };
  if (!props.notification) return null;
  return <div style={style}>{props.notification}</div>;
};
const mapStateToProps = (state) => {
  return {
    notification: state.notification.content,
  };
};
export default connect(mapStateToProps)(Notification);
