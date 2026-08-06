# Rob's Travel Booking App

Git-based production project for the Rob's Travel customer booking app, driver view and owner dashboard.

## Current features

- Book Now and Book for Later
- Phone GPS pickup permission
- Airport quick destinations
- Passenger, vehicle and luggage options
- Guide fare estimator using configured Cornwall Council tariff values
- Rob's Travel fixed-price route matching
- Firebase Authentication and Firestore
- Owner and driver roles
- Driver online/offline and live-location structure
- Installable PWA
- Cloudflare Pages-compatible root structure

## Cloudflare deployment

This is a static project. In Cloudflare:

- Build command: leave blank
- Build output directory: `/` or `.` if Cloudflare asks
- Root directory: leave blank
- Production branch: `main`

The file `index.html` is at the repository root, preventing the 404 caused by uploading a nested folder.

## Firebase

The live project is configured for `robs-travel-taxis`. The Firebase web configuration is public by design; access is protected by Authentication and Firestore rules.

Publish the rules in `firebase/firestore.rules`.

## Google Maps

Add a browser-restricted key to `googleMapsApiKey` in `config.js` after enabling the required Maps services.

## Fixed-price routes

Enter exact Rob's Travel fixed prices in `prePricedRoutes` in `config.js`.

```js
{ from: ["bude"], to: ["exeter airport", "ex5 2bd"], price: 145.00, label: "Bude to Exeter Airport" }
```
