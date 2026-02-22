const express = require("express");
const path = require("path");
const { engine } = require("express-handlebars");

const app = express();

// Handlebars engine
app.engine(
  "hbs",
  engine({
    extname: "hbs",
    defaultLayout: "main",
    layoutsDir: path.join(__dirname, "views", "layouts"),
    partialsDir: path.join(__dirname, "views", "partials"),
    helpers: {
      uppercase: (str) => (str ? String(str).toUpperCase() : ""),
      year: () => new Date().getFullYear(),
      eq: (a, b) => a === b
    }
  })
);

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

// Route
app.get("/", (req, res) => {
  // context: object passed into Handlebars
  const resume = {
    name: "Norint Ros",
    title: "Computer Science Student",
    location: "Phnom Penh, Cambodia",
    email: "ros.norint@gmail.com",
    phone: "+855 97 322 4587",
    website: "github.com/NorintRos",
    summary:
      "working and learning full-stack application; also interested in cloud engineering and cloud solutions",

    openToWork: true,

    skills: ["JavaScript", "Node.js", "Express", "SQL", "React", "C++"],

    experience: [
      {
        role: "Intern",
        company: "Ministry of Public Work and Transports",
        period: "2025",
        highlights: [
          "Built a demo for driver license analytics dashboard",
        ]
      }
    ],

    education: [
      {
        school: "American University of Phnom Penh",
        degree: "B.S. in Computer Science",
        period: "2022 – 2026 (expected)"
      }
    ],

    projects: [
      {
        name: "Driver License Analytics Dashboard Demo for MPWT",
        tech: ["React", "Vite", "MUI"],
        featured: false
      },
      {
        name: "Library Management System",
        tech: ["Express", "React", "PostgreSQL"],
        featured: false
      }
    ]
  };

  res.render("home", {
    pageTitle: "Resume",
    resume
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Running on http://localhost:${PORT}`));