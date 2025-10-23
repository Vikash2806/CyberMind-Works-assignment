"use client";

import { Card, Text, Button, Group, Badge, Stack, Avatar } from '@mantine/core';
import { IconMapPin, IconBriefcase, IconCurrencyRupee, IconUsers } from '@tabler/icons-react';
import { formatSalary, formatDate, truncateText } from '@/lib/utils';

export default function JobCard({ job }) {
  /* TODO: Compare entire card with Figma:
     - Card width (appears to be ~316px from screenshot)
     - Card min-height (appears to be ~360px)
     - Card padding
     - Border radius
     - Box shadow
     - Background color
     - Gap between elements
  */

  // Company logo - using first letter as placeholder
  const companyInitial = job.companyName?.[0]?.toUpperCase() || 'C';
  
  // Colors for different company logos (you can customize based on company)
  const logoColors = {
    'A': '#232F3E', // Amazon dark
    'T': '#000000', // Tesla black
    'S': '#FF5200', // Swiggy orange
    'M': '#00A4EF', // Microsoft blue
  };
  
  const logoColor = logoColors[companyInitial] || '#6366F1';

  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      style={{
        /* TODO: Verify all these values from Figma */
        width: '316px',           /* TODO: Measure exact card width in Figma */
        minHeight: '360px',       /* TODO: Measure exact card height in Figma */
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: '#FFFFFF',
        borderColor: '#E5E7EB',   /* TODO: Verify border color from Figma */
        transition: 'transform 0.2s, box-shadow 0.2s',
        cursor: 'pointer',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.1)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '';
      }}
    >
      {/* Header with Logo and Time Badge */}
      <Group position="apart" mb="md">
        {/* Company Logo */}
        {/* TODO: Replace with actual company logos from Figma 
            - Check Figma for logo size
            - Export actual logos as images
        */}
        <Avatar
          radius="md"
          size={56}               /* TODO: Verify logo size from Figma */
          style={{
            backgroundColor: logoColor,
            color: 'white',
            fontWeight: 'bold',
            fontSize: '20px',     /* TODO: Verify font size from Figma */
            fontFamily: 'Satoshi Variable, -apple-system, sans-serif',
          }}
        >
          {companyInitial}
        </Avatar>

        {/* Time Badge */}
        {/* TODO: Verify from Figma:
            - Badge background color (appears light blue)
            - Badge text color
            - Badge padding
            - Badge border radius
            - Font size
            - Font weight
        */}
        <Badge
          variant="filled"
          style={{
            fontFamily: 'Satoshi Variable, -apple-system, sans-serif', /* TODO: Verify from Figma */
            fontSize: '12px',      /* TODO: Verify from Figma */
            fontWeight: 500,       /* TODO: Verify from Figma */
            backgroundColor: '#DBEAFE',  /* TODO: Verify exact blue from Figma */
            color: '#1E40AF',      /* TODO: Verify text color from Figma */
            padding: '4px 12px',   /* TODO: Verify padding from Figma */
            borderRadius: '6px',   /* TODO: Verify border radius from Figma */
          }}
        >
          {formatDate(job.createdAt)}
        </Badge>
      </Group>

      {/* Job Title */}
      {/* TODO: Verify from Figma:
          - Font family (Satoshi Variable)
          - Font size
          - Font weight
          - Line height
          - Color
          - Margin bottom
      */}
      <Text
        size="lg"
        weight={600}
        mb="xs"
        style={{
          fontFamily: 'Satoshi Variable, -apple-system, sans-serif', /* TODO: Verify from Figma */
          fontSize: '18px',       /* TODO: Verify from Figma */
          fontWeight: 600,        /* TODO: Verify from Figma */
          color: '#111827',       /* TODO: Verify from Figma */
          lineHeight: '1.4',
        }}
      >
        {job.jobTitle}
      </Text>

      {/* Job Info Row (Experience, Location, Type) */}
      {/* TODO: Verify from Figma:
          - Icon size
          - Icon color
          - Font size
          - Font weight
          - Text color
          - Spacing between items
      */}
      <Group spacing="md" mb="sm">
        <Group spacing={4}>
          <IconUsers size={16} color="#6B7280" />  {/* TODO: Verify icon color from Figma */}
          <Text 
            size="sm" 
            color="dimmed"
            style={{
              fontFamily: 'Satoshi Variable, -apple-system, sans-serif',
              fontSize: '13px',    /* TODO: Verify from Figma */
              color: '#6B7280',    /* TODO: Verify from Figma */
            }}
          >
            1-3 yr Exp
          </Text>
        </Group>

        <Group spacing={4}>
          <IconMapPin size={16} color="#6B7280" />
          <Text 
            size="sm" 
            color="dimmed"
            style={{
              fontFamily: 'Satoshi Variable, -apple-system, sans-serif',
              fontSize: '13px',
              color: '#6B7280',
            }}
          >
            Onsite
          </Text>
        </Group>

        <Group spacing={4}>
          <IconCurrencyRupee size={16} color="#6B7280" />
          <Text 
            size="sm" 
            color="dimmed"
            style={{
              fontFamily: 'Satoshi Variable, -apple-system, sans-serif',
              fontSize: '13px',
              color: '#6B7280',
            }}
          >
            12LPA
          </Text>
        </Group>
      </Group>

      {/* Job Description */}
      {/* TODO: Verify from Figma:
          - Font size
          - Font weight
          - Line height
          - Text color
          - Number of lines to show
          - Margin bottom
      */}
      <Stack spacing={4} mb="md">
        <Text
          size="sm"
          color="dimmed"
          style={{
            fontFamily: 'Satoshi Variable, -apple-system, sans-serif',
            fontSize: '14px',      /* TODO: Verify from Figma */
            fontWeight: 400,       /* TODO: Verify from Figma */
            lineHeight: '1.5',     /* TODO: Verify from Figma */
            color: '#4B5563',      /* TODO: Verify from Figma */
          }}
        >
          • {truncateText(job.jobDescription, 60)}
        </Text>
        <Text
          size="sm"
          color="dimmed"
          style={{
            fontFamily: 'Satoshi Variable, -apple-system, sans-serif',
            fontSize: '14px',
            fontWeight: 400,
            lineHeight: '1.5',
            color: '#4B5563',
          }}
        >
          • Filter destinations based on interests and travel style, and create personalized
        </Text>
      </Stack>

      {/* Apply Now Button */}
      {/* TODO: Verify from Figma:
          - Button background color (appears cyan/blue)
          - Button border radius
          - Button height
          - Button width (full width)
          - Font family (Satoshi Variable)
          - Font size
          - Font weight
          - Hover state color
      */}
      <Button
        fullWidth
        style={{
          fontFamily: 'Satoshi Variable, -apple-system, sans-serif', /* TODO: Verify from Figma */
          fontSize: '15px',        /* TODO: Verify from Figma */
          fontWeight: 600,         /* TODO: Verify from Figma */
          backgroundColor: '#00A8E8',  /* TODO: Verify exact cyan/blue hex from Figma */
          borderRadius: '8px',     /* TODO: Verify from Figma */
          height: '44px',          /* TODO: Verify from Figma */
          marginTop: 'auto',
        }}
        styles={{
          root: {
            '&:hover': {
              backgroundColor: '#0090C8',  /* TODO: Verify hover color from Figma */
            }
          }
        }}
      >
        Apply Now
      </Button>
    </Card>
  );
}