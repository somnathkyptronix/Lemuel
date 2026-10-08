import React, { useState } from 'react';
import { SERVICE_OPTIONS, BUDGET_OPTIONS } from '../data/companyInfo';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    businessEmail: '',
    phone: '',
    company: '',
    service: '',
    budget: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
  const [serverError, setServerError] = useState('');

  const validate = () => {
    const errs = {};

    if (!formData.firstName.trim()) {
      errs.firstName = 'First name is required.';
    }

    if (!formData.lastName.trim()) {
      errs.lastName = 'Last name is required.';
    }

    if (!formData.businessEmail.trim()) {
      errs.businessEmail = 'Business email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.businessEmail.trim())) {
      errs.businessEmail = 'Please provide a valid email address.';
    }

    if (formData.phone.trim()) {
      const phoneClean = formData.phone.replace(/[\s\-\(\)\+]/g, '');
      if (!/^\d{7,15}$/.test(phoneClean)) {
        errs.phone = 'Please provide a valid phone number or leave blank.';
      }
    }

    if (!formData.service) {
      errs.service = 'Please select a service.';
    }

    if (!formData.message.trim()) {
      errs.message = 'Please provide a message describing your requirements.';
    } else if (formData.message.trim().length < 15) {
      errs.message = 'Message must be at least 15 characters long.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('loading');
    setServerError('');

    try {
      // Simulate realistic API request / endpoint call
      await new Promise((resolve) => setTimeout(resolve, 900));

      setStatus('success');
      setFormData({
        firstName: '',
        lastName: '',
        businessEmail: '',
        phone: '',
        company: '',
        service: '',
        budget: '',
        message: ''
      });
    } catch (err) {
      console.error(err);
      setStatus('error');
      setServerError('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="contact-form-container">
      {status === 'success' ? (
        <div className="form-success-card">
          <div className="form-success-badge">✓</div>
          <h3>Thank You — We'll Be in Touch.</h3>
          <p>
            Your request has been received. Our technical team will review your requirements and reach out shortly.
          </p>
          <button
            type="button"
            className="cta"
            onClick={() => setStatus('idle')}
            style={{ marginTop: '20px' }}
          >
            Submit Another Request →
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="contact-form" noValidate>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName">
                First Name <span className="req">*</span>
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Jane"
                className={errors.firstName ? 'has-error' : ''}
              />
              {errors.firstName && <span className="error-text">{errors.firstName}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="lastName">
                Last Name <span className="req">*</span>
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Doe"
                className={errors.lastName ? 'has-error' : ''}
              />
              {errors.lastName && <span className="error-text">{errors.lastName}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="businessEmail">
                Business Email <span className="req">*</span>
              </label>
              <input
                type="email"
                id="businessEmail"
                name="businessEmail"
                value={formData.businessEmail}
                onChange={handleChange}
                placeholder="jane@company.com"
                className={errors.businessEmail ? 'has-error' : ''}
              />
              {errors.businessEmail && <span className="error-text">{errors.businessEmail}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+1 (555) 000-0000"
                className={errors.phone ? 'has-error' : ''}
              />
              {errors.phone && <span className="error-text">{errors.phone}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="company">Company</label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Acme Corp"
              />
            </div>

            <div className="form-group">
              <label htmlFor="service">
                Service <span className="req">*</span>
              </label>
              <select
                id="service"
                name="service"
                value={formData.service}
                onChange={handleChange}
                className={errors.service ? 'has-error' : ''}
              >
                <option value="">Select a Service...</option>
                {SERVICE_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              {errors.service && <span className="error-text">{errors.service}</span>}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="budget">Budget</label>
            <select
              id="budget"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
            >
              <option value="">Select Budget Range (Optional)...</option>
              {BUDGET_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="message">
              Message <span className="req">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell us about your project, technical challenge or business requirements..."
              className={errors.message ? 'has-error' : ''}
            />
            {errors.message && <span className="error-text">{errors.message}</span>}
          </div>

          {status === 'error' && (
            <div className="form-alert form-alert--error">{serverError}</div>
          )}

          <button
            type="submit"
            className="cta cta--big form-submit-btn"
            disabled={status === 'loading'}
          >
            {status === 'loading' ? 'Sending Request...' : 'Send My Request →'}
          </button>
        </form>
      )}
    </div>
  );
}
