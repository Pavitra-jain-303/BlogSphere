import './post.css'
import { Link } from "react-router-dom"
import { PF } from "../../dts"

export default function Post({ post }) {
    return (
        <div className="post">
            {post.photo ? (
                <img
                    className="postImg"
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

            <div className="postInfo">
                <div className="postCats">
                    {
                        post.categories.map(c => (
                            <span key={c._id} className="postCat">
                                {c.name}
                            </span>
                        ))
                    }
                </div>
                <Link
                    to={`/post/${post._id}`}
                    className='link'
                >

                    <span className="postTitle">
                        {post.title}
                    </span>
                </Link>
                <hr />
                <span className="postDate">
                    {new Date(post.createdAt).toDateString()}
                </span>
            </div>
            <p className="postDesc">
                {post.desc}
            </p>
        </div>
    );
}