'use client'
import { faArrowRight, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { use, useContext, useEffect, useState } from 'react'
import BusinessItem from './BusinessItem'
import ShimmerEffectItem from './ShimmerEffectItem'
import { SelectedBusinessContext } from '../context/SelectedBusinessContext'

const BusinessList = ({businessListData}) => {

  const [count,setCount]=useState(0);
  const [loader,setLoader]=useState(true);
  const {selectedBusiness,setSelectedBusiness}=useContext(SelectedBusinessContext);

  useEffect(()=>{
    setLoader(true);
    setCount(0);
   const timer = setTimeout(() => {
      setLoader(false);
    }, 1000);
    return () => clearTimeout(timer);
  },[businessListData])

  return (
    <div>
      <h2 className='text-[20px] mt-3 font-bold mb-3 flex items-center justify-between gap-2'>Top Near By Places
        <span className='flex gap-2'>
          {count>0? 
            <FontAwesomeIcon icon={faChevronLeft}  
            onClick={()=>setCount(count-3)}
            className='w-9 h-9 text-purple-400 p-2 cursor-pointer rounded-lg hover:bg-purple-100'/>
          :null}
            <FontAwesomeIcon 
            onClick={()=>{
              if (count + 3 >= businessListData.length) {
                setCount(0);
              } else {
                setCount(count + 3);
              }
            }}
            icon={faChevronRight}  className='w-9 h-9 text-purple-400 p-2 cursor-pointer rounded-lg hover:bg-purple-100'/>      
            </span> 
      </h2>
      {/* Business Item */}
      {
        !loader && businessListData.length>0?
        <div>
        {businessListData.map((data, index) => 
          index>=count && index<count+3 && (
          <div key={index} className='cursor-pointer hover:scale-105 transition-all duration-200'
          onClick={()=>setSelectedBusiness(data)}
          >
            <BusinessItem business={data}/>
          </div>
        ))}
      </div>:null}
      { loader?      
          [1,2,3].map((item,index)=>(
            <ShimmerEffectItem key={index}/>
          )) : null
      }
      
    </div>
  )
}

export default BusinessList
