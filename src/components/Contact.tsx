import { MdArrowOutward, MdCopyright } from "react-icons/md";
import "./styles/Contact.css";

const Contact = () => {
  return (
    <div className="contact-section section-container" id="contact">
      <div className="contact-container">
        <h3>Contact</h3>
        <div className="contact-flex">
          <div className="contact-box">
            <h4>Connect</h4>
            <p>
              <a
                href="mailto:gshreyasshetty@gmail.com"
                target="_blank"
                rel="noreferrer"
                data-cursor="disable"
              >
                gshreyasshetty@gmail.com
              </a>
            </p>
            <p>
              <a
                href="https://www.linkedin.com/in/gshreyasshetty/"
                target="_blank"
                rel="noreferrer"
                data-cursor="disable"
              >
                LinkedIn — gshreyasshetty
              </a>
            </p>
            <h4>Education</h4>
            <p>
              B.E. Computer Science & Engineering (Data Science),
              New Horizon College of Engineering, Bengaluru — 2022–2026 | CGPA: 9.25
            </p>
          </div>
          <div className="contact-box">
            <h4>Social</h4>
            <a
              href="https://github.com/gshreyasshetty"
              target="_blank"
              rel="noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              GitHub <MdArrowOutward />
            </a>
            <a
              href="https://www.linkedin.com/in/gshreyasshetty/"
              target="_blank"
              rel="noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              LinkedIn <MdArrowOutward />
            </a>
          </div>
          <div className="contact-box">
            <h5>
              <MdCopyright /> 2026
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
