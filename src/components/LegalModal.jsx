import React from 'react';

export default function LegalModal({ isOpen, onClose, type }) {
  if (!isOpen) return null;

  const isPrivacy = type === 'privacy';
  const title = isPrivacy ? 'Privacy Policy' : 'Terms & Conditions';

  return (
    <div className="legal-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="legal-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="legal-modal-header">
          <h3>{title}</h3>
          <button className="legal-modal-close" onClick={onClose} aria-label="Close modal">
            ✕
          </button>
        </div>
        <div className="legal-modal-body">
          {isPrivacy ? (
            <>
              <p>
                <strong>Lemuel Technical Services INC</strong> respects your privacy and is committed to protecting your personal data. This privacy statement explains how we look after your data when you visit our website or engage our technical and IT consulting services.
              </p>
              <h4>1. Information We Collect</h4>
              <p>
                We may collect contact information (such as name, business email, phone number, and company name) that you provide voluntarily through our contact forms or service inquiries.
              </p>
              <h4>2. How We Use Your Information</h4>
              <p>
                We use this information exclusively to communicate with you regarding your service requests, provide technical proposals, deliver our services, and maintain our business relationship.
              </p>
              <h4>3. Data Security & Confidentiality</h4>
              <p>
                We employ industry-standard cybersecurity measures, encryption protocols, and technical access controls to protect all business data against unauthorized access or disclosure.
              </p>
            </>
          ) : (
            <>
              <p>
                These Terms &amp; Conditions govern the use of the <strong>Lemuel Technical Services INC</strong> website and the scope of technical services, IT consulting, cloud management, and software solutions provided.
              </p>
              <h4>1. Scope of Services</h4>
              <p>
                All technical solutions, cloud implementations, cybersecurity services, and managed IT engagements are governed by individual master service agreements (MSAs) and statements of work (SOWs).
              </p>
              <h4>2. Intellectual Property</h4>
              <p>
                All branding, website graphics, architecture, and proprietary materials remain the property of Lemuel Technical Services INC and its licensors.
              </p>
              <h4>3. Limitation of Liability</h4>
              <p>
                Lemuel Technical Services INC delivers solutions using industry best practices. Specific service uptime, warranties, and technical support SLAs are detailed within formal client service level agreements.
              </p>
            </>
          )}
        </div>
        <div className="legal-modal-footer">
          <button className="cta" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
