"use client";

import { Group, TextInput, Select, RangeSlider, Text, Container } from '@mantine/core';
import { IconSearch, IconMapPin, IconBriefcase } from '@tabler/icons-react';
import { useState } from 'react';

export default function Filters({ onFilterChange }) {
  const [salaryRange, setSalaryRange] = useState([50000, 80000]);

  /* TODO: Verify all filter component styles from Figma:
     - Container background color
     - Container padding
     - Input field styles
     - Icon sizes and colors
     - Font family (Satoshi Variable)
     - Spacing between filters
     - Border radius
     - Border colors
  */

  const handleSalaryChange = (value) => {
    setSalaryRange(value);
    onFilterChange({ salaryMin: value[0] * 1000, salaryMax: value[1] * 1000 });
  };

  return (
    <div
      style={{
        /* TODO: Verify from Figma */
        backgroundColor: '#FFFFFF',
        padding: '24px 0',
        borderBottom: '1px solid #E5E7EB',
        marginBottom: '32px',
      }}
    >
      <Container size="xl">
        {/* Search and Dropdown Filters Row */}
        <Group spacing="md" mb="lg">
          {/* Search by Job Title */}
          <TextInput
            placeholder="Search By Job Title, Role"
            icon={<IconSearch size={18} color="#9CA3AF" />} /* TODO: Verify icon color from Figma */
            onChange={(e) => onFilterChange({ jobTitle: e.target.value })}
            style={{
              flex: 1,
              minWidth: '300px', /* TODO: Verify from Figma */
            }}
            styles={{
              input: {
                fontFamily: 'Satoshi Variable, -apple-system, sans-serif', /* TODO: Verify from Figma */
                fontSize: '14px', /* TODO: Verify from Figma */
                height: '44px', /* TODO: Verify from Figma */
                borderRadius: '8px', /* TODO: Verify from Figma */
                borderColor: '#E5E7EB', /* TODO: Verify from Figma */
                '&:focus': {
                  borderColor: '#7C3AED', /* TODO: Verify focus color from Figma */
                },
              },
            }}
          />

          {/* Location Filter */}
          <Select
            placeholder="Preferred Location"
            icon={<IconMapPin size={18} color="#9CA3AF" />}
            data={[
              { value: '', label: 'All Locations' },
              { value: 'Chennai', label: 'Chennai' },
              { value: 'Bangalore', label: 'Bangalore' },
              { value: 'Mumbai', label: 'Mumbai' },
              { value: 'Delhi', label: 'Delhi' },
              { value: 'Hyderabad', label: 'Hyderabad' },
              { value: 'Pune', label: 'Pune' },
            ]}
            onChange={(value) => onFilterChange({ location: value })}
            style={{ width: '220px' }}
            styles={{
              input: {
                fontFamily: 'Satoshi Variable, -apple-system, sans-serif',
                fontSize: '14px',
                height: '44px',
                borderRadius: '8px',
                borderColor: '#E5E7EB',
              },
            }}
          />

          {/* Job Type Filter */}
          <Select
            placeholder="Job type"
            icon={<IconBriefcase size={18} color="#9CA3AF" />}
            data={[
              { value: '', label: 'All Types' },
              { value: 'Full-time', label: 'Full-time' },
              { value: 'Part-time', label: 'Part-time' },
              { value: 'Contract', label: 'Contract' },
              { value: 'Internship', label: 'Internship' },
            ]}
            onChange={(value) => onFilterChange({ jobType: value })}
            style={{ width: '200px' }}
            styles={{
              input: {
                fontFamily: 'Satoshi Variable, -apple-system, sans-serif',
                fontSize: '14px',
                height: '44px',
                borderRadius: '8px',
                borderColor: '#E5E7EB',
              },
            }}
          />
        </Group>

        {/* Salary Range Slider */}
        <Group position="right" style={{ maxWidth: '400px', marginLeft: 'auto' }}>
          <div style={{ width: '100%' }}>
            <Group position="apart" mb="xs">
              <Text
                size="sm"
                weight={500}
                style={{
                  fontFamily: 'Satoshi Variable, -apple-system, sans-serif',
                  fontSize: '14px',
                  color: '#374151',
                }}
              >
                Salary Per Month
              </Text>
              <Text
                size="sm"
                style={{
                  fontFamily: 'Satoshi Variable, -apple-system, sans-serif',
                  fontSize: '14px',
                  color: '#6B7280',
                }}
              >
                ₹{salaryRange[0]}k - ₹{salaryRange[1]}k
              </Text>
            </Group>
            <RangeSlider
              value={salaryRange}
              onChange={setSalaryRange}
              onChangeEnd={handleSalaryChange}
              min={0}
              max={200}
              step={10}
              marks={[
                { value: 0, label: '₹0k' },
                { value: 50, label: '₹50k' },
                { value: 100, label: '₹100k' },
                { value: 150, label: '₹150k' },
                { value: 200, label: '₹200k' },
              ]}
              style={{ width: '100%' }}
              styles={{
                track: {
                  /* TODO: Verify track color from Figma */
                },
                bar: {
                  backgroundColor: '#7C3AED',
                },
                thumb: {
                  borderColor: '#7C3AED',
                  backgroundColor: '#FFFFFF',
                },
              }}
            />
          </div>
        </Group>
      </Container>
    </div>
  );
}
