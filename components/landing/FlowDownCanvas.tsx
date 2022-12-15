import {
  FunctionComponent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

const arrowBodyLength = 10;
const arrowArmLength = 3;
const maxScale = 7;
const minScale = 5;
const numberOfArrows = 30;

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

  function pickArrowColour() {
    return Math.random() > 0.5 ? "#66ccff88" : "#ffaaff88";
  }

  const createArrow = (isCreating: boolean, id: number): FlowDownArrow => {
    const canvas = canvasRef.current;

    if (!canvas) {
      throw Error("uh oh");
    }

    const scale = Math.floor(
      Math.random() * (maxScale - minScale + 1) + minScale
    );
    const widthOffset = arrowArmLength * scale; // 50 is a little extra room
    const heightOffset = arrowBodyLength * scale;
    const yPos = isCreating
      ? -Math.floor(Math.random() * canvas.height) - heightOffset
      : -heightOffset;

    const widthBucketSize = canvas.width / numberOfArrows;
    const widthBucketSizeOffsetMin = id * widthBucketSize;
    const widthBucketSizeOffsetMax = (id + 1) * widthBucketSize;
    const randomPointBetweenMinAndMaxBucketSize =
      Math.floor(
        Math.random() *
          (widthBucketSizeOffsetMax - widthBucketSizeOffsetMin + 1) +
          widthBucketSizeOffsetMin
      ) + widthOffset;
    const xPos = Math.min(
      randomPointBetweenMinAndMaxBucketSize,
      canvas.width - widthOffset
    );

    return {
      id,
      x: xPos,
      y: yPos,
      colour: pickArrowColour(),
      scale,
    };
  };

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

  function resizeCanvas() {
    if (!canvasRef.current) {
      return;
    }

    canvasRef.current.width = window.innerWidth;
    canvasRef.current.height = window.innerHeight;
  }

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }

    const allArrows: FlowDownArrow[] = Array(numberOfArrows)
      .fill(0)
      .map((_, id) => createArrow(true, id));

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
    setFlowingArrows(allArrows);
  }, []);

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

  return <canvas ref={canvasRef} className="absolute top-0 left-0 z-0" />;
};

export default FlowDownCanvas;
