import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, DollarSign, TrendingUp, CheckCircle, Mail, AlertCircle, Send, RotateCcw } from 'lucide-react';
import { AssessmentResults as ResultsType, AssessmentAnswer } from '../../../types/assessment';
import { submitAssessment } from '../../../utils/assessmentApi';

interface AssessmentResultsProps {
  results: ResultsType;
  answers: Map<string, AssessmentAnswer>;
  startedAt: Date;
  onReset: () => void;
}

const AssessmentResults: React.FC<AssessmentResultsProps> = ({ results, answers, startedAt, onReset }) => {
  const [email, setEmail] = useState('');
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [emailSubmitting, setEmailSubmitting] = useState(false);
  const hasSubmittedInitial = useRef(false);

  useEffect(() => {
    if (!hasSubmittedInitial.current) {
      hasSubmittedInitial.current = true;
      submitAssessment(answers, results, startedAt, new Date()).catch(console.error);
    }
  }, [answers, results, startedAt]);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || emailSubmitting) return;

    setEmailSubmitting(true);
    try {
      await submitAssessment(answers, results, startedAt, new Date(), email);
      setEmailSubmitted(true);
    } catch (error) {
      console.error('Failed to submit email:', error);
    } finally {
      setEmailSubmitting(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 70) return 'text-green-400';
    if (score >= 40) return 'text-yellow-400';
    return 'text-orange-400';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 70) return 'High Readiness';
    if (score >= 40) return 'Moderate Readiness';
    return 'Early Stage';
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 70) return 'from-green-500/20 to-green-600/20';
    if (score >= 40) return 'from-yellow-500/20 to-yellow-600/20';
    return 'from-orange-500/20 to-orange-600/20';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto py-8"
    >
      {/* Disclaimer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 mb-8 flex items-start gap-3"
      >
        <AlertCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-text-secondary">
          <strong className="text-blue-400">Disclaimer:</strong> This assessment is automated and based on common patterns and best practices in business automation and AI adoption. Results are indicative estimates and may vary based on your specific business context. For a detailed analysis tailored to your needs, we recommend booking a consultation with our team.
        </p>
      </motion.div>

      <div className="text-center mb-12">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          className="mb-6"
        >
          <span className="text-6xl">📊</span>
        </motion.div>
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Your Assessment Results</h1>

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className={`inline-flex items-center justify-center w-36 h-36 rounded-full bg-gradient-to-br ${getScoreBgColor(results.overallScore)} border-4 border-primary/30`}
        >
          <div className="text-center">
            <div className={`text-4xl font-bold ${getScoreColor(results.overallScore)}`}>
              {Math.round(results.overallScore)}%
            </div>
            <div className="text-xs text-text-secondary">Overall Score</div>
          </div>
        </motion.div>

        <p className={`mt-4 text-lg font-medium ${getScoreColor(results.overallScore)}`}>
          {getScoreLabel(results.overallScore)}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {[
          { label: 'Automation Readiness', score: results.automationReadinessScore, emoji: '⚙️' },
          { label: 'AI Opportunity', score: results.aiOpportunityScore, emoji: '🤖' },
          { label: 'Adoption Readiness', score: results.adoptionReadinessScore, emoji: '👥' }
        ].map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            className="bg-background-light rounded-xl p-6 border border-gray-800"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">{item.emoji}</span>
              <span className="text-text-secondary text-sm">{item.label}</span>
            </div>
            <div className={`text-3xl font-bold ${getScoreColor(item.score)}`}>
              {Math.round(item.score)}%
            </div>
            <div className="mt-3 h-2 bg-background-dark rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-primary to-secondary"
                initial={{ width: 0 }}
                animate={{ width: `${item.score}%` }}
                transition={{ duration: 0.8, delay: 0.5 + index * 0.1 }}
              />
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-8 border border-primary/20 mb-12"
      >
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <TrendingUp className="text-primary" />
          Potential Impact
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-primary/20 rounded-lg">
              <Clock className="w-6 h-6 text-primary" />
            </div>
            <div>
              <div className="text-text-secondary text-sm">Time You Could Save</div>
              <div className="text-2xl font-bold">
                {Math.round(results.potentialROI.hoursSavedPerWeek)} hrs/week
              </div>
              <div className="text-sm text-text-muted">
                Based on {results.timeWastedHoursPerWeek} hrs currently spent on manual tasks
              </div>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="p-3 bg-green-500/20 rounded-lg">
              <DollarSign className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <div className="text-text-secondary text-sm">Estimated Annual Savings</div>
              <div className="text-2xl font-bold text-green-400">
                ${results.potentialROI.estimatedAnnualSavings.toLocaleString()}
              </div>
              <div className="text-sm text-text-muted">
                Assuming $50/hr average cost
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="mb-12"
      >
        <h2 className="text-2xl font-bold mb-6">Recommended Next Steps</h2>
        <div className="space-y-4">
          {results.recommendations.map((rec, index) => (
            <motion.div
              key={rec.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 + index * 0.1 }}
              className="bg-background-light rounded-xl p-6 border border-gray-800 hover:border-primary/50 transition-colors"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    rec.priority === 'high' ? 'bg-red-500/20 text-red-400' :
                    rec.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-green-500/20 text-green-400'
                  }`}>
                    {rec.priority.toUpperCase()} PRIORITY
                  </span>
                  <h3 className="text-lg font-bold">{rec.title}</h3>
                </div>
                <p className="text-text-secondary">{rec.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Optional Email for Detailed Report */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="bg-background-light rounded-2xl p-8 border border-gray-800 mb-12"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-primary/20 rounded-lg">
            <Mail className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-bold">Want a More Detailed Report?</h2>
            <p className="text-sm text-text-secondary">
              Enter your email to receive a detailed assessment report with additional insights.
            </p>
          </div>
        </div>

        {emailSubmitted ? (
          <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-green-400" />
            <p className="text-green-400">
              Thank you! We'll send your detailed report shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="flex-1 px-4 py-3 bg-background-dark border border-gray-700 rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:border-primary transition-colors"
            />
            <button
              type="submit"
              disabled={!email || emailSubmitting}
              className={`btn-primary flex items-center justify-center gap-2 ${
                (!email || emailSubmitting) ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {emailSubmitting ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Send Report
                </>
              )}
            </button>
          </form>
        )}

        <p className="text-xs text-text-muted mt-3">
          Your email will only be used to send your assessment report. We respect your privacy.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="text-center bg-background-light rounded-2xl p-8 border border-gray-800 mb-8"
      >
        <div className="mb-4">
          <CheckCircle className="w-12 h-12 text-primary mx-auto" />
        </div>
        <h2 className="text-2xl font-bold mb-3">Ready to Get Started?</h2>
        <p className="text-text-secondary mb-6 max-w-xl mx-auto">
          Book a free consultation to discuss your assessment results and explore how we can help transform your business with AI and automation.
        </p>
        <Link
          to="/#contact"
          className="btn-primary inline-flex items-center text-lg px-8 py-4"
        >
          Book Free Consultation
          <ArrowRight className="ml-2 w-5 h-5" />
        </Link>
      </motion.div>

      {/* Retake Assessment */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1 }}
        className="text-center"
      >
        <button
          type="button"
          onClick={onReset}
          className="btn-outline inline-flex items-center gap-2 text-text-secondary hover:text-text-primary"
        >
          <RotateCcw className="w-4 h-4" />
          Retake Assessment
        </button>
      </motion.div>
    </motion.div>
  );
};

export default AssessmentResults;
