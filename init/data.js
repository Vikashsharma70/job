const sampleListings = [
  {
    title: ["Frontend Developer", "React Developer"],
    company: "Tech Solutions Inc.",
    location: ["New York", "Remote"],
    requirements: ["HTML", "CSS", "React", "JavaScript"],
    stipend: "Paid",
    technology: ["React", "JavaScript", "CSS", "HTML"],
    applyLink: "http://example.com/apply/frontend-dev",
    postedDate: new Date(),
    deadline: new Date("2025-03-15")
  },
  {
    title: ["Backend Developer", "Node.js Developer"],
    company: "Web Builders Co.",
    location: ["San Francisco", "Remote"],
    requirements: ["Node.js", "Express", "MongoDB", "JavaScript"],
    stipend: "Paid",
    technology: ["Node.js", "Express", "MongoDB", "JavaScript"],
    applyLink: "http://example.com/apply/backend-dev",
    postedDate: new Date(),
    deadline: new Date("2025-04-01")
  },
  {
    title: ["Full Stack Developer", "Web Developer"],
    company: "Global Tech Ltd.",
    location: ["London", "Remote"],
    requirements: ["React", "Node.js", "MongoDB", "HTML", "CSS"],
    stipend: "Paid",
    technology: ["React", "Node.js", "MongoDB", "HTML", "CSS"],
    applyLink: "http://example.com/apply/fullstack-dev",
    postedDate: new Date(),
    deadline: new Date("2025-02-28")
  },
  {
    title: ["Data Scientist", "AI Engineer"],
    company: "DataScience Lab",
    location: ["Berlin", "Remote"],
    requirements: ["Python", "Machine Learning", "TensorFlow", "Pandas"],
    stipend: "Paid",
    technology: ["Python", "TensorFlow", "Machine Learning"],
    applyLink: "http://example.com/apply/data-scientist",
    postedDate: new Date(),
    deadline: new Date("2025-04-10")
  },
  {
    title: ["Mobile App Developer", "iOS Developer"],
    company: "Smart Apps Studio",
    location: ["Los Angeles", "Remote"],
    requirements: ["Swift", "Xcode", "iOS"],
    stipend: "Paid",
    technology: ["Swift", "iOS", "Xcode"],
    applyLink: "http://example.com/apply/mobile-dev",
    postedDate: new Date(),
    deadline: new Date("2025-03-25")
  },
  {
    title: ["UX/UI Designer"],
    company: "DesignWorks",
    location: ["San Francisco", "Remote"],
    requirements: ["Figma", "Adobe XD", "Wireframing", "Prototyping"],
    stipend: "Paid",
    technology: ["Figma", "Adobe XD", "Wireframing", "Prototyping"],
    applyLink: "http://example.com/apply/ux-ui-designer",
    postedDate: new Date(),
    deadline: new Date("2025-05-01")
  },
  {
    title: ["DevOps Engineer"],
    company: "Cloudify",
    location: ["Chicago", "Remote"],
    requirements: ["AWS", "Docker", "CI/CD", "Linux"],
    stipend: "Paid",
    technology: ["AWS", "Docker", "Linux", "CI/CD"],
    applyLink: "http://example.com/apply/devops-engineer",
    postedDate: new Date(),
    deadline: new Date("2025-03-30")
  },
  {
    title: ["Software Engineer", "Java Developer"],
    company: "CodeMax",
    location: ["Austin", "Remote"],
    requirements: ["Java", "Spring Boot", "Hibernate", "MySQL"],
    stipend: "Paid",
    technology: ["Java", "Spring Boot", "Hibernate", "MySQL"],
    applyLink: "http://example.com/apply/software-engineer",
    postedDate: new Date(),
    deadline: new Date("2025-04-15")
  },
  {
    title: ["Product Manager"],
    company: "Tech Innovations",
    location: ["Toronto", "Remote"],
    requirements: ["Agile", "Product Roadmaps", "User Stories"],
    stipend: "Paid",
    technology: ["Agile", "Product Management", "Jira"],
    applyLink: "http://example.com/apply/product-manager",
    postedDate: new Date(),
    deadline: new Date("2025-04-20")
  },
  {
    title: ["QA Tester", "Quality Assurance Engineer"],
    company: "SoftTest Solutions",
    location: ["Vancouver", "Remote"],
    requirements: ["Automation Testing", "Selenium", "JavaScript", "Jest"],
    stipend: "Paid",
    technology: ["Selenium", "JavaScript", "Jest", "Test Automation"],
    applyLink: "http://example.com/apply/qa-tester",
    postedDate: new Date(),
    deadline: new Date("2025-03-10")
  },
  {
    title: ["Cybersecurity Analyst"],
    company: "SecureTech Solutions",
    location: ["Sydney", "Remote"],
    requirements: ["Network Security", "Firewalls", "Penetration Testing"],
    stipend: "Paid",
    technology: ["Penetration Testing", "Network Security", "Firewalls"],
    applyLink: "http://example.com/apply/cybersecurity-analyst",
    postedDate: new Date(),
    deadline: new Date("2025-03-05")
  },
  {
    title: ["Blockchain Developer"],
    company: "CryptoTech Labs",
    location: ["Singapore", "Remote"],
    requirements: ["Blockchain", "Ethereum", "Solidity", "Web3"],
    stipend: "Paid",
    technology: ["Blockchain", "Ethereum", "Solidity", "Web3"],
    applyLink: "http://example.com/apply/blockchain-developer",
    postedDate: new Date(),
    deadline: new Date("2025-03-25")
  },
  {
    title: ["Cloud Architect"],
    company: "CloudMasters",
    location: ["Seattle", "Remote"],
    requirements: ["AWS", "Azure", "GCP", "Cloud Solutions"],
    stipend: "Paid",
    technology: ["AWS", "Azure", "GCP", "Cloud Solutions"],
    applyLink: "http://example.com/apply/cloud-architect",
    postedDate: new Date(),
    deadline: new Date("2025-04-01")
  },
  {
    title: ["Database Administrator"],
    company: "DB Solutions",
    location: ["New York", "Remote"],
    requirements: ["MySQL", "PostgreSQL", "Database Optimization"],
    stipend: "Paid",
    technology: ["MySQL", "PostgreSQL", "Database Optimization"],
    applyLink: "http://example.com/apply/db-admin",
    postedDate: new Date(),
    deadline: new Date("2025-03-18")
  }
];

module.exports = {data: sampleListings};
