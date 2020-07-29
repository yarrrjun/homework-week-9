const inquirer = require("inquirer");
const fs = require("fs");
const axios = require("axios");

inquirer.prompt([
    {
        type: "input",
        message: "What is your GitHub username?",
        name: "username"
    },

    {
        type: "input",
        message: "What is your email address?",
        name: "email"
    },

    {
        type: "input",
        message: "What is the title of your project?",
        name: "projectTitle"
    },

    {
        type: "input",
        message: "Please write a short description of your project.",
        name: "description"
    },

    {
        type: "list",
        message: "What kind of license should your project have?",
        choices: ["EPL 1.0", "MIT", "APACHE 2.0", "GPL 3.0", "BSD 3", "None"],
        name: "license"
    },

    {
        type: "input",
        message: "What command should be run to install dependencies?",
        name: "dependencies",
        default: "npm i"
    },

    {
        type: "input",
        message: "What command should be run to run tests?",
        name: "tests",
        default: "npm test"
    },

    {
        type: "input",
        message: "What command does the user need to use to run the project?",
        name: "execute"
    },
    
    {
        type: "input",
        message: "What does the user need to know about contributing to the repo?",
        name: "contributing"
    }
]).then(function(answer) {
    
    
    if (answer.license === "EPL 1.0") {
        answer.license = "[![License](https://img.shields.io/badge/License-EPL%201.0-red.svg)](https://opensource.org/licenses/EPL-1.0)";
    }
    if (answer.license === "MIT") {
        answer.license = "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)";
    }
    if (answer.license === "APACHE 2.0") {
        answer.license = "[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)";
    }
    if (answer.license === "GPL 3.0") {
        answer.license = "[![License: GPL v3](https://img.shields.io/badge/License-GPL%20v3-blue.svg)](http://www.gnu.org/licenses/gpl-3.0)";
    }
    if (answer.license === "BSD 3") {
        answer.license = "[![License](https://img.shields.io/badge/License-BSD%203--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)";
    }

    
    const queryURL = `https://api.github.com/users/${answer.username}`;
    
    axios.get(queryURL).then(function(res) {
        let userImage = res.data.avatar_url;
        let userBlog = res.data.blog;
        let name = res.data.name;
        let githubURL = res.data.html_url;

        const data = getData(answer, name, githubURL, userImage,userBlog);

        fs.writeFile("README.md", data, function() {

        });
    })   
});


function getData({username, email, projectTitle, description, license, dependencies, tests, execute, contributing}, name, githubURL, userImage, userBlog) {

    return `
    
# ${projectTitle}
## Description
${description}
        
## Table of Contents
        
* [Installation](#installation)
        
* [Usage](#usage)
        
* [License](#license)
        
* [Contributing](#contributing)
        
* [Tests](#tests)
        
* [Questions](#questions)
        
## Installation
        
To install necessary dependencies, enter the following command:
        
\`\`\`
${dependencies}
\`\`\`
        
## Usage

To run the project, enter the following command:

\`\`\`
${execute}
\`\`\`
        
## License
${license}
        
## Contributing
        
${contributing}
## Tests
        
To run tests, run the following command:
        
\`\`\`
${tests}
\`\`\`
        
## Questions
![user profile image](${userImage})

For questions about the project contact ${name} at ${githubURL}, or directly at ${email}.

${name} can also be found at ${userBlog}
        
`;

}
