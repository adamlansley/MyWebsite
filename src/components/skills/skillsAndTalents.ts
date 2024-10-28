import Matter from 'matter-js';

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

const maximumWeighting = 1 as const;
const minimumWeighting = 10 as const;
type Weighting = IntRange<typeof maximumWeighting, typeof minimumWeighting>;

export type SkillOrTalentDefinition = {
  name: string;
  weighting: Weighting;
  options?: Matter.IBodyDefinition;
};

export const skillsAndTalents: SkillOrTalentDefinition[] = [
  { name: 'TypeScript', weighting: 1 },
  { name: 'React', weighting: 2 },
  { name: 'HTML', weighting: 1 },
  { name: 'CSS', weighting: 3 },
  { name: 'Figma', weighting: 5 },
  { name: 'UX/UI', weighting: 5 },
  { name: 'Animations', weighting: 7 },
];

export const buildSkillTalentBall = (
  x: number,
  y: number,
  maxRadius: number,
  minRadius: number,
  { weighting, options }: SkillOrTalentDefinition
) => {
  const weightSizeDelta =
    (maxRadius - minRadius) / (minimumWeighting - maximumWeighting);
  const sizeReduction = weightSizeDelta * (weighting - maximumWeighting - 1);
  const size = maxRadius - sizeReduction;
  return Matter.Bodies.circle(x, y, size, options);
};
