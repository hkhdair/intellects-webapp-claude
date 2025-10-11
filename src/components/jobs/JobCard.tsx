import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Briefcase, Calendar, DollarSign, Building2, Users } from 'lucide-react';
import { JobListing } from '../../types/job';

interface JobCardProps {
  job: JobListing;
  onClick: () => void;
}

const JobCard: React.FC<JobCardProps> = ({ job, onClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      className="bg-background-light border border-gray-700 rounded-lg p-6 cursor-pointer hover:border-primary transition-all"
      onClick={onClick}
    >
      <div className="flex items-start gap-4">
        {job.company_logo_url ? (
          <img
            src={job.company_logo_url}
            alt={`${job.company_name} logo`}
            className="w-12 h-12 rounded-lg object-contain bg-white p-1"
          />
        ) : (
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
            <Building2 className="text-white" size={24} />
          </div>
        )}
        
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-text-primary mb-2 hover:text-primary transition-colors">
            {job.job_title}
          </h3>
          
          <div className="flex items-center gap-2 text-text-secondary mb-3">
            <Building2 size={16} />
            <span className="font-medium">{job.company_name}</span>
          </div>

          <div className="flex flex-wrap gap-4 text-sm text-text-secondary mb-3">
            <div className="flex items-center gap-1">
              <MapPin size={16} className="text-primary" />
              <span>{job.location}</span>
            </div>
            
            <div className="flex items-center gap-1">
              <Briefcase size={16} className="text-primary" />
              <span>{job.employment_type}</span>
            </div>
            
            <div className="flex items-center gap-1">
              <Calendar size={16} className="text-primary" />
              <span>{job.time_posted}</span>
            </div>
            
            {job.salary_range && (
              <div className="flex items-center gap-1">
                <DollarSign size={16} className="text-primary" />
                <span>{job.salary_range}</span>
              </div>
            )}
          </div>

          {job.job_description && (
            <p className="text-text-secondary line-clamp-2 mb-3">
              {job.job_description.substring(0, 200)}...
            </p>
          )}

          <div className="flex flex-wrap gap-2">
            {job.seniority_level && (
              <span className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full">
                {job.seniority_level}
              </span>
            )}
            {job.job_function && (
              <span className="px-3 py-1 bg-secondary/10 text-secondary text-xs rounded-full">
                {job.job_function}
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default JobCard;
