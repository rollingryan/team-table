import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.scss'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import AddTeam from './components/AddTeam'
import Report from './components/Report'

const App = () => (
  <div className='wrapper'>
    <Container fluid>
      <Header />
      <AddTeam />
      <Report />
    </Container>
  </div>
)

export default App
