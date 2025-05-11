import { 
  projects, technologies, projectTechnologies, contacts,
  type Project, type InsertProject, 
  type Technology, type InsertTechnology,
  type ProjectTechnology, type InsertProjectTechnology,
  type Contact, type InsertContact
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

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

// Database storage implementation
export class DatabaseStorage implements IStorage {
  // Project methods
  async getAllProjects(): Promise<Project[]> {
    return await db.select().from(projects);
  }

  async getProjectBySlug(slug: string): Promise<Project | undefined> {
    const result = await db.select().from(projects).where(eq(projects.slug, slug));
    return result.length > 0 ? result[0] : undefined;
  }
  
  // Technology methods
  async getAllTechnologies(): Promise<Technology[]> {
    return await db.select().from(technologies);
  }

  async getTechnologyById(id: number): Promise<Technology | undefined> {
    const result = await db.select().from(technologies).where(eq(technologies.id, id));
    return result.length > 0 ? result[0] : undefined;
  }
  
  // Project-Technology methods
  async getProjectTechnologies(projectId: number): Promise<ProjectTechnology[]> {
    return await db.select().from(projectTechnologies).where(eq(projectTechnologies.projectId, projectId));
  }
  
  // Contact methods
  async createContact(contact: InsertContact): Promise<Contact> {
    const result = await db.insert(contacts).values(contact).returning();
    return result[0];
  }
}

// In-memory storage implementation for backup/reference
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
        mainTechnologies: ["ZK Rollup", "Plonky2", "SP1"],
        introduction: "폴리곤은 이더리움의 확장성 문제를 해결하기 위한 사이드체인 기반 레이어2 솔루션입니다. 높은 트랜잭션 처리량과 낮은 수수료를 제공하며, 다양한 DApp과 DeFi 프로젝트들이 폴리곤 네트워크를 활용하고 있습니다. 폴리곤은 Zero Knowledge 기술에 많은 투자를 하고 있으며, Succinct와의 파트너십을 통해 레이어2 솔루션을 더욱 강화하고 있습니다.",
        integrationDetails: [
          "ZK Rollup 최적화: Succinct의 ZK Prover 네트워크를 활용하여 폴리곤의 ZK Rollup 솔루션의 증명 생성 속도를 크게 향상시켰습니다. 이를 통해 트랜잭션 확정 시간이 단축되고 네트워크 처리량이 증가했습니다.",
          "Succinct의 기술을 활용하여 ZK 인프라 전반에 걸쳐 다양한 기능을 지원하며, SP1을 통해 확장성을 크게 개선했습니다."
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
        mainTechnologies: ["OP Stack", "ZK 사기 증명", "SP1"],
        introduction: "옵티미즘은 이더리움의 확장성을 개선하기 위한 옵티미스틱 롤업 프로토콜입니다. 'Optimistic'이란 트랜잭션이 일단 유효하다고 가정하고 나중에 이의가 제기될 경우 검증한다는 의미로, 이를 통해 메인넷보다 낮은 비용과 높은 처리량을 제공합니다. Succinct와의 파트너십을 통해 옵티미스틱 롤업의 단점인 출금 지연 시간을 ZK 증명 기술로 개선하고 있습니다.",
        integrationDetails: [
          "ZK Bridge 개발: Succinct와 옵티미즘은 공동으로 ZK Bridge를 개발하여 기존 옵티미스틱 롤업의 7일 챌린지 기간을 대폭 줄였습니다. 이를 통해 L2에서 L1으로의 자산 이동 시간이 크게 단축되었습니다.",
          "OP Succinct 및 OP Succinct Lite를 통해 ZK 사기 증명을 도입하여, OP Stack 롤업의 보안성과 효율성을 향상시켰습니다."
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
      },
      {
        name: "Galxe",
        slug: "galxe",
        description: "ZK 기반 공정 추첨 시스템",
        logo: "galxe-gal-logo.svg",
        year: 2024,
        status: "구현 단계",
        logoColor: "#1abc9c",
        mainTechnologies: ["ZK 추첨", "SP1", "드랜드 오라클"],
        introduction: "Galxe는 블록체인 기반의 크리덴셜 네트워크로, 웹3 생태계 전반에 걸친 디지털 신원 및 성취를 추적하고 검증하는 플랫폼입니다. Succinct와의 협력을 통해 ZK 증명 기술을 활용한 투명하고 공정한 추첨 시스템을 구현하여, 온체인 이벤트와 마케팅 활동의 신뢰성을 향상시켰습니다.",
        integrationDetails: [
          "zkRaffle 시스템 구현: SP1 zkVM을 활용하여 드랜드 오라클과 함께 ZK 증명을 통한 공정한 추첨 시스템을 구현했습니다. 이를 통해 모든 참가자에게 투명하고 검증 가능한 추첨 결과를 제공합니다.",
          "가스 비용 최적화: ZK 증명 기술을 통해 복잡한 추첨 로직을 효율적으로 처리함으로써, 온체인에서의 가스 비용을 크게 절감하였습니다."
        ],
        partnershipHighlights: [
          "온체인 추첨의 무작위성과 투명성 보장",
          "추첨 프로세스 검증을 위한 가스 비용 85% 절감",
          "대규모 추첨 이벤트에 대한 검증 시간 단축",
          "드랜드 오라클을 통한 안전한 엔트로피 소스 확보",
          "웹3 마케팅 캠페인의 신뢰성 및 참여도 향상"
        ]
      },
      {
        name: "Phala Network",
        slug: "phala-network",
        description: "TEE 기반 컴퓨팅 네트워크",
        logo: "phala-pha-logo.svg",
        year: 2024,
        status: "개발 단계",
        logoColor: "#ff0080",
        mainTechnologies: ["AI 에이전트", "TEE", "ZK 롤업"],
        introduction: "Phala Network는 신뢰할 수 있는 실행 환경(TEE)을 활용한 프라이버시 보호 클라우드 컴퓨팅 서비스를 제공하는 블록체인 프로젝트입니다. Succinct와의 협력을 통해 TEE 환경에서 실행되는 AI 에이전트의 행동을 ZK 증명으로 검증하는 혁신적인 솔루션을 개발하고 있습니다.",
        integrationDetails: [
          "OP Succinct 롤업 도입: SP1 기반의 OP Succinct 롤업을 메인넷에 도입하여 TEE 환경에서 실행되는 AI 에이전트의 행동을 ZK 증명을 통해 검증 가능하게 했습니다.",
          "TEE와 ZK 증명의 결합: TEE의 프라이버시 보호 기능과 ZK 증명의 검증 가능성을 결합하여, 프라이버시를 유지하면서도 신뢰할 수 있는 컴퓨팅 환경을 구축했습니다."
        ],
        partnershipHighlights: [
          "AI 에이전트 행동의 투명성과 정확성 보장",
          "TEE 환경 내 연산 결과에 대한 무결성 증명",
          "프라이버시 보존과 검증 가능성의 최적 균형 달성",
          "OP Succinct 롤업을 통한 검증 비용 절감",
          "AI 에이전트의 온체인 상호작용 신뢰성 향상"
        ]
      },
      {
        name: "Mantle",
        slug: "mantle",
        description: "모듈형 롤업 기술 플랫폼",
        logo: "mantle-mnt-logo.svg",
        year: 2024,
        status: "개발 단계",
        logoColor: "#3498db",
        mainTechnologies: ["ZK 롤업", "zkEVM", "SP1"],
        introduction: "Mantle은 이더리움의 확장성 문제를 해결하기 위한 모듈형 롤업 기술 플랫폼으로, 높은 처리량과 낮은 거래 비용을 제공합니다. 처음에는 옵티미스틱 롤업 기술로 시작했지만, Succinct와의 협력을 통해 ZK 롤업으로의 전환을 진행 중입니다.",
        integrationDetails: [
          "옵티미스틱 롤업에서 ZK 롤업으로 전환: Succinct의 zkEVM 프레임워크와 SP1을 도입하여 기존의 옵티미스틱 롤업에서 ZK 롤업으로 전환하는 과정을 진행 중입니다.",
          "하이브리드 접근 방식: 두 롤업 기술의 장점을 결합한 하이브리드 접근 방식을 채택하여, 점진적으로 ZK 롤업으로 마이그레이션하는 동시에 서비스 연속성을 유지합니다."
        ],
        partnershipHighlights: [
          "트랜잭션 확정 시간 95% 단축",
          "zkEVM 통합을 통한 EVM 호환성 유지",
          "SP1 기반 ZK 증명 생성 시스템 구축",
          "롤업 브리지 보안성 강화",
          "확장성과 보안성의 균형 최적화"
        ]
      },
      {
        name: "Solana",
        slug: "solana",
        description: "고성능 블록체인 플랫폼",
        logo: "solana-sol-logo.svg",
        year: 2024,
        status: "연구 단계",
        logoColor: "#9b59b6",
        mainTechnologies: ["ZK 증명", "Solana", "SP1"],
        introduction: "Solana는 높은 처리량과 낮은 트랜잭션 비용을 제공하는 고성능 블록체인 플랫폼입니다. Succinct와의 협력을 통해 SP1 기반 ZK 증명 기술을 Solana 생태계에 도입하여, 새로운 스케일링 솔루션과 프라이버시 기능을 개발하고 있습니다.",
        integrationDetails: [
          "Solana 생태계 ZK 증명 통합: SP1을 활용하여 Solana 생태계에 ZK 증명 기술을 도입함으로써, 트랜잭션 검증 과정의 효율성을 향상시켰습니다.",
          "프라이버시 보호 기능 개발: ZK 증명을 활용한 프라이버시 보호 기능을 Solana 플랫폼에 추가하여, 민감한 정보를 공개하지 않고도 트랜잭션의 유효성을 검증할 수 있는 방법을 제공합니다."
        ],
        partnershipHighlights: [
          "Solana의 확장성과 ZK 증명의 결합",
          "프로그램 실행 증명을 위한 ZK 솔루션 개발",
          "크로스체인 통신을 위한 ZK 브리지 연구",
          "스테이트 압축을 통한 저장 공간 최적화",
          "개발자를 위한 ZK 도구 및 라이브러리 제공"
        ]
      },
      {
        name: "Cosmos",
        slug: "cosmos",
        description: "블록체인 간 상호운용성 네트워크",
        logo: "cosmos-atom-logo.svg",
        year: 2024,
        status: "개발 단계",
        logoColor: "#2ecc71",
        mainTechnologies: ["IBC", "Cosmos", "SP1"],
        introduction: "Cosmos는 독립적인 블록체인들이 서로 통신할 수 있는 인터블록체인 커뮤니케이션(IBC) 프로토콜을 중심으로 구축된 생태계입니다. Succinct와의 협력을 통해 IBC의 보안성과 효율성을 ZK 증명 기술로 향상시키는 프로젝트를 진행 중입니다.",
        integrationDetails: [
          "IBC v2 ZK 브리지 구현: IBC v2의 공식 배포와 함께, Cosmos와 Ethereum 간의 브리지를 Succinct의 Prover Network와 SP1을 통해 구현하여, 저렴한 비용으로 IBC 트랜잭션을 가능하게 했습니다.",
          "크로스체인 ZK 검증: 서로 다른 블록체인 네트워크 간의 상태 검증을 ZK 증명을 통해 효율적으로 수행할 수 있는 시스템을 개발하여, 크로스체인 트랜잭션의 신뢰성과 속도를 향상시켰습니다."
        ],
        partnershipHighlights: [
          "Cosmos-Ethereum 간 브리지 구축 및 검증 비용 절감",
          "IBC 트랜잭션 검증 시간 단축",
          "크로스체인 상태 동기화 효율성 향상",
          "IBC 보안 모델 강화를 위한 ZK 증명 통합",
          "다중 체인 환경에서의 ZK 증명 표준화 기여"
        ]
      },
      {
        name: "Avail",
        slug: "avail",
        description: "모듈형 데이터 가용성 레이어",
        logo: "avail-ava-logo.svg",
        year: 2024,
        status: "구현 단계",
        logoColor: "#f39c12",
        mainTechnologies: ["데이터 가용성", "ZK 프로버", "SP1"],
        introduction: "Avail은 블록체인 확장성 문제 해결을 위한 모듈형 데이터 가용성(DA) 레이어로, 롤업 및 독립 체인에 안정적인 데이터 가용성 솔루션을 제공합니다. Succinct와의 협력을 통해 ZK 증명 기술을 데이터 가용성 레이어에 통합하여 효율성과 보안성을 강화하고 있습니다.",
        integrationDetails: [
          "ZK 데이터 가용성: SP1 기반의 ZK 프로버 통합을 통해, 모듈형 ZK 데이터 가용성(DA)을 지원합니다. 이를 통해 데이터 가용성 증명의 효율성과 신뢰성을 향상시켰습니다.",
          "데이터 샘플링 최적화: ZK 증명을 활용한 효율적인 데이터 샘플링 메커니즘을 구현하여, 최소한의 데이터로도 전체 데이터의 가용성을 검증할 수 있는 시스템을 개발했습니다."
        ],
        partnershipHighlights: [
          "데이터 가용성 증명의 계산 비용 70% 감소",
          "샘플링 기반 데이터 검증의 효율성 향상",
          "롤업 체인과의 통합을 위한 ZK 인터페이스 개발",
          "DA 레이어의 스케일링 능력 확장",
          "크로스체인 데이터 가용성 검증 표준화"
        ]
      },
      {
        name: "LayerZero",
        slug: "layerzero",
        description: "옴니체인 상호운용성 프로토콜",
        logo: "layerzero-zro-logo.svg",
        year: 2024,
        status: "구현 단계",
        logoColor: "#e67e22",
        mainTechnologies: ["vApps", "LayerZero", "SP1"],
        introduction: "LayerZero는 다양한 블록체인 네트워크 간의 메시지 전송을 가능하게 하는 옴니체인 상호운용성 프로토콜입니다. Succinct와의 협력을 통해 검증 가능한 애플리케이션(vApps) 개발을 위한 새로운 패러다임을 구축하고 있습니다.",
        integrationDetails: [
          "vApps 개발 패러다임: 검증 가능한 애플리케이션(vApps) 개발을 위한 새로운 개발 패러다임을 도입하여, 웹3 수준의 보안성과 투명성을 제공합니다.",
          "크로스체인 ZK 증명: LayerZero의 옴니체인 메시징 프로토콜에 ZK 증명을 통합하여, 다양한 블록체인 네트워크 간의 메시지 전송 과정에서의 보안성과 효율성을 향상시켰습니다."
        ],
        partnershipHighlights: [
          "크로스체인 트랜잭션의 신뢰성 향상",
          "vApps 개발 프레임워크 제공",
          "옴니체인 메시지 검증 비용 절감",
          "크로스체인 ZK 증명 표준화 기여",
          "블록체인 간 상태 동기화 효율성 향상"
        ]
      },
      {
        name: "BitVM",
        slug: "bitvm",
        description: "Bitcoin 확장성 솔루션",
        logo: "bitcoin-btc-logo.svg",
        year: 2024,
        status: "연구 단계",
        logoColor: "#f1c40f",
        mainTechnologies: ["Bitcoin", "ZK 증명", "SP1"],
        introduction: "BitVM은 Bitcoin의 프로그래머블성과 확장성을 향상시키기 위한 혁신적인 접근 방식으로, 복잡한 스마트 컨트랙트 기능을 Bitcoin에 도입하는 것을 목표로 합니다. Succinct와의 협력을 통해 Bitcoin에서의 ZK 증명 검증을 가능하게 하는 기술을 개발하고 있습니다.",
        integrationDetails: [
          "Bitcoin ZK 증명 검증: SP1을 활용하여 Bitcoin에서의 ZK 증명 검증을 가능하게 함으로써, Bitcoin의 프로그래머블성과 확장성을 향상시켰습니다.",
          "탈중앙화된 검증 시스템: Bitcoin 네트워크 내에서 복잡한 연산 결과를 검증할 수 있는 탈중앙화된 시스템을 구축하여, 기존 Bitcoin의 제한된 스크립팅 능력을 확장했습니다."
        ],
        partnershipHighlights: [
          "Bitcoin에서의 스마트 컨트랙트 기능 구현",
          "ZK 롤업을 통한 Bitcoin 트랜잭션 처리량 향상",
          "Bitcoin 기반 탈중앙화 애플리케이션 개발 가능성 확대",
          "SP1을 활용한 효율적인 ZK 증명 생성 및 검증",
          "Bitcoin 생태계의 기술적 확장성 향상"
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
      },
      {
        name: "SP1",
        icon: "cpu",
        description: "Succinct의 ZK 가상 머신으로, 범용 ZK 증명 생성을 위한 강력한 프레임워크입니다.",
        benefits: ["범용성", "고성능", "개발자 친화적"],
        documentationLink: "/tech/sp1"
      },
      {
        name: "OP Succinct",
        icon: "refresh-cw",
        description: "Optimism의 OP Stack과 Succinct의 기술을 결합한 ZK 롤업 솔루션입니다.",
        benefits: ["빠른 출금", "효율적인 검증", "OP Stack 호환성"],
        documentationLink: "/tech/op-succinct"
      },
      {
        name: "zkVM",
        icon: "server",
        description: "ZK 증명을 생성하는 가상 머신으로, 복잡한 연산에 대한 증명을 효율적으로 생성합니다.",
        benefits: ["범용 연산 증명", "효율적인 검증", "프로그래밍 가능성"],
        documentationLink: "/tech/zkvm"
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

export const storage = new DatabaseStorage();
