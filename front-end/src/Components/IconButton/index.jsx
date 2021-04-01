import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default props => {
    
    return (
        <button style={props.style} onClick={props.onPress}>
            <FontAwesomeIcon icon={props.icon} />
        </button>
    );

}