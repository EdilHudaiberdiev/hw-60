import  {useEffect, useState} from 'react';
import MessageItem from '../../Components/MessageItem/MessageItem';
import SendMessageForm from '../../Components/SendMessageForm/SendMessageForm';
import {IMessage} from '../../types.d';


const urlGetMessage = 'http://146.185.154.90:8000/messages'

const Chat = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);

  const fetchPostsInterval = async () => {
    const lastMessageDate: Date = messages[messages.length - 1].datetime;
    const response = await fetch(`${urlGetMessage}?datetime=${lastMessageDate}`);
    const newPosts = await response.json();
    setMessages((prevState) => [...prevState, ...newPosts]);
  };

  const fetchPosts = async () => {
    const response = await fetch(urlGetMessage);
    const newPosts = await response.json();
    setMessages(newPosts);
  };

  useEffect(() => {
    if (messages.length > 0) {
      const interval = setInterval(() => {
        void fetchPostsInterval();
      }, 3000);

      return () => clearInterval(interval);
    } else {
      void fetchPosts();
    }

  }, [messages]);


  return (
    <>
      <h1>Chat</h1>
      <SendMessageForm/>

      {messages.length > 0 ?
        <>
          {messages.slice().reverse().map(message => (
            <MessageItem key={message._id} message={message}/>
          ))}
        </>
        :
        <p>No messages</p>
      }
    </>
  );
};

export default Chat;