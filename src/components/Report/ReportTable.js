import React from 'react'
import { format } from 'date-fns'
import { v4 as uuid } from 'uuid'
import { Row, Col, Table } from 'react-bootstrap'
import styles from './styles.module.scss'

const ReportTable = ({ type = '', data = [] }) => {
  const dateTypes = {
    monthly: 'MMM',
    weekly: 'w',
  }

  const scanTypes = {
    monthly: 'scansAMonth',
    weekly: 'scansAWeek',
  }

  const calculateMonthlyAverage = (name, total) => {
    const items = [
      ...new Set(
        data.map(
          (item) =>
            item.hasOwnProperty(scanTypes[type]) &&
            item.teamName === name && { item },
        ),
      ),
    ]

    return total / items.length
  }

  const teamsData = {
    monthly: [
      ...new Set(
        data.map(
          (item) =>
            item.hasOwnProperty('totalScans') && {
              ...item,
              monthlyAverage: calculateMonthlyAverage(
                item.teamName,
                item.totalScans,
              ),
            },
        ),
      ),
    ],
    weekly: [...new Set(data.map((item) => item.teamName))],
  }

  const getCol = (dateString) => format(new Date(dateString), dateTypes[type])

  const scansData = [
    ...new Set(
      data.map(
        (item) =>
          item.hasOwnProperty('date') && {
            ...item,
            col: getCol(item.date),
          },
      ),
    ),
  ]

  const cols = [...new Set(scansData.sort().map((item) => item.col))]

  return (
    data?.length > 0 && (
      <Row className={styles.reportTable}>
        <Col
          className={`${styles.reportTable__body} ${
            (type === 'weekly' && styles.reportTable__body__weekly) || ''
          }`}
        >
          <Table hover variant='dark' className={styles.reportTable__table}>
            <thead>
              <tr>
                {cols.map(
                  (col) =>
                    col && (
                      <th key={uuid()} className={styles.reportTable__body__th}>
                        {`${(type === 'weekly' && 'Week ') || ''}${col}`}
                      </th>
                    ),
                )}
              </tr>
            </thead>
            <tbody>
              {teamsData[type]?.map(
                (team) =>
                  team && (
                    <tr key={uuid()}>
                      {cols.map(
                        (col) =>
                          col && (
                            <td key={uuid()}>
                              {scansData.find(
                                (scan) =>
                                  (scan && scan.teamName === team.teamName) ||
                                  (scan.teamName === team &&
                                    getCol(scan.date) === col),
                              )[scanTypes[type]] || 'null'}
                            </td>
                          ),
                      )}
                    </tr>
                  ),
              )}
            </tbody>
          </Table>
        </Col>
        <Col
          className={`${styles.reportTable__sticky} ${
            (type === 'weekly' && styles.reportTable__sticky__weekly) || ''
          }`}
        >
          <Table
            striped
            className={`${styles.reportTable__table} ${
              (type === 'weekly' && styles.reportTable__table__weekly) || ''
            }`}
          >
            <thead>
              <tr>
                <th>Team</th>
                {type === 'monthly' && (
                  <>
                    <th>Average</th>
                    <th>Total</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {teamsData[type]?.map(
                (item) =>
                  item && (
                    <tr key={uuid()}>
                      <td>{(type === 'monthly' && item.teamName) || item}</td>
                      {type === 'monthly' && (
                        <>
                          <td>
                            {(type === 'monthly' && item.monthlyAverage) ||
                              item.weeklyAverage}
                          </td>
                          <td>{item.totalScans}</td>
                        </>
                      )}
                    </tr>
                  ),
              )}
            </tbody>
          </Table>
        </Col>
      </Row>
    )
  )
}

export default ReportTable
