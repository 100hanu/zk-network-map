import React from "react";
import { Technology } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Lock, Bolt, Cpu, Server, RefreshCw } from "lucide-react";

interface TechStackCardProps {
  technology: Technology;
}

const TechStackCard: React.FC<TechStackCardProps> = ({ technology }) => {
  const getIcon = () => {
    switch (technology.icon) {
      case 'lock':
        return <Lock className="text-primary text-xl" />;
      case 'bolt':
        return <Bolt className="text-primary text-xl" />;
      case 'microchip':
      case 'cpu':
        return <Cpu className="text-primary text-xl" />;
      case 'server':
        return <Server className="text-primary text-xl" />;
      case 'refresh-cw':
        return <RefreshCw className="text-primary text-xl" />;
      default:
        return <Bolt className="text-primary text-xl" />;
    }
  };

  return (
    <Card className="bg-muted/70 backdrop-blur-sm border-gray-800 hover:border-primary transition-all">
      <CardContent className="pt-6">
        <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center mb-4">
          {getIcon()}
        </div>
        <h3 className="text-xl font-bold mb-3">{technology.name}</h3>
        <p className="text-gray-300 text-sm mb-4">
          {technology.description}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {technology.benefits?.map((benefit, index) => (
            <span key={index} className="bg-background px-3 py-1 rounded-full text-xs text-gray-300">
              {benefit}
            </span>
          ))}
        </div>
        <Button variant="ghost" className="text-primary hover:underline text-sm group flex items-center">
          기술 문서 보기 
          <svg xmlns="http://www.w3.org/2000/svg" className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14"></path>
            <path d="m12 5 7 7-7 7"></path>
          </svg>
        </Button>
      </CardContent>
    </Card>
  );
};

export default TechStackCard;
