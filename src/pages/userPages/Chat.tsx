import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import io, { Socket } from 'socket.io-client';
import { Button } from '../../components';
import {
  useGetAllChatsQuery,
  useUserDataByIdMutation,
} from '../../service/authApi';

interface Message {
  senderId: string;
  content: string;
  updatedAt: string;
  date?: string;
  senderName?: string;
}

const Chat: React.FC = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [typing, setTyping] = useState(false);
  const token = localStorage.getItem('token');
  const { data: chatData } = useGetAllChatsQuery({});
  const navigate = useNavigate();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [userDataById] = useUserDataByIdMutation();
  async function retrieveUserById(id: string) {
    const rp = await userDataById({ id, token });
    return rp?.data?.username;
  }

  useEffect(() => {
    if (token) {
      const uri = `${import.meta.env.VITE_DEPLOYED_URL}`;
      const newSocket = io(uri, {
        auth: { token },
      });

      setSocket(newSocket);

      newSocket.on('connect', () => {
        console.log('Connected to the server');
      });

      newSocket.on('sendUserId', (userId: string) => {
        console.log('User ID received:', userId);
        localStorage.setItem('userId', userId);
      });

      newSocket.on('returnMessage', (data: Message) => {
        console.log('Message received:', data);
        setMessages((prevMessages) => [...prevMessages, data]);
      });

      newSocket.on('typing', (isTyping: boolean) => {
        setTyping(isTyping);
      });

      return () => {
        newSocket.disconnect();
      };
    } else {
      navigate('/');
    }
  }, [token]);

  useEffect(() => {
    if (chatData && chatData.ok && chatData.chat.length > 0) {
      const fetchAndSetMessages = async () => {
        const allMessages = await Promise.all(
          chatData.chat.flat().map(async (msg: Message) => {
            const senderName = await retrieveUserById(msg.senderId);
            return { ...msg, senderName };
          }),
        );
        setMessages(allMessages);
        console.log(messages);
      };
      fetchAndSetMessages();
    } else {
      console.log(
        'No previous messages found. You can start a new conversation.',
      );
    }
  }, [chatData]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSend = (e: FormEvent) => {
    e.preventDefault();
    if (message.trim() && socket) {
      console.log('Sending message:', message);
      socket.emit('sentMessage', {
        content: message,
        socketId: socket.id,
      });
      setMessage('');
      setTyping(false);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
    if (socket) {
      if (e.target.value.trim()) {
        socket.emit('typing', true);
      } else {
        socket.emit('typing', false);
        setTyping(false);
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      handleSend(e as unknown as FormEvent);
    }
    setTyping(false);
  };

  const formatTime = (time: string) => {
    const date = new Date(time);
    if (isNaN(date.getTime())) {
      return 'Invalid Date';
    }
    const hours = date.getHours() % 12 || 12;
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const amPm = date.getHours() < 12 ? 'AM' : 'PM';
    return `${hours}:${minutes} ${amPm}`;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white w-full  ">
      <div className="w-full px-4 rounded-lg">
        <div className="main-container  " id="chatApp">
          <ul id="messages" className="overflow-y-auto h-[90vh]">
            {messages.map((msg, index) => (
              <li
                key={index}
                className={`mb-6 p-2 rounded-lg w-auto ${
                  msg.senderId === localStorage.getItem('userId')
                    ? 'text-green-500 text-right ml-[48vw] w-[30vw] bg-slate-200 text-xl'
                    : 'text-black text-left w-[35vw] bg-blue-200 text-xl'
                }`}
              >
                <strong>
                  {msg.senderId === localStorage.getItem('userId')
                    ? 'Me'
                    : msg.senderName || 'Other'}
                  :
                </strong>{' '}
                {msg.content}
                <span
                  className={`block text-xs mt-1 ${
                    msg.senderId === localStorage.getItem('userId')
                      ? 'text-green-800'
                      : 'text-black'
                  }`}
                >
                  {!msg.date ? formatTime(msg.updatedAt) : formatTime(msg.date)}
                </span>
              </li>
            ))}
            <div ref={messagesEndRef} />
          </ul>

          {typing && (
            <div
              id="typingStatus"
              className="text-sm italic mb-14 text-gray-700"
            >
              Typing...
            </div>
          )}

          <form
            id="form"
            onSubmit={handleSend}
            className="flex absolute bottom-0 mb-4 ml-2 w-[65vw]"
          >
            <input
              id="input"
              placeholder="Enter a message"
              value={message}
              onChange={handleInputChange}
              onKeyDown={handleKeyPress}
              className="flex-grow p-2 border border-gray-400 rounded-l-lg text-black"
            />
            <Button
              type="submit"
              className="p-2 bg-green-400 text-black rounded-r-lg hover:text-white"
              title="send"
              children="send"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chat;
