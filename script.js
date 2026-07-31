// Firebase imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDbpkVgyZmx8zPur81QdGRhOeQaOydjLJM",
  authDomain: "th-birthday-wishlist.firebaseapp.com",
  projectId: "th-birthday-wishlist",
  storageBucket: "th-birthday-wishlist.firebasestorage.app",
  messagingSenderId: "282733092784",
  appId: "1:282733092784:web:2f56435859953b329c0075"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Get the gift list container
const giftList = document.getElementById("gift-list");

// Load gifts from Firestore
async function loadGifts() {
    try {
        // Collection name is lowercase
        const querySnapshot = await getDocs(collection(db, "wishlist"));

        giftList.innerHTML = "";

        querySnapshot.forEach((doc) => {
            const gift = doc.data();

            giftList.innerHTML += `
                <div class="gift-card">
                    <img src="${gift.Image}" alt="${gift.Name}" width="200">

                    <h2>${gift.Name}</h2>

                    <p>${gift.Note}</p>

                    <a href="${gift.Link}" target="_blank">
                        Buy Gift
                    </a>

                    <p>
                        ${gift.Purchased ? "✅ Purchased" : "🎁 Available"}
                    </p>
                </div>
            `;
        });

        if (querySnapshot.empty) {
            giftList.innerHTML = "<p>No gifts found.</p>";
        }

    } catch (error) {
        console.error("Error loading gifts:", error);
        giftList.innerHTML = `<p>Error: ${error.message}</p>`;
    }
}

loadGifts();