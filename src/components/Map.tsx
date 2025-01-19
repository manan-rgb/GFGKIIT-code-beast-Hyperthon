import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { MapPin, Clock, Phone } from 'lucide-react';
import type { Location } from '../types';

const DEFAULT_CENTER: [number, number] = [40.7128, -74.0060];
const DEFAULT_ZOOM = 13;

export default function Map() {
  const [locations] = useState<Location[]>([
    {
      id: '1',
      name: "St. Mary's Food Bank",
      type: 'foodbank',
      address: '123 Main St',
      coordinates: [40.7128, -74.0060],
      contactDetails: '+1 (555) 123-4567',
      operatingHours: 'Mon-Fri: 9AM-5PM',
      urgentNeeds: ['Canned goods', 'Fresh produce']
    }
  ]);

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-2xl font-semibold text-gray-800">Nearby Donation Locations</h2>
      </div>
      
      <div className="h-[600px] relative">
        <MapContainer
          center={DEFAULT_CENTER}
          zoom={DEFAULT_ZOOM}
          className="h-full w-full"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          
          {locations.map((location) => (
            <Marker 
              key={location.id} 
              position={location.coordinates}
            >
              <Popup>
                <div className="p-2">
                  <h3 className="font-semibold text-lg mb-2">{location.name}</h3>
                  <div className="space-y-2 text-sm">
                    <p className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2 text-gray-600" />
                      {location.address}
                    </p>
                    <p className="flex items-center">
                      <Clock className="w-4 h-4 mr-2 text-gray-600" />
                      {location.operatingHours}
                    </p>
                    <p className="flex items-center">
                      <Phone className="w-4 h-4 mr-2 text-gray-600" />
                      {location.contactDetails}
                    </p>
                    
                    {location.urgentNeeds && (
                      <div className="mt-3">
                        <h4 className="font-semibold mb-1">Urgent Needs:</h4>
                        <ul className="list-disc list-inside">
                          {location.urgentNeeds.map((need, index) => (
                            <li key={index}>{need}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}