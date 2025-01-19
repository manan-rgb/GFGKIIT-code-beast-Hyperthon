'use client'

import { useState } from 'react'
import ReactMapGL, { Marker, Popup } from 'react-map-gl'
import { useLanguage } from '../contexts/LanguageContext'

type Location = {
  id: number
  name: string
  type: 'shelter' | 'foodbank'
  latitude: number
  longitude: number
  contact: string
  hours: string
}

const DUMMY_LOCATIONS: Location[] = [
  { id: 1, name: 'City Shelter', type: 'shelter', latitude: 40.7128, longitude: -74.0060, contact: '123-456-7890', hours: '9AM - 5PM' },
  { id: 2, name: 'Downtown Foodbank', type: 'foodbank', latitude: 40.7300, longitude: -73.9950, contact: '098-765-4321', hours: '10AM - 6PM' },
  // Add more dummy locations as needed
]

const Map = () => {
  const { t } = useLanguage()
  const [viewport, setViewport] = useState({
    latitude: 40.7128,
    longitude: -74.0060,
    zoom: 12
  })
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null)

  return (
    <ReactMapGL
      {...viewport}
      width="100%"
      height="600px"
      onViewportChange={(nextViewport: any) => setViewport(nextViewport)}
      mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
    >
      {DUMMY_LOCATIONS.map((location) => (
        <Marker
          key={location.id}
          latitude={location.latitude}
          longitude={location.longitude}
        >
          <button
            className="text-2xl"
            onClick={() => setSelectedLocation(location)}
          >
            {location.type === 'shelter' ? '🏠' : '🍎'}
          </button>
        </Marker>
      ))}

      {selectedLocation && (
        <Popup
          latitude={selectedLocation.latitude}
          longitude={selectedLocation.longitude}
          onClose={() => setSelectedLocation(null)}
        >
          <div>
            <h2 className="font-bold">{selectedLocation.name}</h2>
            <p>{t('Type')}: {t(selectedLocation.type)}</p>
            <p>{t('Contact')}: {selectedLocation.contact}</p>
            <p>{t('Hours')}: {selectedLocation.hours}</p>
          </div>
        </Popup>
      )}
    </ReactMapGL>
  )
}

export default Map

