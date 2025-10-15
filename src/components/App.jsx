import { useEffect, useState, useCallback } from 'react';
import { Button } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import { Loader } from './Loader/Loader';
import style from './App.module.css';
import { getAPI } from '../pixabay-api';
import toast, { Toaster } from 'react-hot-toast';

export function App() {
  const [search, setSearch] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isEnd, setIsEnd] = useState(false);

  const fetchImages = useCallback(async (searchQuery, currentPage) => {
    try {
      setIsLoading(true);
      setIsError(false);

      const fetchedImages = await getAPI(searchQuery, currentPage);
      const { hits, totalHits } = fetchedImages;

      if (hits.length === 0) {
        toast.error(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        return;
      }

      if (currentPage === 1) {
        toast.success(`Hooray! We found ${totalHits} images.`);
      }

      if (currentPage * 12 >= totalHits) {
        setIsEnd(true);
        toast("We're sorry, but you've reached the end of search results.", {
          icon: '🙁',
          style: {
            borderRadius: '10px',
            background: '#363636',
            color: '#fff',
          },
        });
      }

      setImages(prev => [...prev, ...hits]);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!search) return;
    let cancelled = false;

    const run = async () => {
      await fetchImages(search, page);
    };

    if (!cancelled) {
      run();
    }

    return () => {
      cancelled = true;
    };
  }, [search, page, fetchImages]);

  const handleSubmit = e => {
    e.preventDefault();
    const newSearch = e.target.search.value.trim().toLowerCase();

    if (newSearch === '') {
      toast.error('Please enter a search query.');
      return;
    }

    setSearch(newSearch);
    setPage(1);
    setImages([]);
    setIsEnd(false);
  };

  const handleClick = () => {
    setPage(prev => prev + 1);
  };

  return (
    <div className={style.app}>
      <Searchbar onSubmit={handleSubmit} />
      {}
      {images.length >= 1 && <ImageGallery photos={images} />}

      {}
      {images.length >= 1 && !isEnd && <Button onClick={handleClick} />}
      {isLoading && <Loader />}
      {isError && toast.error('Oops, something went wrong. Please try again.')}
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
}
