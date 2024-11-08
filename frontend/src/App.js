import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import axios from "axios";
import CourseList from "./components/CourseList";
import PaymentComponent from "./components/PaymentComponent";
import { HomePage } from "./components/HomePage";
import PaymentPage from "./components/PaymentPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
