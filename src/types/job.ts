// Job API Types - New Webhook Format
export interface JobListing {
  job_id: string;
  job_url: string;
  job_title: string;
  company_name: string;
  company_url: string;
  location: string;
  time_posted: string;
  num_applicants?: string | null;
  salary_range?: string | null;
  job_description?: string;
  job_description_raw_html?: string;
  company_logo_url?: string | null;
  seniority_level?: string;
  employment_type: string;
  job_function?: string;
  industries?: string;
  easy_apply: boolean;
  apply_url: string;
}

export interface JobSearchResponse {
  data: JobListing[];
}
