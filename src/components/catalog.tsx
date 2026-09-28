'use client';
import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Search,
  SlidersHorizontal,
  X,
} from 'lucide-react';
import { categories, courses } from '@/lib/courses';
import { CourseCard, Reveal } from './ui';

export function HomeCourses() {
  const [category, setCategory] = useState('All courses');
  const filtered = courses
    .filter((c) => category === 'All courses' || c.category === category)
    .slice(0, 6);
  return (
    <>
      <div className="category-tabs" role="tablist" aria-label="Course categories">
        {categories.map((c) => (
          <button
            key={c}
            role="tab"
            aria-selected={category === c}
            className={category === c ? 'selected' : ''}
            onClick={() => setCategory(c)}
          >
            {c}
          </button>
        ))}
      </div>
      <div className="course-grid">
        {filtered.map((c) => (
          <Reveal key={c.id}>
            <CourseCard course={c} />
          </Reveal>
        ))}
      </div>
      <div className="center-button">
        <Link href="/courses" className="button button-outline">
          Explore all courses <ArrowUpRight size={17} />
        </Link>
      </div>
    </>
  );
}

export function CourseCatalog({
  initialQuery = '',
  initialCategory = 'All courses',
}: {
  initialQuery?: string;
  initialCategory?: string;
}) {
  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState(
    categories.includes(initialCategory) ? initialCategory : 'All courses',
  );
  const [sort, setSort] = useState('popular');
  const [level, setLevel] = useState('All levels');
  const [filters, setFilters] = useState(false);
  const [page, setPage] = useState(1);
  const filtered = courses
    .filter(
      (c) =>
        (category === 'All courses' || c.category === category) &&
        (level === 'All levels' || c.level === level) &&
        `${c.title} ${c.category} ${c.teacher}`.toLowerCase().includes(query.toLowerCase()),
    )
    .sort((a, b) =>
      sort === 'price-low'
        ? a.price - b.price
        : sort === 'price-high'
          ? b.price - a.price
          : sort === 'rating'
            ? Number(b.rating) - Number(a.rating)
            : 0,
    );
  const pageSize = 6;
  const pages = Math.ceil(filtered.length / pageSize);
  function resetPage() {
    setPage(1);
  }
  return (
    <>
      <section className="page-banner grid-blue search-banner">
        <div className="container">
          <span className="eyebrow">THE NEXT CHAPTER STARTS WITH YOU</span>
          <h1>
            Find your next course<span className="lime-text">.</span>
          </h1>
          <p>A new skill. A fresh perspective. A world of possibilities.</p>
          <form
            className="search-box"
            onSubmit={(e) => {
              e.preventDefault();
              document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <Search size={18} />
            <input
              aria-label="Search courses"
              placeholder="What do you want to learn?"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                resetPage();
              }}
            />
            {query && (
              <button
                className="clear-search"
                type="button"
                aria-label="Clear search"
                onClick={() => {
                  setQuery('');
                  resetPage();
                }}
              >
                <X size={16} />
              </button>
            )}
            <button className="button button-lime">
              Search
              <ArrowUpRight size={16} />
            </button>
          </form>
        </div>
      </section>
      <section id="catalog" className="catalog section-space">
        <div className="container">
          <div className="catalog-toolbar">
            <button
              className={`filter-button ${filters ? 'active' : ''}`}
              onClick={() => setFilters(!filters)}
              aria-expanded={filters}
            >
              <SlidersHorizontal size={16} /> Filters
            </button>
            <span className="result-count">
              Showing {filtered.length} courses
              {query && (
                <>
                  {' '}
                  for <strong>“{query}”</strong>
                </>
              )}
            </span>
            <label className="sort-select">
              Sort by:{' '}
              <select
                value={sort}
                onChange={(e) => {
                  setSort(e.target.value);
                  resetPage();
                }}
              >
                <option value="popular">Most popular</option>
                <option value="rating">Highest rated</option>
                <option value="price-low">Price: low to high</option>
                <option value="price-high">Price: high to low</option>
              </select>
            </label>
          </div>
          {filters && (
            <div className="filter-panel">
              <label>
                Experience level
                <select
                  value={level}
                  onChange={(e) => {
                    setLevel(e.target.value);
                    resetPage();
                  }}
                >
                  <option>All levels</option>
                  <option>Beginner</option>
                  <option>Intermediate</option>
                </select>
              </label>
              <button
                className="text-link"
                onClick={() => {
                  setLevel('All levels');
                  setCategory('All courses');
                  setQuery('');
                  resetPage();
                }}
              >
                Reset filters <X size={14} />
              </button>
            </div>
          )}
          <div className="category-tabs" role="tablist" aria-label="Filter by category">
            {categories.map((c) => (
              <button
                key={c}
                role="tab"
                aria-selected={category === c}
                className={category === c ? 'selected' : ''}
                onClick={() => {
                  setCategory(c);
                  resetPage();
                }}
              >
                {c}
              </button>
            ))}
          </div>
          {filtered.length ? (
            <div className="course-grid">
              {filtered.slice((page - 1) * pageSize, page * pageSize).map((c) => (
                <CourseCard key={c.id} course={c} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <Search size={38} />
              <h2>A little more exploring?</h2>
              <p>No courses match these filters. Try another topic or reset your search.</p>
              <button
                className="button button-lime"
                onClick={() => {
                  setQuery('');
                  setCategory('All courses');
                  setLevel('All levels');
                }}
              >
                Show all courses
              </button>
            </div>
          )}
          {pages > 1 && (
            <nav className="pagination" aria-label="Course pages">
              <button
                disabled={page === 1}
                aria-label="Previous page"
                onClick={() => setPage((p) => p - 1)}
              >
                <ChevronLeft size={16} />
              </button>
              {Array.from({ length: pages }, (_, i) => (
                <button
                  key={i}
                  aria-current={page === i + 1 ? 'page' : undefined}
                  className={page === i + 1 ? 'selected' : ''}
                  onClick={() => setPage(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
              <button
                disabled={page === pages}
                aria-label="Next page"
                onClick={() => setPage((p) => p + 1)}
              >
                <ChevronRight size={16} />
              </button>
            </nav>
          )}
        </div>
      </section>
    </>
  );
}
