import { Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

import Home from "./pages/Home";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";

import "./components/layout/Layout.css";
import Banner from "./components/layout/banner";

export default function App() {
  return (
    <div className="app-layout">
      <Header />
      <Banner
        title={"Northwind"}
        subtitle={"TRADERS"}
        imageUrl={"../../../public/images/north-wind.jpg"}
        buttonText={"North wind banner"}
      ></Banner>
      <main className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}
