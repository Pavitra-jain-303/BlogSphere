import { useEffect, useState } from 'react'
import './Sidebar.css'
import axios from "axios"
import { Link } from 'react-router-dom';

export default function Sidebar() {
    const [cats, setCat] = useState([]);

    useEffect(() => {
        const getCats = async () => {
            const res = await axios.get("/categories");
            setCat(res.data);
        }
        getCats();
    }, [])

    return (
        <div className="sidebar">
            <div className="sidebarItem">
                <span className="sidebarTitle">ABOUT ME</span>
                <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6wIF5pCDobBslWnLJ00--92cS_tZEzN0vWw&usqp=CAU"
                    alt=""
                />
                <p>
                    Laboris sunt aute cupidatat velit magna velit ullamco dolore mollit
                    amet ex esse.Sunt eu ut nostrud id quis proident.
                </p>
            </div>

            {/* division */}

            <div className="sidebarItem">
                <span className="sidebarTitle">CATEGORIES</span>
                <ul className="sidebarList">
                    {cats.map((c) => (
                        <Link to={`/?cat=${c.name}`} className='link'>
                            <li key={c.id} className="sidebarListItem">

                                {c.name}
                            </li>
                        </Link>
                    ))}
                </ul>
            </div>
            <div className="sidebarItem">
                <span className="sidebarTitle">FOLLOW US</span>
                <div className="sidebarSocial">
                    <i
                        className="sidebarIcon fab fa-facebook-square"
                    ></i>
                    <i
                        className="sidebarIcon fab fa-instagram-square"
                    ></i>
                    <i
                        className="sidebarIcon fab fa-pinterest-square"
                    ></i>
                    <i
                        className="sidebarIcon fab fa-twitter-square"
                    ></i>
                </div>
            </div>
        </div>
    )
}