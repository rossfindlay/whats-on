import React from 'react'
import Card from './Card'

const CardContainer = (props) => {
  return (
    <div className="card-container">
      {props.ticketmasterSearchResults.map(event => {
        return (
          <Card
            {...event}
            key={event.id}
          />
        )
      })
      }
    </div>
  )
}

export default CardContainer
