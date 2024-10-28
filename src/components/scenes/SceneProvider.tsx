'use client';

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import * as PIXI from 'pixi.js';
import Matter from 'matter-js';

export type SceneObject = {
  body: Matter.Body;
  graphic?: PIXI.Graphics;
};

type SceneContext = {
  engine: React.MutableRefObject<Matter.Engine>;
  runner: React.MutableRefObject<Matter.Runner>;
  canvas: React.MutableRefObject<HTMLCanvasElement>;
  app: React.MutableRefObject<Omit<PIXI.Application<PIXI.Renderer>, 'canvas'>>;
  addSceneObject: (object: SceneObject) => void;
  removeSceneObject: (object: SceneObject) => void;
};

export type SceneProviderProps = {
  pixiOptions?: Partial<PIXI.ApplicationOptions>;
} & React.PropsWithChildren;

const SceneContext = createContext<SceneContext | null>(null);

export const useSceneContext = () => {
  const context = useContext(SceneContext);

  if (context === null) {
    throw new Error('SceneContext has not be initialised');
  }

  return context;
};

export const SceneProvider = ({
  pixiOptions,
  children,
}: SceneProviderProps) => {
  const engine = useRef(Matter.Engine.create());
  const runner = useRef(Matter.Runner.create());
  const app = useRef(new PIXI.Application());
  const sceneObjects = useRef<SceneObject[]>([]);

  // @TODO: This might be naughty to do
  const canvas = useRef<HTMLCanvasElement>(document.createElement('canvas'));

  const addSceneObject = useCallback((object: SceneObject) => {
    sceneObjects.current.push(object);

    Matter.Composite.add(engine.current.world, object.body);
    if (object.graphic) {
      app.current.stage.addChild(object.graphic);
    }
  }, []);

  const removeSceneObject = useCallback((object: SceneObject) => {
    sceneObjects.current = sceneObjects.current.filter(
      (sceneObject) => sceneObject.body.id !== object.body.id
    );

    Matter.Composite.remove(engine.current.world, object.body);
    object.graphic?.destroy();
  }, []);

  const value = useMemo(
    () => ({
      engine,
      runner,
      canvas,
      app,
      addSceneObject,
      removeSceneObject,
    }),
    [addSceneObject, removeSceneObject]
  );

  useEffect(() => {
    const initApp = async () => {
      await app.current.init({
        canvas: canvas.current,
        ...pixiOptions,
      });
      Matter.Runner.run(runner.current, engine.current);

      app.current.ticker.add(() => {
        sceneObjects.current.forEach((sceneObject) => {
          if (!sceneObject.graphic) {
            return;
          }

          if (sceneObject.body.isStatic) {
            return;
          }

          sceneObject.graphic.position = sceneObject.body.position;
          sceneObject.graphic.rotation = sceneObject.body.angle;
        });
      });
    };

    initApp();
  }, [pixiOptions]);

  return (
    <SceneContext.Provider value={value}>
      <canvas ref={canvas} />
      {children}
    </SceneContext.Provider>
  );
};
