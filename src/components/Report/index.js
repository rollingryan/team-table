import axios from 'axios'
import React, { useState } from 'react'
import { Form, Row, Button, Alert } from 'react-bootstrap'
import ReportTable from './ReportTable'
// import data from '../../__mocks__/12months'
// import data from '../../__mocks__/52weeks'
import styles from './styles.module.scss'

const Report = () => {
  const [reportType, setReportType] = useState('')
  const [reportAmount, setReportAmount] = useState(null)
  const [type, setType] = useState('')
  const [data, setData] = useState([])
  const [displayAlert, setDisplayAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const [alertVariant, setAlertVariant] = useState('')

  const getReportData = () => {
    if (!reportType && !reportAmount) {
      setDisplayAlert(true)
      setAlertMessage(
        'You need to select a report type AND set the number of items to retrieve.',
      )
      setAlertVariant('danger')
      return
    }

    axios
      .get(
        `http://stubber.test.visiblethread.com/scans/${reportType}/${reportAmount}`,
      )
      .then((response) => {
        if (response.status === 200) {
          setType(reportType)
          setData(response.data)
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
    <>
      <Row>
        <Form
          onSubmit={(event) => {
            event.preventDefault()
            getReportData()
          }}
          className={styles.ReportFilterForm}
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
      <ReportTable type={type} data={data} />
    </>
  )
}

export default Report
