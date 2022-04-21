import React, { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import './Post.css';
import { db } from './firebase'
import firebase from 'firebase/compat/app';

function Post({ username, user, imageUrl, caption, postId }) {
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');

    useEffect(() => {
        let unsubcribe;
        if (postId) {
            unsubcribe = db
                .collection('posts')
                .doc(postId)
                .collection('comments')
                .orderBy('timestamp', 'desc')
                .onSnapshot((snapshot) => {
                    setComments(snapshot.docs.map(doc => doc.data()));
                });
        }
        return () => {
            unsubcribe();
        }
    }, [postId]);

    const postComment = (e) => {
        e.preventDefault();

        db.collection('posts').doc(postId).collection('comments').add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            text: comment,
            username: user.displayName
        })
        setComment('')
    }

    return (
        <div className="post">
            <div className="post__header">
                <Avatar
                    className="post__avatar"
                    alt={username}
                    src="./img/avatar.jpg"
                />

                <h4>{username}</h4>
            </div>

            <img
                className="post__image"
                src={imageUrl}
                alt="post__image"
            />

            <h4 className="post__text"><strong>{username} </strong>{caption}</h4>

            <div className="post__comments">
                {
                    comments.map((comment, index) => (
                        <p key={index}>
                            <strong>{comment.username}</strong> {comment.text}
                        </p>
                    ))
                }
            </div>

            {user && (
                <form className="post__commentBox">
                    <input
                        className="post__input"
                        placeholder="Add a comment..."
                        type="text"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                    <button
                        className="post__button"
                        disabled={!comment}
                        type="submit"
                        onClick={postComment}
                    >
                        Post
                    </button>
                </form>
            )}
        </div >
    )
}

export default Post