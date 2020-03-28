// Objects
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

// NPM Module
const inquirer = require("inquirer");
const fs = require("fs");
const render = require('./lib/htmlRenderer.js')

const managerQuestion = [{
    'type': 'input',
    'message': "What is the manager's name",
    'name': 'managerName'
}, {
    'type': 'input',
    'message': "What is the manager's ID",
    'name': 'managerID'
},
{
    'type': 'input',
    'message': "What is the manager's email",
    'name': 'managerEmail'
},{
    'type': 'input',
    'message': "What is the manager's office number",
    'name': 'managerNumber'
}]

const engineerQuestion = [{
    'type': 'input',
    'message': "What is the engineer's name",
    'name': 'engineerName'
}, {
    'type': 'input',
    'message': "What is the engineer's ID",
    'name': 'engineerID'
},
{
    'type': 'input',
    'message': "What is the engineer 's email",
    'name': 'engineerEmail'
},{
    'type': 'input',
    'message': "What is the engineer's github",
    'name': 'engineerGit'
}]
const internQuestion = [{
    'type': 'input',
    'message': "What is the intern's name",
    'name': 'internName'
}, {
    'type': 'input',
    'message': "What is the intern's ID",
    'name': 'internID'
},
{
    'type': 'input',
    'message': "What is the intern's email",
    'name': 'internEmail'
},{
    'type': 'input',
    'message': "What is the intern's school",
    'name': 'internSchool'
}]

const introductoryQuestion = [{
    'type': 'input',
    'message': "What is the name of your project?",
    'name': 'nameOfProject'
}, {
    'type': 'rawlist',
    'message': "How many engineers are there on your team?",
    'name': 'engineers',
    'choices': [1,2,3,4,5]
},{
    'type': 'rawlist',
    'message': "How many interns are there on your team?",
    'name': 'interns',
    'choices': [1,2,3,4,5]
}]
const employees = [] // Contains all objects 
    
const start = async () => {

    const basicInfo = await inquirer.prompt(introductoryQuestion)

    const m = await inquirer.prompt(managerQuestion) // Only 1 so no problem 
    const manager = new Manager(m.managerName,m.managerID,m.managerEmail,m.managerNumber)
    employees.push(manager)

    // Basic information
    const projectName = basicInfo.nameOfProject
    const numberOfEngineer = basicInfo.engineers
    const numberOfIntern = basicInfo.interns

    // Add Engineer and Intern into Employees array
    await addEngineer(numberOfEngineer)
    await addIntern(numberOfIntern)

    // Pass them into render
    const html = render(employees, projectName)

    // Write it into a file and finished
    fs.writeFileSync('./output/team.html', html, (e) => {
        if(e) throw e 
    })
}

start()

const addEngineer = async (number) => {

    for(let i = 0; i < number; i++){
        let e = await inquirer.prompt(engineerQuestion)
        let engineer = new Engineer(e.engineerName,e.engineerID,e.engineerEmail,e.engineerGit)
        employees.push(engineer)
    }
}

const addIntern = async (number) => {
    for(let j = 0; j < number; j++){
        let i = await inquirer.prompt(internQuestion)
        let intern = new Intern(i.internName,i.internID,i.internEmail,i.internSchool)

        employees.push(intern)
    }
}
