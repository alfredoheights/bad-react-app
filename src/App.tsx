import React from 'react';
import './App.css';
import ManyPosts from "./components/ManyPosts";
import NewPostForm from "./components/PostForm";
import {Route, Routes} from "react-router";
import {API_BASE_URL, Post} from "./model";
import SinglePost from "./components/SinglePost";
import {BrowserRouter} from "react-router-dom";


function App() {
    const submitPost = async (post: Post) => {
        await fetch(`${API_BASE_URL}/posts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(post)
        });
    }
    return (
        <div className={"App"}>
            <BrowserRouter>
                <NewPostForm onCreatePost={submitPost}/>
                <Routes>
                    <Route path={"/new"} element={<ManyPosts type={"new"}></ManyPosts>}/>
                    <Route path={"/top"} element={<ManyPosts type={"top"}></ManyPosts>}/>
                    <Route path={"/post/:id"} element={<SinglePost/>}/>
                    <Route path={'/'} element={<ManyPosts type={"new"}/>}/>
                </Routes>
            </BrowserRouter>

        </div>
    );
}

export default App;
