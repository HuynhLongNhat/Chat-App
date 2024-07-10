import React, { useState } from 'react'

import "../style/addUser.scss"
import { collection, getDoc, query, where } from 'firebase/firestore'
import { db } from '../lib/firebase.config'
const AddUser = () => {
    const [user, setUser] = useState(null)
    const handleSearch = async (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const username = FormData.get("username");
        try {
            const userRef = collection(db, "users");
            const q = query(userRef, where("username", "==", username))
            const querySnapShot = await getDoc(q);
            if (!querySnapShot.empty) {
                setUser(querySnapShot.docs[0].data())
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className='addUser'>
            <form onSubmit={handleSearch}>
                <input type='text' placeholder='Username' name='username'></input>
                <button>Search</button>
            </form>
            {user &&
                <div className="user">
                    <div className="detail">
                        <img src={user.avatar || "./avatar.png"} alt="" />
                        <span>{user.username}</span>
                    </div>
                    <button>Add User</button>
                </div>}
        </div>
    )
}

export default AddUser