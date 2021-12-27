import React, { useState } from "react";
import Header from "./components/header/Header.js";
import Footer from "./components/footer/Footer.js";
import LandingPage from "./pages/landingPage/LandingPage.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MyNotes from "./pages/myNotes/MyNotes.js";
import LoginPage from "./pages/loginPage/LoginPage.js";
import RegisterPage from "./pages/registerPage/RegisterPage.js";
import CreateNote from "./pages/singleNote/CreateNote.js";
import SingleNote from "./pages/singleNote/SingleNote.js";
import ProfilePage from "./pages/profilePage/ProfilePage.js";

const App = () => {
    const [search, setSearch] = useState("");
    console.log(search);

    return (
        <Router>
            <Header setSearch={setSearch} />
            <main className="App">
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route
                        path="/notes"
                        element={<MyNotes search={search} />}
                    />
                    <Route path="/create" element={<CreateNote />} />
                    <Route path="/note/:id" element={<SingleNote />} />
                </Routes>
            </main>
            <Footer />
        </Router>
    );
};

export default App;
