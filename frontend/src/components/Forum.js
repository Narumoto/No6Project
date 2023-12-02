import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Forum = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await axios.get('/api/forum');
                setPosts(res.data);
                setLoading(false);
            } catch (err) {
                console.error(err);
            }
        };

        fetchPosts();
    }, []);

    if (loading) {
        return <h2>Loading...</h2>;
    }

    return (
        <div>
            <h1>Community Forum</h1>
            {posts.map(post => (
                <div key={post._id}>
                    <h2>{post.title}</h2>
                    <p>{post.content}</p>
                    <p>Posted by: {post.user}</p>
                </div>
            ))}
        </div>
    );
};

export default Forum;