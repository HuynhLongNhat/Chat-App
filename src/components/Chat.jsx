import React, { useEffect, useRef, useState } from 'react'
import "../style/Chat.scss"
import EmojiPicker from 'emoji-picker-react'
import { arrayUnion, doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore'
import { db } from '../lib/firebase.config'
import { useChatStore } from '../lib/chatStore'
import { useUserStore } from '../lib/userStore'
import upload from '../lib/upload'
const Chat = () => {
    const [open, setOpen] = useState(false)
    const [text, setText] = useState("");
    const [chat, setChat] = useState()
    const [img, setImg] = useState({
        file: null,
        url: ""
    })
    const { chatId, user, isCurrentUserBlocked, isReceiverBlocked, } = useChatStore()
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
        return () => {
            unSub()
        }
    }, [chatId])

    const handleSendImg = (e) => {
        if (e.target.files[0]) {

            setImg({
                file: e.target.files[0],
                url: URL.createObjectURL(e.target.files[0])
            })
        }
    }

    const handleSend = async () => {
        if (text === "") return;
        let imgUrl = null
        if (img.file) {
            imgUrl = await upload(img.file)
        }
        try {
            await updateDoc(doc(db, "chats", chatId), {
                messages: arrayUnion({
                    senderId: currentUser.id,
                    text,
                    createAt: new Date(),
                    ...(imgUrl && { img: imgUrl }),
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
        setImg({
            file: null,
            url: ""
        })
        setText("")
    }

    return (

        <div className='chat'>

            <div className="top">
                <div className="user">
                    <img src={user?.avatar || './avatar.png'} alt='' />
                    <div className="texts">
                        <span>{user.username}</span>
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
                        return (
                            <div className={message?.senderId === currentUser?.id ? "message own" : "message"}
                                key={message?.createAt}>
                                <div className='texts'>
                                    {message?.img &&
                                        <img src={message?.img} />
                                    }
                                    <p >{message?.text}</p>
                                    <span>
                                        1 min ago
                                    </span>
                                </div>

                            </div>
                        )

                    })
                }
                {img.url && (
                    <div className="message own">
                        <div className="texts">
                            <img src={img.url} alt="" />
                        </div>
                    </div>
                )}
                <div ref={endRef}>

                </div>
            </div>
            <div className="bottom">
                <div className="icons">
                    <label htmlFor='file'>
                        <img src='./img.png' alt='' />
                    </label>
                    <input type='file' id='file' hidden onChange={handleSendImg} />
                    <img src='./camera.png' alt='' />
                    <img src='./mic.png' alt='' />
                </div>
                <input
                    type='text'
                    value={text}
                    placeholder={(isCurrentUserBlocked || isReceiverBlocked) ? "You cannot send a message" : "Type a message"}

                    onChange={(e) => setText(e.target.value)}
                    disabled={isCurrentUserBlocked || isReceiverBlocked}
                />
                <div className="emoji">
                    <img src='./emoji.png' onClick={() => setOpen(!open)} />
                    <div className="picker">
                        <EmojiPicker open={open} onEmojiClick={handleEmoji} />
                    </div>
                </div>
                <button className='sendButton' onClick={handleSend} disabled={isCurrentUserBlocked || isReceiverBlocked}>Send</button>

            </div>

        </div>
    )
}

export default Chat
