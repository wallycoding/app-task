import React from 'react';
import { remote } from 'electron';
import { BiSquare, BiMinus } from 'react-icons/bi';
import { IoMdClose } from 'react-icons/io';
import './index.css';

export default props => {

    const window = remote.getCurrentWindow();

    const close = () => {
        window.close();
    }

    const maximize = () => {
        window.isMaximized() ? window.restore() : window.maximize();
    }

    const minimize = () => {
        window.minimize();
    }

    return (
        <div className="frame">
            <button onClick={minimize}>
                <BiMinus />
            </button>
            <button onClick={maximize}>
                <BiSquare />
            </button>
            <button onClick={close}>
                <IoMdClose />
            </button>
        </div>
    )

}