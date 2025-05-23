import React from 'react'
import Image from 'next/image'

const CategoryItem = ({category}) => {
  return (
    <div className='flex flex-col items-center gap-2 bg-purple-100 p-3 rounded-2xl
    hover:scale-115 transition-all duration-200 cursor-pointer'>
      <Image src={category.icon} alt={category.name} width={35} height={35} />
      <h2 className='text-[12px] text-purple-700'>{category.name}</h2>
    </div>
  )
}

export default CategoryItem
