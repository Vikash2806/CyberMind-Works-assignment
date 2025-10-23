"use client";

import { Modal, TextInput, Select, Textarea, Button, Group, NumberInput } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { IconCalendar, IconChevronDown } from '@tabler/icons-react';
import { showNotification } from '@mantine/notifications';

export default function CreateJobModal({ opened, onClose, onJobCreated }) {
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm();

  /* TODO: Verify all modal and form styles from Figma:
     - Modal width
     - Modal padding
     - Modal border radius
     - Form field spacing
     - Button styles
     - Input field styles
     - Font family (Satoshi Variable)
  */

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      // Format data for API
      const formattedData = {
        ...data,
        salaryMin: parseFloat(data.salaryMin) || 0,
        salaryMax: parseFloat(data.salaryMax) || 0,
        applicationDeadline: selectedDate 
          ? selectedDate.toISOString().split('T')[0] 
          : new Date().toISOString().split('T')[0],
      };

      await onJobCreated(formattedData);
      
      // Show success notification
      showNotification({
        title: 'Success!',
        message: 'Job created successfully',
        color: 'green',
      });

      // Reset form and close modal
      reset();
      setSelectedDate(null);
      onClose();
    } catch (error) {
      console.error('Error creating job:', error);
      showNotification({
        title: 'Error',
        message: error.response?.data?.message || 'Failed to create job',
        color: 'red',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    reset();
    setSelectedDate(null);
    onClose();
  };

  return (
    <Modal
      opened={opened}
      onClose={handleClose}
      title={
        /* TODO: Verify from Figma:
           - Title font family (Satoshi Variable)
           - Title font size
           - Title font weight
           - Title color
        */
        <span style={{
          fontFamily: 'Satoshi Variable, -apple-system, sans-serif', /* TODO: Verify from Figma */
          fontSize: '24px',        /* TODO: Verify from Figma */
          fontWeight: 600,         /* TODO: Verify from Figma */
          color: '#111827',        /* TODO: Verify from Figma */
        }}>
          Create Job Opening
        </span>
      }
      size="lg"                    /* TODO: Verify modal width from Figma (appears ~800px) */
      centered
      overlayProps={{
        opacity: 0.55,
        blur: 3,
      }}
      styles={{
        modal: {
          /* TODO: Verify from Figma */
          borderRadius: '16px',    /* TODO: Verify border radius from Figma */
          padding: '32px',         /* TODO: Verify padding from Figma */
        },
        header: {
          paddingBottom: '24px',   /* TODO: Verify from Figma */
          borderBottom: '1px solid #E5E7EB',
          marginBottom: '24px',
        },
        title: {
          fontFamily: 'Satoshi Variable, -apple-system, sans-serif',
        }
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Row 1: Job Title and Company Name */}
        <Group grow mb="md" align="flex-start">
          {/* Job Title */}
          {/* TODO: Verify from Figma:
              - Input height
              - Border radius
              - Border color
              - Font family (Satoshi Variable)
              - Font size
              - Label font size
              - Label font weight
              - Label color
          */}
          <div>
            <label style={{
              fontFamily: 'Satoshi Variable, -apple-system, sans-serif', /* TODO: Verify from Figma */
              fontSize: '14px',      /* TODO: Verify from Figma */
              fontWeight: 500,       /* TODO: Verify from Figma */
              color: '#374151',      /* TODO: Verify from Figma */
              display: 'block',
              marginBottom: '8px',   /* TODO: Verify from Figma */
            }}>
              Job Title
            </label>
            <TextInput
              placeholder="Full Stack Develo"
              {...register('jobTitle', { required: 'Job title is required' })}
              error={errors.jobTitle?.message}
              styles={{
                input: {
                  fontFamily: 'Satoshi Variable, -apple-system, sans-serif', /* TODO: Verify from Figma */
                  fontSize: '14px',    /* TODO: Verify from Figma */
                  height: '44px',      /* TODO: Verify from Figma */
                  borderRadius: '8px', /* TODO: Verify from Figma */
                  borderColor: '#E5E7EB',  /* TODO: Verify from Figma */
                  '&:focus': {
                    borderColor: '#7C3AED',
                  }
                }
              }}
            />
          </div>

          {/* Company Name */}
          <div>
            <label style={{
              fontFamily: 'Satoshi Variable, -apple-system, sans-serif',
              fontSize: '14px',
              fontWeight: 500,
              color: '#374151',
              display: 'block',
              marginBottom: '8px',
            }}>
              Company Name
            </label>
            <TextInput
              placeholder="Amazon, Microsoft, Swiggy"
              {...register('companyName', { required: 'Company name is required' })}
              error={errors.companyName?.message}
              styles={{
                input: {
                  fontFamily: 'Satoshi Variable, -apple-system, sans-serif',
                  fontSize: '14px',
                  height: '44px',
                  borderRadius: '8px',
                  borderColor: '#E5E7EB',
                  color: '#9CA3AF',    /* TODO: Verify placeholder color from Figma */
                  '&:focus': {
                    borderColor: '#7C3AED',
                  }
                }
              }}
            />
          </div>
        </Group>

        {/* Row 2: Location and Job Type */}
        <Group grow mb="md" align="flex-start">
          {/* Location */}
          {/* TODO: Verify from Figma:
              - Dropdown styles
              - Placeholder text
              - Chevron icon
          */}
          <div>
            <label style={{
              fontFamily: 'Satoshi Variable, -apple-system, sans-serif',
              fontSize: '14px',
              fontWeight: 500,
              color: '#374151',
              display: 'block',
              marginBottom: '8px',
            }}>
              Location
            </label>
            <Select
              placeholder="Choose Preferred Location"
              rightSection={<IconChevronDown size={16} />}
              data={[
                'Chennai',
                'Bangalore',
                'Mumbai',
                'Delhi',
                'Hyderabad',
                'Pune',
                'Kolkata',
                'Ahmedabad',
              ]}
              {...register('location', { required: 'Location is required' })}
              onChange={(value) => setValue('location', value)}
              error={errors.location?.message}
              styles={{
                input: {
                  fontFamily: 'Satoshi Variable, -apple-system, sans-serif',
                  fontSize: '14px',
                  height: '44px',
                  borderRadius: '8px',
                  borderColor: '#E5E7EB',
                  '&:focus': {
                    borderColor: '#7C3AED',
                  }
                }
              }}
            />
          </div>

          {/* Job Type */}
          {/* TODO: Verify from Figma:
              - Dropdown height
              - Options list styling
              - Selected state styling
          */}
          <div>
            <label style={{
              fontFamily: 'Satoshi Variable, -apple-system, sans-serif',
              fontSize: '14px',
              fontWeight: 500,
              color: '#374151',
              display: 'block',
              marginBottom: '8px',
            }}>
              Job Type
            </label>
            <Select
              placeholder="FullTime"
              rightSection={<IconChevronDown size={16} />}
              data={[
                { value: 'Full-time', label: 'Full Time' },
                { value: 'Part-time', label: 'Partime' },
                { value: 'Internship', label: 'Internship' },
                { value: 'Contract', label: 'Contract' },
              ]}
              {...register('jobType', { required: 'Job type is required' })}
              onChange={(value) => setValue('jobType', value)}
              error={errors.jobType?.message}
              styles={{
                input: {
                  fontFamily: 'Satoshi Variable, -apple-system, sans-serif',
                  fontSize: '14px',
                  height: '44px',
                  borderRadius: '8px',
                  borderColor: '#E5E7EB',
                  '&:focus': {
                    borderColor: '#7C3AED',
                  }
                }
              }}
            />
          </div>
        </Group>

        {/* Row 3: Salary Range and Application Deadline */}
        <Group grow mb="md" align="flex-start">
          {/* Salary Range */}
          <div>
            <label style={{
              fontFamily: 'Satoshi Variable, -apple-system, sans-serif',
              fontSize: '14px',
              fontWeight: 500,
              color: '#374151',
              display: 'block',
              marginBottom: '8px',
            }}>
              Salary Range
            </label>
            <Group spacing="xs" grow>
              {/* Min Salary */}
              {/* TODO: Verify from Figma:
                  - Rupee icon style
                  - Input width
                  - Placeholder format
              */}
              <NumberInput
                placeholder="₹ 0"
                min={0}
                hideControls
                {...register('salaryMin', { required: 'Min salary is required' })}
                onChange={(value) => setValue('salaryMin', value)}
                error={errors.salaryMin?.message}
                icon={<span style={{ color: '#9CA3AF' }}>₹</span>}
                styles={{
                  input: {
                    fontFamily: 'Satoshi Variable, -apple-system, sans-serif',
                    fontSize: '14px',
                    height: '44px',
                    borderRadius: '8px',
                    borderColor: '#E5E7EB',
                    '&:focus': {
                      borderColor: '#7C3AED',
                    }
                  }
                }}
              />

              {/* Max Salary */}
              <NumberInput
                placeholder="₹ 12,00,000"
                min={0}
                hideControls
                {...register('salaryMax', { required: 'Max salary is required' })}
                onChange={(value) => setValue('salaryMax', value)}
                error={errors.salaryMax?.message}
                icon={<span style={{ color: '#9CA3AF' }}>₹</span>}
                styles={{
                  input: {
                    fontFamily: 'Satoshi Variable, -apple-system, sans-serif',
                    fontSize: '14px',
                    height: '44px',
                    borderRadius: '8px',
                    borderColor: '#E5E7EB',
                    '&:focus': {
                      borderColor: '#7C3AED',
                    }
                  }
                }}
              />
            </Group>
          </div>

          {/* Application Deadline */}
          {/* TODO: Verify from Figma:
              - Calendar icon size
              - Date picker styling
              - Date format
          */}
          <div>
            <label style={{
              fontFamily: 'Satoshi Variable, -apple-system, sans-serif',
              fontSize: '14px',
              fontWeight: 500,
              color: '#374151',
              display: 'block',
              marginBottom: '8px',
            }}>
              Application Deadline
            </label>
            <DatePickerInput
              placeholder="Pick a date"
              value={selectedDate}
              onChange={setSelectedDate}
              icon={<IconCalendar size={18} color="#9CA3AF" />}
              minDate={new Date()}
              styles={{
                input: {
                  fontFamily: 'Satoshi Variable, -apple-system, sans-serif',
                  fontSize: '14px',
                  height: '44px',
                  borderRadius: '8px',
                  borderColor: '#E5E7EB',
                  '&:focus': {
                    borderColor: '#7C3AED',
                  }
                }
              }}
            />
          </div>
        </Group>

        {/* Job Description */}
        {/* TODO: Verify from Figma:
            - Textarea height
            - Textarea min rows
            - Border radius
            - Placeholder text
            - Resize handle visibility
        */}
        <div style={{ marginBottom: '24px' }}>
          <label style={{
            fontFamily: 'Satoshi Variable, -apple-system, sans-serif',
            fontSize: '14px',
            fontWeight: 500,
            color: '#374151',
            display: 'block',
            marginBottom: '8px',
          }}>
            Job Description
          </label>
          <Textarea
            placeholder="Please share a description to let the candidate know more about the job role"
            minRows={6}              /* TODO: Verify from Figma */
            {...register('jobDescription', { required: 'Job description is required' })}
            error={errors.jobDescription?.message}
            styles={{
              input: {
                fontFamily: 'Satoshi Variable, -apple-system, sans-serif',
                fontSize: '14px',    /* TODO: Verify from Figma */
                borderRadius: '8px', /* TODO: Verify from Figma */
                borderColor: '#E5E7EB',
                resize: 'none',      /* TODO: Check if resize is allowed in Figma */
                '&:focus': {
                  borderColor: '#7C3AED',
                }
              }
            }}
          />
        </div>

        {/* Action Buttons */}
        {/* TODO: Verify from Figma:
            - Button spacing
            - Button heights
            - Button border radius
            - Font family (Satoshi Variable)
            - Font size
            - Font weight
            - Save Draft button style (outline)
            - Publish button style (filled)
            - Button colors
        */}
        <Group position="apart" mt="xl">
          {/* Save Draft Button */}
          <Button
            variant="outline"
            size="md"
            rightIcon={<IconChevronDown size={16} />}
            style={{
              fontFamily: 'Satoshi Variable, -apple-system, sans-serif', /* TODO: Verify from Figma */
              fontSize: '15px',      /* TODO: Verify from Figma */
              fontWeight: 600,       /* TODO: Verify from Figma */
              borderColor: '#E5E7EB',  /* TODO: Verify from Figma */
              color: '#374151',      /* TODO: Verify from Figma */
              borderRadius: '8px',   /* TODO: Verify from Figma */
              height: '46px',        /* TODO: Verify from Figma */
              padding: '0 24px',     /* TODO: Verify from Figma */
            }}
            onClick={handleClose}
          >
            Save Draft
          </Button>

          {/* Publish Button */}
          <Button
            type="submit"
            size="md"
            loading={loading}
            rightIcon={<span style={{ marginLeft: '4px' }}>»</span>}
            style={{
              fontFamily: 'Satoshi Variable, -apple-system, sans-serif', /* TODO: Verify from Figma */
              fontSize: '15px',      /* TODO: Verify from Figma */
              fontWeight: 600,       /* TODO: Verify from Figma */
              backgroundColor: '#00A8E8',  /* TODO: Verify exact cyan hex from Figma */
              borderRadius: '8px',   /* TODO: Verify from Figma */
              height: '46px',        /* TODO: Verify from Figma */
              padding: '0 32px',     /* TODO: Verify from Figma */
            }}
            styles={{
              root: {
                '&:hover': {
                  backgroundColor: '#0090C8',  /* TODO: Verify hover color from Figma */
                }
              }
            }}
          >
            Publish
          </Button>
        </Group>
      </form>
    </Modal>
  );
}