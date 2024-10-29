import React, { createContext, useCallback, useContext, useMemo } from 'react';
import Matter from 'matter-js';
import * as PIXI from 'pixi.js';
import {
  SceneObject,
  useSceneDataContext,
} from '@/providers/scene/SceneDataProvider';

type SceneContext = {
  engine: Matter.Engine;
  runner: Matter.Runner;
  app: Omit<PIXI.Application<PIXI.Renderer>, 'canvas'>;
  canvas: React.MutableRefObject<HTMLCanvasElement>;
  addObjectToScene: (object: SceneObject) => void;
  removeObjectFromScene: (object: SceneObject) => void;
};

const SceneContext = createContext<SceneContext | null>(null);

export const useSceneContext = () => {
  const context = useContext(SceneContext);

  if (context === null) {
    throw new Error('SceneContext has not be initialised');
  }

  try {
    useSceneDataContext();
  } catch {
    throw new Error(
      'SceneDataContext has not be initialised but is required for this component'
    );
  }

  return context;
};

export type SceneProviderProps = {
  engine: Matter.Engine;
  runner: Matter.Runner;
  app: Omit<PIXI.Application<PIXI.Renderer>, 'canvas'>;
  canvas: React.MutableRefObject<HTMLCanvasElement>;
  sceneObjects: React.MutableRefObject<SceneObject[]>;
} & React.PropsWithChildren;

export const SceneProvider = ({
  engine,
  runner,
  app,
  canvas,
  sceneObjects,
  children,
}: SceneProviderProps) => {
  const addObjectToScene = useCallback(
    (object: SceneObject) => {
      sceneObjects.current.push(object);

      Matter.Composite.add(engine.world, object.body);
      if (object.graphic) {
        app.stage.addChild(object.graphic);
      }
    },
    [app, engine, sceneObjects]
  );

  const removeObjectFromScene = useCallback(
    (object: SceneObject) => {
      sceneObjects.current = sceneObjects.current.filter(
        (sceneObject) => sceneObject.body.id !== object.body.id
      );

      Matter.Composite.remove(engine.world, object.body);
      object.graphic?.destroy();
    },
    [engine, sceneObjects]
  );

  const value = useMemo(
    () => ({
      app,
      engine,
      runner,
      addObjectToScene,
      removeObjectFromScene,
      canvas,
    }),
    [addObjectToScene, app, canvas, engine, removeObjectFromScene, runner]
  );

  return (
    <SceneContext.Provider value={value}>{children}</SceneContext.Provider>
  );
};
