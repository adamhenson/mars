import React, { Fragment, useMemo } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash.get';
import { LazyOffscreenImage } from '@foo-software/react-lazy-offscreen-image';
import { Snackbar } from '@material/react-snackbar';
import '@material/react-snackbar/dist/snackbar.css';
import alternatePhotos from './alternatePhotos';
import ScrollContext from '../ScrollContext';
import './Grid.css';

const SNACKBAR_TIMEOUT = 5000;

// experiment
let timesRendered = 0;
let timesBigFunctionCalled = 0;

const getPhotosByCameraName = ({ cameraName, photos }) => {
  timesBigFunctionCalled++;
  return photos.filter(photo => get(photo, 'camera.name') === cameraName);
};

const Grid = ({ cameraName, photos }) => {
  // experiment - track times rendered
  timesRendered++;

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
    : useMemo(
        () =>
          getPhotosByCameraName({
            cameraName,
            photos: photos.data
          }),
        [cameraName, photos.date]
      );

  // if we've filtered and have no results - show all
  if (!gridPhotos.length && photos.data.length) {
    gridPhotos = photos.data;
  }

  return (
    <Fragment>
      <h2>
        Rendered {timesRendered} times, big function called{' '}
        {timesBigFunctionCalled} times
      </h2>
      <div className="grid">
        {gridPhotos.map(photo => (
          <div key={photo.id} className="grid__cell">
            <figure className="grid__figure">
              <LazyOffscreenImage
                className="grid__image"
                imageUrl={photo.img_src}
                ScrollContext={ScrollContext}
              />
              {photo.camera && photo.camera.full_name && (
                <figcaption>
                  <p>{photo.camera.full_name}</p>
                </figcaption>
              )}
            </figure>
          </div>
        ))}
      </div>
      {snackbar}
    </Fragment>
  );
};

Grid.propTypes = {
  photos: PropTypes.shape({
    data: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        img_src: PropTypes.string,
        rover: PropTypes.shape({
          name: PropTypes.string,
          status: PropTypes.string
        })
      })
    )
  })
};

function areEqual(prevProps, nextProps) {
  return (
    prevProps.photos.date === nextProps.photos.date &&
    prevProps.cameraName === nextProps.cameraName
  );
}

export default React.memo(Grid, areEqual);
