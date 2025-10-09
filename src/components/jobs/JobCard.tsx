import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Briefcase, Calendar, DollarSign, Building2 } from 'lucide-react';
import { JobListing } from '../../types/job';

interface JobCardProps {
  job: JobListing;
  onClick: () => void;
}

const JobCard: React.FC<JobCardProps> = ({ job, onClick }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return 'Today';
    if (diffInDays === 1) return 'Yesterday';
    if (diffInDays < 7) return `${diffInDays} days ago`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
    return date.toLocaleDateString();
  };

  const formatSalary = () => {
    if (job.job_min_salary && job.job_max_salary) {
      return `$${(job.job_min_salary / 1000).toFixed(0)}K - $${(job.job_max_salary / 1000).toFixed(0)}K`;
    }
    return null;
  };

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
        {job.employer_logo ? (
          <img
            src={job.employer_logo}
            alt={`${job.employer_name} logo`}
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
            <span className="font-medium">{job.employer_name}</span>
          </div>

          <div className="flex flex-wrap gap-4 text-sm text-text-secondary mb-3">
            <div className="flex items-center gap-1">
              <MapPin size={16} className="text-primary" />
              <span>
                {job.job_is_remote 
                  ? 'Remote' 
                  : `${job.job_city ? job.job_city + ', ' : ''}${job.job_state || job.job_country}`
                }
              </span>
            </div>
            
            <div className="flex items-center gap-1">
              <Briefcase size={16} className="text-primary" />
              <span>{job.job_employment_type}</span>
            </div>
            
            <div className="flex items-center gap-1">
              <Calendar size={16} className="text-primary" />
              <span>{formatDate(job.job_posted_at_datetime_utc)}</span>
            </div>
            
            {formatSalary() && (
              <div className="flex items-center gap-1">
                <DollarSign size={16} className="text-primary" />
                <span>{formatSalary()}</span>
              </div>
            )}
          </div>

          <p className="text-text-secondary line-clamp-2 mb-3">
            {job.job_description.substring(0, 200)}...
          </p>

          {job.job_benefits && job.job_benefits.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {job.job_benefits.slice(0, 3).map((benefit, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full"
                >
                  {benefit.replace('_', ' ')}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default JobCard;
