import { useCallback, useEffect, useRef } from 'react';
import { useSceneContext } from '@/providers/scene/SceneProvider';
import Matter, { IChamferableBodyDefinition } from 'matter-js';
import * as PIXI from 'pixi.js';
import { FillGradient, Sprite } from 'pixi.js';
import { Textures } from '@/components/skills/skillsAndTalents';
import { SceneObject } from '@/providers/scene/SceneDataProvider';

type RectangleProps = {
  initialX: number;
  initialY: number;
  width: number;
  height: number;
  options?: IChamferableBodyDefinition;
  style?: Textures;
};

export const Rectangle = ({
  initialX,
  initialY,
  width,
  height,
  options,
  style,
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

    if (!style) {
      console.warn("You haven't defined a style for a Rectangle");
      return graphicObject;
    }

    const innerOutlineOffset = style.outline?.width
      ? style.outline.width / 2
      : 0;

    graphicObject
      .rect(
        -width / 2,
        -height / 2,
        width - innerOutlineOffset,
        height - innerOutlineOffset
      )
      .fill(style.fill);

    if (style.outline) {
      if (style.outline.fill instanceof FillGradient) {
        style.outline.fill.x0 = -width / 2;
        style.outline.fill.y0 = -height / 2;
        style.outline.fill.x1 = width / 2;
        style.outline.fill.y1 = height / 2;
      }
      graphicObject.stroke(style.outline);
    }

    if (style.type === 'svg') {
      // Load the sprite and add it when we're ready
      PIXI.Assets.load<PIXI.Texture>(style.url).then((asset) => {
        const sprite = new Sprite(asset);
        sprite.anchor.set(0.5, 0.5);
        sprite.width = width;
        sprite.height = height;

        if (style.offset) {
          sprite.x += style.offset?.x ?? 0;
          sprite.y += style.offset?.y ?? 0;
        }

        if (style.scale) {
          sprite.width *= style.scale?.x ?? 1;
          sprite.height *= style.scale?.y ?? 1;
        }

        console.log(asset);

        graphicObject.addChild(sprite);
      });
      return graphicObject;
    }

    return graphicObject;
  }, [style, initialX, initialY, width, height]);

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
