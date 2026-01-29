import { Article, Category, AnalyticsData, CategoryStat } from '../types';
import { currentLang } from './i18n';

// Mock Data Initialization
const MOCK_ARTICLES_EN: Article[] = [
  {
    id: '1',
    title: 'The Future of Quantum Computing',
    excerpt: 'How quantum superiority is reshaping the tech landscape in 2024.',
    content: 'Quantum computing is no longer a distant dream. With recent breakthroughs...',
    category: Category.TECHNOLOGY,
    author: 'Alice Johnson',
    imageUrl: 'https://picsum.photos/800/600?random=1',
    views: 12500,
    reactions: 850,
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    status: 'published'
  },
  {
    id: '2',
    title: 'Global Markets Rally Amidst Tech Surge',
    excerpt: 'Investors are optimistic as major tech giants report record earnings.',
    content: 'The S&P 500 hit a new high today as technology stocks led the charge...',
    category: Category.BUSINESS,
    author: 'Mark Smith',
    imageUrl: 'https://picsum.photos/800/600?random=2',
    views: 8400,
    reactions: 320,
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    status: 'published'
  },
  {
    id: '3',
    title: 'Mars Colonization: A Pipe Dream?',
    excerpt: 'Scientists debate the feasibility of a human settlement on the Red Planet.',
    content: 'While SpaceX continues its ambitious starship testing, biologists warn...',
    category: Category.SCIENCE,
    author: 'Dr. Sarah Lee',
    imageUrl: 'https://picsum.photos/800/600?random=3',
    views: 15600,
    reactions: 1200,
    createdAt: new Date(Date.now() - 86400000 * 1).toISOString(),
    status: 'published'
  },
  {
    id: '4',
    title: 'Championship Finals: The Underdog Wins',
    excerpt: 'In a stunning turn of events, the local team takes the trophy home.',
    content: 'The stadium was electric last night as the final whistle blew...',
    category: Category.SPORTS,
    author: 'Tom Brady',
    imageUrl: 'https://picsum.photos/800/600?random=4',
    views: 45000,
    reactions: 5600,
    createdAt: new Date(Date.now() - 86400000 * 0.5).toISOString(),
    status: 'published'
  }
];

const MOCK_ARTICLES_RU: Article[] = [
  {
    id: '1',
    title: 'Будущее квантовых вычислений',
    excerpt: 'Как квантовое превосходство меняет технологический ландшафт в 2024 году.',
    content: 'Квантовые вычисления больше не являются далекой мечтой. Благодаря недавним прорывам в области сверхпроводников, мы стоим на пороге новой эры...',
    category: Category.TECHNOLOGY,
    author: 'Алиса Иванова',
    imageUrl: 'https://picsum.photos/800/600?random=1',
    views: 12500,
    reactions: 850,
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    status: 'published'
  },
  {
    id: '2',
    title: 'Мировые рынки растут на фоне технологического бума',
    excerpt: 'Инвесторы оптимистичны, поскольку крупнейшие технологические гиганты сообщают о рекордных доходах.',
    content: 'Индекс S&P 500 достиг нового максимума сегодня, так как технологические акции возглавили рост...',
    category: Category.BUSINESS,
    author: 'Марк Смирнов',
    imageUrl: 'https://picsum.photos/800/600?random=2',
    views: 8400,
    reactions: 320,
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    status: 'published'
  },
  {
    id: '3',
    title: 'Колонизация Марса: Несбыточная мечта?',
    excerpt: 'Ученые спорят о целесообразности поселения людей на Красной планете.',
    content: 'Пока SpaceX продолжает свои амбициозные испытания звездолетов, биологи предупреждают о радиации...',
    category: Category.SCIENCE,
    author: 'Др. Сара Ли',
    imageUrl: 'https://picsum.photos/800/600?random=3',
    views: 15600,
    reactions: 1200,
    createdAt: new Date(Date.now() - 86400000 * 1).toISOString(),
    status: 'published'
  },
  {
    id: '4',
    title: 'Финал чемпионата: Победа аутсайдера',
    excerpt: 'В потрясающем повороте событий местная команда забирает трофей домой.',
    content: 'Стадион был наэлектризован прошлой ночью, когда прозвучал финальный свисток...',
    category: Category.SPORTS,
    author: 'Том Брэди',
    imageUrl: 'https://picsum.photos/800/600?random=4',
    views: 45000,
    reactions: 5600,
    createdAt: new Date(Date.now() - 86400000 * 0.5).toISOString(),
    status: 'published'
  }
];

const MOCK_ANALYTICS: AnalyticsData[] = Array.from({ length: 7 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() - (6 - i));
  return {
    date: date.toLocaleDateString(currentLang === 'ru' ? 'ru-RU' : 'en-US', { weekday: 'short' }),
    views: Math.floor(Math.random() * 5000) + 1000,
    reactions: Math.floor(Math.random() * 500) + 50,
  };
});

class DataService {
  private articles: Article[] = [];

  constructor() {
    this.articles = currentLang === 'ru' ? [...MOCK_ARTICLES_RU] : [...MOCK_ARTICLES_EN];
  }

  getArticles(search?: string, category?: string): Article[] {
    let result = this.articles;
    if (category && category !== 'All') {
      result = result.filter(a => a.category === category);
    }
    if (search) {
      const lowerSearch = search.toLowerCase();
      result = result.filter(a => 
        a.title.toLowerCase().includes(lowerSearch) || 
        a.excerpt.toLowerCase().includes(lowerSearch)
      );
    }
    return result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  getArticleById(id: string): Article | undefined {
    return this.articles.find(a => a.id === id);
  }

  saveArticle(article: Partial<Article>): Article {
    if (article.id) {
      // Update
      const index = this.articles.findIndex(a => a.id === article.id);
      if (index !== -1) {
        this.articles[index] = { ...this.articles[index], ...article } as Article;
        return this.articles[index];
      }
    }
    // Create
    const newArticle: Article = {
      id: Math.random().toString(36).substr(2, 9),
      title: article.title || 'Untitled',
      excerpt: article.excerpt || '',
      content: article.content || '',
      category: article.category || Category.TECHNOLOGY,
      author: 'Admin User',
      imageUrl: article.imageUrl || `https://picsum.photos/800/600?random=${Math.floor(Math.random() * 100)}`,
      views: 0,
      reactions: 0,
      createdAt: new Date().toISOString(),
      status: article.status || 'draft'
    };
    this.articles.unshift(newArticle);
    return newArticle;
  }

  deleteArticle(id: string): void {
    this.articles = this.articles.filter(a => a.id !== id);
  }

  getAnalytics(): AnalyticsData[] {
    return MOCK_ANALYTICS;
  }

  getCategoryStats(): CategoryStat[] {
    const counts: Record<string, number> = {};
    this.articles.forEach(a => {
      counts[a.category] = (counts[a.category] || 0) + 1;
    });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }
}

export const dataService = new DataService();