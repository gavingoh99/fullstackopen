export default function Notification({ notification }) {
  const style = {
    backgroundColor: 'lightgrey',
    color: notification.type === 'info' ? 'green' : 'red',
    padding: 10,
  };
  return <div style={style}>{notification.notification}</div>;
}
