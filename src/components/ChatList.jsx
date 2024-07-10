import React, { useEffect, useState } from 'react'
import "../style/ChatList.scss"
import AddUser from './AddUser'
import { useUserStore } from '../lib/userStore'
import { doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore'
import { db } from '../lib/firebase.config'
import { useChatStore } from '../lib/chatStore'
const ChatList = () => {
    const [addMode, setAddMode] = useState(false)
    const [chats, setChats] = useState([]);

    const { currentUser } = useUserStore();
    const { changeChat, chatId } = useChatStore()

    useEffect(() => {
        const unSub = onSnapshot(doc(db, "userchats", currentUser.id), async (res) => {
            const items = res.data().chats;
            const promises = items.map(async (item) => {
                const useDocRef = doc(db, "users", item.receiverId);
                const userDocSnap = await getDoc(useDocRef);
                const user = userDocSnap.data()
                return { ...item, user }
            })
            const chatData = await Promise.all(promises)
            setChats(chatData.sort((a, b) => b.updateAt - a.updateAt))

        })
        return () => {
            unSub()
        }
    }, [currentUser.id])

    const handleSelect = async (chat) => {
        const userChats = chats.map(item => {
            const { user, ...rest } = item;
            return rest
        })
        const chatIndex = userChats.findIndex(
            (item) => item.chatId === chat.chatId
        )
        const userChatsRef = doc(db, "userchats", currentUser.id)
        try {
            await updateDoc(userChatsRef, {
                chat: userChats

            })
            changeChat(chat.chatId, chat.user)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className='chatList'>
            <div className='search'>
                <div className='searchBar'>
                    <img src='./search.png' alt='' />
                    <input type='text' placeholder='Search' />
                </div>
                <img src={addMode ? "./minus.png" : "./plus.png"}
                    className='add'
                    onClick={() => setAddMode(!addMode)} />
            </div>
            {chats.map((chat) => {
                return (
                    <div key={chat.chatId}
                        className="item"
                        style={{
                            backgroundColor: chat?.isSeen ? "transparent" : "#5183fe"
                        }}
                        onClick={() => handleSelect(chat)}>
                        <img src={chat.user.avatar || "./avatar.png"} alt='' />
                        <div className="texts">
                            <span>{chat.user.username}</span>
                            <p>{chat.lastMessage}</p>
                        </div>
                    </div>

                )
            })
            }

            {addMode && <AddUser />}

        </div>
    )
}

export default ChatList
