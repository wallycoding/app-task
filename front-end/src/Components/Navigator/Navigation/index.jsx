import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './index.css';

export default props => {

    const [currentRoute, setCurrentRoute] = useState(props.initRoute);

    const createTabChildren = (screens) => {
        return screens.map((screen, i) => (
            <button 
                key={i}
                className={currentRoute === screen.route ? 'navigation-current-route' : null}
                onClick={() => { setCurrentRoute(screen.route) }}
            >
                <FontAwesomeIcon 
                    icon={screen.icon}  
                />
            </button>
        ));
    }

    const RenderComponent = () => {
        const screen = props.screens.filter(screen => screen.route === currentRoute)[0];
        return (screen.component);
    }

    return (
        <div className="navigation-container">
            <div className="navigation-tab-left">
                {createTabChildren(props.screens)}
            </div>
            <div className="navigation-content">
                <RenderComponent />
            </div>
        </div>
    );
}