import React, {useState} from 'react';
import {Post} from "../model";

interface NewPostFormProps {
    onCreatePost: (post: Post) => void;
}

const NewPostForm: React.FC<NewPostFormProps> = ({onCreatePost}) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Call the onCreatePost function passed from the parent component
        onCreatePost({title, description});

        // Clear the form fields
        setTitle('');
        setDescription('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <h3>
                    <input type="text" value={title} onChange={e => setTitle(e.target.value)} required placeholder={"Title"}/>

                </h3>
            </div>
            <div>
                    <textarea value={description} onChange={e => setDescription(e.target.value)} required placeholder={"Description"}/>
            </div>
            <button type="submit">Submit</button>
        </form>
    );
};

export default NewPostForm;