import React, { useEffect, useState } from 'react'
import "./Chat.scss"
import ChatHeader from './ChatHeader'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import GifIcon from '@mui/icons-material/Gif';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import ChatMessage from './ChatMessage';
import { userAppSelector } from '../../app/hooks';
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp, Timestamp } from 'firebase/firestore';
import { db } from '../../firebase'

interface Messages {
  timestamp: Timestamp
  message: string
  user: {
    uid: string;
    photo: string;
    email: string;
    displayName: string;
  }
}

const Chat = () => {
  const [inputText, setInputText] = useState<string>("")
  const [messages, setMessages] = useState<Messages[]>([])
  const channelName = userAppSelector((state) => state.app.channelName)
  const channelId = userAppSelector((state) => state.app.channelName)
  const user = userAppSelector((state) => state.user.user)

  useEffect(() => {

    let collectionRef = collection(db, "channels", String(channelId), "messages")

    const collectionRefOrderby = query(collectionRef, orderBy("timestamp", "desc")
  )

    onSnapshot(collectionRefOrderby, (snapshot) => {
      let results: Messages[] = []
      snapshot.docs.forEach((doc) => {
        results.push({
          timestamp: doc.data().timestamp,
          message: doc.data().message,
          user: doc.data().user,
        })
      })
      setMessages(results)
    })
  }, [channelId])


    const sendMessage = async (
      e:React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
      e.preventDefault()

      const collectionRef = collection(
        db, 
        "channels", 
        String(channelId), 
        "messages"
      )

      await addDoc(collectionRef, {
        message: inputText, 
        timestamp: serverTimestamp(),
        user: user,
      })
      setInputText("")
    }

  return (
    <div className='chat'>
      {/* chatHeader */}
      <ChatHeader channelName={channelName} />
      {/* chatMessage*/}
      <div className="chatMessage">
        {messages.map((message,index) => (
            <ChatMessage key={index} message={message.message} timestamp={message.timestamp} user={message.user}/>
        ))}


      </div>
      {/* chatInput*/}
      <div className="chatInput">
        <AddCircleOutlineIcon />
        <form>
          <input 
            type="text" 
            placeholder='メッセージを送信'
            onChange={(e:React.ChangeEvent<HTMLInputElement>) => 
              setInputText(e.target.value)
              }
              value={inputText}
          />
          <button type="submit" className='chatInputButton' onClick={(e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => sendMessage(e)}>

          </button>
        </form>

        <div className="chatInputIcons"></div>
        <CardGiftcardIcon />
        <GifIcon />
        <EmojiEmotionsIcon />

      </div> 
    </div>
  )
}

export default Chat