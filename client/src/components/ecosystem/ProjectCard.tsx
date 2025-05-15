import React from "react";
import { Project } from "@shared/schema";
import { Link } from "wouter";
import { getColorClass } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/components/layout/Header";

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const { language } = useLanguage();
  return (
    <Card className="bg-muted/50 border-gray-800 overflow-hidden hover:border-primary transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 card-hover">
      <CardContent className="p-6">
        <div className="flex items-center mb-4">
          <div className={`w-12 h-12 flex items-center justify-center rounded-full ${getColorClass(project.logoColor, 'bg')}/20 mr-4 border ${getColorClass(project.logoColor, 'border')} transform transition-all duration-500 hover:rotate-12 hover:scale-110`}>
            <svg className={`w-6 h-6 ${getColorClass(project.logoColor, 'text')}`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24ZM19.6 12L12 4.4L10.8 5.6L14.4 9.2H4.4V10.8H14.4L10.8 14.4L12 15.6L19.6 12Z" fill="currentColor" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-3d">{project.name}</h3>
        </div>
        <div className="mb-4">
          <div className="text-sm text-gray-400 mb-1">
            {language === 'ko' ? '사용 기술:' : 'Technologies:'}
          </div>
          <div className="flex flex-wrap gap-2">
            {project.mainTechnologies && project.mainTechnologies.map((tech, index) => (
              <span 
                key={index} 
                className={`bg-background px-3 py-1 rounded-full text-xs ${getColorClass(project.logoColor, 'text')} border ${getColorClass(project.logoColor, 'border')} transform transition-all hover:scale-105`}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
        <p className="text-gray-300 text-sm mb-4">
          {language === 'ko'
            ? (project.introduction.length > 120 
                ? `${project.introduction.substring(0, 120)}...` 
                : project.introduction)
            : (project.introductionEn && project.introductionEn.length > 120
                ? `${project.introductionEn.substring(0, 120)}...`
                : project.introductionEn || project.introduction)}
        </p>
        <div className="flex justify-between items-center">
          <Link href={`/projects/${project.slug}`} className="text-primary text-sm flex items-center group button-glow px-3 py-1 rounded-md">
            {language === 'ko' ? '자세히 보기' : 'View Details'}
            <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <span className="text-xs text-gray-400 neon-glow">
            {language === 'ko' 
              ? `${project.year}년 파트너십 체결` 
              : `Partnership established in ${project.year}`}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
