import { 
  type Project, type InsertProject, 
  type Technology, type InsertTechnology,
  type ProjectTechnology, type InsertProjectTechnology,
  type Contact, type InsertContact
} from "@shared/schema";

export interface IStorage {
  // Project methods
  getAllProjects(): Promise<Project[]>;
  getProjectBySlug(slug: string): Promise<Project | undefined>;
  
  // Technology methods
  getAllTechnologies(): Promise<Technology[]>;
  getTechnologyById(id: number): Promise<Technology | undefined>;
  
  // Project-Technology methods
  getProjectTechnologies(projectId: number): Promise<ProjectTechnology[]>;
  
  // Contact methods
  createContact(contact: InsertContact): Promise<Contact>;
}

export class MemStorage implements IStorage {
  private projects: Map<number, Project>;
  private technologies: Map<number, Technology>;
  private projectTechnologies: Map<number, ProjectTechnology>;
  private contacts: Map<number, Contact>;
  private projectIdCounter: number;
  private technologyIdCounter: number;
  private projectTechnologyIdCounter: number;
  private contactIdCounter: number;

  constructor() {
    this.projects = new Map();
    this.technologies = new Map();
    this.projectTechnologies = new Map();
    this.contacts = new Map();
    
    this.projectIdCounter = 1;
    this.technologyIdCounter = 1;
    this.projectTechnologyIdCounter = 1;
    this.contactIdCounter = 1;
    
    this.initializeData();
  }

  private initializeData() {
    // Initialize projects
    const projects: InsertProject[] = [
      {
        name: "Ethereum",
        slug: "ethereum",
        description: "스마트 컨트랙트 기반 블록체인",
        logo: "ethereum-eth-logo.svg",
        year: 2022,
        status: "프로덕션 단계",
        logoColor: "#3498db",
        mainTechnologies: ["ZK-SNARK", "Recursive Proofs"],
        introduction: "이더리움은 스마트 컨트랙트 기능을 가진 블록체인 플랫폼으로, 다양한 분산 애플리케이션(DApp)을 구축할 수 있는 기반을 제공합니다. 2015년 출시된 이후 블록체인 업계에서 가장 활발한 개발자 생태계를 보유하고 있으며, 이더(ETH)는 시가총액 기준 두 번째로 큰 암호화폐입니다. 이더리움은 최근 지속적인 확장성 향상을 위해 다양한 레이어2 솔루션과 ZK 증명 기술을 도입하고 있으며, 특히 Succinct의 기술을 활용한 트랜잭션 처리 속도 개선에 주력하고 있습니다.",
        integrationDetails: [
          "ZK-SNARK 증명 통합: 이더리움은 Succinct의 ZK-SNARK 증명 기술을 활용하여 트랜잭션 검증 과정을 최적화하고, 처리 속도를 향상시켰습니다. 특히 복잡한 스마트 컨트랙트 실행에 대한 증명을 효율적으로 생성하고 검증함으로써 네트워크의 확장성 문제를 완화했습니다.",
          "재귀적 증명(Recursive Proofs) 적용: Succinct의 재귀적 증명 기술을 도입하여 다수의 트랜잭션을 하나의 증명으로 압축하고, 이를 통해 검증 시간을 크게 단축했습니다. 이는 이더리움 메인넷의 확장성을 획기적으로 향상시키는 핵심 요소로 작용하고 있습니다."
        ],
        partnershipHighlights: [
          "이더리움 메인넷의 트랜잭션 처리 용량 3배 증가",
          "스마트 컨트랙트 실행 비용(가스) 평균 45% 절감",
          "복잡한 DeFi 트랜잭션의 검증 시간 85% 단축",
          "ZK 롤업 솔루션과의 호환성 향상으로 L2 생태계 확장 지원",
          "개발자 도구 및 SDK 공동 개발을 통한 ZK 애플리케이션 개발 촉진"
        ]
      },
      {
        name: "Polygon",
        slug: "polygon",
        description: "레이어2 확장 솔루션",
        logo: "polygon-matic-logo.svg",
        year: 2023,
        status: "프로덕션 단계",
        logoColor: "#8e44ad",
        mainTechnologies: ["ZK Rollup", "Plonky2"],
        introduction: "폴리곤은 이더리움의 확장성 문제를 해결하기 위한 사이드체인 기반 레이어2 솔루션입니다. 높은 트랜잭션 처리량과 낮은 수수료를 제공하며, 다양한 DApp과 DeFi 프로젝트들이 폴리곤 네트워크를 활용하고 있습니다. 폴리곤은 Zero Knowledge 기술에 많은 투자를 하고 있으며, Succinct와의 파트너십을 통해 레이어2 솔루션을 더욱 강화하고 있습니다.",
        integrationDetails: [
          "ZK Rollup 최적화: Succinct의 ZK Prover 네트워크를 활용하여 폴리곤의 ZK Rollup 솔루션의 증명 생성 속도를 크게 향상시켰습니다. 이를 통해 트랜잭션 확정 시간이 단축되고 네트워크 처리량이 증가했습니다.",
          "Plonky2 통합: Succinct의 고성능 증명 시스템인 Plonky2를 폴리곤 네트워크에 통합하여 증명 생성 및 검증 과정의 효율성을 개선했습니다. 이는 네트워크의 전반적인 성능 향상으로 이어졌습니다."
        ],
        partnershipHighlights: [
          "폴리곤 네트워크의 TPS(초당 트랜잭션 수) 5배 향상",
          "트랜잭션 확정 시간 75% 단축",
          "ZK Rollup 증명 생성 비용 60% 절감",
          "공동 개발한 ZK 도구를 통해 생태계 개발자 50% 증가",
          "Succinct의 ZK Prover를 폴리곤의 Nightfall 솔루션에 통합"
        ]
      },
      {
        name: "Optimism",
        slug: "optimism",
        description: "옵티미스틱 롤업 프로토콜",
        logo: "optimism-op-logo.svg",
        year: 2023,
        status: "구현 단계",
        logoColor: "#e74c3c",
        mainTechnologies: ["Optimistic Rollup", "ZK Bridge"],
        introduction: "옵티미즘은,이더리움의 확장성을 개선하기 위한 옵티미스틱 롤업 프로토콜입니다. 'Optimistic'이란 트랜잭션이 일단 유효하다고 가정하고 나중에 이의가 제기될 경우 검증한다는 의미로, 이를 통해 메인넷보다 낮은 비용과 높은 처리량을 제공합니다. Succinct와의 파트너십을 통해 옵티미스틱 롤업의 단점인 출금 지연 시간을 ZK 증명 기술로 개선하고 있습니다.",
        integrationDetails: [
          "ZK Bridge 개발: Succinct와 옵티미즘은 공동으로 ZK Bridge를 개발하여 기존 옵티미스틱 롤업의 7일 챌린지 기간을 대폭 줄였습니다. 이를 통해 L2에서 L1으로의 자산 이동 시간이 크게 단축되었습니다.",
          "옵티미스틱 롤업과 ZK 증명 하이브리드 모델: Succinct의 ZK 증명 기술을 옵티미스틱 롤업 프로토콜에 부분적으로 적용하여, 두 기술의 장점을 결합한 하이브리드 모델을 구축했습니다. 이는 보안성과 효율성을 모두 향상시켰습니다."
        ],
        partnershipHighlights: [
          "L2에서 L1으로의 출금 시간 7일에서 15분으로 단축",
          "하이브리드 모델 적용으로 트랜잭션 처리 비용 40% 절감",
          "Succinct의 ZK Prover를 활용한 사기 증명(fraud proof) 생성 시간 90% 단축",
          "ZK Bridge 기술 공개를 통한 생태계 기여",
          "옵티미스틱 롤업과 ZK 롤업의 장점을 결합한 새로운 표준 제시"
        ]
      },
      {
        name: "Arbitrum",
        slug: "arbitrum",
        description: "롤업 기술 기반 레이어2",
        logo: "arbitrum-arb-logo.svg",
        year: 2023,
        status: "테스트 단계",
        logoColor: "#2980b9",
        mainTechnologies: ["Arbitrum Rollup", "Succinct Proofs"],
        introduction: "아비트럼은 이더리움의 확장성을 개선하기 위한 레이어2 롤업 솔루션으로, 옵티미스틱 롤업 기술을 기반으로 하지만 독자적인 Arbitrum Rollup 기술을 개발했습니다. 메인넷과 동일한 보안성을 유지하면서도 더 낮은 수수료와 빠른 트랜잭션 처리를 제공합니다. Succinct와의 파트너십을 통해 롤업 증명 검증 과정을 개선하고 있습니다.",
        integrationDetails: [
          "Succinct Proofs 통합: Arbitrum의 롤업 프로토콜에 Succinct의 효율적인 증명 시스템을 통합하여 검증 과정의 계산 복잡성을 크게 줄였습니다. 이를 통해 메인넷에 제출되는 증명의 크기가 작아지고 검증 비용이 절감되었습니다.",
          "Zero-Knowledge 기반 검증 레이어: Arbitrum의 옵티미스틱 롤업 위에 ZK 기반 검증 레이어를 추가하는 하이브리드 접근법을 채택하여, 기존 시스템의 보안을 유지하면서도 성능을 향상시켰습니다."
        ],
        partnershipHighlights: [
          "Arbitrum One 메인넷의 검증 비용 65% 절감",
          "상태 전이 증명(state transition proof) 크기 80% 감소",
          "롤업 검증 프로세스의 가스 소비량 70% 절감",
          "사기 증명(fraud proof) 제출 시간 12시간에서 30분으로 단축",
          "Arbitrum Nova 체인에 Succinct ZK 기술 시범 적용 및 테스트"
        ]
      },
      {
        name: "Scroll",
        slug: "scroll",
        description: "ZK 롤업 특화 레이어2",
        logo: "scroll-scrl-logo.svg",
        year: 2024,
        status: "개발 단계",
        logoColor: "#27ae60",
        mainTechnologies: ["ZK-EVM", "ZK Coprocessor"],
        introduction: "스크롤은 ZK-EVM(Zero Knowledge Ethereum Virtual Machine)에 초점을 맞춘 레이어2 확장 솔루션입니다. 이더리움의 기존 스마트 컨트랙트와 도구를 그대로 사용할 수 있으면서도 ZK 롤업의 효율성과 보안성을 제공하는 것이 목표입니다. Succinct와의 파트너십은 ZK-EVM의 증명 생성 속도를 크게 향상시키는 데 중점을 두고 있습니다.",
        integrationDetails: [
          "ZK-EVM 증명 최적화: Succinct의 ZK Prover 네트워크를 스크롤의 ZK-EVM에 통합하여 증명 생성 과정을 병렬화하고 최적화했습니다. 이를 통해 EVM 실행에 대한 증명 생성 시간이 크게 단축되었습니다.",
          "ZK Coprocessor 구현: Succinct의 ZK Coprocessor 아키텍처를 스크롤 네트워크에 적용하여 복잡한 ZK 계산을 효율적으로 처리할 수 있게 되었습니다. 이는 특히 SNARK 증명 생성 과정에서 큰 성능 향상을 가져왔습니다."
        ],
        partnershipHighlights: [
          "ZK-EVM 증명 생성 시간 8배 단축",
          "트랜잭션당 증명 생성 비용 75% 절감",
          "Succinct의 ZK Prover 분산 네트워크를 통한 증명 생성 처리량 10배 향상",
          "이더리움 메인넷과의 완벽한 호환성 유지하며 ZK 롤업 구현",
          "개발자 친화적인 ZK-EVM 도구 공동 개발"
        ]
      }
    ];

    // Initialize technologies
    const technologies: InsertTechnology[] = [
      {
        name: "ZK-SNARK",
        icon: "lock",
        description: "영지식 증명 기술의 대표적인 방식으로, 정보를 노출하지 않고 증명을 검증합니다.",
        benefits: ["낮은 검증 비용", "높은 증명 효율성"],
        documentationLink: "/tech/zk-snark"
      },
      {
        name: "Plonky2",
        icon: "bolt",
        description: "Succinct의 핵심 증명 시스템으로, 재귀적 증명을 가능하게 하는 혁신적인 ZK 기술입니다.",
        benefits: ["초고속 증명 생성", "재귀적 증명 지원"],
        documentationLink: "/tech/plonky2"
      },
      {
        name: "ZK Coprocessor",
        icon: "microchip",
        description: "복잡한 계산을 오프체인에서 처리하고 결과만 온체인에 검증하는 혁신적인 아키텍처입니다.",
        benefits: ["오프체인 계산", "온체인 검증"],
        documentationLink: "/tech/zk-coprocessor"
      }
    ];

    // Insert projects and technologies
    projects.forEach(project => {
      const id = this.projectIdCounter++;
      this.projects.set(id, { ...project, id });
    });

    technologies.forEach(technology => {
      const id = this.technologyIdCounter++;
      this.technologies.set(id, { ...technology, id });
    });

    // Create project-technology relationships
    this.createProjectTechnology(1, 1, "이더리움 네트워크에 ZK-SNARK 통합");
    this.createProjectTechnology(1, 2, "이더리움에서의 재귀적 증명 적용");
    this.createProjectTechnology(2, 2, "폴리곤 롤업에 Plonky2 적용");
    this.createProjectTechnology(3, 1, "옵티미즘 브릿지의 ZK-SNARK 활용");
    this.createProjectTechnology(4, 2, "아비트럼에서의 Plonky2 기반 증명");
    this.createProjectTechnology(5, 3, "스크롤 ZK-EVM에 ZK Coprocessor 통합");
  }

  private createProjectTechnology(projectId: number, technologyId: number, details: string): void {
    const id = this.projectTechnologyIdCounter++;
    const projectTechnology: ProjectTechnology = {
      id,
      projectId,
      technologyId,
      details
    };
    this.projectTechnologies.set(id, projectTechnology);
  }

  async getAllProjects(): Promise<Project[]> {
    return Array.from(this.projects.values());
  }

  async getProjectBySlug(slug: string): Promise<Project | undefined> {
    return Array.from(this.projects.values()).find(project => project.slug === slug);
  }

  async getAllTechnologies(): Promise<Technology[]> {
    return Array.from(this.technologies.values());
  }

  async getTechnologyById(id: number): Promise<Technology | undefined> {
    return this.technologies.get(id);
  }

  async getProjectTechnologies(projectId: number): Promise<ProjectTechnology[]> {
    return Array.from(this.projectTechnologies.values()).filter(pt => pt.projectId === projectId);
  }

  async createContact(contact: InsertContact): Promise<Contact> {
    const id = this.contactIdCounter++;
    const newContact: Contact = { ...contact, id };
    this.contacts.set(id, newContact);
    return newContact;
  }
}

export const storage = new MemStorage();
