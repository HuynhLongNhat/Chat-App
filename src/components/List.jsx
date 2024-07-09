import React from 'react'
import "../style/List.scss"
import UserInfo from './UserInfo'
import ChatList from './ChatList'
const List = () => {
    return (
        <div className='list'>
            <UserInfo />
            <ChatList />
        </div>
    )
}

export default List
