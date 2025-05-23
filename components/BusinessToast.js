import React, { useContext, useEffect, useState } from 'react'
import Image from 'next/image'
import { SelectedBusinessContext } from '../context/SelectedBusinessContext';

const BusinessToast = ({userLocation}) => {
    const {selectedBusiness}=useContext(SelectedBusinessContext);
    const [distance,setDistance]=useState();

    useEffect(()=>{
        if(selectedBusiness.location){
            const distance = calculateDistance(
                userLocation.latitude,
                userLocation.longitude,
                selectedBusiness.location.latitude,
                selectedBusiness.location.longitude
            );
        }
    },[selectedBusiness])
     
    const calculateDistance = (lat1, lon1, lat2, lon2) => {
        const R = 6371; // Radius of the Earth in kilometers
        const dLat = (lat2 - lat1) * (Math.PI / 180);
        const dLon = (lon2 - lon1) * (Math.PI / 180);
        const a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(lat1 * (Math.PI / 180)) *
            Math.cos(lat2 * (Math.PI / 180)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c;
        setDistance(distance.toFixed(2));
        return distance;
      }; 

    const onDirectionClick=()=>{
        window.open('https://www.google.com/maps/dir/?api=1&destination='+selectedBusiness.location.latitude+','+selectedBusiness.location.longitude);
    }
  return (
    <>
    {
        selectedBusiness.location?  
        <div className='fixed bottom-5 right-5 z-30 flex items-center bg-purple-400 p-5
        rounded-2xl gap-5'>
            <div>
                <h2 className='font-semibold text-[20px] text-white'>{selectedBusiness.displayName?.text}</h2>
                <p className='text-white'>{distance} Miles Away</p>
            </div>
            <div className='bg-purple-200 p-5 rounded-xl hover:scale-105 transition-all duration-200 cursor-pointer'
            onClick={()=>onDirectionClick()} >
                
                <Image src="/send.png" alt="nav-logo" width={20} height={20}/>  
            </div>
        </div>
        :null}
    </>
    
  )
}

export default BusinessToast
