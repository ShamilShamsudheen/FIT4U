import React, { useEffect } from 'react'
import { userAxiosInstance } from '../../../axios/axios'
import { useState } from 'react'
import { formatDate, formatTimestamp, truncateString } from '../../../Constants/Constants'
import io from 'socket.io-client';

function Chat() {
  const [userProfile, setProfile] = useState([])
  const [chat, setChat] = useState([])
  const [chatMessage, setChatMessage] = useState([])
  const [message, setMessage] = useState('')
  const [trainer, setTrainer] = useState('')
  const [chatId, setChatId] = useState('')
  const [recieveMsg, setRecieveMsg] = useState()
  const [trainerId, setTrainerId] = useState()
  const [connection, setConnection] = useState(false);

  useEffect(() => {
    const socket = io(import.meta.env.VITE_baseURL);
    const fetchData = async () => {
      try {
        await userAxiosInstance.get('/postLogin').then((res) => {
          setProfile(res.data.userData)
        })
      } catch (error) {
        console.log(error.message)
      }
    }
    const fetchTrainer = async () => {
      try {
        await userAxiosInstance.get('/payedTrainer').then((res) => {
          setTrainer(res.data.trainerId)
        })
      } catch (error) {
        console.log(error.message)
      }
    }
    const fetchChat = async () => {
      try {
        await userAxiosInstance.get('/getchat').then((res) => {
          setChat(res.data.chatTrainerData)
        })
      } catch (error) {
        console.log(error.message)
      }
    }
    fetchData();
    fetchTrainer();
    fetchChat()
    socket.on('receive_message', (data) => {
      setRecieveMsg({
        senderId: data.senderId,
        content: data.content,
        createdAt: Date.now()
      })
      console.log('Received message:', data);
    });

    return () => {
      socket.disconnect();
    };
  }, [])

  const handleSend = () => {
    userAxiosInstance.post('/createMessage', { trainer, message, chatId }).then((res) => {
      setMessage('')
    })
    socket.emit('send_message', {
      message: message,
      senderId: userProfile._id,
      recieverId: userId
    })
  }
  const handleClick = (chatId) => {
    userAxiosInstance.get(`/chatMessage/${chatId}`).then((res) => {
      setChatMessage(res.data.messageData)
    })
  }
  return (
    <div className='mt-10'>
      <div className="flex h-screen antialiased text-gray-50">
        <div className="flex flex-row h-full w-full overflow-x-hidden">
          <div className="flex flex-col py-8 pl-6 pr-2 w-64 bg-blur flex-shrink-0">
            <div className="flex flex-row items-center justify-center h-12 w-full">
              <div className="flex items-center justify-center rounded-2xl text-indigo-700 bg-indigo-100 h-10 w-10">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <div className="ml-2 font-bold text-2xl">QuickChat</div>
            </div>
            <div className="flex flex-col items-center  bg-indigo-100 border border-gray-200 mt-4 w-full py-6 px-4 rounded-lg">
              <div className="h-20 w-20 rounded-full border overflow-hidden">
                <img src={userProfile.profileImg} alt="Avatar" className="h-full w-full" />
              </div>
              <div className="text-sm font-semibold mt-2 text-gray-500">{userProfile.name}</div>
              <div className="text-xs text-gray-500">{userProfile.email}</div>

            </div>
            <div className="flex flex-col mt-8">
              <div className="flex flex-row items-center justify-between text-xs">
                <span className="font-bold">Trainer Conversations</span>
                <span className="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full">1</span>
              </div>
              <div className="flex flex-col space-y-1 mt-4 -mx-2 h-48 overflow-y-auto">
                {chat.map((chat) => (
                  <button className={`flex flex-row items-center ${
                    connection ? 'bg-gray-500' : 'hover:bg-gray-500'
                  } rounded-xl p-2`} onClick={() => {
                    setChatId(chat.chatId)
                    handleClick(chat.chatId)
                    setTrainerId(chat.trainerId)
                    setConnection(true)
                  }}>
                    <div className="flex border border-red-500 items-center justify-center h-10 w-10 bg-indigo-200 rounded-full">

                      {chat.trainer.image ? (<img
                        src={chat.trainer.image}
                        alt="Image"
                        className="h-8 w-8 object-cover rounded-full"
                      />) : 'H'}

                    </div>

                    <div className="flex flex-col ml-2">
                      <div className="text-sm font-semibold">{chat.trainer.trainerName}</div>
                      <div className='flex justify-between'>
                        <div className="text-xs text-gray-800 mb-auto">
                          {chat.lastMessage && truncateString(chat.lastMessage, 5)}
                        </div>
                        <div className="text-xs text-gray-800 self-end">{formatDate(chat.time)}</div>
                      </div>
                    </div>

                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-col flex-auto h-4/5 text-gray-500 p-6">
            <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-800 h-full p-4">

              <div className="flex flex-col h-full overflow-x-auto mb-4">
                <div className="flex flex-col h-full">
                  {chatMessage.map((res) => (
                    <>
                      <div className="grid grid-cols-12 gap-y-2">
                        {!(res.sender === userProfile._id) ?
                          (<div className="col-start-1 col-end-8 p-3 rounded-lg">
                            <div className="flex flex-row items-center">
                              <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                                T
                              </div>
                              <div className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                                <div>{res.message}</div>
                                <br />
                                <div className="absolute bottom-0 right-0 text-gray-800 text-xs pt-1">
                                  {formatTimestamp(res.timestamp)}
                                </div>
                              </div>
                              <div
                                class="absolute text-xs bottom-0 right-0 -mb-5 mr-2 text-gray-500"
                              >
                                Seen
                              </div>
                            </div>
                          </div>)
                          :
                          (<div className="col-start-6 col-end-13 p-3 rounded-lg">
                            <div className="flex items-center justify-start flex-row-reverse">
                              <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                                U
                              </div>
                              <div className="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl">
                                <div>{res.message}</div>
                                <br />
                                <div className="absolute bottom-0 left-0 text-gray-800 text-xs pt-1">
                                  {formatTimestamp(res.timestamp)}
                                </div>
                              </div>
                             
                            </div>
                          </div>)
                        }
                      </div>
                    </>
                  ))}
                </div>
              </div>
              {connection ?
                (<div className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4">

                  <div className="flex-grow ml-4">
                    <div className="relative w-full">
                      <input
                        type="text"
                        name='msg'
                        value={message}
                        className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
                        onChange={(e) => setMessage(e.target.value)}
                      />

                    </div>
                  </div>
                  <div className="ml-4">
                    <button className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0"
                      onClick={handleSend}
                    >
                      <span>Send</span>
                      <span className="ml-2">
                        <svg className="w-4 h-4 transform rotate-45 -mt-px" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                      </span>
                    </button>
                  </div>
                </div>) : ""
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Chat
