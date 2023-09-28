import './Settings.css'
import Sidebar from '../../components/sidebar/Sidebar'
import { Context } from '../../context/Context'
import { useContext, useState } from 'react'
import axios from 'axios'

export default function Settings() {
    const PF = "http://localhost:5000/images/";
    const { user, dispatch } = useContext(Context);
    const [file, setFile] = useState(null);
    const [username, setUsername] = useState(user.username);
    const [email, setEmail] = useState(user.email);
    const [password, setPassword] = useState("");
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch({ type: "UPDATE_START" })
        const updatedUser = {
            userId: user._id,
            username,
            email,
            password
        }

        if (file) {
            const data = new FormData();
            const filename = Date.now() + file.name;
            data.append("name", filename);
            data.append("file", file);
            updatedUser.profilePic = filename;
            try {
                await axios.post("/upload", data);
            } catch (err) {
                console.log(err);
            }
        }

        try {
            const res = await axios.put(`/users/${user._id}`, updatedUser)
            setSuccess(true);
            dispatch({ type: "UPDATE_SUCCESS", payload: res.data })
        } catch (err) {
            dispatch({ type: "UPDATE_FAILURE" })
            console.log(err);
        }
    };

    return (
        <div className="settings">
            <div className="settingsWrapper">
                <div className="settingsTitle">
                    <span className="settingsUpdateTitle">Update Account</span>
                    <span className="settingsDeleteTitle">Delete Account</span>
                </div>

                <form
                    className="settingsForm"
                    onSubmit={handleSubmit}
                >
                    <label>Profile Picture</label>
                    <div className="settingsPP">
                        <img
                            src={file ? URL.createObjectURL(file) : PF + user.profilePic}
                            alt=""
                        />
                        <label htmlFor="fileInput">
                            <i className='settingsPPIcon far fa-user-circle'></i>
                        </label>
                        <input
                            type="file"
                            id='fileInput'
                            style={{ display: "none" }}
                            onChange={(e) => setFile(e.target.files[0])}
                        />
                    </div>

                    <label>Username</label>
                    <input
                        type="text"
                        // placeholder='username'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <label>email</label>
                    <input
                        type="email"
                        // placeholder='abc@xyz.com'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <label>Password</label>
                    <input
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button
                        className="settingsSubmit"
                        type='submit'
                    >
                        Update
                    </button>

                    {success && <span
                        style={
                            { color: 'white', backgroundColor: 'green', textAlign: 'center', alignSelf: 'center', margin: '20px', lineHeight: '30px', width: '200px', borderRadius: '10px' }
                        }

                    >
                        Profile has been updated...
                    </span>}
                </form>
            </div>
            <Sidebar />
        </div >
    )
}
