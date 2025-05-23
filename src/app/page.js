'use client'
import SideNavBar from "../../components/SideNavBar";
import SearchBar from "../../components/SearchBar";
import CategoryList from "../../components/CategoryList";
import BusinessList from "../../components/BusinessList";
import GlobalApi from "../../services/GlobalApi";
import { useEffect, useState } from "react";
import { UserLocationContext } from "../../context/UserLocationContext";
import GoogleMap from "../../components/GoogleMap";
import { BusinessListContext } from "../../context/BusinessListContext";
import { SelectedBusinessContext } from "../../context/SelectedBusinessContext";
import BusinessToast from "../../components/BusinessToast";

export default function Home() {

  const [businessListData, setBusinessListData] = useState([]);
  const [selectedBusiness, setSelectedBusiness] = useState({});
  const [userLocation, setUserLocation] = useState([null]);
  
  const getUserLocation=()=>{
   navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
      },
      (error) => {
        console.error('Error getting location:', error);
      },
      {
        enableHighAccuracy: true, 
        timeout: 10000,
        maximumAge: 0
      }
    );
  }
  useEffect(()=>{
    getUserLocation();
  },[])

useEffect(() => {
  if (userLocation?.latitude && userLocation?.longitude) {
    getNearbyPlace("market");
  }
}, [userLocation]);

  const getNearbyPlace=(category)=>{
    // Try with user location first
    GlobalApi.getNearbyPlace(category, userLocation?.latitude, userLocation?.longitude)
    .then(res=>{
      // If no results, try with default location
      if (!res.data.places || res.data.places.length === 0) {
        return GlobalApi.getNearbyPlace(category, 40.7128, -74.0060); // NYC coordinates
      }
      return res;
    })
    .then(res=>{
      setBusinessListData(res.data.places || []); 
    })
    .catch(err => {
      console.error(err);
      setBusinessListData([]);
    });
  }

  return (
   <UserLocationContext.Provider value={{ userLocation, setUserLocation }}>
     <BusinessListContext.Provider value={{businessList:businessListData, setBusinessList:setBusinessListData}}>
     <div className="flex">   
      <SelectedBusinessContext.Provider value={{selectedBusiness, setSelectedBusiness}}>
        <SideNavBar/>
        <div className="grid grid-cols-1 md:grid-cols-2 px-6 md:px-10 w-full mt-10">
            <div className="pr-0 md:pr-3" >
               <SearchBar/>
              {/* Category List */}
               <CategoryList setSelectedCategory={(category)=>getNearbyPlace(category)} />
              {/* Business List */}
               <BusinessList businessListData={businessListData}/>
            </div>
          {/* Google Map */}
            <div>
              <GoogleMap businessList={businessListData}/>
              <BusinessToast userLocation={userLocation}/>
            </div>
        </div>
        </SelectedBusinessContext.Provider>        
      </div>
      </BusinessListContext.Provider>
    </UserLocationContext.Provider>
  );
}
