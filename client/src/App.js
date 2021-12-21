import React from "react";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import LandingPage from "./pages/landingPage/LandingPage.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MyNotes from "./pages/myNotes/MyNotes";

const App = () => {
    return (
        <Router>
            <Header />
            <main className="App">
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/notes" element={<MyNotes />} />
                </Routes>
            </main>
            <Footer />
        </Router>
    );
};

export default App;
