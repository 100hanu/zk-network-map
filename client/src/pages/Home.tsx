import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Project } from "@shared/schema";
import StaticEcosystemMap from "@/components/ecosystem/StaticEcosystemMap";
import ProjectCard from "@/components/ecosystem/ProjectCard";
import TechStackCard from "@/components/ecosystem/TechStackCard";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";
import { useLanguage } from "@/components/layout/Header";
import AnimatedBackground from "@/components/ui/animated-background";
// 정적 데이터 가져오기 (API 연결 문제 해결을 위함)
import { projects as staticProjects, technologies as staticTechnologies } from "@/data/staticData";

const Home: React.FC = () => {
  const { toast } = useToast();
  const { language } = useLanguage();
  
  const { data: projects, isLoading, error } = useQuery<Project[]>({
    queryKey: ['/api/projects'],
  });
  
  const { data: technologies, isLoading: techLoading } = useQuery<any[]>({
    queryKey: ['/api/technologies'],
  });

  React.useEffect(() => {
    if (error) {
      toast({
        title: language === 'ko' ? "오류 발생" : "Error Occurred",
        description: language === 'ko' 
          ? "프로젝트 데이터를 불러오는 중 문제가 발생했습니다." 
          : "There was a problem loading project data.",
        variant: "destructive",
      });
    }
  }, [error, toast, language]);

  return (
    <div className="flex flex-col">
      {/* 3D 애니메이션 배경 */}
      <AnimatedBackground />
      
      {/* 히어로 섹션 */}
      <section className="relative pt-24 pb-12 overflow-hidden"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1639762681057-408e52192e55?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=600&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundBlendMode: "soft-light",
          opacity: 0.6
        }}>
        <div className="absolute inset-0 bg-background/75"></div>
        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-white">ZK Prover</span>{" "}
              <span className="text-primary neon-glow">{language === 'ko' ? '네트워크' : 'Network'}</span>{" "}
              <span className="text-white">{language === 'ko' ? '생태계 맵' : 'Ecosystem Map'}</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8">
              {language === 'ko' 
                ? 'Succinct와 다양한 블록체인 프로젝트 간의 파트너십 현황을 시각적으로 탐색해보세요'
                : 'Visually explore partnerships between Succinct and various blockchain projects'}
            </p>
            <Button variant="neon" size="pillLg" asChild>
              <Link href="#ecosystem-map">
                {language === 'ko' ? '생태계 탐색하기' : 'Explore Ecosystem'}
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* 생태계 맵 섹션 */}
      <section id="ecosystem-map" className="py-16 bg-background/90">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold mb-4">
              {language === 'ko' ? 'Succinct ZK 생태계 맵' : 'Succinct ZK Ecosystem Map'}
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              {language === 'ko' 
                ? 'Succinct의 ZK Prover 네트워크와 주요 파트너십 프로젝트들을 살펴보고 각 연결의 기술적 특성을 확인하세요'
                : 'Explore Succinct\'s ZK Prover network and key partnership projects, and check the technical characteristics of each connection'}
            </p>
          </div>

          {/* 생태계 맵 시각화 */}
          {isLoading ? (
            <div className="ecosystem-map bg-muted/50 rounded-2xl p-4 mb-12 border border-gray-800 flex items-center justify-center">
              <div className="text-center">
                <div className="animate-spin h-8 w-8 border-2 border-primary rounded-full border-t-transparent mx-auto mb-4"></div>
                <p className="text-gray-300">
                  {language === 'ko' ? '생태계 맵을 불러오는 중...' : 'Loading ecosystem map...'}
                </p>
              </div>
            </div>
          ) : (
            <StaticEcosystemMap projects={projects || []} />
          )}
          

        </div>
      </section>

      {/* 프로젝트 카드 섹션 */}
      <section className="py-16 bg-gradient-to-b from-background to-muted">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold mb-4">
              <span className="text-primary neon-glow">{language === 'ko' ? '주요' : 'Key'}</span> {language === 'ko' ? '프로젝트' : 'Projects'}
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              {language === 'ko'
                ? 'Succinct와 파트너십을 맺고 있는 주요 프로젝트들을 살펴보세요'
                : 'Explore the key projects that have partnerships with Succinct'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {isLoading ? (
              Array(5).fill(0).map((_, index) => (
                <div key={index} className="bg-muted/50 rounded-xl border border-gray-800 h-64 animate-pulse"></div>
              ))
            ) : (
              <>
                {projects?.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
                {/* 더보기 카드 */}
                <div className="bg-background/30 rounded-xl border border-dashed border-gray-700 overflow-hidden hover:border-primary transition-all duration-300 flex items-center justify-center p-6">
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4 border border-primary">
                      <svg xmlns="http://www.w3.org/2000/svg" className="text-primary text-xl" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="M12 5v14"></path></svg>
                    </div>
                    <h3 className="text-xl font-bold mb-2">
                      {language === 'ko' ? '더 많은 프로젝트' : 'More Projects'}
                    </h3>
                    <p className="text-gray-400 text-sm mb-4">
                      {language === 'ko'
                        ? 'Succinct 생태계에 참여하는 다른 프로젝트들도 살펴보세요'
                        : 'Explore other projects participating in the Succinct ecosystem'}
                    </p>
                    <Button variant="outlineNeon">
                      {language === 'ko' ? '전체 프로젝트 보기' : 'View All Projects'}
                    </Button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* 기술 스택 섹션 */}
      <section className="py-16 bg-background relative z-10">
        <div className="relative" style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=600&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundBlendMode: "soft-light",
          opacity: 0.6
        }}>
          <div className="absolute inset-0 bg-background/80"></div>
          <div className="container mx-auto px-4 py-16 relative">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                <span className="text-white">Succinct</span>{" "}
                <span className="text-primary neon-glow">{language === 'ko' ? 'ZK 기술 스택' : 'ZK Tech Stack'}</span>
              </h2>
              <p className="text-gray-300">
                {language === 'ko'
                  ? 'Succinct의 혁신적인 ZK 프루프 기술과 네트워크 구성 요소를 살펴보세요'
                  : 'Explore Succinct\'s innovative ZK proof technology and network components'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {techLoading ? (
                Array(3).fill(0).map((_, index) => (
                  <div key={index} className="bg-muted/50 rounded-xl p-6 border border-gray-800 h-64 animate-pulse"></div>
                ))
              ) : (
                technologies?.map((tech: any) => (
                  <TechStackCard key={tech.id} technology={tech} />
                ))
              )}
            </div>

            <div className="mt-12 text-center">
              <Button variant="neon" size="pillLg" asChild>
                <Link href="/tech-stack">
                  {language === 'ko' ? '기술 스택 자세히 보기' : 'View Tech Stack Details'}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
