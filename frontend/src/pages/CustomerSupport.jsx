import React from "react";

const CustomerSupport = ({ onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">

        {/* HEADER */}
        <div className="modal-header">
          <h2>BYAHERO — CUSTOMER SUPPORT POLICY</h2>
        </div>

        {/* BODY */}
        <div className="modal-body">
          
          <p>
            <strong>1. Introduction</strong><br />
            Byahero is committed to providing fast, friendly, and reliable customer support
            to ensure a smooth and satisfying booking experience. This policy explains how we
            assist passengers, operators, and users when they encounter issues.
          </p>

          <p>
            <strong>2. Support Objectives</strong><br />
            Our goal is to:<br />
            • Provide clear assistance for booking concerns.<br />
            • Resolve issues quickly and efficiently.<br />
            • Maintain respectful communication at all times.<br />
            • Collect feedback to improve the system.
          </p>

          <p>
            <strong>3. Support Coverage</strong>
          </p>

          <p>
            <em>A. Account Assistance</em><br />
            - Help with account creation, login, and password recovery.<br />
            - Updating account details such as email or contact number.
          </p>

          <p>
            <em>B. Booking and Trip Concerns</em><br />
            - Assistance with booking confirmation and seat availability.<br />
            - Guide on cancellations, rebooking, and refund requests.
          </p>

          <p>
            <em>C. Payment Inquiries (if applicable)</em><br />
            - Questions about payment confirmation or failed transactions.<br />
            - Verification of receipts and booking records.
          </p>

          <p>
            <em>D. Technical Support</em><br />
            - Troubleshooting website or app errors.<br />
            - Reporting bugs or system glitches.
          </p>

          <p>
            <strong>4. Support Channels</strong><br />
            Customers may contact Byahero Support through:<br />
            📧 Email: byahero.support@gmail.com<br />
            📞 Hotline (Operator Use): +63 900 123 4567<br />
            💬 In-App Messaging (Coming Soon)
          </p>

          <p><strong>5. Response and Resolution Time</strong></p>

          <table border="1" cellPadding="6">
            <thead>
              <tr>
                <th>Type of Inquiry</th>
                <th>Response Time</th>
                <th>Resolution Time</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>General inquiries</td>
                <td>Within 24 hours</td>
                <td>1–2 business days</td>
              </tr>
              <tr>
                <td>Payment concerns</td>
                <td>Within 12 hours</td>
                <td>1–3 business days</td>
              </tr>
              <tr>
                <td>Technical/system errors</td>
                <td>Within 12 hours</td>
                <td>2–5 business days</td>
              </tr>
            </tbody>
          </table>

          <p>
            <strong>6. Customer Responsibilities</strong><br />
            • Provide accurate information about the issue.<br />
            • Include booking reference numbers/screenshots when needed.<br />
            • Remain respectful toward support staff.<br />
            • Check email or notifications for updates.
          </p>

          <p>
            <strong>7. Escalation Procedure</strong><br />
            - Unresolved concerns are forwarded to a Support Supervisor.<br />
            - System-related problems go to the Development Team.<br />
            - Operator disputes involve the Transport Partner Management team.
          </p>

          <p>
            <strong>8. Feedback and Suggestions</strong><br />
            Send your feedback to <em>byahero.feedback@samplemail.com</em>.
          </p>

          <p>
            <strong>9. Privacy and Confidentiality</strong><br />
            All inquiries are confidential. Personal information is used only for resolving support cases.
          </p>

          <p>
            <strong>10. Commitment to Service</strong><br />
            Byahero is committed to resolving issues professionally, quickly, and with customer satisfaction in mind.
          </p>

        </div>

        {/* CLOSE BUTTON */}
        <button onClick={onClose} className="close-btn">
          Close
        </button>

      </div>
    </div>
  );
};

export default CustomerSupport;