import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.scss'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import AddTeam from './components/AddTeam'
import Report from './components/Report'

const App = () => (
  <Container fluid>
    <Header />
    <Report />
    <AddTeam />
  </Container>
)

export default App
