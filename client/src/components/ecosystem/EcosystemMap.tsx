import React, { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { Project } from "@shared/schema";
import { getColorClass } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

// 로고 가져오기
import succinctLogo from "../../assets/logos/succinct-logo.svg";
import ethereumLogo from "../../assets/logos/ethereum-logo.svg";
import polygonLogo from "../../assets/logos/polygon-logo.svg";
import optimismLogo from "../../assets/logos/optimism-logo.svg";
import solanaLogo from "../../assets/logos/solana-logo.svg";
import galxeLogo from "../../assets/logos/galxe-logo.svg";
import phalaLogo from "../../assets/logos/phala-logo.svg";
import mantleLogo from "../../assets/logos/mantle-logo.svg";
import cosmosLogo from "../../assets/logos/cosmos-logo.svg";
import availLogo from "../../assets/logos/avail-logo.svg";
import layerzeroLogo from "../../assets/logos/layerzero-logo.svg";
import bitcoinLogo from "../../assets/logos/bitcoin-logo.svg";
import celestiaLogo from "../../assets/logos/celestia-logo.svg";
import taikoLogo from "../../assets/logos/taiko-logo.svg";
import arbitrumLogo from "../../assets/logos/arbitrum-logo.svg";

interface EcosystemMapProps {
  projects: Project[];
}

interface NodePosition {
  id: number;
  x: number;
  y: number;
  radius: number;
}

// 프로젝트 slug에 따라 적절한 로고를 반환
const getProjectLogo = (slug: string): string => {
  switch (slug) {
    case 'ethereum':
      return ethereumLogo;
    case 'polygon':
      return polygonLogo;
    case 'optimism':
      return optimismLogo;
    case 'solana':
      return solanaLogo;
    case 'galxe':
      return galxeLogo;
    case 'phala':
      return phalaLogo;
    case 'mantle':
      return mantleLogo;
    case 'cosmos':
      return cosmosLogo;
    case 'avail':
      return availLogo;
    case 'layerzero':
      return layerzeroLogo;
    case 'bitvm':
      return bitcoinLogo;
    case 'celestia':
      return celestiaLogo;
    case 'taiko':
      return taikoLogo;
    case 'arbitrum':
      return arbitrumLogo;
    default:
      return succinctLogo;
  }
}

const EcosystemMap: React.FC<EcosystemMapProps> = ({ projects }) => {
  const [positions, setPositions] = useState<NodePosition[]>([]);
  const svgRef = useRef<SVGSVGElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
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
    // 처리할 필요 없음 - Link 컴포넌트로 처리됨
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
              <div className="w-full h-full flex flex-col items-center justify-center">
                <img 
                  src={succinctLogo} 
                  alt="Succinct" 
                  className="w-3/4 h-3/4 object-contain mb-1"
                />
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
            <Link key={project.id} href={`/projects/${project.slug}`}>
              <div 
                className="node absolute z-20 transition-all duration-300 hover:scale-110 cursor-pointer group"
                style={{
                  left: position.x - position.radius,
                  top: position.y - position.radius,
                  width: position.radius * 2,
                  height: position.radius * 2
                }}
              >
                <div className={`bg-background rounded-full w-full h-full flex items-center justify-center border-2 ${getColorClass(project.logoColor, 'border')}`}>
                  <div className="w-full h-full flex items-center justify-center">
                    <img 
                      src={getProjectLogo(project.slug)} 
                      alt={project.name} 
                      className="w-3/4 h-3/4 object-contain"
                    />
                    <div className="tooltip absolute -bottom-24 left-1/2 transform -translate-x-1/2 bg-muted p-3 rounded-lg shadow-lg w-48 text-sm opacity-0 transition-opacity group-hover:opacity-100">
                      <div className={`font-bold ${getColorClass(project.logoColor, 'text')}`}>{project.name}</div>
                      <div className="text-xs text-gray-300">{project.description}</div>
                      <div className="text-xs text-gray-300 mt-1">
                        {project.mainTechnologies && project.mainTechnologies[0]} 통합
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default EcosystemMap;
