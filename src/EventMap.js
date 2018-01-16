import React, { Component } from 'react'
import ReactMapboxGl from "react-mapbox-gl";
import MapMarker from './MapMarker'
import MapPopup from './MapPopup'

const Map = ReactMapboxGl({
  accessToken: "pk.eyJ1Ijoicm9zc2YiLCJhIjoiY2phcHhlaHJoNDJjdjJ3bzJqcDQ1N3FnMiJ9.19795Kj-84xqiROGQpxncQ"
});

class EventMap extends Component {
  state = {
    popupEvent: "",
    windowWidth: "",
    windowHeight: "",
  }

  getWindowWidth = () => {
      var e = window, a = 'inner';
      if (!('innerWidth' in window)) {
        a = 'client';
        e = document.documentElement || document.body;
      }
      this.setState({
        windowWidth : e[ a+'Width' ],
        windowHeight : e[ a+'Height' ]
      })
  }

  componentDidMount() {
    this.getWindowWidth()
  }

  handleMarkerClick = (eventId) => {
    const event = this.props.ticketmasterSearchResults.find(event => event.id === eventId)
    this.setState({
      popupEvent: event
    })
  }

  render() {
    return (
    <div className="map-container">
      <Map
        style="mapbox://styles/mapbox/streets-v9"
        zoom={this.props.mapZoom}
        center={this.props.mapCenter}
        className="map-styling"
        containerStyle={{
          height: "500px",
          width: this.state.windowWidth,
        }}
      >
        <MapMarker
          ticketmasterSearchResults={this.props.ticketmasterSearchResults}
          onMarkerClick={this.handleMarkerClick}
        />
        <MapPopup
          ticketmasterSearchResults={this.props.ticketmasterSearchResults}
          latlng={this.props.latlng}
          popupEvent={this.state.popupEvent}
        />
      </Map>
    </div>
    )
  }
}

export default EventMap
