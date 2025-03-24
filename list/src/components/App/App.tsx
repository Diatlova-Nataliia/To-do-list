import React from "react";
import { Routes } from "react-router-dom";
import { Route } from "react-router";
import MainPage from "../MainPage/MainPage.tsx";
import FormPage from "../FormPage/FormPage.tsx";
import "./App.scss";

const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/form.html" element={<FormPage />} />
      </Routes>
    </>
  );
};

export default App;
