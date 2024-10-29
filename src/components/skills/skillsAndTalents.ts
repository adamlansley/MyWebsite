import * as PIXI from 'pixi.js';

type Enumerate<
  N extends number,
  IsInclusive extends boolean = true,
  Acc extends number[] = [],
> = Acc['length'] extends N
  ? IsInclusive extends true
    ? [...Acc, Acc['length']][number]
    : Acc[number] // Include N itself when length reaches N
  : Enumerate<N, IsInclusive, [...Acc, Acc['length']]>;

type IntRange<F extends number, T extends number> = Exclude<
  Enumerate<T>,
  Enumerate<F, false>
>;

export const minimumWeighting = 1 as const;
export const maximumWeighting = 10 as const;
type Weighting = IntRange<typeof minimumWeighting, typeof maximumWeighting>;

export type SkillOrTalentDefinition = {
  name: string;
  weighting: Weighting;
  texture?: Textures;
};

export type Textures = SVGTexture | FillTexture;

type FillTexture = {
  type: 'Fill';
  fill: PIXI.FillInput;
};

type SVGTexture = {
  type: 'SVG';
  url: string;
  fill: PIXI.FillInput;
};

export const MAX_RADIUS = 100;
export const MIN_RADIUS = 40;

export const caculateWeightedRadius = (weighting: Weighting) => {
  const weightSizeDelta =
    (MAX_RADIUS - MIN_RADIUS) / (maximumWeighting - minimumWeighting);

  const weightingIncrease = weightSizeDelta * (weighting - minimumWeighting);
  return MIN_RADIUS + weightingIncrease;
};

export const skillsAndTalents: SkillOrTalentDefinition[] = [
  {
    name: 'TypeScript',
    weighting: 10,
    texture: {
      type: 'SVG',
      url: '/img/icons/typescript.svg',
      fill: 0x3178C6,
    },
  },
  {
    name: 'React',
    weighting: 1,
    texture: {
      type: 'Fill',
      fill: 0x0000ff,
    },
  },
  // { name: 'Vue', weighting: 8 },
  // { name: 'NextJS', weighting: 5 },
  // { name: 'HTML', weighting: 10 },
  // { name: 'CSS', weighting: 8 },
  // { name: 'SASS', weighting: 7 },
  // { name: 'Tailwind', weighting: 8 },
  // { name: 'Figma', weighting: 5 },
  // { name: 'UX/UI', weighting: 5 },
  // { name: 'Animations', weighting: 3 },
  // { name: 'Capacitor', weighting: 5 },
  // { name: 'Ionic', weighting: 6 },
  // { name: 'Cypress', weighting: 5 },
  // { name: 'Jest', weighting: 8 },
  // { name: 'Vitest', weighting: 8 },
  // { name: 'Git', weighting: 8 },
  // { name: 'React Query', weighting: 8 },
  // { name: 'Node', weighting: 6 },
  // { name: 'Optimizations', weighting: 7 },
  // { name: 'Github', weighting: 8 },
  // { name: 'Jira', weighting: 8 },
  // { name: 'Gherkin', weighting: 5 },
  // { name: 'Google Tag Manager', weighting: 5 },
  // { name: 'GeminiAI', weighting: 5 },
  // { name: 'Chess', weighting: 7 },
  // { name: 'Ozzy', weighting: 10 },
  // { name: 'Lily', weighting: 10 },
  // { name: 'Mousey', weighting: 9 },
];
