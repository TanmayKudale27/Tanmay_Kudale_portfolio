// EDIT YOUR CONTENT HERE
export const profile = {
  name: "Tanmay Kudale",
  roles: ["Full-Stack Developer", "React Native Developer", "React.js Developer", "Node.js Developer"],
  headline: "I build mobile and web apps that feel fast.",
  intro:
    "Full-Stack Developer in Pune working with React.js, React Native and Node.js. I currently lead the frontend of Quadzy, a social app for college students.",
  email: "tanmaykudale2711@gmail.com",
  phone: "+91 8010422306",
  location: "Bhilarewadi, Pune, Maharashtra 411046",
  resume: "/Tanmay_Kudale.pdf",
  links: { GitHub: "", LinkedIn: "", Instagram: "" }, 
  stats: [
    { n: 5, s: "+", label: "production apps" },
    { n: 10, s: "K+", label: "active users" },
    { n: 40, s: "%", label: "smaller app bundle" },
  ],
};

export const about = [
  "I’m a full-stack developer with over a year of professional experience building and deploying web and mobile applications.",
  "I work across the stack: React and React Native on the front, Node.js and Express with MongoDB or MySQL on the back, and AWS and Firebase for cloud services.",
  "I care about reusable components, clean REST API integration, real-time features and performance. I’m also completing my Master of Computer Science in Pune.",
];

export const services = [
  { icon: "📱", title: "Mobile apps", text: "Cross-platform Android and iOS apps with React Native and Expo, push notifications and media uploads." },
  { icon: "🌐", title: "Web apps", text: "Responsive React.js interfaces with Redux, Material-UI and reusable components." },
  { icon: "⚙️", title: "APIs and backends", text: "Node.js and Express REST APIs with JWT, OAuth 2.0, MongoDB and MySQL." },
  { icon: "☁️", title: "Cloud setup", text: "AWS S3, EC2 and RDS, Firebase, and CI/CD with GitHub Actions." },
];

export const skills = {
  Languages: ["JavaScript (ES6+)", "PHP", "HTML5", "CSS3"],
  Frontend: ["React.js", "React Native (Expo)", "Redux", "Context API", "Material-UI", "NativeBase", "React Navigation", "Bootstrap"],
  Backend: ["Node.js", "Express.js", "REST APIs", "JWT", "OAuth 2.0", "Webhooks", "Session management"],
  Databases: ["MongoDB", "MySQL"],
  "Cloud & DevOps": ["AWS S3", "AWS EC2", "AWS RDS", "Firebase", "GitHub Actions", "Jenkins (basic)"],
  Tools: ["Git", "GitHub", "GitLab", "Postman", "VS Code", "MongoDB Compass", "Chrome DevTools", "npm", "yarn"],
  Practices: ["API integration and testing", "Performance optimisation", "Responsive design", "Cross-browser testing", "Agile/Scrum", "Technical documentation"],
};

export const experience = [
  {
    role: "Frontend Developer (React Native)",
    company: "Creintech Solutions, Pune",
    when: "July 2025 to present",
    points: [
      "Lead frontend development of Quadzy, a college social networking app, using React Native and Expo.",
      "Integrate and test REST APIs (Node.js, Express.js) with Postman for feeds, profiles and notifications.",
      "Built reusable UI components that keep the app fast.",
      "Shipped real-time features: live feed updates, Firebase push notifications and media streaming.",
      "Cut the app bundle size by 40% with code splitting and lazy loading.",
      "Manage app state with Redux and Context API.",
      "Added secure direct uploads to AWS S3 with presigned URLs and progress tracking.",
      "Handle errors and retries so the app stays dependable on weak networks.",
      "Work with a 4-member backend team in Agile sprints using Git and GitHub.",
    ],
  },
];

export const education = [
  { title: "Master of Computer Science", meta: "2025 to 2026 (pursuing)", text: "Savitribai Phule Pune University, Jaikranti College of Computer Science & Management Studies, Katraj, Pune" },
  { title: "Bachelor of Computer Science", meta: "2022 to 2024 · CGPA 7.06", text: "Savitribai Phule Pune University, AnantRao Thopate College, Bhor" },
  { title: "Full-Stack MERN Developer Course", meta: "OrangeItech, Pune", text: "REST API design, MongoDB schema design, JWT authentication and server-side architecture." },
];

// shown if the API/database is not available
export const fallbackProjects = [
  {
    _id: "quadzy",
    title: "Quadzy: college social media app",
    description:
      "A mobile social network for college students with a live feed, profiles and notifications. I lead the frontend, from component architecture to media uploads and performance.",
    features: [
      "Live feed updates and Firebase push notifications",
      "Direct media uploads to AWS S3 with progress tracking",
      "Redux and Context API state, with retry logic on failures",
      "40% smaller bundle through code splitting and lazy loading",
    ],
    tech: ["React Native", "Expo", "Redux", "Node.js", "Express.js", "MongoDB", "AWS S3", "Firebase"],
  },
];
