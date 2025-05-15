import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Technology } from "@shared/schema";
import { Button } from "@/components/ui/button";
import TechStackCard from "@/components/ecosystem/TechStackCard";
import { Link } from "wouter";

const TechStack: React.FC = () => {
  const { data: technologies, isLoading, error } = useQuery<Technology[]>({
    queryKey: ['/api/technologies'],
  });

  return (
    <div className="flex flex-col min-h-screen">
      {/* 헤더 섹션 */}
      <section className="relative py-24 overflow-hidden" 
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=600&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}>
        <div className="absolute inset-0 bg-background/75"></div>
        <div className="container mx-auto px-4 py-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-white">Succinct</span>{" "}
              <span className="text-primary neon-glow">ZK 기술 스택</span>
            </h1>
            <p className="text-lg text-gray-300 mb-6">
              Succinct의 혁신적인, ZK Prover 네트워크를 구성하는 핵심 기술들을 살펴보세요
            </p>
          </div>
        </div>
      </section>

      {/* 기술 스택 상세 섹션 */}
      <section className="py-16 bg-background flex-grow">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {isLoading ? (
              Array(3).fill(0).map((_, index) => (
                <div key={index} className="bg-muted/50 rounded-xl p-6 border border-gray-800 h-64 animate-pulse"></div>
              ))
            ) : error ? (
              <div className="col-span-3 text-center py-8">
                <p className="text-gray-300 mb-4">기술 정보를 불러오는 중 오류가 발생했습니다.</p>
                <Button variant="neon" asChild>
                  <Link href="/">홈으로 돌아가기</Link>
                </Button>
              </div>
            ) : (
              technologies?.map((tech) => (
                <div key={tech.id} className="bg-muted/70 backdrop-blur-sm rounded-xl p-8 border border-gray-800 hover:border-primary transition-all">
                  <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="text-primary text-xl" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      {/* SP1 – Modular zkVM - CPU */}
                      {tech.icon === 'cpu' && <>
                        <rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect>
                        <rect x="9" y="9" width="6" height="6"></rect>
                        <line x1="9" y1="2" x2="9" y2="4"></line>
                        <line x1="15" y1="2" x2="15" y2="4"></line>
                        <line x1="9" y1="20" x2="9" y2="22"></line>
                        <line x1="15" y1="20" x2="15" y2="22"></line>
                        <line x1="20" y1="9" x2="22" y2="9"></line>
                        <line x1="20" y1="14" x2="22" y2="14"></line>
                        <line x1="2" y1="9" x2="4" y2="9"></line>
                        <line x1="2" y1="14" x2="4" y2="14"></line>
                      </>}
                      
                      {/* Real-Time Proving Layer - Zap/Lightning */}
                      {tech.icon === 'zap' && <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path>}
                      
                      {/* vApps (Verifiable Applications) - Layers */}
                      {tech.icon === 'layers' && <>
                        <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                        <polyline points="2 17 12 22 22 17"></polyline>
                        <polyline points="2 12 12 17 22 12"></polyline>
                      </>}
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-3">{tech.name}</h3>
                  <p className="text-gray-300 text-sm mb-4">
                    {tech.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {tech.benefits.map((benefit, index) => (
                      <span key={index} className="bg-background px-3 py-1 rounded-full text-xs text-gray-300">
                        {benefit}
                      </span>
                    ))}
                  </div>
                  <Button variant="ghost" className="text-primary hover:underline text-sm group">
                    기술 문서 보기 
                    <svg xmlns="http://www.w3.org/2000/svg" className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14"></path>
                      <path d="m12 5 7 7-7 7"></path>
                    </svg>
                  </Button>
                </div>
              ))
            )}
          </div>
          
          {/* 기술 통합 섹션 */}
          <div className="mt-16 bg-muted/30 rounded-xl p-8 border border-gray-800">
            <h2 className="text-2xl font-bold mb-6 text-center">ZK 기술 통합 프로세스</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-background/60 p-6 rounded-lg">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4 mx-auto">
                  <span className="text-primary font-bold">1</span>
                </div>
                <h3 className="text-lg font-semibold mb-2 text-center">기술 요구사항 분석</h3>
                <p className="text-sm text-gray-300 text-center">
                  프로젝트의 특성과 목표에 맞는 ZK 기술 요구사항을 분석합니다.
                </p>
              </div>
              <div className="bg-background/60 p-6 rounded-lg">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4 mx-auto">
                  <span className="text-primary font-bold">2</span>
                </div>
                <h3 className="text-lg font-semibold mb-2 text-center">맞춤형 증명 시스템 설계</h3>
                <p className="text-sm text-gray-300 text-center">
                  프로젝트에 적합한 ZK 증명 시스템을 Succinct 엔지니어링 팀이 설계합니다.
                </p>
              </div>
              <div className="bg-background/60 p-6 rounded-lg">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4 mx-auto">
                  <span className="text-primary font-bold">3</span>
                </div>
                <h3 className="text-lg font-semibold mb-2 text-center">ZK Prover 통합</h3>
                <p className="text-sm text-gray-300 text-center">
                  Succinct의 ZK Prover 네트워크에 프로젝트를 연결하고 증명 생성 프로세스를 최적화합니다.
                </p>
              </div>
              <div className="bg-background/60 p-6 rounded-lg">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4 mx-auto">
                  <span className="text-primary font-bold">4</span>
                </div>
                <h3 className="text-lg font-semibold mb-2 text-center">운영 및 지속적 개선</h3>
                <p className="text-sm text-gray-300 text-center">
                  ZK 시스템의 안정적인 운영과 지속적인 성능 개선을 제공합니다.
                </p>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-16">
            <p className="text-gray-300 mb-6">
              Succinct의 ZK 기술에 관심이 있으시거나 귀하의 프로젝트에 통합하고 싶으신가요?
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="neon" size="pillLg" asChild>
                <Link href="/contact">
                  문의하기
                </Link>
              </Button>
              <Button variant="outlineNeon" size="pill" asChild>
                <Link href="/">
                  에코시스템 맵으로 돌아가기
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TechStack;
