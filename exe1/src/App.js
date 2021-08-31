import React, { useState, useRef, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import './App.css';

const styles = {
  title: {
    fontWeight: 'bold',
  },
  receive: {
    fontSize: 12,
    textAlign: 'left',
  },
  send: {
    fontSize: 12,
    textAlign: 'right',
  }
}

const responses = [
  "Excitement replaced fear until the final moment.",
  "Dolores wouldn't have eaten the meal if she had known what it actually was.",
  "When motorists sped in and out of traffic, all she could think of was those in need of a transplant.",
  "The dead trees waited to be ignited by the smallest spark and seek their revenge.",
  "I thought red would have felt warmer in summer but I didn't think about the equator.",
  "The delicious aroma from the kitchen was ruined by cigarette smoke.",
  "Sometimes you have to just give up and win by cheating.",
  "I want more detailed information.",
  "If my calculator had a history, it would be more embarrassing than my browser history.",
  "Iguanas were falling out of the trees.",
  "He ran out of money, so he had to stop playing poker.",
  "It doesn't sound like that will ever be on my travel list.",
  "Seek success, but always be prepared for random cats.",
  "The door slammed on the watermelon.",
  "She wondered what his eyes were saying beneath his mirrored sunglasses.",
  "As time wore on, simple dog commands turned into full paragraphs explaining why the dog couldn’t do something.",
  "The sight of his goatee made me want to run and hide under my sister-in-law's bed.",
  "Flesh-colored yoga pants were far worse than even he feared.",
  "Honestly, I didn't care much for the first season, so I didn't bother with the second.",
  "We're careful about orange ping pong balls because people might think they're fruit.",
  "Douglas figured the best way to succeed was to do the opposite of what he'd been doing all his life.",
  "The toddler’s endless tantrum caused the entire plane anxiety.",
  "Normal activities took extraordinary amounts of concentration at the high altitude.",
  "Her life in the confines of the house became her new normal.",
  "You should never take advice from someone who thinks red paint dries quicker than blue paint.",
  "Today I heard something new and unmemorable.",
  "Had he known what was going to happen, he would have never stepped into the shower.",
  "I come from a tribe of head-hunters, so I will never need a shrink.",
  "The best key lime pie is still up for debate.",
  "She was the type of girl that always burnt sugar to show she cared.",
  "The spa attendant applied the deep cleaning mask to the gentleman’s back.",
  "That must be the tenth time I've been arrested for selling deep-fried cigars.",
  "Never underestimate the willingness of the greedy to throw you under the bus.",
  "He was willing to find the depths of the rabbit hole in order to be with her.",
  "Stop waiting for exceptional things to just happen.",
  "I liked their first two albums but changed my mind after that charity gig.",
  "Tomorrow will bring something new, so leave today as a memory.",
  "When he encountered maize for the first time, he thought it incredibly corny.",
  "It was difficult for Mary to admit that most of her workout consisted of exercising poor judgment.",
  "Now I need to ponder my existence and ask myself if I'm truly real",
  "I want to buy a onesie… but know it won’t suit me.",
  "For oil spots on the floor, nothing beats parking a motorbike in the lounge.",
  "Two more days and all his problems would be solved.",
  "As she walked along the street and looked in the gutter, she realized facemasks had become the new cigarette butts.",
  "The tears of a clown make my lipstick run, but my shower cap is still intact.",
  "She wanted to be rescued, but only if it was Tuesday and raining.",
  "He decided that the time had come to be stronger than any of the excuses he'd used until then.",
  "She tilted her head back and let whip cream stream into her mouth while taking a bath.",
  "The most exciting eureka moment I've had was when I realized that the instructions on food packets were just guidelines.",
  "As he waited for the shower to warm, he noticed that he could hear water change temperature.",
];

const types = {
  SEND: 'send',
  RECEIVE: 'receive',
};

const getDate = () => moment().format('YYYY-MM-DD HH:mm:ss:SSS');

const getNewMessage = (message, type) => ({
  message,
  type,
  date: getDate(),
  uuid: uuidv4(),
});

const getRandomResponse = () => responses[Math.floor(Math.random() * responses.length)];


const useInput = defaultValue => {
  const [value, setValue] = useState(defaultValue);

  const onChange = ({ target: { value: inputValue } }) => setValue(inputValue);

  const clean = () => setValue('');

  return {
    value,
    onChange,
    clean
  };
}

const MessageItem = ({ item }) => {
  const received = Boolean(item.type === types.RECEIVE);

  return (
    <li className="Message">
      <div className="BoxMessage">
        <p style={{ ...styles.title, ...received ? styles.receive : styles.send}}>{received ? 'Atendente diz:' : 'Você diz:'}</p>
        <p style={received ? styles.receive : styles.send}>{item.message}</p>
      </div>
    </li>
  );
};

const getList = messages => messages.sort((messageA, messageB) => moment(messageA.date).valueOf() - moment(messageB.date).valueOf());

function App() {
  const listRef = useRef(null);
  const messageInput = useInput('');
  const [messages, setMessages] = useState([getNewMessage(getRandomResponse(), types.RECEIVE)]);

  useEffect(() => {
    if (listRef && listRef.current && messages.length > 0) {
      const list = listRef.current;
      const scrollHeight = list.scrollHeight;
      const height = list.clientHeight;
      const maxScrollTop = scrollHeight - height;
      list.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
    }

    return () => null;
  }, [messages]);


  const handleSubmitForm = () => {
    if (!!messageInput.value) {
      const newMessages = [...messages, getNewMessage(messageInput.value, types.SEND)];
      setMessages(newMessages);
      messageInput.clean();
      return addNewResponse(newMessages);
    }
  }

  const addNewResponse = (messagesParam) => setTimeout(() => setMessages([...messagesParam, getNewMessage(getRandomResponse(), types.RECEIVE)]), 250);

  return (
    <div className="App">
      <p className="Title">CHAT TOP</p>
      <div>
        <ul ref={listRef} className="List">
          {getList(messages).map(message => (
            <MessageItem key={message.uuid} item={message} />
          ))}
        </ul>

        <form action="" className="Form" onSubmit={handleSubmitForm} >
          <input className="Input" type="textarea" {...messageInput} />
          <button className="Button" type="submit"  value="Submit">Enviar</button>
        </form>
      </div>
    </div>
  );
}

export default App;
