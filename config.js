/* Rob's Travel live-service and pricing configuration. */
window.ROBS_TRAVEL_CONFIG = {
  enabled: true,
  firebase: {
    apiKey: "AIzaSyB0atDrYNvxaKlhQqDDdGWsIox7-T7jKB4",
    authDomain: "robs-travel-taxis.firebaseapp.com",
    projectId: "robs-travel-taxis",
    storageBucket: "robs-travel-taxis.firebasestorage.app",
    messagingSenderId: "1038413641819",
    appId: "1:1038413641819:web:87ff5c688d2c813610277e"
  },
  googleMapsApiKey: "",
  ownerEmail: "stace.walbridge@gmail.com",
  businessEmail: "robs-travel@dr.com",
  businessPhone: "07771824141",
  businessName: "Rob's Travel",
  serviceArea: "Bude & North Cornwall",

  /* Existing app tariff settings. These remain guide estimates until confirmed by Rob's Travel. */
  fareConfig: {
    bookingCharge: 1.00,
    luggageCharge: 0.25,
    extraStopCharge: 2.00,
    tariffs: {
      day:     { standard: { flag: 3.20, perMile: 2.30, minimum: 5.00 }, large: { flag: 4.80, perMile: 3.20, minimum: 7.00 } },
      night:   { standard: { flag: 4.00, perMile: 2.75, minimum: 6.00 }, large: { flag: 5.80, perMile: 3.75, minimum: 8.00 } },
      special: { standard: { flag: 6.40, perMile: 4.60, minimum: 10.00 }, large: { flag: 9.60, perMile: 6.40, minimum: 14.00 } }
    }
  },

  /* Quick airport buttons. Fixed prices may be added using fixedPrice below. */
  quickDestinations: [
    { name: "Newquay Airport", address: "Cornwall Airport Newquay, St Mawgan, Newquay TR8 4RQ", fixedPrice: null },
    { name: "Exeter Airport", address: "Exeter Airport, Clyst Honiton, Exeter EX5 2BD", fixedPrice: null },
    { name: "Bristol Airport", address: "Bristol Airport, Bristol BS48 3DY", fixedPrice: null },
    { name: "Heathrow Airport", address: "Heathrow Airport, Hounslow", fixedPrice: null },
    { name: "Gatwick Airport", address: "Gatwick Airport, Horley RH6 0NP", fixedPrice: null },
    { name: "Birmingham Airport", address: "Birmingham Airport, Birmingham B26 3QJ", fixedPrice: null }
  ],

  /* Add the website's exact pre-priced routes here. Example:
     { from: ["bude"], to: ["exeter airport", "ex5 2bd"], price: 145.00, label: "Bude to Exeter Airport" }
     Leave this list empty rather than guessing a business price. */
  prePricedRoutes: []
};
