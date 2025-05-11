import React, { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useQuery } from "@tanstack/react-query";
import { Project } from "@shared/schema";
import { ChevronDown, Menu } from "lucide-react";

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();
  
  const { data: projects } = useQuery<Project[]>({
    queryKey: ['/api/projects'],
  });

  return (
    <header className="bg-background/70 backdrop-blur-md fixed w-full z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/">
              <h1 className="text-2xl font-bold cursor-pointer">
                <span className="text-white">Succinct</span>{" "}
                <span className="text-primary neon-glow">ZK</span>{" "}
                <span className="text-white">생태계</span>
              </h1>
            </Link>
          </div>
          
          <div className="hidden md:flex space-x-6">
            <Link href="/">
              <span className={`font-medium hover:text-primary transition-colors cursor-pointer ${location === '/' ? 'text-primary' : 'text-white'}`}>
                에코시스템 전체 보기
              </span>
            </Link>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="font-medium hover:text-primary transition-colors flex items-center">
                  프로젝트별 보기
                  <ChevronDown className="ml-1 h-4 w-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 bg-muted">
                {projects?.map((project) => (
                  <DropdownMenuItem key={project.id} asChild>
                    <Link href={`/projects/${project.slug}`}>
                      <span className="cursor-pointer">{project.name}</span>
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Link href="/tech-stack">
              <span className={`font-medium hover:text-primary transition-colors cursor-pointer ${location === '/tech-stack' ? 'text-primary' : 'text-white'}`}>
                기술 스택
              </span>
            </Link>
            
            <Link href="/contact">
              <span className={`font-medium hover:text-primary transition-colors cursor-pointer ${location === '/contact' ? 'text-primary' : 'text-white'}`}>
                문의하기
              </span>
            </Link>
          </div>

          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-muted/95 backdrop-blur-md border-gray-800">
                <nav className="flex flex-col space-y-4 mt-8">
                  <Link href="/" onClick={() => setIsOpen(false)}>
                    <span className={`py-2 hover:text-primary cursor-pointer ${location === '/' ? 'text-primary' : 'text-white'}`}>
                      에코시스템 전체 보기
                    </span>
                  </Link>
                  
                  <div className="py-2">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-white">프로젝트별 보기</span>
                    </div>
                    <div className="pl-4 mt-1 space-y-2">
                      {projects?.map((project) => (
                        <Link key={project.id} href={`/projects/${project.slug}`} onClick={() => setIsOpen(false)}>
                          <span className="block py-1 hover:text-primary cursor-pointer">
                            {project.name}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                  
                  <Link href="/tech-stack" onClick={() => setIsOpen(false)}>
                    <span className={`py-2 hover:text-primary cursor-pointer ${location === '/tech-stack' ? 'text-primary' : 'text-white'}`}>
                      기술 스택
                    </span>
                  </Link>
                  
                  <Link href="/contact" onClick={() => setIsOpen(false)}>
                    <span className={`py-2 hover:text-primary cursor-pointer ${location === '/contact' ? 'text-primary' : 'text-white'}`}>
                      문의하기
                    </span>
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
