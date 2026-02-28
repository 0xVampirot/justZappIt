// SPDX-License-Identifier: AGPL-3.0-only
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

// Sample country guide data - in production this would come from a CMS or database
const countryGuides: Record<string, any> = {
  us: {
    country: "United States",
    countryCode: "us",
    title: "United States Cryptocurrency Regulations Guide",
    description: "Comprehensive guide to US cryptocurrency regulations including federal laws, state-specific requirements, tax obligations, and compliance for physical crypto exchanges.",
    lastUpdated: "2026-02-25",
    content: `
# United States Cryptocurrency Regulations Guide

## Overview

The United States has a complex regulatory landscape for cryptocurrencies, with oversight shared between federal and state agencies. This guide covers the key regulations affecting physical cryptocurrency exchanges and traders.

## Federal Regulatory Framework

### Securities and Exchange Commission (SEC)

The SEC considers most cryptocurrencies to be securities, subject to federal securities laws:

- **Registration Requirements**: Crypto exchanges may need to register as national securities exchanges
- **Broker-Dealer Registration**: Many crypto activities require broker-dealer registration
- **Investor Protection**: SEC enforces anti-fraud and disclosure requirements

### Financial Crimes Enforcement Network (FinCEN)

FinCEN regulates cryptocurrency for Anti-Money Laundering (AML) purposes:

- **Bank Secrecy Act (BSA)**: Crypto exchanges are considered Money Services Businesses (MSBs)
- **Registration Requirement**: Must register with FinCEN within 180 days of commencing operations
- **AML Program**: Required to implement comprehensive AML programs
- **Reporting Obligations**: Suspicious Activity Reports (SARs) and Currency Transaction Reports (CTRs)

### Internal Revenue Service (IRS)

The IRS treats cryptocurrency as property for tax purposes:

- **Capital Gains Tax**: Profits from crypto trading subject to capital gains tax
- **Reporting Requirements**: Must report crypto transactions on tax returns
- **Form 8949**: Required for reporting crypto sales and exchanges
- **Record Keeping**: Must maintain detailed records of all transactions

### Commodity Futures Trading Commission (CFTC)

The CFTC regulates cryptocurrency derivatives:

- **Derivatives Trading**: Crypto futures and options fall under CFTC jurisdiction
- **Market Manipulation**: CFTC enforces anti-manipulation rules
- **Registration Requirements**: Derivatives platforms must register with CFTC

## State-by-State Regulations

### Crypto-Friendly States

**Wyoming**
- First state to create comprehensive crypto laws
- Special purpose depository institutions for crypto
- Crypto-friendly banking regulations
- No state income tax on crypto gains

**California**
- Large crypto market with developing regulations
- Money Transmission Act applies to crypto exchanges
- Consumer protection laws for crypto investors
- Ongoing legislative developments

**New York**
- BitLicense requirement for crypto businesses
- Strictest state regulations in the US
- New York Department of Financial Services (NYDFS) oversight
- High compliance costs for exchanges

### Regulatory Requirements by State

**Money Transmission Laws**
- Most states require Money Transmitter Licenses for crypto exchanges
- Varying requirements and costs by state
- Ongoing compliance reporting obligations
- Bond and net worth requirements

**State Securities Laws**
- Some states apply securities laws to crypto offerings
- Blue sky regulations may apply to crypto tokens
- State-level investor protection requirements

## Physical Exchange Specific Requirements

### Licensing and Registration

**Federal Level**
- FinCEN MSB registration (mandatory)
- SEC registration (if dealing in securities)
- CFTC registration (for derivatives)

**State Level**
- Money Transmitter License (most states)
- State-specific crypto licenses (where applicable)
- Local business licenses

### Compliance Requirements

**AML/KYC Procedures**
- Customer identification programs
- Transaction monitoring systems
- Suspicious activity reporting
- Record keeping requirements

**Consumer Protection**
- Clear disclosure of fees and risks
- Fair trading practices
- Dispute resolution procedures
- Insurance requirements (some states)

### Operational Requirements

**Security Standards**
- Secure storage of digital assets
- Cybersecurity protocols
- Insurance coverage for digital assets
- Regular security audits

**Financial Requirements**
- Minimum net worth requirements
- Surety bonds
- Capital requirements
- Financial reporting

## Tax Obligations

### Federal Taxes

**Income Tax**
- Crypto mining treated as ordinary income
- Staking rewards subject to income tax
- Airdrops considered taxable income

**Capital Gains Tax**
- Short-term gains (held < 1 year): Ordinary income rates
- Long-term gains (held > 1 year): 0%, 15%, or 20% rates
- Wash sale rules do not apply to crypto

**Reporting Requirements**
- Form 8949 for capital gains/losses
- Schedule D for overall capital gains
- FBAR filing for foreign crypto exchanges
- FATCA reporting requirements

### State Taxes

**Income Tax**
- Most states follow federal treatment
- Some states have no income tax (Texas, Florida, etc.)
- State-specific deductions and credits

**Sales Tax**
- Generally no sales tax on crypto purchases
- Some states may tax crypto-related services
- Varies by state and transaction type

## Compliance Best Practices

### For Physical Exchanges

**Legal Compliance**
- Maintain all required licenses and registrations
- Regular compliance audits
- Stay updated on regulatory changes
- Engage legal counsel specializing in crypto

**Operational Security**
- Implement robust AML/KYC procedures
- Secure storage solutions
- Insurance coverage
- Employee background checks

**Consumer Protection**
- Transparent fee structures
- Clear terms of service
- Responsive customer support
- Dispute resolution mechanisms

### For Individual Traders

**Tax Compliance**
- Maintain detailed transaction records
- Report all taxable events
- Consider tax-loss harvesting
- Consult tax professionals

**Security Practices**
- Use secure wallets
- Enable two-factor authentication
- Be wary of scams
- Diversify storage methods

## Recent Regulatory Developments

### 2025-2026 Updates

**Federal Level**
- Increased SEC enforcement actions
- New crypto legislation proposals
- Enhanced AML regulations
- Stablecoin regulations under development

**State Level**
- More states adopting crypto-friendly policies
- Increased consumer protection measures
- New licensing frameworks
- Inter-state cooperation initiatives

## Enforcement Actions

### Common Violations

**SEC Enforcement**
- Unregistered securities offerings
- Market manipulation
- Fraudulent schemes
- Insider trading

**FinCEN Enforcement**
- AML program failures
- Registration violations
- Suspicious activity reporting failures
- Record keeping violations

**State Enforcement**
- Unlicensed money transmission
- Consumer protection violations
- Fraud allegations
- Securities law violations

## Resources and Support

### Regulatory Agencies

- **SEC**: [https://www.sec.gov/](https://www.sec.gov/)
- **FinCEN**: [https://www.fincen.gov/](https://www.fincen.gov/)
- **IRS**: [https://www.irs.gov/](https://www.irs.gov/)
- **CFTC**: [https://www.cftc.gov/](https://www.cftc.gov/)

### Industry Associations

- **Blockchain Association**: [https://theblockchainassociation.org/](https://theblockchainassociation.org/)
- **Chamber of Digital Commerce**: [https://digitalchamber.org/](https://digitalchamber.org/)
- **Crypto Council for Innovation**: [https://cryptocouncil.org/](https://cryptocouncil.org/)

### Legal Resources

- **Coin Center**: [https://coincenter.org/](https://coincenter.org/)
- **Electronic Frontier Foundation**: [https://www.eff.org/](https://www.eff.org/)
- **State regulatory agencies**

## Conclusion

The US regulatory landscape for cryptocurrency is complex and evolving. Physical exchanges must navigate multiple regulatory frameworks at both federal and state levels. Compliance requires significant resources and ongoing attention to regulatory developments.

For individual traders, understanding tax obligations and security best practices is essential. Always consult with qualified legal and tax professionals for personalized advice.

## Disclaimer

This guide is for informational purposes only and does not constitute legal advice. Regulations change frequently, and this information may not reflect the most current requirements. Consult with qualified legal professionals for compliance with applicable laws and regulations.
    `
  },
  gb: {
    country: "United Kingdom",
    countryCode: "gb",
    title: "United Kingdom Cryptocurrency Regulations Guide", 
    description: "Guide to UK crypto regulations including FCA requirements, tax obligations, and consumer protection measures for cryptocurrency exchanges.",
    lastUpdated: "2026-02-24",
    content: `
# United Kingdom Cryptocurrency Regulations Guide

## Overview

The United Kingdom has established a comprehensive regulatory framework for cryptocurrencies under the oversight of the Financial Conduct Authority (FCA). This guide covers the key regulations affecting crypto businesses and traders in the UK.

## FCA Regulatory Framework

### Registration Requirements

The FCA requires crypto asset businesses to register for anti-money laundering supervision:

- **Mandatory Registration**: All crypto exchanges must register with FCA
- **Temporary Registration**: Available for businesses awaiting full assessment
- **Fit and Proper Test**: FCA assesses management and business practices
- **Ongoing Supervision**: Continuous monitoring of registered businesses

### Permitted Activities

FCA-regulated crypto activities include:

- **Exchange Services**: Trading between crypto and fiat currencies
- **Custody Services**: Safeguarding crypto assets for customers
- **Transfer Services**: Facilitating crypto transfers
- **Dealing Services**: Buying/selling crypto on own account

### Prohibited Activities

Certain crypto products are banned in the UK:

- **Derivatives**: Crypto futures and options for retail investors
- **ETNs**: Exchange-traded notes linked to crypto
- **CFDs**: Contracts for differences on crypto
- **Certain Stablecoins**: Not meeting regulatory standards

## Consumer Protection

### Marketing Restrictions

**Promotional Rules**
- All crypto promotions must be approved by FCA-authorized firms
- Clear risk warnings required
- No misleading or exaggerated claims
- Restrictions on targeting vulnerable consumers

**Disclosure Requirements**
- Transparent fee structures
- Clear information about risks
- Details about regulatory status
- Contact information for complaints

### Investor Protection

**Compensation Scheme**
- FSCS protection for certain crypto activities
- Limited coverage for crypto assets
- Protection for fiat currency held by exchanges
- Claims process for failed exchanges

**Dispute Resolution**
- Financial Ombudsman Service access
- Complaint handling procedures
- Resolution timeframes
- Compensation awards

## Tax Obligations

### Capital Gains Tax

**Taxable Events**
- Selling crypto for fiat currency
- Exchanging one crypto for another
- Using crypto for purchases
- Gifting crypto (above annual allowance)

**Tax Rates**
- Basic rate: 10% on gains above allowance
- Higher rate: 20% on gains above allowance
- Annual allowance: £6,000 (2025/26 tax year)

### Income Tax

**Taxable Income**
- Crypto mining rewards
- Staking income
- Airdrops received
- Business trading income

**Tax Rates**
- Basic rate: 20% on income above allowance
- Higher rate: 40% on income above threshold
- Additional rate: 45% on high incomes

### Reporting Requirements

**Self Assessment**
- Must report crypto gains on tax returns
- Record keeping requirements
- Deadline for filing: January 31st
- Penalties for late filing

## Compliance Requirements

### AML/KYC Procedures

**Customer Due Diligence**
- Identity verification for all customers
- Source of funds checks
- Enhanced due diligence for high-risk customers
- Ongoing monitoring requirements

**Transaction Monitoring**
- Suspicious activity detection
- Large transaction reporting
- International transfer monitoring
- Record keeping requirements

### Security Standards

**Asset Protection**
- Segregation of customer funds
- Secure storage solutions
- Insurance requirements
- Regular security audits

**Operational Security**
- Cybersecurity protocols
- Business continuity planning
- Disaster recovery procedures
- Employee security training

## Licensing Process

### Application Requirements

**Documentation Needed**
- Business plan and financial projections
- Management team information
- AML/KYC procedures
- Security arrangements
- Financial resources evidence

**Fit and Proper Assessment**
- Management integrity and competence
- Financial stability
- Business model viability
- Compliance capabilities

### Ongoing Obligations

**Reporting Requirements**
- Regular financial reports
- Compliance reports
- Incident reporting
- Changes in control notifications

**Supervision**
- Regular FCA inspections
- Compliance monitoring
- Risk assessments
- Capital adequacy requirements

## Enforcement Actions

### Common Violations

**FCA Enforcement**
- Operating without registration
- Non-compliance with AML rules
- Misleading promotions
- Poor consumer outcomes

**Penalties**
- Fines up to £5 million or 10% of turnover
- Criminal prosecution for serious breaches
- Business restrictions
- Disqualification orders

## Recent Developments

### 2025-2026 Updates

**New Regulations**
- Enhanced consumer protection rules
- Stablecoin regulations under development
- DeFi regulatory framework consultation
- Crypto advertising restrictions

**Market Developments**
- Increased institutional adoption
- New crypto products and services
- Enhanced international cooperation
- Technology innovation support

## Best Practices

### For Exchanges

**Compliance**
- Maintain FCA registration
- Implement robust AML/KYC procedures
- Regular compliance audits
- Staff training programs

**Customer Service**
- Transparent communication
- Responsive support
- Clear dispute resolution
- Educational resources

### For Traders

**Tax Compliance**
- Maintain accurate records
- Report all taxable events
- Consider tax planning strategies
- Seek professional advice

**Security**
- Use secure wallets
- Enable security features
- Beware of scams
- Diversify holdings

## Resources

### Regulatory Bodies

- **FCA**: [https://www.fca.org.uk/](https://www.fca.org.uk/)
- **HMRC**: [https://www.gov.uk/hmrc/](https://www.gov.uk/hmrc/)
- **FSCS**: [https://www.fscs.org.uk/](https://www.fscs.org.uk/)
- **FOS**: [https://www.financial-ombudsman.org.uk/](https://www.financial-ombudsman.org.uk/)

### Industry Associations

- **CryptoUK**: [https://cryptouk.org/](https://cryptouk.org/)
- **UK Digital Assets Association**: [https://ukdaa.org/](https://ukdaa.org/)

### Legal Resources

- **Law Society of England & Wales**
- **Bar Council**
- **Specialist crypto law firms

## Conclusion

The UK has established one of the most comprehensive regulatory frameworks for cryptocurrency in Europe. While compliance requirements are stringent, they provide consumer protection and market legitimacy.

For businesses operating in the UK, FCA registration and ongoing compliance are essential. For individual traders, understanding tax obligations and security best practices is crucial.

## Disclaimer

This guide is for informational purposes only and does not constitute legal or financial advice. Regulations change frequently, and this information may not reflect current requirements. Consult with qualified professionals for personalized advice.
    `
  },
  eu: {
    country: "European Union",
    countryCode: "eu",
    title: "European Union Cryptocurrency Regulations Guide",
    description: "Comprehensive guide to EU crypto regulations including MiCA framework, GDPR compliance, and cross-border cryptocurrency trading rules.",
    lastUpdated: "2026-02-23",
    content: `
# European Union Cryptocurrency Regulations Guide

## Overview

The European Union has established a comprehensive regulatory framework for cryptocurrency through the Markets in Crypto-Assets (MiCA) regulation. This guide covers the key regulations affecting crypto businesses and traders across EU member states.

## MiCA Regulation Framework

### Scope and Application

**Covered Entities**
- Crypto asset service providers (CASPs)
- Crypto asset issuers
- Stablecoin issuers
- Market participants

**Regulated Activities**
- Crypto asset trading and exchange
- Custody and administration
- Transfer services
- Advisory services
- Underwriting and placement

### Licensing Requirements

**CASP Authorization**
- Mandatory authorization from national competent authority
- Minimum capital requirements
- Governance and control requirements
- Prudential safeguards

**Passporting Rights**
- Authorized CASPs can operate across EU
- Mutual recognition of authorizations
- Single market access
- Harmonized regulatory standards

## Consumer Protection

### Disclosure Requirements

**White Paper Requirements**
- Detailed information about crypto assets
- Risk factors and warnings
- Information about issuers and projects
- Ongoing disclosure obligations

**Marketing Rules**
- Clear and fair marketing communications
- Risk warnings for investors
- No misleading information
- Targeting restrictions for vulnerable consumers

### Investor Safeguards

**Segregation of Assets**
- Customer assets must be segregated
- Insolvency protection
- Custody requirements
- Insurance obligations

**Complaint Handling**
- Standardized complaint procedures
- Response time requirements
- Access to dispute resolution
- Compensation mechanisms

## Stablecoin Regulations

### E-Money Tokens

**Authorization Requirements**
- Authorization from national authority
- Capital requirements (minimum €350,000)
- Reserve asset requirements
- Governance standards

**Reserve Management**
- 1:1 reserve backing
- Daily reserve reporting
- Independent audits
- Investment restrictions

### Asset-Referenced Tokens

**Regulatory Sandbox**
- Pilot regime for asset-referenced tokens
- Testing under regulatory supervision
- Limited issuance caps
- Consumer protection measures

## AML/CFT Requirements

### Fifth AML Directive

**CASP Obligations**
- Customer due diligence (CDD)
- Suspicious transaction reporting
- Record keeping requirements
- Risk-based approach

**Registration Requirements**
- Registration with financial intelligence units
- AML/CFT programs
- Staff training
- Independent audits

### Cross-Border Cooperation

**Information Sharing**
- EU-wide AML information sharing
- Joint investigations
- Standardized reporting formats
- Cooperation mechanisms

## Data Protection (GDPR)

### Privacy Requirements

**Data Processing**
- Lawful basis for processing personal data
- Data minimization principles
- Purpose limitation
- Storage limitations

**User Rights**
- Right to access personal data
- Right to rectification
- Right to erasure
- Right to data portability

### Blockchain and GDPR

**Pseudonymization**
- Blockchain addresses as personal data
- Pseudonymization requirements
- Data protection by design
- Privacy impact assessments

## Tax Framework

### VAT Treatment

**Crypto Transactions**
- Exempt from VAT following ECJ ruling
- No VAT on crypto-to-crypto exchanges
- VAT on related services
- Member state variations

**Reporting Requirements**
- Cross-border reporting obligations
- DAC6 directive reporting
- Country-by-country reporting
- Exchange of information

### Capital Gains Tax

**Taxable Events**
- Crypto sales for fiat currency
- Crypto-to-crypto exchanges
- Crypto payments for goods/services
- Mining and staking rewards

**Member State Variations**
- Different tax rates by country
- Varying allowances and exemptions
- Different reporting requirements
- Local tax authority guidelines

## Cross-Border Operations

### Passporting Rights

**Single Market Access**
- Authorized CASPs can operate across EU
- No additional authorizations needed
- Harmonized regulatory standards
- Mutual recognition

**Supervisory Cooperation**
- Home state supervision
- Host state cooperation
- Information exchange
- Joint inspections

### Third-Country Relations

**Equivalence Assessments**
- Third-country regulatory frameworks
- Equivalence decisions
- Access to EU markets
- Cooperation agreements

## Compliance Requirements

### Governance and Risk Management

**Board Requirements**
- Fit and proper persons test
- Conflict of interest policies
- Risk management frameworks
- Internal controls

**Operational Resilience**
- Business continuity planning
- Disaster recovery procedures
- Cybersecurity requirements
- Outsourcing controls

### Financial Requirements

**Capital Requirements**
- Minimum capital thresholds
- Own funds requirements
- Prudential safeguards
- Stress testing

**Insurance and Guarantees**
- Professional indemnity insurance
- Civil liability insurance
- Guarantee funds
- Compensation schemes

## Enforcement and Penalties

### Regulatory Actions

**Administrative Sanctions**
- Fines up to €5 million or 3% of turnover
- Business restrictions
- Authorization withdrawals
- Public warnings

**Criminal Sanctions**
- Fraud and market manipulation
- Money laundering offenses
- Data protection violations
- Insider trading

### Cross-Border Enforcement

**Cooperation Mechanisms**
- Information sharing between authorities
- Joint investigations
- Enforcement coordination
- Mutual legal assistance

## Recent Developments

### 2025-2026 Updates

**MiCA Implementation**
- Full implementation across member states
- National supervisory authorities
- Technical standards
- Guidelines and recommendations

**Digital Euro**
- ECB digital currency development
- Wholesale CBDC projects
- Cross-border payment solutions
- Interoperability standards

## Member State Implementations

### Leading Jurisdictions

**Germany**
- BaFin crypto regulations
- Banking license requirements
- Crypto custody regulations
- Tax treatment guidelines

**France**
- AMF crypto framework
- PACTE law implementation
- Digital asset regulations
- Consumer protection measures

**Netherlands**
- DNB crypto supervision
- Registration requirements
- AML/CFT obligations
- Tax compliance

## Best Practices

### For CASPs

**Compliance Framework**
- Comprehensive AML/CFT program
- Robust governance structure
- Effective risk management
- Regular compliance audits

**Customer Protection**
- Clear fee structures
- Transparent terms and conditions
- Responsive customer support
- Educational resources

### For Investors

**Due Diligence**
- Verify CASP authorization
- Understand regulatory protections
- Assess security measures
- Review terms and conditions

**Risk Management**
- Diversify investments
- Use secure storage
- Understand tax implications
- Monitor regulatory changes

## Resources

### EU Institutions

- **European Commission**: [https://ec.europa.eu/](https://ec.europa.eu/)
- **European Banking Authority**: [https://www.eba.europa.eu/](https://www.eba.europa.eu/)
- **European Securities Authority**: [https://www.esma.europa.eu/](https://www.esma.europa.eu/)
- **European Parliament**: [https://www.europarl.europa.eu/](https://www.europarl.europa.eu/)

### National Authorities

- **BaFin** (Germany)
- **AMF** (France)
- **AFM** (Netherlands)
- **Consob** (Italy)

### Industry Associations

- **European Digital Finance Association**: [https://edfa.eu/](https://edfa.eu/)
- **European Crypto Initiative**: [https://europecrypto.org/](https://europecrypto.org/)

## Conclusion

The EU has established one of the world's most comprehensive regulatory frameworks for cryptocurrency through MiCA. The regulation provides legal certainty, consumer protection, and market integrity while fostering innovation.

For businesses operating in the EU, MiCA compliance is essential for market access. For investors, the framework provides enhanced protections and legal certainty.

## Disclaimer

This guide is for informational purposes only and does not constitute legal advice. Regulations change frequently, and member state implementations may vary. Consult with qualified legal professionals for specific advice.
    `
  }
};

export async function generateMetadata({ params }: { params: { country: string } }): Promise<Metadata> {
  const guide = countryGuides[params.country];
  
  if (!guide) {
    return {
      title: "Country Guide Not Found — JustZappIt",
      description: "The requested country guide could not be found.",
    };
  }

  return {
    title: `${guide.title} — JustZappIt`,
    description: guide.description,
    openGraph: {
      title: guide.title,
      description: guide.description,
      type: "article",
      publishedTime: guide.lastUpdated,
    },
  };
}

export default function CountryGuidePage({ params }: { params: { country: string } }) {
  const guide = countryGuides[params.country];

  if (!guide) {
    notFound();
  }

  return (
    <article className="max-w-4xl mx-auto">
      {/* Article Header */}
      <header className="mb-8">
        <div className="mb-4">
          <Link href="/guides" className="text-primary hover:underline text-sm">
            ← Back to Country Guides
          </Link>
        </div>
        
        <h1 className="text-[var(--color-text-primary)] text-3xl md:text-4xl font-bold mb-4">
          {guide.title}
        </h1>
        
        <div className="flex flex-wrap items-center gap-4 text-[var(--color-text-secondary)] text-sm">
          <span>Last updated: {new Date(guide.lastUpdated).toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}</span>
          <span>•</span>
          <span>Country Code: {guide.countryCode.toUpperCase()}</span>
        </div>
      </header>

      {/* Article Content */}
      <div className="prose prose-lg max-w-none">
        <div 
          className="text-[var(--color-text-secondary)] leading-relaxed"
          dangerouslySetInnerHTML={{ 
            __html: guide.content
              .replace(/\n/g, '<br>')
              .replace(/#{1,6}\s/g, (match: string) => {
                const level = match.trim().length;
                return `<h${level} class="text-[var(--color-text-primary)] font-semibold mt-8 mb-4">`;
              })
              .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
              .replace(/\*(.*?)\*/g, '<em>$1</em>')
              .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline">$1</a>')
          }}
        />
      </div>

      {/* Article Footer */}
      <footer className="mt-16 pt-8 border-t border-[var(--color-border)]">
        <div className="mb-8">
          <h2 className="text-[var(--color-text-primary)] text-xl font-semibold mb-4">Related Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/blog" className="block text-[var(--color-text-secondary)] hover:text-primary transition-colors">
              Educational Articles
            </Link>
            <Link href="/verification" className="block text-[var(--color-text-secondary)] hover:text-primary transition-colors">
              Store Verification Process
            </Link>
            <Link href="/faq" className="block text-[var(--color-text-secondary)] hover:text-primary transition-colors">
              Frequently Asked Questions
            </Link>
            <Link href="/contact" className="block text-[var(--color-text-secondary)] hover:text-primary transition-colors">
              Contact for Legal Questions
            </Link>
          </div>
        </div>

        <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg p-6">
          <h3 className="text-[var(--color-text-primary)] font-semibold mb-4">Important Disclaimer</h3>
          <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed">
            This guide is for informational purposes only and does not constitute legal advice. Cryptocurrency regulations change frequently and may vary by jurisdiction. Always consult with qualified legal professionals for compliance with local laws and regulations.
          </p>
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/guides"
            className="inline-block bg-primary text-white px-6 py-3 rounded-md font-semibold hover:opacity-90 transition-opacity"
          >
            Browse All Country Guides
          </Link>
        </div>
      </footer>
    </article>
  );
}
