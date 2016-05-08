import React from 'react'
import { Link } from 'react-router'

export const Layout = ({children}) => {
    return (
      <div>
        <nav>
          <div className="nav-wrapper">
            <a href="#" className="brand-logo">Redux-Elm-Middleware</a>
            <ul id="nav-mobile" className="right">
              <li><Link to='/counter'>Counter</Link></li>
              <li><Link to='/ticktock'>TickTock</Link></li>
            </ul>
          </div>
        </nav>
        <div className="row">
          <div className="col s12 m6">
            <div className="card blue-grey darken-1">
              <div className="card-content white-text">
              {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};

