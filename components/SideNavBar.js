import React from 'react'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

const SideNavBar = () => {
    const menu=[
        {
            id:1,
            name:"Search",
            icon: faMagnifyingGlass
        },
        {
            id:2,
            name:"Fav",
            icon: faHeart
        }
    ]
  return (
    <div className='p-2 items-center flex flex-col w-[100px] space-y-4 shadow-md shadow-purple-400
    sticky-top-0 bg-white z-20'> 
      <Image src="/logo.png" alt="logo" width={50} height={50}/>
      {
        menu.map((item)=>(
            <div key={item.id} className='flex items-center gap-2'>
                <FontAwesomeIcon icon={item.icon}  className="w-10 h-10 hover:text-purple-500 hover:bg-purple-100 p-2 cursor-pointer rounded-lg"  />
            </div>
        ))
      }
    </div>
  )
}

export default SideNavBar
