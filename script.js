// Firebase imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.17.1/firebase-app.js";

import {
    getFirestore,
    collection,
    getDocs
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-firestore.js";


// Your Firebase configuration
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


// Connect to Firestore
const db = getFirestore(app);


// Get the gift list on the webpage
const giftList = document.getElementById("gift-list");


// Load gifts from Firestore
async function loadGifts() {

    try {

        // Get all documents from the "wishlist" collection
        const querySnapshot = await getDocs(
            collection(db, "wishlist")
        );


        // Clear "Loading wishlist..."
        giftList.innerHTML = "";


        // Check whether any gifts were found
        if (querySnapshot.empty) {

            giftList.innerHTML = "<p>No gifts found.</p>";

            return;
        }


        // Display every gift
        querySnapshot.forEach((doc) => {

            const gift = doc.data();


            const giftCard = document.createElement("div");

            giftCard.className = "gift-card";


            giftCard.innerHTML = `

                ${
                    gift.Image
                        ? `<img src="${gift.Image}" 
                                alt="${gift.Name || "Gift"}" 
                                width="200">`
                        : ""
                }

                <h2>${gift.Name || "Gift"}</h2>


                ${
                    gift.Note
                        ? `<p>${gift.Note}</p>`
                        : ""
                }


                ${
                    gift.Link
                        ? `
                            <a href="${gift.Link}" target="_blank">
                                Buy Gift
                            </a>
                          `
                        : ""
                }


                <p>
                    ${
                        gift.Purchased
                            ? "✅ Purchased"
                            : "🎁 Available"
                    }
                </p>

            `;


            giftList.appendChild(giftCard);

        });


    } catch (error) {

        console.error("Error loading gifts:", error);


        giftList.innerHTML = `
            <p>
                Error loading gifts: ${error.message}
            </p>
        `;

    }

}


// Start loading the gifts
loadGifts();
