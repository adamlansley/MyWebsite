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

export type Textures = BaseTexture & (SVGTexture | FillTexture);

type BaseTexture = {
  type: string;
  fill: PIXI.FillStyle;
  outline?: PIXI.StrokeStyle;
};

type FillTexture = {
  type: 'fill';
};

type SVGTexture = {
  type: 'svg';
  url: string;
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
      type: 'svg',
      url: '/img/icons/typescript.svg',
      fill: { color: 0x3178c6 },
    },
  },
  {
    name: 'React',
    weighting: 9,
    texture: {
      type: 'svg',
      url: '/img/icons/react.svg',
      fill: { color: 0x61dafb, alpha: 0 },
      outline: { color: 0x61dafb, width: 3 },
    },
  },
  {
    name: 'Vue',
    weighting: 8,
    texture: {
      type: 'svg',
      url: '/img/icons/vue.svg',
      fill: { color: 0x41b883, alpha: 0 },
      outline: { color: 0x41b883, width: 3 },
    },
  },
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
  {
    name: 'Ozzy',
    weighting: 10,
    texture: {
      type: 'svg',
      url: '/img/icons/ozzy.png',
      fill: { color: 0x41b883, alpha: 0 },
      outline: { color: 0xffffff, width: 3 },
    },
  },
  // { name: 'Lily', weighting: 10 },
  // { name: 'Mousey', weighting: 9 },
] as const;
