import React from 'react';

import Weather from '../components/Weather';
import Today from '../components/Today';

export default function Home() {
  return (
    <>
      <Weather />
      <Today />
    </>
  );
}
