import { db } from "./db";
import { 
  projects, technologies, projectTechnologies,
  type InsertProject, type InsertTechnology, type InsertProjectTechnology
} from "@shared/schema";

async function seed() {
  console.log("🌱 시드 데이터 생성 시작...");

  // 기존 데이터 삭제
  await db.delete(projectTechnologies);
  await db.delete(technologies);
  await db.delete(projects);

  console.log("✓ 기존 데이터 삭제 완료");

  // 프로젝트 데이터 삽입
  const projectsData: InsertProject[] = [
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
    }
  ];

  const projectsInserted = await db.insert(projects).values(projectsData).returning();
  console.log(`✓ ${projectsInserted.length}개 프로젝트 데이터 삽입 완료`);

  // 기술 데이터 삽입
  const technologiesData: InsertTechnology[] = [
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

  const technologiesInserted = await db.insert(technologies).values(technologiesData).returning();
  console.log(`✓ ${technologiesInserted.length}개 기술 데이터 삽입 완료`);

  // 프로젝트-기술 관계 데이터 삽입
  const projectTechnologiesData: InsertProjectTechnology[] = [
    {
      projectId: 1, // Ethereum
      technologyId: 1, // ZK-SNARK
      details: "이더리움은 ZK-SNARK를 활용하여 L2 솔루션의 검증 효율성을 크게 향상시켰습니다."
    },
    {
      projectId: 2, // Polygon
      technologyId: 2, // Plonky2
      details: "폴리곤은 Plonky2를 도입하여 ZK 롤업의 증명 생성 속도를 10배 이상 향상시켰습니다."
    },
    {
      projectId: 3, // Optimism
      technologyId: 5, // OP Succinct
      details: "옵티미즘은 OP Succinct를 통해 옵티미스틱 롤업의 한계를 극복하는 혁신적인 접근법을 시도하고 있습니다."
    },
    {
      projectId: 4, // Galxe
      technologyId: 4, // SP1
      details: "Galxe는 SP1 zkVM을 활용한 투명한 추첨 시스템으로 Web3 마케팅의 신뢰성을 강화했습니다."
    },
    {
      projectId: 5, // Phala Network
      technologyId: 6, // zkVM
      details: "Phala Network는 zkVM을 활용하여 TEE 내에서 실행되는 AI 프로그램의 행동 검증에 성공했습니다."
    }
  ];

  const projectTechnologiesInserted = await db.insert(projectTechnologies).values(projectTechnologiesData).returning();
  console.log(`✓ ${projectTechnologiesInserted.length}개 프로젝트-기술 관계 데이터 삽입 완료`);

  console.log("🌱 시드 데이터 생성 완료!");
}

// 시드 데이터 생성 실행
seed()
  .catch((e) => {
    console.error("시드 데이터 생성 중 오류 발생:", e);
    process.exit(1);
  })
  .finally(() => {
    process.exit(0);
  });