import React from 'react'
import numeral from 'numeral'
import { AiFillEye } from 'react-icons/ai'
import './_VideoMetaData.scss'
import moment from 'moment'
import { MdThumbDown, MdThumbUp } from 'react-icons/md'
import ReactShowMoreText from 'react-show-more-text'
const VideoMetaData = () => {
    return (
        <div className='py-2 videoMetaData'>


            <div className='videoMetaData__top'>
                <h5>Piya Tose Naina Laage Re</h5>
                <div className='py-1 d-flex justify-content-between align-items-center'>
                    <span>
                        {numeral(999999).format('0.a')} Views • {' '}
                        {moment(99999).fromNow()}
                    </span>

                    <div>
                        <span className='mr-3'>
                            <MdThumbUp className='action' size={26} /> {numeral(9999).format('0.a')}
                        </span>
                        <span className='mr-3'>
                            <MdThumbDown className='action' size={26} />{' '}
                            {numeral(0).format('0.a')}
                        </span>
                    </div>
                </div>
            </div>
            <div className='py-3 my-2 videoMetaData__channel d-flex justify-content-between align-items-center'>
                <div className='d-flex'>
                    <img
                        src='https://yt3.ggpht.com/ytc/AMLnZu_Y7PTfuKgvrrphSGmhku1j5EqIls9l3btuz5l4=s88-c-k-c0x00ffffff-no-rj-mo'
                        alt=''
                        className='mr-3 rounded-circle'
                    />
                    <div className='d-flex flex-column'>
                        <span>JonitaMusic</span>
                        <span>
                            {' '}
                            {numeral(99999).format(
                                '0.a'
                            )}{' '}
                            Subscribers
                        </span>
                    </div>
                </div>
                <button className='btn border-0 p-2 m-2'>Subscribed</button>



            </div>
            <div className='videoMetaData__description'>
                <ReactShowMoreText
                    lines={3}
                    more="Show More"
                    less="Show Less"
                    anchorClass='showMoretext'
                    expanded={false}
                >
                    Wishing India's nightingale, Lata Mangeshkar Ji a very happy birthday!!! What an impact she has had, and continues to have, not only on the entire Indian music industry, but on all of us – her fans across the globe. She's been my guru (without knowing it), right from the start ☺. Growing up in Toronto, I would listen to her songs and try to copy all her inflections and harkats… and from that alone I learned so much! Even now, every time I hear her songs, I notice new things each time… the way she's rendered them… such finesse *heart*.

                    Piya Tose Naina Laage re is a song we all know and love for many reasons! Be it the onscreen magic of Waheeda Rehman, the epic music of SD Burman, or the sweet vocal rendition by Lata ji - the entire soundtrack of Guide is definitely among Bollywood's all-time best albums. Hope you enjoy this rendition, presented to you by Keba, Sanket and I ☺

                    Fun fact: This video was done while on the 2018 AR Rahman Live Tour. We shot at the Angel of the Winds Arena in Seattle, right before soundcheck, on the day of our concert! :D Huge thank you to everyone who helped make this possible: Angshuman Ghosh, Ashish Heblekar, Kevin Doucette, & BTOS Productions
                </ReactShowMoreText>
            </div>
        </div>
    )
}

export default VideoMetaData
// 3:31:00