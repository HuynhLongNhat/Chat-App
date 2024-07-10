import React, { useEffect, useRef, useState } from 'react'
import "../style/Chat.scss"
import EmojiPicker from 'emoji-picker-react'
const Chat = () => {
    const [open, setOpen] = useState(false)
    const [text, setText] = useState("");

    const endRef = useRef(null);
    const handleEmoji = (e) => {
        setText((prev) => prev + e.emoji)
        setOpen(false)
    }

    useEffect(() => {
        endRef.current?.scrollIntoView({
            behavior: "smooth"
        })
    })
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
                <div className="message ">
                    <img src='./avatar.png' alt='' />
                    <div className='texts'>
                        <p >Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ab esse minima corrupti commodi delectus repudiandae quas nobis sed, nostrum ad nam perspiciatis architecto voluptates aut dolor! Ipsam quisquam veritatis minima!</p>
                        <span>
                            1 min ago
                        </span>
                    </div>

                </div>
                <div className="message own">
                    <div className='texts'>
                        <img src='data:image/jpeg;base64,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' />
                        <p >Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ab esse minima corrupti commodi delectus repudiandae quas nobis sed, nostrum ad nam perspiciatis architecto voluptates aut dolor! Ipsam quisquam veritatis minima!</p>
                        <span>
                            1 min ago
                        </span>
                    </div>

                </div>
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
                <button className='sendButton'>Send</button>
            </div>

        </div>
    )
}

export default Chat
