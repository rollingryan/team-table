import React, { useState } from 'react'
import { Modal, Button, Row } from 'react-bootstrap'
import AddTeamForm from './AddTeamForm'
import styles from './styles.module.scss'

const AddTeam = () => {
  const [modalVisible, setModalVisible] = useState(false)

  const toggleModalVisible = () => setModalVisible(!modalVisible)

  return (
    <>
      <Row className={styles.addTeam}>
        <Button
          className={styles.addTeam__button}
          variant='outline-warning'
          onClick={toggleModalVisible}
        >
          Add Team
        </Button>
      </Row>
      <Modal show={modalVisible} onHide={toggleModalVisible}>
        <Modal.Header closeButton>
          <Modal.Title>Add a new team</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <AddTeamForm />
        </Modal.Body>
      </Modal>
    </>
  )
}

export default AddTeam
