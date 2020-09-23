// Temp - notes variable
const myNotes = [
    {
        Title: "",
        Note: "Add the \"Start\" script to the scripts object in package.json with \"nodemon\" specified, then use 'npm start' to start the server."
    },
    {
        Title: "",
        Note: "Use .gitignore to remove the node_modules folder from your project, use npm install to initialize dependencies from new workspace."
    },
    {
        Title: "",
        Note: "Next step is to dynamically populate the Navbar and fix the .active class assignment."
    },
    {
        Title: "",
        Note: "Use ../ in front of handlebars variables to access the parent scope outside of #each statements."
    },
    {
        Title: "",
        Note: "Next: configure MongoDB. Also, add date fields to my notes to make it obvious they are just a log of what I struggled with."
    },
    {
        Title: "",
        Note: "Ctril + K + C, to comment out block. Ctrl + K + U to un-comment."
    },
    {
        Title: "",
        Note: "The name of your database model should be the singular version of your (pluralized) collection name. For example, if your collection is named 'notes' the model should be named 'Note'. This is how Mongoose automatically correlates models to collections."
    },
];

const navbar = [
    {
        url: '/',
        name: 'Home',
    },
    {
        url: '/about',
        name: 'About',
    },
    {
        url: '/notes',
        name: 'My Notes',
    },
]

module.exports = {
    myNotes, 
    navbar
}