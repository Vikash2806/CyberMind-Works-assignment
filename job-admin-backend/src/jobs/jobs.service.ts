import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, Between } from 'typeorm';
import { Job } from './entities/job.entity';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { FilterJobDto } from './dto/filter-job.dto';

@Injectable()
export class JobsService {
  constructor(
    @InjectRepository(Job)
    private jobsRepository: Repository<Job>,
  ) {}

  // Create a new job
  async create(createJobDto: CreateJobDto): Promise<Job> {
    const job = this.jobsRepository.create(createJobDto);
    return await this.jobsRepository.save(job);
  }

  // Get all jobs with optional filters
  async findAll(filterDto: FilterJobDto): Promise<Job[]> {
    const { jobTitle, location, jobType, salaryMin, salaryMax } = filterDto;

    const queryBuilder = this.jobsRepository.createQueryBuilder('job');

    // Filter by job title (partial match)
    if (jobTitle) {
      queryBuilder.andWhere('job.jobTitle ILIKE :jobTitle', {
        jobTitle: `%${jobTitle}%`,
      });
    }

    // Filter by location (partial match)
    if (location) {
      queryBuilder.andWhere('job.location ILIKE :location', {
        location: `%${location}%`,
      });
    }

    // Filter by job type (exact match)
    if (jobType) {
      queryBuilder.andWhere('job.jobType = :jobType', { jobType });
    }

    // Filter by salary range
    if (salaryMin !== undefined) {
      queryBuilder.andWhere('job.salaryMax >= :salaryMin', { salaryMin });
    }

    if (salaryMax !== undefined) {
      queryBuilder.andWhere('job.salaryMin <= :salaryMax', { salaryMax });
    }

    // Order by creation date (newest first)
    queryBuilder.orderBy('job.createdAt', 'DESC');

    return await queryBuilder.getMany();
  }

  // Get a single job by ID
  async findOne(id: string): Promise<Job> {
    const job = await this.jobsRepository.findOne({ where: { id } });
    if (!job) {
      throw new NotFoundException(`Job with ID ${id} not found`);
    }
    return job;
  }

  // Update a job
  async update(id: string, updateJobDto: UpdateJobDto): Promise<Job> {
    const job = await this.findOne(id);
    Object.assign(job, updateJobDto);
    return await this.jobsRepository.save(job);
  }

  // Delete a job
  async remove(id: string): Promise<void> {
    const result = await this.jobsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Job with ID ${id} not found`);
    }
  }
}