export enum Category {
  TECHNOLOGY = 'Technology',
  BUSINESS = 'Business',
  POLITICS = 'Politics',
  SPORTS = 'Sports',
  LIFESTYLE = 'Lifestyle',
  SCIENCE = 'Science'
}

export enum ViewState {
  PUBLIC_HOME = 'PUBLIC_HOME',
  PUBLIC_ARTICLE = 'PUBLIC_ARTICLE',
  ADMIN_DASHBOARD = 'ADMIN_DASHBOARD',
  ADMIN_EDITOR = 'ADMIN_EDITOR',
  ADMIN_SETTINGS = 'ADMIN_SETTINGS'
}

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: Category;
  author: string;
  imageUrl: string;
  views: number;
  reactions: number;
  createdAt: string; // ISO Date string
  status: 'published' | 'draft';
}

export interface AnalyticsData {
  date: string;
  views: number;
  reactions: number;
}

export interface CategoryStat {
  name: string;
  value: number;
}