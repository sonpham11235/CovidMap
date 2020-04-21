import React from 'react';

function Patient(props) {
    return (
        <li>
            <button className='btn-patient' onClick={props.onClick}>
                {props.patientName}
            </button>
        </li>
    )
}

export default Patient;