import React from "react";
import { Project } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { getColorClass } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { X } from "lucide-react";

interface ProjectModalProps {
  project?: Project;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, isOpen, onClose }) => {
  if (!project) return null;
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-muted/95 backdrop-blur-md border-gray-800 sm:max-w-[700px]">
        <DialogHeader>
          <div className="flex justify-between items-start">
            <div className="flex items-center">
              <div className={`w-12 h-12 flex items-center justify-center rounded-full ${getColorClass(project.logoColor, 'bg')}/20 mr-4 border ${getColorClass(project.logoColor, 'border')}`}>
                <svg className={`w-6 h-6 ${getColorClass(project.logoColor, 'text')}`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24ZM19.6 12L12 4.4L10.8 5.6L14.4 9.2H4.4V10.8H14.4L10.8 14.4L12 15.6L19.6 12Z" fill="currentColor" />
                </svg>
              </div>
              <div>
                <DialogTitle className="text-2xl">{project.name}</DialogTitle>
                <DialogDescription>{project.description}</DialogDescription>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-background rounded-lg p-4">
            <h3 className="text-sm font-semibold mb-1">파트너십 체결</h3>
            <p className="text-gray-300">{project.year}년</p>
          </div>
          <div className="bg-background rounded-lg p-4">
            <h3 className="text-sm font-semibold mb-1">통합 상태</h3>
            <p className={getColorClass(project.logoColor, 'text')}>{project.status}</p>
          </div>
          <div className="bg-background rounded-lg p-4">
            <h3 className="text-sm font-semibold mb-1">주요 기술</h3>
            <div className="flex flex-wrap gap-2">
              {project.mainTechnologies.map((tech, index) => (
                <span 
                  key={index} 
                  className={`bg-muted px-3 py-1 rounded-full text-xs ${getColorClass(project.logoColor, 'text')} border ${getColorClass(project.logoColor, 'border')}`}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
        
        <div className="max-h-[300px] overflow-y-auto pr-2">
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">프로젝트 소개</h3>
            <p className="text-gray-300 text-sm">
              {project.introduction}
            </p>
          </div>
          
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">파트너십 핵심 내용</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-300">
              {project.partnershipHighlights.map((highlight, index) => (
                <li key={index}>{highlight}</li>
              ))}
            </ul>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>닫기</Button>
          <Button variant="neon">자세히 보기</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectModal;
