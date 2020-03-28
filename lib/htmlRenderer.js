const path = require("path");
const fs = require("fs");
const Manager = require("./Manager");
const Engineer = require("./Engineer");
const Intern = require("./Intern");

const templatesDir = path.resolve(__dirname, "../templates");

const render = (employees, projectName) => {
  // const html = []; // An array of template

  const htmlM = []  
  const htmlE = []
  const htmlI = []

  htmlM.push(employees
    .filter(employee => employee.getRole() === "Manager")
    .map(manager => renderManager(manager))
  );

  htmlE.push(employees
    .filter(employee => employee.getRole() === "Engineer")
    .map(engineer => renderEngineer(engineer))
  );


  htmlI.push(employees
    .filter(employee => employee.getRole() === "Intern")
    .map(intern => renderIntern(intern))
  );

  return renderMain(htmlM[0].join(" "), htmlE[0].join(" "), htmlI[0].join(" "), projectName); // Join that into a TEMPLATE
 
};

const renderManager = manager => {
  let template = fs.readFileSync(path.resolve(templatesDir, "manager.html"), "utf8");
  template = replacePlaceholders(template, "name", manager.getName());
  template = replacePlaceholders(template, "role", manager.getRole());
  template = replacePlaceholders(template, "email", manager.getEmail());
  template = replacePlaceholders(template, "id", manager.getId());
  template = replacePlaceholders(template, "officeNumber", manager.getOfficeNumber());
  return template;
};

const renderEngineer = engineer => {
  let template = fs.readFileSync(path.resolve(templatesDir, "engineer.html"), "utf8");
  template = replacePlaceholders(template, "name", engineer.getName());
  template = replacePlaceholders(template, "role", engineer.getRole());
  template = replacePlaceholders(template, "email", engineer.getEmail());
  template = replacePlaceholders(template, "id", engineer.getId());
  template = replacePlaceholders(template, "github", engineer.getGithub());
  return template;
};

const renderIntern = intern => {
  let template = fs.readFileSync(path.resolve(templatesDir, "intern.html"), "utf8");
  template = replacePlaceholders(template, "name", intern.getName());
  template = replacePlaceholders(template, "role", intern.getRole());
  template = replacePlaceholders(template, "email", intern.getEmail());
  template = replacePlaceholders(template, "id", intern.getId());
  template = replacePlaceholders(template, "school", intern.getSchool());
  return template;
};

// Final one
const renderMain = (htmlM, htmlE, htmlI, projectName) => {
  const template = fs.readFileSync(path.resolve(templatesDir, "main.html"), "utf8"); // Main template

  const templateWithManager = replacePlaceholders(template, "manager", htmlM); // This shuold be the new template with team filled 
  const templateWithEngineer = replacePlaceholders(templateWithManager, "engineer", htmlE);
  const templateWithIntern = replacePlaceholders(templateWithEngineer, "intern", htmlI);
  const finalTemplate = replacePlaceholders(templateWithIntern, "Project's name", projectName);

  return finalTemplate //  need to return a TEMPLATE in HTML
};

const replacePlaceholders = (template, placeholder, value) => {
  const pattern = new RegExp("{{ " + placeholder + " }}", "gm");
  new RegExp()
  return template.replace(pattern, value);
};

module.exports = render;
