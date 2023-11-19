import React, {useState} from 'react';

interface IMessageSend {
  author: string,
  message: string,
}

const urlGetMessage = 'http://146.185.154.90:8000/messages';

const SendMessageForm = () => {
  const [message, setMessage] = useState<IMessageSend>({
    author: '',
    message: '',
  });

  const changeForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = new URLSearchParams();
    data.set('message', message.message);
    data.set('author', message.author);
    await fetch(urlGetMessage, {
      method: 'post',
      body: data,
    });
  };

  return (
    <>
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
    </>
  );
};

export default SendMessageForm;