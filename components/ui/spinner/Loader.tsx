import CircularProgress from '@material-ui/core/CircularProgress';
import React from 'react';

function Loader() {
  return (
    <div className="flex h-full self-center">
      <CircularProgress className="m-auto" />
    </div>
  )
}

export default Loader
