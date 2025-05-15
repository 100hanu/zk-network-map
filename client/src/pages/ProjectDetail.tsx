import React from "react";
import { useParams, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Project } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { getColorClass } from "@/lib/utils";
import { useTheme } from "@/components/layout/Header";
import { 
  Card, 
  CardContent 
} from "@/components/ui/card";
import { 
  ChevronLeft,
  FileText
} from "lucide-react";

const ProjectDetail: React.FC = () => {
  const { slug } = useParams();
  const { language } = useTheme();
  
  const { data: project, isLoading, error } = useQuery<Project>({
    queryKey: [`/api/projects/${slug}`],
  });
  
  const { data: technologies, isLoading: techLoading } = useQuery({
    queryKey: [`/api/projects/${project?.id}/technologies`],
    enabled: !!project?.id,
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16 flex justify-center">
        <div className="animate-spin h-8 w-8 border-2 border-primary rounded-full border-t-transparent"></div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">
          {language === 'ko' ? '프로젝트를 찾을 수 없습니다' : 'Project Not Found'}
        </h2>
        <p className="text-gray-300 mb-8">
          {language === 'ko' 
            ? '요청하신 프로젝트를 찾을 수 없거나 오류가 발생했습니다.' 
            : 'The requested project could not be found or an error occurred.'}
        </p>
        <Button variant="neon" asChild>
          <Link href="/">
            {language === 'ko' ? '홈으로 돌아가기' : 'Return to Home'}
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <Link href="/">
        <Button variant="ghost" className="mb-6">
          <ChevronLeft className="mr-2 h-4 w-4" />
          {language === 'ko' ? '에코시스템 맵으로 돌아가기' : 'Back to Ecosystem Map'}
        </Button>
      </Link>
      
      <div className="bg-muted/30 rounded-xl p-6 md:p-8 border border-gray-800 mb-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div className="flex items-center mb-4 md:mb-0">
            <div className={`w-16 h-16 flex items-center justify-center rounded-full ${getColorClass(project.logoColor, 'bg')}/20 mr-4 border ${getColorClass(project.logoColor, 'border')}`}>
              <svg className={`w-8 h-8 ${getColorClass(project.logoColor, 'text')}`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24ZM19.6 12L12 4.4L10.8 5.6L14.4 9.2H4.4V10.8H14.4L10.8 14.4L12 15.6L19.6 12Z" fill="currentColor" />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold">{project.name}</h1>
              <p className="text-gray-400">{project.description}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-background/60">
            <CardContent className="pt-6">
              <h3 className="text-lg font-bold mb-2">
                {language === 'ko' ? '파트너십 체결' : 'Partnership Date'}
              </h3>
              <p className="text-gray-300">
                {language === 'ko' ? `${project.year}년` : `${project.year}`}
              </p>
            </CardContent>
          </Card>
          <Card className="bg-background/60">
            <CardContent className="pt-6">
              <h3 className="text-lg font-bold mb-2">
                {language === 'ko' ? '통합 상태' : 'Integration Status'}
              </h3>
              <p className={getColorClass(project.logoColor, 'text')}>{project.status}</p>
            </CardContent>
          </Card>
          <Card className="bg-background/60">
            <CardContent className="pt-6">
              <h3 className="text-lg font-bold mb-2">
                {language === 'ko' ? '주요 기술' : 'Key Technologies'}
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.mainTechnologies?.map((tech, index) => (
                  <span 
                    key={index} 
                    className={`bg-background px-3 py-1 rounded-full text-xs ${getColorClass(project.logoColor, 'text')} border ${getColorClass(project.logoColor, 'border')}`}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-bold mb-4">
            {language === 'ko' ? '프로젝트 소개' : 'Project Introduction'}
          </h3>
          <p className="text-gray-300 whitespace-pre-line">
            {project.introduction}
          </p>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-bold mb-4">
            {language === 'ko' ? 'Succinct와의 기술적 연결' : 'Technical Integration with Succinct'}
          </h3>
          {project.integrationDetails?.map((detail, index) => {
            const [title, description] = detail.split(': ');
            return (
              <Card key={index} className="bg-background/60 mb-4">
                <CardContent className="pt-6">
                  <h4 className="text-lg font-semibold mb-3">{title}</h4>
                  <p className="text-gray-300 text-sm">
                    {description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-bold mb-4">
            {language === 'ko' ? '파트너십 핵심 내용' : 'Partnership Highlights'}
          </h3>
          <ul className="list-disc list-inside space-y-2 text-gray-300">
            {project.partnershipHighlights?.map((highlight, index) => (
              <li key={index}>{highlight}</li>
            ))}
          </ul>
        </div>

        <div className="flex justify-center">
          <Button variant="neon" size="lg">
            <FileText className="mr-2 h-4 w-4" />
            {language === 'ko' ? '공식 파트너십 문서 확인' : 'View Official Partnership Documents'}
          </Button>
        </div>
      </div>
      
      <div className="text-center mt-12">
        <h3 className="text-xl font-bold mb-6">
          {language === 'ko' ? '다른 프로젝트 둘러보기' : 'Explore Other Projects'}
        </h3>
        <div className="flex flex-wrap justify-center gap-4">
          <Button variant="outlineNeon" asChild>
            <Link href="/">
              {language === 'ko' ? '에코시스템 맵으로 돌아가기' : 'Return to Ecosystem Map'}
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/tech-stack">
              {language === 'ko' ? '기술 스택 살펴보기' : 'Explore Technology Stack'}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
