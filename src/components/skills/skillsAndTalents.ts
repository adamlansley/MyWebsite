import * as PIXI from 'pixi.js';
import Matter from 'matter-js';
import { FillGradient } from 'pixi.js';

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
  style: Textures;
} & (RectangleSkillOrTalent | CircleSkillOrTalent | CustomSkillOrTalent);

type RectangleSkillOrTalent = {
  shape: 'rectangle';
  rigidBodyOptions?: Matter.IChamferableBodyDefinition;
};

type CircleSkillOrTalent = {
  shape: 'circle';
  rigidBodyOptions?: Matter.IBodyDefinition;
};

type CustomSkillOrTalent = {
  shape: 'custom';
  vertices: Matter.Vector[];
};

export type Textures = ImageStyle | FillStyle;

type BaseStyle = {
  fill: PIXI.FillStyle;
  outline?: PIXI.StrokeStyle;
};

type FillStyle = BaseStyle & {
  type: 'fill';
};

export type ImageStyle = BaseStyle & {
  type: 'image';
  url: string;
  scale?: {
    x?: number;
    y?: number;
  };
  offset?: {
    x?: number;
    y?: number;
  };
};

export const skillsAndTalents: SkillOrTalentDefinition[] = [
  {
    name: 'TypeScript',
    shape: 'rectangle',
    weighting: 10,
    style: {
      type: 'image',
      url: '/img/icons/typescript_square.svg',
      fill: { color: 0x3178c6, alpha: 0 },
    },
    rigidBodyOptions: {
      chamfer: {
        radius: 30,
      },
    },
  },
  {
    name: 'React',
    shape: 'circle',
    weighting: 9,
    style: {
      type: 'image',
      url: '/img/icons/react.svg',
      fill: { color: 0x61dafb, alpha: 0 },
      outline: { color: 0x61dafb, width: 3 },
      scale: { x: 0.8, y: 0.7 },
    },
  },
  {
    name: 'Vue',
    shape: 'custom',
    weighting: 8,
    style: {
      type: 'image',
      url: '/img/icons/vue.svg',
      fill: { color: 0x41b883, alpha: 0 },
    },
    vertices: [
      Matter.Vector.create(0, 0),
      Matter.Vector.create(261.76, 0),
      Matter.Vector.create(130.88, 226.69),
    ],
  },
  {
    name: 'NextJS',
    shape: 'circle',
    weighting: 5,
    style: {
      type: 'image',
      url: '/img/icons/nextjs.svg',
      fill: { color: 0xffffff, alpha: 1 },
      outline: { color: 0xffffff, width: 3 },
    },
  },
  {
    name: 'HTML',
    shape: 'custom',
    weighting: 10,
    style: {
      type: 'image',
      url: '/img/icons/html5.svg',
      fill: { color: 0xe44d26, alpha: 0 },
    },
    vertices: [
      Matter.Vector.create(41, 460),
      Matter.Vector.create(0, 0),
      Matter.Vector.create(451, 0),
      Matter.Vector.create(410, 460),
      Matter.Vector.create(225, 512),
    ],
  },
  {
    name: 'CSS',
    shape: 'custom',
    weighting: 8,
    style: {
      type: 'image',
      url: '/img/icons/css.svg',
      fill: { color: 0x264de4, alpha: 0 },
    },
    vertices: [
      Matter.Vector.create(41.085, 460.819),
      Matter.Vector.create(0, 0),
      Matter.Vector.create(451.456, 0),
      Matter.Vector.create(410.327, 460.746),
      Matter.Vector.create(225.452, 512),
    ],
  },
  {
    name: 'SASS',
    shape: 'circle',
    weighting: 7,
    style: {
      type: 'image',
      url: '/img/icons/sass.svg',
      fill: { color: 0xcd6799, alpha: 0 },
      outline: { color: 0xcd6799, width: 3 },
      scale: { x: 0.65, y: 0.55 },
      offset: {
        x: 5,
        y: -3,
      },
    },
  },
  {
    name: 'Tailwind',
    shape: 'circle',
    weighting: 8,
    style: {
      type: 'image',
      url: '/img/icons/tailwind.svg',
      fill: { color: 0x38bdf8, alpha: 0 },
      outline: { color: 0x38bdf8, width: 3 },
      scale: { x: 0.7, y: 0.5 },
    },
  },
  {
    name: 'Figma',
    shape: 'circle',
    weighting: 5,
    style: {
      type: 'image',
      url: '/img/icons/figma.svg',
      fill: { color: 0xf24e1e, alpha: 0 },
      outline: {
        fill: new FillGradient(0, 0, 0, 0)
          .addColorStop(0, 0xf24e1e)
          .addColorStop(0.15, 0xff7262)
          .addColorStop(0.45, 0xa259ff)
          .addColorStop(0.7, 0x1abcfe)
          .addColorStop(1, 0x0acf83),
        width: 3,
      },
      scale: { x: 0.4, y: 0.6 },
      offset: {
        y: 3,
      },
    },
  },
  {
    name: 'Capacitor',
    shape: 'circle',
    weighting: 5,
    style: {
      type: 'image',
      url: '/img/icons/capacitor-js.svg',
      fill: { color: 0x53b9ff, alpha: 0 },
      outline: { color: 0x53b9ff, width: 3 },
      scale: { x: 0.6, y: 0.6 },
    },
  },
  {
    name: 'Ionic',
    shape: 'circle',
    weighting: 6,
    style: {
      type: 'image',
      url: '/img/icons/ionic.svg',
      fill: { color: 0x3880ff, alpha: 0 },
      outline: { color: 0x3880ff, width: 3 },
      scale: { x: 0.6, y: 0.6 },
    },
  },
  {
    name: 'Cypress',
    shape: 'circle',
    weighting: 5,
    style: {
      type: 'image',
      url: '/img/icons/cypress.svg',
      fill: { color: 0x050517, alpha: 1 },
    },
  },
  {
    name: 'Jest',
    shape: 'circle',
    weighting: 8,
    style: {
      type: 'image',
      url: '/img/icons/jest.svg',
      fill: { color: 0x99425b, alpha: 0 },
      outline: { color: 0x99425b, width: 3 },
      scale: { x: 0.55, y: 0.55 },
      offset: { x: -5 },
    },
  },
  {
    name: 'Vitest',
    shape: 'circle',
    weighting: 8,
    style: {
      type: 'image',
      url: '/img/icons/vitest.svg',
      fill: { color: 0x729b1b, alpha: 0 },
      outline: {
        fill: new FillGradient(0, 0, 0, 0)
          .addColorStop(0, 0xfcc72b)
          .addColorStop(0.66, 0x729b1b),
        width: 3,
      },
      scale: { x: 0.55, y: 0.55 },
      offset: { x: -5 },
    },
  },
  {
    name: 'Git',
    shape: 'rectangle',
    weighting: 8,
    style: {
      type: 'image',
      url: '/img/icons/git.svg',
      fill: { color: 0xf03c2e, alpha: 0 },
    },
    rigidBodyOptions: {
      chamfer: {
        radius: 20,
      },
    },
  },
  {
    name: 'Node',
    shape: 'circle',
    weighting: 6,
    style: {
      type: 'image',
      url: '/img/icons/node.svg',
      fill: { color: 0x050517, alpha: 1 },
      outline: { color: 0x5fa04e, width: 3 },
      scale: {
        x: 0.8,
        y: 0.5,
      },
    },
  },
  {
    name: 'Github',
    shape: 'circle',
    weighting: 8,
    style: {
      type: 'image',
      url: '/img/icons/github.svg',
      fill: { color: 0xffffff, alpha: 1 },
      outline: { color: 0xffffff, width: 3 },
    },
  },
  {
    name: 'Jira',
    shape: 'circle',
    weighting: 8,
    style: {
      type: 'image',
      url: '/img/icons/jira.svg',
      fill: { color: 0xffffff, alpha: 0 },
      outline: { color: 0x2684ff, width: 3 },
      scale: {
        x: 0.7,
        y: 0.7,
      },
      offset: {
        x: -10,
        y: 15,
      },
    },
  },
  {
    name: 'Chess',
    shape: 'circle',
    weighting: 7,
    style: {
      type: 'image',
      url: '/img/icons/chess.svg',
      fill: { color: 0xffffff, alpha: 0 },
      outline: { color: 0x5d9948, width: 3 },
      scale: {
        x: 0.5,
        y: 0.7,
      },
      offset: {
        y: -2,
      },
    },
  },
  {
    name: 'Ozzy',
    shape: 'circle',
    weighting: 10,
    style: {
      type: 'image',
      url: '/img/icons/ozzy.png',
      fill: { color: 0x41b883, alpha: 0 },
      outline: { color: 0xffffff, width: 3 },
    },
  },
  // { name: 'Lily', weighting: 10 },
  // { name: 'Mousey', weighting: 9 },
  // { name: 'UX/UI', weighting: 5 },
  // { name: 'Animations', weighting: 3 },
  // { name: 'Optimizations', weighting: 7 },
  // { name: 'Gherkin', weighting: 5 },
] as const;
