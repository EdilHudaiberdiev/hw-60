  import {useEffect, useState} from 'react';
  import './App.css';

  const urlGetMessage = 'http://146.185.154.90:8000/messages';

  const App = () => {

    interface Props {
      _id: string;
      author: string;
      message: string;
      datetime: Date;
    }
    interface PropsMessage {
      author: string,
      message: string,
    }

    const [posts, setPosts] = useState<Props[]>([]);
    const [message, setMessage] = useState<PropsMessage>({
      author: '',
      message: '',
    });

    const fetchPosts = async () => {
      const response = await fetch(urlGetMessage);
      const newPosts = await response.json();
      setPosts(newPosts);
    };

    useEffect(() => {
      const fetchPosts = async () => {
        const response = await fetch(urlGetMessage);
        const newPosts = await response.json();
        setPosts(newPosts);
      };
      fetchPosts();

      const interval= setInterval(() => {
        const fetchPostsInterval = async () => {
          const lastMessageDate: Date = posts[posts.length - 1].datetime;
          const response = await fetch(`${urlGetMessage}?datetime=${lastMessageDate}`);
          const newPosts = await response.json();
          setPosts((prevPosts) => [...prevPosts, ...newPosts]);
        };
        fetchPostsInterval();
      }, 5000);

      return () => clearInterval(interval);
    },);

    const convertDate = (datetime: Date) => {
      const date = new Date(datetime);
      return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()},
          Time ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    };

    const changeForm = (e: React.ChangeEvent<HTMLInputElement>) => {
      setMessage((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
    };

    const onFormSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      console.log('отправка');

      const data = new URLSearchParams();

      data.set('message', message.message);
      data.set('author', message.author);
      await fetch(urlGetMessage, {
        method: 'post',
        body: data,
      });
      fetchPosts();
    };

    return (
      <>
        <h1>content</h1>

        <form onSubmit={onFormSubmit}>
          <h4>Send form</h4>
          <label htmlFor="author">Author</label>
          <input
            type="text"
            name="author"
            id="author"
            value={message.author}
            onChange={changeForm}
          />
          <label htmlFor="message">Message</label>
          <input
            name="message"
            id="message"
            value={message.message}
            onChange={changeForm}
          />
          <button type='submit'>Send message</button>
        </form>

        {posts.slice().reverse().map(post => (
          <div key={post._id} className='post'>
            <p>Author {post.author} </p>
            <p>message {post.message}</p>
            <p>{convertDate(post.datetime)}</p>
          </div>
        ))}

      </>
    );
  };

  export default App;
