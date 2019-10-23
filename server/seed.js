const mongoose = require('mongoose')
const Tag = require('./models/tag')
require('dotenv').config()
const MongoUrl = process.env.MONGO_CONNECT

mongoose.connect(MongoUrl, {
    useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false
}, function (err) {
    if (err) {
        console.log(err)
        console.log(`server isn't connect to mongodb`);
    }
    else {
        console.log('Connected!');
    }
})

tags = [
    {
        name: 'javascript',
        desc: `JavaScript (not to be confused with Java) is a high-level, dynamic, multi-paradigm, object-oriented, prototype-based, weakly-typed, and interpreted language used for both client-side and server-side scripting. Its primary use is in the rendering and manipulation of web pages. Use this tag for questions regarding ECMAScript and its various dialects/implementations (excluding ActionScript and Google-Apps-Script).`
    },
    {
        name: 'node.js',
        desc: `Node.js is an event-based, non-blocking, asynchronous I/O runtime that uses Google's V8 JavaScript engine and libuv library. It is used for developing applications that make heavy use of the ability to run JavaScript both on the client, as well as on server side and therefore benefit from the re-usability of code and the lack of context switching.`
    },
    {
        name: 'mongodb',
        desc: `MongoDB is a scalable, high-performance, open source, document-oriented NoSQL database. It supports a large number of languages and application development platforms. Questions about server administration can be asked on https://dba.stackexchange.com.`
    },
    {
        name: 'html',
        desc: `HTML (HyperText Markup Language) is the standard markup language used for structuring web pages and formatting content. HTML describes the structure of a website semantically along with cues for presentation, making it a markup language, rather than a programming language. HTML works in conjunction primarily with CSS and JavaScript, adding style and behavior to the pages. The most recent revision to the HTML specification is HTML5.2.`
    },
    {
        name: 'css',
        desc: `CSS (Cascading Style Sheets) is a representation style sheet language used for describing the look and formatting of HTML (HyperText Markup Language), XML (Extensible Markup Language) documents and SVG elements including (but not limited to) colours, layout, fonts, and animations. It also describes how elements should be rendered on screen, on paper, in speech, or on other media.`
    },
    {
        name: 'vue.js',
        desc: `Vue.js is an open-source, progressive Javascript framework for building user interfaces that aim to be incrementally adoptable. Vue.js is mainly used for front-end development and requires an intermediate level of HTML and CSS. Questions specific to version 2 of Vue.js should be tagged [vuejs2].`
    },
    {
        name: 'vue-component',
        desc: `Component is a powerful Vue feature that allows extending basic HTML elements to encapsulate reusable code`
    },
    {
        name: 'vuex',
        desc: `Vuex is a Flux-inspired Application Architecture for Vue.js.`
    },
    {
        name: 'vue-router',
        desc: `Vue Router is a routing library for single-page applications designed for use with the Vue.js framework.`
    },
    {
        name: 'vue-cli',
        desc: `Questions related to the use of vue-cli or the project templates created via vue-cli`
    },
    {
        name: 'reactjs',
        desc: `React (also known as React.js or ReactJS) is a JavaScript library for building user interfaces. It uses a declarative paradigm and aims to be both efficient and flexible.`
    },
    {
        name: 'react-native',
        desc: `React Native lets you build native mobile apps using React. The focus of React Native is on developer efficiency across all the platforms you care about - learn once, write anywhere.`
    },
    {
        name: 'react-redux',
        desc: `Official React bindings for Redux`
    },
    {
        name: 'mongoose',
        desc: `Mongoose is a MongoDB object modeling tool, or ODM (Object Document Mapper), written in JavaScript and designed to work in an asynchronous environment.`
    },
    {
        name: 'sequelize',
        desc: `The Sequelize library provides an ORM (Object-Relational-Mapper) for Node.js, written entirely in JavaScript. Provides easy mapping for MySQL, MariaDB, SQLite, PostgreSQL and SQL Server.`
    },
    {
        name: 'java',
        desc: `Java (not to be confused with JavaScript, JScript or JS) is a general-purpose, platform-independent, statically typed, object-oriented programming language designed to be used in conjunction with the Java Virtual Machine (JVM). "Java platform" is the name for a computing system that has installed tools for developing and running Java programs. Use this tag for questions referring to the Java programming language or Java platform tools.`
    },
    {
        name: 'php',
        desc: `PHP (PHP: Hypertext Preprocessor) is a widely used, high-level, dynamic, object-oriented and interpreted scripting language primarily designed for server-side web development.`
    },
    {
        name: 'python',
        desc: `Python is a multi-paradigm, dynamically typed, multipurpose programming language, designed to be quick (to learn, to use, and to understand), and to enforce a clean and uniform syntax. Two similar but incompatible versions of Python are commonly in use, Python 2.7 and 3.x. For version-specific Python questions, add the [python-2.7] or [python-3.x] tag. When using a Python variant or library (e.g. Jython, PyPy, Pandas, Numpy), please include it in the tags.`
    },
    {
        name: 'jquery',
        desc: `jQuery is a Javascript library, consider also adding the Javascript tag. jQuery is a popular cross-browser JavaScript library that facilitates Document Object Model (DOM) traversal, event handling, animations and AJAX interactions by minimizing the discrepancies across browsers. A question tagged jquery should be related to jquery, so jquery should be used by the code in question and at least jquery usage-related elements need to be in the question.`
    }
]


Tag.insertMany(tags)
    .then(data => {
        console.log(`Create Tag Success`);
    })
    .catch(err => {
        console.log(err);
    })
