import React from "react";
import Navigation from "./Navigation";

const Layout = ({ children }) => {
  return (
    <>
    <div className="w-full h-18 bg-white/30 fixed top-0 backdrop-blur-xl"></div>
      <div className="min-h-screen flex bg-white">
        <Navigation />
        {/* メインコンテンツ */}
        <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-20">
          {children}
        </main>
      </div>
    </>
  );
};

export default Layout;
