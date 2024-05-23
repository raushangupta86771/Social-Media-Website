import { React, useState } from 'react'
import "./Auth.css"
import Logo from "../../img/logo.png"
import { useDispatch, useSelector } from "react-redux"
import { logIn, signUp } from '../../actions/AuthAction'

const Auth = () => {
    const dispatch = useDispatch()
    const loading = useSelector((state) => state.authReducer.loading);

    const [isSignup, setSignup] = useState(true);
    const [data, setData] = useState({ firstname: "", lastname: "", username: "", password: "", confirmpass: "" });

    const [isConfirmpass, setIsConfirmpass] = useState(true)

    const handleOnchange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isSignup) {
            if (data.password === data.confirmpass) {
                dispatch(signUp(data));
            }
            else {
                setIsConfirmpass(false);
            }
        }
        else {
            dispatch(logIn(data));
        }
    }

    const resetForm = () => {
        setIsConfirmpass(true);
        setData({ firstname: "", lastname: "", username: "", password: "", confirmpass: "" });
    }

    return (
        // left side
        <div className='Auth'>

            {/* right side */}
            <div className='a-right'>
                <form action="#" className='infoForm authform' onSubmit={handleSubmit}>
                    <h3>{isSignup ? "Sign up" : "Log in"}</h3>

                    {isSignup && <div className="">
                        <input type="text" placeholder='First Name' className='info' name='firstname' onChange={handleOnchange} />
                        <input onChange={handleOnchange} type="text" placeholder='Last Name' className='info' name='lastname' />
                    </div>}

                    <div>
                        <input onChange={handleOnchange} type="text" name="username" id="" placeholder='username' className='info' value={data.username} />
                    </div>
                    <div className="cp">
                        <input onChange={handleOnchange} type="password" placeholder='Password' className='info' name='password' value={data.password} />
                        {isSignup && <input onChange={handleOnchange} type="password" placeholder='Confirm password' className='info' name='confirmpass' />}
                        <span className='cp' style={{ display: isConfirmpass ? "none" : "", color: "red", fontSize: "12px" }}>*Confirm password is not same</span>
                    </div>

                    <div>
                        <span
                            style={{ fontSize: '12px', cursor: "pointer" }}
                            onClick={() => {
                                setSignup((prev) => !prev);
                                resetForm()
                            }} >
                            {isSignup ? "Already have an account. Login!" : "Don't have an Account? Sign up"}</span>
                    </div>

                    <button className="button infoButton" type="submit">
                        {isSignup ? "Sign up" : "Log in"}</button>
                    {/* //agar loading true hai to Loading.. dikhao warna second condition check karo */}
                </form>
            </div>
        </div>
    )
}


export default Auth