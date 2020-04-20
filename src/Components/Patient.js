import React from 'react';

function Patient(props) {
    return (
        <li class='btn-patient'>
            <button>
                {props.patientName}
            </button>
        </li>
    )
}

export default Patient;