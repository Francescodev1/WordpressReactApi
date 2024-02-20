import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Post from './Post'; 
import PostDetail from './PostDetail'; 

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await axios.get('https://www.wired.it/wp-json/wp/v2/posts?_embed');
      setPosts(response.data);
    };

    fetchPosts();
  }, []);

  // Funzione per filtrare i post in base al searchTerm
  const filteredPosts = searchTerm
    ? posts.filter(post => post.title.rendered.toLowerCase().includes(searchTerm.toLowerCase()))
    : posts;

  return (
    <div>
      <h1>Post List</h1>
      <input
        type="text"
        placeholder="Cerca post..."
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {selectedPost ? (
        <div>
          <button onClick={() => setSelectedPost(null)}>Back to Posts</button>
          <PostDetail post={selectedPost} />
        </div>
      ) : (
        <div className='d-flex flex-wrap'>
          {filteredPosts.map(post => (
            <div key={post.id} onClick={() => setSelectedPost(post)}>
              <Post post={post} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostList;







/*
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Post from './Post'; // Assumeremo di avere questo componente


const PostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await axios.get('https://www.wired.it/wp-json/wp/v2/posts?_embed');
      setPosts(response.data);
    };

    fetchPosts();
  }, []);

  return (
    <div>
      <h1>Post List</h1>
      <div className='d-flex flex-wrap'>
        {posts.map(post => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default PostList;
*/