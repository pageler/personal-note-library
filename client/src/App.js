import React from "react";
import "./App.css";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import LandingPage from "./pages/landingPage/LandingPage.js";

const App = () => {
    return (
        <div>
            <Header />
            <main>
                <LandingPage />
            </main>
            <Footer />
        </div>
    );
};

export default App;
