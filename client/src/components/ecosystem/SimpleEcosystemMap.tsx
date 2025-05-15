import React, { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { Project } from "@shared/schema";
import { getColorClass } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { useTheme } from "@/components/layout/Header";
import { ArrowRight } from "lucide-react";
import Draggable from "react-draggable";

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

const SimpleEcosystemMap: React.FC<EcosystemMapProps> = ({ projects }) => {
  const isMobile = useIsMobile();
  const { language } = useTheme();
  const mapRef = useRef<HTMLDivElement>(null);
  
  // 노드 크기 설정
  const centerRadius = isMobile ? 40 : 64;
  const projectRadius = isMobile ? 30 : 40;
  
  // Scroll 프로젝트 필터링
  const filteredProjects = projects.filter(project => project.slug !== 'scroll');
  
  // 툴팁 관련 상태
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  
  // 각 노드의 초기 위치 계산
  const [positions, setPositions] = useState<{
    center: { x: number, y: number };
    projects: { [key: string]: { x: number, y: number } };
  }>({
    center: { x: 0, y: 0 },
    projects: {}
  });
  
  // 초기 위치 설정
  useEffect(() => {
    if (!mapRef.current || !filteredProjects.length) return;
    
    const { clientWidth, clientHeight } = mapRef.current;
    const centerX = clientWidth / 2;
    const centerY = clientHeight / 2;
    
    const radius = Math.min(clientWidth, clientHeight) * 0.38;
    const projectPositions: { [key: string]: { x: number, y: number } } = {};
    
    filteredProjects.forEach((project, index) => {
      const angle = (index * 2 * Math.PI) / filteredProjects.length;
      const radiusVariation = 0.9 + (index % 3) * 0.1;
      
      projectPositions[project.slug] = {
        x: centerX + Math.cos(angle) * radius * radiusVariation,
        y: centerY + Math.sin(angle) * radius * radiusVariation
      };
    });
    
    setPositions({
      center: { x: centerX, y: centerY },
      projects: projectPositions
    });
  }, [filteredProjects, isMobile]);
  
  // 노드 위치 업데이트 핸들러
  const handleCenterDrag = (_e: any, data: any) => {
    setPositions(prev => ({
      ...prev,
      center: { x: data.x, y: data.y }
    }));
  };
  
  const handleProjectDrag = (slug: string, _e: any, data: any) => {
    setPositions(prev => ({
      ...prev,
      projects: {
        ...prev.projects,
        [slug]: { x: data.x, y: data.y }
      }
    }));
  };
  
  return (
    <div 
      ref={mapRef}
      className="ecosystem-map bg-muted/50 rounded-2xl p-4 mb-12 border border-gray-800 relative h-[70vh] overflow-hidden"
    >
      {/* 연결선 */}
      <svg className="absolute inset-0 w-full h-full">
        {filteredProjects.map((project) => {
          if (!positions.projects[project.slug]) return null;
          
          return (
            <line
              key={`line-${project.slug}`}
              x1={positions.center.x}
              y1={positions.center.y}
              x2={positions.projects[project.slug].x}
              y2={positions.projects[project.slug].y}
              stroke="hsl(var(--primary))"
              strokeWidth={1.5}
              opacity={0.7}
            />
          );
        })}
      </svg>
      
      {/* 중앙 노드 */}
      {positions.center.x > 0 && (
        <Draggable 
          position={positions.center}
          onDrag={handleCenterDrag}
          positionOffset={{x: -centerRadius, y: -centerRadius}}
        >
          <div className="z-30 absolute cursor-move" style={{ width: centerRadius * 2, height: centerRadius * 2 }}>
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
      )}
      
      {/* 프로젝트 노드들 */}
      {filteredProjects.map((project) => {
        if (!positions.projects[project.slug]) return null;
        
        const isSelected = selectedNode === project.slug;
        
        return (
          <div key={project.slug}>
            <Draggable
              position={positions.projects[project.slug]}
              onDrag={(e, data) => handleProjectDrag(project.slug, e, data)}
              positionOffset={{x: -projectRadius, y: -projectRadius}}
            >
              <div 
                className={`z-20 absolute cursor-move transition-transform duration-150 ${isSelected ? 'scale-110' : 'scale-100'}`} 
                style={{ width: projectRadius * 2, height: projectRadius * 2 }}
                onClick={() => setSelectedNode(isSelected ? null : project.slug)}
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
            {isSelected && (
              <div
                className="fixed z-50 bg-muted p-3 rounded-lg shadow-lg"
                style={{
                  left: `${positions.projects[project.slug].x + projectRadius + 10}px`,
                  top: `${positions.projects[project.slug].y - 20}px`,
                  width: '220px',
                }}
              >
                <div className={`font-bold text-base mb-1 ${getColorClass(project.logoColor, 'text')}`}>
                  {project.name}
                </div>
                <div className="text-sm text-gray-300">
                  {project.description}
                </div>
                <div className="text-xs text-gray-300 mt-2">
                  {project.mainTechnologies && project.mainTechnologies[0]} 
                  {language === 'ko' ? ' 통합' : ' Integration'}
                </div>
                <div className="mt-2 text-center pt-2 border-t border-gray-700">
                  <Link href={`/projects/${project.slug}`}>
                    <a className="inline-flex items-center text-primary text-sm font-medium hover:underline">
                      {language === 'ko' ? '자세히 보기' : 'View Details'} 
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </a>
                  </Link>
                </div>
                <div className="absolute top-2 right-2 text-xs text-gray-400">
                  ● 
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default SimpleEcosystemMap;