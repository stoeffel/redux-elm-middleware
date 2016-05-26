import React from 'react'
import { connect } from 'react-redux'

export const TickTock = connect(
    ({elm}) => ({ tickTock: elm.tickTock })
  )
  (function({tickTock}) {
    return (
      <div>
        <h1>{tickTock}</h1>
        <span>ticks every 5 sec</span>
      </div>
    );
});

