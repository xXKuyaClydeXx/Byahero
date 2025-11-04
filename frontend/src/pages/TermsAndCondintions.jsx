import React from "react";
import "../css/TermsAndConditions.css";

const TermsAndConditions = ({ onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>BYAHERO — TERMS AND CONDITIONS</h2>
        <div className="modal-body">
          <p><strong>1. Introduction</strong><br />
            Welcome to Byahero, an online booking platform developed for bus and van transportation. 
            By using this system, you agree to comply with and be bound by the following Terms and Conditions. 
            These terms govern the use of Byahero’s website and mobile application by passengers, drivers, and operators. 
            If you do not agree to these terms, you should not use the system.
          </p>

          <p><strong>2. Definition of Terms</strong><br />
            “Byahero” refers to the online booking system for bus and van transportation.<br />
            “User” refers to any person who uses the system, including passengers, drivers, and transport operators.<br />
            “Operator” refers to transportation companies or terminal managers registered in the system.<br />
            “Booking” refers to the reservation of a seat or trip made through the Byahero platform.<br />
            “System” refers to the web or mobile application used to access Byahero’s services.
          </p>

          <p><strong>3. Use of the System</strong><br />
            Users must create an account before making any booking or accessing certain features.<br />
            Users agree to provide accurate and up-to-date information during registration and booking.<br />
            The system must be used only for lawful purposes and in accordance with these Terms and Conditions.<br />
            Misuse of the system, such as providing false information or engaging in fraudulent bookings, may result in suspension or termination of the user account.
          </p>

          <p><strong>4. Booking and Payment</strong><br />
            All bookings made through Byahero are subject to seat availability and operator confirmation.<br />
            Operators reserve the right to modify schedules or cancel trips due to unforeseen circumstances (e.g., weather, maintenance, or operational issues).<br />
            Payment methods (if applicable) must be processed securely and are non-transferable once confirmed.<br />
            Booking details, including date, route, fare, and seat number, will be provided upon successful reservation.
          </p>

          <p><strong>5. Cancellations and Refunds</strong><br />
            Cancellation and refund policies are determined by each operator and will be displayed prior to booking confirmation.<br />
            Byahero is not liable for refunds resulting from cancellations initiated by operators or passengers.<br />
            Passengers must contact the respective operator for cancellation or refund requests.
          </p>

          <p><strong>6. Responsibilities of Users</strong><br />
            Passengers are responsible for verifying their trip details before travel.<br />
            Users must arrive at the terminal on or before the scheduled departure time.<br />
            Operators are responsible for ensuring the accuracy of schedules, seat availability, and trip updates in the system.<br />
            Drivers are responsible for updating seat availability and trip status as required by the system.
          </p>

          <p><strong>7. Data Privacy and Security</strong><br />
            Byahero collects and stores user information solely for the purpose of processing bookings and improving services.<br />
            Personal data will not be shared with third parties without user consent, except as required by law.<br />
            Users are responsible for keeping their login credentials confidential.<br />
            Byahero implements reasonable security measures to protect user data but does not guarantee absolute security against unauthorized access.
          </p>

          <p><strong>8. System Availability and Maintenance</strong><br />
            Byahero strives to ensure continuous access to its platform but does not guarantee uninterrupted or error-free operation.<br />
            Scheduled maintenance or system updates may temporarily affect access to services.<br />
            Byahero is not liable for any losses resulting from technical issues, downtime, or internet disruptions.
          </p>

          <p><strong>9. Limitation of Liability</strong><br />
            Byahero serves as a facilitator between passengers and operators. It does not own or operate any vehicles.<br />
            Byahero is not responsible for delays, accidents, loss of items, or any incident occurring during travel.<br />
            Users agree that Byahero, its developers, and partner institutions are not liable for any direct or indirect damages arising from the use of the system.
          </p>

          <p><strong>10. Intellectual Property</strong><br />
            All logos, designs, and content within the Byahero system are the intellectual property of the developers.<br />
            Unauthorized reproduction, modification, or distribution of the system’s content is strictly prohibited.
          </p>

          <p><strong>11. Amendments</strong><br />
            Byahero reserves the right to update or modify these Terms and Conditions at any time. Continued use of the system after such changes constitutes acceptance of the updated terms.
          </p>

          <p><strong>12. Governing Law</strong><br />
            These Terms and Conditions shall be governed by and interpreted in accordance with the laws of the Republic of the Philippines.
          </p>

          <p><strong>13. Contact Information</strong><br />
            For questions or concerns regarding these Terms and Conditions, contact us at 📧 byahero.support@gmail.com
          </p>
        </div>

        <button onClick={onClose} className="close-btn">
          Close
        </button>
      </div>
    </div>
  );
};

export default TermsAndConditions;
