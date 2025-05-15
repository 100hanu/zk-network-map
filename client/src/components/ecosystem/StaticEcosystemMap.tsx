import React, { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { Project } from "@shared/schema";
import { getColorClass } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { useLanguage } from "@/components/layout/Header";
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
    default: return "";
  }
}

interface NodePosition {
  x: number;
  y: number;
  radius: number;
}

const StaticEcosystemMap: React.FC<EcosystemMapProps> = ({ projects }) => {
  const isMobile = useIsMobile();
  const { language } = useLanguage();
  const mapRef = useRef<HTMLDivElement>(null);
  
  // 노드 크기 설정
  const centerRadius = isMobile ? 40 : 64;
  const projectRadius = isMobile ? 30 : 40;
  
  // Scroll 프로젝트 필터링
  const filteredProjects = projects.filter(project => project.slug !== 'scroll');
  
  // 선택된 노드 상태 관리
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  
  // 노드 위치 저장
  const [positions, setPositions] = useState<{
    center: NodePosition;
    projects: NodePosition[];
  }>({
    center: { x: 0, y: 0, radius: centerRadius },
    projects: []
  });

  // 초기 위치 계산
  useEffect(() => {
    if (!mapRef.current || !filteredProjects.length) return;
    
    // 이미 계산되었으면 다시 계산하지 않음
    if (positions.center.x > 0) return;
    
    const { clientWidth, clientHeight } = mapRef.current;
    const centerX = clientWidth / 2;
    const centerY = clientHeight / 2;
    
    // 중앙 노드 위치
    const centerNode = { x: centerX, y: centerY, radius: centerRadius };
    
    // 프로젝트 노드 위치 계산
    const radius = Math.min(clientWidth, clientHeight) * 0.38;
    const projectNodes: NodePosition[] = [];
    
    filteredProjects.forEach((project, index) => {
      const angle = (index * 2 * Math.PI) / filteredProjects.length;
      const radiusVariation = 0.9 + (index % 3) * 0.1;
      
      const x = centerX + Math.cos(angle) * radius * radiusVariation;
      const y = centerY + Math.sin(angle) * radius * radiusVariation;
      
      projectNodes.push({ x, y, radius: projectRadius });
    });
    
    setPositions({
      center: centerNode,
      projects: projectNodes
    });
  }, [filteredProjects, isMobile, centerRadius, projectRadius, positions.center.x]);
  
  return (
    <div 
      ref={mapRef}
      className="ecosystem-map bg-muted/50 rounded-2xl p-4 mb-12 border border-gray-800 relative h-[70vh] overflow-hidden"
    >
      {/* 연결선 */}
      <svg className="absolute inset-0 w-full h-full">
        {filteredProjects.map((project, index) => {
          if (!positions.projects[index]) return null;
          
          return (
            <line
              key={`line-${project.slug}`}
              x1={positions.center.x}
              y1={positions.center.y}
              x2={positions.projects[index].x}
              y2={positions.projects[index].y}
              stroke="hsl(var(--primary))"
              strokeWidth={1.5}
              opacity={0.7}
            />
          );
        })}
      </svg>
      
      {/* 중앙 노드 */}
      {positions.center.x > 0 && (
        <div 
          className="absolute z-30 transition-transform hover:scale-110"
          style={{
            left: positions.center.x - positions.center.radius,
            top: positions.center.y - positions.center.radius,
            width: positions.center.radius * 2,
            height: positions.center.radius * 2
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
      )}
      
      {/* 프로젝트 노드들 */}
      {filteredProjects.map((project, index) => {
        if (!positions.projects[index]) return null;
        
        const isSelected = selectedNode === project.slug;
        const position = positions.projects[index];
        
        return (
          <div key={project.slug}>
            <div 
              className={`absolute z-20 cursor-pointer transition-transform duration-200 ${isSelected ? 'scale-110' : 'hover:scale-105'}`}
              style={{
                left: position.x - position.radius,
                top: position.y - position.radius,
                width: position.radius * 2,
                height: position.radius * 2
              }}
              onClick={() => {
                if (isSelected) {
                  setSelectedNode(null);
                } else {
                  setSelectedNode(project.slug);
                }
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
            
            {/* 툴팁 - 클릭 또는 호버 시 표시 */}
            {(isSelected || hoveredNode === project.slug) && (
              <div
                className="fixed z-50 bg-muted/95 p-4 rounded-lg shadow-lg"
                style={{
                  left: `${position.x + position.radius + 15}px`,
                  top: `${position.y - 20}px`,
                  width: '240px',
                }}
              >
                <div className={`font-bold text-lg mb-2 ${getColorClass(project.logoColor, 'text')}`}>
                  {project.name}
                </div>
                <div className="text-sm text-gray-300 mb-2">
                  {project.description}
                </div>
                <div className="text-xs text-gray-400 mt-2">
                  {project.mainTechnologies && project.mainTechnologies[0]} 
                  {language === 'ko' ? ' 통합' : ' Integration'}
                </div>
                <div className="mt-3 text-center pt-2 border-t border-gray-700">
                  <Link href={`/projects/${project.slug}`} className="inline-flex items-center text-primary text-sm font-medium hover:underline">
                    {language === 'ko' ? '자세히 보기' : 'View Details'} 
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
                {isSelected && (
                  <button 
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-300"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedNode(null);
                    }}
                  >
                    ✕
                  </button>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default StaticEcosystemMap;