import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Send } from 'lucide-react';

type FormData = {
  name: string;
  email: string;
  message: string;
};

const Contact: React.FC = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitError(null);
    
    try {
      const response = await fetch('https://wflow.intellects.tech/webhook/contact-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setSubmitSuccess(true);
      reset();
      
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    } catch (error) {
      console.error('Contact form submission error:', error);
      setSubmitError('Failed to send message. Please try again later.');
    } finally {
      setIsSubmitting(false);
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
              GET IN TOUCH
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-primary to-secondary rounded-full"></div>
          </div>
          
          <form onSubmit={handleSubmit(onSubmit)} className="p-6 md:p-10" role="form" aria-labelledby="contact-heading">
            <div className="mb-6">
              <input
                type="text"
                placeholder="Your name"
                aria-label="Your name"
                className={`input ${errors.name ? 'border-error' : ''}`}
                {...register('name', { required: true })}
              />
              {errors.name && <p className="mt-1 text-sm text-error">Name is required</p>}
            </div>
            
            <div className="mb-6">
              <input
                type="email"
                placeholder="Your email"
                aria-label="Your email address"
                className={`input ${errors.email ? 'border-error' : ''}`}
                {...register('email', { 
                  required: true,
                  pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i 
                })}
              />
              {errors.email?.type === 'required' && (
                <p className="mt-1 text-sm text-error">Email is required</p>
              )}
              {errors.email?.type === 'pattern' && (
                <p className="mt-1 text-sm text-error">Enter a valid email address</p>
              )}
            </div>
            
            <div className="mb-6">
              <textarea
                placeholder="Tell us about your automation requirements..."
                aria-label="Your message about automation requirements"
                className={`textarea ${errors.message ? 'border-error' : ''}`}
                rows={6}
                {...register('message', { required: true })}
              ></textarea>
              {errors.message && <p className="mt-1 text-sm text-error">Message is required</p>}
            </div>
            
            <motion.button
              type="submit"
              className="btn-primary w-full sm:w-auto"
              aria-label="Send contact form message"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                <span className="flex items-center">
                  SEND <Send className="ml-2 h-4 w-4" />
                </span>
              )}
            </motion.button>
            
            {submitSuccess && (
              <motion.div
                className="mt-4 p-4 bg-success/20 text-success rounded-lg"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                Thank you! Your message has been sent successfully. We'll get back to you soon.
              </motion.div>
            )}

            {submitError && (
              <motion.div
                className="mt-4 p-4 bg-error/20 text-error rounded-lg"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {submitError}
              </motion.div>
            )}
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;