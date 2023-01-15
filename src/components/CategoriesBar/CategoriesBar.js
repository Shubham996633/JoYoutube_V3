import React, { useState } from 'react'
import './_categoriesBar.scss'

const keywords = [
    'All',
    'React js',
    'Jonita Gandhi',
    'React Native',
    'Jonitamusic',
    'A.R. Rahman',
    'Music',
    'Algorithm Art ',
    'Vijay Thalapathy',

    'Aman Dhatarwal',
]

const CategoriesBar = () => {


    const [activeElement, setActiveElement] = useState('All')

    const handleClick = (value) => {
        setActiveElement(value)
    }

    return (
        <div className='CategoriesBar'>
            {keywords.map((value, i) => <span
                key={i}
                onClick={() => handleClick(value)}
                className={activeElement === value ? 'active' : ''}
            >
                {value}
            </span>)}
        </div>
    )
}

export default CategoriesBar