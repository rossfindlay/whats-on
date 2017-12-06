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
      <div className="event-title">{props.name}</div>
      <div className="event-image-container"><img className="event-image" src={props.images[0].url} alt="event"/></div>
      <div className="event-what"><span className="card-heading">What:</span> {props.category} ({props.categorySpecific})</div>
      <div className="event-when"><span className="card-heading">When:</span> {formatTime(props.dateCode, props.timezone)}</div>
      <div className="event-cost"><span className="card-heading">How much:</span> {props.priceRange ? `${findCurrencyCode(props.priceRange[0].currency)}${props.priceRange[0].min}-${props.priceRange[0].max}` : `Not available`}</div>
    </div>
  )
}

export default Card
