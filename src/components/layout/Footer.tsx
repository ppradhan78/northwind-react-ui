import "./Layout.css";

export default function Footer() {
  return (
    <footer className="footer">
      © {new Date().getFullYear()} Northwind Service. All rights reserved.
    </footer>
  );
}
