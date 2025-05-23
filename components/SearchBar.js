import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext } from 'react'
import { BusinessListContext } from '../context/BusinessListContext';
import { UserLocationContext } from '../context/UserLocationContext';
import GlobalApi from '../services/GlobalApi';

const SearchBar = () => {
  const {userLocation,setUserLocation} = useContext(UserLocationContext);
  const {businessList,setBusinessList} = useContext(BusinessListContext);

  const searchPlace = (searchtext) => {
   // If search text is empty, fetch default "market" data
    if (!searchtext.trim()) {
      GlobalApi.getNearbyPlace("market", userLocation?.latitude, userLocation?.longitude)
        .then(res => {
          setBusinessList(res.data.places || []);
        })
        .catch(err => {
          console.error(err);
          setBusinessList([]);
        });
      return;
    }
    // If search text is not empty, fetch search results
  GlobalApi.searchPlace(searchtext, userLocation?.latitude, userLocation?.longitude).then(res => {
    const normalized = res.data.results.map(result => ({
      displayName: { text: result.name },
      formattedAddress: result.formatted_address,
      rating: result.rating,
      photos: result.photos?.map(photo => ({
        name: `photo?maxwidth=400&photoreference=${photo.photo_reference}`
      })) || [],
       location: result.geometry?.location ? {
        latitude: result.geometry.location.lat,
        longitude: result.geometry.location.lng
      } : null
    }));
    setBusinessList(normalized);
  });
};

  return (
    <div className='flex gap-3 bg-purple-100 p-3 rounded-xl'>
      <FontAwesomeIcon icon={faMagnifyingGlass} className='w-10 h-10 text-purple-400 p-2 cursor-pointer rounded-lg' />    
      <input type='text' placeholder='Search' 
      onKeyDown={(e)=>{
        if(e.key==='Enter'){
          searchPlace(e.target.value);  
        }
      }}
      className='bg-transparent w-full outline-none text-[17px] placeholder-purple-400'/>
    </div>
  )
}

export default SearchBar
