import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { Project } from "@shared/schema";
import { getColorClass } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

interface EcosystemMapProps {
  projects: Project[];
}

interface NodePosition {
  id: number;
  x: number;
  y: number;
  radius: number;
}

const EcosystemMap: React.FC<EcosystemMapProps> = ({ projects }) => {
  const [positions, setPositions] = useState<NodePosition[]>([]);
  const svgRef = useRef<SVGSVGElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const [_, navigate] = useLocation();
  const isMobile = useIsMobile();
  
  // Set up node positions
  useEffect(() => {
    if (!projects.length || !mapRef.current) return;
    
    const mapWidth = mapRef.current.clientWidth;
    const mapHeight = mapRef.current.clientHeight;
    const centerX = mapWidth / 2;
    const centerY = mapHeight / 2;
    
    // First, add Succinct at the center
    const nodePositions: NodePosition[] = [
      { id: 0, x: centerX, y: centerY, radius: isMobile ? 40 : 64 }
    ];
    
    // Calculate positions for project nodes around the center
    const radius = Math.min(mapWidth, mapHeight) * 0.35;
    const angleStep = (2 * Math.PI) / projects.length;
    
    projects.forEach((project, index) => {
      // Adding some randomness to make it look more organic
      const angleOffset = (Math.random() - 0.5) * 0.2;
      const radiusOffset = radius * (0.8 + Math.random() * 0.4);
      
      const angle = index * angleStep + angleOffset;
      const x = centerX + Math.cos(angle) * radiusOffset;
      const y = centerY + Math.sin(angle) * radiusOffset;
      
      nodePositions.push({
        id: project.id,
        x,
        y,
        radius: isMobile ? 28 : 48
      });
    });
    
    setPositions(nodePositions);
  }, [projects, isMobile]);

  const handleNodeClick = (project?: Project) => {
    if (project) {
      navigate(`/projects/${project.slug}`);
    }
  };

  return (
    <div 
      ref={mapRef}
      className="ecosystem-map bg-muted/50 rounded-2xl p-4 mb-12 border border-gray-800 overflow-hidden"
    >
      <div className="relative w-full h-full">
        {/* SVG Connections */}
        <svg ref={svgRef} className="absolute inset-0 w-full h-full">
          {positions.length > 1 && positions.map((pos, index) => {
            if (index === 0) return null; // Skip the first node (Succinct)
            
            // Connection from center to this node
            return (
              <line
                key={`connection-${index}`}
                className="connection"
                x1={positions[0].x}
                y1={positions[0].y}
                x2={pos.x}
                y2={pos.y}
                stroke="hsl(var(--primary))"
              />
            );
          })}
        </svg>
        
        {/* Succinct central node */}
        {positions.length > 0 && (
          <div 
            className="node absolute z-30 transition-all duration-300 hover:scale-110 cursor-pointer"
            style={{
              left: positions[0].x - positions[0].radius,
              top: positions[0].y - positions[0].radius,
              width: positions[0].radius * 2,
              height: positions[0].radius * 2
            }}
          >
            <div className="bg-background rounded-full w-full h-full flex items-center justify-center border-4 border-primary neon-border">
              <div className="text-center">
                <div className="font-bold text-lg md:text-xl text-primary neon-glow">Succinct</div>
                <div className="text-xs text-gray-300">ZK Prover Network</div>
              </div>
            </div>
          </div>
        )}
        
        {/* Project nodes */}
        {positions.length > 1 && projects.map((project, index) => {
          const position = positions[index + 1]; // +1 because Succinct is at index 0
          if (!position) return null;
          
          return (
            <div 
              key={project.id}
              className="node absolute z-20 transition-all duration-300 hover:scale-110 cursor-pointer"
              style={{
                left: position.x - position.radius,
                top: position.y - position.radius,
                width: position.radius * 2,
                height: position.radius * 2
              }}
              onClick={() => handleNodeClick(project)}
            >
              <div className={`bg-background rounded-full w-full h-full flex items-center justify-center border-2 ${getColorClass(project.logoColor, 'border')}`}>
                <div className="text-center">
                  <div className={`font-bold text-xs md:text-sm ${getColorClass(project.logoColor, 'text')}`}>{project.name}</div>
                  <div className="tooltip absolute -bottom-24 left-1/2 transform -translate-x-1/2 bg-muted p-3 rounded-lg shadow-lg w-48 text-sm">
                    <div className={`font-bold ${getColorClass(project.logoColor, 'text')}`}>{project.name}</div>
                    <div className="text-xs text-gray-300">{project.description}</div>
                    <div className="text-xs text-gray-300 mt-1">
                      {project.mainTechnologies[0]} 통합
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EcosystemMap;
