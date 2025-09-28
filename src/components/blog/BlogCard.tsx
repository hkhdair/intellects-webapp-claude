import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, User, Tag } from 'lucide-react';
import { BlogPost } from '../../types/blog';

interface BlogCardProps {
  post: BlogPost;
  featured?: boolean;
}

const BlogCard: React.FC<BlogCardProps> = ({ post, featured = false }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <article
      className={`group bg-background-light rounded-xl overflow-hidden border border-gray-800 hover:border-primary/50 transition-all duration-300 ${
        featured ? 'lg:col-span-2' : ''
      }`}
    >
      <div className="p-6">
        {/* Category and Featured Badge */}
        <div className="flex items-center justify-between mb-4">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
            <Tag size={12} className="mr-1" />
            {post.category}
          </span>
          {featured && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-secondary/10 text-secondary border border-secondary/20">
              Featured
            </span>
          )}
        </div>

        {/* Title */}
        <h2 className={`font-bold text-text-primary group-hover:text-primary transition-colors duration-200 mb-3 ${
          featured ? 'text-xl lg:text-2xl' : 'text-lg'
        }`}>
          <Link to={`/blog/${post.slug}`} className="hover:underline">
            {post.title}
          </Link>
        </h2>

        {/* Excerpt */}
        <p className="text-text-secondary leading-relaxed mb-4 line-clamp-3">
          {post.excerpt}
        </p>

        {/* Meta Information */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-text-muted mb-4">
          <div className="flex items-center gap-1">
            <Calendar size={14} />
            <span>{formatDate(post.publishedAt)}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock size={14} />
            <span>{post.readingTime} min read</span>
          </div>
          <div className="flex items-center gap-1">
            <User size={14} />
            <span>{post.author}</span>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {post.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 text-xs rounded-md bg-gray-800/50 text-text-secondary border border-gray-700"
            >
              {tag}
            </span>
          ))}
          {post.tags.length > 3 && (
            <span className="px-2 py-1 text-xs rounded-md bg-gray-800/50 text-text-secondary border border-gray-700">
              +{post.tags.length - 3} more
            </span>
          )}
        </div>

        {/* Read More Link */}
        <Link
          to={`/blog/${post.slug}`}
          className="inline-flex items-center text-primary hover:text-primary-light font-medium transition-colors duration-200"
        >
          Read Article
          <svg
            className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-200"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </article>
  );
};

export default BlogCard;