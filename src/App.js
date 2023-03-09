import React from "react";
import { Routes, Route } from "react-router-dom";
import { Layout } from "antd";

import {
  Home,
  Cryptocurrencies,
  Cryptodetails,
  News,
  Header,
} from "./components";

import "./App.css";
import Footer from "./components/Footer";

const App = () => {
  return (
    <div className="app">
      <Header />
      <div className="main">
        <div className="container" style={{ paddingBottom: 50 }}>
          <Layout style={{ background: "transparent" }}>
            <div className="routes">
              <Routes>
                <Route exact path="/" element={<Home />} />
                <Route
                  exact
                  path="/cryptocurrencies"
                  element={<Cryptocurrencies />}
                />
                <Route
                  exact
                  path="/crypto/:coinId"
                  element={<Cryptodetails />}
                />
                <Route exact path="/news" element={<News />} />
              </Routes>
            </div>
          </Layout>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default App;
