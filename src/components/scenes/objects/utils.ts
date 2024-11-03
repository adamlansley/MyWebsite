import Matter from 'matter-js';

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
