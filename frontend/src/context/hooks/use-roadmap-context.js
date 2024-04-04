import { useContext } from 'react';

import { MapContext } from '../roadmap/map-context';

// ----------------------------------------------------------------------

export const useMapContext = () => {
  const context = useContext(MapContext);

  if (!context) throw new Error('useMapContext context must be use inside MapProvider');

  return context;
};
