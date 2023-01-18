import React from 'react'
import './_WatchScreen.scss'
import { Col, Row } from 'react-bootstrap'
import VideoMetaData from '../../VideoMetaData/VideoMetaData'
import VideoHorizontal from '../../VideoHorizontal/VideoHorizontal'
import Comments from '../../Comments/Comments'

const WatchScreen = () => {
    return (
        <Row>
            <Col lg={8}>
                <div className='watchScreen__player'>
                    <iframe src="https://www.youtube.com/embed/myQtYOx0up0"

                        frameBorder="0"
                        title='Piya Tose Naina Laage Re'
                        allowFullScreen
                        width="100%"
                        height="100%"></iframe>
                </div>
                <VideoMetaData />
                <Comments />
            </Col>
            <Col lg={4}>
                {[...Array(10)].map(() => (
                    <VideoHorizontal />
                ))}

            </Col>
        </Row>
    )
}

export default WatchScreen