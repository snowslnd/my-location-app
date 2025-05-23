import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'

const BusinessItem = ({business}) => {

  const photoUrl = business.photos && business.photos.length > 0 
    ? `https://places.googleapis.com/v1/${business.photos[0].name}/media?key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}&maxHeightPx=200&maxWidthPx=200`
    : '/default_business_image.jpg'; 

  return (
    <div className='flex gap-3 p-3 border-b-[1px] border-purple-300 mb-4 items-center'>
      <img 
        src={photoUrl}
        alt={business.displayName?.text || 'Business image'}
        className="rounded-xl object-cover h-[100px] w-[100px] aspect-square"
      />
      <div>
        <h2 className='text-[20px] font-semibold'>{business.displayName?.text || 'Unknown Business'}</h2>
        <h2 className='text-[15px] text-gray-500'>{business.formattedAddress || 'Address not available'}</h2>
        <div className='flex gap-2 items-center'>
            {business.rating ? (
              <>
                <FontAwesomeIcon icon={faStar} className='w-5 h-5 text-yellow-500'/>
                <h2>{business.rating}</h2>
              </>
            ) : (
              <div className='flex gap-2 items-center'>
                <FontAwesomeIcon icon={faMapMarkerAlt} className='w-5 h-5 text-gray-500'/>
                <h2 className='text-gray-500'>No rating available</h2>
              </div>
            )}
        </div>       
      </div>
    </div>
  )
}

export default BusinessItem
