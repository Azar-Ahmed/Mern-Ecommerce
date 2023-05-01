import React, {useEffect, useState} from "react";
import NewArrivals from '../components/home/NewArrivals'
import BestSellers from '../components/home/BestSellers'

function Home() {
  return (
    <>
    <NewArrivals />
    <BestSellers />
    <br />
    </>
  )
}

export default Home