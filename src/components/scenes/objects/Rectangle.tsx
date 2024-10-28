import { useEffect } from 'react';
import {
  SceneObject,
  useSceneContext,
} from '@/components/scenes/SceneProvider';
import Matter, { IChamferableBodyDefinition } from 'matter-js';
import * as PIXI from 'pixi.js';

type RectangleProps = {
  initialX: number;
  initialY: number;
  width: number;
  height: number;
  options?: IChamferableBodyDefinition;
  fill?: PIXI.FillInput;
};

export const Rectangle = ({
  initialX,
  initialY,
  width,
  height,
  options,
  fill,
}: RectangleProps) => {
  const { addSceneObject, removeSceneObject } = useSceneContext();

  useEffect(() => {
    const sceneObject: SceneObject = {
      body: Matter.Bodies.rectangle(initialX, initialY, width, height, options),
    };

    if (fill) {
      const graphics = new PIXI.Graphics();

      graphics.x = initialX;
      graphics.y = initialY;

      graphics.rect(-width / 2, -height / 2, width, height);
      graphics.fill(fill);
      sceneObject.graphic = graphics;
    }

    addSceneObject(sceneObject);

    return () => {
      removeSceneObject(sceneObject);
    };
  }, []);

  return null;
};
