import "./Register.css"
import { Link } from "react-router-dom"
import { useState } from 'react'
import axios from 'axios';

export default function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(false);
        try {
            const res = await axios.post("/auth/register", {
                username,
                email,
                password,
            });
            res.data && window.location.replace("/login");
        }
        catch (e) {
            console.log(e);
            setError(true);
        };

    };

    return (

        <div className="register">
            <span className="registerTitle">Register</span>
            <form
                className="registerForm"
                onSubmit={handleSubmit}
            >
                <label>Username</label>
                <input className="registerInput" type="text" placeholder="Enter your username..."
                    autoComplete="username"
                    onChange={e => setUsername(e.target.value)}
                />
                <label>Email</label>
                <input className="registerInput" type="text" placeholder="Enter your email..."
                    autoComplete="email"
                    onChange={e => setEmail(e.target.value)}
                />
                <label>Password</label>
                <input className="registerInput" type="password" placeholder="Enter your password..."
                    autoComplete="current-password"
                    onChange={e => setPassword(e.target.value)}
                />
                <button className="registerButton">Register</button>
            </form>
            <button
                type="submit"
                className="registerLoginButton">
                <Link to="/login" className='link'>
                    LOGIN
                </Link>
            </button>

            {
                error && <span
                    style={{ color: 'red', margin: '10px', padding: '5px' }} >
                    Something went wrong
                </span>
            }
        </div>
    )
}