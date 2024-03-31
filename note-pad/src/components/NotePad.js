import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import './NotePad.css'; // Import styles

const NotePad = () => {
    const [notes, setNotes] = useState([]);
    const [currentNote, setCurrentNote] = useState(null);
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [image, setImage] = useState('');
    const [video, setVideo] = useState('');

    const handleTextChange = (e) => {
        setText(e.target.value);
    };

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleImageUpload = (acceptedFiles) => {
        const file = acceptedFiles[0];
        const reader = new FileReader();
        reader.onload = () => {
        setImage(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const handleVideoUpload = (acceptedFiles) => {
        const file = acceptedFiles[0];
        const reader = new FileReader();
        reader.onload = () => {
        setVideo(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const handleSaveNote = () => {
        const newNote = { title, text, image, video };
        setNotes([...notes, newNote]);
        setTitle('');
        setText('');
        setImage('');
        setVideo('');
    };

    const handleNoteClick = (note) => {
        setCurrentNote(note);
    };

    const { getRootProps: getRootImageProps, getInputProps: getInputImageProps } = useDropzone({
        accept: 'image/*',
        onDrop: handleImageUpload,
    });

    const { getRootProps: getRootVideoProps, getInputProps: getInputVideoProps } = useDropzone({
        accept: 'video/*',
        onDrop: handleVideoUpload,
    });

    return (
        <div className="NotePad">
            <div className="Note-gap">
                <input
                    type="text"
                    placeholder="ENTER TITLE"
                    value={title}
                    onChange={handleTitleChange}
                />
                <textarea
                    placeholder="ENTER NOTE"
                    value={text}
                    onChange={handleTextChange}
                />
                </div>
            <div {...getRootImageProps()}>
                <input {...getInputImageProps()} />
                <p>DRAG 'N ' IMAGE OR CLICK TO SELECT IMAGE</p>
            </div>
            {image && <img src={image} alt="Uploaded" />}
            <div {...getRootVideoProps()}>
                <input {...getInputVideoProps()} />
                <p>DRAG 'N' VIDEO OR CLICK TO SELECT VIDEO</p>
            </div>
            {video && <video controls src={video} />}
            <button onClick={handleSaveNote}>SAVE NOTE!!</button>
            <div className="NoteList">
                <h2>Notes List</h2>
                <ul>
                {notes.map((note, index) => (
                    <li key={index} onClick={() => handleNoteClick(note)}>
                    {note.title}
                    </li>
                ))}
                </ul>
            </div>
            {currentNote && (
                <div className="CurrentNote">
                <h2>{currentNote.title}</h2>
                <p>{currentNote.text}</p>
                {currentNote.image && <img src={currentNote.image} alt="Uploaded" />}
                {currentNote.video && <video controls src={currentNote.video} />}
                </div>
            )}
        </div>
    );
    };

    export default NotePad;
