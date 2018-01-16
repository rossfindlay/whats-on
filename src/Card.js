import React from 'react'
import moment from 'moment'
import 'moment-timezone'

const Card = (props) => {

  const findCurrencyCode = (searchCode) => {
    const currencyCodes = ["AUD", "USD", "GBP", "EUR"]
    const currencySymbols = ["$", "$", "£", "€"]
    const currencyIndex = currencyCodes.find(code => code === searchCode)
    if (currencyIndex) {
      return currencySymbols[currencyCodes.indexOf(currencyIndex)]
    } else {
      return ""
    }
  }

  const formatTime = (date, timezone) => {
    return moment.tz(date, timezone).format("D MMM YYYY HH:mm")
  }

  return (
    <div className="event-container">
      <div className="row-one">
        <div className="source-logo-container">
          <img className="source-logo" src={props.sourceLogo} alt="source logo"/>
        </div>
        <div className="event-what">{props.category} ({props.categorySpecific})</div>
      </div>
      <div className="row-two">
        <div className="event-title">{props.name}</div>
      </div>
      <div className="row-three">
        <div className="event-when">{formatTime(props.dateCode, props.timezone)}</div>
        <div className="event-cost"><span className="card-heading">Price:</span> {props.priceRange ? `${findCurrencyCode(props.priceRange[0].currency)}${props.priceRange[0].min}` : `Not available`}</div>
      </div>
      <div className="row-four">
        <div className="buy-button-container">
          <a className="buy-tickets" href={props.url}>Buy tickets</a>
        </div>
      </div>
    </div>
  )
}

export default Card
