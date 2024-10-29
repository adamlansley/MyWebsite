import { useCallback, useEffect, useRef } from 'react';
import Matter from 'matter-js';
import * as PIXI from 'pixi.js';
import { useSceneContext } from '@/providers/scene/SceneProvider';
import { Textures } from '@/components/skills/skillsAndTalents';
import { Sprite } from 'pixi.js';
import { SceneObject } from '@/providers/scene/SceneDataProvider';

export type CircleProps = {
  initialX: number;
  initialY: number;
  radius: number;
  options?: Matter.IBodyDefinition;
  maxSizes?: number;
  texture?: Textures;
};

export const Circle = ({
  initialX,
  initialY,
  radius,
  options,
  maxSizes,
  texture,
}: CircleProps) => {
  const { addObjectToScene, removeObjectFromScene } = useSceneContext();
  const sceneObject = useRef<SceneObject | null>(null);

  const buildRigidBody = useCallback(
    () => Matter.Bodies.circle(initialX, initialY, radius, options, maxSizes),
    [initialX, initialY, maxSizes, options, radius]
  );

  const buildGraphic = useCallback(() => {
    const graphicObject = new PIXI.Graphics();
    graphicObject.x = initialX;
    graphicObject.y = initialY;

    if (!texture) {
      graphicObject.circle(0, 0, radius).fill({ color: 0xff00ff, alpha: 0.5 });
      return graphicObject;
    }
    
    // Default to base fill
    graphicObject.circle(0, 0, radius).fill(texture.fill);

    if (texture.type === 'SVG') {
      // Container is used to house the mask, and the images
      const container = new PIXI.Container();
      graphicObject.addChild(container);

      const mask = new PIXI.Graphics();
      mask.circle(0, 0, radius).fill({ color: 0xffffff });
      container.mask = mask;
      container.addChild(mask);

      // Load the sprite and add it when we're ready
      PIXI.Assets.load(texture.url).then((asset) => {
        const sprite = new Sprite(asset);
        sprite.width = radius * 2;
        sprite.height = radius * 2;
        sprite.x = -radius;
        sprite.y = -radius;

        container.addChild(sprite);
      });
      return graphicObject;
    }
    
    return graphicObject
  }, [radius, texture, initialX, initialY]);

  const initialiseCircle = useCallback(() => {
    const newSceneObject: SceneObject = {
      body: buildRigidBody(),
      graphic: buildGraphic(),
    };

    addObjectToScene(newSceneObject);
    sceneObject.current = newSceneObject;
    return newSceneObject;
  }, [buildRigidBody, buildGraphic, addObjectToScene]);

  useEffect(() => {
    const sceneObject = initialiseCircle();
    return () => {
      if (sceneObject) {
        removeObjectFromScene(sceneObject);
      }
    };
  }, []);

  return null;
};
