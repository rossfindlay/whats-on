import React, { Component } from 'react'
import ReactMapboxGl, { Popup } from "react-mapbox-gl";

class MapPopup extends Component {

  render () {
    console.log(this.props.popupEvent)
    if(this.props.ticketmasterSearchResults.length > 0 && this.props.popupEvent) {
    return (
      <div className="popup-container">
            <Popup
              coordinates={[this.props.popupEvent.venueLocation[0].longitude, this.props.popupEvent.venueLocation[0].latitude]}
              offset={{
                'bottom-left': [12, -38],  'bottom': [0, -38], 'bottom-right': [-12, -38]
              }}>
              <div>Popup</div>
            </Popup>
      </div>
    )
    } else {
      console.log('popup error - no search results')
      return null
    }

  }

}

export default MapPopup
