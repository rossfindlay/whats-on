import React, { Component } from 'react'
import PlacesAutocomplete from 'react-places-autocomplete'

const AddressInput = (props) => {
  const inputProps = {
    value: props.searchAddress,
    onChange: props.onChangeAddress,
  }

  const cssClasses = {
    root: 'form-group',
    input: 'form-control',
    autocompleteContainer: 'my-autocomplete-container'
  }

  return (
    <PlacesAutocomplete
      inputProps={inputProps}
      className={cssClasses}
    />
  )
}

export default AddressInput
