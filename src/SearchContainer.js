import React from 'react'

const SearchContainer = (props) => {
  return (
    <div className="search-container">
      <input type="text" ref={ref => props.getSearchRef('cityInput', ref)} defaultValue="Sydney"/>
      <input type="date" ref={ref => props.getSearchRef('startDateInput', ref)} defaultValue="2017-12-10"/>
      <input type="date" ref={ref => props.getSearchRef('endDateInput', ref)} defaultValue="2017-12-20"/>
      <select ref={ref => props.getSearchRef('selectedCategory', ref)} defaultValue="sports">
        {props.ticketmasterParameters.category.map(category => <option key={category}>{category}</option>)}
      </select>
      <select ref={ref => props.getSearchRef('selectedRadius', ref)} defaultValue="25">
        {props.ticketmasterParameters.radius.map(radius => <option key={radius}>{radius}</option>)}
      </select>
      <select ref={ref => props.getSearchRef('selectedUnit', ref)}>
        {props.ticketmasterParameters.unit.map(unit => <option key={unit}>{unit}</option>)}
      </select>
      <button onClick={props.onSubmitClick}>Submit</button>
    </div>
  )
}

export default SearchContainer
