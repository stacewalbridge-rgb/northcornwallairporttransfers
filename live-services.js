const config = window.ROBS_TRAVEL_CONFIG || { enabled: false };

export const liveState = {
  enabled: Boolean(config.enabled && config.firebase?.projectId),
  firebaseReady: false,
  mapsReady: false,
  user: null,
  role: null,
  db: null,
  auth: null
};

let firebaseModules = null;

export async function initFirebase(onAuthChanged) {
  if (!liveState.enabled) return liveState;
  try {
    const [appMod, authMod, fireMod] = await Promise.all([
      import('https://www.gstatic.com/firebasejs/12.17.1/firebase-app.js'),
      import('https://www.gstatic.com/firebasejs/12.17.1/firebase-auth.js'),
      import('https://www.gstatic.com/firebasejs/12.17.1/firebase-firestore.js')
    ]);
    const app = appMod.initializeApp(config.firebase);
    const auth = authMod.getAuth(app);
    const db = fireMod.getFirestore(app);
    firebaseModules = { authMod, fireMod };
    Object.assign(liveState, { firebaseReady: true, auth, db });
    authMod.onAuthStateChanged(auth, async user => {
      liveState.user = user;
      liveState.role = null;
      if (user) {
        const snap = await fireMod.getDoc(fireMod.doc(db, 'users', user.uid));
        if (snap.exists() && snap.data().active !== false) liveState.role = snap.data().role;
      }
      onAuthChanged?.(liveState);
    });
  } catch (error) {
    console.error('Firebase startup failed', error);
  }
  return liveState;
}

export async function signIn(email, password) {
  if (!liveState.firebaseReady) throw new Error('Live Firebase service is not configured.');
  return firebaseModules.authMod.signInWithEmailAndPassword(liveState.auth, email, password);
}

export async function signOutUser() {
  if (liveState.auth) return firebaseModules.authMod.signOut(liveState.auth);
}

export async function addLiveBooking(data) {
  if (!liveState.firebaseReady) throw new Error('Live Firebase service is not configured.');
  const { addDoc, collection, serverTimestamp } = firebaseModules.fireMod;
  return addDoc(collection(liveState.db, 'bookings'), {
    ...data,
    status: 'pending',
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  });
}

export function subscribeBookings(callback) {
  if (!liveState.firebaseReady || !liveState.user) return () => {};
  const { collection, onSnapshot, orderBy, query } = firebaseModules.fireMod;
  return onSnapshot(query(collection(liveState.db, 'bookings'), orderBy('createdAt', 'desc')), snap => {
    callback(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  });
}

export async function updateLiveBooking(id, fields) {
  const { doc, serverTimestamp, updateDoc } = firebaseModules.fireMod;
  return updateDoc(doc(liveState.db, 'bookings', id), { ...fields, updatedAt: serverTimestamp() });
}

export async function setDriverOnline(online, coords = null) {
  if (!liveState.user) return;
  const { doc, serverTimestamp, setDoc } = firebaseModules.fireMod;
  return setDoc(doc(liveState.db, 'driverStatus', liveState.user.uid), {
    online,
    coordinates: coords,
    displayName: liveState.user.displayName || liveState.user.email,
    updatedAt: serverTimestamp()
  }, { merge: true });
}
