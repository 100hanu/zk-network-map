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
            {project.slug === "ethereum" && (
              <svg className={`w-6 h-6 ${getColorClass(project.logoColor, 'text')}`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.944 17.97L4.58 13.62 11.943 24l7.373-10.38-7.372 4.35z" fill="currentColor"></path>
                <path d="M11.943 0L4.57 12.223l7.373 4.353 7.372-4.354L11.943 0z" fill="currentColor"></path>
              </svg>
            )}
            {project.slug === "polygon" && (
              <svg className={`w-6 h-6 ${getColorClass(project.logoColor, 'text')}`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-1.243 17.657a.812.812 0 01-.808 0l-4.5-2.6a.812.812 0 01-.404-.702V8.902c0-.29.158-.558.404-.702l4.5-2.6a.812.812 0 01.808 0l4.5 2.6c.252.144.404.412.404.702v5.452c0 .29-.158.558-.404.702l-4.5 2.601zm8.09-3.179a.406.406 0 01-.404 0l-3.292-1.9a.406.406 0 01-.202-.351v-3.8c0-.145.079-.279.202-.351l3.292-1.9a.406.406 0 01.404 0l3.292 1.9a.406.406 0 01.202.35v3.801c0 .145-.079.279-.202.351l-3.292 1.9z" fill="currentColor"></path>
              </svg>
            )}
            {project.slug === "optimism" && (
              <svg className={`w-6 h-6 ${getColorClass(project.logoColor, 'text')}`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12z" fill="currentColor"></path>
                <path d="M8.469 6.782c-.813 0-1.469.635-1.469 1.42 0 .784.656 1.419 1.47 1.419.812 0 1.468-.635 1.468-1.42 0-.784-.656-1.42-1.469-1.42zm-.16 2.434c-.521 0-.942-.437-.942-.975s.42-.976.941-.976c.52 0 .941.437.941.976s-.42.975-.94.975zm5.168.133a.501.501 0 00-.454-.288h-.73v3.985c0 .14.11.253.243.253h.73a.247.247 0 00.243-.253v-3.075l.865.867a.24.24 0 00.346 0l.588-.593a.251.251 0 000-.352l-1.83-1.544zm-5.225.288h-.729a.247.247 0 00-.244.253v3.985c0 .14.11.253.244.253h.729a.247.247 0 00.244-.253V9.89a.247.247 0 00-.244-.253zm2.613 0h-.729a.247.247 0 00-.243.253v3.985c0 .14.11.253.243.253h.729a.247.247 0 00.244-.253V9.89a.247.247 0 00-.244-.253zm6.168 0h-3.232a.247.247 0 00-.243.253v3.985c0 .14.11.253.243.253h.73a.247.247 0 00.243-.253v-1.198h1.54c.134 0 .243-.113.243-.253v-.691a.247.247 0 00-.244-.253h-1.539v-.837h2.259c.134 0 .243-.113.243-.253v-.5a.247.247 0 00-.243-.253z" fill="white"></path>
              </svg>
            )}
            {project.slug === "arbitrum" && (
              <svg className={`w-6 h-6 ${getColorClass(project.logoColor, 'text')}`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12z" fill="currentColor"></path>
                <path d="M13.258 5.304l5.336 9.371c.402.706.402 1.579 0 2.285-.402.705-1.139 1.143-1.938 1.143H7.344c-.8 0-1.537-.438-1.939-1.143-.401-.706-.401-1.579 0-2.285l5.336-9.371a2.18 2.18 0 011.94-1.143c.799 0 1.536.438 1.577 1.143zm-1.94-1.064a2.264 2.264 0 00-2.02 1.184L3.96 14.795a2.282 2.282 0 000 2.326c.418.73 1.18 1.184 2.02 1.184h9.357c.84 0 1.603-.453 2.02-1.184a2.282 2.282 0 000-2.326L11.94 5.424a2.264 2.264 0 00-2.02-1.184h-.502l-.1.001zM12 15.852c-.535 0-.97.435-.97.97 0 .534.435.97.97.97.534 0 .97-.436.97-.97 0-.535-.436-.97-.97-.97zm0-7.756c-.535 0-.97.435-.97.97v4.85c0 .536.435.97.97.97.534 0 .97-.434.97-.97v-4.85c0-.535-.436-.97-.97-.97z" fill="white"></path>
              </svg>
            )}
            {project.slug === "scroll" && (
              <svg className={`w-6 h-6 ${getColorClass(project.logoColor, 'text')}`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="12" fill="currentColor"/>
                <path d="M19.5 11.5c0 .36-.18.69-.49.88L13 16.5c-.28.18-.61.18-.9 0L6.1 12.38a1.03 1.03 0 01-.49-.88v-.99c0-.36.18-.69.49-.88l6.01-4.13c.28-.18.61-.18.9 0l6.01 4.13c.3.2.49.52.49.88v.99z" fill="white"/>
                <path d="M19.5 16c0 .36-.18.69-.49.88L13 21c-.28.18-.61.18-.9 0l-6.01-4.13a1.03 1.03 0 01-.49-.88v-.99c0-.36.18-.69.49-.88l6.01-4.13c.28-.18.61-.18.9 0l6.01 4.13c.3.2.49.52.49.88v.99z" fill="white" fillOpacity=".6"/>
              </svg>
            )}
            {!["ethereum", "polygon", "optimism", "arbitrum", "scroll"].includes(project.slug) && (
              <svg className={`w-6 h-6 ${getColorClass(project.logoColor, 'text')}`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24ZM19.6 12L12 4.4L10.8 5.6L14.4 9.2H4.4V10.8H14.4L10.8 14.4L12 15.6L19.6 12Z" fill="currentColor" />
              </svg>
            )}
          </div>
          <h3 className="text-xl font-bold">{project.name}</h3>
        </div>
        <div className="mb-4">
          <div className="text-sm text-gray-400 mb-1">사용 기술:</div>
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
