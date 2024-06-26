import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";


function Menu ({cat}) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts/?cat=${cat}`);
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [cat]);

  const getText = (html) =>{
    const doc = new DOMParser().parseFromString(html, "text/html")
    return doc.body.textContent
  }

    return (
        <div className="menu">
            <h1> Posts you may like </h1>
            {posts.map(post => (
                <div className="post" key = {post.id}>
                    <img src = {`../upload/${post?.img}`} alt ="" />
                    <Link className= "link" to={`/post/${post.id}`}>
                    <h2>{getText(post.title)}</h2>
                    <p> {getText(post.desc)} </p>
                    <button> Read More </button>
                  </Link>
                </div>
            ))}
        </div>
    );
}

export default Menu;