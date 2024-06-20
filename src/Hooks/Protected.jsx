import React from 'react'
import { Navigate } from 'react-router-dom'
import { retriveData } from '../Utils/Localstorage'
import Configuration from '../App/config'
function Protected({  children }) {
  
  if (!retriveData(Configuration.localStorageKey)) {
    return <Navigate to="/" replace={true} />
  }
  return children
}
export default Protected

{/* <><Navigate to="/" replace={true} />
<AlertDialog msg="Login to access the resource" show={true} type={'error'} />
</> */}