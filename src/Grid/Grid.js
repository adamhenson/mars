import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { LazyOffscreenImage } from '@foo-software/react-lazy-offscreen-image';
import ScrollContext from '../ScrollContext';
import noResultsImage from './2001-space-odyssey.jpg';
import './Grid.css';

const Grid = ({
  photos,
  fetchPhotosAction,
}) => {
  // by passing an empty array as the second argument of the `useEffect` hook
  // we are imitating `componentDidMount` lifecycle method.
  useEffect(() => { fetchPhotosAction() }, []);

  if (!photos.data.length) {
    return (
      <div className="noResults">
        <LazyOffscreenImage
          className="noResults__image"
          imageUrl={noResultsImage}
          ScrollContext={ScrollContext}
        />
        <p>no photos for this day</p>
      </div>
    );
  }

  return (
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
