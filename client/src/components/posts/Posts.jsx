import './Posts.css'
import Post from '../post/post.jsx'

export default function Posts({ posts }) {
    return (
        <div className='posts'>
            {posts.map((prop) => (
                <Post key={prop.id} post={prop} />
            ))}
        </div>
    )
}
