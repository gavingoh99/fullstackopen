import { useSelector } from 'react-redux';
import styled from 'styled-components';

const NotificationDiv = styled.div`
  padding: 10px 25px;
  background: papayawhip;
  text-align: center;
  border: 1px solid;
`;
const Notification = () => {
  const notification = useSelector((state) => state.notification);

  if (!notification.content) return null;

  return <NotificationDiv>{notification.content}</NotificationDiv>;
};

export default Notification;
