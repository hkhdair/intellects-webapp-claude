import React from 'react';
import { motion } from 'framer-motion';
import { X, Upload, FileText, CheckCircle, Loader2, AlertCircle } from 'lucide-react';
import { JobListing } from '../../types/job';

interface ResumeScreeningProps {
  job: JobListing;
  onClose: () => void;
}

const ResumeScreening: React.FC<ResumeScreeningProps> = ({ job, onClose }) => {
  const [dragActive, setDragActive] = React.useState(false);
  const [uploadedFile, setUploadedFile] = React.useState<File | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [processing, setProcessing] = React.useState(false);
  const [results, setResults] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type === 'application/pdf' || file.name.endsWith('.pdf')) {
        setUploadedFile(file);
      } else {
        alert('Please upload a PDF file');
      }
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type === 'application/pdf' || file.name.endsWith('.pdf')) {
        setUploadedFile(file);
      } else {
        alert('Please upload a PDF file');
      }
    }
  };

  const handleSubmit = async () => {
    if (!uploadedFile) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const formData = new FormData();
      
      // Append the resume file
      formData.append('resume_file', uploadedFile);
      
      // Append job details (updated for new data structure)
      formData.append('job_id', job.job_id);
      formData.append('job_title', job.job_title);
      formData.append('company_name', job.company_name);
      formData.append('job_description', job.job_description);
      formData.append('location', job.location);
      formData.append('employment_type', job.employment_type);
      formData.append('seniority_level', job.seniority_level);
      formData.append('job_function', job.job_function);
      
      // Submit to webhook and wait for response
      setLoading(false);
      setProcessing(true);
      
      const response = await fetch('https://wflow.intellects.tech/webhook-test/submit-resume', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error(`Submission failed: ${response.status} ${response.statusText}`);
      }
      
      // Get HTML response
      const htmlResults = await response.text();
      setResults(htmlResults);
      setProcessing(false);
      
    } catch (err) {
      console.error('Resume submission error:', err);
      setError(err instanceof Error ? err.message : 'Failed to submit resume. Please try again.');
      setProcessing(false);
    } finally {
      setLoading(false);
    }
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
        className={`bg-background-light border border-gray-700 rounded-xl w-full ${
          results ? 'max-w-5xl' : 'max-w-2xl'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-gray-700">
          <div>
            <h2 className="text-2xl font-bold text-text-primary mb-2">
              Resume Screening
            </h2>
            <p className="text-text-secondary">
              Upload your resume to check compatibility with this position
            </p>
          </div>
          
          <button
            onClick={onClose}
            className="text-text-secondary hover:text-white transition-colors p-2"
            aria-label="Close resume screening"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Show Results if available */}
          {results ? (
            <div className="bg-white rounded-lg overflow-hidden">
              <div 
                className="screening-results-container overflow-y-auto max-h-[70vh] p-4"
                dangerouslySetInnerHTML={{ __html: results }}
              />
            </div>
          ) : (
            <>
              {/* Job Info */}
              <div className="bg-background-dark rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-text-primary mb-1">{job.job_title}</h3>
                <p className="text-text-secondary text-sm">{job.company_name}</p>
              </div>

          {/* Upload Area */}
          {!uploadedFile ? (
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-lg p-12 text-center transition-all ${
                dragActive
                  ? 'border-primary bg-primary/10'
                  : 'border-gray-700 hover:border-gray-600'
              }`}
            >
              <Upload className="mx-auto mb-4 text-text-muted" size={48} />
              <h3 className="text-lg font-semibold text-text-primary mb-2">
                Upload Your Resume
              </h3>
              <p className="text-text-secondary mb-4">
                Drag and drop your resume here, or click to browse
              </p>
              <label className="btn-primary cursor-pointer inline-block">
                <input
                  type="file"
                  className="hidden"
                  accept=".pdf"
                  onChange={handleFileInput}
                />
                Choose File
              </label>
              <p className="text-text-muted text-sm mt-2">PDF files only</p>
            </div>
          ) : (
            <div className="border border-green-500 bg-green-500/10 rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CheckCircle className="text-green-500" size={24} />
                  <div>
                    <h3 className="font-semibold text-text-primary">
                      {uploadedFile.name}
                    </h3>
                    <p className="text-text-secondary text-sm">
                      {(uploadedFile.size / 1024).toFixed(2)} KB
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setUploadedFile(null)}
                  className="text-text-secondary hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            </div>
          )}

          {/* Processing Message */}
          {processing && (
            <div className="mt-6 bg-primary/10 border border-primary/30 rounded-lg p-6">
              <div className="flex flex-col items-center gap-4">
                <Loader2 className="animate-spin text-primary" size={48} />
                <div className="text-center">
                  <p className="text-primary font-semibold text-lg mb-2">
                    Analyzing Your Resume...
                  </p>
                  <p className="text-text-secondary text-sm">
                    This may take 2-3 minutes. Please don't close this window.
                  </p>
                  <p className="text-text-muted text-xs mt-2">
                    Our AI is reviewing your qualifications against the job requirements.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mt-6 bg-error/10 border border-error/30 rounded-lg p-4">
              <div className="flex gap-3">
                <AlertCircle className="text-error flex-shrink-0" size={20} />
                <div className="text-sm">
                  <p className="text-error font-medium mb-1">
                    Submission Failed
                  </p>
                  <p className="text-text-secondary">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Info Box */}
          {!processing && !error && !results && (
            <div className="mt-6 bg-primary/10 border border-primary/30 rounded-lg p-4">
              <div className="flex gap-3">
                <FileText className="text-primary flex-shrink-0" size={20} />
                <div className="text-sm">
                  <p className="text-text-primary font-medium mb-1">
                    What happens next?
                  </p>
                  <p className="text-text-secondary">
                    Our AI will analyze your resume against the job requirements and provide a 
                    compatibility score along with personalized recommendations.
                  </p>
                </div>
              </div>
            </div>
          )}
            </>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-700 p-6 flex gap-3">
          <button 
            onClick={onClose} 
            className="flex-1 btn-outline"
            disabled={loading || processing}
          >
            {results ? 'Close' : 'Cancel'}
          </button>
          {!results && (
            <button
              onClick={handleSubmit}
              disabled={!uploadedFile || loading || processing}
              className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Submitting...
                </>
              ) : processing ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Analyzing...
                </>
              ) : (
                'Analyze Resume'
              )}
            </button>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ResumeScreening;
