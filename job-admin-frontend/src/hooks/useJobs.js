"use client";

import { useState, useEffect } from 'react';
import { jobsAPI } from '@/services/api';

export function useJobs(initialFilters = {}) {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState(initialFilters);

  // Fetch jobs whenever filters change
  useEffect(() => {
    fetchJobs();
  }, [filters]);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await jobsAPI.getAllJobs(filters);
      setJobs(data);
    } catch (err) {
      console.error('Error fetching jobs:', err);
      setError(err.message || 'Failed to fetch jobs');
    } finally {
      setLoading(false);
    }
  };

  const createJob = async (jobData) => {
    try {
      const newJob = await jobsAPI.createJob(jobData);
      setJobs([newJob, ...jobs]); // Add to beginning
      return newJob;
    } catch (err) {
      console.error('Error creating job:', err);
      throw err;
    }
  };

  const updateJob = async (id, jobData) => {
    try {
      const updatedJob = await jobsAPI.updateJob(id, jobData);
      setJobs(jobs.map(job => job.id === id ? updatedJob : job));
      return updatedJob;
    } catch (err) {
      console.error('Error updating job:', err);
      throw err;
    }
  };

  const deleteJob = async (id) => {
    try {
      await jobsAPI.deleteJob(id);
      setJobs(jobs.filter(job => job.id !== id));
    } catch (err) {
      console.error('Error deleting job:', err);
      throw err;
    }
  };

  const updateFilters = (newFilters) => {
    setFilters({ ...filters, ...newFilters });
  };

  const resetFilters = () => {
    setFilters({});
  };

  return {
    jobs,
    loading,
    error,
    filters,
    createJob,
    updateJob,
    deleteJob,
    updateFilters,
    resetFilters,
    refetch: fetchJobs,
  };
}