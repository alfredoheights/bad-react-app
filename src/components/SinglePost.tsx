import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, {useEffect, useState} from 'react';
import type {Post} from "../model";
import {API_BASE_URL} from "../model";
import PostView from "./PostView";
import {useMatch} from "react-router";

interface SinglePostProps {
}

const SinglePost = (props: SinglePostProps) => {
    const postId = useMatch('/post/:id')?.params.id ?? '0';
    const [post, setPost] = useState<Post | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${API_BASE_URL}/posts/${postId}`)
            .then(response => response.json())
            .then(data => {
                setPost(data[0]);
                setLoading(false);
            })
            .catch(error => console.error('Error:', error));
    }, [postId]); // Dependency array to refetch when postId changes

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!post) {
        return <div>No post found</div>;
    }

    return (
        <PostView post={post} setPost={setPost}/>
    );
};

export default SinglePost;
