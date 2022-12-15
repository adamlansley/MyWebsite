export function pickHexColor(start: string, end: string, alpha = 1): string {
  const alphaBetween255 = Math.round(Math.max(0, Math.min(1, alpha)) * 255);

  const startRed = parseInt(start.slice(1, 3), 16);
  const startGreen = parseInt(start.slice(3, 5), 16);
  const startBlue = parseInt(start.slice(5, 7), 16);

  const endRed = parseInt(end.slice(1, 3), 16);
  const endGreen = parseInt(end.slice(3, 5), 16);
  const endBlue = parseInt(end.slice(5, 7), 16);

  const diffRed = endRed - startRed;
  const diffGreen = endGreen - startGreen;
  const diffBlue = endBlue - startBlue;

  const randomRed = startRed + Math.round(Math.random() * diffRed);
  const randomGreen = startGreen + Math.round(Math.random() * diffGreen);
  const randomBlue = startBlue + Math.round(Math.random() * diffBlue);

  // Convert the resulting RGB values to hexadecimal
  const hexRed = randomRed.toString(16).padStart(2, "0");
  const hexGreen = randomGreen.toString(16).padStart(2, "0");
  const hexBlue = randomBlue.toString(16).padStart(2, "0");
  const hexAlpha = alphaBetween255.toString(16).padStart(2, "0");

  // Return the resulting color in hexadecimal format
  return `#${hexRed}${hexGreen}${hexBlue}${hexAlpha}`;
}
