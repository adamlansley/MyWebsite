'use client';

import React from 'react';
import {
  SceneProvider,
  SceneProviderProps,
} from '@/components/scenes/SceneProvider';

export const Scene = (props: SceneProviderProps) => {
  return <SceneProvider {...props} />;
};
