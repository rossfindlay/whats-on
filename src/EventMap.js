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

  }

  handleMarkerClick = (eventId) => {
    const event = this.props.ticketmasterSearchResults.find(event => event.id === eventId)
    this.setState({
      popupEvent: event
    })
  }

  render() {
    console.log(this.props.mapZoom)
    return (
    <div className="map-container">
      <Map
        style="mapbox://styles/mapbox/streets-v9"
        zoom={this.props.mapZoom}
        center={this.props.mapCenter}
        className="map-styling"
        containerStyle={{
          position: 'relative',
          height: "500px",
          width: "300px",
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
