import { getAllDetails } from "@/store/quoteSlice";
import React, { useEffect, useRef, useState } from "react";

const apiKey = process.env.NEXT_PUBLIC_GMAP_API_KEY;
const mapApiJs = "https://maps.googleapis.com/maps/api/js";
const geocodeJson = "https://maps.googleapis.com/maps/api/geocode/json";
import { useDispatch, useSelector } from "react-redux";

// load google map api js

function loadAsyncScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    Object.assign(script, {
      type: "text/javascript",
      async: true,
      src,
    });
    script.addEventListener("load", () => resolve(script));
    document.head.appendChild(script);
  });
}

const extractAddress = (place) => {
  const address = {
    city: "",
    state: "",
    zip: "",
    country: "",
    plain() {
      const city = this.city ? this.city + ", " : "";
      const zip = this.zip ? this.zip + ", " : "";
      const state = this.state ? this.state + ", " : "";
      return city + zip + state + this.country;
    },
  };

  if (!Array.isArray(place?.address_components)) {
    return address;
  }

  place.address_components.forEach((component) => {
    const types = component.types;
    const value = component.long_name;

    if (types.includes("locality")) {
      address.city = value;
    }

    if (types.includes("administrative_area_level_2")) {
      address.state = value;
    }

    if (types.includes("postal_code")) {
      address.zip = value;
    }

    if (types.includes("country")) {
      address.country = value;
    }
  });

  return address;
};

async function getPostalCode(fullAddress) {
  try {
    // Encode the address to be included in the API request
    const encodedAddress = encodeURIComponent(fullAddress);

    // Construct the Geocoding API request URL
    const geocodeUrl = `${geocodeJson}?address=${encodedAddress}&key=${apiKey}`;

    // Fetch the Geocoding API response
    const response = await fetch(geocodeUrl);
    const data = await response.json();

    // Check if the response status is OK
    if (data.status === 'OK') {
      // Extract the postal code from the first result
      const postalCode = data.results[0]?.address_components.find(
        (component) => component.types.includes('postal_code')
      )?.long_name;

      return postalCode;
    } else {
      console.error('Geocoding API request failed:', data.status);
      return null;
    }
  } catch (error) {
    console.error('Error during Geocoding API request:', error);
    return null;
  }
}

const GoogleSearchInput = ({
  setAddress,
  addressDetails,
  setAddressDetails,
  styles,
  placeholder,
  defaultValue,
  errorCheck,
}) => {
  const searchInput = useRef(null);

  // init gmap script
  const initMapScript = () => {
    // if script already loaded
    if (window.google) {
      return Promise.resolve();
    }
    const src = `${mapApiJs}?key=${apiKey}&libraries=places&v=weekly`;
    return loadAsyncScript(src);
  };

  // do something on address change
  const onChangeAddress = (autocomplete) => {
    const place = autocomplete.getPlace();
    setAddressDetails(extractAddress(place));
    // console.log(place)
  };

  // init autocomplete
  const initAutocomplete = () => {
    if (!searchInput.current) return;

    const autocomplete = new window.google.maps.places.Autocomplete(
      searchInput.current
    );
    autocomplete.setFields(["address_component", "geometry"]);
    autocomplete.addListener("place_changed", () =>
      onChangeAddress(autocomplete)
    );
    setAddress(searchInput.current.value);
  };





  useEffect(() => {
    initMapScript().then(() => initAutocomplete());
  });

  return (
    <input
      ref={searchInput}
      type='text'
      placeholder={placeholder}
      className={`${
        errorCheck ? "ring-secondary ring" : ""
      } ${styles} placeholder:text-[15px] placeholder:text-gray-900/60 text-[14px] border-primary border rounded-[10px] outline-none focus:border-[2px] active:border-[2px]`}
      onChange={() => setAddress(searchInput.current.value)}
      defaultValue={defaultValue}
    />
  );
};

export default GoogleSearchInput;
