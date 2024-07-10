import React, { useState } from 'react'
import "../style/ChatList.scss"
import AddUser from './AddUser'
const ChatList = () => {
    const [addMode, setAddMode] = useState(false)
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
            <div className="item">
                <img src='./avatar.png' alt='' />
                <div className="texts">
                    <span>Jane Doe</span>
                    <p> Hello</p>
                </div>
            </div>
            <div className="item">
                <img src='./avatar.png' alt='' />
                <div className="texts">
                    <span>Jane Doe</span>
                    <p> Hello</p>
                </div>
            </div>
            <div className="item">
                <img src='./avatar.png' alt='' />
                <div className="texts">
                    <span>Jane Doe</span>
                    <p> Hello</p>
                </div>
            </div>
            <div className="item">
                <img src='./avatar.png' alt='' />
                <div className="texts">
                    <span>Jane Doe</span>
                    <p> Hello</p>
                </div>
            </div>
            <div className="item">
                <img src='./avatar.png' alt='' />
                <div className="texts">
                    <span>Jane Doe</span>
                    <p> Hello</p>
                </div>
            </div>

            {addMode && <AddUser />}

        </div>
    )
}

export default ChatList
