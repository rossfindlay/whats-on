import React, { Component } from 'react';
import geohash from 'ngeohash'
import PropTypes from 'prop-types'
import moment from 'moment'

import Card from './Card'
import EventMap from './EventMap'
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)






    this.getTicketmasterFeed = this.getTicketmasterFeed.bind(this)

    this.getLatLng = this.getLatLng.bind(this)
    this.getGeoHash = this.getGeoHash.bind(this)
    this.getTimezone = this.getTimezone.bind(this)

    this.addEventLocationsToMap = this.addEventLocationsToMap.bind(this)

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
    searchParameters: {
      searchCity: "",
      searchCategory: "",
      searchRadius: "",
      searchUnit: "",
      searchStartDate: "",
      searchEndDate: "",
    },
    latlng: {},
    showMap: false,
    mapZoom: [1],
    mapCenter: [0, 0],
    eventLocations: {}


  }

  handleSearch() {
    this.getLatLng(this.cityInput.value)
      .then(latlng => {
        return (
          {
            timezone: this.getTimezone(latlng).then(timezone => {
              return timezone
            }),
            geoHash: this.getGeoHash(latlng),
          }
        )
      })
      .then(results => {
        this.getTicketmasterFeed(results.geoHash)
      })
  }

  getLatLng(city) {
    return fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=AIzaSyAzrOM7kAMzsw20ihiShOBu13sN3wf-5Hw`)
      .then(response => response.json())
      .then(data => {
      console.log(data.results[0].geometry.location)
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
        console.log(data)
        return data.rawOffset
      })
  }


  getTicketmasterFeed(geoHash) {
    fetch(`https://app.ticketmaster.com/discovery/v2/events.json?geoPoint=${geoHash}&classificationName=${this.selectedCategory.value}&startDateTime=${this.startDateInput.value}T00:00:00Z&endDateTime=${this.endDateInput.value}T23:59:00Z&radius=${this.selectedRadius.value}&unit=${this.selectedUnit.value}&size=100&page=0&sort=distance,asc&apikey=CsKQV0dhEPsfnwKyLuc6nmeQEfKyLrfe`)
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
            mapCenter: [this.state.latlng.lng, this.state.latlng.lat]
          }, () => {
            this.addEventLocationsToMap()
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
        showMap: false
      }) :
      this.setState({
        showMap: true
      })
  }

  // addEventLocationsToMap() {
  //   const locations = {
  //     type: 'FeatureCollection',
  //     features: this.state.ticketmasterSearchResults.map(result => {
  //     return (
  //       {
  //         type: 'Feature',
  //         geometry: {
  //           type: 'Point',
  //           coordinates: [result.venueLocation[0].longitude, result.venueLocation[0].latitude],
  //         },
  //         properties: {
  //           title: result.name,
  //           description: 'test'
  //         }
  //       }
  //     )
  //     })
  //   }
  //   this.setState({
  //     eventLocations: locations
  //   })
  // }


  render() {
    return (
      <div>
        <div className="search-container">
          <input type="text" ref={ref => this.cityInput = ref} defaultValue="Sydney"/>
          <input type="date" ref={ref => this.startDateInput = ref} defaultValue="2017-12-10"/>
          <input type="date" ref={ref => this.endDateInput = ref} defaultValue="2017-12-20"/>
          <select ref={ref => this.selectedCategory = ref} defaultValue="sports">
            {this.state.ticketmasterParameters.category.map(category => <option key={category}>{category}</option>)}
          </select>
          <select ref={ref => this.selectedRadius = ref} defaultValue="25">
            {this.state.ticketmasterParameters.radius.map(radius => <option key={radius}>{radius}</option>)}
          </select>
          <select ref={ref => this.selectedUnit = ref}>
            {this.state.ticketmasterParameters.unit.map(unit => <option key={unit}>{unit}</option>)}
          </select>
          <button onClick={this.handleSearch}>Submit</button>
        </div>
        <div><button onClick={this.toggleMap}>Toggle Map</button></div>
        <div className="card-container">
          {this.state.ticketmasterSearchResults.map(event => {
            return (
              <Card
                {...event}
                key={event.id}
              />
            )
          })
          }
        </div>
        {this.state.showMap ? (
          <div className="event-map">
            <EventMap
              ticketmasterSearchResults={this.state.ticketmasterSearchResults}
              eventLocations={this.state.eventLocations}
              latlng={this.state.latlng}
              mapZoom={this.state.mapZoom}
              mapCenter={this.state.mapCenter}
            />
          </div>
        ) : null}
      </div>
    );
  }
}

App.propTypes = {

}

export default App;
