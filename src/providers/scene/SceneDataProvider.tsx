'use client';

import React, {
  createContext,
  MutableRefObject,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import Matter from 'matter-js';
import * as PIXI from 'pixi.js';
import { SceneProvider } from '@/providers/scene/SceneProvider';

export type SceneObject = {
  body: Matter.Body;
  graphic?: PIXI.Graphics;
};

type SceneDataContext = {
  engine: Matter.Engine | null;
  runner: Matter.Runner | null;
  app: Omit<PIXI.Application<PIXI.Renderer>, 'canvas'> | null;
  canvas: React.MutableRefObject<HTMLCanvasElement> | null;
  sceneObjects: React.MutableRefObject<SceneObject[]>;
};

const SceneDataContext = createContext<SceneDataContext | null>(null);

export const useSceneDataContext = () => {
  const context = useContext(SceneDataContext);

  if (context === null) {
    throw new Error('SceneDataContext has not be initialised');
  }

  return context;
};

export type SceneDataProviderProps = {
  pixiOptions?: Partial<PIXI.ApplicationOptions>;
} & React.PropsWithChildren;

export const SceneDataProvider = ({
  pixiOptions,
  children,
}: SceneDataProviderProps) => {
  const [engine, setEngine] = useState<Matter.Engine | null>(null);
  const [runner, setRunner] = useState<Matter.Runner | null>(null);
  const [app, setApp] = useState<PIXI.Application | null>(null);
  const canvas = useRef<HTMLCanvasElement | null>(null);
  const sceneObjects = useRef<SceneObject[]>([]);

  const [debugRenderer] = useState(false);

  const initialisePixiApp = useCallback(
    async (app: PIXI.Application<PIXI.Renderer>) => {
      if (!canvas.current) {
        throw new Error('No canvas exists to initialise pixi app to');
      }

      await app.init({
        canvas: canvas.current,
        ...pixiOptions,
      });

      app.ticker.add(() => {
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
    },
    [pixiOptions]
  );

  useEffect(() => {
    const newEngine = Matter.Engine.create();
    const newRunner = Matter.Runner.create();
    const newApp = new PIXI.Application();

    Matter.Runner.run(newRunner, newEngine);

    if (debugRenderer) {
      const newRenderer = Matter.Render.create({
        canvas: canvas.current!,
        engine: newEngine,
        options: {
          width: pixiOptions?.width,
          height: pixiOptions?.height,
        },
      });

      Matter.Render.run(newRenderer);
    } else {
      initialisePixiApp(newApp);
    }

    setEngine(newEngine);
    setRunner(newRunner);
    setApp(newApp);

    return () => {
      Matter.Engine.clear(newEngine);
      Matter.Runner.stop(newRunner);
    };
  }, [
    debugRenderer,
    initialisePixiApp,
    pixiOptions?.height,
    pixiOptions?.width,
  ]);

  const content = useMemo(() => {
    if (!engine || !runner || !app || !canvas.current) {
      return null;
    }

    return (
      <SceneProvider
        app={app}
        engine={engine}
        canvas={canvas as MutableRefObject<HTMLCanvasElement>}
        sceneObjects={sceneObjects}
        runner={runner}
      >
        {children}
      </SceneProvider>
    );
  }, [app, children, engine, runner]);

  const value = useMemo(
    () => ({
      engine,
      runner,
      app,
      canvas: canvas as MutableRefObject<HTMLCanvasElement>,
      sceneObjects,
    }),
    [app, engine, runner]
  );

  return (
    <SceneDataContext.Provider value={value}>
      <canvas ref={canvas} />
      {content}
    </SceneDataContext.Provider>
  );
};
