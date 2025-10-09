import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Briefcase, Loader2, AlertCircle } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';
import JobSearch, { SearchFilters } from './jobs/JobSearch';
import JobCard from './jobs/JobCard';
import JobDetails from './jobs/JobDetails';
import ResumeScreening from './jobs/ResumeScreening';
import { searchJobs } from '../utils/jobApi';
import { JobListing } from '../types/job';

const JobsScreeningPage: React.FC = () => {
  const [jobs, setJobs] = useState<JobListing[]>([]);
  const [selectedJob, setSelectedJob] = useState<JobListing | null>(null);
  const [showResumeScreening, setShowResumeScreening] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (query: string, filters: SearchFilters) => {
    setLoading(true);
    setError(null);
    setHasSearched(true);
    
    try {
      const response = await searchJobs({
        query,
        page: 1,
        num_pages: 1,
        location: filters.location,
        date_posted: filters.date_posted,
      });

      setJobs(response.data);

      if (response.data.length === 0) {
        setError('No jobs found. Try adjusting your search criteria.');
      }
    } catch (err) {
      setError('Failed to fetch jobs. Please try again later.');
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleJobClick = (job: JobListing) => {
    setSelectedJob(job);
  };

  const handleScreenResume = () => {
    setShowResumeScreening(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background-dark">
      <Header />
      
      <main className="flex-1 pt-24 pb-16">
        {/* Hero Section */}
        <section className="container py-12">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-text-secondary hover:text-primary transition-colors mb-6"
          >
            <ArrowLeft size={20} />
            Back to Home
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <Briefcase className="text-white" size={24} />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold">
                <span className="gradient-text">Job Search & Screening</span>
              </h1>
            </div>
            
            <p className="text-xl text-text-secondary mb-8 max-w-3xl">
              Find your next opportunity and screen your resume with AI-powered analysis
            </p>
          </motion.div>

          {/* Search Component */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <JobSearch onSearch={handleSearch} loading={loading} />
          </motion.div>
        </section>

        {/* Results Section */}
        <section className="container">
          {loading && (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="animate-spin text-primary mb-4" size={48} />
              <p className="text-text-secondary text-lg">Searching for jobs...</p>
            </div>
          )}

          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-error/10 border border-error/30 rounded-lg p-6 flex items-start gap-3"
            >
              <AlertCircle className="text-error flex-shrink-0 mt-1" size={24} />
              <div>
                <h3 className="text-error font-semibold mb-1">Error</h3>
                <p className="text-text-secondary">{error}</p>
              </div>
            </motion.div>
          )}

          {!loading && !error && jobs.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-text-primary">
                  {jobs.length} {jobs.length === 1 ? 'Job' : 'Jobs'} Found
                </h2>
              </div>

              <div className="grid gap-4">
                {jobs.map((job) => (
                  <JobCard
                    key={job.job_id}
                    job={job}
                    onClick={() => handleJobClick(job)}
                  />
                ))}
              </div>
            </motion.div>
          )}

          {!loading && !error && hasSearched && jobs.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20"
            >
              <Briefcase className="mx-auto text-text-muted mb-4" size={64} />
              <h3 className="text-2xl font-semibold text-text-primary mb-2">
                No Jobs Found
              </h3>
              <p className="text-text-secondary">
                Try adjusting your search criteria, location, or keywords
              </p>
            </motion.div>
          )}

          {!loading && !error && !hasSearched && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20"
            >
              <Briefcase className="mx-auto text-text-muted mb-4" size={64} />
              <h3 className="text-2xl font-semibold text-text-primary mb-2">
                Start Your Job Search
              </h3>
              <p className="text-text-secondary">
                Enter a job title, skill, or company and select your preferred location
              </p>
            </motion.div>
          )}
        </section>
      </main>

      <Footer />

      {/* Job Details Modal */}
      <AnimatePresence>
        {selectedJob && !showResumeScreening && (
          <JobDetails
            job={selectedJob}
            onClose={() => setSelectedJob(null)}
            onScreenResume={handleScreenResume}
          />
        )}
      </AnimatePresence>

      {/* Resume Screening Modal */}
      <AnimatePresence>
        {showResumeScreening && selectedJob && (
          <ResumeScreening
            job={selectedJob}
            onClose={() => {
              setShowResumeScreening(false);
              setSelectedJob(null);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default JobsScreeningPage;
