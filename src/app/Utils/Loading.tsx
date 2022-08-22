import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import { useState } from 'react';
import React from 'react';

export default function FullScreenLoading() {
  return (
    <div>
      <Backdrop
        sx={{ color: '#fff', zIndex: 10 }}
        open={true}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
