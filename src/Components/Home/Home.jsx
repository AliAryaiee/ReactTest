import React, { useState } from "react";
import { Container } from "./App";
import "./Home.css";

const HomeApp = () => {
  const [brand, changeBrand] = useState("Ali Aryaie Nejad...");
  return (
    <>
      <nav>
        <h1>{brand}</h1>
      </nav>
      <Container />
      {/*<div className="container">
        <div className="row">
          <div className="col-md-6 col-lg-4">1</div>
          <div className="col-md-6 col-lg-4">1</div>
          <div className="col-md-6 col-lg-4">1</div>
          <div className="col-md-6 col-lg-4">1</div>
          <div className="col-md-6 col-lg-4">1</div>
          <div className="col-md-6 col-lg-4">1</div>
        </div>
      </div>*/}
    </>
  );
};

export { HomeApp };
