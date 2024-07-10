import React, { useState } from 'react'
import "../style/Login.scss"
const Login = () => {
    const [avatar, setAvatar] = useState({
        file: null,
        url: ""
    })
    const handleChangeAvatar = (e) => {
        if (e.target.files[0]) {

            setAvatar({
                file: e.target.files[0],
                url: URL.createObjectURL(e.target.files[0])
            })
        }
    }
    return (
        <div className='login'>
            <div className="item">
                <h2>Welcome back</h2>
                <form action="">
                    <input type='email' placeholder='Email' name='email' />
                    <input type='password' placeholder='Password' name='password' />
                    <button>Sign In</button>
                </form>
            </div>
            <div className="separator"></div>
            <div className="item">
                <h2>Create an Account</h2>
                <form action="">
                    <label htmlFor='file'>
                        <img src={avatar.url || "./avatar.png"} alt='' />
                        Upload an image</label>
                    <input type='file' id='file' hidden onChange={handleChangeAvatar} />
                    <input type='text' placeholder='Username' name='username' />
                    <input type='email' placeholder='Email' name='email' />
                    <input type='password' placeholder='Password' name='password' />
                    <button>Sign Up</button>
                </form>
            </div>
        </div>
    )
}

export default Login