"use client";

import { Card, Text, Button, Group, Badge, Stack, Image } from "@mantine/core";
import {
  IconMapPin,
  IconCurrencyRupee,
  IconUsers,
} from "@tabler/icons-react";
import { formatSalary, formatDate, truncateText } from "@/lib/utils";

export default function JobCard({ job }) {
  const companyLogoPath = `/assets/${job.companyName?.toLowerCase() || "default"}.png`;

  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      style={{
        width: "316px",
        minHeight: "360px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "#FFFFFF",
        borderColor: "#E5E7EB",
        transition: "transform 0.2s, box-shadow 0.2s",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = "0 10px 25px rgba(0, 0, 0, 0.1)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "";
      }}
    >
      {/* Header: Logo + Date Badge */}
      <Group position="apart" mb="md" style={{ alignItems: "center" }}>
        {/* ✅ Full-circle Logo */}
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: "50%",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#fff",
            boxShadow: "0 0 0 1px #E5E7EB", // subtle border ring
          }}
        >
          <img
            src={companyLogoPath}
            alt={`${job.companyName} logo`}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover", // fills the entire circle
            }}
            onError={(e) => {
              e.currentTarget.src = "/assets/default.png";
            }}
          />
        </div>

        {/* Date Badge */}
        <Badge
          variant="filled"
          style={{
            fontFamily: "Satoshi Variable, -apple-system, sans-serif",
            fontSize: "12px",
            fontWeight: 500,
            backgroundColor: "#DBEAFE",
            color: "#1E40AF",
            padding: "4px 12px",
            borderRadius: "6px",
          }}
        >
          {formatDate(job.createdAt)}
        </Badge>
      </Group>

      {/* Job Title */}
      <Text
        size="lg"
        weight={600}
        mb="xs"
        style={{
          fontFamily: "Satoshi Variable, -apple-system, sans-serif",
          fontSize: "18px",
          fontWeight: 600,
          color: "#111827",
          lineHeight: "1.4",
        }}
      >
        {job.jobTitle}
      </Text>

      {/* Job Info Row */}
      <Group spacing="md" mb="sm">
        <Group spacing={4}>
          <IconUsers size={16} color="#6B7280" />
          <Text
            size="sm"
            style={{
              fontFamily: "Satoshi Variable, -apple-system, sans-serif",
              fontSize: "13px",
              color: "#6B7280",
            }}
          >
            1-3 yr Exp
          </Text>
        </Group>

        <Group spacing={4}>
          <IconMapPin size={16} color="#6B7280" />
          <Text
            size="sm"
            style={{
              fontFamily: "Satoshi Variable, -apple-system, sans-serif",
              fontSize: "13px",
              color: "#6B7280",
            }}
          >
            Onsite
          </Text>
        </Group>

        <Group spacing={4}>
          <IconCurrencyRupee size={16} color="#6B7280" />
          <Text
            size="sm"
            style={{
              fontFamily: "Satoshi Variable, -apple-system, sans-serif",
              fontSize: "13px",
              color: "#6B7280",
            }}
          >
            45LPA
          </Text>
        </Group>
      </Group>

      {/* Job Description */}
      <Stack spacing={4} mb="md">
        <Text
          size="sm"
          style={{
            fontFamily: "Satoshi Variable, -apple-system, sans-serif",
            fontSize: "14px",
            fontWeight: 400,
            lineHeight: "1.5",
            color: "#4B5563",
          }}
        >
          • {truncateText(job.jobDescription, 60)}
        </Text>
        <Text
          size="sm"
          style={{
            fontFamily: "Satoshi Variable, -apple-system, sans-serif",
            fontSize: "14px",
            fontWeight: 400,
            lineHeight: "1.5",
            color: "#4B5563",
          }}
        >
          • Filter destinations based on interests and travel style
        </Text>
      </Stack>

      {/* Apply Now Button */}
      <Button
        fullWidth
        style={{
          fontFamily: "Satoshi Variable, -apple-system, sans-serif",
          fontSize: "15px",
          fontWeight: 600,
          backgroundColor: "#00A8E8",
          borderRadius: "8px",
          height: "44px",
          marginTop: "auto",
        }}
        styles={{
          root: {
            "&:hover": {
              backgroundColor: "#0090C8",
            },
          },
        }}
      >
        Apply Now
      </Button>
    </Card>
  );
}
