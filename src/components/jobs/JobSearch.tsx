import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';

interface JobSearchProps {
  onSearch: (query: string, filters: SearchFilters) => void;
  loading: boolean;
}

export interface SearchFilters {
  location: string;
}

const JOB_TYPES = [
  { value: 'business analyst', label: 'Business Analyst' },
  { value: 'data analyst', label: 'Data Analyst' },
  { value: 'data scientist', label: 'Data Scientist' },
  { value: 'software developer', label: 'Software Developer' },
  { value: 'cybersecurity analyst', label: 'Cybersecurity Analyst' },
  { value: 'security architect', label: 'Security Architect' },
];

const JobSearch: React.FC<JobSearchProps> = ({ onSearch, loading }) => {
  const [selectedJob, setSelectedJob] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({
    location: 'australia',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedJob) {
      onSearch(selectedJob, filters);
    }
  };

  return (
    <div className="bg-background-light rounded-xl p-6 border border-gray-700">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Search Dropdown */}
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted"
              size={20}
            />
            <select
              value={selectedJob}
              onChange={(e) => setSelectedJob(e.target.value)}
              className="input pl-12 w-full"
              disabled={loading}
            >
              <option value="">Select a job type...</option>
              {JOB_TYPES.map((job) => (
                <option key={job.value} value={job.value}>
                  {job.label}
                </option>
              ))}
            </select>
          </div>
          
          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className={`btn ${showFilters ? 'bg-primary text-white' : 'btn-outline'} px-4`}
            aria-label="Toggle filters"
          >
            <Filter size={20} />
          </button>
          
          <button
            type="submit"
            className="btn-primary px-8"
            disabled={loading || !selectedJob}
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="pt-4 border-t border-gray-700">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Location
              </label>
              <select
                value={filters.location}
                onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                className="input"
                disabled={loading}
              >
                <option value="australia">Australia</option>
                <option value="remote" disabled>Remote (Coming Soon)</option>
              </select>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default JobSearch;
