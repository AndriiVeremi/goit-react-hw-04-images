import { useState, useEffect } from 'react';
import DefaultGallery from 'components/DefaultGallery/DefaultGallery';
import ApiService from '../../ApiService/ApiService';
import Loader from 'components/Loader/Loader';
import ImageErrorView from '../ErrorGallery/ErrorGallery';
import SearchBar from 'components/SearchBar/SearchBar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import Modal from '../Modal/Modal';
import Button from '../Button/Button';
import DefaultImg from '../../images/search.jpg';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};


function App() {
  const [value, setValue] = useState('');
  const [gallery, setGallery] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({ img: DefaultImg });

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const [status, setStatus] = useState(Status.IDLE);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (value === '') {
      return;
    }

    if (error) {
      setError(null);
    }

    setStatus(Status.PENDING);

    ApiService(value, page)
      .then(gallery => {
        setGallery(prevState => [...prevState, ...gallery.hits]);
        setTotalPages(Math.floor(gallery.totalHits / 12));
        setStatus(Status.RESOLVED);
      })
      .catch(error => {
        setError(error)
        setStatus(Status.REJECTED);
      })
  }, [value, page, error]);

  const formResetSubmit = value => {
    setPage(1);
    setGallery([]);
    setValue(value);
  };

  const showModals = modalData => {
    setShowModal(true);
    setModalData(modalData);
  };

  const loadMore = () => {
    setPage(page => page + 1);
  };

  const onClose = () => {
    setShowModal(false);
  };

    if (status === Status.IDLE) {
      return (
        <>
          <ToastContainer />

          <SearchBar
            onSubmit={formResetSubmit}
            resetPage={page}
            resetGallery={gallery}
          />

          <DefaultGallery text="Let's go find images!" />
        </>
      );
    }

    if (status === Status.PENDING) {
      return (
        <>
          <SearchBar
            onSubmit={formResetSubmit}
            resetPage={page}
            resetGallery={gallery}
          />

          <Loader />

          <ImageGallery gallery={gallery} showModal={showModals} />

          {gallery.length > 0 && status !== 'pending' && page <= totalPages && (
            <Button onClick={loadMore}>Load More</Button>
          )}
        </>
      );
    }

    if (status === Status.REJECTED) {
      return (
        <>
          <SearchBar
            onSubmit={formResetSubmit}
            resetPage={page}
            resetGallery={gallery}
          />
          <ImageErrorView message={error.message} />
        </>
      );
    }

    if (gallery.length === 0) {
      return (
        <>
          <SearchBar
            onSubmit={formResetSubmit}
            resetPage={page}
            resetGallery={gallery}
          />
          <ImageErrorView
            message={`Oops... there are no images matching your search... `}
          />
        </>
      );
    }

    if (status === Status.RESOLVED) {
      return (
        <>
          <ToastContainer />

          <SearchBar
            onSubmit={formResetSubmit}
            resetPage={page}
            resetGallery={gallery}
          />

          <ImageGallery gallery={gallery} showModal={showModals} />

          {gallery.length > 0 && status !== 'pending' && page <= totalPages && (
            <Button onClick={loadMore}>Load More</Button>
          )}

          {showModal && <Modal modalData={modalData} onClose={onClose} />}
        </>
      );
    }
}

export default App;
