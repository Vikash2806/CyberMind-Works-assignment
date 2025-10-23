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

  /* TODO: Verify from Figma:
     - Page background color
     - Container max width
     - Grid gap between cards
     - Number of columns at different breakpoints
  */

  const handleCreateJob = async (jobData) => {
    await createJob(jobData);
    setModalOpened(false);
  };

  const handleFilterChange = (newFilters) => {
    updateFilters(newFilters);
  };

  return (
    <div style={{
      /* TODO: Verify from Figma */
      backgroundColor: '#F5F5F5',  /* TODO: Verify page background from Figma */
      minHeight: '100vh',
    }}>
      {/* Navbar */}
      <Navbar onCreateJobClick={() => setModalOpened(true)} />

      {/* Filters */}
      <Filters onFilterChange={handleFilterChange} />

      {/* Job List */}
      <Container size="xl" py="xl">
        {loading ? (
          <Center style={{ minHeight: '400px' }}>
            <Stack align="center" spacing="md">
              <Loader size="lg" color="brand" />
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
          /* Job Grid */
          /* TODO: Verify from Figma:
              - Grid columns (appears to be 4 columns)
              - Gap between cards (appears to be ~24px)
              - Breakpoints for responsive design
          */
          <SimpleGrid
            cols={4}                 /* TODO: Verify from Figma - appears to be 4 columns */
            spacing="xl"             /* TODO: Verify gap from Figma (~24px) */
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