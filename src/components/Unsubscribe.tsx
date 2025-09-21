import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, CheckCircle, AlertCircle, XCircle, ArrowLeft, X, AlertTriangle } from 'lucide-react';

type NotificationType = 'success' | 'warning' | 'error' | null;

interface NotificationState {
  type: NotificationType;
  message: string;
}

const Unsubscribe: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [email, setEmail] = useState<string>('');
  const [isValidEmail, setIsValidEmail] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [notification, setNotification] = useState<NotificationState>({
    type: null,
    message: ''
  });
  const [hasUnsubscribed, setHasUnsubscribed] = useState<boolean>(false);

  useEffect(() => {
    const emailParam = searchParams.get('email');
    if (emailParam) {
      setEmail(emailParam);
      // Validate email format
      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      setIsValidEmail(emailRegex.test(emailParam));
    }
  }, [searchParams]);

  const dismissNotification = () => {
    setNotification({ type: null, message: '' });
  };

  const handleUnsubscribe = async () => {
    if (!isValidEmail || !email) return;

    setIsSubmitting(true);
    setNotification({ type: null, message: '' });

    try {
      const response = await fetch('https://wflow.intellects.tech/webhook/confirm_unsubscibtion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const responseText = await response.text();

      // Determine notification type based on response
      if (responseText.startsWith('Email Not Found!')) {
        setNotification({
          type: 'warning',
          message: responseText
        });
      } else if (responseText.startsWith('Unsubscribed!')) {
        setNotification({
          type: 'success',
          message: responseText
        });
        setHasUnsubscribed(true);
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-background-dark via-background-light to-background-dark flex items-center justify-center px-4 py-12">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-br from-accent/10 to-primary/10 rounded-full blur-3xl"></div>
      </div>

      <motion.div
        className="relative z-10 max-w-md w-full"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          variants={itemVariants}
          className="bg-background-light/80 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-gray-800"
        >
          {/* Back to home link */}
          <motion.div variants={itemVariants} className="mb-6">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-text-secondary hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">Back to Home</span>
            </Link>
          </motion.div>

          {hasUnsubscribed && notification.type === 'success' ? (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-success/20 to-success/10 rounded-full mb-6">
                <CheckCircle className="w-10 h-10 text-success" />
              </div>
              <h1 className="text-2xl font-bold text-text-primary mb-4">
                Successfully Unsubscribed
              </h1>
              <p className="text-text-secondary mb-6">
                {notification.message}
              </p>
              <p className="text-sm text-text-muted">
                We're sorry to see you go. If you change your mind, you can always subscribe again.
              </p>
              <Link
                to="/"
                className="btn-primary mt-6 inline-block"
              >
                Return to Homepage
              </Link>
            </motion.div>
          ) : (
            <>
              {/* Header */}
              <motion.div variants={itemVariants} className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full mb-4">
                  <Mail className="w-8 h-8 text-primary" />
                </div>
                <h1 className="text-3xl font-bold text-text-primary mb-2">
                  Unsubscribe from Newsletter
                </h1>
                <p className="text-text-secondary">
                  We're sorry to see you go
                </p>
              </motion.div>

              {/* Email Display */}
              <motion.div variants={itemVariants} className="mb-6">
                {email ? (
                  <div className={`p-4 rounded-lg border ${
                    isValidEmail 
                      ? 'bg-background-dark/50 border-gray-700' 
                      : 'bg-error/10 border-error/30'
                  }`}>
                    <div className="flex items-center gap-3">
                      {isValidEmail ? (
                        <Mail className="w-5 h-5 text-text-secondary" />
                      ) : (
                        <XCircle className="w-5 h-5 text-error" />
                      )}
                      <div className="flex-1">
                        <p className="text-sm text-text-muted mb-1">
                          {isValidEmail ? 'Unsubscribing email:' : 'Invalid email format:'}
                        </p>
                        <p className={`font-medium ${
                          isValidEmail ? 'text-text-primary' : 'text-error'
                        }`}>
                          {email}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 rounded-lg bg-warning/10 border border-warning/30">
                    <div className="flex items-center gap-3">
                      <AlertCircle className="w-5 h-5 text-warning" />
                      <p className="text-warning">
                        No email address provided
                      </p>
                    </div>
                  </div>
                )}
              </motion.div>

              {/* Notification Display */}
              <AnimatePresence>
                {notification.type && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`mb-6 relative rounded-xl p-4 border ${getNotificationStyles(notification.type)?.bgClass} ${getNotificationStyles(notification.type)?.borderClass}`}
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

              {/* Confirmation Text */}
              {isValidEmail && (
                <motion.div variants={itemVariants} className="mb-6">
                  <p className="text-text-secondary text-sm text-center">
                    Are you sure you want to unsubscribe from our newsletter? 
                    You'll stop receiving updates about business automation, AI solutions, and industry insights.
                  </p>
                </motion.div>
              )}

              {/* Action Buttons */}
              <motion.div variants={itemVariants} className="flex flex-col gap-3">
                <motion.button
                  onClick={handleUnsubscribe}
                  disabled={!isValidEmail || isSubmitting}
                  className={`btn-primary w-full py-3 flex items-center justify-center gap-2 ${
                    !isValidEmail || isSubmitting
                      ? 'opacity-50 cursor-not-allowed'
                      : 'hover:shadow-lg hover:shadow-primary/25'
                  }`}
                  whileHover={isValidEmail && !isSubmitting ? { scale: 1.02 } : {}}
                  whileTap={isValidEmail && !isSubmitting ? { scale: 0.98 } : {}}
                >
                  {isSubmitting ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                      />
                      Unsubscribing...
                    </>
                  ) : (
                    'Confirm Unsubscribe'
                  )}
                </motion.button>

                <Link
                  to="/"
                  className="btn-outline w-full py-3 text-center"
                >
                  Keep My Subscription
                </Link>
              </motion.div>

              {/* Footer Note */}
              <motion.div variants={itemVariants} className="mt-6">
                <p className="text-xs text-text-muted text-center">
                  If you're experiencing issues with our emails, please{' '}
                  <Link to="/#contact" className="text-primary hover:text-primary-light transition-colors">
                    contact us
                  </Link>{' '}
                  for assistance.
                </p>
              </motion.div>
            </>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Unsubscribe;
