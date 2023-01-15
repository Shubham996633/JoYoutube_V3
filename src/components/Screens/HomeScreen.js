import React from 'react'
import './_homeScreen.scss'
import { Container, Row, Col } from 'react-bootstrap'
import CategoriesBar from '../CategoriesBar/CategoriesBar'
import Video from '../video/Video'
const HomeScreen = () => {
    return (
        <Container>
            <CategoriesBar />
            <Row>
                {[...new Array(20)].map(() => (
                    <Col lg={3} md={4}>
                        <Video />
                    </Col>
                ))}
            </Row>
        </Container>
    )
}

export default HomeScreen