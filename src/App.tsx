import Header from "./app/components/layout/Header";
import Footer from "./app/components/layout/Footer";
import Banner from "./app/components/layout/banner";
import AppRoutes from "./app/routes/AppRoutes";

import "./app/components/layout/Layout.css";
import { CategoryProvider } from "./app/context/CategoryContext";

export default function App() {
  return (
    <div className="app-layout">
      <Header />

      <Banner
        title="Northwind"
        subtitle="TRADERS"
        imageUrl="/images/north-wind.jpg"
        buttonText="North wind banner"
      />

      <main className="content">
        <CategoryProvider>
          <AppRoutes />
        </CategoryProvider>
      </main>

      <Footer />
    </div>
  );
}
