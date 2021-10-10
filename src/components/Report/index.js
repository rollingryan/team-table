import React from 'react'
import ReportFilterForm from './ReportFilterForm'
import ReportTable from './ReportTable'
import data from '../../__mocks__/12months'
// import data from '../../__mocks__/52weeks'

const Report = () => (
  <>
    <ReportFilterForm />
    <ReportTable type='monthly' data={data} />
  </>
)

export default Report
