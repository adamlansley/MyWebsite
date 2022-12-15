import { pickHexColor } from "components/utils/colours";
import {
  FunctionComponent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

const arrowBodyLength = 10;
const arrowArmLength = 3;
const maxScale = 6;
const minScale = 3;
const numberOfArrowsPer100px = 1;

const baseOpacity = 0.6;

type FlowDownArrow = {
  id: number;
  x: number;
  y: number;
  scale: number;
  colour: string;
};

const FlowDownCanvas: FunctionComponent = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [flowingArrows, setFlowingArrows] = useState<FlowDownArrow[]>([]);

  const createArrow = useCallback(
    (isCreating: boolean, id: number): FlowDownArrow => {
      const canvas = canvasRef.current;

      if (!canvas) {
        throw Error("uh oh");
      }

      const scale = Math.floor(
        Math.random() * (maxScale - minScale + 1) + minScale
      );
      // Roughly how wide an arrow is
      const widthOffset = arrowArmLength * scale;

      // How tall an arrow is
      const heightOffset = arrowBodyLength * scale;

      // If we are creating, put it somewhere randomly in our canvas, made negative
      const yPos = isCreating
        ? -Math.floor(Math.random() * canvas.height) - heightOffset
        : -heightOffset;

      // How wide our width segments can be
      const widthSegmentSize = canvas.width / flowingArrows.length;

      // Leftmost position we can place the arrow, with the offset to make sure it doesn't render too far left
      const widthBucketSizeOffsetMin = id * widthSegmentSize + widthOffset;

      // Right most position, making sure it's not too far to the right
      const widthBucketSizeOffsetMax =
        (id + 1) * widthSegmentSize - widthOffset;

      // Pick a random point between these two boundaries
      const randomPointBetweenMinAndMaxBucketSize = Math.floor(
        Math.random() *
          (widthBucketSizeOffsetMax - widthBucketSizeOffsetMin + 1) +
          widthBucketSizeOffsetMin
      );

      const xPos = randomPointBetweenMinAndMaxBucketSize;

      return {
        id,
        x: xPos,
        y: yPos,
        colour: pickHexColor("#66ccff88", "#ffaaff88", baseOpacity),
        scale,
      };
    },
    [canvasRef, flowingArrows.length]
  );

  const draw = useCallback(
    (arrow: FlowDownArrow) => {
      const canvas = canvasRef.current;
      const context = canvas?.getContext("2d");

      if (!canvas || !context) {
        return;
      }

      context.strokeStyle = arrow.colour;
      context.lineWidth = arrow.scale;

      const lengthOfBody = arrowBodyLength * arrow.scale;
      const lengthOfArm = arrowArmLength * arrow.scale;

      context.beginPath();
      context.moveTo(arrow.x, arrow.y);
      context.lineTo(arrow.x, arrow.y + lengthOfBody);
      context.moveTo(
        arrow.x - lengthOfArm,
        arrow.y + lengthOfBody - lengthOfArm
      );
      context.lineTo(arrow.x, arrow.y + lengthOfBody);
      context.lineTo(
        arrow.x + lengthOfArm,
        arrow.y + lengthOfBody - lengthOfArm
      );
      context.stroke();

      arrow.y += arrow.scale * 0.25;

      if (arrow.y > canvas.height - lengthOfBody * 2) {
        const remainingDistanceOfBodyInversePercentage =
          (canvas.height - arrow.y) / (lengthOfBody * 2);

        arrow.colour = pickHexColor(
          arrow.colour,
          arrow.colour,
          baseOpacity * remainingDistanceOfBodyInversePercentage
        );
      }

      if (arrow.y > canvas.height) {
        Object.assign(arrow, createArrow(false, arrow.id));
      }
    },
    [createArrow]
  );

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    context?.clearRect(0, 0, context.canvas.width, context.canvas.height);
  };

  const getExpectedNumberOfArrows = () => {
    return Math.round((window.screen.width / 100) * numberOfArrowsPer100px);
  };

  const buildArrows = useCallback(() => {
    const allArrows: FlowDownArrow[] = Array(getExpectedNumberOfArrows())
      .fill(0)
      .map((_, id) => createArrow(true, id));

    setFlowingArrows(allArrows);
  }, [createArrow]);

  const resizeCanvas = useCallback(() => {
    if (!canvasRef.current) {
      return;
    }

    canvasRef.current.width = window.innerWidth;
    canvasRef.current.height = window.innerHeight;

    buildArrows();
  }, [buildArrows]);

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
  }, [createArrow, resizeCanvas]);

  useEffect(() => {
    let animationFrameId: number;

    //Our draw came here
    const render = () => {
      clearCanvas();
      flowingArrows.forEach((arrow) => {
        draw(arrow);
      });
      animationFrameId = window.requestAnimationFrame(render);
    };

    render();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [draw, flowingArrows]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 z-0 w-full h-full"
    />
  );
};

export default FlowDownCanvas;
