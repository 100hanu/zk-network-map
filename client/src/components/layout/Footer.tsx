import React from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

const Footer: React.FC = () => {
  return (
    <footer className="bg-background py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="text-2xl font-bold mb-4 md:mb-0">
            <span className="text-white">Succinct</span>{" "}
            <span className="text-primary neon-glow">ZK</span>{" "}
            <span className="text-white">생태계</span>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-primary">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"></path>
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-primary">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"></path>
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-primary">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" clipRule="evenodd"></path>
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-primary">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"></path>
              </svg>
            </a>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 pb-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-lg font-bold mb-4">프로젝트</h4>
              <ul className="space-y-2">
                <li><Link href="/projects/ethereum"><span className="text-gray-400 hover:text-primary cursor-pointer">Ethereum</span></Link></li>
                <li><Link href="/projects/polygon"><span className="text-gray-400 hover:text-primary cursor-pointer">Polygon</span></Link></li>
                <li><Link href="/projects/optimism"><span className="text-gray-400 hover:text-primary cursor-pointer">Optimism</span></Link></li>
                <li><Link href="/projects/arbitrum"><span className="text-gray-400 hover:text-primary cursor-pointer">Arbitrum</span></Link></li>
                <li><Link href="/projects/scroll"><span className="text-gray-400 hover:text-primary cursor-pointer">Scroll</span></Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4">기술</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-primary">ZK-SNARK</a></li>
                <li><a href="#" className="text-gray-400 hover:text-primary">Plonky2</a></li>
                <li><a href="#" className="text-gray-400 hover:text-primary">ZK Coprocessor</a></li>
                <li><a href="#" className="text-gray-400 hover:text-primary">Recursive Proofs</a></li>
                <li><a href="#" className="text-gray-400 hover:text-primary">ZK Bridge</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4">리소스</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-primary">문서</a></li>
                <li><a href="#" className="text-gray-400 hover:text-primary">개발자 포털</a></li>
                <li><a href="#" className="text-gray-400 hover:text-primary">기술 블로그</a></li>
                <li><a href="#" className="text-gray-400 hover:text-primary">연구 논문</a></li>
                <li><a href="#" className="text-gray-400 hover:text-primary">커뮤니티</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4">Succinct 소개</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-primary">회사 소개</a></li>
                <li><a href="#" className="text-gray-400 hover:text-primary">팀</a></li>
                <li><a href="#" className="text-gray-400 hover:text-primary">로드맵</a></li>
                <li><a href="#" className="text-gray-400 hover:text-primary">채용</a></li>
                <li><Link href="/contact"><span className="text-gray-400 hover:text-primary cursor-pointer">연락처</span></Link></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 mt-4 text-center">
          <p className="text-gray-500 text-sm">© 2024 Succinct. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
