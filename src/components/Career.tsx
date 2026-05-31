import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Data Engineer Intern</h4>
                <h5>Vontier</h5>
              </div>
              <h3>2025-2026</h3>
            </div>
            <p>
              Built automated ELT pipelines using Azure Functions and Blob Storage.
              Designed Snowflake Medallion Architecture (Bronze/Silver/Gold) for
              data transformation. Built Streamlit dashboards and developed agentic
              AI solutions using Snowflake Cortex.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>B.E. CSE (Data Science)</h4>
                <h5>NHCE, Bengaluru</h5>
              </div>
              <h3>2022–2026</h3>
            </div>
            <p>
              New Horizon College of Engineering, Bengaluru. CGPA: 9.25.
              Research paper co-authored (Scopus Indexed), patent published,
              multiple hackathon wins at national and state level.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
