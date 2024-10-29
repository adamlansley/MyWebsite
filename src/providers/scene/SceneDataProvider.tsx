import React, {
  createContext,
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
  canvas: React.MutableRefObject<HTMLCanvasElement>;
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
  const canvas = useRef<HTMLCanvasElement>(document.createElement('canvas'));
  const sceneObjects = useRef<SceneObject[]>([]);

  const initialisePixiApp = useCallback(
    async (app: PIXI.Application<PIXI.Renderer>) => {
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
          // console.log(sceneObject.body.position);
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
    initialisePixiApp(newApp);

    setEngine(newEngine);
    setRunner(newRunner);
    setApp(newApp);

    return () => {
      Matter.Engine.clear(newEngine);
      Matter.Runner.stop(newRunner);
    };
  }, [initialisePixiApp]);

  const content = useMemo(() => {
    if (!engine || !runner || !app) {
      return null;
    }

    return (
      <SceneProvider
        app={app}
        engine={engine}
        canvas={canvas}
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
      canvas,
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
