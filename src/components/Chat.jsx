import React, { useEffect, useRef, useState } from 'react'
import "../style/Chat.scss"
import EmojiPicker from 'emoji-picker-react'
import { arrayUnion, doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore'
import { db } from '../lib/firebase.config'
import { useChatStore } from '../lib/chatStore'
import { useUserStore } from '../lib/userStore'
const Chat = () => {
    const [open, setOpen] = useState(false)
    const [text, setText] = useState("");
    const [chat, setChat] = useState()
    const { chatId, user } = useChatStore()
    const { currentUser } = useUserStore()
    const endRef = useRef(null);
    const handleEmoji = (e) => {
        setText((prev) => prev + e.emoji)
        setOpen(false)
    }

    useEffect(() => {
        endRef?.current?.scrollIntoView({
            behavior: "smooth"
        })
    }, [])

    useEffect(() => {
        const unSub = onSnapshot(doc(db, "chats", chatId), (res) => {
            setChat(res.data())

        })
    }, [chatId])
    const handleSend = async () => {
        if (text === "") return;
        try {
            await updateDoc(doc(db, "chats", chatId), {
                messages: arrayUnion({
                    senderId: currentUser.id,
                    text,
                    createAt: new Date()
                })
            })

            const userIDs = [currentUser.id, user.id]

            userIDs.forEach(async (id) => {

                const userChatsRef = doc(db, "userchats", id)
                const userChatsSnapshot = await getDoc(userChatsRef)

                if (userChatsSnapshot.exists()) {
                    const userChatData = userChatsSnapshot.data()
                    const chatIndex = userChatData.chats.findIndex(c => c.chatId === chatId)
                    userChatData.chats[chatIndex].lastMessage = text
                    userChatData.chats[chatIndex].isSeen = id === currentUser.id ? true : false
                    userChatData.chats[chatIndex].updateAt = Date.now()

                    await updateDoc(userChatsRef, {
                        chats: userChatData.chats
                    })
                }
            })
        } catch (error) {
            console.log("error", error)
        }
    }
    console.log("chat :", chat)
    return (

        <div className='chat'>

            <div className="top">
                <div className="user">
                    <img src='./avatar.png' alt='' />
                    <div className="texts">
                        <span>Jane Doe</span>
                        <p>Lorem ipsum dolor sit amet !</p>
                    </div>
                </div>
                <div className="icons">
                    <img src='./phone.png' alt='' />
                    <img src='./video.png' alt='' />
                    <img src='./info.png' alt='' />
                </div>

            </div>
            <div className="center">
                {
                    chat?.messages?.map((message) => {
                        <div className="message own" key={message?.createAt}>
                            <div className='texts'>
                                {message.img &&
                                    <img src={message.img} />
                                }
                                <p >{message.text}</p>
                                <span>
                                    1 min ago
                                </span>
                            </div>

                        </div>

                    })
                }
                <div ref={endRef}>

                </div>
            </div>
            <div className="bottom">
                <div className="icons">
                    <img src='./img.png' alt='' />
                    <img src='./camera.png' alt='' />
                    <img src='./mic.png' alt='' />
                </div>
                <input
                    type='text'
                    value={text}
                    placeholder='Type a message...'
                    onChange={(e) => setText(e.target.value)} />
                <div className="emoji">
                    <img src='./emoji.png' onClick={() => setOpen(!open)} />
                    <div className="picker">
                        <EmojiPicker open={open} onEmojiClick={handleEmoji} />
                    </div>
                </div>
                <button className='sendButton' onClick={handleSend}>Send</button>
            </div>

        </div>
    )
}

export default Chat
