import React, { useState } from 'react';
import { SEO } from '../components/SEO';
import './KnowledgeCenter.css';

const TOPICS = [
  {
    icon: 'fas fa-network-wired',
    label: 'Networking Fundamentals',
    desc: 'Core concepts and principles of computer networking.',
    content: {
      intro: 'Networking fundamentals cover the essential concepts that form the backbone of all modern communication systems. Understanding these principles is critical for anyone designing, installing, or maintaining structured cabling and network infrastructure.',
      sections: [
        { title: 'OSI Model', text: 'The Open Systems Interconnection (OSI) model defines seven layers of network communication: Physical, Data Link, Network, Transport, Session, Presentation, and Application. Structured cabling operates primarily at Layer 1 (Physical), ensuring reliable signal transmission across copper and fiber media.' },
        { title: 'TCP/IP Protocol Suite', text: 'TCP/IP is the foundational protocol suite of the internet and enterprise networks. It includes IP addressing, routing, and transport protocols (TCP/UDP). A properly designed cabling infrastructure supports TCP/IP communication at speeds from 100Mbps to 400Gbps.' },
        { title: 'IP Addressing & Subnetting', text: 'IP addresses uniquely identify devices on a network. IPv4 uses 32-bit addresses (e.g., 192.168.1.1) while IPv6 uses 128-bit addresses. Subnetting divides networks into smaller segments for better performance and security.' },
        { title: 'Switching & Routing', text: 'Switches operate at Layer 2, forwarding frames based on MAC addresses. Routers operate at Layer 3, directing packets based on IP addresses. Both rely on structured cabling for physical connectivity.' },
        { title: 'VLANs', text: 'Virtual LANs logically segment a physical network into separate broadcast domains. VLANs improve security, reduce congestion, and simplify management — all dependent on well-organized cabling infrastructure.' },
      ]
    },
    subtopics: ['OSI Model & TCP/IP', 'IP Addressing & Subnetting', 'Switching vs Routing', 'VLAN Basics', 'Network Topologies']
  },
  {
    icon: 'fas fa-plug',
    label: 'Copper Cabling',
    desc: 'Everything about copper cable types, specifications, and usage.',
    content: {
      intro: 'Copper cabling is the most widely used medium for structured cabling in LANs and enterprise networks. ADORN offers a complete range of Cat5e, Cat6, Cat6A, and Cat8 copper cables engineered for performance, durability, and compliance with international standards.',
      sections: [
        { title: 'CCA vs Bare Copper', text: 'CCA (Copper Clad Aluminum) uses an aluminum core with copper coating — lighter and cheaper but lower performance and not approved by TIA/EIA for permanent links. Bare copper provides full conductivity, better signal integrity, and meets all standards for structured cabling installations.' },
        { title: 'UTP vs FTP vs STP', text: 'UTP (Unshielded Twisted Pair) is the most common cable type for office and commercial installations. FTP (Foiled Twisted Pair) adds an overall foil shield for EMI protection. STP (Shielded Twisted Pair) includes individual pair shielding for maximum noise immunity in industrial environments.' },
        { title: 'Solid vs Stranded Conductor', text: 'Solid copper conductors offer better electrical performance and are used in permanent link installations (wall to patch panel). Stranded conductors are more flexible and used in patch cables where repeated bending occurs.' },
        { title: 'AWG (American Wire Gauge)', text: 'AWG measures conductor thickness. Lower AWG = thicker wire = better performance. Cat6 typically uses 23AWG, Cat6A uses 23AWG or 22AWG. Thicker conductors reduce attenuation and support higher PoE power delivery.' },
        { title: 'Cat Ratings Comparison', text: 'Cat5e supports up to 1Gbps (100MHz), Cat6 supports 1Gbps with better headroom (250MHz), Cat6A supports 10Gbps (500MHz), and Cat8 supports 25/40Gbps (2000MHz) for data centre applications. Choose based on your current and future bandwidth requirements.' },
      ]
    },
    subtopics: ['CCA vs Bare Copper', 'UTP vs FTP vs STP', 'Solid vs Stranded', 'AWG Explained', 'Cat5e vs Cat6 vs Cat6A vs Cat8']
  },
  {
    icon: 'fas fa-bolt',
    label: 'Fiber Optics',
    desc: 'Fiber optic technology, types, and connectivity solutions.',
    content: {
      intro: 'Fiber optic cabling delivers the highest bandwidth over the longest distances. ADORN provides single-mode and multi-mode fiber solutions for data centres, campus networks, and telecom infrastructure.',
      sections: [
        { title: 'Single-Mode vs Multi-Mode', text: 'Single-mode fiber (OS2) uses a 9µm core for long-distance transmission up to 100km+. Multi-mode fiber (OM3/OM4/OM5) uses a 50µm core for shorter distances up to 500m at 100Gbps. Single-mode is ideal for campus and telecom; multi-mode for data centre and enterprise backbone.' },
        { title: 'Fiber Types', text: 'OM3 (850nm, 300m at 10G), OM4 (850nm, 400m at 100G), OM5 (850-953nm, Wideband for SWDM), OS2 (1310/1550nm, 200km). Each type is optimized for specific speed and distance requirements.' },
        { title: 'Fiber Connectivity', text: 'Common connectors include LC (most popular), SC (robust), ST (bayonet), and MPO/MTP (multi-fiber for high-density). ADORN provides pre-terminated fiber assemblies, pigtails, patch cords, and adapter panels.' },
        { title: 'Fiber Splicing', text: 'Fusion splicing creates a permanent, low-loss connection between fibers. Mechanical splicing is faster but has higher loss. ADORN recommends fusion splicing for permanent links and mechanical for emergency repairs.' },
        { title: 'Link Budget', text: 'Every fiber link has a power budget — the allowable signal loss between transmitter and receiver. Budget includes connector losses (~0.3dB each), splice losses (~0.1dB each), and cable attenuation. Always calculate budget before installation.' },
      ]
    },
    subtopics: ['Single-Mode vs Multi-Mode', 'Fiber Types', 'Fiber Connectivity', 'Fiber Splicing Techniques', 'Link Budget Calculation']
  },
  {
    icon: 'fas fa-charging-station',
    label: 'PoE',
    desc: 'Power over Ethernet standards, applications, and design.',
    content: {
      intro: 'Power over Ethernet (PoE) delivers both data and electrical power over a single Ethernet cable, eliminating the need for separate power wiring. ADORN PoE-compatible cabling and infrastructure support modern smart buildings, surveillance, and IoT deployments.',
      sections: [
        { title: 'How PoE Works', text: 'PoE uses spare wire pairs or signal pairs to deliver DC power alongside data. A PoE-capable switch or injector sends power, and a PoE-compatible device (camera, AP, phone) receives it. The cabling must meet power and heat dissipation requirements.' },
        { title: 'PoE Standards', text: '802.3af (PoE) — 15.4W per port. 802.3at (PoE+) — 30W per port. 802.3bt (PoE++) Type 3 — 60W, Type 4 — 90W per port. Higher power standards require thicker conductors (23AWG or lower) and careful thermal management.' },
        { title: 'PoE Applications', text: 'IP cameras, wireless access points, VoIP phones, IP speakers, access control readers, LED lighting, digital signage, and IoT sensors. PoE simplifies installation and reduces cabling costs for all these devices.' },
        { title: 'Cable Requirements', text: 'For PoE+ (30W), use Cat5e or higher with 23AWG solid conductors. For PoE++ (60-90W), Cat6A is recommended. Avoid CCA cables — they cannot handle PoE current safely. Proper cable bundling reduces heat buildup.' },
        { title: 'PoE Budget Planning', text: 'Calculate total PoE power needed: sum of all device power requirements. Ensure switch PoE budget exceeds total by 20% for headroom. Consider cable length — voltage drop increases over longer runs.' },
      ]
    },
    subtopics: ['PoE Fundamentals', 'PoE Standards (802.3af/at/bt)', 'PoE Applications', 'Cable Requirements for PoE', 'PoE Budget Planning']
  },
  {
    icon: 'fas fa-server',
    label: 'Network Cabinets',
    desc: 'Rack and cabinet solutions for organized infrastructure.',
    content: {
      intro: 'Network cabinets and racks are the physical foundation of structured cabling systems. They house switches, servers, patch panels, and cable management — keeping infrastructure organized, secure, and accessible.',
      sections: [
        { title: 'Rack Units & Sizes', text: '1U = 1.75 inches (44.45mm). Common sizes: 6U/9U (wall-mount), 12U/18U (small office), 22U/27U (medium deployment), 42U/47U (data centre). Choose based on current equipment + 30% expansion capacity.' },
        { title: 'Wall-Mount vs Floor-Standing', text: 'Wall-mount cabinets suit small installations (IDF, floor distribution). Floor-standing cabinets handle large deployments with heavy equipment. Consider weight capacity, access requirements, and cooling needs.' },
        { title: 'Cooling & Ventilation', text: 'Equipment generates heat. Cabinets need proper airflow — perforated doors, side panels, and internal fans. For high-density deployments, consider active cooling (in-row coolers) and hot/cold aisle containment.' },
        { title: 'Cable Management', text: 'Vertical and horizontal cable managers keep cables organized and prevent damage. Use brush strips, D-rings, and cable guides. Proper management improves airflow, reduces maintenance time, and prevents accidental disconnection.' },
        { title: 'Rack Accessories', text: 'Shelves, PDUs, blanking panels, fan trays, grounding kits, and lockable doors. Each accessory serves a specific purpose in maintaining organized, secure, and efficient rack infrastructure.' },
      ]
    },
    subtopics: ['Rack Sizes & Units', 'Wall-Mount vs Floor-Standing', 'Cooling & Ventilation', 'Cable Management', 'Rack Accessories']
  },
  {
    icon: 'fas fa-tools',
    label: 'Installation',
    desc: 'Best practices for structured cabling and rack installation.',
    content: {
      intro: 'Proper installation is critical to achieving the performance and reliability your cabling infrastructure is designed to deliver. ADORN follows TIA/ISO standards for every installation.',
      sections: [
        { title: 'Cable Pulling', text: 'Never exceed the maximum pulling tension specified for the cable type. Use lubricants for conduit pulls. Maintain minimum bend radius (typically 4x cable diameter for copper, 10x for fiber). Avoid kinking, crushing, or twisting cables during installation.' },
        { title: 'Cable Pathway Design', text: 'Plan cable routes before installation. Use cable trays, ladders, conduit, and J-hooks. Separate power and data cables by minimum 12 inches (300mm) to prevent EMI. Label every cable at both ends.' },
        { title: 'Patch Panel Termination', text: 'Follow T568A or T568B wiring standard consistently throughout the project. Punch down each pair firmly using the correct tool. Test each termination for continuity before moving to the next.' },
        { title: 'Fiber Installation', text: 'Handle fiber with care — never exceed minimum bend radius (typically 30mm for patch cords, 150mm for trunk cables). Use proper pulling eye connectors. Protect exposed fiber ends with dust caps. Keep connectors clean.' },
        { title: 'Grounding & Bonding', text: 'All cabinets, racks, and cable trays must be properly grounded to the building grounding system. Use green/yellow ground wires. Bonding prevents electrical shock and protects equipment from static discharge.' },
      ]
    },
    subtopics: ['Cable Pulling Best Practices', 'Cable Pathway Design', 'Patch Panel Termination', 'Fiber Installation', 'Grounding & Bonding']
  },
  {
    icon: 'fas fa-check-double',
    label: 'Testing & Certification',
    desc: 'Validate your infrastructure with proper testing methods.',
    content: {
      intro: 'Testing and certification verify that your installed cabling meets performance standards and specifications. Every ADORN installation includes comprehensive test documentation.',
      sections: [
        { title: 'Copper Testing', text: 'Every copper link must be tested for: wiremap, length, insertion loss, NEXT, PS NEXT, ACR-F, PS ACR-F, return loss, and delay. Use a certified tester (Fluke DSX-5000) with appropriate adapters for the cable category being tested.' },
        { title: 'Fiber Testing', text: 'Test fiber links for insertion loss (using optical power meter and light source), OTDR trace (for event mapping), and connector endface inspection (using fiber microscope). All measurements must be within the link budget.' },
        { title: 'Fluke Testing', text: 'Fluke DSX-5000/8000 testers provide industry-standard certification. Configure test limits based on the cable category and standard (TIA or ISO). Save results and generate PDF test reports for project documentation.' },
        { title: 'Test Results & Reports', text: 'PASS/FAIL results indicate whether each link meets the selected standard. Generate test reports with: cable ID, date, tester serial, test limit, results for each parameter, and overall pass/fail. Provide reports to the project consultant for approval.' },
        { title: 'Troubleshooting Failures', text: 'Common failures: NEXT (check termination quality), return loss (check cable damage or impedance mismatch), length (check for excess cable or NVP setting), wiremap (check for crossed pairs or split pairs).' },
      ]
    },
    subtopics: ['Copper Testing Parameters', 'Fiber Testing Methods', 'Fluke DSX Configuration', 'Test Report Generation', 'Troubleshooting Failures']
  },
  {
    icon: 'fas fa-balance-scale',
    label: 'Standards & Compliance',
    desc: 'Industry standards governing structured cabling and network infrastructure.',
    content: {
      intro: 'Structured cabling is governed by international standards that define performance requirements, installation practices, and testing procedures. ADORN products and installations comply with all major standards.',
      sections: [
        { title: 'TIA-568', text: 'The TIA-568 standard defines structured cabling requirements for commercial buildings. TIA-568.2-D covers balanced twisted-pair cabling, TIA-568.3-D covers fiber optic cabling. Current revision supports up to Cat8 (2000MHz) and 40GBase-T.' },
        { title: 'TIA-942', text: 'TIA-942 defines data centre infrastructure standards including cabling, pathways, spacing, and redundancy. Covers topology, copper and fiber media, and recommends structured approaches for reliability and scalability.' },
        { title: 'ISO/IEC 11801', text: 'The international standard for generic cabling systems. Defines classes (D through I) corresponding to cable categories. ISO standards are used globally and often exceed TIA requirements for performance.' },
        { title: 'Cabling Classes', text: 'Class D (Cat5e, 100MHz), Class E (Cat6, 250MHz), Class EA (Cat6A, 500MHz), Class F (Cat7, 600MHz), Class FA (Cat7A, 1000MHz), Class I (Cat8, 2000MHz). Higher classes support faster speeds and greater bandwidth.' },
        { title: 'Regional Compliance', text: 'Different regions may have additional requirements (SASO for Saudi Arabia, ETSI for Europe, etc.). Always verify local codes and regulations before specifying or installing cabling systems.' },
      ]
    },
    subtopics: ['TIA-568 Standards', 'TIA-942 Data Centre', 'ISO/IEC 11801', 'Cabling Classes & Categories', 'Regional Compliance']
  },
  {
    icon: 'fas fa-book',
    label: 'Technical Guides',
    desc: 'Step-by-step guides for planning, designing, and deploying network infrastructure.',
    content: {
      intro: 'ADORN Technical Guides provide practical, step-by-step instructions for common infrastructure projects. Each guide covers planning, material selection, installation, and testing.',
      sections: [
        { title: 'Data Centre Design', text: 'Key considerations: tier classification (I-IV), raised floor vs slab, hot/cold aisle containment, cable density planning, redundancy paths, and power/cooling infrastructure. ADORN provides complete cabling solutions for Tier II through Tier IV data centres.' },
        { title: 'Office Cabling Guide', text: 'Plan for: work area outlets (1-2 per desk), horizontal cable runs (<90m), IDF/MDF placement, cable tray routing, and future expansion. Use Cat6A for new installations to support 10GBase-T and PoE++ requirements.' },
        { title: 'Campus Network Design', text: 'Inter-building connectivity using single-mode fiber backbone. In-building distribution using multi-mode fiber or copper. Consider pathway redundancy, splice enclosures, and outdoor-rated cable for direct burial or aerial installation.' },
        { title: 'PoE Network Planning', text: 'Calculate total PoE load, select appropriate switch PoE budget, plan cable bundle sizes for thermal management, and ensure proper cable category for the PoE standard being deployed.' },
      ]
    },
    subtopics: ['Data Centre Design Guide', 'Office Cabling Guide', 'Campus Network Design', 'PoE Network Planning']
  },
  {
    icon: 'fas fa-balance-scale-right',
    label: 'Comparisons',
    desc: 'Side-by-side comparisons to help you choose the right products.',
    content: {
      intro: 'Choosing the right cable, connector, or component can be confusing. Our comparison guides break down the key differences so you can make informed decisions for your project.',
      sections: [
        { title: 'Cat6 vs Cat6A', text: 'Cat6 supports 1Gbps up to 100m (250MHz). Cat6A supports 10Gbps up to 100m (500MHz). Cat6A has better alien crosstalk performance. For new installations, Cat6A is recommended for future-proofing. Cat6 is suitable for offices with lower bandwidth needs.' },
        { title: 'Single-Mode vs Multi-Mode Fiber', text: 'Single-mode (OS2): longer distance (up to 200km), smaller core (9µm), higher cost transceivers. Multi-mode (OM4): shorter distance (up to 550m at 100G), larger core (50µm), lower cost transceivers. Use single-mode for campus/telecom, multi-mode for data centres.' },
        { title: 'UTP vs STP', text: 'UTP is simpler, cheaper, and easier to install. STP provides better EMI protection for industrial or high-interference environments. STP requires proper grounding. Most commercial installations use UTP.' },
        { title: 'Copper vs Fiber', text: 'Copper: cheaper, easier to terminate, supports PoE, limited to 100m. Fiber: higher bandwidth, longer distances, immune to EMI, no PoE. Use copper for horizontal (work area), fiber for backbone and long runs.' },
      ]
    },
    subtopics: ['Cat6 vs Cat6A', 'Single-Mode vs Multi-Mode', 'UTP vs STP', 'Copper vs Fiber']
  },
  {
    icon: 'fas fa-question-circle',
    label: 'FAQs',
    desc: 'Answers to the most commonly asked technical questions.',
    content: {
      intro: 'Here are answers to the most frequently asked questions about structured cabling, fiber optics, PoE, and network infrastructure.',
      sections: [
        { title: 'What is the maximum cable length for Cat6?', text: 'The maximum permanent link length for Cat6 (and all copper Ethernet cables) is 90 meters, with 10 meters allowed for patch cords, for a total channel length of 100 meters. For 10Gbps, Cat6A is recommended for the full 100m channel.' },
        { title: 'When should I use fiber instead of copper?', text: 'Use fiber when: distance exceeds 100m, you need bandwidth above 10Gbps, the environment has high EMI, or you need electrical isolation between buildings. Copper is better for short runs, PoE applications, and cost-sensitive projects.' },
        { title: 'How many devices can PoE support?', text: 'It depends on the switch PoE budget. A 48-port PoE+ switch with 740W budget can power 24 devices at 30W each. Always calculate total power needs and add 20% headroom. Use PoE++ (802.3bt) for high-power devices like PTZ cameras.' },
        { title: 'What rack size do I need?', text: 'Count your equipment in U units: switches (1U), patch panels (1U), servers (1-4U). Add 30% for expansion. Most offices need 12U-22U wall-mount. Data centres use 42U floor-standing cabinets.' },
        { title: 'Do I need to re-certify after cable repairs?', text: 'Yes. Any cable repair, re-termination, or modification requires re-testing and re-certification to ensure the link still meets the required standard. Never assume a repaired link performs the same as the original.' },
      ]
    },
    subtopics: ['Max Cable Length for Cat6?', 'When to Use Fiber?', 'PoE Device Limits?', 'Rack Size Guide', 'Re-certification After Repair?']
  },
  {
    icon: 'fas fa-project-diagram',
    label: 'Case Studies',
    desc: 'Real-world project examples and deployment stories.',
    content: {
      intro: 'Explore how ADORN solutions have been deployed in real-world projects across the UAE and GCC. Each case study highlights the challenge, solution, and results.',
      sections: [
        { title: 'Enterprise Office Network', text: 'A 12-floor commercial tower in Dubai Marina required full structured cabling across 480 workstations. ADORN Cat6A horizontal cabling with fiber backbone. 42U cabinets per floor with centralized MDF. Result: 100% test pass rate, project delivered on schedule.' },
        { title: 'Data Centre Migration', text: 'A financial institution migrating from a Tier II to Tier III data centre needed Cat8 copper and single-mode fiber for 25/40G connectivity. ADORN provided pre-terminated MPO trunk assemblies and high-density patch panels. Migration completed with zero downtime.' },
        { title: 'Smart Building Deployment', text: 'A smart hotel in Abu Dhabi deployed ADORN PoE cabling for 2,400+ IoT devices including smart lighting, HVAC sensors, IP cameras, and guest room access control. Cat6A PoE++ cabling throughout with centralized management.' },
        { title: 'Campus Fiber Network', text: 'A university campus connected 15 buildings with single-mode fiber backbone using ADORN OS2 outdoor-rated cables. MPO/MTP high-density connectivity in the data centre. OM4 multi-mode for intra-building distribution. Network supports 100G uplinks.' },
      ]
    },
    subtopics: ['Enterprise Office Network', 'Data Centre Migration', 'Smart Building Deployment', 'Campus Fiber Network']
  },
];

export default function KnowledgeCenter() {
  const [active, setActive] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [search, setSearch] = useState('');

  const filtered = TOPICS.filter(t => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return t.label.toLowerCase().includes(q) ||
      t.desc.toLowerCase().includes(q) ||
      (t.subtopics && t.subtopics.some(s => s.toLowerCase().includes(q)));
  });

  const current = filtered[active] || filtered[0];

  return (
    <>
      <SEO
        title="Knowledge Center"
        description="Learn about structured cabling, fiber optics, PoE, network cabinets, installation, testing, and industry standards from the ADORN Knowledge Center."
        url="/knowledge-center"
      />

      <section className="kc-hero">
        <div className="container">
          <span className="kc-badge">Learn & Grow</span>
          <h1>Knowledge <span className="hl">Center</span></h1>
          <p>Your technical resource hub for networking, structured cabling, fiber optics, and infrastructure.</p>
        </div>
      </section>

      <section className="kc-layout">
        <div className="container">
          <h2 className="kc-search-title">Search Topics</h2>
          <div className="kc-search">
            <i className="fas fa-search"></i>
            <input
              type="text"
              placeholder="Search topics..."
              value={search}
              onChange={e => { setSearch(e.target.value); setActive(0); }}
            />
            {search && <button className="kc-search-clear" onClick={() => { setSearch(''); setActive(0); }}><i className="fas fa-times"></i></button>}
          </div>

          <div className="kc-main">
            <aside className={`kc-sidebar ${mobileMenu ? 'open' : ''}`}>
              <div className="kc-sidebar-head">
                <span>{filtered.length} Topics</span>
                <button className="kc-sidebar-close" onClick={() => setMobileMenu(false)}><i className="fas fa-times"></i></button>
              </div>
              <nav className="kc-sidebar-list">
                {filtered.map((t, i) => (
                  <button
                    key={i}
                    className={`kc-sidebar-item ${active === i ? 'active' : ''}`}
                    onClick={() => { setActive(i); setMobileMenu(false); }}
                  >
                    <i className={t.icon}></i>
                    <span>{t.label}</span>
                    <i className="fas fa-chevron-right kc-sidebar-arrow"></i>
                  </button>
                ))}
              </nav>
            </aside>

            <button className="kc-mobile-toggle" onClick={() => setMobileMenu(true)}>
              <i className="fas fa-bars"></i> Topics
            </button>

            {current && (
              <main className="kc-content">
                <div className="kc-content-head">
                  <div className="kc-content-icon"><i className={current.icon}></i></div>
                  <div>
                    <h2>{current.label}</h2>
                    <p>{current.desc}</p>
                  </div>
                </div>

                {current.content && (
                  <div className="kc-content-body">
                    <p className="kc-intro">{current.content.intro}</p>
                    {current.content.sections.map((s, i) => (
                      <div className="kc-article-block" key={i}>
                        <h3>{s.title}</h3>
                        <p>{s.text}</p>
                      </div>
                    ))}
                  </div>
                )}

                {current.subtopics && (
                  <div className="kc-subtopics">
                    <h4>Subtopics</h4>
                    <div className="kc-subtopic-tags">
                      {current.subtopics.map((s, i) => (
                        <span className="kc-subtopic-tag" key={i}>{s}</span>
                      ))}
                    </div>
                  </div>
                )}
              </main>
            )}
          </div>
        </div>
      </section>

      <section className="kc-cta">
        <div className="container">
          <h2>Can't find what you're looking for?</h2>
          <p>Reach out to our technical team for personalized assistance.</p>
          <div className="kc-cta-btns">
            <a href="https://wa.me/971526387275" target="_blank" rel="noreferrer" className="btn btn-primary">Ask an Expert <i className="fas fa-arrow-right"></i></a>
          </div>
        </div>
      </section>
    </>
  );
}
