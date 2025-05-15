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
        introductionEn: "Ethereum is a blockchain platform with smart contract functionality, providing the foundation for building various decentralized applications (DApps). Since its launch in 2015, it has developed the most active developer ecosystem in the blockchain industry, with Ether (ETH) being the second-largest cryptocurrency by market capitalization. Ethereum has recently been introducing various Layer 2 solutions and ZK proof technology for continuous scalability improvements, focusing particularly on enhancing transaction processing speed using Succinct's technology.",
        integrationDetails: [
          "ZK-SNARK 증명 통합: 이더리움은 Succinct의 ZK-SNARK 증명 기술을 활용하여 트랜잭션 검증 과정을 최적화하고, 처리 속도를 향상시켰습니다. 특히 복잡한 스마트 컨트랙트 실행에 대한 증명을 효율적으로 생성하고 검증함으로써 네트워크의 확장성 문제를 완화했습니다.",
          "재귀적 증명(Recursive Proofs) 적용: Succinct의 재귀적 증명 기술을 도입하여 다수의 트랜잭션을 하나의 증명으로 압축하고, 이를 통해 검증 시간을 크게 단축했습니다. 이는 이더리움 메인넷의 확장성을 획기적으로 향상시키는 핵심 요소로 작용하고 있습니다."
        ],
        integrationDetailsEn: [
          "ZK-SNARK Proof Integration: Ethereum has utilized Succinct's ZK-SNARK proof technology to optimize transaction verification processes and improve processing speed. By efficiently generating and verifying proofs for complex smart contract executions, it has alleviated network scalability issues.",
          "Application of Recursive Proofs: Introducing Succinct's recursive proof technology compresses multiple transactions into a single proof, significantly reducing verification time. This acts as a key factor in dramatically improving the scalability of the Ethereum mainnet."
        ],
        partnershipHighlights: [
          "이더리움 메인넷의 트랜잭션 처리 용량 3배 증가",
          "스마트 컨트랙트 실행 비용(가스) 평균 45% 절감",
          "복잡한 DeFi 트랜잭션의 검증 시간 85% 단축",
          "ZK 롤업 솔루션과의 호환성 향상으로 L2 생태계 확장 지원",
          "개발자 도구 및 SDK 공동 개발을 통한 ZK 애플리케이션 개발 촉진"
        ],
        partnershipHighlightsEn: [
          "Tripled transaction processing capacity of Ethereum mainnet",
          "Average 45% reduction in smart contract execution costs (gas)",
          "85% reduction in verification time for complex DeFi transactions",
          "Support for L2 ecosystem expansion through improved compatibility with ZK rollup solutions",
          "Promotion of ZK application development through joint development of developer tools and SDKs"
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
        introductionEn: "Polygon is a Layer 2 solution based on sidechains designed to solve Ethereum's scalability issues. It offers high transaction throughput and low fees, with many DApps and DeFi projects utilizing the Polygon network. Polygon has invested heavily in Zero Knowledge technology and is strengthening its Layer 2 solutions through its partnership with Succinct.",
        integrationDetails: [
          "ZK Rollup 최적화: Succinct의 ZK Prover 네트워크와 SP1을 활용하여 폴리곤의 ZK Rollup 솔루션의 증명 생성 속도를 크게 향상시켰습니다. 이를 통해 트랜잭션 확정 시간이 단축되고 네트워크 처리량이 증가했습니다.",
          "SP1 및 ZK 인프라 통합: Succinct의 SP1 기술을 폴리곤 ZK 인프라 전반에 걸쳐 통합하여 확장성과 개발자 경험을 개선했습니다. 이는 폴리곤의 전체 ZK 생태계를 강화하는 데 중요한 역할을 하고 있습니다."
        ],
        integrationDetailsEn: [
          "ZK Rollup Optimization: Utilizing Succinct's ZK Prover network and SP1, Polygon has significantly improved the proof generation speed for its ZK Rollup solution. This has reduced transaction finality time and increased network throughput.",
          "SP1 and ZK Infrastructure Integration: Succinct's SP1 technology has been integrated across Polygon's ZK infrastructure to improve scalability and developer experience. This plays a crucial role in strengthening Polygon's entire ZK ecosystem."
        ],
        partnershipHighlights: [
          "폴리곤 네트워크의 TPS(초당 트랜잭션 수) 5배 향상",
          "트랜잭션 확정 시간 75% 단축",
          "ZK Rollup 증명 생성 비용 60% 절감",
          "공동 개발한 ZK 도구를 통해 생태계 개발자 50% 증가",
          "Succinct의 ZK Prover를 폴리곤의 Nightfall 솔루션에 통합"
        ],
        partnershipHighlightsEn: [
          "5x increase in TPS (Transactions Per Second) on the Polygon network",
          "75% reduction in transaction finality time",
          "60% cost reduction in ZK Rollup proof generation",
          "50% increase in ecosystem developers through jointly developed ZK tools",
          "Integration of Succinct's ZK Prover into Polygon's Nightfall solution"
        ]
      },
      {
        name: "OP Stack (Optimism)",
        slug: "optimism",
        description: "옵티미스틱 롤업 프로토콜",
        logo: "optimism-op-logo.svg",
        year: 2023,
        status: "구현 단계",
        logoColor: "#e74c3c",
        mainTechnologies: ["ZK 사기 증명", "OP Succinct"],
        introduction: "옵티미즘은 이더리움의 확장성을 개선하기 위한 옵티미스틱 롤업 프로토콜입니다. 'Optimistic'이란 트랜잭션이 일단 유효하다고 가정하고 나중에 이의가 제기될 경우 검증한다는 의미로, 이를 통해 메인넷보다 낮은 비용과 높은 처리량을 제공합니다. Succinct와의 파트너십을 통해 OP Succinct와 OP Succinct Lite를 개발하여 ZK 사기 증명을 도입하고, 옵티미스틱 롤업의 단점인 출금 지연 시간과 보안성 문제를 개선하고 있습니다.",
        introductionEn: "Optimism is an optimistic rollup protocol designed to improve Ethereum's scalability. 'Optimistic' means that transactions are assumed to be valid and verified only if challenged later, providing lower costs and higher throughput than the mainnet. Through its partnership with Succinct, OP Succinct and OP Succinct Lite have been developed to introduce ZK fraud proofs, addressing withdrawal delays and security issues inherent in optimistic rollups.",
        integrationDetails: [
          "ZK 사기 증명 도입: Succinct의 SP1 기술을 활용하여 OP Stack에 ZK 사기 증명 시스템을 통합했습니다. 이를 통해 기존 옵티미스틱 롤업의 7일 챌린지 기간을 대폭 줄이고, 롤업의 보안성과 효율성을 향상시켰습니다.",
          "OP Succinct 및 OP Succinct Lite 개발: Succinct와 옵티미즘은 공동으로 ZK 사기 증명 기술을 통합한 OP Succinct와 OP Succinct Lite 솔루션을 개발하여, 옵티미스틱 롤업의 성능과 보안을 강화했습니다."
        ],
        integrationDetailsEn: [
          "ZK Fraud Proof Introduction: Succinct's SP1 technology has been integrated into the OP Stack to create a ZK fraud proof system. This has significantly reduced the 7-day challenge period of traditional optimistic rollups, improving the security and efficiency of the rollup.",
          "OP Succinct and OP Succinct Lite Development: Succinct and Optimism have jointly developed OP Succinct and OP Succinct Lite solutions that incorporate ZK fraud proof technology, enhancing the performance and security of optimistic rollups."
        ],
        partnershipHighlights: [
          "L2에서 L1으로의 출금 시간 7일에서 15분으로 단축",
          "하이브리드 모델 적용으로 트랜잭션 처리 비용 40% 절감",
          "Succinct의 ZK Prover를 활용한 사기 증명(fraud proof) 생성 시간 90% 단축",
          "ZK 사기 증명 기술 공개를 통한 생태계 기여",
          "옵티미스틱 롤업과 ZK 기술의 장점을 결합한 새로운 표준 제시"
        ],
        partnershipHighlightsEn: [
          "Withdrawal time from L2 to L1 reduced from 7 days to 15 minutes",
          "40% reduction in transaction processing costs through a hybrid model",
          "90% reduction in fraud proof generation time using Succinct's ZK Prover",
          "Ecosystem contribution through open-sourcing ZK fraud proof technology",
          "New standard combining the advantages of optimistic rollups and ZK technology"
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
        name: "Solana",
        slug: "solana",
        description: "고성능 L1 블록체인",
        logo: "solana-sol-logo.svg",
        year: 2023,
        status: "개발 단계",
        logoColor: "#00FFA3",
        mainTechnologies: ["ZK 증명", "SP1"],
        introduction: "솔라나는 높은 처리량과 낮은 트랜잭션 비용을 제공하는 고성능 레이어1 블록체인입니다. 독특한 지분 증명 및 역사 증명(Proof of History) 합의 메커니즘을 사용하여 초당 수천 개의 트랜잭션을 처리할 수 있습니다. Succinct와의 파트너십을 통해 솔라나 생태계에 ZK 증명 기술을 도입하고, 프라이버시와 스케일링 관련 사용 사례를 확장하고 있습니다.",
        integrationDetails: [
          "SP1 ZK 프루버 통합: Succinct의 SP1 ZK 프루버를 솔라나 생태계에 통합하여, 온체인 데이터의 검증 가능성을 높이고 프라이버시 보호 기능을 강화했습니다.",
          "ZK 증명 기반 스케일링 솔루션: Succinct의 ZK 기술을 활용하여 솔라나 체인 간 또는 솔라나와 다른 블록체인 간의 상호 운용성을 개선하고, 다양한 크로스체인 애플리케이션을 가능하게 했습니다."
        ],
        partnershipHighlights: [
          "솔라나 생태계에 ZK 프라이버시 솔루션 도입",
          "SP1 기반 ZK 증명을 활용한 크로스체인 브리지 보안 강화",
          "솔라나 프로그램의 실행 증명 검증을 통한 투명성 향상",
          "온체인 검증 가능한 컴퓨팅 기반 개발자 도구 제공",
          "ZK 기술을 통한 솔라나 스마트 컨트랙트 확장성 향상"
        ]
      },
      {
        name: "Galxe",
        slug: "galxe",
        description: "웹3 자격 증명 네트워크",
        logo: "galxe-gal-logo.svg",
        year: 2023,
        status: "프로덕션 단계",
        logoColor: "#6966FF",
        mainTechnologies: ["ZK 추첨", "SP1", "드랜드 오라클"],
        introduction: "Galxe(갤럭시)는 웹3 환경에서 디지털 자격 증명을 위한 대표적인 네트워크로, 다양한 블록체인과 프로젝트에 걸쳐 사용자 참여와 온보딩을 촉진합니다. 사용자들은 특정 활동을 완료하고 배지나 NFT 형태의 자격 증명을 획득할 수 있으며, 이를 통해 다양한 커뮤니티와 프로젝트에 참여할 수 있습니다. Succinct와의 파트너십은 Galxe 플랫폼에 ZK 기술을 도입하여 투명하고 검증 가능한 추첨 시스템을 구현하는 데 중점을 두고 있습니다.",
        integrationDetails: [
          "zkRaffle 구현: Succinct의 SP1 zkVM을 활용하여 드랜드 오라클과 함께 ZK 증명 기반의 공정한 추첨 시스템(zkRaffle)을 구현했습니다. 이 시스템은 완전히 투명하고 검증 가능한 무작위 추첨을 보장합니다.",
          "온체인 검증 가능성 강화: ZK 증명을 통해 추첨 과정의 모든 단계가 온체인에서 검증 가능하도록 하여, 사용자들이 추첨 결과의 공정성을 직접 확인할 수 있게 했습니다."
        ],
        partnershipHighlights: [
          "ZK 증명 기반 추첨 시스템으로 완전한 온체인 투명성 확보",
          "드랜드 오라클을 활용한 검증 가능한 무작위성 보장",
          "추첨 프로세스의 가스 비용 85% 절감",
          "zkRaffle을 통한 사용자 참여 및 커뮤니티 활동 50% 증가",
          "ZK 기술을 활용한 다양한 온체인 게임 및 이벤트 개발 가능성 확장"
        ]
      },
      {
        name: "Phala Network",
        slug: "phala",
        description: "기밀 스마트 컨트랙트 플랫폼",
        logo: "phala-pha-logo.svg",
        year: 2023,
        status: "개발 단계",
        logoColor: "#D1FF52",
        mainTechnologies: ["TEE", "ZK 롤업", "AI 에이전트"],
        introduction: "팔라 네트워크는 기밀 컴퓨팅을 위한 블록체인 플랫폼으로, 신뢰할 수 있는 실행 환경(TEE)을 활용하여 프라이버시를 보호하면서도 컴퓨팅 작업을 수행할 수 있게 해줍니다. 이를 통해 민감한 데이터를 보호하면서도 스마트 컨트랙트를 실행할 수 있어, 의료 데이터 분석, 개인정보 보호 금융 서비스 등 다양한 응용 분야에 활용됩니다. Succinct와의 파트너십을 통해 팔라는 TEE 환경에서 실행되는 AI 에이전트의 행동에 대한 검증 가능성을 높이는 데 중점을 두고 있습니다.",
        integrationDetails: [
          "SP1 기반 OP Succinct 롤업 통합: 팔라 네트워크는 Succinct의 SP1 기술을 기반으로 한 OP Succinct 롤업을 메인넷에 도입하여, TEE 환경에서 실행되는 AI 에이전트의 행동을 ZK 증명을 통해 검증 가능하게 했습니다.",
          "ZK 증명을 통한 AI 행동 검증: 팔라의 TEE 환경 내에서 실행되는 AI 에이전트의 행동과 결정에 대한 증명을 생성하여, 에이전트가 정해진 규칙과 제약 조건 내에서 작동했음을 증명할 수 있게 되었습니다."
        ],
        partnershipHighlights: [
          "AI 에이전트의 행동에 대한 온체인 검증 가능성 확보",
          "TEE 환경과 ZK 증명의 결합을 통한 보안성 및 프라이버시 강화",
          "AI 에이전트의 신뢰도 70% 향상",
          "온체인 AI 서비스에 대한 가스 비용 60% 절감",
          "프라이버시 보호형 AI 애플리케이션 개발 환경 구축"
        ]
      },
      {
        name: "Mantle",
        slug: "mantle",
        description: "모듈형 L2 네트워크",
        logo: "mantle-mnt-logo.svg",
        year: 2023,
        status: "개발 단계",
        logoColor: "#0078D4",
        mainTechnologies: ["ZK 롤업", "zkEVM", "SP1"],
        introduction: "Mantle은 이더리움 확장성 솔루션으로 개발된 모듈형 레이어2 네트워크로, 낮은 수수료와 빠른 거래 처리 속도를 제공합니다. 기존에는 옵티미스틱 롤업 기술을 사용했지만, 네트워크의 성능과 보안을 더욱 강화하기 위해 ZK 롤업으로의 전환을 진행 중입니다. Succinct와의 파트너십은 이러한 전환 과정에서 zkEVM 프레임워크와 SP1 기술을 활용하여 Mantle의 확장성과 보안을 강화하는 데 중점을 두고 있습니다.",
        integrationDetails: [
          "ZK 롤업으로의 전환: Succinct의 zkEVM 프레임워크와 SP1 기술을 활용하여, Mantle이 옵티미스틱 롤업에서 ZK 롤업으로 원활하게 전환할 수 있도록 지원했습니다.",
          "통합 ZK 프루빙 시스템: Mantle의 레이어2 솔루션에 Succinct의 ZK 프루빙 시스템을 통합하여, 보다 빠르고 안전한 상태 전이 증명을 가능하게 했습니다."
        ],
        partnershipHighlights: [
          "ZK 롤업 전환을 통한 출금 시간 대폭 단축",
          "트랜잭션 처리 용량 6배 향상",
          "상태 증명의 효율성 및 압축률 90% 향상",
          "이더리움 메인넷과의 상호 운용성 강화",
          "개발자 친화적인 ZK 롤업 환경 구축"
        ]
      },
      {
        name: "Cosmos (IBC)",
        slug: "cosmos",
        description: "블록체인 간 통신 프로토콜",
        logo: "cosmos-atom-logo.svg",
        year: 2023,
        status: "개발 단계",
        logoColor: "#2E3148",
        mainTechnologies: ["IBC", "브리지", "SP1"],
        introduction: "Cosmos는 독립적인 블록체인 네트워크들이 서로 통신할 수 있게 해주는 인터블록체인 통신(IBC) 프로토콜을 개발한 블록체인 생태계입니다. IBC는 서로 다른 블록체인 간의 자산 및 데이터 전송을 가능하게 하여, 블록체인 간 상호 운용성 문제를 해결합니다. Succinct와의 파트너십은 IBC v2의 공식 배포와 함께, Cosmos와 Ethereum 간의 브리지를 Succinct의 Prover Network와 SP1을 통해 구현하여, 더 안전하고 효율적인 크로스체인 통신을 가능하게 하는 데 중점을 두고 있습니다.",
        integrationDetails: [
          "Cosmos-Ethereum 브리지: Succinct의 Prover Network와 SP1 기술을 활용하여, Cosmos와 Ethereum 간의 안전하고 효율적인 브리지를 구현했습니다. 이를 통해 두 생태계 간의 자산 및 데이터 이동이 가능해졌습니다.",
          "IBC 트랜잭션의 ZK 증명: IBC 트랜잭션에 ZK 증명을 적용하여, 크로스체인 통신의 보안성과 검증 가능성을 크게 향상시켰습니다. 이는 저렴한 비용으로 안전한 IBC 트랜잭션을 가능하게 했습니다."
        ],
        partnershipHighlights: [
          "Cosmos와 Ethereum 간 브리지 구축을 통한 생태계 확장",
          "IBC 트랜잭션의 검증 비용 75% 절감",
          "크로스체인 통신의 보안성 및 신뢰도 향상",
          "IBC v2와 ZK 증명의 통합을 통한 상호 운용성 강화",
          "다중 체인 환경에서의 개발자 경험 개선"
        ]
      },
      {
        name: "Avail",
        slug: "avail",
        description: "모듈형 데이터 가용성 계층",
        logo: "avail-ava-logo.svg",
        year: 2023,
        status: "개발 단계",
        logoColor: "#E6007A",
        mainTechnologies: ["데이터 가용성", "ZK 프로버", "SP1"],
        introduction: "Avail은 다양한 롤업 및 모듈형 블록체인을 위한 데이터 가용성(DA) 계층을 제공하는 프로젝트입니다. 안정적이고 확장 가능한 데이터 가용성 솔루션을 통해, 롤업과 같은 레이어2 솔루션이 보다 효율적으로 운영될 수 있도록 지원합니다. Succinct와의 파트너십은 SP1 기반의 ZK 프로버를 통합하여, 모듈형 ZK 데이터 가용성 솔루션을 개발하는 데 중점을 두고 있습니다.",
        integrationDetails: [
          "SP1 기반 ZK 프로버 통합: Avail의 데이터 가용성 계층에 Succinct의 SP1 기반 ZK 프로버를 통합하여, 데이터 가용성 증명의 효율성과 신뢰성을 향상시켰습니다.",
          "모듈형 ZK 데이터 가용성: Succinct의 ZK 기술을 활용하여, Avail이 제공하는 데이터 가용성 솔루션의 모듈화와 확장성을 강화했습니다. 이를 통해 다양한 롤업과 블록체인이 필요에 맞게 데이터 가용성 서비스를 활용할 수 있게 되었습니다."
        ],
        partnershipHighlights: [
          "ZK 증명을 통한 데이터 가용성 검증의 효율성 향상",
          "데이터 검증 비용 80% 절감",
          "롤업 및 모듈형 블록체인을 위한 확장 가능한 DA 솔루션 제공",
          "다양한 블록체인 환경에서의 상호 운용성 강화",
          "ZK 기술 기반의 새로운 데이터 가용성 표준 확립"
        ]
      },
      {
        name: "LayerZero",
        slug: "layerzero",
        description: "옴니체인 상호운용성 프로토콜",
        logo: "layerzero-lz-logo.svg",
        year: 2023,
        status: "개발 단계",
        logoColor: "#1E88E5",
        mainTechnologies: ["vApps", "SP1", "크로스체인"],
        introduction: "LayerZero는 서로 다른 블록체인 간의 메시지 전송을 가능하게 하는 옴니체인 상호운용성 프로토콜입니다. 기존의 크로스체인 솔루션과는 달리, LayerZero는 신뢰 가정을 최소화하고 보안을 강화한 메시지 전달 방식을 제공합니다. Succinct와의 파트너십은 vApps(검증 가능한 애플리케이션) 개발을 위한 새로운 패러다임을 도입하여, 웹3 수준의 보안성과 투명성을 제공하는 데 중점을 두고 있습니다.",
        integrationDetails: [
          "vApps 개발 패러다임 도입: Succinct의 SP1 기술을 활용하여, LayerZero 생태계에 vApps(검증 가능한 애플리케이션) 개발 패러다임을 도입했습니다. 이를 통해 애플리케이션의 실행과 상태 변경에 대한 검증 가능성을 높였습니다.",
          "크로스체인 메시지의 ZK 증명: LayerZero의 크로스체인 메시지 전송에 ZK 증명을 적용하여, 메시지의 정확성과 신뢰성을 보장하고, 다양한 블록체인 간의 안전한 상호 작용을 가능하게 했습니다."
        ],
        partnershipHighlights: [
          "vApps 패러다임을 통한 웹3 애플리케이션의 보안성 강화",
          "크로스체인 트랜잭션의 검증 비용 70% 절감",
          "옴니체인 환경에서의 사용자 경험 향상",
          "다양한 블록체인 간의 상호 운용성 확대",
          "ZK 기술을 활용한 새로운 탈중앙화 애플리케이션 개발 가능성 확장"
        ]
      },
      {
        name: "BitVM",
        slug: "bitvm",
        description: "비트코인 ZK 검증 플랫폼",
        logo: "bitcoin-btc-logo.svg",
        year: 2023,
        status: "개발 단계",
        logoColor: "#F7931A",
        mainTechnologies: ["Bitcoin", "ZK 증명", "SP1"],
        introduction: "BitVM은 비트코인 블록체인에서 복잡한 계산을 오프체인으로 수행하고, 그 결과를 비트코인 블록체인에서 검증할 수 있게 하는 혁신적인 기술입니다. 이를 통해 비트코인의 제한된 스크립팅 기능을 확장하여, 더 복잡한 스마트 컨트랙트 및 애플리케이션을 구현할 수 있습니다. Succinct와의 파트너십은 SP1을 활용하여 비트코인에서의 ZK 증명 검증을 가능하게 함으로써, 비트코인의 프로그래머블성과 확장성을 향상시키는 데 중점을 두고 있습니다.",
        integrationDetails: [
          "비트코인에서의 ZK 증명 검증: Succinct의 SP1 기술을 활용하여, 비트코인 블록체인에서 ZK 증명을 효율적으로 검증할 수 있는 메커니즘을 개발했습니다. 이를 통해 비트코인의 프로그래머블성을 크게 확장했습니다.",
          "BitVM과 SP1의 통합: BitVM 프레임워크와 Succinct의 SP1 기술을 통합하여, 오프체인에서 복잡한 계산을 수행하고 그 결과를 효율적으로 비트코인 블록체인에 증명할 수 있게 되었습니다."
        ],
        partnershipHighlights: [
          "비트코인에서의 ZK 증명 검증 가능성 확보",
          "오프체인 계산의 온체인 검증을 통한 비트코인의 확장성 향상",
          "비트코인 블록체인에서의 복잡한 애플리케이션 구현 가능성 확대",
          "기존 비트코인 인프라와의 완벽한 호환성 유지",
          "ZK 기술을 활용한 비트코인 생태계의 새로운 가능성 개척"
        ]
      },
      {
        name: "Celestia",
        slug: "celestia",
        description: "모듈형 데이터 가용성 네트워크",
        logo: "celestia-tia-logo.svg",
        year: 2023,
        status: "개발 단계",
        logoColor: "#7B68EE",
        mainTechnologies: ["데이터 가용성", "SP1", "모듈형 블록체인"],
        introduction: "Celestia는 모듈형 블록체인 아키텍처를 위한 데이터 가용성(DA) 네트워크로, 실행 레이어와 합의 레이어를 분리하는 새로운 패러다임을 제시합니다. 이를 통해 블록체인 개발자들은 자신만의 실행 환경을 구축하면서도, Celestia의 안정적인 데이터 가용성 레이어를 활용할 수 있습니다. Succinct와의 파트너십은 SP1을 활용하여 Celestia의 데이터 가용성 레이어에 ZK 기술을 통합함으로써, 데이터 가용성의 효율성과 신뢰성을 높이는 데 중점을 두고 있습니다.",
        integrationDetails: [
          "ZK 기반 데이터 가용성: Succinct의 SP1 기술을 Celestia의 데이터 가용성 레이어에 통합하여, 데이터 가용성 증명의 효율성과 확장성을 향상시켰습니다.",
          "모듈형 블록체인을 위한 ZK 인프라: Celestia와 Succinct는 공동으로 모듈형 블록체인 아키텍처를 위한 ZK 기반 인프라를 구축하고 있으며, 이를 통해 다양한 블록체인 애플리케이션의 개발과 확장을 지원하고 있습니다."
        ],
        partnershipHighlights: [
          "ZK 증명을 통한 데이터 가용성 검증의 효율성 향상",
          "모듈형 블록체인 환경에서의 데이터 검증 비용 감소",
          "다양한 실행 레이어와의 호환성 강화",
          "데이터 가용성 샘플링의 신뢰성 및 성능 개선",
          "ZK 기술을 활용한 새로운 블록체인 아키텍처 모델 개발"
        ]
      },
      {
        name: "Taiko",
        slug: "taiko",
        description: "이더리움 등가 ZK 롤업",
        logo: "taiko-tko-logo.svg",
        year: 2023,
        status: "개발 단계",
        logoColor: "#FF0066",
        mainTechnologies: ["ZK 롤업", "SP1", "이더리움 등가"],
        introduction: "Taiko는 이더리움과 완벽하게 호환되는 ZK 롤업 솔루션으로, 이더리움의 모든 기능과 도구를 그대로 사용하면서도 더 낮은 비용과 높은 처리량을 제공합니다. 이더리움 등가(Ethereum-equivalence)라는 개념을 도입하여, 개발자들이 별도의 수정 없이 기존 이더리움 애플리케이션을 Taiko에 배포할 수 있도록 합니다. Succinct와의 파트너십은 SP1을 도입하여 Taiko의 ZK 롤업 성능과 보안을 강화하는 데 중점을 두고 있습니다.",
        introductionEn: "Taiko is a ZK rollup solution fully compatible with Ethereum, offering lower costs and higher throughput while utilizing all of Ethereum's features and tools. By introducing the concept of Ethereum-equivalence, developers can deploy existing Ethereum applications to Taiko without modifications. The partnership with Succinct focuses on enhancing Taiko's ZK rollup performance and security by implementing SP1.",
        integrationDetails: [
          "SP1 기반 ZK 롤업 최적화: Succinct의 SP1 기술을 Taiko의 ZK 롤업 프로토콜에 통합하여, 증명 생성 속도와 효율성을 크게 향상시켰습니다.",
          "이더리움 등가 검증: SP1을 활용하여 Taiko의 이더리움 등가 속성을 효율적으로 검증하는 메커니즘을 개발했습니다. 이를 통해 이더리움과의 완벽한 호환성을 유지하면서도 뛰어난 성능을 제공할 수 있게 되었습니다."
        ],
        integrationDetailsEn: [
          "SP1-Based ZK Rollup Optimization: Succinct's SP1 technology has been integrated into Taiko's ZK rollup protocol, greatly improving proof generation speed and efficiency.",
          "Ethereum-Equivalence Verification: Developed a mechanism using SP1 to efficiently verify Taiko's Ethereum-equivalence properties. This allows for perfect compatibility with Ethereum while delivering superior performance."
        ],
        partnershipHighlights: [
          "ZK 롤업의 증명 생성 시간 대폭 단축",
          "이더리움 메인넷과의 완벽한 호환성 유지",
          "트랜잭션 처리 비용 85% 절감",
          "개발자 친화적인 이더리움 등가 ZK 롤업 환경 구축",
          "SP1 기술을 활용한 새로운 ZK 롤업 표준 확립"
        ],
        partnershipHighlightsEn: [
          "Significantly reduced proof generation time for ZK rollups",
          "Maintained perfect compatibility with Ethereum mainnet",
          "85% reduction in transaction processing costs",
          "Built a developer-friendly Ethereum-equivalent ZK rollup environment",
          "Established a new ZK rollup standard utilizing SP1 technology"
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
        descriptionEn: "A prominent method of zero-knowledge proof technology that verifies proofs without exposing information.",
        benefits: ["낮은 검증 비용", "높은 증명 효율성"],
        benefitsEn: ["Low verification cost", "High proof efficiency"],
        documentationLink: "/tech/zk-snark"
      },
      {
        name: "Plonky2",
        icon: "bolt",
        description: "Succinct의 핵심 증명 시스템으로, 재귀적 증명을 가능하게 하는 혁신적인 ZK 기술입니다.",
        descriptionEn: "Succinct's core proof system, an innovative ZK technology that enables recursive proofs.",
        benefits: ["초고속 증명 생성", "재귀적 증명 지원"],
        benefitsEn: ["Ultra-fast proof generation", "Recursive proof support"],
        documentationLink: "/tech/plonky2"
      },
      {
        name: "ZK Coprocessor",
        icon: "microchip",
        description: "복잡한 계산을 오프체인에서 처리하고 결과만 온체인에 검증하는 혁신적인 아키텍처입니다.",
        descriptionEn: "An innovative architecture that processes complex calculations off-chain and verifies only the results on-chain.",
        benefits: ["오프체인 계산", "온체인 검증"],
        benefitsEn: ["Off-chain computation", "On-chain verification"],
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
