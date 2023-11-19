  import {useEffect, useState} from 'react';
  import './App.css';

  const urlGetMessage = 'http://146.185.154.90:8000/messages';

  const App = () => {

    interface Props {
      id: string;
      author: string;
      message: string;
      datetime: string;
    }

    const [posts, setPosts] = useState<Props[]>([]);

    useEffect(() => {
      const fetchPosts = async () => {
        const response = await fetch(urlGetMessage);
        const newPosts = await response.json();
        setPosts(newPosts);
      };
      fetchPosts();
      console.log(posts); ///////////

    }, []);

    const convertDate = (datetime: string) => {
        const date = new Date(datetime);
        return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()},
          Time ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    };


    return (
      <>
        <h1>content</h1>

        {posts.map(post => (
          <div key={post.id} className='post'>
            <p>Author {post.author} </p>
            <p>message {post.message}</p>
            {/*<p>datetime {post.datetime}</p>*/}
            <p>{convertDate(post.datetime)}</p>
          </div>
        ))}

      </>
    );
  };

  export default App;
