import React from 'react';
import {IMessage} from '../../types.d';


interface Props {
  message: IMessage
}
const MessageItem: React.FC<Props> = React.memo(function MessageItem({message}) {

  function convertDate (datetime: Date) {
    const date = new Date(datetime);
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()},
          Time ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  }

  return (
    <div key={message._id} className='post'>
      <p>Author {message.author} </p>
      <p>message {message.message}</p>
      <p>{convertDate(message.datetime)}</p>
    </div>
  );
}, (prevProps, nextProps) => {
  return prevProps.message !== nextProps.message;
});

export default MessageItem;