import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useSceneContext } from '@/providers/scene/SceneProvider';
import Matter, { IChamferableBodyDefinition } from 'matter-js';
import * as PIXI from 'pixi.js';
import { Sprite } from 'pixi.js';
import { Textures } from '@/components/skills/skillsAndTalents';
import { SceneObject } from '@/providers/scene/SceneDataProvider';
import cloneDeep from 'lodash.clonedeep';

type CustomProps = {
  initialX: number;
  initialY: number;
  width: number;
  height: number;
  options?: IChamferableBodyDefinition;
  style?: Textures;
  vertices: Matter.Vector[];
};

export const Custom = ({
  initialX,
  initialY,
  width,
  height,
  options,
  style,
  vertices,
}: CustomProps) => {
  const { addObjectToScene, removeObjectFromScene } = useSceneContext();
  const sceneObject = useRef<SceneObject | null>(null);

  const baseBounds = useMemo(() => Matter.Bounds.create(vertices), [vertices]);

  const scale = useMemo(() => {
    const {
      min: { x: minX, y: minY },
      max: { x: maxX, y: maxY },
    } = baseBounds;

    const baseWidth = maxX - minX;
    const baseHeight = maxY - minY;

    return {
      x: width / baseWidth,
      y: height / baseHeight,
    };
  }, [baseBounds, height, width]);

  const buildRigidBody = useCallback(() => {
    const scaledVertices = Matter.Vertices.scale(
      cloneDeep(vertices),
      scale.x,
      scale.y,
      {
        x: 0,
        y: 0,
      }
    );

    return Matter.Bodies.fromVertices(
      initialX,
      initialY,
      [scaledVertices],
      options
    );
  }, [initialX, initialY, options, scale.x, scale.y, vertices]);

  const buildGraphic = useCallback(
    (offsetX = 0, offsetY = 0) => {
      const graphicObject = new PIXI.Graphics();
      graphicObject.x = initialX;
      graphicObject.y = initialY;

      if (!style) {
        console.warn("You haven't defined a style for a Custom Shape");
        return graphicObject;
      }

      if (style.outline) {
        console.warn("Custom shapes don't support outlines");
      }

      if (style.fill) {
        console.warn("Custom shapes don't suppose fills");
      }

      if (style.type === 'image') {
        // Load the sprite and add it when we're ready
        PIXI.Assets.load<PIXI.Texture>(style.url).then((asset) => {
          const sprite = new Sprite(asset);
          sprite.anchor.set(0.5, 0.5);

          sprite.x = offsetX;
          sprite.y = offsetY;

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

          graphicObject.addChild(sprite);
        });

        return graphicObject;
      }

      return graphicObject;
    },
    [initialX, initialY, style, width, height]
  );

  const initialiseCustom = useCallback(() => {
    const body = buildRigidBody();

    // Awful magic to get these to align correctly
    const { x: offsetX, y: offsetY } = Matter.Vector.sub(body.bounds.min, {
      x: initialX - width / 2,
      y: initialY - height / 2,
    });

    const graphic = buildGraphic(offsetX, offsetY);

    const newSceneObject: SceneObject = {
      body,
      graphic,
    };

    addObjectToScene(newSceneObject);
    sceneObject.current = newSceneObject;
    return newSceneObject;
  }, [
    buildRigidBody,
    initialX,
    width,
    initialY,
    height,
    buildGraphic,
    addObjectToScene,
  ]);

  useEffect(() => {
    const sceneObject = initialiseCustom();
    return () => {
      if (sceneObject) {
        removeObjectFromScene(sceneObject);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};
