'use client';

import Matter from 'matter-js';
import { HTMLAttributes, useCallback, useEffect, useRef } from 'react';
import styles from '@/components/skills/skillsCanvas.module.css';
import {
  buildSkillTalentBall,
  SkillOrTalentDefinition,
  skillsAndTalents,
} from '@/components/skills/skillsAndTalents';

type SkillsCanvasProps = HTMLAttributes<HTMLCanvasElement>;
type CanvasSize = { width: number; height: number };

export const SkillsCanvas = (props: SkillsCanvasProps) => {
  const containerRef = useRef<HTMLCanvasElement>(null);

  const buildSkillBall = useCallback(
    (skill: SkillOrTalentDefinition, index: number, { width }: CanvasSize) => {
      const maxRadius = 90;
      const minRadius = 50;
      const columnGap = 10;

      let totalColumnWidth = maxRadius * 2 + columnGap;

      // Clamped to at least the number of items in the list, or the maximum number of columns buildable
      const numberOfColumns = Math.min(
        skillsAndTalents.length,
        Math.floor(width / totalColumnWidth)
      );
      const totalRowSize = numberOfColumns * totalColumnWidth;

      // Add some more spacing if we haven't used all the available room
      if (width > totalRowSize) {
        const remainingSize = width - totalRowSize;
        const additionalRowGap = remainingSize / numberOfColumns;
        totalColumnWidth += additionalRowGap;
      }

      const columnIndex = numberOfColumns - (index % numberOfColumns);
      const xOffset = columnIndex * totalColumnWidth - maxRadius;

      return buildSkillTalentBall(
        xOffset,
        -maxRadius,
        maxRadius,
        minRadius,
        skill
      );
    },
    []
  );

  const buildWalls = useCallback(({ width, height }: CanvasSize) => {
    const rectSize = 50;

    return [
      // Bottom
      Matter.Bodies.rectangle(width / 2, height + 25, width, rectSize, {
        isStatic: true,
      }),
      // Left
      Matter.Bodies.rectangle(-(rectSize / 2), height / 2, rectSize, height, {
        isStatic: true,
      }),
      // Right
      Matter.Bodies.rectangle(width + 25, height / 2, rectSize, height, {
        isStatic: true,
      }),
    ];
  }, []);

  // @TODO: Add resizing
  useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    // Used for canvas and border sizing
    const canvasSize = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    // Create the world
    const engine = Matter.Engine.create();
    const render = Matter.Render.create({
      canvas: containerRef.current,
      engine,
      options: {
        ...canvasSize,
      },
    });
    const runner = Matter.Runner.create();

    // Start running
    Matter.Render.run(render);
    Matter.Runner.run(runner, engine);

    // Add environment
    const walls = buildWalls(canvasSize);

    Matter.Composite.add(engine.world, walls);

    skillsAndTalents.forEach((skill, index) => {
      setTimeout(() => {
        Matter.Composite.add(
          engine.world,
          buildSkillBall(skill, index, canvasSize)
        );
      }, index * 100);
    });
  }, [buildSkillBall, buildWalls]);

  return (
    <canvas className={styles.canvas} ref={containerRef} {...props}></canvas>
  );
};
