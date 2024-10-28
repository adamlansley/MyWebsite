'use client';

import Matter from 'matter-js';
import { HTMLAttributes, useCallback, useEffect, useRef } from 'react';
import styles from '@/components/skills/skillsCanvas.module.css';
import {
  buildSkillTalentBall,
  maximumWeighting,
  minimumWeighting,
  SkillOrTalentDefinition,
  skillsAndTalents,
} from '@/components/skills/skillsAndTalents';

type SkillsCanvasProps = HTMLAttributes<HTMLCanvasElement>;
type CanvasSize = { width: number; height: number };

const MAX_RADIUS = 120;
const MIN_RADIUS = 40;

// @TODO: Could this be calculated so that balls don't get forced into each other at the beginning
const SPAWN_DELAY_MS = 300;

export const SkillsCanvas = (props: SkillsCanvasProps) => {
  const containerRef = useRef<HTMLCanvasElement>(null);

  const buildSkillBall = useCallback(
    (skill: SkillOrTalentDefinition, { width }: CanvasSize) => {
      // Clamped to at least the number of items in the list, or the maximum number of columns buildable
      const numberOfColumns = maximumWeighting - minimumWeighting;
      const columnWidth = width / numberOfColumns;

      const columnIndex = skill.weighting;
      const xOffset = columnIndex * columnWidth - MAX_RADIUS;

      return buildSkillTalentBall(
        xOffset,
        -MAX_RADIUS,
        MAX_RADIUS,
        MIN_RADIUS,
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
        background: 'transparent',
        wireframes: false,
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
        Matter.Composite.add(engine.world, buildSkillBall(skill, canvasSize));
      }, index * SPAWN_DELAY_MS);
    });
  }, [buildSkillBall, buildWalls]);

  return (
    <canvas className={styles.canvas} ref={containerRef} {...props}></canvas>
  );
};
