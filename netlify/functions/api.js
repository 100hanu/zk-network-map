// netlify/functions/api.js
// ESM 모듈 대신 CommonJS 형식으로 변경 (서버리스 호환성 향상)
const serverDb = require('../../server/db.js');
const serverStorage = require('../../server/storage.js');

// 데이터베이스 연결 테스트
const pool = serverDb.pool;
const db = serverDb.db;
const storage = serverStorage.storage;

export async function handler(event, context) {
  // CORS 헤더 설정
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
  };

  // OPTIONS 요청 처리 (CORS preflight)
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  // API 엔드포인트 분기
  try {
    const path = event.path.replace('/.netlify/functions/api', '');
    
    // 프로젝트 전체 목록 가져오기
    if (path === '/api/projects' && event.httpMethod === 'GET') {
      const projects = await storage.getAllProjects();
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(projects)
      };
    }
    
    // 특정 프로젝트 가져오기
    if (path.startsWith('/api/projects/') && event.httpMethod === 'GET') {
      const slug = path.split('/').pop();
      const project = await storage.getProjectBySlug(slug);
      
      if (!project) {
        return {
          statusCode: 404,
          headers,
          body: JSON.stringify({ error: 'Project not found' })
        };
      }
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(project)
      };
    }
    
    // 기술 스택 전체 목록 가져오기
    if (path === '/api/technologies' && event.httpMethod === 'GET') {
      const technologies = await storage.getAllTechnologies();
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(technologies)
      };
    }
    
    // 특정 기술 스택 가져오기
    if (path.startsWith('/api/technologies/') && event.httpMethod === 'GET') {
      const id = parseInt(path.split('/').pop());
      const technology = await storage.getTechnologyById(id);
      
      if (!technology) {
        return {
          statusCode: 404,
          headers,
          body: JSON.stringify({ error: 'Technology not found' })
        };
      }
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(technology)
      };
    }
    
    // 프로젝트에 적용된 기술 스택 가져오기
    if (path.startsWith('/api/projects/') && path.endsWith('/technologies') && event.httpMethod === 'GET') {
      const parts = path.split('/');
      const projectId = parseInt(parts[parts.length - 2]);
      const projectTechnologies = await storage.getProjectTechnologies(projectId);
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(projectTechnologies)
      };
    }
    
    // 문의하기 저장
    if (path === '/api/contacts' && event.httpMethod === 'POST') {
      const contactData = JSON.parse(event.body);
      const contact = await storage.createContact(contactData);
      
      return {
        statusCode: 201,
        headers,
        body: JSON.stringify(contact)
      };
    }
    
    // 기본 응답 - 지원하지 않는 엔드포인트
    return {
      statusCode: 404,
      headers,
      body: JSON.stringify({ error: 'Not found' })
    };
    
  } catch (error) {
    console.error('API 오류:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: '서버 오류가 발생했습니다.', details: error.message })
    };
  }
}