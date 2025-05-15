import React, { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { Project } from "@shared/schema";
import { getColorClass } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import Draggable from "react-draggable";
import { useTheme } from "@/components/layout/Header";
import { ArrowRight } from "lucide-react";

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
  x: number;
  y: number;
  radius: number;
}

// 프로젝트 slug에 따라 적절한 로고를 반환
const getProjectLogo = (slug: string): string => {
  switch (slug) {
    case 'ethereum': return ethereumLogo;
    case 'polygon': return polygonLogo;
    case 'optimism': return optimismLogo;
    case 'solana': return solanaLogo;
    case 'galxe': return galxeLogo;
    case 'phala': return phalaLogo;
    case 'mantle': return mantleLogo;
    case 'cosmos': return cosmosLogo;
    case 'avail': return availLogo;
    case 'layerzero': return layerzeroLogo;
    case 'bitvm': return bitcoinLogo;
    case 'celestia': return celestiaLogo;
    case 'taiko': return taikoLogo;
    case 'arbitrum': return arbitrumLogo;
    default: return succinctLogo;
  }
}

const DraggableEcosystemMap: React.FC<EcosystemMapProps> = ({ projects }) => {
  const isMobile = useIsMobile();
  const { language } = useTheme();
  const mapRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  
  // 상태 관리
  const [centerPos, setCenterPos] = useState({ x: 0, y: 0 });
  const [projectPositions, setProjectPositions] = useState<{[slug: string]: {x: number, y: number}}>({});
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  
  // 노드 크기 설정
  const centerRadius = isMobile ? 40 : 64;
  const projectRadius = isMobile ? 30 : 40;

  // 초기 위치 설정
  useEffect(() => {
    if (!mapRef.current || !projects.length) return;
    
    const mapWidth = mapRef.current.clientWidth;
    const mapHeight = mapRef.current.clientHeight;
    const centerX = mapWidth / 2;
    const centerY = mapHeight / 2;
    
    // 중앙 노드 위치 설정
    setCenterPos({ x: centerX, y: centerY });
    
    // 프로젝트 노드 위치 계산
    const radius = Math.min(mapWidth, mapHeight) * 0.38;
    const angleStep = (2 * Math.PI) / projects.length;
    
    const newPositions: {[slug: string]: {x: number, y: number}} = {};
    
    projects.forEach((project, index) => {
      const angle = index * angleStep;
      // 다양한 반지름으로 위치 다양화
      const radiusVariation = 0.9 + (index % 3) * 0.1;
      
      newPositions[project.slug] = {
        x: centerX + Math.cos(angle) * radius * radiusVariation,
        y: centerY + Math.sin(angle) * radius * radiusVariation
      };
    });
    
    setProjectPositions(newPositions);
  }, [projects, isMobile]);

  // 중앙 노드를 드래그할 때 실행되는 핸들러
  const handleCenterDrag = (e: any, data: any) => {
    setCenterPos({ x: data.x, y: data.y });
  };
  
  // 프로젝트 노드를 드래그할 때 실행되는 핸들러
  const handleProjectDrag = (slug: string, e: any, data: any) => {
    const newPositions = { ...projectPositions };
    newPositions[slug] = { x: data.x, y: data.y };
    setProjectPositions(newPositions);
  };

  return (
    <div 
      ref={mapRef}
      className="ecosystem-map bg-muted/50 rounded-2xl p-4 mb-12 border border-gray-800 relative h-[70vh] overflow-hidden"
    >
      {/* SVG 연결선 */}
      <svg className="absolute inset-0 w-full h-full" ref={svgRef}>
        {projects.map((project) => {
          if (!projectPositions[project.slug]) return null;
          
          return (
            <line
              key={`line-${project.slug}`}
              x1={centerPos.x}
              y1={centerPos.y}
              x2={projectPositions[project.slug].x}
              y2={projectPositions[project.slug].y}
              stroke="hsl(var(--primary))"
              strokeWidth={1.5}
              opacity={0.7}
            />
          );
        })}
      </svg>
      
      {/* 중앙 노드 */}
      <Draggable 
        position={centerPos} 
        onDrag={handleCenterDrag}
        onStop={() => {}}
        positionOffset={{x: -centerRadius, y: -centerRadius}}
      >
        <div 
          className="absolute z-30 cursor-move"
          style={{
            width: centerRadius * 2,
            height: centerRadius * 2,
          }}
        >
          <div className="bg-background rounded-lg w-full h-full flex items-center justify-center border-4 border-primary neon-border">
            <div className="w-full h-full flex items-center justify-center p-2">
              <img 
                src={succinctLogo} 
                alt="ZK Prover Network" 
                className="w-4/5 h-4/5 object-contain"
              />
            </div>
          </div>
        </div>
      </Draggable>
      
      {/* 프로젝트 노드들 */}
      {projects.map((project) => {
        if (!projectPositions[project.slug]) return null;
        
        return (
          <div key={project.slug}>
            <Draggable
              position={projectPositions[project.slug]}
              onDrag={(e, data) => handleProjectDrag(project.slug, e, data)}
              onStop={() => {}}
              positionOffset={{x: -projectRadius, y: -projectRadius}}
            >
              <div 
                className="absolute z-20 cursor-move"
                style={{
                  width: projectRadius * 2,
                  height: projectRadius * 2,
                }}
                onMouseEnter={() => setHoveredNode(project.slug)}
                onMouseLeave={() => setHoveredNode(null)}
              >
                <div className={`bg-background rounded-full w-full h-full flex items-center justify-center border-2 ${getColorClass(project.logoColor, 'border')}`}>
                  <img 
                    src={getProjectLogo(project.slug)} 
                    alt={project.name} 
                    className="w-3/4 h-3/4 object-contain"
                  />
                </div>
              </div>
            </Draggable>
            
            {/* 툴팁 */}
            {hoveredNode === project.slug && (
              <div
                className="fixed z-50 bg-muted p-3 rounded-lg shadow-lg"
                style={{
                  left: `${projectPositions[project.slug].x + projectRadius + 10}px`,
                  top: `${projectPositions[project.slug].y - 20}px`,
                  width: '200px',
                }}
              >
                <div className={`font-bold ${getColorClass(project.logoColor, 'text')}`}>
                  {project.name}
                </div>
                <div className="text-xs text-gray-300 mt-1">
                  {project.description}
                </div>
                <div className="text-xs text-gray-300 mt-1">
                  {project.mainTechnologies && project.mainTechnologies[0]} 
                  {language === 'ko' ? ' 통합' : ' Integration'}
                </div>
                <div className="mt-2 text-center">
                  <Link href={`/projects/${project.slug}`}>
                    <a className="inline-flex items-center text-primary text-xs hover:underline">
                      {language === 'ko' ? '자세히 보기' : 'View Details'} 
                      <ArrowRight className="ml-1 h-3 w-3" />
                    </a>
                  </Link>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default DraggableEcosystemMap;