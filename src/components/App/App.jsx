import React, { Component } from 'react';
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

class App extends Component {
  state = {
    value: '',
    gallery: [],

    showModal: false,
    modalData: { img: DefaultImg },

    page: 1,
    totalPages: 0,

    status: 'idle',
    error: null,

    // isLoading: false,  // Варіант 2
  };

  componentDidUpdate(prevProps, prevState) {
    const { page } = this.state;
    const prevName = prevState.value;
    const nextName = this.state.value;

    if (prevName !== nextName || prevState.page !== page) {
      this.setState({ status: 'pending' });

      // this.setState({ isLoading: true });  // Варіант 2

      if (this.state.error) {
        this.setState({ error: null });
      }

      ApiService(nextName, page)
        .then(gallery => {
          this.setState(prevState => ({
            gallery:
              page === 1
                ? gallery.hits
                : [...prevState.gallery, ...gallery.hits],
            totalPages: Math.floor(gallery.totalHits / 12),
            status: 'resolved',
          }));
        })
        .catch(error => this.setState({ error, status: 'rejected' }))
        .finally(() => {
          this.setState({ isLoading: false });
        });
    }
  }

  formResetSubmit = value => {
    this.setState({
      page: 1,
    });
    this.setState({
      gallery: [],
    });
    this.setState({
      value,
    });
  };

  showModal = modalData => {
    this.setState({ modalData, showModal: true });
  };

  loadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  onClose = () => {
    this.setState({ showModal: false });
  };

  // Варіант 2

  // render() {
  //   const {
  //     gallery,
  //     error,
  //     status,
  //     page,
  //     totalPages,
  //     showModal,
  //     modalData,
  //     isLoading,
  //   } = this.state;

  //   return (
  //     <div>
  //       <SearchBar
  //         onSubmit={this.formResetSubmit}
  //         resetPage={page}
  //         resetGallery={gallery}
  //       />
  //        {isLoading && <Loader />}
  //       { (
  //         <ImageGallery gallery={gallery} showModal={this.showModal} />
  //       )}
  //       {showModal && <Modal modalData={modalData} onClose={this.onClose} />}
  //       {gallery.length > 0 && status !== 'pending' && page <= totalPages && (
  //         <Button onClick={this.loadMore}>Load More</Button>
  //       )}
  //     </div>
  //   );
  // }

  render() {
    const { gallery, error, status, page, totalPages, showModal, modalData } =
      this.state;

    if (status === 'idle') {
      return (
        <>
          <ToastContainer />

          <SearchBar
            onSubmit={this.formResetSubmit}
            resetPage={page}
            resetGallery={gallery}
          />

          <DefaultGallery text="Let`s find images!" />
        </>
      );
    }

    if (status === 'pending') {
      return (
        <>
          <SearchBar
            onSubmit={this.formResetSubmit}
            resetPage={page}
            resetGallery={gallery}
          />

          <Loader />

          <ImageGallery gallery={gallery} showModal={this.showModal} />

          {gallery.length > 0 && status !== 'pending' && page <= totalPages && (
            <Button onClick={this.loadMore}>Load More</Button>
          )}
        </>
      );
    }

    if (status === 'rejected') {
      return (
        <>
          <SearchBar
            onSubmit={this.formResetSubmit}
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
            onSubmit={this.formResetSubmit}
            resetPage={page}
            resetGallery={gallery}
          />
          <ImageErrorView
            message={`Oops... there are no images matching your search... `}
          />
        </>
      );
    }

    if (status === 'resolved') {
      return (
        <>
          <ToastContainer />

          <SearchBar
            onSubmit={this.formResetSubmit}
            resetPage={page}
            resetGallery={gallery}
          />

          <ImageGallery gallery={gallery} showModal={this.showModal} />

          {gallery.length > 0 && status !== 'pending' && page <= totalPages && (
            <Button onClick={this.loadMore}>Load More</Button>
          )}

          {showModal && <Modal modalData={modalData} onClose={this.onClose} />}
        </>
      );
    }
  }
}

export default App;
