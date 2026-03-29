import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import SEOHead from '../../components/SEOHead';

const PrivacyPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background-dark">
      <SEOHead
        title="Privacy Policy"
        description="Intellects AI Privacy Policy — how we collect, use, and protect your personal information in accordance with the Australian Privacy Act 1988."
        canonicalPath="/privacy"
        noindex={false}
      />
      <Header />

      <main className="flex-1 pt-28 pb-20">
        <div className="container max-w-3xl mx-auto">
          {/* Page heading */}
          <div className="mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-3">Privacy Policy</h1>
            <p className="text-text-secondary text-sm">Last updated: 29 March 2026</p>
          </div>

          <div className="prose prose-invert max-w-none space-y-8 text-text-secondary leading-relaxed">

            <section>
              <p>
                Intellects AI ("we", "our", "us") is committed to protecting your personal information and
                your right to privacy. This Privacy Policy explains how we collect, use, disclose, and
                safeguard your information when you visit our website at{' '}
                <a href="https://intellectsai.au" className="text-primary hover:underline">intellectsai.au</a>{' '}
                or engage us to provide services.
              </p>
              <p className="mt-4">
                We operate in accordance with the{' '}
                <strong className="text-text-primary">Privacy Act 1988 (Cth)</strong> and the{' '}
                <strong className="text-text-primary">Australian Privacy Principles (APPs)</strong>. By
                using our website or services, you consent to the practices described in this policy.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-text-primary mb-3">1. Who We Are</h2>
              <p>
                Intellects AI is an AI and automation consultancy based in Adelaide, South Australia. We
                provide services including business process automation, custom AI solutions, AI training and
                support, and the Voxify AI Voice Agent product to Australian businesses and organisations.
              </p>
              <ul className="list-disc pl-5 mt-3 space-y-1">
                <li>Business name: Intellects AI</li>
                <li>Location: 451 Pulteney St, Adelaide SA 5000, Australia</li>
                <li>Contact: <a href="tel:+61861712665" className="text-primary hover:underline">(08) 6171 2665</a></li>
                <li>Email: <a href="mailto:hello@intellectsai.au" className="text-primary hover:underline">hello@intellectsai.au</a></li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-text-primary mb-3">2. Information We Collect</h2>
              <p>We may collect the following categories of personal information:</p>

              <h3 className="text-base font-semibold text-text-primary mt-5 mb-2">Information you provide directly</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Name, email address, phone number, and company name submitted via our contact form or assessment tool</li>
                <li>Email address submitted when subscribing to our newsletter</li>
                <li>Business information shared during client onboarding, discovery sessions, or service delivery</li>
                <li>Communications you send us by email or phone</li>
              </ul>

              <h3 className="text-base font-semibold text-text-primary mt-5 mb-2">Information collected automatically</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Browser type, operating system, referring URLs, and pages visited on our website</li>
                <li>IP address and approximate geographic location</li>
                <li>Date and time of website visits</li>
              </ul>

              <h3 className="text-base font-semibold text-text-primary mt-5 mb-2">Information from third parties</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Where you engage us through a referral, we may receive your contact details from the referring party</li>
                <li>Publicly available professional information (e.g. LinkedIn profile) when relevant to a service engagement</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-text-primary mb-3">3. How We Use Your Information</h2>
              <p>We use your personal information to:</p>
              <ul className="list-disc pl-5 mt-3 space-y-1">
                <li>Respond to enquiries, quote requests, and assessment submissions</li>
                <li>Deliver and manage the services you have engaged us to provide</li>
                <li>Send our newsletter and updates to subscribers who have opted in</li>
                <li>Improve our website, services, and client experience</li>
                <li>Meet our legal, regulatory, and contractual obligations</li>
                <li>Prevent fraud and maintain the security of our systems</li>
              </ul>
              <p className="mt-4">
                We will not use your personal information for purposes other than those described here
                without your consent, except where permitted or required by law.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-text-primary mb-3">4. AI Services and Your Data</h2>
              <p>
                In the course of providing AI and automation services, we may process business data you
                share with us (such as workflows, documents, or customer interaction logs) to build, train,
                or configure AI systems on your behalf.
              </p>
              <ul className="list-disc pl-5 mt-3 space-y-1">
                <li>We treat all client business data as confidential and do not use it to train general-purpose AI models without explicit written consent</li>
                <li>AI outputs we produce for you remain subject to your review and approval before deployment</li>
                <li>Where third-party AI platforms (e.g. OpenAI, Anthropic, Google) are used in delivery, those platforms' data handling policies also apply, and we will notify you accordingly</li>
                <li>For the Voxify AI Voice Agent, call interaction data is processed in accordance with the terms agreed at deployment and relevant telecommunications privacy obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-text-primary mb-3">5. Disclosure of Your Information</h2>
              <p>
                We do not sell, trade, or rent your personal information to third parties. We may share your
                information in limited circumstances:
              </p>
              <ul className="list-disc pl-5 mt-3 space-y-1">
                <li><strong className="text-text-primary">Service providers:</strong> Trusted third-party vendors who assist us in delivering services (e.g. email platforms, CRM, cloud hosting), bound by confidentiality obligations</li>
                <li><strong className="text-text-primary">Legal requirements:</strong> Where disclosure is required by law, court order, or a regulatory authority</li>
                <li><strong className="text-text-primary">Business transfers:</strong> In the event of a merger, acquisition, or sale of assets, your information may be transferred subject to equivalent privacy protections</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-text-primary mb-3">6. Data Storage and Security</h2>
              <p>
                Your personal information is stored securely on servers located in Australia or with
                reputable cloud providers operating under appropriate data protection frameworks. We
                implement industry-standard technical and organisational measures to protect your
                information against unauthorised access, disclosure, alteration, or destruction.
              </p>
              <p className="mt-4">
                No method of transmission over the internet is 100% secure. While we strive to protect
                your information, we cannot guarantee absolute security and encourage you to take
                precautions when sharing sensitive data online.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-text-primary mb-3">7. Data Retention</h2>
              <p>
                We retain personal information for as long as necessary to fulfil the purposes described
                in this policy, and to meet our legal and accounting obligations. When information is no
                longer required, we securely delete or de-identify it.
              </p>
              <ul className="list-disc pl-5 mt-3 space-y-1">
                <li>Contact and enquiry records: up to 3 years from last contact</li>
                <li>Client engagement records: up to 7 years (to meet Australian tax and business record-keeping obligations)</li>
                <li>Newsletter subscriptions: until you unsubscribe</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-text-primary mb-3">8. Your Rights</h2>
              <p>Under the Australian Privacy Principles, you have the right to:</p>
              <ul className="list-disc pl-5 mt-3 space-y-1">
                <li><strong className="text-text-primary">Access:</strong> Request a copy of the personal information we hold about you</li>
                <li><strong className="text-text-primary">Correction:</strong> Request correction of inaccurate or out-of-date information</li>
                <li><strong className="text-text-primary">Complaint:</strong> Lodge a complaint with us if you believe we have mishandled your information</li>
                <li><strong className="text-text-primary">Unsubscribe:</strong> Opt out of marketing communications at any time via the unsubscribe link in our emails or at{' '}
                  <Link to="/unsubscribe" className="text-primary hover:underline">intellectsai.au/unsubscribe</Link>
                </li>
              </ul>
              <p className="mt-4">
                To exercise any of these rights, please contact us at{' '}
                <a href="mailto:hello@intellectsai.au" className="text-primary hover:underline">hello@intellectsai.au</a>.
                We will respond within 30 days.
              </p>
              <p className="mt-4">
                If you are unsatisfied with our response, you may contact the{' '}
                <a href="https://www.oaic.gov.au" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  Office of the Australian Information Commissioner (OAIC)
                </a>.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-text-primary mb-3">9. Cookies and Tracking</h2>
              <p>
                Our website may use cookies and similar tracking technologies to enhance your browsing
                experience and analyse site usage. You can control cookie behaviour through your browser
                settings. Disabling cookies may affect the functionality of certain parts of our website.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-text-primary mb-3">10. Third-Party Links</h2>
              <p>
                Our website contains links to external websites, including our Voxify product at{' '}
                <a href="https://voxify.intellectsai.au" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  voxify.intellectsai.au
                </a>{' '}
                and third-party platforms. We are not responsible for the privacy practices of those sites
                and encourage you to review their privacy policies.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-text-primary mb-3">11. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. Changes will be posted on this page
                with an updated "Last updated" date. We encourage you to review this policy periodically.
                Continued use of our website or services after changes are posted constitutes acceptance
                of the revised policy.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-text-primary mb-3">12. Contact Us</h2>
              <p>
                For any privacy-related questions, requests, or complaints, please contact us:
              </p>
              <ul className="list-none mt-3 space-y-1">
                <li><strong className="text-text-primary">Email:</strong>{' '}
                  <a href="mailto:hello@intellectsai.au" className="text-primary hover:underline">hello@intellectsai.au</a>
                </li>
                <li><strong className="text-text-primary">Phone:</strong>{' '}
                  <a href="tel:+61861712665" className="text-primary hover:underline">(08) 6171 2665</a>
                </li>
                <li><strong className="text-text-primary">Post:</strong> 451 Pulteney St, Adelaide SA 5000, Australia</li>
              </ul>
            </section>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPage;
