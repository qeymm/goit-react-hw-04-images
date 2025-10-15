import { Component } from 'react';
import { Button } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import { Loader } from './Loader/Loader';
import style from './App.module.css';
import { getAPI } from '../pixabay-api';
import toast, { Toaster } from 'react-hot-toast';

export class App extends Component {
  state = {
    search: '',
    images: [],
    page: 1,
    query: '',
    isLoading: false,
    isError: false,
    isEnd: false,
  };

  componentDidUpdate = async (_prevProps, prevState) => {
    const { search, page } = this.state;

    if (prevState.search !== search || prevState.page !== page) {
      await this.fetchImages(search, page);
    }
  };

  fetchImages = async (search, page) => {
    try {
      this.setState({ isLoading: true });
      this.setState({ isError: false });

      const fetchedImages = await getAPI(search, page);
      const { hits, totalHits } = fetchedImages;

      if (hits.length === 0) {
        toast.error(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        return;
      }

      if (page === 1) {
        toast.success(`Hooray! We found ${totalHits} images.`);
      }

      if (page * 12 >= totalHits) {
        this.setState({ isEnd: true });
        toast("We're sorry, but you've reached the end of search results.", {
          icon: '🙁',
          style: {
            borderRadius: '10px',
            background: '#363636',
            color: '#fff',
          },
        });
      }

      this.setState(prevState => ({
        images: [...prevState.images, ...hits],
      }));
    } catch {
      this.setState({ isError: true });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    const newSearch = e.target.search.value.trim().toLowerCase();

    if (newSearch === '') {
      toast.error('Please enter a search query.');
      return;
    }

    this.setState({ search: newSearch, page: 1, images: [], isEnd: false });
  };

  handleClick = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { images, isLoading, isError, isEnd } = this.state;
    return (
      <div className={style.app}>
        <Searchbar onSubmit={this.handleSubmit} />
        {}
        {images.length >= 1 && <ImageGallery photos={images} />}

        {}
        {images.length >= 1 && !isEnd && <Button onClick={this.handleClick} />}
        {isLoading && <Loader />}
        {isError &&
          toast.error('Oops, something went wrong. Please try again.')}
        <Toaster position="top-right" reverseOrder={false} />
      </div>
    );
  }
}
