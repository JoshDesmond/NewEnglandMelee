import bannerImg from '../assets/banner.png';

export interface BlogPost {
  id: number;
  title: string;
  author: string;
  date: string;
  excerpt: string;
  slug: string;
  image: string;
  content: string;
}

const mockPosts: BlogPost[] = [
  {
    id: 1,
    title: 'Sample Post 1',
    author: 'Jane Doe',
    date: '2024-06-01',
    excerpt: 'This is a sample blog post with a short preview of the content.',
    slug: 'sample-post-1',
    image: bannerImg,
    content: 'Full content for Sample Post 1. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, nisi eu consectetur...'
  },
  {
    id: 2,
    title: 'Sample Post 2',
    author: 'John Smith',
    date: '2024-06-02',
    excerpt: 'Another sample blog post with a different preview.',
    slug: 'sample-post-2',
    image: bannerImg,
    content: 'Full content for Sample Post 2. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...'
  },
];

export async function getBlogPosts(): Promise<BlogPost[]> {
  // Simulate async fetch
  return new Promise(resolve => setTimeout(() => resolve(mockPosts), 300));
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
  // Simulate async fetch
  return new Promise(resolve => setTimeout(() => resolve(mockPosts.find(p => p.slug === slug)), 300));
}