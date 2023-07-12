import React, { useEffect, useRef, useState } from 'react';

// const apiKey = process.env.NEXT_PUBLIC_GMAP_API_KEY;
const mapApiJs = 'https://maps.googleapis.com/maps/api/js';
const geocodeJson = 'https://maps.googleapis.com/maps/api/geocode/json';

function loadAsyncScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    Object.assign(script, {
      type: 'text/javascript',
      async: true,
      src,
    });
    script.addEventListener('load', () => resolve(script));
    document.head.appendChild(script);
  });
}

const extractAddress = (place) => {
  const address = {
    city: '',
    state: '',
    zip: '',
    country: '',
    plain() {
      const city = this.city ? this.city + ', ' : '';
      const zip = this.zip ? this.zip + ', ' : '';
      const state = this.state ? this.state + ', ' : '';
      return city + zip + state + this.country;
    },
  };

  if (!Array.isArray(place?.address_components)) {
    return address;
  }

  place.address_components.forEach((component) => {
    const types = component.types;
    const value = component.long_name;

    if (types.includes('locality')) {
      address.city = value;
    }

    if (types.includes('administrative_area_level_2')) {
      address.state = value;
    }

    if (types.includes('postal_code')) {
      address.zip = value;
    }

    if (types.includes('country')) {
      address.country = value;
    }
  });

  return address;
};

const useGoogleSearch = () => {
    // const searchInput = useRef(null)
  return {
    mapApiJs,
    geocodeJson,
    loadAsyncScript,
    extractAddress,
  };
};

export default useGoogleSearch;
