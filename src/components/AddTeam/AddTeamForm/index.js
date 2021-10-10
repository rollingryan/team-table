import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Form, Button, Alert } from 'react-bootstrap'
import styles from './styles.module.scss'

const AddTeamForm = () => {
  const [newName, setNewName] = useState('')
  const [teams, setTeams] = useState('')
  const [displayAlert, setDisplayAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const [alertVariant, setAlertVariant] = useState('')

  const getTeamsUrl = 'http://stubber.test.visiblethread.com/teams/allNames'
  const getAllTeams = () => {
    axios
      .get(getTeamsUrl)
      .then((response) => {
        const allTeamNames = response.data
        setTeams(allTeamNames)
      })
      .catch((error) => console.log('Error:', error))
  }

  useEffect(() => {
    getAllTeams()
  }, [])

  const addNewTeam = () => {
    if (teams?.includes(newName) || newName === '') {
      setDisplayAlert(true)
      setAlertMessage('Team name must be valid and unique.')
      setAlertVariant('danger')
      return
    }

    axios
      .post('http://stubber.test.visiblethread.com/teams/add', String(newName))
      .then((response) => {
        if (response.data === true) {
          setDisplayAlert(true)
          setAlertMessage('New team added successfully!')
          setAlertVariant('success')
        } else {
          setDisplayAlert(true)
          setAlertMessage('Something went wrong')
          setAlertVariant('warning')
        }
      })
      .catch((error) => {
        setDisplayAlert(true)
        setAlertMessage(error.message)
        setAlertVariant('danger')
      })
  }

  return (
    <Form
      onSubmit={(event) => {
        event.preventDefault()
        addNewTeam()
      }}
      className={styles.addTeamForm}
    >
      {(displayAlert && (
        <Alert
          variant={alertVariant}
          onClose={() => setDisplayAlert(false)}
          dismissible
        >
          {alertMessage}
        </Alert>
      )) ||
        null}
      <Form.Group
        controlId='formTeamName'
        className={styles.addTeamForm__group}
      >
        <Form.Control
          type='text'
          placeholder='Team Name'
          onChange={(event) => {
            setNewName(event.target.value)
          }}
        />
      </Form.Group>

      <Button variant='outline-primary' type='submit'>
        Send
      </Button>
    </Form>
  )
}

export default AddTeamForm
