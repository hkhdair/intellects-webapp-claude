import React from 'react';
import { motion } from 'framer-motion';
import { X, MapPin, Briefcase, Calendar, DollarSign, Building2, ExternalLink, FileText, Users, Award, Layers } from 'lucide-react';
import { JobListing } from '../../types/job';

interface JobDetailsProps {
  job: JobListing;
  onClose: () => void;
  onScreenResume: () => void;
}

const JobDetails: React.FC<JobDetailsProps> = ({ job, onClose, onScreenResume }) => {
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
            {job.company_logo_url ? (
              <img
                src={job.company_logo_url}
                alt={`${job.company_name} logo`}
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
                <a 
                  href={job.company_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="font-medium text-lg hover:text-primary transition-colors"
                >
                  {job.company_name}
                </a>
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
              <span>{job.location}</span>
            </div>
            
            <div className="flex items-center gap-2 text-text-secondary">
              <Briefcase size={18} className="text-primary" />
              <span>{job.employment_type}</span>
            </div>
            
            <div className="flex items-center gap-2 text-text-secondary">
              <Calendar size={18} className="text-primary" />
              <span>Posted: {job.time_posted}</span>
            </div>
            
            <div className="flex items-center gap-2 text-text-secondary">
              <DollarSign size={18} className="text-primary" />
              <span>{job.salary_range || 'Not specified'}</span>
            </div>

            {job.seniority_level && (
              <div className="flex items-center gap-2 text-text-secondary">
                <Award size={18} className="text-primary" />
                <span>{job.seniority_level}</span>
              </div>
            )}

            {job.job_function && (
              <div className="flex items-center gap-2 text-text-secondary">
                <Layers size={18} className="text-primary" />
                <span>{job.job_function}</span>
              </div>
            )}

            {job.industries && (
              <div className="flex items-center gap-2 text-text-secondary">
                <Building2 size={18} className="text-primary" />
                <span>{job.industries}</span>
              </div>
            )}
          </div>

          {/* Full Description */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-text-primary mb-3">Job Description</h3>
            <div className="text-text-secondary leading-relaxed bg-white/5 p-4 rounded-lg">
              {job.job_description_raw_html ? (
                <div 
                  className="prose prose-invert prose-sm max-w-none job-description-content"
                  dangerouslySetInnerHTML={{ __html: job.job_description_raw_html }}
                />
              ) : job.job_description ? (
                <p className="whitespace-pre-line">{job.job_description}</p>
              ) : (
                <p className="text-text-muted">No description available</p>
              )}
            </div>
          </div>
          
          <style>{`
            .job-description-content .show-more-less-html__button,
            .job-description-content button {
              display: none !important;
            }
          `}</style>
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
            href={job.apply_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 btn-outline flex items-center justify-center gap-2"
          >
            <ExternalLink size={20} />
            {job.easy_apply ? 'Easy Apply on LinkedIn' : 'View on LinkedIn'}
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default JobDetails;
