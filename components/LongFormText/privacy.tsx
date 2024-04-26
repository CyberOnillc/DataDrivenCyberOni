import React from "react";

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-center text-2xl font-bold">Privacy Policy</h1>

      {/* Effective Date */}
      <section className="mb-6">
        <h2 className="mb-2 text-xl font-semibold">Effective Date</h2>
        <p>Effective Date: October 10, 2020</p>
      </section>

      {/* Commitment to Privacy */}
      <section className="mb-6">
        <h2 className="mb-2 text-xl font-semibold">Commitment to Privacy</h2>
        <p>
          Cyberoni (``we,`` ``us,`` or ``our``) is committed to protecting your
          privacy. This policy outlines how we handle your personal information
          to ensure its security and confidentiality.
        </p>
      </section>

      {/* Information We Collect */}
      <section className="mb-6">
        <h2 className="mb-2 text-xl font-semibold">Information We Collect</h2>
        <p>
          Personal Information: We collect personal details such as your name,
          email address, postal address, phone number, and payment information
          only when you provide them to us voluntarily.
        </p>
        <p>
          Usage Data: We automatically gather data regarding your interactions
          with our website to improve functionality and user experience.
        </p>
        <p>
          Cookies and Tracking Technologies: We deploy cookies and similar
          tracking technologies to enhance your interaction with our website,
          under strict compliance with privacy laws.
        </p>
      </section>

      {/* How We Use Your Information */}
      <section className="mb-6">
        <h2 className="mb-2 text-xl font-semibold">
          How We Use Your Information
        </h2>
        <p>
          Providing Services: We use your personal information to deliver our
          services, process transactions, and maintain communication.
        </p>
        <p>
          Improving User Experience: We analyze usage data to better understand
          your preferences and refine our services.
        </p>
        <p>
          Marketing and Communication: With your explicit consent, we send
          promotional materials and updates.
        </p>
      </section>

      {/* Data Sharing and Disclosure */}
      <section className="mb-6">
        <h2 className="mb-2 text-xl font-semibold">
          Data Sharing and Disclosure
        </h2>
        <p>
          Third-Party Service Providers: We share your data with trusted third
          parties who assist us in operating our website, conducting our
          business, or servicing you, so long as those parties agree to keep
          this information confidential.
        </p>
        <p>
          Legal Compliance: We disclose your information where required by law
          and where necessary to protect our rights and safety.
        </p>
      </section>

      {/* Data Security */}
      <section className="mb-6">
        <h2 className="mb-2 text-xl font-semibold">Data Security</h2>
        <p>
          We employ reasonable precautions to safeguard your personal
          information from unauthorized access, use, or disclosure.
        </p>
      </section>

      {/* Your Choices */}
      <section className="mb-6">
        <h2 className="mb-2 text-xl font-semibold">Your Choices</h2>
        <p>
          Opt-Out: You can opt out of receiving marketing communications from us
          at any time by following the unsubscribe instructions provided in
          those communications.
        </p>
        <p>
          Access and Correction: You have the right to access, correct, or
          request deletion of your personal information at any time.
        </p>
      </section>

      {/* Children’s Privacy */}
      <section className="mb-6">
        <h2 className="mb-2 text-xl font-semibold">Children’s Privacy</h2>
        <p>
          Our services are not directed to children under the age of 13. We do
          not knowingly collect personal information from children under this
          age.
        </p>
      </section>

      {/* Changes to this Privacy Policy */}
      <section className="mb-6">
        <h2 className="mb-2 text-xl font-semibold">
          Changes to this Privacy Policy
        </h2>
        <p>
          We may modify this Privacy Policy occasionally to reflect changes to
          our practices or for other operational, legal, or regulatory reasons.
        </p>
      </section>

      {/* Contact Us */}
      <section className="mb-6">
        <h2 className="mb-2 text-xl font-semibold">Contact Us</h2>
        <p>
          If you have any questions or concerns about this Privacy Policy or our
          handling of your information, please contact us at
          support@cybershoptech.com.
        </p>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
