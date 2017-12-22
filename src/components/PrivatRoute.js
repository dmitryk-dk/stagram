import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {observer} from 'mobx-react';

const PrivateRoute = ({ component: Component, ...rest, authed }) => (
    <Route {...rest} render={props => (
      authed ? (
        <Component {...props}/>
      ) : (
        <Redirect to={{
          pathname: '/login',
          state: { from: props.location }
        }}/>
      )
    )}/>
  )

export default observer(PrivateRoute)
