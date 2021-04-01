import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquare, faCheckSquare } from '@fortawesome/free-solid-svg-icons';

import './index.css';

export default props => {

    return (
        <button className="check-box" onClick={props.onClick}>
            {
                props.checked ? (
                    <FontAwesomeIcon icon={faCheckSquare} style={{ color: '#46eb34' }} />
                ) : (
                    <FontAwesomeIcon icon={faSquare} style={{ color: '#b4b8b9' }} />
                )
            }
            <span>{props.name}</span>
        </button>
    );

}