import React, { Component } from 'react'
import menuStack from './images/menu-stack.png'
import searchOn from './images/search-on.png'
import searchOff from './images/search-off.png'


const Header = (props) => {
  return (
    <div className="header-container">
      <div className="logo-container">Logo</div>
      <img className="menu-stack" src={menuStack} />
      {props.ticketmasterSearchResults ? <div><img className="search-toggle" onClick={props.toggleSearch} src={props.showSearchContainer ? searchOn : searchOff}/></div> : null}
    </div>
  )

}

export default Header;
