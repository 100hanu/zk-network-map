import { db } from "../server/db";
import { projects, technologies, projectTechnologies } from "../shared/schema";
import { MemStorage } from "../server/storage";

/**
 * 이 스크립트는 메모리 스토리지에 있는 초기 데이터를 실제 데이터베이스에 마이그레이션합니다.
 * 한 번만 실행해야 합니다.
 */
async function seedDatabase() {
  console.log("데이터베이스 시드 작업을 시작합니다...");
  
  // 메모리 스토리지의 데이터 가져오기
  const memStorage = new MemStorage();
  const projectsData = await memStorage.getAllProjects();
  const technologiesData = await memStorage.getAllTechnologies();
  
  // 프로젝트 데이터 삽입
  console.log(`${projectsData.length}개의 프로젝트를 삽입합니다...`);
  for (const project of projectsData) {
    try {
      await db.insert(projects).values({
        id: project.id,
        name: project.name,
        slug: project.slug,
        description: project.description,
        logo: project.logo,
        year: project.year,
        status: project.status,
        logoColor: project.logoColor,
        mainTechnologies: project.mainTechnologies,
        introduction: project.introduction,
        introductionEn: project.introductionEn,
        integrationDetails: project.integrationDetails,
        integrationDetailsEn: project.integrationDetailsEn,
        partnershipHighlights: project.partnershipHighlights,
        partnershipHighlightsEn: project.partnershipHighlightsEn
      }).onConflictDoNothing();
    } catch (error) {
      console.error(`프로젝트 삽입 오류 (${project.name}):`, error);
    }
  }
  
  // 기술 데이터 삽입
  console.log(`${technologiesData.length}개의 기술을 삽입합니다...`);
  for (const tech of technologiesData) {
    try {
      await db.insert(technologies).values({
        id: tech.id,
        name: tech.name,
        description: tech.description,
        icon: tech.icon,
        benefits: tech.benefits,
        documentationLink: tech.documentationLink,
        descriptionEn: (tech as any).descriptionEn,
        benefitsEn: (tech as any).benefitsEn
      }).onConflictDoNothing();
    } catch (error) {
      console.error(`기술 삽입 오류 (${tech.name}):`, error);
    }
  }
  
  // 프로젝트-기술 관계 데이터 가져오기
  console.log("프로젝트-기술 관계를 삽입합니다...");
  for (const project of projectsData) {
    try {
      const projectTechs = await memStorage.getProjectTechnologies(project.id);
      
      for (const projectTech of projectTechs) {
        await db.insert(projectTechnologies).values({
          id: projectTech.id,
          projectId: projectTech.projectId,
          technologyId: projectTech.technologyId,
          details: projectTech.details
        }).onConflictDoNothing();
      }
    } catch (error) {
      console.error(`프로젝트-기술 관계 삽입 오류 (프로젝트 ID: ${project.id}):`, error);
    }
  }
  
  console.log("데이터베이스 시드 작업이 완료되었습니다.");
}

// 스크립트 실행
seedDatabase()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("데이터베이스 시드 작업 중 오류가 발생했습니다:", error);
    process.exit(1);
  });