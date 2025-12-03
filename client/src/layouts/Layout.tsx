import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-blue-50 ">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <Header />
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 lg:px-8 py-8">
        <div className="animate-fade-in">
          <Outlet />
        </div>
      </main>

      <footer className="border-t border-gray-200 bg-white mt-16">
        <Footer />
      </footer>
    </div>
  );
}

export default Layout;
