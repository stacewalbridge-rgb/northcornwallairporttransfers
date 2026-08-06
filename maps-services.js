const config = window.ROBS_TRAVEL_CONFIG || {};
let readyPromise = null;
let map = null;
let directionsRenderer = null;

export const mapsState = { ready: false, error: null };

export function loadGoogleMaps() {
  if (readyPromise) return readyPromise;
  const key = config.googleMapsApiKey;
  if (!key) return Promise.resolve(false);
  readyPromise = new Promise((resolve) => {
    window.__robsTravelMapsReady = async () => {
      try {
        await google.maps.importLibrary('places');
        await google.maps.importLibrary('routes');
        await google.maps.importLibrary('geocoding');
        mapsState.ready = true;
        resolve(true);
      } catch (error) {
        mapsState.error = error;
        resolve(false);
      }
    };
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(key)}&loading=async&libraries=places&callback=__robsTravelMapsReady`;
    script.async = true;
    script.defer = true;
    script.onerror = () => { mapsState.error = new Error('Google Maps failed to load'); resolve(false); };
    document.head.appendChild(script);
  });
  return readyPromise;
}

export async function attachAutocomplete(input) {
  if (!(await loadGoogleMaps())) return;
  const autocomplete = new google.maps.places.Autocomplete(input, {
    componentRestrictions: { country: 'gb' },
    fields: ['formatted_address', 'geometry', 'name'],
    types: ['geocode', 'establishment']
  });
  autocomplete.addListener('place_changed', () => {
    const place = autocomplete.getPlace();
    if (!place.geometry?.location) return;
    input.value = place.formatted_address || place.name || input.value;
    input.dataset.lat = place.geometry.location.lat();
    input.dataset.lng = place.geometry.location.lng();
  });
}

export async function reverseGeocode(latitude, longitude) {
  if (!(await loadGoogleMaps())) return null;
  const geocoder = new google.maps.Geocoder();
  const response = await geocoder.geocode({ location: { lat: latitude, lng: longitude } });
  return response.results?.[0]?.formatted_address || null;
}

export async function calculateRoute(origin, destination, waypoints = []) {
  if (!(await loadGoogleMaps())) return null;
  const directions = new google.maps.DirectionsService();
  const result = await directions.route({
    origin,
    destination,
    waypoints: waypoints.filter(Boolean).map(location => ({ location, stopover: true })),
    travelMode: google.maps.TravelMode.DRIVING,
    unitSystem: google.maps.UnitSystem.IMPERIAL,
    provideRouteAlternatives: false
  });
  const route = result.routes?.[0];
  if (!route) return null;
  const metres = route.legs.reduce((sum, leg) => sum + (leg.distance?.value || 0), 0);
  const seconds = route.legs.reduce((sum, leg) => sum + (leg.duration?.value || 0), 0);
  return { result, miles: metres / 1609.344, minutes: Math.ceil(seconds / 60) };
}

export async function showRouteMap(element, directionsResult) {
  if (!(await loadGoogleMaps()) || !directionsResult) return;
  if (!map) map = new google.maps.Map(element, { zoom: 11, center: { lat: 50.827, lng: -4.545 }, disableDefaultUI: true, zoomControl: true });
  if (!directionsRenderer) directionsRenderer = new google.maps.DirectionsRenderer({ map, suppressMarkers: false });
  directionsRenderer.setDirections(directionsResult);
}
