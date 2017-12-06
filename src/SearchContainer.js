import React from 'react'
import AddressInput from './AddressInput'

const SearchContainer = (props) => {
  return (
    <div className="search-container">
      <AddressInput
        searchAddress={props.searchAddress}
        onChangeAddress={props.onChangeAddress}
      />
      <div><input type="date" ref={ref => props.getSearchRef('startDateInput', ref)} defaultValue="2017-12-10"/></div>
      <div><input type="date" ref={ref => props.getSearchRef('endDateInput', ref)} defaultValue="2017-12-20"/></div>
      <div>
        <select ref={ref => props.getSearchRef('selectedCategory', ref)} defaultValue="sports">
          {props.ticketmasterParameters.category.map(category => <option key={category}>{category}</option>)}
        </select>
      </div>
      <div>
        <select ref={ref => props.getSearchRef('selectedRadius', ref)} defaultValue="25">
          {props.ticketmasterParameters.radius.map(radius => <option key={radius}>{radius}</option>)}
        </select>
      </div>
      <div>
      <select ref={ref => props.getSearchRef('selectedUnit', ref)}>
        {props.ticketmasterParameters.unit.map(unit => <option key={unit}>{unit}</option>)}
      </select>
      </div>
      <div><button onClick={props.onSubmitClick}>Submit</button></div>
    </div>
  )
}

export default SearchContainer
