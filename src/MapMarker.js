import React from 'react'
import ReactMapboxGl, { Marker } from "react-mapbox-gl";
import blackMarker from './images/black-marker.png'

const MapMarker = (props) => {
  if(props.ticketmasterSearchResults.length > 0) {
    return (
      <div className="marker-container">
        {props.ticketmasterSearchResults.map(event => {
          return (
            <Marker
              coordinates={[event.venueLocation[0].longitude, event.venueLocation[0].latitude]}
              anchor="bottom"
              onClick={() => props.onMarkerClick(event.id)}
              key={event.id}>
              <img className="map-marker" alt="marker" src={blackMarker}/>
            </Marker>
          )
        })}
      </div>
    )
  } else {
    console.log('marker error - no search results')
    return null
  }
}

export default MapMarker
