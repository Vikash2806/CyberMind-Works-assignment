"use client";

import { useState } from 'react';
import { Container, SimpleGrid, Loader, Center, Text, Stack } from '@mantine/core';
import Navbar from '@/components/layout/Navbar';
import Filters from '@/components/features/Filters';
import JobCard from '@/components/features/JobCard';
import CreateJobModal from '@/components/features/CreateJobModal';
import { useJobs } from '@/hooks/useJobs';

export default function HomePage() {
  const [modalOpened, setModalOpened] = useState(false);
  const { jobs, loading, error, createJob, updateFilters } = useJobs();

  const handleCreateJob = async (jobData) => {
    await createJob(jobData);
    setModalOpened(false);
  };

  const handleFilterChange = (newFilters) => {
    updateFilters(newFilters);
  };

  return (
    <div style={{
      backgroundColor: '#F9FAFB',
      minHeight: '100vh',
    }}>
      {/* Header Section - Navbar + Filters Combined */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderBottom: '1px solid #E5E7EB',
          position: 'sticky',
          top: 0,
          zIndex: 100,
        }}
      >
        {/* Navbar */}
        <Navbar onCreateJobClick={() => setModalOpened(true)} />

        {/* Filters */}
        <Filters onFilterChange={handleFilterChange} />
      </div>

      {/* Job List */}
      <Container size="xl" style={{ paddingTop: '40px', paddingBottom: '40px' }}>
        {loading ? (
          <Center style={{ minHeight: '400px' }}>
            <Stack align="center" spacing="md">
              <Loader size="lg" color="#7C3AED" />
              <Text 
                color="dimmed"
                style={{
                  fontFamily: 'Satoshi Variable, -apple-system, sans-serif',
                  fontSize: '14px',
                }}
              >
                Loading jobs...
              </Text>
            </Stack>
          </Center>
        ) : error ? (
          <Center style={{ minHeight: '400px' }}>
            <Stack align="center" spacing="md">
              <Text 
                color="red" 
                size="lg"
                style={{
                  fontFamily: 'Satoshi Variable, -apple-system, sans-serif',
                }}
              >
                Error: {error}
              </Text>
              <Text 
                color="dimmed"
                style={{
                  fontFamily: 'Satoshi Variable, -apple-system, sans-serif',
                }}
              >
                Please try again later or check your backend connection.
              </Text>
            </Stack>
          </Center>
        ) : jobs.length === 0 ? (
          <Center style={{ minHeight: '400px' }}>
            <Stack align="center" spacing="md">
              <Text 
                size="lg" 
                color="dimmed"
                style={{
                  fontFamily: 'Satoshi Variable, -apple-system, sans-serif',
                }}
              >
                No jobs found
              </Text>
              <Text 
                color="dimmed"
                style={{
                  fontFamily: 'Satoshi Variable, -apple-system, sans-serif',
                }}
              >
                Try adjusting your filters or create a new job posting.
              </Text>
            </Stack>
          </Center>
        ) : (
          <SimpleGrid
            cols={4}
            spacing={24}
            breakpoints={[
              { maxWidth: 'xl', cols: 4 },
              { maxWidth: 'lg', cols: 3 },
              { maxWidth: 'md', cols: 2 },
              { maxWidth: 'sm', cols: 1 },
            ]}
          >
            {jobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </SimpleGrid>
        )}
      </Container>

      {/* Create Job Modal */}
      <CreateJobModal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        onJobCreated={handleCreateJob}
      />
    </div>
  );
}