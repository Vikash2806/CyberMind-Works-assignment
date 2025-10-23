import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('jobs')
export class Job {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 200 })
  jobTitle: string;

  @Column({ length: 200 })
  companyName: string;

  @Column({ length: 200 })
  location: string;

  @Column({
    type: 'enum',
    enum: ['Full-time', 'Part-time', 'Contract', 'Internship'],
  })
  jobType: string;

  // Salary Range - Min and Max
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  salaryMin: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  salaryMax: number;

  @Column('text')
  jobDescription: string;

  @Column({ type: 'date' })
  applicationDeadline: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}