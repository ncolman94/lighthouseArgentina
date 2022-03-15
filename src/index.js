import "./index.css";

import App from "./App";
import React from "react";
import ReactDOM from "react-dom";
import { initializeApp } from "firebase/app";
import reportWebVitals from "./reportWebVitals";

const firebaseConfig = {
  apiKey: "AIzaSyAX_vQrx3WDlNiGQm-oXalKO5a_8Q1V8F8",
  authDomain: "lighthouse-argentina.firebaseapp.com",
  projectId: "lighthouse-argentina",
  storageBucket: "lighthouse-argentina.appspot.com",
  messagingSenderId: "124426665597",
  appId: "1:124426665597:web:452d89225529589d517b14",
};

/*const firebaseConfig = {
  apiKey: "AIzaSyCKwY0_WtlS3qQt8PbfL9Rj59wS3SPE-2g",
  authDomain: "avelazquez-ecommerce.firebaseapp.com",
  projectId: "avelazquez-ecommerce",
  storageBucket: "avelazquez-ecommerce.appspot.com",
  messagingSenderId: "338722195824",
  appId: "1:338722195824:web:b9da18e8244889a1c7e7b5",
};*/

initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
