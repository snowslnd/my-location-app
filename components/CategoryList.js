'use client'
import React, { useEffect, useState } from 'react'
import CategoryListData from '../shared/Data.js'
import CategoryItem from './CategoryItem.js';


const CategoryList = ({setSelectedCategory}) => {
    const [category,setCategory]=useState([]);

    useEffect(()=>{
        setCategory(CategoryListData)
    },[])

  return (
    <div>
      <h2 className='text-[20px] mt-3 font-bold mb-3'>Select Your Favourite Category</h2>
      <div className='flex gap-6 mb-5'>
      {category && category.map((item) => (
            <div key={item.id} onClick={()=>setSelectedCategory(item.value)} >
               <CategoryItem category={item}/>
            </div>
        ))}
      </div>
    </div>
  )
}

export default CategoryList
