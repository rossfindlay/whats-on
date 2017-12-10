import React from 'react'
import PlacesAutocomplete from 'react-places-autocomplete'

const SearchContainer = (props) => {

  const inputProps = {
    value: props.searchAddress,
    onChange: props.onChangeAddress,
  }

  const cssClasses = {
    root: 'autocomplete-group',
    input: 'autocomplete-input',
    autocompleteContainer: 'autocomplete-container',
    googleLogoImage: 'google-logo-image',
    googleLogoContainer: 'google-logo-container',
    autoCompleteItem: 'autocomplete-item'
  }

  return (
    <div className="search-container">
      <div className="search-form">
        <div className="form-section">
          <label className="section-label">Place</label>
          <div className="search-child">
            <PlacesAutocomplete
              inputProps={inputProps}
              classNames={cssClasses}
            />
          </div>
        </div>
        <div className="form-section">
          <label className="section-label">From:</label>
          <div className="search-child">
            <input type="date" ref={ref => props.getSearchRef('startDateInput', ref)} defaultValue="2017-12-10"/>
          </div>
          <label className="section-label">To:</label>
          <div className="search-child">
            <input type="date" ref={ref => props.getSearchRef('endDateInput', ref)} defaultValue="2017-12-20"/>
          </div>
        </div>
        <div className="form-section">
          <label className="section-label">Category:</label>
          <div className="search-child">
            <select ref={ref => props.getSearchRef('selectedCategory', ref)} defaultValue="sports">
              {props.ticketmasterParameters.category.map(category => <option key={category}>{category}</option>)}
            </select>
          </div>
        </div>
        <div className="form-section">
          <label className="section-label">Radius</label>
          <div className="search-child">
            <select ref={ref => props.getSearchRef('selectedRadius', ref)} defaultValue="25">
              {props.ticketmasterParameters.radius.map(radius => <option key={radius}>{radius}</option>)}
            </select>
          </div>
          <label className="section-label">Unit</label>
          <div className="search-child">
            <select ref={ref => props.getSearchRef('selectedUnit', ref)}>
              {props.ticketmasterParameters.unit.map(unit => <option key={unit}>{unit}</option>)}
            </select>
          </div>
        </div>
        <div className="search-button-container">
          <div className="search-button" onClick={props.onSubmitClick}>Search Events</div>
        </div>
      </div>
    </div>
  )
}

export default SearchContainer
