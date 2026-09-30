import React, { useState, useEffect } from 'react'
import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

// Reasonable default center (New Delhi) used until the browser reports a position
const defaultCenter = [28.6139, 77.2090]

// Fix Leaflet's default marker icon paths (react-leaflet v4 needs this)
L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow
})

const LiveTracking = () => {
    const [currentPosition, setCurrentPosition] = useState(defaultCenter)

    useEffect(() => {
        if (!navigator.geolocation) return

        navigator.geolocation.getCurrentPosition((pos) => {
            const { latitude, longitude } = pos.coords
            setCurrentPosition([latitude, longitude])
        })

        const watchId = navigator.geolocation.watchPosition((pos) => {
            const { latitude, longitude } = pos.coords
            setCurrentPosition([latitude, longitude])
        })

        return () => navigator.geolocation.clearWatch(watchId)
    }, [])

    return (
        <MapContainer
            center={currentPosition}
            zoom={13}
            style={{ width: '100%', height: '100%' }}
            scrollWheelZoom={true}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={currentPosition} />
        </MapContainer>
    )
}

export default LiveTracking