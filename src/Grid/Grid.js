import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash.get';
import { LazyOffscreenImage } from '@foo-software/react-lazy-offscreen-image';
import { Snackbar } from '@material/react-snackbar';
import '@material/react-snackbar/dist/snackbar.css';
import alternatePhotos from './alternatePhotos';
import ScrollContext from '../ScrollContext';
import './Grid.css';

const SNACKBAR_TIMEOUT = 5000;
const CAMERA_NAME_MIN_CHARACTERS = 4;

const getPhotosFromCamera = ({ cameraName, photos }) => photos.filter(photo => (
  get(photo, 'camera.name') === cameraName
));

// experiment
let timesRendered = 0;

const Grid = ({
  cameraName,
  fetchPhotosAction,
  photos,
}) => {
  // experiment - track times rendered
  timesRendered++;

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

  // if we don't need to filter show the full grid... else filtered.
  let gridPhotos = !cameraName
    ? photos.data
    : getPhotosFromCamera({ cameraName, photos: photos.data });

  return (
    <Fragment>
      <div className="grid__timesRendered">
        Rendered {timesRendered} times
      </div>
      <div className="grid">
        {gridPhotos.map(photo => (
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
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      img_src: PropTypes.string,
      rover: PropTypes.shape({
        name: PropTypes.string,
        status: PropTypes.string,
      }),
    })),
  }),
};

function areEqual(prevProps, nextProps) {
  return (prevProps.photos.date === nextProps.photos.date
    && (prevProps.cameraName === nextProps.cameraName
    || nextProps.cameraName.length <= CAMERA_NAME_MIN_CHARACTERS));
}

export default React.memo(Grid, areEqual);
