export default function Notification({ notification }) {
  const style = {
    backgroundColor: 'lightgrey',
    color: notification.type === 'info' ? 'green' : 'red',
    padding: 10,
    border: 'solid',
  };
  return (
    <div className='notification' style={style}>
      {notification.notification}
    </div>
  );
}
