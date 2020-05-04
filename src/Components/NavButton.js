import {Link} from 'react-router-dom';
import React from 'react';

class NavButton extends React.Component {
    render() {
        return(
            <div className='item6'>
                <Link to="/map">
                    <button className='switch-button'>
                        Covid Map
                    </button>
                </Link>
                <Link to="/stats">
                    <button className='switch-button'>
                        Covid Stats
                    </button>
                </Link>
            </div>
        )
    }
}

export default NavButton;