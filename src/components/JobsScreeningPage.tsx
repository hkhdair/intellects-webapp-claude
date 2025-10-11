import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Briefcase, Loader2, AlertCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';
import JobSearch, { SearchFilters } from './jobs/JobSearch';
import JobCard from './jobs/JobCard';
import JobDetails from './jobs/JobDetails';
import ResumeScreening from './jobs/ResumeScreening';
import { searchJobs } from '../utils/jobApi';
import { JobListing } from '../types/job';

const JOBS_PER_PAGE = 10;

const JobsScreeningPage: React.FC = () => {
  const [jobs, setJobs] = useState<JobListing[]>([]);
  const [selectedJob, setSelectedJob] = useState<JobListing | null>(null);
  const [showResumeScreening, setShowResumeScreening] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const handleSearch = async (query: string, filters: SearchFilters) => {
    setLoading(true);
    setError(null);
    setHasSearched(true);
    setCurrentPage(1); // Reset to first page on new search
    
    try {
      console.log('Searching for:', query, 'with filters:', filters);
      const data = await searchJobs({
        query,
        location: filters.location,
      });

      console.log('Received jobs:', data.length);
      console.log('First job sample:', data[0]); // Debug: see actual structure
      setJobs(data);

      if (data.length === 0) {
        setError('No jobs found. Try adjusting your search criteria.');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch jobs. Please try again later.';
      setError(errorMessage);
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

  // Pagination logic
  const totalPages = Math.ceil(jobs.length / JOBS_PER_PAGE);
  const startIndex = (currentPage - 1) * JOBS_PER_PAGE;
  const endIndex = startIndex + JOBS_PER_PAGE;
  const currentJobs = jobs.slice(startIndex, endIndex);

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
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
                {totalPages > 1 && (
                  <div className="text-text-secondary">
                    Page {currentPage} of {totalPages}
                  </div>
                )}
              </div>

              <div className="grid gap-4 mb-6">
                {currentJobs.map((job) => (
                  <JobCard
                    key={job.job_id}
                    job={job}
                    onClick={() => handleJobClick(job)}
                  />
                ))}
              </div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-4">
                  <button
                    onClick={goToPrevPage}
                    disabled={currentPage === 1}
                    className="btn-outline px-4 py-2 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft size={20} />
                    Previous
                  </button>
                  
                  <div className="flex items-center gap-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                      <button
                        key={pageNum}
                        onClick={() => {
                          setCurrentPage(pageNum);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${
                          pageNum === currentPage
                            ? 'bg-primary text-white font-semibold'
                            : 'bg-background-light text-text-secondary hover:bg-primary/20'
                        }`}
                      >
                        {pageNum}
                      </button>
                    ))}
                  </div>
                  
                  <button
                    onClick={goToNextPage}
                    disabled={currentPage === totalPages}
                    className="btn-outline px-4 py-2 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                    <ChevronRight size={20} />
                  </button>
                </div>
              )}
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
