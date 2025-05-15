import React, { useState, useEffect } from "react";
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
import { 
  ChevronDown, 
  Menu,
  Moon,
  Sun,
  Globe,
  ExternalLink
} from "lucide-react";

// 테마 관리를 위한 인터페이스
interface ThemeProviderProps {
  children: React.ReactNode;
}

type Theme = 'dark' | 'light';
type Language = 'ko' | 'en';

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('dark');
  const [language, setLanguage] = useState<Language>('ko');

  // 테마 변경 함수
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }
    localStorage.setItem('theme', newTheme);
  };

  // 언어 변경 함수
  const toggleLanguage = () => {
    const newLanguage = language === 'ko' ? 'en' : 'ko';
    setLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
  };

  // 초기 테마 및 언어 설정
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme || 'dark';
    const savedLanguage = localStorage.getItem('language') as Language || 'ko';
    
    setTheme(savedTheme);
    setLanguage(savedLanguage);
    
    // 테마 클래스 적용
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, language, toggleLanguage }}>
      {children}
    </ThemeContext.Provider>
  );
};

// 테마 컨텍스트
interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  language: Language;
  toggleLanguage: () => void;
}

const ThemeContext = React.createContext<ThemeContextType>({
  theme: 'dark',
  toggleTheme: () => {},
  language: 'ko',
  toggleLanguage: () => {}
});

// 테마 및 언어 사용을 위한 훅
export const useTheme = () => React.useContext(ThemeContext);

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();
  const { theme, toggleTheme, language, toggleLanguage } = useTheme();
  
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
          
          <div className="hidden md:flex space-x-6 items-center">
            <Link href="/">
              <span className={`font-medium hover:text-primary transition-colors cursor-pointer ${location === '/' ? 'text-primary' : 'text-white'}`}>
                {language === 'ko' ? '에코시스템 전체 보기' : 'View Ecosystem'}
              </span>
            </Link>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="font-medium hover:text-primary transition-colors flex items-center">
                  {language === 'ko' ? '프로젝트별 보기' : 'Projects'}
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
                {language === 'ko' ? '기술 스택' : 'Tech Stack'}
              </span>
            </Link>
            
            <Link href="/contact">
              <span className={`font-medium hover:text-primary transition-colors cursor-pointer ${location === '/contact' ? 'text-primary' : 'text-white'}`}>
                {language === 'ko' ? '문의하기' : 'Contact'}
              </span>
            </Link>

            <div className="flex items-center gap-2 ml-2">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={toggleTheme}
                className="rounded-full w-8 h-8 p-0 bg-muted/40 hover:bg-muted/60"
              >
                {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={toggleLanguage}
                className="rounded-full w-8 h-8 p-0 bg-muted/40 hover:bg-muted/60"
              >
                <Globe className="h-4 w-4" />
              </Button>
              <a 
                href="https://www.succinct.xyz" 
                target="_blank" 
                rel="noopener noreferrer"
                className="rounded-full w-8 h-8 p-0 bg-muted/40 hover:bg-muted/60 flex items-center justify-center"
              >
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
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
                      {language === 'ko' ? '에코시스템 전체 보기' : 'View Ecosystem'}
                    </span>
                  </Link>
                  
                  <div className="py-2">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-white">{language === 'ko' ? '프로젝트별 보기' : 'Projects'}</span>
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
                      {language === 'ko' ? '기술 스택' : 'Tech Stack'}
                    </span>
                  </Link>
                  
                  <Link href="/contact" onClick={() => setIsOpen(false)}>
                    <span className={`py-2 hover:text-primary cursor-pointer ${location === '/contact' ? 'text-primary' : 'text-white'}`}>
                      {language === 'ko' ? '문의하기' : 'Contact'}
                    </span>
                  </Link>

                  <div className="border-t border-gray-800 pt-4 mt-2">
                    <div className="flex items-center gap-4">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={toggleTheme}
                        className="flex items-center gap-2"
                      >
                        {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                        {language === 'ko' ? '테마 전환' : 'Toggle Theme'}
                      </Button>

                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={toggleLanguage}
                        className="flex items-center gap-2"
                      >
                        <Globe className="h-4 w-4" />
                        {language === 'ko' ? '언어 전환' : 'Toggle Language'}
                      </Button>
                    </div>
                  </div>

                  <div className="mt-4">
                    <a
                      href="https://www.succinct.xyz"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-primary hover:underline"
                    >
                      <ExternalLink className="h-4 w-4" />
                      {language === 'ko' ? 'Succinct 웹사이트 방문' : 'Visit Succinct Website'}
                    </a>
                  </div>
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
