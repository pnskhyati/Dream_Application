import React, { useEffect, useRef } from 'react';

interface AudioVisualizerProps {
  isActive: boolean;
  barColor?: string;
}

const AudioVisualizer: React.FC<AudioVisualizerProps> = ({ isActive, barColor = '#60a5fa' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let bars: number[] = Array(20).fill(10); 

    const animate = () => {
      if (!isActive) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Simulate random frequency data for visual effect
      bars = bars.map(() => Math.random() * 40 + 10);

      const barWidth = (canvas.width / bars.length) - 2;
      const centerY = canvas.height / 2;

      bars.forEach((height, i) => {
        const x = i * (barWidth + 2);
        
        ctx.fillStyle = barColor;
        ctx.beginPath();
        // Draw rounded pill shape
        const radius = barWidth / 2;
        const topY = centerY - height / 2;
        
        ctx.roundRect(x, topY, barWidth, height, radius);
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    if (isActive) {
      animate();
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      cancelAnimationFrame(animationRef.current);
    }

    return () => cancelAnimationFrame(animationRef.current);
  }, [isActive, barColor]);

  return (
    <canvas 
      ref={canvasRef} 
      width={300} 
      height={60} 
      className="w-full max-w-[300px] h-[60px]"
    />
  );
};

export default AudioVisualizer;