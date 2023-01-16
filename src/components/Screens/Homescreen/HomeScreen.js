import React, { useEffect } from 'react'
import { Col, Row, Container } from 'react-bootstrap'
import Video from '../../video/Video'
import CategoriesBar from '../../CategoriesBar/CategoriesBar'
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