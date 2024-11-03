import Matter from 'matter-js';
import {
  ImageSource,
  Sprite,
  Texture,
  Container,
  ContainerChild,
  FillGradient,
  StrokeStyle,
  Graphics,
} from 'pixi.js';
import { ImageStyle } from '@/components/skills/skillsAndTalents';

export const calculateAspectRatioForVertices = (vertices: Matter.Vector[]) => {
  const baseBounds = Matter.Bounds.create(vertices);

  const {
    min: { x: minX, y: minY },
    max: { x: maxX, y: maxY },
  } = baseBounds;

  const baseWidth = maxX - minX;
  const baseHeight = maxY - minY;

  return baseWidth / baseHeight;
};

export const applyOutline = (
  graphicObject: Graphics,
  outline: StrokeStyle,
  width: number,
  height: number
) => {
  if (outline.fill instanceof FillGradient) {
    outline.fill.x0 = -width / 2;
    outline.fill.y0 = -height / 2;
    outline.fill.x1 = width / 2;
    outline.fill.y1 = height / 2;
  }
  graphicObject.stroke(outline);
};

export const attachImageToGraphics = (
  graphicObject: Container<ContainerChild>,
  width: number,
  height: number,
  style: ImageStyle,
  options?: { offsetX?: number; offsetY?: number }
) => {
  const image = new Image();

  image.onload = () => {
    const source = new ImageSource({
      resource: image,
    });

    const texture = new Texture({
      source,
    });

    const sprite = new Sprite(texture);
    sprite.anchor.set(0.5, 0.5);
    sprite.x = options?.offsetX ?? 0;
    sprite.y = options?.offsetY ?? 0;

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
  };

  image.width = width;
  image.height = height;
  image.src = style.url;
};

// SVG Loading tat
// import 'pathseg';
// const select = function (root, selector) {
//   return Array.prototype.slice.call(root.querySelectorAll(selector));
// };
//
// const loadSvg = function (url) {
//   return fetch(url)
//     .then(function (response) {
//       return response.text();
//     })
//     .then(function (raw) {
//       return new window.DOMParser().parseFromString(raw, 'image/svg+xml');
//     });
// };
//
// [
//   // '/img/icons/html5.svg',
//   // '/img/icons/css.svg',
//   '/img/icons/vue.svg',
// ].forEach(function (path, i) {
//   loadSvg(path).then(function (root) {
//     const vertexSets = select(root, 'path').map(function (path) {
//       return Matter.Svg.pathToVertices(path, 300);
//     });
//     console.log('sets', vertexSets);
//   });
// });
