import React, { useState } from 'react';

import Button from '@mui/material/Button';

import firebase from 'firebase/compat/app';
import { db, storage } from './firebase';
import './ImageUpload.css';

function ImageUpload({ username }) {
    const [progress, setProgress] = useState(0);
    const [caption, setCaption] = useState('');
    const [image, setImage] = useState(null);

    const handleChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    }

    const handleUpload = () => {
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        uploadTask.on(
            "state_changed",

            (snapshot) => {
                //progress function...
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(progress);
            },

            (error) => {
                //error function...
                console.log(error);
                alert(error.message);
            },

            () => {
                //complete function...
                storage
                    .ref("images")
                    .child(image.name)
                    .getDownloadURL()
                    .then(url => {
                        //post image inside database

                        db.collection("posts").add({
                            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                            caption: caption,
                            imageUrl: url,
                            username: username
                        });

                        setProgress(0);
                        setCaption('');
                        setImage(null)
                    })
            }
        )
    }

    return (
        <div className="imageupload">
            <progress className="imageupload__progress" max="100" value={progress} />
            <input
                className="imageupload__text"
                value={caption}
                type="text"
                placeholder="Enter a caption"
                onChange={(e) => setCaption(e.target.value)}
            />
            <input className="imageupload__image" type="file" onChange={handleChange} />
            <Button onClick={handleUpload}>
                Upload
            </Button>
        </div>
    )
}

export default ImageUpload