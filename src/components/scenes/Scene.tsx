'use client';

import React from 'react';
import {
  SceneDataProvider,
  SceneDataProviderProps,
} from '@/providers/scene/SceneDataProvider';

export const Scene = (props: SceneDataProviderProps) => {
  return <SceneDataProvider {...props} />;
};
