import axios from 'axios'
import React, { useState } from 'react'
import { Form, Row, Button, Spinner, Alert } from 'react-bootstrap'
import ReportTable from './ReportTable'
import styles from './styles.module.scss'

const Report = () => {
  const [reportType, setReportType] = useState('')
  const [reportAmount, setReportAmount] = useState(null)
  const [type, setType] = useState('')
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
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
      setLoading(false)
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
          setDisplayAlert(false)
        } else {
          setDisplayAlert(true)
          setAlertMessage('Something went wrong')
          setAlertVariant('warning')
        }
        setLoading(false)
      })
      .catch((error) => {
        setDisplayAlert(true)
        setAlertMessage(error.message)
        setAlertVariant('danger')
        setLoading(false)
      })
  }

  return (
    <>
      <Row>
        <Form
          onSubmit={(event) => {
            event.preventDefault()
            setLoading(true)
            getReportData()
          }}
          className={styles.ReportFilterForm}
        >
          <h5 className={styles.ReportFilterForm__heading}>
            Generate a report by submitting the form below
          </h5>

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
              variant='warning'
              type='submit'
              className={styles.ReportFilterForm__generateReportButton}
              disabled={loading}
            >
              {(loading && (
                <Spinner animation='border' variant='secondary' />
              )) ||
                'Generate Report'}
            </Button>
          </Form.Group>
        </Form>
      </Row>
      <ReportTable type={type} data={data} />
    </>
  )
}

export default Report
