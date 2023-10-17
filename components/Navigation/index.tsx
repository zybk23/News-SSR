"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Container from "../Container";
import "./style.scss";

const Navigation = () => {
  const router = useRouter();

  const handleOpenHomePage = () => {
    router.push("/");
  };
  return (
    <div className="navigation-container">
      <Container>
        <img onClick={handleOpenHomePage} src="/images/logo.png" alt="" />
      </Container>
    </div>
  );
};

export default Navigation;
