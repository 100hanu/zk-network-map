import React, { useEffect, useRef, useState } from 'react';

const AnimatedBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // 항상 다크 테마만 사용
    const isDarkTheme = true;
    
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
    
    // 마우스 움직임 트래킹
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({
        x: event.clientX,
        y: event.clientY
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    // 3D 파티클 클래스 정의
    class Particle {
      x: number;
      y: number;
      z: number;
      size: number;
      baseSize: number;
      speedX: number;
      speedY: number;
      speedZ: number;
      color: string;
      baseColor: string;
      maxSpeed: number;
      
      constructor() {
        this.z = Math.random() * 1000; // Z축 추가 (깊이감)
        this.maxSpeed = 0.4; // 속도 절반으로 감소
        this.x = Math.random() * (canvas?.width || window.innerWidth);
        this.y = Math.random() * (canvas?.height || window.innerHeight);
        this.baseSize = Math.random() * 3 + 1; // 입자 크기 약간 감소
        this.size = this.calculateSize();
        this.speedX = (Math.random() - 0.5) * this.maxSpeed;
        this.speedY = (Math.random() - 0.5) * this.maxSpeed;
        this.speedZ = (Math.random() - 0.5) * 0.25; // Z축 속도 절반으로 감소
        
        // 테마에 따라 색상 변경
        if (isDarkTheme) {
          // 다크 테마: 핑크/퍼플 색상 계열
          const hue = 280 + Math.random() * 60; // 280-340 (퍼플에서 핑크)
          const saturation = 70 + Math.random() * 30; // 70-100% 
          const lightness = 50 + Math.random() * 30; // 50-80%
          this.baseColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
        } else {
          // 라이트 테마: 블루/시안 색상 계열
          const hue = 180 + Math.random() * 60; // 180-240 (시안에서 블루)
          const saturation = 70 + Math.random() * 30; // 70-100%
          const lightness = 40 + Math.random() * 20; // 40-60% 
          this.baseColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
        }
        
        this.color = this.calculateColor();
      }
      
      // 3D 깊이에 따른 크기 계산
      calculateSize() {
        // z가 클수록(멀수록) 작아짐
        return this.baseSize * (1 - this.z / 1500);
      }
      
      // 3D 깊이에 따른 색상 계산
      calculateColor() {
        // z가 클수록(멀수록) 투명해짐
        const alpha = Math.max(0.1, 1 - (this.z / 1000));
        return this.baseColor.replace('hsl', 'hsla').replace(')', `, ${alpha})`);
      }
      
      update(mouseX: number, mouseY: number) {
        // 마우스 인터랙션 (마우스와 가까울수록 영향을 받음)
        const dx = mouseX - this.x;
        const dy = mouseY - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 200;
        
        if (distance < maxDistance) {
          const force = (maxDistance - distance) / maxDistance; // 0-1 사이 값
          this.speedX += dx * force * 0.015;
          this.speedY += dy * force * 0.015;
          
          // 속도 제한
          this.speedX = Math.min(this.maxSpeed, Math.max(-this.maxSpeed, this.speedX));
          this.speedY = Math.min(this.maxSpeed, Math.max(-this.maxSpeed, this.speedY));
        }
        
        this.x += this.speedX;
        this.y += this.speedY;
        this.z += this.speedZ;
        
        // Z축 범위 제한 (0-1000)
        if (this.z > 1000 || this.z < 0) {
          this.speedZ = -this.speedZ;
        }
        
        // 화면 경계에서 반대로 이동
        if (this.x > (canvas?.width || window.innerWidth) || this.x < 0) {
          this.speedX = -this.speedX;
        }
        if (this.y > (canvas?.height || window.innerHeight) || this.y < 0) {
          this.speedY = -this.speedY;
        }
        
        // 크기와 색상 업데이트
        this.size = this.calculateSize();
        this.color = this.calculateColor();
        
        // 자연스러운 감속
        this.speedX *= 0.98;
        this.speedY *= 0.98;
      }
      
      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }
    
    // 파티클 배열 생성 - 개수 감소로 성능 개선
    const particleCount = Math.floor(window.innerWidth * window.innerHeight / 20000); // 더 적은 파티클
    const particles: Particle[] = [];
    
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
    
    // 최적화된 파티클 간 연결선 그리기 (성능 개선)
    const drawConnections = () => {
      // 최대 연결선 수 제한
      const maxConnections = 300; // 최대 연결선 수 제한으로 성능 향상
      let connectionCount = 0;
      
      // 간격을 두고 파티클 순회 (모든 파티클을 확인하지 않음)
      for (let i = 0; i < particles.length; i += 2) { // 2칸씩 건너뛰기
        for (let j = i + 2; j < particles.length; j += 2) { // 2칸씩 건너뛰기
          if (connectionCount >= maxConnections) return; // 최대 연결선 수에 도달하면 중단
          
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distSquared = dx * dx + dy * dy; // 제곱근 계산 피하기
          
          // Z 축을 고려한 연결 (가까운 Z값을 가진 파티클끼리만 연결)
          const zDistance = Math.abs(particles[i].z - particles[j].z);
          
          if (distSquared < 22500 && zDistance < 200) { // 150^2 = 22500
            if (!ctx) return;
            
            // Z 깊이에 따른 선 투명도
            const alpha = 0.15 * (1 - Math.max(particles[i].z, particles[j].z) / 1000);
            
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255, 50, 255, ${alpha * (1 - Math.min(distSquared / 22500, 1))})`;
            ctx.lineWidth = 0.5 * (1 - Math.max(particles[i].z, particles[j].z) / 1000); // 선 두께 감소
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
            
            connectionCount++;
          }
        }
      }
    };
    
    // 3D 효과 그라데이션 배경
    const drawGradientBackground = () => {
      if (!ctx || !canvas) return;
      
      // 마우스 위치에 따라 그라데이션 중심 이동
      const centerX = mousePosition.x || canvas.width / 2;
      const centerY = mousePosition.y || canvas.height / 2;
      
      const gradientSize = Math.max(canvas.width, canvas.height) * 1.5;
      const gradient = ctx.createRadialGradient(
        centerX, centerY, 0,
        centerX, centerY, gradientSize
      );
      
      if (isDarkTheme) {
        gradient.addColorStop(0, 'rgba(60, 0, 60, 0.03)');
        gradient.addColorStop(0.5, 'rgba(30, 0, 40, 0.02)');
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      } else {
        gradient.addColorStop(0, 'rgba(0, 150, 255, 0.03)');
        gradient.addColorStop(0.5, 'rgba(0, 80, 180, 0.02)');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      }
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };
    
    // 최적화된 애니메이션 루프
    let lastFrameTime = 0;
    const targetFps = 30; // 30fps로 제한하여 성능 개선
    const frameInterval = 1000 / targetFps;
    
    const animate = (timestamp: number = 0) => {
      if (!ctx || !canvas) return;
      
      const deltaTime = timestamp - lastFrameTime;
      
      // 목표 FPS로 프레임 제한
      if (deltaTime < frameInterval) {
        requestAnimationFrame(animate);
        return;
      }
      
      lastFrameTime = timestamp - (deltaTime % frameInterval);
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // 그라데이션 배경 그리기
      drawGradientBackground();
      
      // 깊이 기준으로 정렬 (z가 작은 것(가까운 것)이 나중에 그려지도록)
      // 정렬은 가끔만 수행 (매 프레임마다 하지 않음)
      if (timestamp % (frameInterval * 5) < frameInterval) {
        particles.sort((a, b) => b.z - a.z);
      }
      
      for (let i = 0; i < particles.length; i++) {
        particles[i].update(mousePosition.x, mousePosition.y);
        particles[i].draw();
      }
      
      drawConnections();
      requestAnimationFrame(animate);
    };
    
    animate();
    
    // 클린업 함수
    return () => {
      window.removeEventListener('resize', setCanvasSize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mousePosition]);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 w-full h-full -z-10 opacity-70 pointer-events-none"
    />
  );
};

export default AnimatedBackground;