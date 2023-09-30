import { useContext, useState } from 'react';
import './Write.css';
import { Context } from '../../context/Context';
import axios from 'axios';
import { api } from "../../dts"

export default function Write() {

    const [title, setTtle] = useState("");
    const [desc, setDesc] = useState("");
    const [file, setFile] = useState(null);
    const { user } = useContext(Context);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newPost = {
            username: user.username,
            title,
            desc,
            categories: [],
        }
        if (file) {
            const data = new FormData();
            const filename = Date.now() + file.name;
            data.append("name", filename);
            data.append("file", file);
            newPost.photo = filename;
            try {
                await axios.post(api + "/upload", data);
            } catch (err) {
                console.log(err);
            }
        }


        // console.log(newPost);

        try {
            const res = await axios.post(api + "/posts", newPost);
            // console.log(res);
            window.location.replace(api + "/post/" + res.data._id);
        } catch (err) {
            console.log(err);
        }
    };


    return (
        <div className="write">

            {file && (<img
                className='writeImg'
                src={URL.createObjectURL(file)}
                alt=""
            />)}

            <form className="writeForm" onSubmit={handleSubmit}>

                <div className="writeFormGroup">
                    <label htmlFor="fileInput">
                        <i
                            className='writeIcon fas fa-plus'
                        ></i>
                    </label>
                    <input
                        type="file"
                        id="fileInput"
                        style={{ display: "none" }}
                        onChange={e => setFile(e.target.files[0])}
                    />
                    <input
                        className='writeInput'
                        type="text"
                        placeholder='Title'
                        autoFocus={true}
                        onChange={e => setTtle(e.target.value)}
                    />
                </div>


                <div className="writeFormGroup">
                    <textarea
                        placeholder='Tell you story'
                        type='text'
                        className='writeInput writeText'
                        onChange={e => setDesc(e.target.value)}
                    ></textarea>
                    <button className='writeSubmit'
                        type='submit'
                    >
                        Publish
                    </button>
                </div>

            </form>
        </div>
    )
}
