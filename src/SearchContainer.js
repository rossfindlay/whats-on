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
        <label className="section-label-one">Place</label>
        <div className="form-section">
          <div className="search-child-one">
            <PlacesAutocomplete
              inputProps={inputProps}
              classNames={cssClasses}
            />
          </div>
        </div>
        <div className="two-label-holder">
          <label className="section-label-two">From:</label>
          <label className="section-label-two">To:</label>
        </div>
        <div className="form-section">
          <div className="search-child-two">
            <input type="date" ref={ref => props.getSearchRef('startDateInput', ref)} defaultValue="2018-01-04" className="date-input"/>
          </div>
          <div className="search-child-two">
            <input type="date" ref={ref => props.getSearchRef('endDateInput', ref)} defaultValue="2018-01-30" className="date-input"/>
          </div>
        </div>
          <label className="section-label-one">Category:</label>
        <div className="form-section">
          <div className="search-child-one">
            <select ref={ref => props.getSearchRef('selectedCategory', ref)} defaultValue="Sports" className="category-input">
              {props.ticketmasterParameters.category.map(category => <option key={category}>{category}</option>)}
            </select>
          </div>
        </div>
        <div className="two-label-holder">
          <label className="section-label-two">Radius</label>
          <label className="section-label-two">Unit</label>
        </div>
        <div className="form-section">
          <div className="search-child-two">
            <select ref={ref => props.getSearchRef('selectedRadius', ref)} defaultValue="25" className="radius-input">
              {props.ticketmasterParameters.radius.map(radius => <option key={radius}>{radius}</option>)}
            </select>
          </div>
          <div className="search-child-two">
            <select ref={ref => props.getSearchRef('selectedUnit', ref)} className="unit-input">
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
