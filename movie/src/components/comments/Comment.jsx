import React, { useState, useEffect, useContext } from 'react';

import './comment.scss';
import Button from '@mui/material/Button';
import Context from '../../store/Context';

import { db } from '../../api/firebase';
import { collection, addDoc, getDocs } from "firebase/firestore";

const Comment = ({ name }) => {
    const [state, distpatch] = useContext(Context);
    const { userEmail, userInfo, userStatus } = state;

    // const [info, setInfo] = useState(null);
    // console.log(info)

    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);
    const [read, setRead] = useState(1)

    // Read DOC
    useEffect(() => {
        const readDoc = async () => {
            const querySnapshot = await getDocs(collection(db, `film_${name}`));
            querySnapshot.forEach((doc) => {
                setComments(prev => {
                    return [...prev, doc.data().comment]
                })
            })
        }
        readDoc();
    }, [read])

    // Add DOC
    const postInfo = (e) => {
        e.preventDefault();
        try {
            const docRef = addDoc(collection(db, `film_${name}`), {
                name: userInfo,
                comment: comment,
            });
            console.log("Document written with ID: ", docRef);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
        setComment('');
        setRead(read + 1)
    }

    return (
        <div className="comment container">
            <div className="comment__typing">
                <input
                    type="text"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
                <Button type="submit" onClick={postInfo}>comment</Button>
            </div>
            <ul className="comment__show">
                {
                    comments.map((comment, i) => (
                        <li key={i} className="comment__item">
                            <h2 className="comment_name">{userInfo}</h2>
                            <p>{comment}</p>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default Comment;