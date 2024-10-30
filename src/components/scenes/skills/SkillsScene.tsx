'use client';

import React, { useMemo } from 'react';
import { Scene } from '@/components/scenes/Scene';
import { Rectangle } from '@/components/scenes/objects/Rectangle';
import { Circle } from '@/components/scenes/objects/Circle';
import {
  caculateWeightedRadius,
  MAX_RADIUS,
  maximumWeighting,
  minimumWeighting,
  skillsAndTalents,
} from '@/components/skills/skillsAndTalents';

export const BOUNDARY_SIZE = 50;

export const SkillsScene = () => {
  const environmentSize = useMemo(
    () => ({
      width: window.innerWidth,
      height: window.innerHeight,
    }),
    []
  );

  const skillsMappedToCircles = useMemo(() => {
    return skillsAndTalents.map((skill) => {
      const numberOfColumns = maximumWeighting - minimumWeighting + 1;
      const columnWidth = environmentSize.width / numberOfColumns;

      const columnIndex = skill.weighting;
      const xOffset = columnIndex * columnWidth - MAX_RADIUS;
      const radius = caculateWeightedRadius(skill.weighting);

      const options = {
        friction: 0.2,
        restitution: 0.5,
      };

      if (skill.style.shape === 'rectangle') {
        return (
          <Rectangle
            key={skill.name}
            initialX={xOffset}
            initialY={-MAX_RADIUS}
            width={radius * 2}
            height={radius * 2}
            style={skill.style}
            options={options}
          />
        );
      }

      return (
        <Circle
          key={skill.name}
          initialX={xOffset}
          initialY={-MAX_RADIUS}
          radius={radius}
          style={skill.style}
          options={options}
        />
      );
    });
  }, [environmentSize.width]);

  return (
    <Scene
      pixiOptions={{
        width: environmentSize.width,
        height: environmentSize.height,
        antialias: true,
        backgroundAlpha: 0,
      }}
    >
      <Rectangle
        initialX={environmentSize.width / 2}
        initialY={environmentSize.height + BOUNDARY_SIZE / 2}
        width={environmentSize.width}
        height={BOUNDARY_SIZE}
        options={{ label: 'BOTTOM_WALL', isStatic: true }}
      />
      <Rectangle
        initialX={-(BOUNDARY_SIZE / 2)}
        initialY={environmentSize.height / 2}
        width={BOUNDARY_SIZE}
        height={environmentSize.height * 2}
        options={{ label: 'LEFT_WALL', isStatic: true }}
      />
      <Rectangle
        initialX={environmentSize.width + BOUNDARY_SIZE / 2}
        initialY={environmentSize.height / 2}
        width={BOUNDARY_SIZE}
        height={environmentSize.height * 2}
        options={{ label: 'RIGHT_WALL', isStatic: true }}
      />
      {skillsMappedToCircles}
    </Scene>
  );
};
