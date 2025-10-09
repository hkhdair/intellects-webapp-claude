import React from 'react';
import { motion } from 'framer-motion';
import { X, MapPin, Briefcase, Calendar, DollarSign, Building2, ExternalLink, FileText } from 'lucide-react';
import { JobListing } from '../../types/job';

interface JobDetailsProps {
  job: JobListing;
  onClose: () => void;
  onScreenResume: () => void;
}

const JobDetails: React.FC<JobDetailsProps> = ({ job, onClose, onScreenResume }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const formatSalary = () => {
    if (job.job_min_salary && job.job_max_salary) {
      return `$${(job.job_min_salary / 1000).toFixed(0)}K - $${(job.job_max_salary / 1000).toFixed(0)}K ${job.job_salary_period || 'per year'}`;
    }
    return 'Not specified';
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="bg-background-light border border-gray-700 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-gray-700">
          <div className="flex items-start gap-4 flex-1">
            {job.employer_logo ? (
              <img
                src={job.employer_logo}
                alt={`${job.employer_name} logo`}
                className="w-16 h-16 rounded-lg object-contain bg-white p-2"
              />
            ) : (
              <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <Building2 className="text-white" size={32} />
              </div>
            )}
            
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-text-primary mb-2">
                {job.job_title}
              </h2>
              <div className="flex items-center gap-2 text-text-secondary mb-3">
                <Building2 size={18} />
                <span className="font-medium text-lg">{job.employer_name}</span>
              </div>
            </div>
          </div>
          
          <button
            onClick={onClose}
            className="text-text-secondary hover:text-white transition-colors p-2"
            aria-label="Close job details"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto flex-1 p-6">
          {/* Job Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="flex items-center gap-2 text-text-secondary">
              <MapPin size={18} className="text-primary" />
              <span>
                {job.job_is_remote 
                  ? 'Remote' 
                  : `${job.job_city ? job.job_city + ', ' : ''}${job.job_state || job.job_country}`
                }
              </span>
            </div>
            
            <div className="flex items-center gap-2 text-text-secondary">
              <Briefcase size={18} className="text-primary" />
              <span>{job.job_employment_type}</span>
            </div>
            
            <div className="flex items-center gap-2 text-text-secondary">
              <Calendar size={18} className="text-primary" />
              <span>Posted: {formatDate(job.job_posted_at_datetime_utc)}</span>
            </div>
            
            <div className="flex items-center gap-2 text-text-secondary">
              <DollarSign size={18} className="text-primary" />
              <span>{formatSalary()}</span>
            </div>
          </div>

          {/* Benefits */}
          {job.job_benefits && job.job_benefits.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-text-primary mb-3">Benefits</h3>
              <div className="flex flex-wrap gap-2">
                {job.job_benefits.map((benefit, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full"
                  >
                    {benefit.replace('_', ' ')}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Job Highlights */}
          {job.job_highlights && (
            <div className="space-y-4 mb-6">
              {job.job_highlights.Qualifications && (
                <div>
                  <h3 className="text-lg font-semibold text-text-primary mb-3">Qualifications</h3>
                  <ul className="list-disc list-inside space-y-2 text-text-secondary">
                    {job.job_highlights.Qualifications.slice(0, 8).map((qual, index) => (
                      <li key={index}>{qual}</li>
                    ))}
                  </ul>
                </div>
              )}

              {job.job_highlights.Responsibilities && (
                <div>
                  <h3 className="text-lg font-semibold text-text-primary mb-3">Responsibilities</h3>
                  <ul className="list-disc list-inside space-y-2 text-text-secondary">
                    {job.job_highlights.Responsibilities.slice(0, 8).map((resp, index) => (
                      <li key={index}>{resp}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Full Description */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-text-primary mb-3">Job Description</h3>
            <div className="text-text-secondary whitespace-pre-line leading-relaxed">
              {job.job_description}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="border-t border-gray-700 p-6 flex flex-col sm:flex-row gap-3 flex-shrink-0">
          <button
            onClick={onScreenResume}
            className="flex-1 btn-primary flex items-center justify-center gap-2"
          >
            <FileText size={20} />
            Screen My Resume
          </button>
          
          <a
            href={job.job_apply_link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 btn-outline flex items-center justify-center gap-2"
          >
            <ExternalLink size={20} />
            Apply on {job.job_publisher}
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default JobDetails;
