import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { getVideosByCategory } from '../../redux/actions/videos.action'
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
    const dispatch = useDispatch()

    const handleClick = (value) => {
        setActiveElement(value)
        dispatch(getVideosByCategory(value))
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