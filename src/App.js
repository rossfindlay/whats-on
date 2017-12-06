import React, { Component } from 'react';
import geohash from 'ngeohash'
import PropTypes from 'prop-types'

import EventMap from './EventMap'
import SearchContainer from './SearchContainer'
import CardContainer from './CardContainer'
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.childRefs = {};
    this.getTicketmasterFeed = this.getTicketmasterFeed.bind(this)

    this.getSearchRef = this.getSearchRef.bind(this)
    this.getLatLng = this.getLatLng.bind(this)
    this.getGeoHash = this.getGeoHash.bind(this)
    this.getTimezone = this.getTimezone.bind(this)

    this.handleSearch = this.handleSearch.bind(this)
    this.toggleMap = this.toggleMap.bind(this)
  }

  state = {
    ticketmasterParameters: {
      category: ["arts", "music", "sports"],
      radius: ["5", "10", "25", "50"],
      unit: ["km", "miles"],
      startDateTime: "x",
      endDateTime: "y",
    },
    ticketmasterSearchResults: [],
    latlng: {},
    showMap: false,
    showCards: true,
    showSearchContainer: true,
    mapZoom: [1],
    mapCenter: [0, 0],
    eventLocations: {},
    searchAddress: "Sydney, New South Wales, Australia"


  }

  handleSearch() {
    this.getLatLng(this.state.searchAddress)
      .then(latlngResponse => {
      return this.getTimezone(latlngResponse)
      .then(timezoneResponse => ({
        timezone: timezoneResponse,
        geoHash: this.getGeoHash(latlngResponse)
      }))
    }).then(({timezone, geoHash}) => {
      this.getTicketmasterFeed(geoHash)
    })
  }

  getSearchRef(name, ref) {
    this.childRefs[name] = ref;
  }

  convertAddressString = (address) => {
    console.log(`old address ${address}`)
    const newAddress = address.replace(/\s+/g, '+')
    console.log(`new address ${newAddress}`)
    return newAddress
  }

  getLatLng(city) {
    const searchCity = this.convertAddressString(city)
    return fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${searchCity}&key=AIzaSyAzrOM7kAMzsw20ihiShOBu13sN3wf-5Hw`)
      .then(response => response.json())
      .then(data => {
        console.log(data.results[0])
      this.setState({
        latlng: data.results[0].geometry.location
      })
      return data.results[0].geometry.location
    })
  }

  getGeoHash(latlng) {
    return geohash.encode(latlng.lat, latlng.lng)
  }

  getTimezone(latlng) {
    return fetch(`https://maps.googleapis.com/maps/api/timezone/json?location=${latlng.lat},${latlng.lng}&timestamp=1510657192&key=AIzaSyAzrOM7kAMzsw20ihiShOBu13sN3wf-5Hw`)
      .then(response => response.json())
      .then(data => {
        return data.rawOffset
      })
  }


  getTicketmasterFeed(geoHash) {
    fetch(`https://app.ticketmaster.com/discovery/v2/events.json?geoPoint=${geoHash}&classificationName=${this.childRefs.selectedCategory.value}&startDateTime=${this.childRefs.startDateInput.value}T00:00:00Z&endDateTime=${this.childRefs.endDateInput.value}T23:59:00Z&radius=${this.childRefs.selectedRadius.value}&unit=${this.childRefs.selectedUnit.value}&size=100&page=0&sort=distance,asc&apikey=CsKQV0dhEPsfnwKyLuc6nmeQEfKyLrfe`)
      .then(results => results.json())
      .then(results => {
        console.log(results)
        if(results._embedded) {
          const events = results._embedded.events.map(event => {
            return (
              {
                name: event.name,
                category: event.classifications.map(category => category.segment.name),
                categorySpecific: event.classifications.map(category => category.genre.name),
                dateCode: event.dates.start.dateTime,
                startDate: event.dates.start.localDate,
                startTime: event.dates.start.localTime,
                timezone: event.dates.timezone,
                priceRange: event.priceRanges ? event.priceRanges.map(priceRange => priceRange) : undefined,
                venueName: event._embedded.venues.map(venue => venue.name),
                venueLocation: event._embedded.venues.map(venue => venue.location),
                distanceFromUser: event.distance,
                id: event.id,
                images: event.images.map(image => image),
                testEvent: event.pleaseNote,
                url: event.url
              }
            )
          })
          this.setState({
            ticketmasterSearchResults: events,
            mapZoom: [10],
            mapCenter: [this.state.latlng.lng, this.state.latlng.lat],
            showSearchContainer: false,
          })
        } else {
          return console.log('no results')
        }
      })
  }

  getTicketmasterEventInfo(id) {
    fetch(`https://app.ticketmaster.com/discovery/v2/events/1AKZAG7GkdCeaV1.json?apikey=CsKQV0dhEPsfnwKyLuc6nmeQEfKyLrfe`)
      .then(results => results.json())
      .then(results => {
        console.log(results)
      })
  }

  toggleMap() {
    this.state.showMap ?
      this.setState({
        showMap: false,
        showCards: true
      }) :
      this.setState({
        showMap: true,
        showCards: false
      })
  }

  toggleSearch = () => {
    this.state.showSearchContainer ?
      this.setState({
        showSearchContainer: false
      }) :
      this.setState({
        showSearchContainer: true,
      })
  }

  handleAddressChange = (address) => {
    this.setState({searchAddress: address})
  }

  render() {
    return (
      <div>
        {this.state.showSearchContainer ? (
          <SearchContainer
            ticketmasterParameters={this.state.ticketmasterParameters}
            getSearchRef={this.getSearchRef}
            onSubmitClick={this.handleSearch}
            searchAddress={this.state.searchAddress}
            onChangeAddress={this.handleAddressChange}
          />
        ) : null}
        {!this.state.showSearchContainer ? <div><button onClick={this.toggleSearch}>Return to search</button></div> : null}
        {this.state.ticketmasterSearchResults ? <div><button onClick={this.toggleMap}>{this.state.showMap ? `Show cards` : `Show map`}</button></div> : null}
        {this.state.showCards ? (
          <div>
            <CardContainer
              ticketmasterSearchResults={this.state.ticketmasterSearchResults}
            />
          </div>
        ) : null}
        {this.state.showMap ? (
            <EventMap
              ticketmasterSearchResults={this.state.ticketmasterSearchResults}
              eventLocations={this.state.eventLocations}
              latlng={this.state.latlng}
              mapZoom={this.state.mapZoom}
              mapCenter={this.state.mapCenter}
            />
        ) : null}
      </div>
    );
  }
}

App.propTypes = {

}

export default App;
