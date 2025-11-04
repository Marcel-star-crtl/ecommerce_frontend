import { useState, useEffect } from 'react';
import { getPageContent } from '../api/pagesApi';

/**
 * Custom hook to fetch and cache page content from CMS
 * @param {string} page - The page identifier (e.g., 'homepage', 'about', 'stores')
 * @returns {object} { content, loading, error }
 */
export function usePageContent(page) {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    async function fetchContent() {
      try {
        setLoading(true);
        const data = await getPageContent(page);
        if (mounted) {
          setContent(data);
          setError(null);
        }
      } catch (err) {
        if (mounted) {
          setError(err);
          console.error(`Error fetching ${page} content:`, err);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    fetchContent();

    return () => {
      mounted = false;
    };
  }, [page]);

  return { content, loading, error };
}

export default usePageContent;
