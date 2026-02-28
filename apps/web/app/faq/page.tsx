// SPDX-License-Identifier: AGPL-3.0-only
export const dynamic = "force-dynamic";

export const metadata = {
  title: "Frequently Asked Questions — JustZappIt",
  description: "Find answers to common questions about JustZappIt, cryptocurrency exchanges, safety tips, and more.",
};

const faqData = [
  {
    category: "general",
    questions: [
      {
        id: "1",
        question: "What is JustZappIt?",
        answer: "JustZappIt is a community-driven, open-source directory of physical cryptocurrency exchanges worldwide. We help people find trusted locations to buy, sell, and trade cryptocurrencies like Bitcoin, Ethereum, and USDT for cash near them."
      },
      {
        id: "2", 
        question: "Is JustZappIt free to use?",
        answer: "Yes, JustZappIt is completely free to use. We don't charge users to search for stores, view listings, or submit information. Our project is supported by the community and optional advertising."
      },
      {
        id: "3",
        question: "How accurate is the information on JustZappIt?",
        answer: "Our accuracy depends on community verification. Stores marked as 'Community Verified' have been confirmed by multiple users. However, we always recommend calling ahead to verify a store's hours and current services before visiting."
      },
      {
        id: "4",
        question: "Can I trust the stores listed on JustZappIt?",
        answer: "While we strive for accuracy through community verification, we cannot guarantee the legitimacy of any listed store. Always exercise caution, verify information independently, and follow our safety guidelines when conducting in-person crypto transactions."
      }
    ]
  },
  {
    category: "verification",
    questions: [
      {
        id: "5",
        question: "How does store verification work?",
        answer: "Stores are verified through community voting. When users confirm a store exists and accepts crypto, it gains verification points. A store needs 3 confirmations to reach 'Community Verified' status. Similarly, stores can be flagged as closed or incorrect."
      },
      {
        id: "6",
        question: "How can I verify a store?",
        answer: "To verify a store, visit the location in person and confirm that it actually accepts cryptocurrency. Then use the 'Confirm' button on the store's page. Only confirm stores you've personally verified."
      },
      {
        id: "7",
        question: "What if I find incorrect information?",
        answer: "Use the 'Suggest Edit' button on the store's page to submit corrections, or use the 'Flag' feature if the store is closed or doesn't accept crypto. Edits are reviewed by the community and applied after receiving confirmations."
      },
      {
        id: "8",
        question: "How do store operators claim their listings?",
        answer: "Store operators can contact us to claim their listing and provide verified information about their services, hours, and accepted cryptocurrencies. This helps ensure accurate, up-to-date information for users."
      }
    ]
  },
  {
    category: "safety",
    questions: [
      {
        id: "9",
        question: "Is it safe to buy cryptocurrency in person?",
        answer: "In-person crypto transactions can be safe if you take proper precautions. Always meet in public places during business hours, bring a friend if possible, verify the crypto before handing over cash, and start with small transactions to build trust."
      },
      {
        id: "10",
        question: "What safety precautions should I take?",
        answer: "1) Meet in public places during business hours. 2) Bring a friend or let someone know your plans. 3) Verify the cryptocurrency transaction on your own device. 4) Count cash carefully. 5) Start with small amounts. 6) Trust your instincts - if something feels wrong, walk away."
      },
      {
        id: "11",
        question: "How do I avoid scams?",
        answer: "Be wary of deals that seem too good to be true, never share your private keys or wallet passwords, verify transactions before handing over cash, and avoid high-pressure tactics. Research the store and read reviews when available."
      },
      {
        id: "12",
        question: "What should I do if I encounter a scam?",
        answer: "Report the incident to local law enforcement, flag the store on JustZappIt to warn others, and contact us with details. Document everything including timestamps, locations, and any communication."
      }
    ]
  },
  {
    category: "technical",
    questions: [
      {
        id: "13",
        question: "How does JustZappIt make money?",
        answer: "JustZappIt is primarily supported by the community. We may display contextual advertising through Google AdSense to help cover hosting and development costs. We never sell user data or charge for basic services."
      },
      {
        id: "14",
        question: "Is my personal information collected?",
        answer: "We collect minimal information. Your IP address is temporarily hashed for rate limiting and spam prevention, but we never store raw IP addresses or personally identifiable information. We don't track users across websites or sell data to third parties."
      },
      {
        id: "15",
        question: "How does the anti-spam system work?",
        answer: "We use hCaptcha to prevent automated submissions and rate limiting based on hashed IP addresses. This helps maintain data quality while protecting user privacy. The system is designed to minimize false positives while blocking actual spam."
      },
      {
        id: "16",
        question: "Can I use JustZappIt on mobile?",
        answer: "Yes, JustZappIt is fully responsive and works great on mobile devices. The map interface adapts to smaller screens, and all features are available on mobile browsers."
      }
    ]
  },
  {
    category: "legal",
    questions: [
      {
        id: "17",
        question: "Is cryptocurrency legal in my country?",
        answer: "Cryptocurrency regulations vary by country and change frequently. While crypto is legal in most countries, some have restrictions or bans. Research your local laws and consult with legal professionals if needed. Our country guides provide general information but not legal advice."
      },
      {
        id: "18",
        question: "Do I need to pay taxes on crypto transactions?",
        answer: "In most countries, cryptocurrency transactions are taxable events. Consult with a tax professional familiar with cryptocurrency regulations in your jurisdiction. Keep detailed records of all transactions for tax purposes."
      },
      {
        id: "19",
        question: "What are the risks of cryptocurrency?",
        answer: "Cryptocurrency risks include price volatility, security threats, regulatory changes, and potential scams. Only invest what you can afford to lose, do your own research, and consider consulting with financial advisors."
      },
      {
        id: "20",
        question: "Is JustZappIt responsible for transactions?",
        answer: "No, JustZappIt is not responsible for any transactions conducted between users and listed stores. We provide directory information only. All transactions are at your own risk, and we disclaim all liability for any losses or damages."
      }
    ]
  }
];

export default function FAQPage() {
  const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "hello@justzappit.xyz";

  const categories = {
    general: "General Questions",
    verification: "Store Verification", 
    safety: "Safety & Security",
    technical: "Technical Questions",
    legal: "Legal & Regulatory"
  };

  return (
    <>
      <h1 className="text-[var(--color-text-primary)]">Frequently Asked Questions</h1>
      <p className="text-[var(--color-text-secondary)] mb-8">Last updated: February 28, 2026</p>

      <p>
        Find answers to common questions about JustZappIt, cryptocurrency exchanges, safety tips, and more. Can't find what you're looking for? <a href="/contact" className="text-primary hover:underline">Contact us</a> and we'll be happy to help.
      </p>

      {Object.entries(categories).map(([categoryKey, categoryTitle]) => (
        <section key={categoryKey} className="mt-12">
          <h2 className="text-[var(--color-text-primary)]">{categoryTitle}</h2>
          
          <div className="space-y-6 mt-6">
            {faqData
              .find(section => section.category === categoryKey)
              ?.questions.map((item) => (
                <div key={item.id} className="border-b border-[var(--color-border)] pb-6 last:border-b-0">
                  <h3 className="text-[var(--color-text-primary)] font-semibold mb-3">
                    {item.question}
                  </h3>
                  <div className="text-[var(--color-text-secondary)] leading-relaxed">
                    {item.answer}
                  </div>
                </div>
              ))}
          </div>
        </section>
      ))}

      <section className="mt-12">
        <h2 className="text-[var(--color-text-primary)]">Still Have Questions?</h2>
        <p className="text-[var(--color-text-secondary)] mt-4">
          If you couldn't find the answer you're looking for, we're here to help:
        </p>
        
        <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg p-6 mt-6">
          <ul className="space-y-3">
            <li>
              <strong>Email us:</strong> <a href={`mailto:${email}`} className="text-primary hover:underline">{email}</a>
            </li>
            <li>
              <strong>Check our guides:</strong> Browse our <a href="/guides" className="text-primary hover:underline">country-specific guides</a> for regulatory information
            </li>
            <li>
              <strong>Read our blog:</strong> Visit our <a href="/blog" className="text-primary hover:underline">blog</a> for educational content and safety tips
            </li>
            <li>
              <strong>Join the community:</strong> Contribute to our <a href="https://github.com/0xVampirot/justZappIt" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">open-source project</a>
            </li>
          </ul>
        </div>

        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
          <p className="text-sm text-blue-800 dark:text-blue-200">
            <strong>Important:</strong> The information provided in this FAQ is for educational purposes only and does not constitute legal, financial, or professional advice. Always consult with qualified professionals for your specific situation.
          </p>
        </div>
      </section>
    </>
  );
}
