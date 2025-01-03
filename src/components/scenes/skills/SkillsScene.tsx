'use client';

import React, { useMemo } from 'react';
import { Scene } from '@/components/scenes/Scene';
import { Rectangle } from '@/components/scenes/objects/Rectangle';
import { Circle } from '@/components/scenes/objects/Circle';
import {
  maximumWeighting,
  minimumWeighting,
  skillsAndTalents,
} from '@/components/skills/skillsAndTalents';
import { Custom } from '@/components/scenes/objects/Custom';
import { calculateAspectRatioForVertices } from '@/components/scenes/objects/utils';
import { IBodyDefinition } from 'matter-js';

export const BOUNDARY_SIZE = 50;

export const SkillsScene = () => {
  const environmentSize = useMemo(() => {
    if (typeof window === 'undefined') {
      return {
        width: 0,
        height: 0,
        area: 0,
      };
    }

    return {
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
      area:
        document.documentElement.clientWidth *
        document.documentElement.clientHeight,
    };
  }, []);

  const skillsMappedToShapes = useMemo(() => {
    const fillAmountOfScreen = 0.45;
    const screenSpaceToUse = environmentSize.area * fillAmountOfScreen;

    const totalWeighting = skillsAndTalents.reduce(
      (total, skill) => total + Math.pow(skill.weighting, 2),
      0
    );

    const pixelPerWeightPoint = Math.sqrt(screenSpaceToUse / totalWeighting);
    const maximumSize = pixelPerWeightPoint * maximumWeighting;

    return skillsAndTalents.map((skill, index) => {
      const radius = (pixelPerWeightPoint * skill.weighting) / 2;
      const diameter = radius * 2;

      const numberOfColumns = maximumWeighting - minimumWeighting + 1;
      const columnWidth = environmentSize.width / numberOfColumns;

      const columnIndex = skill.weighting;
      const xOffset = columnIndex * columnWidth;
      const baseOptions: IBodyDefinition = {
        friction: 0.4,
        restitution: 0.5,
        label: skill.name,
      };

      if (skill.shape === 'custom') {
        const aspectRatio = calculateAspectRatioForVertices(skill.vertices);
        const height = Math.sqrt((diameter * diameter) / aspectRatio);
        const width = aspectRatio * height;

        return (
          <Custom
            key={skill.name}
            initialX={xOffset}
            initialY={-height - maximumSize * index}
            width={width}
            height={height}
            style={skill.style}
            options={{ ...baseOptions }}
            vertices={skill.vertices}
          />
        );
      }

      if (skill.shape === 'rectangle') {
        return (
          <Rectangle
            key={skill.name}
            initialX={xOffset}
            initialY={-radius - maximumSize * index}
            width={diameter}
            height={diameter}
            style={skill.style}
            options={{ ...baseOptions, ...skill.rigidBodyOptions }}
          />
        );
      }

      return (
        <Circle
          key={skill.name}
          initialX={xOffset}
          initialY={-radius - maximumSize * index}
          radius={radius}
          style={skill.style}
          options={{ ...baseOptions, ...skill.rigidBodyOptions }}
        />
      );
    });
  }, [environmentSize.area, environmentSize.width]);

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
      {skillsMappedToShapes}
    </Scene>
  );
};
