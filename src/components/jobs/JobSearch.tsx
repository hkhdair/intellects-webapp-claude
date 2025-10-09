import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';

interface JobSearchProps {
  onSearch: (query: string, filters: SearchFilters) => void;
  loading: boolean;
}

export interface SearchFilters {
  location: string;
  date_posted: 'all' | 'today' | 'week' | 'month';
}

const JobSearch: React.FC<JobSearchProps> = ({ onSearch, loading }) => {
  const [query, setQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({
    location: 'remote',
    date_posted: 'all',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query, filters);
    }
  };

  return (
    <div className="bg-background-light rounded-xl p-6 border border-gray-700">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Search Input */}
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted"
              size={20}
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for jobs (e.g., 'Software Developer', 'Product Manager')"
              className="input pl-12 w-full"
              disabled={loading}
            />
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
            disabled={loading || !query.trim()}
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-700">
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
                <option value="remote">Remote</option>
                <option value="us">United States</option>
                <option value="uk">United Kingdom</option>
                <option value="ca">Canada</option>
                <option value="au">Australia</option>
                <option value="de">Germany</option>
                <option value="fr">France</option>
                <option value="in">India</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Date Posted
              </label>
              <select
                value={filters.date_posted}
                onChange={(e) => setFilters({ ...filters, date_posted: e.target.value as SearchFilters['date_posted'] })}
                className="input"
                disabled={loading}
              >
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="week">Past Week</option>
                <option value="month">Past Month</option>
              </select>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default JobSearch;
