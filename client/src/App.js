import React from "react";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import LandingPage from "./pages/landingPage/LandingPage.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MyNotes from "./pages/myNotes/MyNotes";
import LoginPage from "./pages/loginPage/LoginPage";
import RegisterPage from "./pages/registerPage/RegisterPage";

const App = () => {
    return (
        <Router>
            <Header />
            <main className="App">
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/notes" element={<MyNotes />} />
                </Routes>
            </main>
            <Footer />
        </Router>
    );
};

export default App;
