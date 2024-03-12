import React, { useState } from 'react';

const MarkerSelector = () => {
  const [selectedMarker, setSelectedMarker] = useState('');

//   const handleMarkerSelect = (markerType) => {
//     setSelectedMarker(markerType);
//   };
  const handleMarkerChange = (event) => {
    setSelectedMarker(event.target.value);
  };

  return (
    <div className="flex  flex-col items-center justify-center content-center p-2" >
     <label className="flex justify-center space-x-2">
        <input
          type="radio"
          value="IncludeMarkers"
          checked={selectedMarker === 'IncludeMarkers'}
          onChange={handleMarkerChange}
        //   className="form-radio text-blue-500 focus:ring-blue-500"
        />
        <span className="text-gray-800">Include Markers</span>
      </label>
      <label className="flex justify-center space-x-2">
        <input
          type="radio"
          value="ExcludeMarker"
          checked={selectedMarker === 'ExcludeMarker'}
          onChange={handleMarkerChange}
        //   className="form-radio text-pink-500 focus:ring-pink-500"
        />
        <span className="text-gray-800">Exclude Markers</span>
      </label>   
    </div>
  );
};

export default MarkerSelector;
