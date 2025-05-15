import React, { useEffect, useRef } from 'react';
import { useTheme } from '@/components/layout/Header';

const AnimatedBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const isDarkTheme = theme === 'dark';
    
    // 캔버스 크기 설정
    const setCanvasSize = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };
    
    setCanvasSize();
    
    // 윈도우 크기 변경 시 캔버스 크기도 변경
    window.addEventListener('resize', setCanvasSize);
    
    // 파티클 클래스 정의
    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      
      constructor() {
        this.x = Math.random() * (canvas?.width || window.innerWidth);
        this.y = Math.random() * (canvas?.height || window.innerHeight);
        this.size = Math.random() * 3 + 1;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        
        // 테마에 따라 색상 변경
        if (isDarkTheme) {
          // 다크 테마: 핑크/퍼플 색상 계열
          const hue = 280 + Math.random() * 60; // 280-340 (퍼플에서 핑크)
          const saturation = 70 + Math.random() * 30; // 70-100% 
          const lightness = 50 + Math.random() * 30; // 50-80%
          const alpha = 0.3 + Math.random() * 0.3; // 0.3-0.6 투명도
          this.color = `hsla(${hue}, ${saturation}%, ${lightness}%, ${alpha})`;
        } else {
          // 라이트 테마: 블루/시안 색상 계열
          const hue = 180 + Math.random() * 60; // 180-240 (시안에서 블루)
          const saturation = 70 + Math.random() * 30; // 70-100%
          const lightness = 40 + Math.random() * 20; // 40-60% 
          const alpha = 0.3 + Math.random() * 0.3; // 0.3-0.6 투명도
          this.color = `hsla(${hue}, ${saturation}%, ${lightness}%, ${alpha})`;
        }
      }
      
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        // 화면 경계에서 반대로 이동
        if (this.x > (canvas?.width || window.innerWidth) || this.x < 0) {
          this.speedX = -this.speedX;
        }
        if (this.y > (canvas?.height || window.innerHeight) || this.y < 0) {
          this.speedY = -this.speedY;
        }
      }
      
      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }
    
    // 파티클 배열 생성
    const particleCount = Math.floor(window.innerWidth * window.innerHeight / 15000);
    const particles: Particle[] = [];
    
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
    
    // 파티클 간 연결선 그리기
    const drawConnections = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 150) {
            if (!ctx) return;
            ctx.beginPath();
            ctx.strokeStyle = isDarkTheme 
              ? `rgba(255, 50, 255, ${0.1 * (1 - distance / 150)})` 
              : `rgba(0, 150, 255, ${0.1 * (1 - distance / 150)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };
    
    // 애니메이션 루프
    const animate = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }
      
      drawConnections();
      requestAnimationFrame(animate);
    };
    
    animate();
    
    // 클린업 함수
    return () => {
      window.removeEventListener('resize', setCanvasSize);
    };
  }, [theme]);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 w-full h-full -z-10 opacity-40"
    />
  );
};

export default AnimatedBackground;