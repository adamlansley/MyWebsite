import { useCallback, useEffect, useRef } from 'react';
import { useSceneContext } from '@/providers/scene/SceneProvider';
import Matter, { IChamferableBodyDefinition } from 'matter-js';
import * as PIXI from 'pixi.js';
import { Textures } from '@/components/skills/skillsAndTalents';
import { SceneObject } from '@/providers/scene/SceneDataProvider';
import {
  applyOutline,
  attachImageToGraphics,
} from '@/components/scenes/objects/utils';

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

  const buildRigidBody = useCallback(() => {
    return Matter.Bodies.rectangle(initialX, initialY, width, height, {
      ...options,
    });
  }, [height, initialX, initialY, options, width]);

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
      applyOutline(graphicObject, style.outline, width, height);
    }

    if (style.type === 'image') {
      attachImageToGraphics(graphicObject, width, height, style);
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
