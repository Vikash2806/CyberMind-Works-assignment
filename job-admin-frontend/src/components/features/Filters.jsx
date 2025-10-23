"use client";

import { RangeSlider, Text, Container } from '@mantine/core';
import { IconSearch, IconMapPin, IconBriefcase, IconChevronDown } from '@tabler/icons-react';
import { useState } from 'react';

export default function Filters({ onFilterChange }) {
  const [salaryRange, setSalaryRange] = useState([50, 80]);

  const handleSalaryChange = (value) => {
    setSalaryRange(value);
    onFilterChange({ salaryMin: value[0] * 1000, salaryMax: value[1] * 1000 });
  };

  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        paddingTop: '32px',
        paddingBottom: '32px',
      }}
    >
      <Container size="xl">
        <div style={{ 
          display: 'flex', 
          alignItems: 'center',
          gap: '24px',
          position: 'relative',
        }}>
          {/* Search by Job Title - positioned at left: 65px from container */}
          <div style={{ 
            position: 'relative',
            flex: '0 0 300px',
          }}>
            <IconSearch 
              size={16} 
              color="#9CA3AF" 
              style={{ 
                position: 'absolute',
                left: '16px',
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 1,
              }} 
            />
            <input
              type="text"
              placeholder="Search By Job Title, Role"
              onChange={(e) => onFilterChange({ jobTitle: e.target.value })}
              style={{
                width: '100%',
                height: '44px',
                paddingLeft: '44px',
                paddingRight: '16px',
                fontFamily: 'Satoshi Variable, -apple-system, sans-serif',
                fontSize: '14px',
                fontWeight: 400,
                color: '#374151',
                backgroundColor: '#FFFFFF',
                border: '1px solid #E5E7EB',
                borderRadius: '8px',
                outline: 'none',
                transition: 'border-color 0.2s ease',
              }}
              onFocus={(e) => e.target.style.borderColor = '#7C3AED'}
              onBlur={(e) => e.target.style.borderColor = '#E5E7EB'}
            />
          </div>

          {/* Preferred Location - positioned at left: 410px */}
          <div style={{ 
            position: 'relative',
            flex: '0 0 240px',
          }}>
            <IconMapPin 
              size={16} 
              color="#9CA3AF"
              style={{ 
                position: 'absolute',
                left: '16px',
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 1,
              }} 
            />
            <select
              onChange={(e) => onFilterChange({ location: e.target.value })}
              style={{
                width: '100%',
                height: '44px',
                paddingLeft: '44px',
                paddingRight: '40px',
                fontFamily: 'Satoshi Variable, -apple-system, sans-serif',
                fontSize: '14px',
                fontWeight: 400,
                color: '#9CA3AF',
                backgroundColor: '#FFFFFF',
                border: '1px solid #E5E7EB',
                borderRadius: '8px',
                outline: 'none',
                appearance: 'none',
                cursor: 'pointer',
                transition: 'border-color 0.2s ease',
              }}
              onFocus={(e) => e.target.style.borderColor = '#7C3AED'}
              onBlur={(e) => e.target.style.borderColor = '#E5E7EB'}
            >
              <option value="">Preferred Location</option>
              <option value="Chennai">Chennai</option>
              <option value="Bangalore">Bangalore</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Delhi">Delhi</option>
              <option value="Hyderabad">Hyderabad</option>
              <option value="Pune">Pune</option>
            </select>
            <IconChevronDown 
              size={16} 
              color="#9CA3AF"
              style={{ 
                position: 'absolute',
                right: '16px',
                top: '50%',
                transform: 'translateY(-50%)',
                pointerEvents: 'none',
              }} 
            />
          </div>

          {/* Job Type - positioned at left: 753px */}
          <div style={{ 
            position: 'relative',
            flex: '0 0 200px',
          }}>
            <IconBriefcase 
              size={16} 
              color="#9CA3AF"
              style={{ 
                position: 'absolute',
                left: '16px',
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 1,
              }} 
            />
            <select
              onChange={(e) => onFilterChange({ jobType: e.target.value })}
              style={{
                width: '100%',
                height: '44px',
                paddingLeft: '44px',
                paddingRight: '40px',
                fontFamily: 'Satoshi Variable, -apple-system, sans-serif',
                fontSize: '14px',
                fontWeight: 400,
                color: '#9CA3AF',
                backgroundColor: '#FFFFFF',
                border: '1px solid #E5E7EB',
                borderRadius: '8px',
                outline: 'none',
                appearance: 'none',
                cursor: 'pointer',
                transition: 'border-color 0.2s ease',
              }}
              onFocus={(e) => e.target.style.borderColor = '#7C3AED'}
              onBlur={(e) => e.target.style.borderColor = '#E5E7EB'}
            >
              <option value="">Job type</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Internship">Internship</option>
            </select>
            <IconChevronDown 
              size={16} 
              color="#9CA3AF"
              style={{ 
                position: 'absolute',
                right: '16px',
                top: '50%',
                transform: 'translateY(-50%)',
                pointerEvents: 'none',
              }} 
            />
          </div>

          {/* Salary Range Slider - positioned at right side */}
          <div style={{ 
            flex: '0 0 280px',
            marginLeft: 'auto',
          }}>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              marginBottom: '12px',
            }}>
              <Text
                style={{
                  fontFamily: 'Satoshi Variable, -apple-system, sans-serif',
                  fontSize: '13px',
                  fontWeight: 500,
                  color: '#374151',
                }}
              >
                Salary Per Month
              </Text>
              <Text
                style={{
                  fontFamily: 'Satoshi Variable, -apple-system, sans-serif',
                  fontSize: '13px',
                  fontWeight: 500,
                  color: '#6B7280',
                }}
              >
                ₹{salaryRange[0]}k - ₹{salaryRange[1]}k
              </Text>
            </div>
            <div style={{ position: 'relative', paddingTop: '8px' }}>
              <RangeSlider
                value={salaryRange}
                onChange={setSalaryRange}
                onChangeEnd={handleSalaryChange}
                min={0}
                max={200}
                step={10}
                styles={{
                  root: {
                    width: '100%',
                  },
                  track: {
                    backgroundColor: '#E5E7EB',
                    height: '4px',
                    borderRadius: '2px',
                  },
                  bar: {
                    backgroundColor: '#7C3AED',
                    height: '4px',
                  },
                  thumb: {
                    width: '16px',
                    height: '16px',
                    borderWidth: '3px',
                    borderColor: '#7C3AED',
                    backgroundColor: '#FFFFFF',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                  },
                  markLabel: {
                    display: 'none',
                  },
                }}
              />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}