const firebaseConfig = {
  apiKey: "AIzaSyBMAG8ANJbulJH4VBikWUjWdFCT5_6Q7AA",
  authDomain: "managerproducts-7eb97.firebaseapp.com",
  databaseURL: "https://managerproducts-7eb97-default-rtdb.firebaseio.com",
  projectId: "managerproducts-7eb97",
  storageBucket: "managerproducts-7eb97.appspot.com",
  messagingSenderId: "654041330334",
  appId: "1:654041330334:web:ea0b9e42bf120ec4c5418f",
  measurementId: "G-EY3BXM1PM3",
};

firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();
