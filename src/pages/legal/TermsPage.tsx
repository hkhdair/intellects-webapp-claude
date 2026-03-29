import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import SEOHead from '../../components/SEOHead';

const TermsPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background-dark">
      <SEOHead
        title="Terms of Service"
        description="Intellects AI Terms of Service — the terms governing use of our website and engagement of our AI and automation services in Australia."
        canonicalPath="/terms"
        noindex={false}
      />
      <Header />

      <main className="flex-1 pt-28 pb-20">
        <div className="container max-w-3xl mx-auto">
          {/* Page heading */}
          <div className="mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-3">Terms of Service</h1>
            <p className="text-text-secondary text-sm">Last updated: 29 March 2026</p>
          </div>

          <div className="prose prose-invert max-w-none space-y-8 text-text-secondary leading-relaxed">

            <section>
              <p>
                Please read these Terms of Service ("Terms") carefully before using our website at{' '}
                <a href="https://intellectsai.au" className="text-primary hover:underline">intellectsai.au</a>{' '}
                or engaging Intellects AI to provide services. By accessing our website or entering into a
                service agreement with us, you agree to be bound by these Terms.
              </p>
              <p className="mt-4">
                These Terms are governed by the laws of South Australia, Australia, and are subject to
                the <strong className="text-text-primary">Australian Consumer Law (ACL)</strong> as
                contained in Schedule 2 of the Competition and Consumer Act 2010 (Cth). Nothing in
                these Terms limits any rights you have under the ACL that cannot be excluded.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-text-primary mb-3">1. About Intellects AI</h2>
              <p>
                Intellects AI is an AI and automation consultancy operating from Adelaide, South Australia.
                We provide the following services and solutions:
              </p>
              <ul className="list-disc pl-5 mt-3 space-y-1">
                <li><strong className="text-text-primary">Business Process Automation:</strong> Workflow automation, CRM integrations, chatbots, voice agents, and data-entry automation</li>
                <li><strong className="text-text-primary">Custom AI Solutions:</strong> Fine-tuned AI models, retrieval-augmented generation (RAG) pipelines, and AI-powered application development</li>
                <li><strong className="text-text-primary">Training & Support:</strong> AI onboarding programmes, leadership enablement, staff training, change management, and ongoing support</li>
                <li><strong className="text-text-primary">Voxify – AI Voice Agent:</strong> An AI-powered voice agent platform for Australian businesses, available at{' '}
                  <a href="https://voxify.intellectsai.au" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">voxify.intellectsai.au</a>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-text-primary mb-3">2. Website Use</h2>
              <p>
                You may use our website for lawful purposes only. You agree not to:
              </p>
              <ul className="list-disc pl-5 mt-3 space-y-1">
                <li>Use the website in any way that violates applicable laws or regulations</li>
                <li>Transmit unsolicited commercial communications (spam)</li>
                <li>Attempt to gain unauthorised access to our systems or data</li>
                <li>Scrape, copy, or reproduce website content without our written consent</li>
                <li>Use automated tools to access the website in a manner that places unreasonable load on our infrastructure</li>
              </ul>
              <p className="mt-4">
                We reserve the right to restrict or terminate your access to the website at any time for
                violations of these Terms.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-text-primary mb-3">3. Service Engagements</h2>

              <h3 className="text-base font-semibold text-text-primary mt-5 mb-2">3.1 Scope of Work</h3>
              <p>
                Each service engagement is governed by a separate Statement of Work (SOW) or service
                agreement agreed between you and Intellects AI. These Terms apply in addition to, and do
                not replace, any such agreement. Where there is a conflict, the specific service agreement
                prevails.
              </p>

              <h3 className="text-base font-semibold text-text-primary mt-5 mb-2">3.2 Your Responsibilities</h3>
              <p>To enable effective delivery, you agree to:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Provide timely access to relevant systems, data, and personnel as required</li>
                <li>Ensure any data you provide is legally obtained and you have rights to share it</li>
                <li>Review and test deliverables within agreed timeframes</li>
                <li>Promptly communicate changes to requirements or circumstances that may affect delivery</li>
              </ul>

              <h3 className="text-base font-semibold text-text-primary mt-5 mb-2">3.3 Acceptance of Deliverables</h3>
              <p>
                Deliverables are deemed accepted if you do not raise written objections within 10 business
                days of delivery, unless otherwise agreed in writing. Acceptance does not affect any
                warranty obligations we hold under the ACL or our service agreement.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-text-primary mb-3">4. Fees and Payment</h2>
              <p>
                Fees for services are quoted on a project-by-project basis following a discovery and
                scoping process. Unless otherwise agreed in writing:
              </p>
              <ul className="list-disc pl-5 mt-3 space-y-1">
                <li>Invoices are issued in Australian dollars (AUD) and inclusive of GST where applicable</li>
                <li>Payment terms are 14 days from invoice date unless specified otherwise in the SOW</li>
                <li>Late payments may incur interest at the rate of 2% per month on the outstanding balance</li>
                <li>We reserve the right to pause service delivery for accounts more than 30 days overdue</li>
              </ul>
              <p className="mt-4">
                The Free AI Readiness Assessment available at{' '}
                <Link to="/assessment" className="text-primary hover:underline">intellectsai.au/assessment</Link>{' '}
                is provided at no charge and does not create a service agreement or obligation on either party.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-text-primary mb-3">5. Intellectual Property</h2>

              <h3 className="text-base font-semibold text-text-primary mt-5 mb-2">5.1 Our IP</h3>
              <p>
                All content on this website — including text, graphics, logos, and the Intellects AI brand
                — is owned by or licensed to Intellects AI and protected by Australian copyright law. You
                may not reproduce, distribute, or create derivative works without our prior written consent.
              </p>

              <h3 className="text-base font-semibold text-text-primary mt-5 mb-2">5.2 Client IP and Deliverables</h3>
              <p>
                Ownership of custom deliverables (code, models, workflows, documentation) is agreed in
                the relevant service agreement. By default, upon receipt of full payment, IP in custom
                deliverables passes to you. Intellects AI retains the right to use general methodologies,
                frameworks, and know-how developed during engagements for other clients, provided no
                confidential client information is disclosed.
              </p>

              <h3 className="text-base font-semibold text-text-primary mt-5 mb-2">5.3 Third-Party Components</h3>
              <p>
                Deliverables may incorporate open-source software or third-party AI models. We will
                disclose material third-party components and applicable licences. Your use of those
                components is subject to their respective licence terms.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-text-primary mb-3">6. Confidentiality</h2>
              <p>
                Each party agrees to keep confidential any non-public information disclosed by the other
                party during an engagement ("Confidential Information"), and to use it only for the
                purposes of the engagement. This obligation survives termination of any agreement.
              </p>
              <p className="mt-4">
                Confidential Information does not include information that: (a) is or becomes publicly
                known through no breach of these Terms; (b) was already known to the receiving party;
                (c) is independently developed without use of Confidential Information; or (d) must be
                disclosed by law or a regulatory authority.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-text-primary mb-3">7. AI-Specific Responsibilities</h2>
              <p>
                AI and automation systems we develop are tools designed to support, not replace, human
                judgement. You acknowledge that:
              </p>
              <ul className="list-disc pl-5 mt-3 space-y-1">
                <li>AI outputs may contain errors or inaccuracies and must be reviewed before acting on them in critical contexts</li>
                <li>You are responsible for the deployment and use of any AI system we deliver, including ensuring compliance with applicable laws</li>
                <li>You must not deploy AI systems we build to engage in unlawful discrimination, deception, or activities that breach applicable privacy, consumer, or workplace laws</li>
                <li>For Voxify and voice agent deployments, you are responsible for obtaining any required consents from individuals who interact with the system (including call recording consents under Australian telecommunications law)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-text-primary mb-3">8. Warranties and Disclaimers</h2>
              <p>
                We warrant that services will be delivered with reasonable care and skill, and that
                deliverables will materially conform to the agreed specifications. We will remedy material
                defects notified within 30 days of delivery at no additional cost.
              </p>
              <p className="mt-4">
                To the extent permitted by law, we exclude all implied warranties not required by the
                ACL. In particular, we do not warrant that AI systems will be error-free, that specific
                business outcomes will be achieved, or that third-party AI platforms or APIs will remain
                available or unchanged.
              </p>
              <p className="mt-4">
                Nothing in these Terms excludes, restricts, or modifies any consumer guarantee, right,
                or remedy that cannot be excluded under the ACL.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-text-primary mb-3">9. Limitation of Liability</h2>
              <p>
                Subject to the ACL and to the extent permitted by law, our total liability to you for
                any claim arising out of or in connection with our services or these Terms is limited to
                the fees paid by you for the relevant service in the 12 months preceding the claim.
              </p>
              <p className="mt-4">
                We are not liable for: indirect, incidental, or consequential loss; loss of profit,
                revenue, or business opportunity; or loss of data — even if we have been advised of the
                possibility of such loss.
              </p>
              <p className="mt-4">
                Where our liability cannot be excluded under the ACL (e.g. for services not of acceptable
                quality), our liability is limited to re-supplying the services or paying the cost of
                re-supply.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-text-primary mb-3">10. Termination</h2>
              <p>
                Either party may terminate a service engagement by providing written notice as specified
                in the relevant SOW. In the absence of a specific termination clause:
              </p>
              <ul className="list-disc pl-5 mt-3 space-y-1">
                <li>Either party may terminate for convenience with 14 days' written notice</li>
                <li>Either party may terminate immediately if the other party commits a material breach that is not remedied within 10 business days of written notice</li>
                <li>On termination, you will pay for all work completed up to the termination date</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-text-primary mb-3">11. Governing Law and Disputes</h2>
              <p>
                These Terms and any service engagements are governed by the laws of South Australia,
                Australia. You and Intellects AI submit to the non-exclusive jurisdiction of the courts
                of South Australia.
              </p>
              <p className="mt-4">
                Before commencing formal proceedings, the parties agree to attempt resolution in good
                faith through direct negotiation for at least 20 business days after one party gives
                written notice of a dispute.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-text-primary mb-3">12. Changes to These Terms</h2>
              <p>
                We may update these Terms from time to time. Changes will be posted on this page with an
                updated "Last updated" date. For existing service engagements, material changes require
                your written agreement. For website use, continued use after posting constitutes
                acceptance.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-text-primary mb-3">13. Contact Us</h2>
              <p>
                For questions about these Terms or our services, please contact us:
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
              <p className="mt-4">
                You may also review our{' '}
                <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>{' '}
                for information on how we handle your personal data.
              </p>
            </section>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TermsPage;
