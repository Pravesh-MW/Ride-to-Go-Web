import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

// Replace this with your own Google Maps API key
const googleMapsApiKey = "AIzaSyAOVYRIgupAurZup5y1PRh8Ismb1A3lLao";

const containerStyle = {
  width: "100%",
  height: "400px",
};

// const MyMapComponent = () => {
//   const [markerPosition, setMarkerPosition] = useState(null);
//   const [userLocation, setUserLocation] = useState(null);
//   const [nearbyLandmark, setNearbyLandmark] = useState(null);

//   useEffect(() => {
//     // Get the user's current location
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition((position) => {
//         const { latitude, longitude } = position.coords;
//         setUserLocation({ lat: latitude, lng: longitude });
//       });
//     }
//   }, []);

//   const handleMarkerClick = async (event) => {
//     const lat = event.latLng.lat();
//     const lng = event.latLng.lng();
//     setMarkerPosition({ lat, lng });

//     console.log(`Marker clicked at latitude: ${lat}, longitude: ${lng}`);

//     // Fetch nearby landmarks from Google Places API
//     const service = new window.google.maps.places.PlacesService(
//       document.createElement("div")
//     );
//     const request = {
//       location: new window.google.maps.LatLng(lat, lng),
//       radius: 1000, // Search within 1 km radius
//       type: ["point_of_interest"],
//     };

//     service.nearbySearch(request, (results, status) => {
//       if (
//         status === window.google.maps.places.PlacesServiceStatus.OK &&
//         results.length > 0
//       ) {
//         setNearbyLandmark(results[0].name);
//         console.log(`Nearby landmark: ${results[0].name}`);
//       } else {
//         setNearbyLandmark("No nearby landmarks found.");
//         console.log("No nearby landmarks found.");
//       }
//     });
//   };

//   return (
//     <>
//       <MapComponent />
//       <LoadScript googleMapsApiKey={googleMapsApiKey} libraries={["places"]}>
//         <GoogleMap
//           mapContainerStyle={containerStyle}
//           center={userLocation || { lat: 37.7749, lng: -122.4194 }}
//           zoom={10}
//         >
//           {/* If there is a marker position, show it, otherwise use the center */}
//           <Marker
//             position={
//               markerPosition || userLocation || { lat: 37.7749, lng: -122.4194 }
//             }
//             onClick={handleMarkerClick}
//           />
//         </GoogleMap>

//         {/* Display nearby landmark */}
//         {nearbyLandmark && <div>Nearby Landmark: {nearbyLandmark}</div>}
//       </LoadScript>
//     </>
//   );
// };

// export default MyMapComponent;

const MyMapComponent = ({setPlace}) => {
  const [userLocation, setUserLocation] = useState(null); // User's location state
  const [markerPosition, setMarkerPosition] = useState(null); // Marker position state
  const [placeDetails, setPlaceDetails] = useState(null); // Place details state

  useEffect(()=>{
    setPlace(placeDetails, markerPosition)
  }, [placeDetails, markerPosition])
  // Get the user's current location using geolocation
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ lat: latitude, lng: longitude });
      });
    }
  }, []);

  // Function to handle click events on the map
  const handleMapClick = async (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    setMarkerPosition({ lat, lng });

    console.log(`Clicked position: Latitude: ${lat}, Longitude: ${lng}`);

    // Fetch place details using OpenCage Geocoder API
    const apiKey = "7708e7b2f7a94bd28aa729c024168814"; // Replace with your OpenCage API key
    const response = await fetch(
      `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=${apiKey}`
    );
    const data = await response.json();

    if (data.results.length > 0) {
      const place = data.results[0];
      setPlaceDetails(place.formatted); // Set the formatted address as place details
      console.log("Place Details:", place.formatted);
    } else {
      setPlaceDetails("No place found for these coordinates.");
      console.log("No place found for these coordinates.");
    }
  };

  return (
    <>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={userLocation || { lat: 37.7749, lng: -122.4194 }} // Default to San Francisco if no location
        zoom={12}
        onClick={handleMapClick}
      >
        {/* Display a marker at the clicked position */}
        {markerPosition && <Marker position={markerPosition} />}
      </GoogleMap>

      {/* Display place details */}
      {placeDetails && <div>Place Details: {placeDetails}</div>}
      </>
  );
};
export default MyMapComponent;