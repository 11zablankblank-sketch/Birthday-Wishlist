// Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.17.1/firebase-app.js";

import {
    getFirestore,
    collection,
    getDocs
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-firestore.js";


// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDbpkVgyZmx8zPur81QdGRhOeQaOydjLJM",
    authDomain: "th-birthday-wishlist.firebaseapp.com",
    projectId: "th-birthday-wishlist",
    storageBucket: "th-birthday-wishlist.firebasestorage.app",
    messagingSenderId: "282733092784",
    appId: "1:282733092784:web:2f56435859953b329c0075"
};


// Start Firebase
const app = initializeApp(firebaseConfig);


// Connect to Firestore
const db = getFirestore(app);


// Find the gift list
const giftList = document.getElementById("gift-list");


// Load the gifts
async function loadGifts() {

    try {

        console.log("Connecting to Firestore...");


        // IMPORTANT:
        // Your collection is named "wishlist" with a lowercase w.
        const querySnapshot = await getDocs(
            collection(db, "wishlist")
        );


        console.log(
            "Number of gifts found:",
            querySnapshot.size
        );


        // Clear "Loading wishlist..."
        giftList.innerHTML = "";


        // If there are no gifts
        if (querySnapshot.empty) {

            giftList.innerHTML = `
                <p>No gifts found.</p>
            `;

            return;
        }


        // Display every gift
        querySnapshot.forEach((doc) => {

            const gift = doc.data();

            console.log("Gift:", doc.id, gift);


            giftList.innerHTML += `

                <div class="gift-card">

                    ${
                        gift.Image
                            ? `
                                <img
                                    src="${gift.Image}"
                                    alt="${gift.Name || "Gift"}"
                                >
                              `
                            : ""
                    }


                    <h2>
                        ${gift.Name || "Gift"}
                    </h2>


                    ${
                        gift.Note
                            ? `<p>${gift.Note}</p>`
                            : ""
                    }


                    ${
                        gift.Link
                            ? `
                                <a
                                    href="${gift.Link}"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
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

                </div>

            `;

        });


    } catch (error) {

        console.error(
            "Firestore error:",
            error
        );


        giftList.innerHTML = `
            <p>
                Error loading gifts:
                ${error.message}
            </p>
        `;

    }
}


// Run the function
loadGifts();
