import React, { useState, useEffect, useRef } from "react";
import "./SearchLocationInput.css"; // Import your CSS file
import { Link } from "react-router-dom";
import { handlelatlong } from "app/store/userSlices/userSellingSlice";
import { useDispatch, useSelector } from "react-redux";
let autoComplete;

const REACT_APP_GOOGLE_MAPS_KEY = "AIzaSyCTBhLqcfyXie0ySVllnA7j54RloOBS5mk"; // Replace with your API key

const loadScript = (url, callback) => {
  let script = document.createElement("script");
  script.type = "text/javascript";

  if (script.readyState) {
    script.onreadystatechange = function () {
      if (script.readyState === "loaded" || script.readyState === "complete") {
        script.onreadystatechange = null;
        callback();
      }
    };
  } else {
    script.onload = () => callback();
  }

  script.src = url;
  document.getElementsByTagName("head")[0].appendChild(script);
};

const SearchLocationInput = ({ formik }) => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");
  const autoCompleteRef = useRef(null);
  const [selectedLocation, setSelectedLocation] = useState({
    lat: 28.7041,
    lng: 77.1025,
  });

  const handleScriptLoad = (updateQuery, autoCompleteRef) => {
    autoComplete = new window.google.maps.places.Autocomplete(
      autoCompleteRef.current,
      {
        types: ["(regions)"], // Restrict to regions (e.g., cities)
        componentRestrictions: { country: "IN" }, // Limit suggestions to India
      }
    );

    autoComplete.addListener("place_changed", () => {
      handlePlaceSelect(updateQuery);
    });
  };

  useEffect(() => {
    loadScript(
      `https://maps.googleapis.com/maps/api/js?key=${REACT_APP_GOOGLE_MAPS_KEY}&libraries=places`,
      () => handleScriptLoad(setQuery, autoCompleteRef)
    );
  }, []);

  const handlePlaceSelect = async (updateQuery) => {
    const addressObject = await autoComplete.getPlace();
    const query = addressObject.formatted_address;
    updateQuery(query);
    const latLng = {
      lat: addressObject?.geometry?.location?.lat(),
      lng: addressObject?.geometry?.location?.lng(),
      address: query,
    };
    formik.setFieldValue('address', latLng)
    // dispatch(handlelatlong(latLng));
    setSelectedLocation(latLng);

  };
  return (
    <div className="search-location-input">
      <input
        ref={autoCompleteRef}
        className="form-control"
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search Places ..."
        value={query}
      />
    </div>
  );
};

export default SearchLocationInput;
