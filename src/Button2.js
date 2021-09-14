import React from 'react'
import './Button2.css'

const STYLES = [
    'btn--primary',
    
]

const SIZES = [
    'btn--medium',
    'btn--large'
]

export const Button2 = ({
    children,
    buttonStyle,
    buttonSize
}) => {

    const checkButtonStyle = STYLES.includes(buttonStyle) ? buttonStyle : STYLES[0]

    const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0]

    return (
        <button className={`btn ${checkButtonStyle} ${checkButtonSize}`}>
            {children}
        </button>
    )
}