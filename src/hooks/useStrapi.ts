import { useEffect, useState } from 'react';
import { BlogPost, getBlogPosts, getBlogPostBySlug } from '../services/strapi';

export function useStrapiBlogPosts() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getBlogPosts().then(data => {
      setPosts(data);
      setLoading(false);
    });
  }, []);

  return { posts, loading };
}

export function useStrapiBlogPost(slug?: string) {
  const [post, setPost] = useState<BlogPost | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    getBlogPostBySlug(slug).then(data => {
      setPost(data);
      setLoading(false);
    });
  }, [slug]);

  return { post, loading };
} 