import { useCallback, useEffect, useRef } from 'react';
import { useSceneContext } from '@/providers/scene/SceneProvider';
import Matter, { IChamferableBodyDefinition } from 'matter-js';
import * as PIXI from 'pixi.js';
import { Sprite } from 'pixi.js';
import { Textures } from '@/components/skills/skillsAndTalents';
import { SceneObject } from '@/providers/scene/SceneDataProvider';

type RectangleProps = {
  initialX: number;
  initialY: number;
  width: number;
  height: number;
  options?: IChamferableBodyDefinition;
  texture?: Textures;
};

export const Rectangle = ({
  initialX,
  initialY,
  width,
  height,
  options,
  texture,
}: RectangleProps) => {
  const { addObjectToScene, removeObjectFromScene } = useSceneContext();
  const sceneObject = useRef<SceneObject | null>(null);

  const buildRigidBody = useCallback(
    () => Matter.Bodies.rectangle(initialX, initialY, width, height, options),
    [height, initialX, initialY, options, width]
  );

  const buildGraphic = useCallback(() => {
    const graphicObject = new PIXI.Graphics();
    if (!texture) {
      graphicObject.x = initialX;
      graphicObject.y = initialY;
      graphicObject.rect(-width / 2, -height / 2, width, height);
      graphicObject.fill({ color: 0xff00ff });
      return graphicObject;
    }

    if (texture.type === 'SVG') {
      PIXI.Assets.load(texture.url).then((asset) => {
        const sprite = new Sprite(asset);
        graphicObject.addChild(sprite);
      });
      return graphicObject;
    }

    if (texture.type === 'Fill') {
      graphicObject.x = initialX;
      graphicObject.y = initialY;
      graphicObject.rect(-width / 2, -height / 2, width, height);
      graphicObject.fill(texture.fill);
      return graphicObject;
    }

    // @ts-expect-error Error could catch future use case
    throw new Error(`Unknown texture type ${texture.type}`);
  }, [texture, initialX, initialY, width, height]);

  const initialiseRectangle = useCallback(() => {
    const newSceneObject: SceneObject = {
      body: buildRigidBody(),
      graphic: buildGraphic(),
    };

    addObjectToScene(newSceneObject);
    sceneObject.current = newSceneObject;
    return newSceneObject;
  }, [buildRigidBody, buildGraphic, addObjectToScene]);

  useEffect(() => {
    const sceneObject = initialiseRectangle();
    return () => {
      if (sceneObject) {
        removeObjectFromScene(sceneObject);
      }
    };
  }, []);

  return null;
};
