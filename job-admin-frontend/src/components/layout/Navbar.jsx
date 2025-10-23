"use client";

import { Group, Button, Container } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import Image from "next/image";

export default function Navbar({ onCreateJobClick }) {
  return (
    <div
      style={{
        backgroundColor: "#FFFFFF",
        padding: "21px 0 0 0",
      }}
    >
      <Container size="xl">
        {/* Navbar with rounded border container */}
        <div
          style={{
            width: "890px",
            height: "80px",
            margin: "0 auto",
            border: "1px solid #E5E7EB",
            borderRadius: "122px",
            padding: "0 26px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Logo and Navigation Links */}
          <Group spacing={0} style={{ alignItems: "center" }}>
            {/* Logo */}
            <Image
              src="/assets/logo.png"
              alt="Logo"
              width={44}
              height={44}
              style={{ display: "block" }}
            />

            {/* Navigation Links */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginLeft: "68px",
                gap: "0px",
              }}
            >
              <a
                href="#"
                style={{
                  fontFamily: "Satoshi Variable, -apple-system, sans-serif",
                  fontSize: "16px",
                  fontWeight: 500,
                  color: "#1F2937",
                  textDecoration: "none",
                  padding: "14px 20px",
                  borderRadius: "12px",
                  transition: "all 0.2s ease",
                  whiteSpace: "nowrap",
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = "#F3F4F6";
                  e.target.style.color = "#7C3AED";
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = "transparent";
                  e.target.style.color = "#1F2937";
                }}
              >
                Home
              </a>
              <a
                href="#"
                style={{
                  fontFamily: "Satoshi Variable, -apple-system, sans-serif",
                  fontSize: "16px",
                  fontWeight: 500,
                  color: "#1F2937",
                  textDecoration: "none",
                  padding: "14px 20px",
                  borderRadius: "12px",
                  transition: "all 0.2s ease",
                  whiteSpace: "nowrap",
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = "#F3F4F6";
                  e.target.style.color = "#7C3AED";
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = "transparent";
                  e.target.style.color = "#1F2937";
                }}
              >
                Find Jobs
              </a>
              <a
                href="#"
                style={{
                  fontFamily: "Satoshi Variable, -apple-system, sans-serif",
                  fontSize: "16px",
                  fontWeight: 500,
                  color: "#1F2937",
                  textDecoration: "none",
                  padding: "14px 20px",
                  borderRadius: "12px",
                  transition: "all 0.2s ease",
                  whiteSpace: "nowrap",
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = "#F3F4F6";
                  e.target.style.color = "#7C3AED";
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = "transparent";
                  e.target.style.color = "#1F2937";
                }}
              >
                Find Talents
              </a>
              <a
                href="#"
                style={{
                  fontFamily: "Satoshi Variable, -apple-system, sans-serif",
                  fontSize: "16px",
                  fontWeight: 500,
                  color: "#1F2937",
                  textDecoration: "none",
                  padding: "14px 20px",
                  borderRadius: "12px",
                  transition: "all 0.2s ease",
                  whiteSpace: "nowrap",
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = "#F3F4F6";
                  e.target.style.color = "#7C3AED";
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = "transparent";
                  e.target.style.color = "#1F2937";
                }}
              >
                About us
              </a>
              <a
                href="#"
                style={{
                  fontFamily: "Satoshi Variable, -apple-system, sans-serif",
                  fontSize: "16px",
                  fontWeight: 500,
                  color: "#1F2937",
                  textDecoration: "none",
                  padding: "14px 20px",
                  borderRadius: "12px",
                  transition: "all 0.2s ease",
                  whiteSpace: "nowrap",
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = "#F3F4F6";
                  e.target.style.color = "#7C3AED";
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = "transparent";
                  e.target.style.color = "#1F2937";
                }}
              >
                Testimonials
              </a>
            </div>
          </Group>

          {/* Create Jobs Button */}
          <Button
            onClick={onCreateJobClick}
            leftIcon={<IconPlus size={18} stroke={2.5} />}
            style={{
              fontFamily: "Satoshi Variable, -apple-system, sans-serif",
              fontSize: "15px",
              fontWeight: 600,
              backgroundColor: "#7C3AED",
              borderRadius: "30px",
              height: "38px",
              padding: "8px 24px",
              border: "none",
              color: "#FFFFFF",
              cursor: "pointer",
              transition: "all 0.2s ease",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
            styles={{
              root: {
                "&:hover": {
                  backgroundColor: "#6D28D9",
                },
              },
              inner: {
                display: "flex",
                alignItems: "center",
              },
            }}
          >
            Create Jobs
          </Button>
        </div>
      </Container>
    </div>
  );
}