import React from 'react'
import ReactMapboxGl, { Popup } from "react-mapbox-gl";

const MapPopup = (props) => {
  if(props.ticketmasterSearchResults.length > 0 && props.popupEvent) {
    return (
      <div className="popup-container">
        <Popup
          coordinates={[props.popupEvent.venueLocation[0].longitude, props.popupEvent.venueLocation[0].latitude]}
          offset={{
            'bottom-left': [12, -38],  'bottom': [0, -38], 'bottom-right': [-12, -38]
          }}>
          <div>
            {props.popupEvent.name}
          </div>
        </Popup>
      </div>
    )
  } else {
    console.log('popup error - no search results')
    return null
  }
}

export default MapPopup
