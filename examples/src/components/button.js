import React from 'react'

export const Button = ({children, ...props}) => <a className="waves-effect waves-light btn-large" {...props}>{children}</a>
