import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, {Dispatch, ReactElement, SetStateAction, useEffect, useState} from 'react';
import type {Post} from "../model";
import {API_BASE_URL} from "../model";
import PostView from "./PostView";

interface ManyPostsProps {
    type: 'top' | 'new'
}

const ManyPosts = (props: ManyPostsProps) => {
    const [posts, setPosts] = useState<Array<Post> | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${API_BASE_URL}/posts/${props.type}`)
            .then(response => response.json())
            .then(data => {
                setPosts(data);
                setLoading(false);
            })
            .catch(error => console.error('Error:', error));
    }, []);

    const setPost = ((modifiedPost: Post) => {
        if (posts == null) return;
        setPosts(posts.map(post => {
            if (post.id === modifiedPost.id) {
                return modifiedPost;
            }
            return post;
        }));
    }) as Dispatch<SetStateAction<Post | null>>;

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!posts) {
        return <div>No post found</div>;
    }

    return <div>
        {posts.map(post => <PostView key={post.id} post={post} setPost={setPost} />)}
    </div>

};

export default ManyPosts;
