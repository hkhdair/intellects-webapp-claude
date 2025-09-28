import React, { useState, useMemo } from 'react';
import { Search, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';
import Header from '../Header';
import Footer from '../Footer';
import BlogCard from './BlogCard';
import { blogPosts, blogCategories } from '../../data/blogPosts';

const BlogPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredPosts = useMemo(() => {
    return blogPosts.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesCategory = selectedCategory === 'all' ||
                             post.category.toLowerCase() === selectedCategory.toLowerCase();

      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const featuredPost = blogPosts.find(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  return (
    <div className="min-h-screen flex flex-col bg-background-dark">
      <Header />

      {/* Hero Section */}
      <section className="pt-24 pb-12 md:pt-32 md:pb-16">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="flex items-center justify-center mb-6">
              <BookOpen className="w-12 h-12 text-primary mr-4" />
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
                <span className="gradient-text">Our Blog</span>
              </h1>
            </div>
            <p className="text-xl md:text-2xl text-text-secondary mb-8 leading-relaxed">
              Insights, strategies, and innovations in business automation and AI technology
            </p>
            <p className="text-lg text-text-muted max-w-2xl mx-auto">
              Stay ahead of the curve with expert insights on automation, artificial intelligence,
              and digital transformation strategies that drive business success.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="pb-12">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            {/* Search Bar */}
            <div className="relative mb-8">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-text-muted w-5 h-5" />
              <input
                type="text"
                placeholder="Search articles by title, content, or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-background-light rounded-xl border border-gray-700 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-colors text-text-primary placeholder-text-muted"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-3 justify-center">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === 'all'
                    ? 'bg-primary text-white'
                    : 'bg-background-light text-text-secondary hover:text-primary border border-gray-700 hover:border-primary/50'
                }`}
              >
                All Articles
              </button>
              {blogCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.name)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedCategory === category.name
                      ? 'bg-primary text-white'
                      : 'bg-background-light text-text-secondary hover:text-primary border border-gray-700 hover:border-primary/50'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Blog Posts Section */}
      <section className="pb-20">
        <div className="container">
          {filteredPosts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <BookOpen className="w-16 h-16 text-text-muted mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-text-primary mb-2">No articles found</h3>
              <p className="text-text-secondary">
                Try adjusting your search terms or category filter.
              </p>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              {/* Featured Post */}
              {featuredPost && selectedCategory === 'all' && searchTerm === '' && (
                <div className="mb-16">
                  <h2 className="text-2xl font-bold text-text-primary mb-8 text-center">
                    Featured Article
                  </h2>
                  <div className="grid lg:grid-cols-2 gap-8">
                    <BlogCard post={featuredPost} featured={true} />
                  </div>
                </div>
              )}

              {/* Regular Posts */}
              {regularPosts.length > 0 && (
                <div>
                  {(featuredPost && selectedCategory === 'all' && searchTerm === '') && (
                    <h2 className="text-2xl font-bold text-text-primary mb-8 text-center">
                      Latest Articles
                    </h2>
                  )}
                  <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
                    {regularPosts.map((post) => (
                      <BlogCard key={post.id} post={post} />
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BlogPage;