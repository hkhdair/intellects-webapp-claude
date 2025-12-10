import { JobListing } from '../types/job';

export interface JobSearchParams {
  query: string;
  location?: string;
}

export async function searchJobs(params: JobSearchParams): Promise<JobListing[]> {
  const { query, location = 'australia' } = params;

  // Build webhook URL with query parameter
  const url = new URL('https://wflow.intellects.tech/webhook/get_jobs');
  url.searchParams.append('search', query.toLowerCase());

  try {
    const response = await fetch(url.toString(), {
      method: 'GET',
    });

    if (!response.ok) {
      // Try to parse error message from response
      let errorMessage = `API Error: ${response.status} ${response.statusText}`;
      try {
        const errorData = await response.json();
        if (errorData.message) {
          errorMessage = `${errorData.message}. ${errorData.hint || ''}`;
        }
      } catch {
        // If parsing fails, use default message
      }
      throw new Error(errorMessage);
    }

    const data = await response.json();
    
    // Check if response is an array
    if (!Array.isArray(data)) {
      throw new Error('Invalid response format: Expected an array of jobs');
    }
    
    // Unwrap the 'json' property from each job object if it exists
    const jobs: JobListing[] = data.map((item: any) => {
      // If the job data is wrapped in a 'json' property, unwrap it
      return item.json || item;
    });
    
    // Filter by location if needed (currently only Australia is active)
    if (location === 'australia') {
      // Return all jobs for Australia
      return jobs;
    } else if (location === 'remote') {
      // Remote filtering - currently deactivated but keeping logic for future
      return jobs.filter(job => 
        job.location.toLowerCase().includes('remote')
      );
    }
    
    return jobs;
  } catch (error) {
    console.error('Job search error:', error);
    throw error;
  }
}
