// SPDX-License-Identifier: AGPL-3.0-only

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: string;
  updatedAt: string;
  tags: string[];
  category: 'blog' | 'guide' | 'news';
  featured: boolean;
  readingTime: number;
}

export interface CountryGuide {
  id: string;
  country: string;
  countryCode: string;
  content: string;
  regulations: Regulation[];
  lastUpdated: string;
  author: string;
}

export interface Regulation {
  type: 'licensing' | 'tax' | 'compliance' | 'restriction';
  title: string;
  description: string;
  effectiveDate: string;
  source: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'verification' | 'safety' | 'technical' | 'legal';
  order: number;
}

export interface BusinessInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
  hours: string;
  registrationNumber?: string;
}

export interface Comment {
  id: string;
  articleId: string;
  author: string;
  email: string;
  content: string;
  createdAt: string;
  approved: boolean;
}
