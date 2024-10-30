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
    graphicObject.x = initialX;
    graphicObject.y = initialY;

    if (!texture) {
      graphicObject
        .rect(-width / 2, -height / 2, width, height)
        .fill({ color: 0xff00ff });
      return graphicObject;
    }

    graphicObject
      .rect(-width / 2, -height / 2, width, height)
      .fill(texture.fill);

    if (texture.type === 'svg') {
      // Container is used to house the mask, and the images
      const container = new PIXI.Container();
      graphicObject.addChild(container);

      const mask = new PIXI.Graphics();
      mask.rect(0, 0, width, height).fill({ color: 0xffffff });

      container.mask = mask;
      container.addChild(mask);

      // Load the sprite and add it when we're ready
      PIXI.Assets.load(texture.url).then((asset) => {
        const sprite = new Sprite(asset);
        sprite.anchor.set(0.5, 0.5);
        sprite.width = width;
        sprite.height = height;

        container.addChild(sprite);
      });
      return graphicObject;
    }

    return graphicObject;
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};
