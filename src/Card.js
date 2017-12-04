import React, { Component } from 'react'
import moment from 'moment'
import 'moment-timezone'

class Card extends Component {
  constructor(props) {
    super(props)

    this.findCurrencyCode = this.findCurrencyCode.bind(this)
    this.formatTime = this.formatTime.bind(this)
  }

  state = {
    currencyCodes: ["AUD", "USD", "GBP", "EUR"],
    currencySymbols: ["$", "$", "£", "€"]
  }

  findCurrencyCode(searchCode) {
    const currencyIndex = this.state.currencyCodes.find(code => code === searchCode)
    if (currencyIndex) {
      return this.state.currencySymbols[this.state.currencyCodes.indexOf(currencyIndex)]
    } else {
      return ""
    }
  }

  formatTime(date, timezone) {
    return moment.tz(date, timezone).format("D MMM YYYY HH:mm")
  }

  render(){
    console.log(this.props)
    return (
      <div className="event-container">
        <div className="event-title">{this.props.name}</div>
        <div className="event-image-container"><img className="event-image" src={this.props.images[0].url} alt="event"/></div>
        <div className="event-what"><span className="card-heading">What:</span> {this.props.category} ({this.props.categorySpecific})</div>
        <div className="event-when"><span className="card-heading">When:</span> {this.formatTime(this.props.dateCode, this.props.timezone)}</div>
        <div className="event-cost"><span className="card-heading">How much:</span> {this.props.priceRange ? `${this.findCurrencyCode(this.props.priceRange[0].currency)}${this.props.priceRange[0].min}-${this.props.priceRange[0].max}` : `Not available`}</div>
      </div>
    )
  }
}

export default Card
