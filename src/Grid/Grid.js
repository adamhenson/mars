import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { LazyOffscreenImage } from '@foo-software/react-lazy-offscreen-image';
import ScrollContext from '../ScrollContext';
import './Grid.css';

const NO_RESULTS_IMAGE = 'https://hensonism.s3-us-west-2.amazonaws.com/code/2001-space-odyssey.jpg';

const Grid = ({
  photos,
  fetchPhotosAction,
}) => {
  // by passing an empty array as the second argument of the `useEffect` hook
  // we are imitating `componentDidMount` lifecycle method.
  useEffect(() => { fetchPhotosAction() }, []);

  // if no photos show alternative content
  if (!photos.data.length) {
    return (
      <div className="noResults">
        <p>no photos for this day</p>
        <LazyOffscreenImage
          className="noResults__image"
          imageUrl={NO_RESULTS_IMAGE}
          ScrollContext={ScrollContext}
        />
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
