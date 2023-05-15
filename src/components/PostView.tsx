import {faHeart} from '@fortawesome/free-solid-svg-icons';
import {faHeart as faHeartEmpty} from '@fortawesome/free-regular-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import type {Post} from "../model";
import {API_BASE_URL} from "../model";

interface PostProps {
    post: Post;
    setPost: Dispatch<SetStateAction<Post | null>>;
}

const PostView = (props: PostProps) => {
    const {post, setPost} = props;
    const [voted, setVoted] = useState<boolean>(false);

    const voteForPost = async () => {
        if (!post) return;
        setVoted(true);
        await fetch(`${API_BASE_URL}/vote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: post.id
            })
        })
        setPost({
            ...post,
            votes: (post.votes ?? 0) + 1
        });

    }

    return (
        <div>
            <a
                href={`/post/${post.id}`}
                style={{
                    color: 'inherit',
                    textDecoration: 'none'
                }}><h2>{post.title}</h2></a>
            <p dangerouslySetInnerHTML={{__html: post.description}}></p>
            <button onClick={voteForPost} disabled={voted}>
                <FontAwesomeIcon icon={voted ? faHeart : faHeartEmpty}/> {post.votes}
            </button>
        </div>
    );
};

export default PostView;
