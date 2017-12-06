import React, { Component } from 'react'
import ReactMapboxGl from "react-mapbox-gl";
import MapMarker from './MapMarker'
import MapPopup from './MapPopup'

const Map = ReactMapboxGl({
  accessToken: "pk.eyJ1Ijoicm9zc2YiLCJhIjoiY2phcHhlaHJoNDJjdjJ3bzJqcDQ1N3FnMiJ9.19795Kj-84xqiROGQpxncQ"
});

class EventMap extends Component {
  constructor(props) {
    super(props)

    this.handleMarkerClick = this.handleMarkerClick.bind(this)
  }
  state = {
    popupEvent: "",

  }

  handleMarkerClick(eventId) {
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
        containerStyle={{
          position: 'relative',
          height: "500px",
          width: "500px"
        }}
      >
        <MapPopup
          ticketmasterSearchResults={this.props.ticketmasterSearchResults}
          latlng={this.props.latlng}
          popupEvent={this.state.popupEvent}
        />
        <MapMarker
          ticketmasterSearchResults={this.props.ticketmasterSearchResults}
          onMarkerClick={this.handleMarkerClick}
        />
      </Map>
    </div>
    )
  }
}

export default EventMap
