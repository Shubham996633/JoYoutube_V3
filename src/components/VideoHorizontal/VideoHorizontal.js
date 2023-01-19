import React from 'react'
import './_VideoHorizontal.scss'
import { AiFillEye } from 'react-icons/ai'
import request from '../../apiCall'
import moment from 'moment/moment'
import numeral from 'numeral'
import { Row, Col } from 'react-bootstrap'
import { LazyLoadImage } from 'react-lazy-load-image-component'
const VideoHorizontal = () => {

    const seconds = moment.duration('100').asSeconds()
    const _duration = moment.utc(seconds * 1000).format('mm:ss')
    return (
        <Row className="videoHorizontal m-1 py-2 align-align-items-center">
            <Col xs={6} md={4} className="videoHorizontal__left">
                <LazyLoadImage wrapperClassName="videoHorizontal__thumbnail-wrapper" className="videoHorizontal__thumbnail" src='https://i.ytimg.com/vi/d9IKg-nizhQ/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLD-pMlAqpwdwOMocsUB6OMZK5ODdQ' effect="blur" />
                <span className='video__top__duration'>{_duration}</span>

            </Col>
            <Col xs={6} md={8} className="videoHorizontal__right p-0">
                <p className='videoHorizontal__title mb-1'>
                    Ehsan Tera Hoga Mujh Par Jonita Gandhi Saregama Carvaan
                </p>

                <div className='videoHorizontal__details'>
                    <span>
                        <AiFillEye /> {numeral(99999).format('0.a')} Views • {moment(99999).fromNow()}
                    </span>
                </div>

                <div className='videoHorizontal__channel d-flex align-items-center my-1'>
                    <LazyLoadImage src='https://yt3.ggpht.com/dxED1O-r5cRS73JBlUk4VS3pZHDfiHcuRjRbFMcf6KgYhxP4NUlD7x0h4TR1XTXkl-JGjTPTYQ=s88-c-k-c0x00ffffff-no-rj' effect="blur" />
                    <p>
                        Saregma
                    </p>
                </div>

            </Col>

        </Row>
    )
}

export default VideoHorizontal