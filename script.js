// Import Firebase modulesimport { initializeApp } from "https://www.gstatic.com/firebasejs/12.17.1/firebase-app.js";import {  getFirestore,  collection,  getDocs} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-firestore.js";
// Your Firebase configuration (keep yours here)const firebaseConfig = {  apiKey: "AIzaSyDbpkVgyZmx8zPur81QdGRhOeQaOydjLJM",  authDomain: "th-birthday-wishlist.firebaseapp.com",  projectId: "th-birthday-wishlist",  storageBucket: "th-birthday-wishlist.firebasestorage.app",  messagingSenderId: "282733092784",  appId: "1:282733092784:web:2f56435859953b329c0075"};
// Initialize Firebase appconst app = initializeApp(firebaseConfig);
// Initialize Firestoreconst db = getFirestore(app);
// Select the container where gifts will be shownconst giftList = document.getElementById("gift-list");
// Load gifts from "wishlist" collectionasync function loadGifts() {  try {    giftList.innerHTML = "Loading wishlist...";
    // Query the "wishlist" collection (lowercase)    const querySnapshot = await getDocs(collection(db, "wishlist"));
    if (querySnapshot.empty) {      giftList.innerHTML = "<p>No gifts found.</p>";      return;    }
    giftList.innerHTML = "";
    querySnapshot.forEach((doc) => {      const gift = doc.data();
      giftList.innerHTML += `        <div class="gift-card">          ${            gift.Image              ? `<img src="${gift.Image}" alt="${gift.Name || "Gift"}">`              : ""          }          <h2>${gift.Name || "Gift"}</h2>          ${gift.Note ? `<p>${gift.Note}</p>` : ""}          ${            gift.Link              ? `<a href="${gift.Link}" target="_blank" rel="noopener noreferrer">Buy Gift</a>`              : ""          }          <p>${gift.Purchased ? "✅ Purchased" : "🎁 Available"}</p>        </div>      `;    });  } catch (error) {    console.error("Error loading gifts:", error);    giftList.innerHTML = `<p>Error loading gifts: ${error.message}</p>`;  }}
// Run the load functionloadGifts();
