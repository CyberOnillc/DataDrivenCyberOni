import React from "react";

const GPTPrivacyPolicy: React.FC = () => {
  const companyName = "CyberOni LLC"; // Replace placeholder with actual company/product name
  const lastUpdated = "4/15/2024"; // Replace placeholder with the actual last updated date

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-center text-2xl font-bold">
        {companyName} Privacy Policy
      </h1>

      {/* Last Updated */}
      <section className="mb-6">
        <h2 className="mb-2 text-xl font-semibold">Last Updated</h2>
        <p>{lastUpdated}</p>
      </section>

      {/* Introduction */}
      <section className="mb-6">
        <h2 className="mb-2 text-xl font-semibold">Introduction</h2>
        <p>
          Welcome to {companyName}. This Privacy Policy outlines our commitments
          and your rights regarding the collection, use, and protection of your
          personal information. It applies to all services and products offered
          by {companyName}.
        </p>
      </section>

      {/* Information Collection */}
      <section className="mb-6">
        <h2 className="mb-2 text-xl font-semibold">Information Collection</h2>
        <p>What We Collect:</p>
        <ul>
          <li>
            We collect information necessary to provide our services, such as
            queries and interaction data with our ChatGPT assistant.
          </li>
          <li>
            We do not collect personal identification information unless
            voluntarily provided by you for specific services.
          </li>
        </ul>
        <p>How We Collect:</p>
        <p>
          Information is collected through your interaction with our services
          and voluntary disclosures.
        </p>
      </section>

      {/* Use of Information */}
      <section className="mb-6">
        <h2 className="mb-2 text-xl font-semibold">Use of Information</h2>
        <p>
          The information collected is solely used for providing and improving
          our services.
        </p>
        <p>We do not use your data for profiling or targeted advertising.</p>
        <p>
          {companyName} does not collect, share, nor use personally identifiable
          data in any way. All interactions with our services are subject to
          OpenAI’s privacy policy and OpenAI’s terms of use.
        </p>
      </section>

      {/* Data Sharing and Disclosure */}
      <section className="mb-6">
        <h2 className="mb-2 text-xl font-semibold">
          Data Sharing and Disclosure
        </h2>
        <p>
          {companyName} does not share any user information with third parties.
        </p>
        <p>
          We do not disclose user information publicly or to any external
          entities, except as required by law.
        </p>
      </section>

      {/* Data Retention and Deletion */}
      <section className="mb-6">
        <h2 className="mb-2 text-xl font-semibold">
          Data Retention and Deletion
        </h2>
        <p>
          {companyName} does not hold any data persistently. All data is deleted
          immediately after the interaction or service provision.
        </p>
        <p>
          Users can request the deletion of any data they have voluntarily
          provided.
        </p>
      </section>

      {/* Data Security */}
      <section className="mb-6">
        <h2 className="mb-2 text-xl font-semibold">Data Security</h2>
        <p>
          We employ robust security measures to protect data from unauthorized
          access and misuse.
        </p>
        <p>
          Despite our efforts, no digital platform can guarantee absolute
          security.
        </p>
      </section>

      {/* User Rights and Control */}
      <section className="mb-6">
        <h2 className="mb-2 text-xl font-semibold">User Rights and Control</h2>
        <p>
          Users have the right to access and control any personal information
          provided to us.
        </p>
        <p>
          Requests for access, correction, or deletion of personal data can be
          made through our contact channels.
        </p>
      </section>

      {/* Changes to Our Privacy Policy */}
      <section className="mb-6">
        <h2 className="mb-2 text-xl font-semibold">
          Changes to Our Privacy Policy
        </h2>
        <p>
          We reserve the right to modify this privacy policy at any time.
          Changes will be posted on our website with an updated revision date.
        </p>
      </section>

      {/* Contact Us */}
      <section className="mb-6">
        <h2 className="mb-2 text-xl font-semibold">Contact Us</h2>
        <p>
          If you have any questions or concerns about our privacy practices,
          please contact us at [Provide Contact Information].
        </p>
      </section>
    </div>
  );
};

export default GPTPrivacyPolicy;
