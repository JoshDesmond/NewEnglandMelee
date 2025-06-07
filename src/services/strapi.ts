import bannerImg from '../assets/banner.png';

export interface BlogPost {
  id: number;
  title: string;
  author: string;
  date: string;
  excerpt: string;
  slug: string;
  image: string;
  content: any; // Changed to any since it's a blocks array
}

const API_URL = 'https://api.newenglandmelee.xyz/api';
const UPLOAD_URL = 'https://api.newenglandmelee.xyz'; // Base URL for uploads
const API_TOKEN = import.meta.env.VITE_STRAPI_API_KEY;

const headers = {
  'Authorization': `Bearer ${API_TOKEN}`,
  'Content-Type': 'application/json',
};

const getImageUrl = (image: any) => {
  if (!image?.url) return bannerImg;
  // If the URL is already absolute, return it
  if (image.url.startsWith('http')) return image.url;
  // Otherwise, prepend the upload base URL
  return `${UPLOAD_URL}${image.url}`;
};

export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const response = await fetch(`${API_URL}/blogs?populate=*`, { headers });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    // Transform Strapi response to match our BlogPost interface
    return data.data.map((item: any) => ({
      id: item.id,
      title: item.title,
      author: item.author,
      date: item.date,
      excerpt: item.excerpt,
      slug: item.slug.toString(), // Convert to string since it's coming as a number
      image: getImageUrl(item.image),
      content: item.content,
    }));
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return []; // Return empty array on error
  }
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
  try {
    const response = await fetch(`${API_URL}/blogs?filters[slug][$eq]=${slug}&populate=*`, { headers });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    if (!data.data.length) return undefined;
    
    const item = data.data[0];
    return {
      id: item.id,
      title: item.title,
      author: item.author,
      date: item.date,
      excerpt: item.excerpt,
      slug: item.slug.toString(),
      image: getImageUrl(item.image),
      content: item.content,
    };
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return undefined;
  }
}