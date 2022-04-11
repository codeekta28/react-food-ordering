import React from 'react'
import AvailableMeal from './AvailableMeal'
import MealSummary from './MealSummary'

function Meal() {
  return (
    <React.Fragment>
        <MealSummary/>
        <AvailableMeal/>
    </React.Fragment>
  )
}

export default Meal