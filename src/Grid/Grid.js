import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { LazyOffscreenImage } from '@foo-software/react-lazy-offscreen-image';
import { Snackbar } from '@material/react-snackbar';
import '@material/react-snackbar/dist/snackbar.css';
import alternatePhotos from './alternatePhotos';
import ScrollContext from '../ScrollContext';
import './Grid.css';

const SNACKBAR_TIMEOUT = 5000;

const Grid = ({
  photos,
  fetchPhotosAction,
}) => {
  // by passing an empty array as the second argument of the `useEffect` hook
  // we are imitating `componentDidMount` lifecycle method.
  useEffect(() => { fetchPhotosAction() }, []);

  // if we have data - we don't render a snackbar component... otherwise
  // populate it in the block below.
  let snackbar = null;

  // if no photos show alternate content
  if (!photos.data.length) {
    snackbar = (
      <Snackbar
        actionText="dismiss"
        className="noResults__snackbar"
        key={`snackbar${Date.now()}`}
        message="Sorry, no photos for this day."
        timeoutMs={SNACKBAR_TIMEOUT}
      />
    );

    // alternate space related imagery
    photos.data = alternatePhotos;
  }

  return (
    <Fragment>
      <div className="grid">
        {photos.data.map(photo => (
          <div
            key={photo.id}
            className="grid__cell"
          >
            <figure
              className="grid__figure"
            >
              <LazyOffscreenImage
                className="grid__image"
                imageUrl={photo.img_src}
                ScrollContext={ScrollContext}
              />
              {photo.camera && photo.camera.full_name &&
                <figcaption>
                  <p>{photo.camera.full_name}</p>
                </figcaption>
              }
            </figure>
          </div>
        ))}
      </div>
      {snackbar}
    </Fragment>
  );
};

Grid.propTypes = {
  fetchPhotosAction: PropTypes.func.isRequired,
  photos: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      img_src: PropTypes.string,
      rover: PropTypes.shape({
        name: PropTypes.string,
        status: PropTypes.string,
      }),
    })),
  }),
};

export default Grid;
