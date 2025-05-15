import React from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { FaTwitter, FaDiscord, FaGithub } from "react-icons/fa";
import { SiTelegram } from "react-icons/si";
import { ExternalLink } from "lucide-react";
import { useTheme } from "./Header";

const Footer: React.FC = () => {
  const { language } = useTheme();
  
  return (
    <footer className="bg-background py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="text-2xl font-bold mb-4 md:mb-0">
            <span className="text-white">Succinct</span>{" "}
            <span className="text-primary neon-glow">ZK</span>{" "}
            <span className="text-white">{language === 'ko' ? '생태계' : 'Ecosystem'}</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="https://twitter.com/succinctlabs" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors">
              <FaTwitter className="h-6 w-6" />
            </a>
            <a href="https://discord.gg/succinctlabs" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors">
              <FaDiscord className="h-6 w-6" />
            </a>
            <a href="https://github.com/succinctlabs" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors">
              <FaGithub className="h-6 w-6" />
            </a>
            <a 
              href="https://linktr.ee/succinctlabs" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-1 text-gray-400 hover:text-primary transition-colors"
            >
              <ExternalLink className="h-5 w-5" />
              <span className="text-sm font-medium">{language === 'ko' ? '링크트리' : 'Linktree'}</span>
            </a>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 pb-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-lg font-bold mb-4">{language === 'ko' ? '프로젝트' : 'Projects'}</h4>
              <ul className="space-y-2">
                <li><Link href="/projects/ethereum"><span className="text-gray-400 hover:text-primary cursor-pointer">Ethereum</span></Link></li>
                <li><Link href="/projects/polygon"><span className="text-gray-400 hover:text-primary cursor-pointer">Polygon</span></Link></li>
                <li><Link href="/projects/optimism"><span className="text-gray-400 hover:text-primary cursor-pointer">Optimism (OP Stack)</span></Link></li>
                <li><Link href="/projects/solana"><span className="text-gray-400 hover:text-primary cursor-pointer">Solana</span></Link></li>
                <li><Link href="/projects/celestia"><span className="text-gray-400 hover:text-primary cursor-pointer">Celestia</span></Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4">{language === 'ko' ? '기술' : 'Technology'}</h4>
              <ul className="space-y-2">
                <li><Link href="/tech-stack"><span className="text-gray-400 hover:text-primary cursor-pointer">SP1 – Modular zkVM</span></Link></li>
                <li><Link href="/tech-stack"><span className="text-gray-400 hover:text-primary cursor-pointer">Real-Time Proving Layer</span></Link></li>
                <li><Link href="/tech-stack"><span className="text-gray-400 hover:text-primary cursor-pointer">vApps (Verifiable Applications)</span></Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4">{language === 'ko' ? '리소스' : 'Resources'}</h4>
              <ul className="space-y-2">
                <li><a href="https://docs.succinct.xyz" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary">{language === 'ko' ? '문서' : 'Documentation'}</a></li>
                <li><a href="https://succinct.xyz/developers" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary">{language === 'ko' ? '개발자 포털' : 'Developer Portal'}</a></li>
                <li><a href="https://succinct.xyz/blog" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary">{language === 'ko' ? '기술 블로그' : 'Technical Blog'}</a></li>
                <li><a href="https://succinct.xyz/research" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary">{language === 'ko' ? '연구 논문' : 'Research Papers'}</a></li>
                <li><a href="https://discord.gg/succinctlabs" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary">{language === 'ko' ? '커뮤니티' : 'Community'}</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4">{language === 'ko' ? 'Succinct 소개' : 'About Succinct'}</h4>
              <ul className="space-y-2">
                <li><a href="https://succinct.xyz/about" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary">{language === 'ko' ? '회사 소개' : 'About Us'}</a></li>
                <li><a href="https://succinct.xyz/team" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary">{language === 'ko' ? '팀' : 'Team'}</a></li>
                <li><a href="https://succinct.xyz/roadmap" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary">{language === 'ko' ? '로드맵' : 'Roadmap'}</a></li>
                <li><a href="https://succinct.xyz/careers" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary">{language === 'ko' ? '채용' : 'Careers'}</a></li>
                <li><a href="https://linktr.ee/KSW_CRYPTO" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary">{language === 'ko' ? '만든이' : 'Creator'}</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 mt-4 text-center">
          <p className="text-gray-500 text-sm">© 2024 Succinct. {language === 'ko' ? '모든 권리 보유.' : 'All rights reserved.'}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
