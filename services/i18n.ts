export type Language = 'en' | 'ru';

export const getSystemLanguage = (): Language => {
  if (typeof navigator !== 'undefined' && navigator.language) {
    // Check if the language starts with 'ru' (e.g., 'ru-RU', 'ru')
    return navigator.language.startsWith('ru') ? 'ru' : 'en';
  }
  return 'en';
};

export const currentLang = getSystemLanguage();

export const translations = {
  en: {
    // General
    siteName: 'NewsFlow',
    adminBadge: 'Admin',
    exitToSite: 'Exit to Site',
    latestNews: 'Latest News',
    newsSubtitle: 'Insights into technology, business, and beyond.',
    searchPlaceholder: 'Search articles...',
    all: 'All',
    readArticle: 'Read Article',
    backToNews: 'Back to News',
    views: 'views',
    share: 'Share',
    endOfArticle: 'End of article',
    footerRights: 'NewsFlow Platform. All rights reserved.',
    adminLogin: 'Admin Login',
    latest: 'Latest',
    trending: 'Trending',
    about: 'About',
    noArticles: 'No articles found matching your criteria.',
    
    // Admin Sidebar
    dashboard: 'Dashboard',
    contentEditor: 'Content Editor',
    settings: 'Settings',

    // Admin Dashboard
    totalViews: 'Total Views',
    totalReactions: 'Total Reactions',
    articlesPublished: 'Articles Published',
    trafficOverview: 'Traffic Overview',
    articlesByCategory: 'Articles by Category',
    recentArticles: 'Recent Articles',
    newArticle: 'New Article',
    tableTitle: 'Title',
    tableCategory: 'Category',
    tableViews: 'Views',
    tableDate: 'Date',
    tableActions: 'Actions',
    edit: 'Edit',

    // Content Editor
    editArticle: 'Edit Article',
    createArticle: 'Create New Article',
    titleLabel: 'Title',
    titlePlaceholder: 'Enter article title',
    categoryLabel: 'Category',
    imageLabel: 'Image URL',
    random: 'Random',
    contentLabel: 'Content',
    contentPlaceholder: 'Write your article content here...',
    autoWrite: 'Auto-Write with Gemini',
    excerptLabel: 'Excerpt (Summary)',
    excerptPlaceholder: 'Short summary for the card preview...',
    delete: 'Delete',
    cancel: 'Cancel',
    saveArticle: 'Save Article',
    deleteConfirm: 'Are you sure you want to delete this draft?',
    genError: 'Please enter a title first to generate content.',
    genFail: 'Failed to generate content. Check API Key configuration.',
    
    // Categories
    Technology: 'Technology',
    Business: 'Business',
    Politics: 'Politics',
    Sports: 'Sports',
    Lifestyle: 'Lifestyle',
    Science: 'Science'
  },
  ru: {
    // General
    siteName: 'NewsFlow',
    adminBadge: 'Админ',
    exitToSite: 'На сайт',
    latestNews: 'Последние новости',
    newsSubtitle: 'Инсайты о технологиях, бизнесе и не только.',
    searchPlaceholder: 'Поиск статей...',
    all: 'Все',
    readArticle: 'Читать',
    backToNews: 'Назад к новостям',
    views: 'просмотров',
    share: 'Поделиться',
    endOfArticle: 'Конец статьи',
    footerRights: 'Платформа NewsFlow. Все права защищены.',
    adminLogin: 'Вход для админа',
    latest: 'Последнее',
    trending: 'Популярное',
    about: 'О нас',
    noArticles: 'Статей по вашему запросу не найдено.',

    // Admin Sidebar
    dashboard: 'Дашборд',
    contentEditor: 'Редактор',
    settings: 'Настройки',

    // Admin Dashboard
    totalViews: 'Всего просмотров',
    totalReactions: 'Всего реакций',
    articlesPublished: 'Опубликовано статей',
    trafficOverview: 'Обзор трафика',
    articlesByCategory: 'Статьи по категориям',
    recentArticles: 'Недавние статьи',
    newArticle: 'Новая статья',
    tableTitle: 'Заголовок',
    tableCategory: 'Категория',
    tableViews: 'Просмотры',
    tableDate: 'Дата',
    tableActions: 'Действия',
    edit: 'Ред.',

    // Content Editor
    editArticle: 'Редактировать статью',
    createArticle: 'Создать новую статью',
    titleLabel: 'Заголовок',
    titlePlaceholder: 'Введите заголовок статьи',
    categoryLabel: 'Категория',
    imageLabel: 'URL изображения',
    random: 'Случайно',
    contentLabel: 'Содержание',
    contentPlaceholder: 'Напишите содержание статьи здесь...',
    autoWrite: 'Авто-написание (Gemini)',
    excerptLabel: 'Отрывок (Саммари)',
    excerptPlaceholder: 'Краткое содержание для превью...',
    delete: 'Удалить',
    cancel: 'Отмена',
    saveArticle: 'Сохранить',
    deleteConfirm: 'Вы уверены, что хотите удалить этот черновик?',
    genError: 'Пожалуйста, сначала введите заголовок для генерации.',
    genFail: 'Не удалось сгенерировать. Проверьте настройки API Key.',

    // Categories
    Technology: 'Технологии',
    Business: 'Бизнес',
    Politics: 'Политика',
    Sports: 'Спорт',
    Lifestyle: 'Лайфстайл',
    Science: 'Наука'
  }
};

export const t = translations[currentLang];

// Helper to translate dynamic keys (like categories)
export const translate = (key: string): string => {
  return (t as any)[key] || key;
};