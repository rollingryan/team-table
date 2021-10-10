import React from 'react'
import { Row, Col } from 'react-bootstrap'
import styles from './styles.module.scss'

const Header = () => (
  <Row className={styles.header}>
    <Col className={styles.header__content}>
      <h1 className={styles.header__title}>
        <span>Team</span>
        <span>Scans</span>
      </h1>
      <h4 className={styles.header__subtitle}>By month or by week</h4>
    </Col>
  </Row>
)

export default Header
