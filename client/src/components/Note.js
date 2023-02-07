import React from 'react'
import { StyledButton } from '../styled/StyledButton'

const Note = ({ note, toggleImportance }) => {
    const label = note.important ? 'make not important' : 'make important'

    return (
        <li className='note'>
            {note.content}
            <StyledButton
                importance={note.important}
                onClick={toggleImportance}
            >
                {label}
            </StyledButton>
        </li>
    )
}

export default Note
