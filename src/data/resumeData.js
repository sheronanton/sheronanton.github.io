// Source: Infant Antony Sheron S - CV.pdf, plus personal details already entered by you.
// The headline, city, GitHub URL, and selected phone number preserve your existing values.
// The CV lists the MACCS Innovations role as Software Developer.
// You subsequently confirmed BCT Consulting Private Limited as your current employer.
// Java, Spring Boot, and React were subsequently confirmed as your priority skills.
// Missing optional facts use empty values; empty arrays hide unsupported sections.
export const resumeData = {
  personal: {
    name: 'INFANT ANTONY SHERON S',
    title: 'Senior Software Engineer',
    location: 'Chennai, India',
    email: 'sheronanton@gmail.com',
    phone: '9344408399', // Optional: only add a number you want to publish.
    linkedin: 'https://www.linkedin.com/in/infantantonysherons/',
    github: 'https://github.com/sheronanton',
    website: 'https://sheronanton.github.io/',
    profileImage: 'profile-black-suit.jpg',
    resumeFile: 'resume.pdf',
    socialImage: 'og-image.png',
  },
  introduction: 'My core stack is Java, Spring Boot, and React. I also work with SQL, Oracle, and PostgreSQL on reporting, database migration, and application maintenance.',
  summary: 'I’m a Senior Software Engineer at BCT Consulting Private Limited, working on full-stack development, database migration, and SQL queries. My core stack is Java, Spring Boot, and React, with experience in SQL-based reporting and application maintenance. My work at MACCS Innovations includes developing and optimizing SQL queries and stored procedures for daily reporting across millions of records, and migrating a database from Oracle to PostgreSQL. My experience also includes mentoring junior team members through code reviews, technical guidance, and onboarding, as well as requirements analysis, bug fixes, refactoring, and feature enhancements.',
  resumeSummary: 'Senior Software Engineer focused on full-stack development with Java, Spring Boot, and React. Experience generating 30+ daily reports across millions of records, migrating an Oracle database to PostgreSQL, and mentoring 3 junior team members. Current work includes application features, database migration, SQL optimization, and code refactoring at BCT Consulting Private Limited.',
  featuredStack: ['Java', 'Spring Boot', 'React', 'PostgreSQL'],
  skills: {
    languages: ['Java', 'SQL'],
    backend: ['Spring Boot', 'Stored procedures', 'Report generation'],
    frontend: ['React'],
    databases: ['Oracle', 'PostgreSQL'],
    tools: [], // No development tools are named in the CV.
    concepts: ['Database migration', 'Schema conversion', 'Performance tuning', 'System validation', 'Requirements analysis', 'Code refactoring'],
    interpersonal: ['Problem solving', 'Logical thinking', 'Team mentorship', 'Code reviews', 'Technical guidance', 'Onboarding support'],
  },
  experience: [
    {
      company: 'BCT Consulting Private Limited', role: 'Senior Software Engineer',
      location: '', startDate: '16 Jun 2026', endDate: 'Present',
      description: [
        'Develop and maintain full-stack application features using Java, Spring Boot, and React.',
        'Work on database migration, including schema updates, data transfer, and migration validation.',
        'Write and optimize SQL queries to support application data access and performance.',
        'Analyze requirements and implement feature enhancements across the application stack.',
        'Investigate application defects, fix bugs, and refactor code to support maintainability.',
        'Validate application changes and migrated data for functional correctness and data consistency.',
      ],
      resumeDescription: [
        'Develop full-stack application features with Java, Spring Boot, and React, translating requirements into backend and frontend enhancements.',
        'Support database migration through schema updates, data transfer, and validation of migrated data for functional correctness and consistency.',
        'Write and optimize SQL queries for application data access and performance.',
        'Investigate application defects, fix bugs, and refactor code to improve maintainability.',
      ],
      technologies: ['Java', 'Spring Boot', 'React', 'SQL'],
    },
    {
      company: 'MACCS Innovations', role: 'Software Developer',
      location: '', startDate: '21 Jan 2022', endDate: '15 Jun 2026', // End date confirmed by you.
      description: [
        'Developed and optimized SQL queries and stored procedures to support the daily generation of 30+ reports on millions of records, ensuring high performance and reliability.',
        'Mentored 3 junior team members through regular code reviews, technical guidance, and onboarding support.',
        'Migrated a database from Oracle to PostgreSQL, handling schema conversion, performance tuning, data migration, and system validation with minimal downtime.',
        'Contributed to requirements analysis, bug fixes, code refactoring, and feature enhancements to improve application stability and performance.',
      ],
      resumeDescription: [
        'Developed and optimized SQL queries and stored procedures to generate 30+ daily reports across millions of records.',
        'Migrated an Oracle database to PostgreSQL, covering schema conversion, data migration, performance tuning, and system validation with minimal downtime.',
        'Mentored 3 junior team members through code reviews, technical guidance, and onboarding.',
        'Supported requirements analysis, bug fixes, refactoring, and feature enhancements to improve application stability and performance.',
      ],
      technologies: ['Java', 'SQL', 'Oracle', 'PostgreSQL', 'Stored procedures'],
    },
    {
      company: 'Shalom Happy Home Constructions', role: 'Software Maintenance',
      location: '', startDate: '03 May 2018', endDate: '20 Dec 2020',
      description: ['Maintained the website and software.', 'Provided updates required by the application.'],
      resumeDescription: ['Maintained and updated the company website and software to support application requirements.'],
      technologies: ['HTML', 'CSS', 'JavaScript'], // The CV does not name technologies for this role.
    },
  ],
  projects: [], // The CV does not provide separate named projects or project URLs.
  education: [
    {
      degree: 'Bachelor of Engineering in Electronics and Telecommunication',
      institution: 'Sathyabama University', location: '',
      startYear: '2013', endYear: '2017', details: 'GPA: 6.4',
    },
    {
      degree: 'Higher Secondary', institution: 'BMC Matriculation Higher Secondary School',
      location: 'Thoothukudi', startYear: '2012', endYear: '2013', details: 'Percentage: 81.5%',
    },
    {
      degree: 'Secondary School (Xth Grade)', institution: 'IIPE Laxmi Raman Matric Higher Secondary School',
      location: 'Tirunelveli', startYear: '2010', endYear: '2011', details: 'Percentage: 84.6%',
    },
  ],
  certifications: [], // No certifications are listed in the CV.
  achievements: [], // Contributions are included with their corresponding work experience.
};

export const isPlaceholder = (value) => typeof value === 'string' && /^\[(REPLACE|OPTIONAL)/.test(value.trim());
export const hasValue = (value) => typeof value === 'string' && value.trim() !== '' && !isPlaceholder(value);
export const isWebUrl = (value) => {
  if (!hasValue(value)) return false;
  try { return ['https:', 'http:'].includes(new URL(value).protocol); } catch { return false; }
};
