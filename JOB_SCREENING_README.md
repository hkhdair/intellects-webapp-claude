# Job Screening Application

## Overview
A comprehensive job search application integrated into the Intellects.tech website at `/job_screening`. The application uses the JSearch RapidAPI to search for job opportunities (both remote and location-specific) and provides an interactive interface for job seekers.

## Features

### ✅ Implemented
- **Flexible Location Search**: Search for remote jobs or location-specific positions
- **Advanced Search Filters**: 
  - Location selection (Remote, US, UK, Canada, Australia, Germany, France, India)
  - Date posted filters (All, Today, Past Week, Past Month)
  - Keyword-based search
- **Interactive Job Cards**: Displays job listings with:
  - Company logo and name
  - Job title and employment type
  - Location (Remote or specific city/country)
  - Salary range (if available)
  - Posted date
  - Benefits
- **Detailed Job View**: Full job description modal with:
  - Complete job details
  - Qualifications and responsibilities
  - Benefits
  - Direct application links
  - Resume screening button
- **Resume Upload Interface**: Modal for uploading resume (PDF only)
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Smooth Animations**: Framer Motion animations throughout
- **Consistent Branding**: Purple/blue gradient theme matching the main website

### 🔄 Pending Implementation
- **Resume Screening Logic**: The AI-powered resume analysis functionality needs to be implemented. The UI is ready and accepts PDF uploads, but the actual screening logic is a placeholder.

## File Structure

```
src/
├── components/
│   ├── jobs/
│   │   ├── JobCard.tsx          # Individual job listing card
│   │   ├── JobDetails.tsx       # Full job details modal
│   │   ├── JobSearch.tsx        # Search bar and filters
│   │   └── ResumeScreening.tsx  # Resume upload modal (placeholder logic)
│   ├── JobsScreeningPage.tsx    # Main jobs page component
│   └── Header.tsx               # Updated with Jobs navigation link
├── types/
│   └── job.ts                   # TypeScript interfaces for job data
├── utils/
│   └── jobApi.ts                # API utility for JSearch RapidAPI
└── App.tsx                      # Updated routing
```

## API Configuration

### JSearch RapidAPI
- **Endpoint**: `https://jsearch.p.rapidapi.com/search`
- **API Key**: Configured in `src/utils/jobApi.ts`
- **Features Used**:
  - Job search with flexible location options
  - Remote-only filtering (when "Remote" is selected)
  - Country-specific filtering (when a country is selected)
  - Date posted filtering
  - Pagination support

## Usage

1. Navigate to `/job_screening` on the website
2. Enter a job title, skill, or keyword in the search bar
3. Optionally adjust filters:
   - **Location**: Select "Remote" or a specific country
   - **Date Posted**: Filter by when jobs were posted
4. Click "Search" to find jobs
5. Click on any job card to view full details
6. Click "Screen My Resume" to upload resume for analysis
7. Click "Apply on [Publisher]" to apply directly

## Next Steps for Resume Screening

To implement the resume screening logic, update the `handleSubmit` function in `src/components/jobs/ResumeScreening.tsx`:

```typescript
const handleSubmit = async () => {
  if (!uploadedFile) return;
  
  // TODO: Implement resume screening logic
  // 1. Upload resume to your backend/service
  // 2. Parse resume content
  // 3. Compare with job requirements
  // 4. Generate compatibility score
  // 5. Provide recommendations
  
  // Example structure:
  const formData = new FormData();
  formData.append('resume', uploadedFile);
  formData.append('job_id', job.job_id);
  formData.append('job_description', job.job_description);
  
  // Make API call to your screening service
  // const result = await screenResume(formData);
  // Display results to user
};
```

## Styling
The application uses the same Tailwind CSS theme as the main website:
- **Background**: Dark navy (`#0F172A`)
- **Cards**: Lighter navy (`#1E293B`)
- **Primary**: Purple (`#8B5CF6`)
- **Secondary**: Blue (`#3B82F6`)
- **Text**: White and gray shades

## Dependencies
All dependencies are already included in the main `package.json`:
- React 18
- React Router DOM
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React (icons)

## Testing
To test the application:
```bash
npm run dev
```
Then navigate to `http://localhost:5173/job_screening`

## Notes
- API key is currently exposed in the code for development. Move to environment variables for production
- Resume screening is a placeholder - implement your own AI/ML logic
- The API has rate limits - monitor usage on RapidAPI dashboard
