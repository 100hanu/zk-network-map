import React from "react";
import { Project } from "@shared/schema";
import { Link } from "wouter";
import { getColorClass } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <Card className="bg-muted/50 border-gray-800 overflow-hidden hover:border-primary transition-all duration-300 hover:shadow-lg hover:shadow-primary/20">
      <CardContent className="p-6">
        <div className="flex items-center mb-4">
          <div className={`w-12 h-12 flex items-center justify-center rounded-full ${getColorClass(project.logoColor, 'bg')}/20 mr-4 border ${getColorClass(project.logoColor, 'border')}`}>
            <svg className={`w-6 h-6 ${getColorClass(project.logoColor, 'text')}`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24ZM19.6 12L12 4.4L10.8 5.6L14.4 9.2H4.4V10.8H14.4L10.8 14.4L12 15.6L19.6 12Z" fill="currentColor" />
            </svg>
          </div>
          <h3 className="text-xl font-bold">{project.name}</h3>
        </div>
        <div className="mb-4">
          <div className="text-sm text-gray-400 mb-1">사용 기술:</div>
          <div className="flex flex-wrap gap-2">
            {project.mainTechnologies.map((tech, index) => (
              <span 
                key={index} 
                className={`bg-background px-3 py-1 rounded-full text-xs ${getColorClass(project.logoColor, 'text')} border ${getColorClass(project.logoColor, 'border')}`}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
        <p className="text-gray-300 text-sm mb-4">
          {project.introduction.length > 120 
            ? `${project.introduction.substring(0, 120)}...` 
            : project.introduction}
        </p>
        <div className="flex justify-between items-center">
          <Link href={`/projects/${project.slug}`}>
            <a className="text-primary hover:underline text-sm flex items-center group">
              자세히 보기 
              <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </Link>
          <span className="text-xs text-gray-400">{project.year}년 파트너십 체결</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
