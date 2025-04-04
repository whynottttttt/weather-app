import React from 'react'
import { Button } from 'react-bootstrap';

const WeatherButton = () => {
  return (
    <div>
         <Button variant="warning">Current Location</Button>
         <Button variant="warning">paris</Button>
         <Button variant="warning">new yorks</Button>
    </div>
  )
}

export default WeatherButton