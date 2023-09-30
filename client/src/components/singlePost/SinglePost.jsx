import { useLocation } from 'react-router-dom';
import './SinglePost.css'
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { Context } from '../../context/Context';
import { PF, api } from "../../dts"

export default function SinglePost() {

    const location = useLocation();
    const path = location.pathname.split("/")[2];
    const [post, setPost] = useState({});
    const { user } = useContext(Context);

    //for Update
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [updateMode, setUpdateMode] = useState(false);

    useEffect(() => {
        const getPost = async () => {
            try {
                const res = await axios.get(api + "/posts/" + path);
                setPost(res.data);
                setTitle(res.data.title);
                setDesc(res.data.desc);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        getPost();
    }, [path]);


    const handleDelete = async (e) => {
        try {
            await axios.delete(
                api + "/posts/" + path,
                { data: { username: user.username } }
            );
            window.location.replace("/");
        }
        catch (err) {
            console.log(err);
        }
    }

    const handleUpdate = async () => {
        try {
            await axios.put(`${api}/posts/${post._id}`, {
                username: user.username,
                title,
                desc,
            });
            setUpdateMode(false);
        } catch (err) { }
    };

    return (
        <div className="singlePost" >
            <div className="singlePostWrapper">

                {/* {post.photo && (
                    <img
                        className='singlePostImg'
                        src={PF + post.photo}
                        alt=""
                    />
                )} */}

                {post.photo ? (
                    <img
                        className='singlePostImg'
                        src={PF + post.photo}
                        alt=""
                    />
                ) :
                    <img
                        className="postImg"
                        src="https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg"
                        alt=""
                    />
                }

                {updateMode ?
                    (
                        <input
                            type='text'
                            value={title}
                            className="singlePostTitleInput"
                            onChange={(e) => setTitle(e.target.value)}
                            autoFocus
                        />
                    ) : (

                        <h1
                            className="singlePostTitle"
                        >

                            {title}
                            {post.username === user?.username &&
                                <div className="singlePostEdit">
                                    <i
                                        className="singlePostIcon far fa-edit"
                                        onClick={() => {
                                            setUpdateMode(true)
                                        }}
                                    ></i>
                                    <i
                                        className="singlePostIcon far fa-trash-alt"
                                        onClick={handleDelete}
                                    ></i>
                                </div>
                            }

                        </h1>
                    )
                }

            </div>


            <div className="singlePostInfo">

                <span className="singlePostAuthor">
                    Author:
                    <Link to={`/?user=${post.username}`}
                        className='link'>
                        <b>{post.username}</b>
                    </Link>
                </span>

                <span className="singlePostDate">
                    {new Date(post.createdAt).toDateString()}
                </span>

            </div>

            {
                updateMode ?
                    (
                        <textarea
                            type='text'
                            value={desc}
                            className="singlePostDescInput"
                            onChange={(e) => setDesc(e.target.value)}
                        />
                    ) :

                    <pre className="singlePostDesc">
                        {desc}
                    </pre>
            }

            {updateMode && <button onClick={handleUpdate} className='singlePostButton'> Update </button>}

        </div >
    );
}