import { useCallback, useEffect, useRef } from 'react';
import Matter from 'matter-js';
import * as PIXI from 'pixi.js';
import { useSceneContext } from '@/providers/scene/SceneProvider';
import { Textures } from '@/components/skills/skillsAndTalents';
import { FillGradient, Sprite } from 'pixi.js';
import { SceneObject } from '@/providers/scene/SceneDataProvider';

export type CircleProps = {
  initialX: number;
  initialY: number;
  radius: number;
  options?: Matter.IBodyDefinition;
  maxSizes?: number;
  style?: Textures;
};

export const Circle = ({
  initialX,
  initialY,
  radius,
  options,
  maxSizes,
  style,
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

    if (!style) {
      console.warn("You haven't defined a style for a Circle");
      return graphicObject;
    }

    const innerOutlineOffset = style.outline?.width
      ? style.outline.width / 2
      : 0;

    // Default to base fill
    graphicObject.circle(0, 0, radius - innerOutlineOffset).fill(style.fill);

    if (style.outline) {
      if (style.outline.fill instanceof FillGradient) {
        style.outline.fill.x0 = -radius;
        style.outline.fill.y0 = -radius;
        style.outline.fill.x1 = radius;
        style.outline.fill.y1 = radius;
      }
      graphicObject.stroke(style.outline);
    }

    if (style.type === 'image') {
      // Container is used to house the mask, and the images
      const container = new PIXI.Container();
      graphicObject.addChild(container);

      const mask = new PIXI.Graphics();
      mask
        .circle(0, 0, radius - innerOutlineOffset * 2)
        .fill({ color: 0xffffff });

      container.mask = mask;
      container.addChild(mask);

      // Load the sprite and add it when we're ready
      PIXI.Assets.load<PIXI.Texture>(style.url).then((asset) => {
        const sprite = new Sprite(asset);
        sprite.anchor.set(0.5, 0.5);
        sprite.width = radius * 2;
        sprite.height = radius * 2;

        if (style.offset) {
          sprite.x += style.offset?.x ?? 0;
          sprite.y += style.offset?.y ?? 0;
        }

        if (style.scale) {
          sprite.width *= style.scale?.x ?? 1;
          sprite.height *= style.scale?.y ?? 1;
        }

        container.addChild(sprite);
      });
      return graphicObject;
    }

    return graphicObject;
  }, [radius, style, initialX, initialY]);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};
