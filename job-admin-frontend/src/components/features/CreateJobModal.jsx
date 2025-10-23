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

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const formattedData = {
        ...data,
        salaryMin: parseFloat(data.salaryMin) || 0,
        salaryMax: parseFloat(data.salaryMax) || 0,
        applicationDeadline: selectedDate 
          ? selectedDate.toISOString().split('T')[0] 
          : new Date().toISOString().split('T')[0],
      };

      await onJobCreated(formattedData);

      showNotification({
        title: 'Success!',
        message: 'Job created successfully',
        color: 'green',
      });

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
        <span style={{
          fontFamily: 'Satoshi Variable, -apple-system, sans-serif',
          fontSize: '24px',
          fontWeight: 600,
          color: '#111827',
        }}>
          Create Job Opening
        </span>
      }
      size="lg"
      centered
      overlayProps={{
        opacity: 0.55,
        blur: 3,
      }}
      styles={{
        modal: {
          borderRadius: '16px',
          padding: '32px',
        },
        header: {
          paddingBottom: '24px',
          borderBottom: '1px solid #E5E7EB',
          marginBottom: '24px',
          display: 'flex',
          justifyContent: 'center', // centers the title horizontally
          alignItems: 'center',
          position: 'relative',
        },
        title: {
          fontFamily: 'Satoshi Variable, -apple-system, sans-serif',
          textAlign: 'center', // ensures text alignment is centered
          width: '100%',
        },
        close: {
          position: 'absolute',
          right: 16, // keeps the close button on the right
    },
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Row 1: Job Title and Company Name */}
        <Group grow mb="md" align="flex-start">
          <div>
            <label style={{
              fontFamily: 'Satoshi Variable, -apple-system, sans-serif',
              fontSize: '14px',
              fontWeight: 500,
              color: '#374151',
              display: 'block',
              marginBottom: '8px',
            }}>
              Job Title
            </label>
            <TextInput
              placeholder="Full Stack Developer"
              {...register('jobTitle', { required: 'Job title is required' })}
              error={errors.jobTitle?.message}
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
                  color: '#9CA3AF',
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
              <NumberInput
                placeholder="₹0"
                min={0}
                hideControls
                {...register('salaryMin', { required: 'Min salary is required' })}
                onChange={(value) => setValue('salaryMin', value)}
                error={errors.salaryMin?.message}
                icon={<span style={{ color: '#9CA3AF' }}>↓↑</span>}
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

              <NumberInput
                placeholder="₹12,00,000"
                min={0}
                hideControls
                {...register('salaryMax', { required: 'Max salary is required' })}
                onChange={(value) => setValue('salaryMax', value)}
                error={errors.salaryMax?.message}
                icon={<span style={{ color: '#9CA3AF' }}>↓↑</span>}
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
            minRows={6}
            {...register('jobDescription', { required: 'Job description is required' })}
            error={errors.jobDescription?.message}
            styles={{
              input: {
                fontFamily: 'Satoshi Variable, -apple-system, sans-serif',
                fontSize: '14px',
                borderRadius: '8px',
                borderColor: '#E5E7EB',
                resize: 'none',
                '&:focus': {
                  borderColor: '#7C3AED',
                }
              }
            }}
          />
        </div>

        {/* Action Buttons */}
        <Group position="apart" mt="xl">
          <Button
            variant="outline"
            size="md"
            rightIcon={<IconChevronDown size={16} />}
            style={{
              fontFamily: 'Satoshi Variable, -apple-system, sans-serif',
              fontSize: '15px',
              fontWeight: 600,
              borderColor: '#E5E7EB',
              color: '#374151',
              borderRadius: '8px',
              height: '46px',
              padding: '0 24px',
            }}
            onClick={handleClose}
          >
            Save Draft
          </Button>

          <Button
            type="submit"
            size="md"
            loading={loading}
            rightIcon={<span style={{ marginLeft: '4px' }}>»</span>}
            style={{
              fontFamily: 'Satoshi Variable, -apple-system, sans-serif',
              fontSize: '15px',
              fontWeight: 600,
              backgroundColor: '#00A8E8',
              borderRadius: '8px',
              height: '46px',
              padding: '0 32px',
            }}
            styles={{
              root: {
                '&:hover': {
                  backgroundColor: '#0090C8',
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
