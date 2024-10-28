import { useEffect } from 'react';
import Matter from 'matter-js';
import * as PIXI from 'pixi.js';
import {
  SceneObject,
  useSceneContext,
} from '@/components/scenes/SceneProvider';

export type CircleProps = {
  x: number;
  y: number;
  radius: number;
  options?: Matter.IBodyDefinition;
  maxSizes?: number;
  fill?: PIXI.FillInput;
};

export const Circle = ({
  x,
  y,
  radius,
  options,
  maxSizes,
  fill,
}: CircleProps) => {
  const { addSceneObject, removeSceneObject } = useSceneContext();

  useEffect(() => {
    const sceneObject: SceneObject = {
      body: Matter.Bodies.circle(x, y, radius, options, maxSizes),
    };

    if (fill) {
      const graphicObject = new PIXI.Graphics();

      graphicObject.x = x;
      graphicObject.y = y;
      graphicObject.circle(0, 0, radius);
      graphicObject.fill(fill);
      sceneObject.graphic = graphicObject;
    }

    addSceneObject(sceneObject);

    return () => {
      removeSceneObject(sceneObject);
    };
  }, []);

  return null;
};
