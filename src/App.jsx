import { Routes, Route } from "react-router-dom";

import Footer from "./components/Footer";
import FormContact from "./components/FormContact";
import Header from "./components/Header";
import Products from "./components/Products";
import Promotions from "./components/Promotions";
import Testimonials from "./components/Testimonials";

import Login from "./components/Login";
import Dashboard from "./pages/Dashboard";

// HOME
function Home() {
    return (
        <>
            <Header />
            <Products />
            <Promotions />
            <Testimonials />
            <FormContact />
            <Footer />
        </>
    );
}

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
    );
}

export default App;
