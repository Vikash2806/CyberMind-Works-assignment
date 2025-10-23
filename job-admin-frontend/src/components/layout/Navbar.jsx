"use client";

import { Group, Button, Container } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import Image from "next/image";

export default function Navbar({ onCreateJobClick }) {
  return (
    <nav
      style={{
        backgroundColor: "#FFFFFF",
        borderBottom: "none",
        padding: "20px 0",
        position: "sticky",
        top: 0,
        zIndex: 100,
        boxShadow: "none",
      }}
    >
      <Container size="xl">
        <Group position="apart" style={{ alignItems: "center" }}>
          {/* Logo Section */}
          <Group spacing="xl" style={{ alignItems: "center" }}>
            {/* Replace SVG with Image */}
            <Image
              src="/assets/logo.png" // Path relative to /public
              alt="Logo"
              width={48}   // Adjust width based on Figma design
              height={48}  // Adjust height based on Figma design
              style={{ display: "block" }}
            />

            {/* Navigation Links */}
            <Group spacing={32} style={{ marginLeft: "32px" }}>
              {[
                "Home",
                "Find Jobs",
                "Find Talents",
                "About us",
                "Testimonials",
              ].map((item) => (
                <a
                  key={item}
                  href="#"
                  style={{
                    fontFamily:
                      "Satoshi Variable, -apple-system, sans-serif",
                    fontSize: "16px",
                    fontWeight: 500,
                    color: "#1F2937",
                    textDecoration: "none",
                    transition: "color 0.2s ease",
                    position: "relative",
                  }}
                  onMouseOver={(e) => (e.target.style.color = "#7C3AED")}
                  onMouseOut={(e) => (e.target.style.color = "#1F2937")}
                >
                  {item}
                </a>
              ))}
            </Group>
          </Group>

          {/* Create Jobs Button */}
          <Button
            onClick={onCreateJobClick}
            leftIcon={<IconPlus size={20} stroke={2.5} />}
            style={{
              fontFamily: "Satoshi Variable, -apple-system, sans-serif",
              fontSize: "15px",
              fontWeight: 600,
              backgroundColor: "#7C3AED",
              borderRadius: "12px",
              height: "44px",
              padding: "0 24px",
              border: "none",
              color: "#FFFFFF",
              cursor: "pointer",
              transition: "all 0.2s ease",
              boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
            }}
            styles={{
              root: {
                "&:hover": {
                  backgroundColor: "#6D28D9",
                  transform: "translateY(-1px)",
                  boxShadow: "0 4px 6px rgba(124, 58, 237, 0.25)",
                },
              },
            }}
          >
            Create Jobs
          </Button>
        </Group>
      </Container>
    </nav>
  );
}
