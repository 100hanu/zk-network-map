// Vercel 서버리스 함수 진입점
import express from 'express';
import { storage } from '../server/storage.js';

const app = express();

// CORS 설정
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  next();
});

// JSON 요청 처리
app.use(express.json());

// API 라우트
// 모든 프로젝트 가져오기
app.get('/api/projects', async (req, res) => {
  try {
    const projects = await storage.getAllProjects();
    res.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
});

// 슬러그로 프로젝트 가져오기
app.get('/api/projects/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const project = await storage.getProjectBySlug(slug);
    
    if (!project) {
      return res.status(404).json({ message: '프로젝트를 찾을 수 없습니다.' });
    }
    
    res.json(project);
  } catch (error) {
    console.error(`Error fetching project with slug ${req.params.slug}:`, error);
    res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
});

// 모든 기술 가져오기
app.get('/api/technologies', async (req, res) => {
  try {
    const technologies = await storage.getAllTechnologies();
    res.json(technologies);
  } catch (error) {
    console.error('Error fetching technologies:', error);
    res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
});

// 프로젝트별 기술 가져오기
app.get('/api/projects/:id/technologies', async (req, res) => {
  try {
    const projectId = parseInt(req.params.id, 10);
    
    if (isNaN(projectId)) {
      return res.status(400).json({ message: '잘못된 프로젝트 ID입니다.' });
    }
    
    const projectTechnologies = await storage.getProjectTechnologies(projectId);
    
    // 각 프로젝트-기술 관계에 대한 전체 기술 세부 정보 가져오기
    const result = await Promise.all(
      projectTechnologies.map(async (pt) => {
        const technology = await storage.getTechnologyById(pt.technologyId);
        return {
          ...pt,
          technology
        };
      })
    );
    
    res.json(result);
  } catch (error) {
    console.error(`Error fetching technologies for project ${req.params.id}:`, error);
    res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
});

// 연락처 생성
app.post('/api/contacts', async (req, res) => {
  try {
    const contactData = req.body;
    const contact = await storage.createContact(contactData);
    res.status(201).json(contact);
  } catch (error) {
    console.error('Error creating contact:', error);
    res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
});

// 에러 핸들러
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: '서버 오류가 발생했습니다.' });
});

// Vercel 서버리스 함수로 내보내기
export default app;