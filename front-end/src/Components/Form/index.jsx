import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faPen } from '@fortawesome/free-solid-svg-icons';
import CheckBox from '../CheckBox';
import './index.css';

export default props => {

    const [author, setAuthor] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [useUsernameFromComputer, setUseUsernameFromComputer] = useState(true);
    const username = process.env.USERNAME;

    const setText = (callback) => {
        return ({ target: { value } }) => callback(value);
    }

    const { lang } = props;

    return (
        <div className="form-container">
            <header>
                <h1>{lang.createTask}</h1>
            </header>
            <div className="form-formulary">
                <div style={{ width: '100%', padding: '10px 0' }}>
                    <CheckBox checked={useUsernameFromComputer} name={lang.useYourComputerUsername} onClick={() => {
                        setUseUsernameFromComputer(!useUsernameFromComputer);
                    }} />
                </div>
                <div className={useUsernameFromComputer ? "form-input-box form-input-box-disabled" : "form-input-box"}>
                    <FontAwesomeIcon icon={faUser} />
                    <input
                        value={useUsernameFromComputer ? username : author}
                        onChange={setText(setAuthor)}
                        placeholder={lang.author}
                        disabled={useUsernameFromComputer}
                    />
                </div>
                <div className="form-input-box">
                    <FontAwesomeIcon icon={faPen} />
                    <input
                        value={title}
                        onChange={setText(setTitle)}
                        placeholder={lang.title}
                    />
                </div>
                <textarea
                    value={description}
                    onChange={setText(setDescription)}
                    placeholder={lang.description}
                    rows="5"
                ></textarea>
                <button className="create" onClick={() => {
                    if (!useUsernameFromComputer) {
                        if (author.trim() && title.trim() && description.trim()) {
                            props.onCreate({ author, title, description });
                            setAuthor('');
                            setTitle('');
                            setDescription('');
                        }
                    } else {
                        if (title.trim() && description.trim()) {
                            props.onCreate({ author: username, title, description });
                            setAuthor('');
                            setTitle('');
                            setDescription('');
                        }
                    }
                }}>{lang.create}</button>
            </div>
        </div>
    );
}