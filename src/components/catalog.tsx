'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export function HomeCourses() {
  const [category, setCategory] = useState('All courses');
  const filtered = courses
    .filter((c) => category === 'All courses' || c.category === category)
    .slice(0, 6);
  return (
    <>
      <div
        className="category-tabs flex flex-wrap items-center justify-center gap-2 mb-8 [&_button]:px-[17px] [&_button]:py-[9px] [&_button]:bg-[#f7f7f9] [&_button]:[border:1px_solid_#efeff2] [&_button]:rounded-[25px] [&_button]:text-[10px] [&_button]:text-[#6c6f7b] [&_button]:whitespace-nowrap [&_button:hover]:border-[#aabbea] [&_button:hover]:text-blue [&_button.selected]:bg-lime [&_button.selected]:border-lime [&_button.selected]:text-foreground max-[900px]:gap-1.5 max-[900px]:[&_button]:px-3 max-[900px]:[&_button]:py-2 max-[900px]:[&_button]:text-[9px] max-[540px]:gap-1.5 max-[540px]:mb-[23px] max-[540px]:[&_button]:px-2.5 max-[540px]:[&_button]:py-[7px] max-[540px]:[&_button]:text-[8px]"
        role="tablist"
        aria-label="Course categories"
      >
        {categories.map((c) => (
          <Button
            variant="ghost"
            size="unstyled"
            key={c}
            role="tab"
            aria-selected={category === c}
            className={category === c ? 'selected' : ''}
            onClick={() => setCategory(c)}
          >
            {c}
          </Button>
        ))}
      </div>
      <div className="course-grid grid grid-cols-3 gap-[25px] [&>div]:h-full max-[900px]:grid-cols-2 max-[900px]:gap-5.5 max-[540px]:grid-cols-[1fr] max-[540px]:gap-5">
        {filtered.map((c) => (
          <Reveal key={c.id}>
            <CourseCard course={c} />
          </Reveal>
        ))}
      </div>
      <div className="center-button flex justify-center mt-9">
        <Button
          size="pill"
          className="touch-manipulation [-webkit-tap-highlight-color:transparent] focus-visible:outline-[3px_solid_#87a6ff] focus-visible:outline-offset-[5px] button button-outline"
          asChild
          variant="outline"
        >
          <Link href="/courses">
            Explore all courses <ArrowUpRight size={17} />
          </Link>
        </Button>
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
      <section className="page-banner px-0 py-15 text-center [&_h1]:text-[42px] [&_h1]:font-semibold [&_h1]:tracking-[-1.5px] [&_h1]:leading-[1.3] [&_p]:text-[12px] [&_p]:text-[#c3d1fa] [&_p]:mt-[15px] [&_.eyebrow]:text-[#bed0ff] [&_.eyebrow]:text-[9px] max-[540px]:px-0 max-[540px]:py-10 max-[540px]:[&_h1]:text-[31px] max-[540px]:[&_p]:text-[10px] max-[540px]:[&_.eyebrow]:text-[8px] max-[540px]:[&_.eyebrow]:tracking-[1px] grid-blue bg-blue [background-image:linear-gradient(#ffffff0b_1px,_transparent_1px),_linear-gradient(90deg,_#ffffff0b_1px,_transparent_1px)] [background-size:80px_80px] text-white [&_[data-slot='button']:focus-visible]:shadow-[0_0_0_3px_#ffffff70] search-banner px-0 pt-[55px] pb-15 [&_.search-box]:mt-[25px]">
        <div className="site-container mx-auto w-[min(1120px,_calc(100%_-_80px))] max-[1100px]:w-[calc(100%_-_60px)] max-[900px]:w-[calc(100%_-_48px)] max-[540px]:w-[calc(100%_-_36px)]">
          <span className="eyebrow block text-[10px] tracking-[1.7px] font-semibold mb-4">
            THE NEXT CHAPTER STARTS WITH YOU
          </span>
          <h1 className="font-heading">
            Find your next course<span className="lime-text text-lime">.</span>
          </h1>
          <p>A new skill. A fresh perspective. A world of possibilities.</p>
          <form
            className="search-box py-1.5 mx-auto flex items-center gap-3 bg-white pr-[7px] pl-4.5 rounded-[40px] max-w-[510px] mt-6.5 mb-0 text-muted-foreground shadow-[0_8px_25px_#00175415] [&_input]:flex-1 [&_input]:[border:none] [&_input]:[outline:none] [&_input]:bg-transparent [&_input]:text-foreground [&_input]:text-[11px] [&_input]:w-full [&_input]:h-10 [&_input:focus]:[outline:none] [&:focus-within]:shadow-[0_0_0_3px_#ffffff55] [&_.button]:px-4.5 [&_.button]:py-2.5 [&_.button]:min-h-10 [&_.button]:text-[10px] [&_.button]:gap-4 max-[540px]:py-[5px] max-[540px]:gap-2 max-[540px]:pr-[5px] max-[540px]:pl-[13px] max-[540px]:mt-5.5 max-[540px]:[&_input]:text-[9px] max-[540px]:[&_input]:h-9 max-[540px]:[&>svg]:w-[15px] max-[540px]:[&>svg]:shrink-0 max-[540px]:[&_.button]:px-[13px] max-[540px]:[&_.button]:py-2.5 max-[540px]:[&_.button]:text-[9px] max-[540px]:[&_.button]:gap-[7px] max-[540px]:[&_.button]:min-h-9 max-[540px]:[&_.button_svg]:w-[13px] [&_[data-slot='input']]:shadow-none [&_[data-slot='input']]:rounded-none"
            onSubmit={(e) => {
              e.preventDefault();
              document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <Search size={18} />
            <Input
              aria-label="Search courses"
              placeholder="What do you want to learn?"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                resetPage();
              }}
            />
            {query && (
              <Button
                variant="ghost"
                size="unstyled"
                className="clear-search p-1 bg-transparent text-[#8991a2]"
                type="button"
                aria-label="Clear search"
                onClick={() => {
                  setQuery('');
                  resetPage();
                }}
              >
                <X size={16} />
              </Button>
            )}
            <Button
              variant="lime"
              size="pill"
              className="button [&.small]:px-[17px] [&.small]:py-[9px] [&.small]:min-h-9 [&.small]:gap-3.5 [&.small]:text-[11px] button-lime"
            >
              Search
              <ArrowUpRight size={16} />
            </Button>
          </form>
        </div>
      </section>
      <section
        id="catalog"
        className="catalog pt-10 [&_.category-tabs]:justify-start [&_.category-tabs]:gap-[7px] max-[540px]:pt-[25px] max-[540px]:[&_.category-tabs]:justify-start section-space py-22.5 max-[900px]:py-[65px] max-[540px]:py-13"
      >
        <div className="site-container mx-auto w-[min(1120px,_calc(100%_-_80px))] max-[1100px]:w-[calc(100%_-_60px)] max-[900px]:w-[calc(100%_-_48px)] max-[540px]:w-[calc(100%_-_36px)]">
          <div className="catalog-toolbar flex items-center gap-5 pb-[23px] [border-bottom:1px_solid_var(--color-line)] mb-[23px] max-[540px]:gap-2.5 max-[540px]:flex-wrap">
            <Button
              variant="ghost"
              size="unstyled"
              className={`filter-button px-[15px] py-[9px] flex items-center gap-2 text-[11px] [border:1px_solid_var(--color-line)] rounded-[10px] bg-white min-h-10 [&.active]:border-blue [&.active]:text-blue max-[540px]:text-[10px] ${filters ? 'active' : ''}`}
              onClick={() => setFilters(!filters)}
              aria-expanded={filters}
            >
              <SlidersHorizontal size={16} /> Filters
            </Button>
            <span className="result-count text-[10px] text-muted-foreground max-[540px]:text-[9px] max-[540px]:ml-auto">
              Showing {filtered.length} courses
              {query && (
                <>
                  {' '}
                  for <strong>“{query}”</strong>
                </>
              )}
            </span>
            <div className="sort-select ml-auto flex items-center text-[10px] text-muted-foreground gap-3 [&_select]:p-[5px] [&_select]:border-0 [&_select]:bg-white [&_select]:text-foreground [&_select]:text-[10px] max-[540px]:w-full max-[540px]:justify-end max-[540px]:mt-1">
              <span id="sort-label">Sort by</span>
              <Select
                value={sort}
                onValueChange={(value) => {
                  setSort(value);
                  resetPage();
                }}
              >
                <SelectTrigger
                  aria-labelledby="sort-label"
                  className="catalog-select [[data-slot='select-trigger']&]:px-[13px] [[data-slot='select-trigger']&]:py-2.5 [[data-slot='select-trigger']&]:h-10 [[data-slot='select-trigger']&]:min-w-42.5 [[data-slot='select-trigger']&]:[border:1px_solid_#e0e5ef] [[data-slot='select-trigger']&]:rounded-[10px] [[data-slot='select-trigger']&]:bg-white [[data-slot='select-trigger']&]:text-foreground [[data-slot='select-trigger']&]:text-[11px] [[data-slot='select-trigger']&]:shadow-[0_2px_4px_#13295704] [[data-slot='select-trigger']&:hover]:border-[#a5b8ed] [[data-slot='select-trigger']&:hover]:bg-[#fafbff] [[data-slot='select-trigger']&[data-state='open']]:border-blue [[data-slot='select-trigger']&[data-state='open']]:shadow-[0_0_0_3px_#003be214] max-[540px]:[[data-slot='select-trigger']&]:min-w-37.5 max-[540px]:[[data-slot='select-trigger']&]:text-[10px]"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent position="popper" sideOffset={8}>
                  <SelectItem value="popular">Most popular</SelectItem>
                  <SelectItem value="rating">Highest rated</SelectItem>
                  <SelectItem value="price-low">Price: low to high</SelectItem>
                  <SelectItem value="price-high">Price: high to low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          {filters && (
            <div className="filter-panel p-5 bg-[#f8f9fc] flex items-center gap-7.5 mb-5 rounded-[12px] [border:1px_solid_#e9edf5] [&_label]:text-[10px] [&_label]:flex [&_label]:gap-[15px] [&_label]:items-center [&_select]:p-[9px] [&_select]:[border:1px_solid_var(--color-line)] [&_select]:bg-white [&_select]:rounded-[5px] [&_select]:text-[10px] [&_.text-link]:ml-auto [&_.text-link]:text-[10px] max-[540px]:p-[15px] max-[540px]:gap-3 max-[540px]:items-end max-[540px]:[&_label]:text-[9px] max-[540px]:[&_label]:gap-[7px] max-[540px]:[&_select]:p-[7px] max-[540px]:[&_select]:text-[9px] max-[540px]:[&_.text-link]:text-[8px] max-[540px]:[&_.text-link]:gap-[3px]">
              <div className="filter-field flex items-center gap-3.5 text-[11px] max-[540px]:items-start max-[540px]:flex-col max-[540px]:gap-2 max-[540px]:text-[10px]">
                <span id="level-label">Experience level</span>
                <Select
                  value={level}
                  onValueChange={(value) => {
                    setLevel(value);
                    resetPage();
                  }}
                >
                  <SelectTrigger
                    aria-labelledby="level-label"
                    className="catalog-select [[data-slot='select-trigger']&]:px-[13px] [[data-slot='select-trigger']&]:py-2.5 [[data-slot='select-trigger']&]:h-10 [[data-slot='select-trigger']&]:min-w-42.5 [[data-slot='select-trigger']&]:[border:1px_solid_#e0e5ef] [[data-slot='select-trigger']&]:rounded-[10px] [[data-slot='select-trigger']&]:bg-white [[data-slot='select-trigger']&]:text-foreground [[data-slot='select-trigger']&]:text-[11px] [[data-slot='select-trigger']&]:shadow-[0_2px_4px_#13295704] [[data-slot='select-trigger']&:hover]:border-[#a5b8ed] [[data-slot='select-trigger']&:hover]:bg-[#fafbff] [[data-slot='select-trigger']&[data-state='open']]:border-blue [[data-slot='select-trigger']&[data-state='open']]:shadow-[0_0_0_3px_#003be214] max-[540px]:[[data-slot='select-trigger']&]:min-w-37.5 max-[540px]:[[data-slot='select-trigger']&]:text-[10px]"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent position="popper" sideOffset={8}>
                    <SelectItem value="All levels">All levels</SelectItem>
                    <SelectItem value="Beginner">Beginner</SelectItem>
                    <SelectItem value="Intermediate">Intermediate</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button
                variant="ghost"
                size="unstyled"
                className="text-link inline-flex items-center gap-[15px] text-blue text-[12px] font-medium bg-transparent [&:hover]:gap-[21px]"
                onClick={() => {
                  setLevel('All levels');
                  setCategory('All courses');
                  setQuery('');
                  resetPage();
                }}
              >
                Reset filters <X size={14} />
              </Button>
            </div>
          )}
          <div
            className="category-tabs flex flex-wrap items-center justify-center gap-2 mb-8 [&_button]:px-[17px] [&_button]:py-[9px] [&_button]:bg-[#f7f7f9] [&_button]:[border:1px_solid_#efeff2] [&_button]:rounded-[25px] [&_button]:text-[10px] [&_button]:text-[#6c6f7b] [&_button]:whitespace-nowrap [&_button:hover]:border-[#aabbea] [&_button:hover]:text-blue [&_button.selected]:bg-lime [&_button.selected]:border-lime [&_button.selected]:text-foreground max-[900px]:gap-1.5 max-[900px]:[&_button]:px-3 max-[900px]:[&_button]:py-2 max-[900px]:[&_button]:text-[9px] max-[540px]:gap-1.5 max-[540px]:mb-[23px] max-[540px]:[&_button]:px-2.5 max-[540px]:[&_button]:py-[7px] max-[540px]:[&_button]:text-[8px]"
            role="tablist"
            aria-label="Filter by category"
          >
            {categories.map((c) => (
              <Button
                variant="ghost"
                size="unstyled"
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
              </Button>
            ))}
          </div>
          {filtered.length ? (
            <div className="course-grid grid grid-cols-3 gap-[25px] [&>div]:h-full max-[900px]:grid-cols-2 max-[900px]:gap-5.5 max-[540px]:grid-cols-[1fr] max-[540px]:gap-5">
              {filtered.slice((page - 1) * pageSize, page * pageSize).map((c) => (
                <CourseCard key={c.id} course={c} />
              ))}
            </div>
          ) : (
            <div className="empty-state px-5 py-[65px] text-center text-muted-foreground [&>svg]:m-auto [&>svg]:text-[#a2b1d5] [&_h2]:mx-0 [&_h2]:text-[22px] [&_h2]:text-foreground [&_h2]:mt-5 [&_h2]:mb-2.5 [&_p]:text-[12px] [&_p]:leading-[1.8] [&_.button]:mt-5.5">
              <Search size={38} />
              <h2 className="font-heading">A little more exploring?</h2>
              <p>No courses match these filters. Try another topic or reset your search.</p>
              <Button
                variant="lime"
                size="pill"
                className="button [&.small]:px-[17px] [&.small]:py-[9px] [&.small]:min-h-9 [&.small]:gap-3.5 [&.small]:text-[11px] button-lime"
                onClick={() => {
                  setQuery('');
                  setCategory('All courses');
                  setLevel('All levels');
                }}
              >
                Show all courses
              </Button>
            </div>
          )}
          {pages > 1 && (
            <nav
              className="pagination flex items-center justify-center gap-2 mt-[45px] [&_button]:grid [&_button]:place-items-center [&_button]:w-[31px] [&_button]:h-[31px] [&_button]:rounded-[50%] [&_button]:bg-white [&_button]:text-[11px] [&_button.selected]:bg-lime [&_button:hover:not(:disabled)]:bg-[#eef3da]"
              aria-label="Course pages"
            >
              <Button
                variant="ghost"
                size="unstyled"
                disabled={page === 1}
                aria-label="Previous page"
                onClick={() => setPage((p) => p - 1)}
              >
                <ChevronLeft size={16} />
              </Button>
              {Array.from({ length: pages }, (_, i) => (
                <Button
                  variant="ghost"
                  size="unstyled"
                  key={i}
                  aria-current={page === i + 1 ? 'page' : undefined}
                  className={page === i + 1 ? 'selected' : ''}
                  onClick={() => setPage(i + 1)}
                >
                  {i + 1}
                </Button>
              ))}
              <Button
                variant="ghost"
                size="unstyled"
                disabled={page === pages}
                aria-label="Next page"
                onClick={() => setPage((p) => p + 1)}
              >
                <ChevronRight size={16} />
              </Button>
            </nav>
          )}
        </div>
      </section>
    </>
  );
}
