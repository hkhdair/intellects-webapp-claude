import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Mail, User, Send, CheckCircle, AlertCircle, X, AlertTriangle } from 'lucide-react';

interface NewsletterFormData {
  name: string;
  email: string;
}

type NotificationType = 'success' | 'warning' | 'error' | null;

interface NotificationState {
  type: NotificationType;
  message: string;
}

const Newsletter: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState<NotificationState>({
    type: null,
    message: ''
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid }
  } = useForm<NewsletterFormData>({
    mode: 'onChange'
  });

  const dismissNotification = () => {
    setNotification({ type: null, message: '' });
  };

  const onSubmit = async (data: NewsletterFormData) => {
    setIsSubmitting(true);
    setNotification({ type: null, message: '' });

    try {
      const response = await fetch('https://wflow.intellects.tech/webhook/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const responseText = await response.text();

      // Determine notification type based on response
      if (responseText.startsWith('Email Exists')) {
        setNotification({
          type: 'warning',
          message: responseText
        });
      } else if (responseText.startsWith('Invalid Email')) {
        setNotification({
          type: 'error',
          message: responseText
        });
      } else if (responseText.startsWith('Subscribed!')) {
        setNotification({
          type: 'success',
          message: responseText
        });
        reset(); // Only reset form on successful subscription
      } else {
        // Handle unexpected response
        setNotification({
          type: 'error',
          message: responseText || 'An unexpected error occurred. Please try again.'
        });
      }

    } catch (error) {
      setNotification({
        type: 'error',
        message: error instanceof Error ? error.message : 'Failed to connect to the server. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  // Get notification styles based on type
  const getNotificationStyles = (type: NotificationType) => {
    switch (type) {
      case 'success':
        return {
          bgClass: 'bg-gradient-to-r from-success/10 to-success/5',
          borderClass: 'border-success/30',
          textClass: 'text-success',
          icon: <CheckCircle className="w-5 h-5" />
        };
      case 'warning':
        return {
          bgClass: 'bg-gradient-to-r from-warning/10 to-warning/5',
          borderClass: 'border-warning/30',
          textClass: 'text-warning',
          icon: <AlertTriangle className="w-5 h-5" />
        };
      case 'error':
        return {
          bgClass: 'bg-gradient-to-r from-error/10 to-error/5',
          borderClass: 'border-error/30',
          textClass: 'text-error',
          icon: <AlertCircle className="w-5 h-5" />
        };
      default:
        return null;
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-background-dark via-background-light to-background-dark relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-primary to-secondary rounded-full blur-xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-gradient-to-br from-accent to-primary rounded-full blur-xl"></div>
      </div>

      <div className="container relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center"
        >
          <motion.div variants={itemVariants} className="mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full mb-6">
              <Mail className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Stay <span className="gradient-text">Connected</span>
            </h2>
            <p className="text-lg text-text-secondary max-w-xl mx-auto">
              Get the latest insights on business automation, AI solutions, and industry trends delivered straight to your inbox.
            </p>
          </motion.div>

          <motion.div variants={itemVariants}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Name Input */}
                <div className="relative">
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
                      className={`input pl-10 ${errors.name ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                      disabled={isSubmitting}
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

                {/* Email Input */}
                <div className="relative">
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-muted" />
                    <input
                      {...register('email', {
                        required: 'Email is required',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Please enter a valid email address'
                        }
                      })}
                      type="email"
                      placeholder="your@email.com"
                      className={`input pl-10 ${errors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                      disabled={isSubmitting}
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
              </div>

              {/* Notification Display */}
              <AnimatePresence>
                {notification.type && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`relative rounded-xl p-4 border ${getNotificationStyles(notification.type)?.bgClass} ${getNotificationStyles(notification.type)?.borderClass}`}
                  >
                    <div className={`flex items-center gap-3 ${getNotificationStyles(notification.type)?.textClass}`}>
                      {getNotificationStyles(notification.type)?.icon}
                      <span className="flex-1 text-left font-medium">
                        {notification.message}
                      </span>
                      <button
                        type="button"
                        onClick={dismissNotification}
                        className={`p-1 rounded-lg hover:bg-white/10 transition-colors ${getNotificationStyles(notification.type)?.textClass}`}
                        aria-label="Dismiss notification"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.button
                type="submit"
                disabled={!isValid || isSubmitting}
                className={`btn-primary w-full md:w-auto px-8 py-4 text-lg font-semibold flex items-center justify-center gap-3 mx-auto transition-all duration-300 ${
                  !isValid || isSubmitting
                    ? 'opacity-50 cursor-not-allowed'
                    : 'hover:shadow-lg hover:shadow-primary/25'
                }`}
                whileHover={isValid && !isSubmitting ? { scale: 1.02 } : {}}
                whileTap={isValid && !isSubmitting ? { scale: 0.98 } : {}}
              >
                {isSubmitting ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                    />
                    Subscribing...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Subscribe to Newsletter
                  </>
                )}
              </motion.button>

              <p className="text-sm text-text-muted text-center">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Newsletter;