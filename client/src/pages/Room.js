import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Quiz from '../components/Quiz';
import RoomChat from '../components/RoomChat';
import { io } from 'socket.io-client';
import { useAuth } from '../context/AuthContext';

function Room() {
  const [users, setUsers] = useState([]);
  const [chats, setChats] = useState([]);
  const { search } = useLocation();
  const userId = useAuth().user.id;
  const roomId = search.slice(8);

  const onlineUsers = async () => {
    fetch(`/api/rooms/${roomId}/users`, {
      method: 'get',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((body) => {
        setUsers(body);
      });
  };

  const handleNewChat = (chat, callback) => {
    setChats((prevChats) => [...prevChats, chat]);
  };

  const fetchPrevChats = () => {
    fetch(`/api/room_chats/${roomId}`, {
      method: 'get',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((body) => {
        setChats(JSON.parse(body));
      });
  };

  useEffect(() => {
    //fetch online users in the room
    console.log('connect');

    fetchPrevChats();
    onlineUsers();
    const socket = io.connect('http://localhost:8080', {
      reconnection: false,
      query: {
        roomId: `${roomId}`,
        userId: `${userId}`,
      },
    });

    //subscibe to user entering leaving
    socket.on(`chat${roomId}`, handleNewChat);
    socket.on(`user${roomId}`, onlineUsers);

    //unsubscribe
    return () => {
      socket.close();
    };
  }, []);

  return (
    <div className="room-container p-0">
      <Quiz />
      <div className="chat-container h-25">
        <div className="chat-container text-start w-100">
          <RoomChat chats={chats} />
          <div className="user-box">
            <h2 className="text-center">Users</h2>
            {users.map((user, i) => {
              return (
                <div key={i} className="message bg-light">
                  <span className="logged-in p-2">●</span>
                  {user.username}
                </div>
              );
            })}
            <Link
              to="/session"
              className="exit-btn bg-danger text-white text-center mb-0"
            >
              <h5>Exit Room</h5>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Room;
