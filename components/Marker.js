import { InfoBox, MarkerF } from '@react-google-maps/api'
import React from 'react'

// Don't use context here - accept businessList as a prop instead
const Marker = ({ position, businessList }) => {
  return (
    <>
      {businessList && businessList.map((business, index) => 
        index <= 5 && business.location && (
          <MarkerF 
            key={index}
            position={{
              lat: business.location.latitude,
              lng: business.location.longitude
            }}
            icon={{
              url: '/location-pin.png',
              scaledSize: new window.google.maps.Size(50, 50)
            }}
          >
            <InfoBox
              position={{
                lat: business.location.latitude,
                lng: business.location.longitude
              }}
            >
              <div style={{
                backgroundColor: '#F3E8FF',
                opacity: '1',
                padding: '12px'
              }}>
                <p style={{
                  fontSize: '10px',
                  fontWeight: 'bold',
                  color: '#088F8F'
                }}>{business.name || business.displayName?.text}</p>
              </div>
            </InfoBox>
          </MarkerF>
        )
      )}
      
      {position && (
        <MarkerF 
          position={position}
          icon={{
            url: '/user-location.png',
            scaledSize: new window.google.maps.Size(50, 50)
          }} 
        />
      )}
    </>
  )
}

export default Marker
