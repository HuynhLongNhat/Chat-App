import React, { useState } from 'react'
import "../style/Login.scss"
import { toast } from 'react-toastify';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../lib/firebase.config';
import { doc, setDoc } from 'firebase/firestore';
import upload from '../lib/upload';

const Login = () => {
    const [avatar, setAvatar] = useState({
        file: null,
        url: ""
    })
    const [loading, setLoading] = useState(false)
    const handleChangeAvatar = (e) => {
        if (e.target.files[0]) {

            setAvatar({
                file: e.target.files[0],
                url: URL.createObjectURL(e.target.files[0])
            })
        }
    }
    const handleLogin = async (e) => {
        setLoading(true)
        e.preventDefault()
        const formData = new FormData(e.target);
        const { email, password } = Object.fromEntries(formData)
        try {
            await signInWithEmailAndPassword(auth, email, password)

        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }

    }
    const handleRegister = async (e) => {
        setLoading(true)
        e.preventDefault()
        const formData = new FormData(e.target);
        const { username, email, password } = Object.fromEntries(formData)
        try {
            const res = await createUserWithEmailAndPassword(auth, email, password)
            const imgUrl = await upload(avatar.file)
            await setDoc(doc(db, "users", res.user.uid), {
                username,
                email,
                avatar: imgUrl,
                id: res.user.uid,
                blocked: []
            })

            await setDoc(doc(db, "userchats", res.user.uid), {
                chat: [],
            })
            toast.success("Account create! You can login now!")
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        } finally {
            setLoading(false)
        }

    }
    return (
        <div className='login'>
            <div className="item">
                <h2>Welcome back</h2>
                <form onSubmit={handleLogin}>
                    <input type='email' placeholder='Email' name='email' />
                    <input type='password' placeholder='Password' name='password' />
                    <button disabled={loading}>{loading ? "Loading" : "Sign In"}</button>
                </form>
            </div>
            <div className="separator"></div>
            <div className="item">
                <h2>Create an Account</h2>
                <form onSubmit={handleRegister}>
                    <label htmlFor='file'>
                        <img src={avatar.url || "./avatar.png"} alt='' />
                        Upload an image</label>
                    <input type='file' id='file' hidden onChange={handleChangeAvatar} name='avatar' />
                    <input type='text' placeholder='Username' name='username' />
                    <input type='email' placeholder='Email' name='email' />
                    <input type='password' placeholder='Password' name='password' />
                    <button disabled={loading}> {loading ? "Loading" : "Sign Up"}</button>
                </form>
            </div>
        </div>
    )
}

export default Login
