export default function Notification({ notification }) {
  if (!notification) return null;
  let notificationStyle = {
    color: notification.type === 'error' ? 'red' : 'green',
    backgroundColor: 'lightgrey',
    fontSize: 20,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };
  return <div style={notificationStyle}>{notification.message}</div>;
}
