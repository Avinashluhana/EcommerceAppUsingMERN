import React from 'react'
import { Outlet } from 'react-router-dom';
import { Elements } from "@stripe/react-stripe-js";


const ElementRoute = ({stripe}) => {

  <Elements stripe={stripe}>
    <Outlet />
  </Elements>
}

export default ElementRoute