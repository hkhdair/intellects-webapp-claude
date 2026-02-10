import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Send, User, Mail, MessageSquare, AlertCircle, Phone, Building2 } from 'lucide-react';

type FormData = {
  name: string;
  company: string;
  email: string;
  phone: string;
  message: string;
};

const PERSONAL_EMAIL_DOMAINS = [
  'gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'live.com',
  'icloud.com', 'me.com', 'mac.com', 'aol.com', 'protonmail.com',
  'mail.com', 'zoho.com', 'ymail.com', 'gmx.com', 'fastmail.com',
];

type SubmissionState = 'idle' | 'submitting' | 'success' | 'error';

const Contact: React.FC = () => {
  const [submissionState, setSubmissionState] = useState<SubmissionState>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const honeypotRef = React.useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid }
  } = useForm<FormData>({
    mode: 'onChange'
  });

  const onSubmit = async (data: FormData) => {
    // Honeypot check — bots fill hidden fields, humans don't
    if (honeypotRef.current?.value) {
      setSubmissionState('success');
      reset();
      setTimeout(() => setSubmissionState('idle'), 5000);
      return;
    }

    setSubmissionState('submitting');
    setErrorMessage('');

    try {
      const response = await fetch('https://wflow.intellects.tech/webhook/contact-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Failed to submit request: ${response.status}`);
      }

      setSubmissionState('success');
      reset();

      // Reset to idle state after 5 seconds
      setTimeout(() => {
        setSubmissionState('idle');
      }, 5000);

    } catch (error) {
      setSubmissionState('error');
      setErrorMessage(error instanceof Error ? error.message : 'An unexpected error occurred');

      // Reset to idle state after 5 seconds
      setTimeout(() => {
        setSubmissionState('idle');
      }, 5000);
    }
  };

  return (
    <section id="contact" className="py-20">
      <div className="container">
        <motion.div 
          className="max-w-3xl mx-auto bg-background-light rounded-xl overflow-hidden shadow-xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="px-6 py-8 md:p-10 border-b border-gray-800">
            <h2 className="text-2xl md:text-3xl font-bold mb-2" id="contact-heading">
              REQUEST A CALL BACK
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-primary to-secondary rounded-full mb-4"></div>
            <a
              href="tel:+61861712665"
              className="inline-flex items-center gap-2 text-text-secondary hover:text-primary transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>(08) 6171 2665</span>
            </a>
          </div>
          
          <form onSubmit={handleSubmit(onSubmit)} className="p-6 md:p-10" role="form" aria-labelledby="contact-heading">
            {/* Honeypot field — hidden from humans, catches bots */}
            <input
              ref={honeypotRef}
              type="text"
              name="website"
              autoComplete="off"
              aria-hidden="true"
              tabIndex={-1}
              style={{ position: 'absolute', left: '-9999px', opacity: 0, pointerEvents: 'none' }}
            />

            {/* Name Input */}
            <div className="mb-6">
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-muted" />
                <input
                  {...register('name', {
                    required: 'Name is required',
                    minLength: {
                      value: 2,
                      message: 'Name must be at least 2 characters'
                    },
                    maxLength: {
                      value: 50,
                      message: 'Name must be less than 50 characters'
                    },
                    pattern: {
                      value: /^[a-zA-Z\s]+$/,
                      message: 'Name can only contain letters and spaces'
                    }
                  })}
                  type="text"
                  placeholder="Your full name"
                  aria-label="Your name"
                  className={`input pl-10 ${errors.name ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                  disabled={submissionState === 'submitting'}
                />
              </div>
              {errors.name && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-400 text-sm mt-1 flex items-center gap-1"
                >
                  <AlertCircle className="w-4 h-4" />
                  {errors.name.message}
                </motion.p>
              )}
            </div>

            {/* Company Name Input */}
            <div className="mb-6">
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-muted" />
                <input
                  {...register('company', {
                    required: 'Company name is required',
                    minLength: {
                      value: 2,
                      message: 'Company name must be at least 2 characters'
                    },
                    maxLength: {
                      value: 100,
                      message: 'Company name must be less than 100 characters'
                    },
                    pattern: {
                      value: /^[a-zA-Z0-9\s&.,'\-]+$/,
                      message: 'Please enter a valid company name'
                    }
                  })}
                  type="text"
                  placeholder="Your company name"
                  aria-label="Your company name"
                  className={`input pl-10 ${errors.company ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                  disabled={submissionState === 'submitting'}
                />
              </div>
              {errors.company && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-400 text-sm mt-1 flex items-center gap-1"
                >
                  <AlertCircle className="w-4 h-4" />
                  {errors.company.message}
                </motion.p>
              )}
            </div>

            {/* Email Input */}
            <div className="mb-6">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-muted" />
                <input
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Please enter a valid email address'
                    },
                    validate: (value) => {
                      const domain = value.split('@')[1]?.toLowerCase();
                      if (PERSONAL_EMAIL_DOMAINS.includes(domain)) {
                        return 'Please use your business email address';
                      }
                      return true;
                    }
                  })}
                  type="email"
                  placeholder="name@company.com"
                  aria-label="Your business email address"
                  className={`input pl-10 ${errors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                  disabled={submissionState === 'submitting'}
                />
              </div>
              {errors.email && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-400 text-sm mt-1 flex items-center gap-1"
                >
                  <AlertCircle className="w-4 h-4" />
                  {errors.email.message}
                </motion.p>
              )}
            </div>

            {/* Phone Input */}
            <div className="mb-6">
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-muted" />
                <input
                  {...register('phone', {
                    required: 'Phone number is required',
                    pattern: {
                      value: /^(?:\+?61|0)[2-478]\d{8}$/,
                      message: 'Please enter a valid Australian phone number (e.g. 0412 345 678 or 08 1234 5678)'
                    }
                  })}
                  type="tel"
                  placeholder="04XX XXX XXX"
                  aria-label="Your Australian phone number"
                  className={`input pl-10 ${errors.phone ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                  disabled={submissionState === 'submitting'}
                />
              </div>
              {errors.phone && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-400 text-sm mt-1 flex items-center gap-1"
                >
                  <AlertCircle className="w-4 h-4" />
                  {errors.phone.message}
                </motion.p>
              )}
            </div>

            {/* Message Input */}
            <div className="mb-6">
              <div className="relative">
                <MessageSquare className="absolute left-3 top-4 w-5 h-5 text-text-muted" />
                <textarea
                  {...register('message', {
                    required: 'Message is required',
                    minLength: {
                      value: 10,
                      message: 'Message must be at least 10 characters'
                    },
                    maxLength: {
                      value: 1000,
                      message: 'Message must be less than 1000 characters'
                    }
                  })}
                  placeholder="Tell us about your business needs..."
                  aria-label="Your message about business needs"
                  className={`textarea pl-10 ${errors.message ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                  rows={6}
                  disabled={submissionState === 'submitting'}
                />
              </div>
              {errors.message && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-400 text-sm mt-1 flex items-center gap-1"
                >
                  <AlertCircle className="w-4 h-4" />
                  {errors.message.message}
                </motion.p>
              )}
            </div>

            {submissionState === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-red-400 text-center flex items-center justify-center gap-2"
              >
                <AlertCircle className="w-5 h-5" />
                {errorMessage || 'Failed to submit request. Please try again.'}
              </motion.div>
            )}

            <motion.button
              type="submit"
              disabled={!isValid || submissionState === 'submitting'}
              className={`btn-primary w-full sm:w-auto ${
                !isValid || submissionState === 'submitting'
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:shadow-lg hover:shadow-primary/25'
              }`}
              aria-label="Submit call back request"
              whileHover={isValid && submissionState !== 'submitting' ? { scale: 1.02 } : {}}
              whileTap={isValid && submissionState !== 'submitting' ? { scale: 0.98 } : {}}
            >
              {submissionState === 'submitting' ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full mr-2"
                  />
                  Submitting...
                </>
              ) : (
                <span className="flex items-center">
                  <Phone className="mr-2 h-4 w-4" />
                  REQUEST CALL BACK
                </span>
              )}
            </motion.button>

            {submissionState === 'success' && (
              <motion.div
                className="mt-6 p-4 bg-success/20 text-success rounded-lg flex items-center gap-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <AlertCircle className="w-5 h-5" />
                Thank you! We've received your request. Our team will call you back shortly.
              </motion.div>
            )}
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;