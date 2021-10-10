import React, { useState } from 'react'
import { Form, Row, Button } from 'react-bootstrap'
import styles from './styles.module.scss'

const ReportFilterForm = () => {
  const [reportType, setReportType] = useState('')
  const [reportAmount, setReportAmount] = useState(0)

  console.log('reportType', reportType)
  console.log('reportAmount', reportAmount)

  // const getReportData = () => {
  //   if (teams?.includes(newName) || newName === '') {
  //     setDisplayAlert(true)
  //     setAlertMessage('Team name must be valid and unique.')
  //     setAlertVariant('danger')
  //     return
  //   }

  //   axios
  //     .post('http://stubber.test.visiblethread.com/teams/add', String(newName))
  //     .then((response) => {
  //       if (response.data === true) {
  //         setDisplayAlert(true)
  //         setAlertMessage('New team added successfully!')
  //         setAlertVariant('success')
  //       } else {
  //         setDisplayAlert(true)
  //         setAlertMessage(response.data)
  //         setAlertVariant('warning')
  //       }
  //     })
  //     .catch((error) => {
  //       setDisplayAlert(true)
  //       setAlertMessage(error.message)
  //       setAlertVariant('danger')
  //     })
  // }

  return (
    <Row>
      <Form
        // onSubmit={(event) => {
        //   event.preventDefault()
        //   getReportData()
        // }}
        className={styles.ReportFilterForm}
      >
        <h5 className={`text-muted ${styles.ReportFilterForm__heading}`}>
          Generate a report by submitting the form below
        </h5>
        <Form.Group
          controlId='formFilterReport'
          className={styles.ReportFilterForm__group}
        >
          <Form.Select
            className={styles.ReportFilterForm__field}
            onChange={(event) => {
              setReportType(event.target.value)
            }}
          >
            <option>Report type</option>
            <option value='weekly'>Weekly</option>
            <option value='monthly'>Monthly</option>
          </Form.Select>
          <Form.Control
            type='number'
            placeholder='How many?'
            onChange={(event) => {
              setReportAmount(event.target.value)
            }}
            className={styles.ReportFilterForm__field}
          />
          <Button
            variant='primary'
            type='submit'
            className={styles.ReportFilterForm__generateReportButton}
          >
            Generate Report
          </Button>
        </Form.Group>
      </Form>
    </Row>
  )
}

export default ReportFilterForm
