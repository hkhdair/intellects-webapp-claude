import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Calendar, Clock, User, Tag, ArrowLeft, Twitter, Linkedin, Facebook } from 'lucide-react';
import { motion } from 'framer-motion';
import Header from '../Header';
import Footer from '../Footer';
import { blogPosts } from '../../data/blogPosts';

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find(p => p.slug === slug);

  // Set document title and meta description
  React.useEffect(() => {
    if (post) {
      document.title = `${post.title} | Intellects.tech Blog`;

      // Set meta description
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', post.metaDescription);
      } else {
        const meta = document.createElement('meta');
        meta.name = 'description';
        meta.content = post.metaDescription;
        document.head.appendChild(meta);
      }
    }

    return () => {
      document.title = 'Intellects.tech';
    };
  }, [post]);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const shareUrl = `${window.location.origin}/blog/${post.slug}`;
  const shareText = `Check out this article: ${post.title}`;

  const handleShare = (platform: string) => {
    let url = '';
    switch (platform) {
      case 'twitter':
        url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
        break;
      case 'linkedin':
        url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
        break;
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
        break;
    }
    if (url) {
      window.open(url, '_blank', 'width=600,height=400');
    }
  };

  const renderContent = (content: string) => {
    return content.split('\n').map((paragraph, index) => {
      if (paragraph.startsWith('# ')) {
        return (
          <h1 key={index} className="text-3xl md:text-4xl font-bold text-text-primary mb-6 mt-8">
            {paragraph.substring(2)}
          </h1>
        );
      }
      if (paragraph.startsWith('## ')) {
        return (
          <h2 key={index} className="text-2xl md:text-3xl font-bold text-text-primary mb-4 mt-8">
            {paragraph.substring(3)}
          </h2>
        );
      }
      if (paragraph.startsWith('### ')) {
        return (
          <h3 key={index} className="text-xl md:text-2xl font-bold text-text-primary mb-3 mt-6">
            {paragraph.substring(4)}
          </h3>
        );
      }
      if (paragraph.startsWith('- **')) {
        const match = paragraph.match(/- \*\*(.*?)\*\*: (.*)/);
        if (match) {
          return (
            <li key={index} className="mb-2">
              <strong className="text-primary">{match[1]}</strong>: {match[2]}
            </li>
          );
        }
      }
      if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
        return (
          <p key={index} className="font-bold text-primary text-lg mb-4">
            {paragraph.slice(2, -2)}
          </p>
        );
      }
      if (paragraph.trim() === '') {
        return <div key={index} className="mb-4"></div>;
      }

      return (
        <p key={index} className="text-text-secondary leading-relaxed mb-4">
          {paragraph.split('**').map((part, i) =>
            i % 2 === 1 ? <strong key={i} className="text-text-primary font-semibold">{part}</strong> : part
          )}
        </p>
      );
    });
  };

  const relatedPosts = blogPosts
    .filter(p => p.slug !== post.slug && p.tags.some(tag => post.tags.includes(tag)))
    .slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col bg-background-dark">

      <Header />

      <main className="flex-1 pt-24 pb-20">
        <article className="container max-w-4xl mx-auto">
          {/* Back to Blog */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <Link
              to="/blog"
              className="inline-flex items-center text-primary hover:text-primary-light transition-colors"
            >
              <ArrowLeft size={20} className="mr-2" />
              Back to Blog
            </Link>
          </motion.div>

          {/* Article Header */}
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-12"
          >
            {/* Category */}
            <div className="mb-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary border border-primary/20">
                <Tag size={14} className="mr-1" />
                {post.category}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary mb-6 leading-tight">
              {post.title}
            </h1>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 text-text-muted mb-6">
              <div className="flex items-center gap-2">
                <User size={16} />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <span>{formatDate(post.publishedAt)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} />
                <span>{post.readingTime} min read</span>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-sm rounded-lg bg-background-light text-text-secondary border border-gray-700"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Share Buttons */}
            <div className="flex items-center gap-3">
              <span className="text-text-muted">Share:</span>
              <button
                onClick={() => handleShare('twitter')}
                className="p-2 rounded-lg bg-background-light hover:bg-gray-700 text-text-secondary hover:text-primary transition-colors"
                aria-label="Share on Twitter"
              >
                <Twitter size={18} />
              </button>
              <button
                onClick={() => handleShare('linkedin')}
                className="p-2 rounded-lg bg-background-light hover:bg-gray-700 text-text-secondary hover:text-primary transition-colors"
                aria-label="Share on LinkedIn"
              >
                <Linkedin size={18} />
              </button>
              <button
                onClick={() => handleShare('facebook')}
                className="p-2 rounded-lg bg-background-light hover:bg-gray-700 text-text-secondary hover:text-primary transition-colors"
                aria-label="Share on Facebook"
              >
                <Facebook size={18} />
              </button>
            </div>
          </motion.header>

          {/* Article Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="prose prose-lg max-w-none"
          >
            <div className="text-xl text-text-secondary leading-relaxed mb-8 p-6 bg-background-light rounded-xl border-l-4 border-primary">
              {post.excerpt}
            </div>

            <div className="article-content">
              {renderContent(post.content)}
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-16 p-8 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl border border-primary/20"
          >
            <div className="text-center">
              <h3 className="text-2xl font-bold text-text-primary mb-4">
                Ready to Transform Your Business?
              </h3>
              <p className="text-text-secondary mb-6 max-w-2xl mx-auto">
                Get started with our AI automation solutions and see how we can help streamline your operations.
              </p>
              <Link
                to="/#contact"
                className="btn-primary inline-flex items-center"
              >
                Get Free Consultation
              </Link>
            </div>
          </motion.div>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="mt-20"
            >
              <h3 className="text-2xl font-bold text-text-primary mb-8 text-center">
                Related Articles
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <Link
                    key={relatedPost.id}
                    to={`/blog/${relatedPost.slug}`}
                    className="group block p-6 bg-background-light rounded-xl border border-gray-800 hover:border-primary/50 transition-all duration-300"
                  >
                    <h4 className="font-semibold text-text-primary group-hover:text-primary transition-colors mb-2">
                      {relatedPost.title}
                    </h4>
                    <p className="text-text-secondary text-sm line-clamp-2 mb-3">
                      {relatedPost.excerpt}
                    </p>
                    <div className="flex items-center text-xs text-text-muted">
                      <Clock size={12} className="mr-1" />
                      {relatedPost.readingTime} min read
                    </div>
                  </Link>
                ))}
              </div>
            </motion.section>
          )}
        </article>
      </main>

      <Footer />
    </div>
  );
};

export default BlogPost;