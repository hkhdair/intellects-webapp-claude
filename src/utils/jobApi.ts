import { JobSearchResponse } from '../types/job';

const RAPIDAPI_KEY = '9704b8c382msh5ddedc67e7da4d5p108e70jsn650e7eb935ae';
const RAPIDAPI_HOST = 'jsearch.p.rapidapi.com';

export interface JobSearchParams {
  query: string;
  page?: number;
  num_pages?: number;
  location?: string;
  date_posted?: 'all' | 'today' | 'week' | 'month';
}

export async function searchJobs(params: JobSearchParams): Promise<JobSearchResponse> {
  const { query, page = 1, num_pages = 1, location = 'us', date_posted = 'all' } = params;

  const url = new URL('https://jsearch.p.rapidapi.com/search');
  
  // Handle remote location differently
  if (location === 'remote') {
    // For remote, add "remote" to query and set remote_jobs_only flag
    url.searchParams.append('query', `${query} remote`);
    url.searchParams.append('remote_jobs_only', 'true');
  } else {
    // For specific countries, just use the query and set country
    url.searchParams.append('query', query);
    url.searchParams.append('country', location);
  }
  
  url.searchParams.append('page', page.toString());
  url.searchParams.append('num_pages', num_pages.toString());
  url.searchParams.append('date_posted', date_posted);

  try {
    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'x-rapidapi-key': RAPIDAPI_KEY,
        'x-rapidapi-host': RAPIDAPI_HOST,
      },
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const data: JobSearchResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Job search error:', error);
    throw error;
  }
}
