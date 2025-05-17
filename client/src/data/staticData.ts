// 프로젝트와 기술 데이터 정적 파일
import { Project, Technology, ProjectTechnology } from '@shared/schema';

// 프로젝트 데이터 (타입 호환성 확보)
export const projects: any[] = [
  {
    id: 1,
    name: "Galxe",
    slug: "galxe",
    logo: "https://cryptologos.cc/logos/galxe-gal-logo.png",
    logoUrl: "https://cryptologos.cc/logos/galxe-gal-logo.png", // 호환성을 위해 두 속성 모두 제공
    description: "Web3 자격 증명 데이터 네트워크",
    year: 2021,
    status: "active",
    logoColor: "#FD22AD",
    mainTechnologies: ["ZK Proofs", "Credential System"],
    website: "https://galxe.com",
    github: "https://github.com/galxe",
    introduction: "Galxe는 Web3 자격 증명 데이터 네트워크이자 최대 규모의 Web3 커뮤니티 플랫폼입니다. Succinct와 협력하여 온체인 크리덴셜 발급 및 검증을 위한 ZK 기술을 통합했습니다.",
    introductionEn: "Galxe is a Web3 credential data network and the largest Web3 community platform. They've integrated with Succinct to use ZK technology for on-chain credential issuance and verification.",
    integrationDetails: ["ZK 증명을 통한 온체인 크리덴셜 발급", "사용자 프라이버시 보호와 검증 가능한 크리덴셜 시스템 개발", "실시간 크리덴셜 검증 속도 향상"],
    integrationDetailsEn: ["On-chain credential issuance through ZK proofs", "Development of verifiable credential systems with user privacy protection", "Improved real-time credential verification speed"],
    partnershipHighlights: ["Web3 ID 및 크리덴셜을 위한 ZK 기반 시스템 구축", "Galxe의 크리덴셜 확장성 개선", "크리덴셜 발행 비용 절감 효과"],
    partnershipHighlightsEn: ["Building ZK-based systems for Web3 ID and credentials", "Improving Galxe's credential scalability", "Cost reduction effect for credential issuance"]
  },
  {
    id: 2,
    name: "Phala Network",
    slug: "phala-network",
    logo: "https://cryptologos.cc/logos/phala-network-pha-logo.png?v=024",
    logoUrl: "https://cryptologos.cc/logos/phala-network-pha-logo.png?v=024",
    website: "https://phala.network",
    github: "https://github.com/Phala-Network",
    introduction: "Phala Network은 프라이버시를 보호하는 클라우드 컴퓨팅 서비스를 제공하는 블록체인 프로젝트입니다. Succinct와 함께 오프체인 계산 검증을 위한 ZK 기술을 구현했습니다.",
    introductionEn: "Phala Network is a blockchain project providing privacy-preserving cloud computing services. It has implemented ZK technology with Succinct for off-chain computation verification.",
    integrationDetails: ["오프체인 계산의 온체인 검증", "TEE(Trusted Execution Environment)와 ZK 증명 통합", "프라이버시 보존 계산 검증"],
    integrationDetailsEn: ["On-chain verification of off-chain computations", "Integration of TEE (Trusted Execution Environment) with ZK proofs", "Privacy-preserving computation verification"],
    partnershipHighlights: ["계산 정확성과 프라이버시 동시 보장", "Phala의 Fat Contract 시스템과 ZK Prover 결합", "클라우드 컴퓨팅의 투명성 및 신뢰도 향상"],
    partnershipHighlightsEn: ["Simultaneous guarantee of computational accuracy and privacy", "Combination of Phala's Fat Contract system with ZK Prover", "Enhanced transparency and reliability of cloud computing"]
  },
  {
    id: 3,
    name: "Mantle",
    slug: "mantle",
    logoUrl: "https://cryptologos.cc/logos/mantle-mnt-logo.png",
    website: "https://mantle.xyz",
    github: "https://github.com/mantlenetworkio",
    introduction: "Mantle은 이더리움 L2 솔루션으로, 확장성과 사용자 경험을 개선하는 모듈식 블록체인입니다. Succinct와 협력하여 검증 가능한 상태 변환 및 롤업 기술을 적용했습니다.",
    introductionEn: "Mantle is an Ethereum L2 solution, a modular blockchain that improves scalability and user experience. They've partnered with Succinct for verifiable state transitions and rollup technology.",
    integrationDetails: ["롤업 상태 변환의 ZK 검증", "DA(Data Availability) 계층과 ZK 증명 연계", "최적화된 트랜잭션 처리 및 검증"],
    integrationDetailsEn: ["ZK verification of rollup state transitions", "Linking DA (Data Availability) layer with ZK proofs", "Optimized transaction processing and verification"],
    partnershipHighlights: ["ZK 기반 롤업 보안성 강화", "L2 솔루션의 처리량 향상", "최종성(Finality) 시간 단축"],
    partnershipHighlightsEn: ["Enhanced security of ZK-based rollups", "Improved throughput of L2 solution", "Reduced finality time"]
  },
  {
    id: 4,
    name: "Solana",
    slug: "solana",
    logoUrl: "https://cryptologos.cc/logos/solana-sol-logo.png",
    website: "https://solana.com",
    github: "https://github.com/solana-labs",
    introduction: "Solana는 높은 처리량과 낮은 수수료를 특징으로 하는 고성능 블록체인입니다. Succinct와 협력하여 크로스체인 검증 및 성능 최적화를 위한 ZK 기술을 도입했습니다.",
    introductionEn: "Solana is a high-performance blockchain characterized by high throughput and low fees. It has introduced ZK technology in collaboration with Succinct for cross-chain verification and performance optimization.",
    integrationDetails: ["병렬 트랜잭션 처리 검증", "Solana-Ethereum 크로스체인 검증 게이트웨이", "블록 헤더 검증 최적화"],
    integrationDetailsEn: ["Parallel transaction processing verification", "Solana-Ethereum cross-chain verification gateway", "Block header verification optimization"],
    partnershipHighlights: ["크로스체인 상호운용성 향상", "Solana 상태에 대한 이더리움 검증 가능성 제공", "복잡한 응용 프로그램의 보안 검증"],
    partnershipHighlightsEn: ["Improved cross-chain interoperability", "Providing Ethereum verifiability for Solana state", "Secure verification of complex applications"]
  },
  {
    id: 5,
    name: "OP Stack",
    slug: "op-stack",
    logo: "https://cryptologos.cc/logos/optimism-op-logo.png?v=024",
    logoUrl: "https://cryptologos.cc/logos/optimism-op-logo.png?v=024",
    website: "https://optimism.io",
    github: "https://github.com/ethereum-optimism",
    introduction: "OP Stack은 Optimism의 모듈식 롤업 프레임워크로, 이더리움의 확장성을 개선합니다. Succinct는 OP Stack과 협력하여 롤업 검증을 위한 ZK 기술을 구현했습니다.",
    introductionEn: "OP Stack is Optimism's modular rollup framework that improves Ethereum's scalability. Succinct has implemented ZK technology in collaboration with OP Stack for rollup verification.",
    integrationDetails: ["롤업 검증 시간 단축", "병합된 ZK 증명을 통한 롤업 최적화", "뱃치 처리된 트랜잭션의 효율적 검증"],
    integrationDetailsEn: ["Reduced rollup verification time", "Rollup optimization through merged ZK proofs", "Efficient verification of batched transactions"],
    partnershipHighlights: ["ZK 기술을 통한 OP Stack 보안성 강화", "롤업 비용 효율성 개선", "크로스 롤업 통신 신뢰성 향상"],
    partnershipHighlightsEn: ["Enhanced OP Stack security through ZK technology", "Improved rollup cost efficiency", "Enhanced reliability of cross-rollup communication"]
  },
  {
    id: 6,
    name: "Cosmos",
    slug: "cosmos",
    logoUrl: "https://cryptologos.cc/logos/cosmos-atom-logo.png",
    website: "https://cosmos.network",
    github: "https://github.com/cosmos",
    introduction: "Cosmos는 독립적인 블록체인 네트워크를 연결하는 인터블록체인 프로토콜입니다. Succinct와 함께 IBC(Inter-Blockchain Communication) 검증을 위한 ZK 시스템을 구축했습니다.",
    introductionEn: "Cosmos is an inter-blockchain protocol that connects independent blockchain networks. It has built a ZK system with Succinct for IBC (Inter-Blockchain Communication) verification.",
    integrationDetails: ["IBC 패킷의 ZK 검증", "크로스체인 상호운용성 향상", "체인 간 통신의 보안성 개선"],
    integrationDetailsEn: ["ZK verification of IBC packets", "Enhanced cross-chain interoperability", "Improved security of inter-chain communication"],
    partnershipHighlights: ["Cosmos와 Ethereum 에코시스템 연결 강화", "크로스체인 트랜잭션의 신뢰성 보장", "검증 지연 시간 최소화"],
    partnershipHighlightsEn: ["Strengthened connection between Cosmos and Ethereum ecosystems", "Ensuring reliability of cross-chain transactions", "Minimizing verification latency"]
  },
  {
    id: 7,
    name: "Avail",
    slug: "avail",
    logoUrl: "https://cryptologos.cc/logos/fetch-ai-fet-logo.png",
    website: "https://availproject.org",
    github: "https://github.com/availproject",
    introduction: "Avail은 모듈식 블록체인을 위한 데이터 가용성 레이어입니다. Succinct와 협력하여 데이터 가용성 검증을 위한 ZK 기술을 개발했습니다.",
    introductionEn: "Avail is a data availability layer for modular blockchains. It has developed ZK technology with Succinct for data availability verification.",
    integrationDetails: ["KZG 다항식 커밋먼트와 ZK 증명 통합", "샘플링 기반 데이터 가용성 검증 최적화", "경량 클라이언트를 위한 증명 시스템"],
    integrationDetailsEn: ["Integration of KZG polynomial commitments with ZK proofs", "Optimization of sampling-based data availability verification", "Proof system for lightweight clients"],
    partnershipHighlights: ["데이터 가용성 검증의 신뢰도 향상", "롤업 및 다양한 L2 솔루션과의 호환성 강화", "모듈식 블록체인 확장성 개선"],
    partnershipHighlightsEn: ["Improved reliability of data availability verification", "Enhanced compatibility with rollups and various L2 solutions", "Improved scalability of modular blockchains"]
  },
  {
    id: 8,
    name: "Polygon",
    slug: "polygon",
    logoUrl: "https://cryptologos.cc/logos/polygon-matic-logo.png",
    website: "https://polygon.technology",
    github: "https://github.com/0xPolygon",
    introduction: "Polygon은 다양한 확장성 솔루션을 제공하는 이더리움 레이어2 플랫폼입니다. Succinct와 협력하여 ZK 롤업 및 증명 시스템을 구현했습니다.",
    introductionEn: "Polygon is an Ethereum Layer 2 platform that provides various scalability solutions. It has implemented ZK rollups and proof systems in partnership with Succinct.",
    integrationDetails: ["Polygon zkEVM과의 증명 시스템 통합", "롤업 상태 변환의 효율적 검증", "zkProver 최적화"],
    integrationDetailsEn: ["Integration of proof systems with Polygon zkEVM", "Efficient verification of rollup state transitions", "zkProver optimization"],
    partnershipHighlights: ["ZK 기술을 통한 Polygon 에코시스템 확장", "개발자 친화적인 ZK 도구 개발", "다양한 ZK 솔루션 표준화"],
    partnershipHighlightsEn: ["Expansion of Polygon ecosystem through ZK technology", "Development of developer-friendly ZK tools", "Standardization of various ZK solutions"]
  },
  {
    id: 9,
    name: "LayerZero",
    slug: "layerzero",
    logoUrl: "https://cryptologos.cc/logos/stargate-finance-stg-logo.png",
    website: "https://layerzero.network",
    github: "https://github.com/LayerZero-Labs",
    introduction: "LayerZero는 크로스체인 상호운용성을 위한 옴니체인 프로토콜입니다. Succinct와 함께 다중 체인 간 안전한 메시지 전달을 검증하는 ZK 시스템을 개발했습니다.",
    introductionEn: "LayerZero is an omnichain protocol for cross-chain interoperability. It has developed a ZK system with Succinct that verifies secure message delivery between multiple chains.",
    integrationDetails: ["크로스체인 메시지의 ZK 검증", "울트라라이트 노드 검증 강화", "사기 증명 시스템 최적화"],
    integrationDetailsEn: ["ZK verification of cross-chain messages", "Enhanced ultralight node verification", "Optimization of fraud proof systems"],
    partnershipHighlights: ["크로스체인 보안성 향상", "메시지 전달의 신뢰성 및 효율성 증가", "옴니체인 생태계의 확장 지원"],
    partnershipHighlightsEn: ["Improved cross-chain security", "Increased reliability and efficiency of message delivery", "Support for omnichain ecosystem expansion"]
  },
  {
    id: 10,
    name: "BitVM",
    slug: "bitvm",
    logoUrl: "https://cryptologos.cc/logos/bitcoin-btc-logo.png",
    website: "https://bitvm.org",
    github: "https://github.com/bitvm",
    introduction: "BitVM은 비트코인 블록체인 위에 임의의 계산을 검증할 수 있는 새로운 컴퓨팅 패러다임입니다. Succinct와 협력하여 비트코인 블록체인 상의 ZK 증명 시스템을 구현했습니다.",
    introductionEn: "BitVM is a new computing paradigm that can verify arbitrary computations on the Bitcoin blockchain. It has implemented a ZK proof system on the Bitcoin blockchain in collaboration with Succinct.",
    integrationDetails: ["비트코인 스크립트를 활용한 ZK 증명 검증", "비트맵 증명 및 해싱 기법 최적화", "오라클 없는 검증 시스템 구현"],
    integrationDetailsEn: ["ZK proof verification using Bitcoin script", "Optimization of bitmap proofs and hashing techniques", "Implementation of oracle-free verification system"],
    partnershipHighlights: ["비트코인의 스마트 컨트랙트 기능 확장", "Succinct Prover를 통한 비트코인 응용 프로그램 검증", "비트코인 블록체인 기반 ZK 애플리케이션 생태계 구축"],
    partnershipHighlightsEn: ["Expansion of Bitcoin's smart contract capabilities", "Verification of Bitcoin applications through Succinct Prover", "Building a ZK application ecosystem based on Bitcoin blockchain"]
  },
  {
    id: 11,
    name: "Celestia",
    slug: "celestia",
    logoUrl: "https://cryptologos.cc/logos/celestia-tia-logo.png",
    website: "https://celestia.org",
    github: "https://github.com/celestiaorg",
    introduction: "Celestia는 모듈식 블록체인을 위한 데이터 가용성 레이어입니다. Succinct와 함께 데이터 가용성 샘플링을 위한 ZK 기술을 구현했습니다.",
    introductionEn: "Celestia is a data availability layer for modular blockchains. It has implemented ZK technology for data availability sampling with Succinct.",
    integrationDetails: ["데이터 가용성 샘플링의 ZK 증명", "경량 클라이언트를 위한 2D Reed-Solomon 인코딩 검증", "블록 헤더 증명 최적화"],
    integrationDetailsEn: ["ZK proofs of data availability sampling", "Verification of 2D Reed-Solomon encoding for lightweight clients", "Block header proof optimization"],
    partnershipHighlights: ["데이터 가용성 검증의 효율성 향상", "모듈식 블록체인 확장성 개선", "사용자 지정 롤업을 위한 신뢰성 있는 데이터 레이어 제공"],
    partnershipHighlightsEn: ["Improved efficiency of data availability verification", "Enhanced scalability of modular blockchains", "Providing a reliable data layer for custom rollups"]
  },
  {
    id: 12,
    name: "Taiko",
    slug: "taiko",
    logoUrl: "https://cryptologos.cc/logos/maker-mkr-logo.png",
    website: "https://taiko.xyz",
    github: "https://github.com/taikoxyz",
    introduction: "Taiko는 이더리움의 Type 1 ZK 롤업(ZK-EVM)으로, 이더리움과 완벽한 호환성을 제공합니다. Succinct와 협력하여 롤업 증명 시스템을 최적화했습니다.",
    introductionEn: "Taiko is Ethereum's Type 1 ZK rollup (ZK-EVM), providing perfect compatibility with Ethereum. It has optimized rollup proof systems in collaboration with Succinct.",
    integrationDetails: ["ZK-EVM 증명 시스템 최적화", "증명 생성 속도 향상", "증명 크기 최소화"],
    integrationDetailsEn: ["ZK-EVM proof system optimization", "Improved proof generation speed", "Minimization of proof size"],
    partnershipHighlights: ["완전한 EVM 호환성을 갖춘 ZK 롤업 개발", "개발자 경험 향상을 위한 도구 통합", "롤업 효율성 및 보안성 개선"],
    partnershipHighlightsEn: ["Development of ZK rollup with full EVM compatibility", "Tool integration for improved developer experience", "Enhanced rollup efficiency and security"]
  }
];

// 기술 스택 데이터
export const technologies: any[] = [
  {
    id: 1,
    name: "SP1 – Modular zkVM",
    category: "zkVM", // 정적 데이터 호환성 유지
    icon: "https://i.imgur.com/JxZm1DY.png",
    description: "SP1은 Succinct의 자체 개발한 모듈식 zkVM으로, Rust 기반으로 작성되었으며 다양한 proving backend와 호환됩니다.",
    descriptionEn: "SP1 is Succinct's self-developed modular zkVM, written in Rust and compatible with various proving backends.",
    iconUrl: "https://i.imgur.com/JxZm1DY.png",
    benefits: ["RISC-V ISA 호환성", "모듈식 설계로 프루빙 백엔드 선택 가능", "복잡한 웹 어셈블리 프로그램 실행 가능"],
    benefitsEn: ["RISC-V ISA compatibility", "Modular design allowing choice of proving backend", "Ability to run complex WebAssembly programs"]
  },
  {
    id: 2,
    name: "Real-Time Proving Layer",
    category: "Infrastructure",
    description: "실시간 증명 레이어는 Succinct의 'Proof-as-you-call' 구조를 구현한 인프라로, 실시간 ZK proof 생성을 가능하게 합니다.",
    descriptionEn: "The real-time proving layer is infrastructure implementing Succinct's 'Proof-as-you-call' structure, enabling real-time ZK proof generation.",
    iconUrl: "https://i.imgur.com/5CPTHdw.png",
    benefits: ["실시간 프루프 생성", "낮은 지연 시간의 증명 시스템", "확장 가능한 증명 인프라"],
    benefitsEn: ["Real-time proof generation", "Low-latency proof system", "Scalable proving infrastructure"]
  },
  {
    id: 3,
    name: "vApps (Verifiable Applications)",
    category: "Applications",
    description: "vApps는 기존 애플리케이션을 ZK 기반 verifiable app으로 변환하는 Succinct의 솔루션입니다.",
    descriptionEn: "vApps is Succinct's solution that transforms existing applications into ZK-based verifiable apps.",
    iconUrl: "https://i.imgur.com/4jn13Kw.png",
    benefits: ["기존 앱의 검증 가능성 추가", "크로스체인 데이터 검증", "사용자 경험 저하 없는 ZK 통합"],
    benefitsEn: ["Adding verifiability to existing apps", "Cross-chain data verification", "ZK integration without degrading user experience"]
  }
];

// 프로젝트-기술 연결 데이터
export const projectTechnologies: ProjectTechnology[] = [
  { id: 1, projectId: 1, technologyId: 1, details: "Galxe는 SP1 zkVM을 활용하여 크리덴셜 발급 및 검증 로직을 실행합니다." },
  { id: 2, projectId: 1, technologyId: 2, details: "실시간 증명 레이어를 통해 Galxe의 크리덴셜을 즉시 검증합니다." },
  { id: 3, projectId: 2, technologyId: 1, details: "Phala Network은 SP1 zkVM을 사용하여 오프체인 계산의 정확성을 검증합니다." },
  { id: 4, projectId: 2, technologyId: 3, details: "Phala의 Fat Contract를 vApp으로 변환하여 검증 가능성을 추가했습니다." },
  { id: 5, projectId: 3, technologyId: 2, details: "Mantle은 실시간 증명 레이어를 활용하여 롤업 상태 변환을 검증합니다." },
  { id: 6, projectId: 3, technologyId: 3, details: "Mantle의 애플리케이션을 vApp으로 변환하여 크로스체인 검증을 가능하게 했습니다." },
  { id: 7, projectId: 4, technologyId: 1, details: "Solana는 SP1 zkVM을 사용하여 병렬 트랜잭션 처리의 정확성을 검증합니다." },
  { id: 8, projectId: 4, technologyId: 2, details: "실시간 증명 레이어를 통해 Solana 블록 헤더의 빠른 검증이 가능합니다." },
  { id: 9, projectId: 5, technologyId: 1, details: "OP Stack은 SP1 zkVM을 활용하여 롤업 검증을 수행합니다." },
  { id: 10, projectId: 5, technologyId: 2, details: "실시간 증명 레이어를 통해 롤업 검증 시간을 단축했습니다." },
  { id: 11, projectId: 6, technologyId: 2, details: "Cosmos는 실시간 증명 레이어를 사용하여 IBC 패킷 검증을 수행합니다." },
  { id: 12, projectId: 6, technologyId: 3, details: "Cosmos의 애플리케이션을 vApp으로 변환하여 크로스체인 검증을 강화했습니다." },
  { id: 13, projectId: 7, technologyId: 1, details: "Avail은 SP1 zkVM을 사용하여 데이터 가용성 샘플링의 정확성을 검증합니다." },
  { id: 14, projectId: 7, technologyId: 2, details: "실시간 증명 레이어를 통해 경량 클라이언트를 위한 효율적인 증명을 생성합니다." },
  { id: 15, projectId: 8, technologyId: 1, details: "Polygon은 SP1 zkVM을 활용하여 zkEVM과 통합된 증명 시스템을 구현했습니다." },
  { id: 16, projectId: 8, technologyId: 3, details: "Polygon의 애플리케이션을 vApp으로 변환하여 개발자 친화적인 환경을 제공합니다." },
  { id: 17, projectId: 9, technologyId: 2, details: "LayerZero는 실시간 증명 레이어를 사용하여 크로스체인 메시지의 검증을 수행합니다." },
  { id: 18, projectId: 9, technologyId: 3, details: "LayerZero의 애플리케이션을 vApp으로 변환하여 옴니체인 검증을 강화했습니다." },
  { id: 19, projectId: 10, technologyId: 1, details: "BitVM은 SP1 zkVM을 활용하여 비트코인 블록체인 상의 임의 계산을 검증합니다." },
  { id: 20, projectId: 10, technologyId: 3, details: "BitVM을 vApp 형태로 구현하여 비트코인의 스마트 컨트랙트 기능을 확장했습니다." },
  { id: 21, projectId: 11, technologyId: 1, details: "Celestia는 SP1 zkVM을 사용하여 데이터 가용성 샘플링의 정확성을 검증합니다." },
  { id: 22, projectId: 11, technologyId: 2, details: "실시간 증명 레이어를 통해 경량 클라이언트를 위한 효율적인 증명을 생성합니다." },
  { id: 23, projectId: 12, technologyId: 1, details: "Taiko는 SP1 zkVM을 활용하여 ZK-EVM 증명 시스템을 최적화했습니다." },
  { id: 24, projectId: 12, technologyId: 2, details: "실시간 증명 레이어를 통해 롤업 증명 생성 속도를 향상시켰습니다." }
];