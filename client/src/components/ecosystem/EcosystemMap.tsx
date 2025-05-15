import React, { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { Project } from "@shared/schema";
import { getColorClass } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import Draggable from "react-draggable";
import { useTheme } from "@/components/layout/Header";

// 로고 가져오기
import succinctLogo from "../../assets/logos/official/zk-prover-logo.png";
import ethereumLogo from "../../assets/logos/official/ethereum-logo.svg";
import polygonLogo from "../../assets/logos/official/polygon-logo.svg";
import optimismLogo from "../../assets/logos/official/optimism-logo.svg";
import solanaLogo from "../../assets/logos/official/solana-logo.svg";
import galxeLogo from "../../assets/logos/official/galxe-logo.svg";
import phalaLogo from "../../assets/logos/official/phala-logo.svg";
import mantleLogo from "../../assets/logos/official/mantle-logo.svg";
import cosmosLogo from "../../assets/logos/official/cosmos-logo.svg";
import availLogo from "../../assets/logos/official/avail-logo.svg";
import layerzeroLogo from "../../assets/logos/official/layerzero-logo.svg";
import bitcoinLogo from "../../assets/logos/official/bitcoin-logo.svg";
import celestiaLogo from "../../assets/logos/official/celestia-logo.svg";
import taikoLogo from "../../assets/logos/official/taiko-logo.svg";
import arbitrumLogo from "../../assets/logos/official/arbitrum-logo.svg";

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
  const [nodePositions, setNodePositions] = useState<{[key: number]: {x: number, y: number}}>({});
  const [activeTooltip, setActiveTooltip] = useState<number | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const { language } = useTheme();
  
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
    
    // Calculate positions for project nodes around the center in a balanced way
    const radius = Math.min(mapWidth, mapHeight) * 0.38;
    const projectCount = projects.length;
    const angleStep = (2 * Math.PI) / projectCount;
    
    // Predefined offsets to avoid overlapping
    const radiusVariations = [
      1.0, 0.85, 1.05, 0.9, 1.1, 0.8, 1.0, 0.95, 1.05, 0.9, 1.0, 0.85, 1.0, 0.9, 1.05
    ];
    
    projects.forEach((project, index) => {
      // Get a radius variation from the predefined array
      const radiusVariation = radiusVariations[index % radiusVariations.length];
      const adjustedRadius = radius * radiusVariation;
      
      // Calculate position with fixed angles for better balance
      const angle = index * angleStep;
      const x = centerX + Math.cos(angle) * adjustedRadius;
      const y = centerY + Math.sin(angle) * adjustedRadius;
      
      nodePositions.push({
        id: project.id,
        x,
        y,
        radius: isMobile ? 30 : 48
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
            const fromX = nodePositions[0]?.x || positions[0].x;
            const fromY = nodePositions[0]?.y || positions[0].y;
            const toX = nodePositions[index + 1]?.x || pos.x;
            const toY = nodePositions[index + 1]?.y || pos.y;
            
            return (
              <line
                key={`connection-${index}`}
                className="connection"
                x1={fromX}
                y1={fromY}
                x2={toX}
                y2={toY}
                stroke="hsl(var(--primary))"
              />
            );
          })}
        </svg>
        
        {/* Succinct central node */}
        {positions.length > 0 && (
          <Draggable
            defaultPosition={{x: positions[0].x - positions[0].radius, y: positions[0].y - positions[0].radius}}
            onDrag={(e, data) => {
              const newPositions = {...nodePositions};
              newPositions[0] = {x: data.x + positions[0].radius, y: data.y + positions[0].radius};
              setNodePositions(newPositions);
            }}
            bounds="parent"
          >
            <div 
              className="node absolute z-30 transition-all duration-300 cursor-move"
              style={{
                width: positions[0].radius * 2,
                height: positions[0].radius * 2
              }}
            >
              <div className="bg-background rounded-lg w-full h-full flex items-center justify-center border-4 border-primary neon-border">
                <div className="w-full h-full flex flex-col items-center justify-center p-2">
                  <img 
                    src={succinctLogo} 
                    alt="ZK Prover Network" 
                    className="w-4/5 h-4/5 object-contain"
                  />
                </div>
              </div>
            </div>
          </Draggable>
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
                    <div className="tooltip fixed bg-muted p-3 rounded-lg shadow-lg w-48 text-sm opacity-0 transition-opacity group-hover:opacity-100 z-[9999]" 
                      style={{
                        top: `${position.y - 100}px`,
                        left: `${position.x}px`,
                        transform: 'translateX(-50%)'
                      }}>
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
