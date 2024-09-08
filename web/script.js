document.addEventListener('DOMContentLoaded', function () {
    const getChecklistBtn = document.getElementById('get-checklist-btn');
    const checklistDisplay = document.getElementById('checklist-display');
    const languageSelect = document.getElementById('language-select');
    const startTimerBtn = document.getElementById('start-timer-btn');
    const pauseTimerBtn = document.getElementById('pause-timer-btn'); // Pause Button
    const resetTimerBtn = document.getElementById('reset-timer-btn'); // Reset Button
    const timerDisplay = document.getElementById('timer-display');
    const timeInput = document.getElementById('time-input');
    const alarmSound = document.getElementById('alarm-sound');

    let countdown;
    let isPaused = false; // Flag to indicate if the timer is paused
    let timeLeft = 0; // Time remaining for the countdown

    // Checklists with estimated time to complete each item
    const learningPaths = {
        "Python": [
            { task: "1. Introduction to Python:", time: "30 mins" },
        { task: "   - Install Python and set up the environment (Windows, Mac, Linux).", time: "10 mins" },
        { task: "   - Learn how to run Python scripts using terminal/command line.", time: "20 mins" },
        { task: "2. Basic Syntax:", time: "45 mins" },
        { task: "   - Variables and data types (int, float, string, bool, None).", time: "15 mins" },
        { task: "   - Understand operators: arithmetic (+,-), comparison (==), and logical (and, or, not).", time: "15 mins" },
        { task: "   - Learn how to comment code (single-line, multi-line).", time: "5 mins" },
        { task: "3. Control Flow:", time: "40 mins" },
        { task: "   - Understand if-else statements and indentation.", time: "15 mins" },
        { task: "   - Learn about loops: for loops and while loops.", time: "25 mins" },
        { task: "   - Practice using break, continue, and pass.", time: "10 mins" },
        { task: "4. Functions:", time: "60 mins" },
        { task: "   - Define functions using def keyword and return values.", time: "20 mins" },
        { task: "   - Learn about function arguments (default, positional, keyword).", time: "20 mins" },
        { task: "   - Understand variable scope (local, global).", time: "20 mins" },
        { task: "5. Data Structures:", time: "70 mins" },
        { task: "   - Lists: create, modify, and iterate over lists.", time: "20 mins" },
        { task: "   - Tuples: create and understand the immutability.", time: "10 mins" },
        { task: "   - Sets: add, remove, and check elements.", time: "10 mins" },
        { task: "   - Dictionaries: create key-value pairs and iterate.", time: "30 mins" },
        { task: "6. Object-Oriented Programming (OOP):", time: "90 mins" },
        { task: "   - Define classes and create objects.", time: "30 mins" },
        { task: "   - Understand attributes, methods, and self parameter.", time: "20 mins" },
        { task: "   - Learn about inheritance, polymorphism, and encapsulation.", time: "40 mins" },
        { task: "7. Error Handling:", time: "40 mins" },
        { task: "   - Use try-except blocks to handle exceptions.", time: "20 mins" },
        { task: "   - Raise custom exceptions and handle them.", time: "20 mins" },
        { task: "8. File Handling:", time: "50 mins" },
        { task: "   - Open, read, write, and append to files.", time: "20 mins" },
        { task: "   - Learn about file modes ('r', 'w', 'a') and file contexts (with open).", time: "20 mins" },
        { task: "   - Practice closing files and handling file exceptions.", time: "10 mins" },
        { task: "9. Modules and Packages:", time: "30 mins" },
        { task: "   - Import built-in modules (e.g., math, random, os).", time: "10 mins" },
        { task: "   - Create your own modules and import them.", time: "20 mins" },
        { task: "10. Libraries and Frameworks:", time: "120 mins" },
        { task: "   - Install and use external libraries (e.g., NumPy, Pandas).", time: "60 mins" },
        { task: "   - Introduction to web frameworks like Flask or Django.", time: "60 mins" },
        { task: "11. Testing and Debugging:", time: "45 mins" },
        { task: "   - Write test cases using the unittest module.", time: "25 mins" },
        { task: "   - Use Python’s built-in debugger (pdb) for debugging.", time: "20 mins" }
    ],
        "HTML": [
            { task: "1. Introduction to HTML:", time: "30 mins" },
            { task: "   - Understand the basic structure of an HTML document (doctype, html, head, body).", time: "10 mins" },
            { task: "   - Set up a basic HTML page using tags and attributes.", time: "20 mins" },
            { task: "2. Basic HTML Elements:", time: "45 mins" },
            { task: "   - Learn how to use headings (<h1> to <h6>), paragraphs (<p>), and text formatting tags.", time: "20 mins" },
            { task: "   - Insert links (<a>) and images (<img>) into your page.", time: "25 mins" },
            { task: "3. Attributes and Links:", time: "30 mins" },
            { task: "   - Learn to use attributes like href, src, alt, id, and class.", time: "15 mins" },
            { task: "   - Understand relative and absolute links.", time: "15 mins" },
            { task: "4. Forms and Input Elements:", time: "60 mins" },
            { task: "   - Create forms using form tags, inputs, textareas, and buttons.", time: "30 mins" },
            { task: "   - Learn about form attributes (action, method) and input types (text, radio, checkbox).", time: "30 mins" },
            { task: "5. Tables:", time: "30 mins" },
            { task: "   - Create tables using table, tr, th, td, and caption tags.", time: "30 mins" },
            { task: "6. Semantic HTML Elements:", time: "40 mins" },
            { task: "   - Learn how to structure your HTML with sectioning elements (header, nav, section, footer).", time: "40 mins" },
            { task: "7. HTML5 Features:", time: "50 mins" },
            { task: "   - Learn about new HTML5 elements like video, audio, and canvas.", time: "30 mins" },
            { task: "   - Explore semantic tags like article, aside, and figure.", time: "20 mins" },
            { task: "8. Accessibility and Best Practices:", time: "60 mins" },
            { task: "   - Learn about the importance of accessibility (alt text, ARIA roles, labels).", time: "30 mins" },
            { task: "   - Follow HTML coding best practices for clean and maintainable code.", time: "30 mins" }
        ],
        "JavaScript": [
            { task: "1. Introduction to JavaScript:", time: "40 mins" },
            { task: "   - Understand how JavaScript makes web pages dynamic and interactive.", time: "10 mins" },
            { task: "   - Add JavaScript to HTML using <script> tags and external JS files.", time: "30 mins" },
            { task: "2. Basic Syntax:", time: "45 mins" },
            { task: "   - Learn about variables (var, let, const), data types (string, number, boolean).", time: "20 mins" },
            { task: "   - Understand JavaScript operators: arithmetic, comparison, logical.", time: "25 mins" },
            { task: "3. Control Flow and Functions:", time: "50 mins" },
            { task: "   - Write control flow statements (if-else, switch-case).", time: "20 mins" },
            { task: "   - Learn how to define and call functions.", time: "30 mins" },
            { task: "4. DOM Manipulation:", time: "60 mins" },
            { task: "   - Select and manipulate HTML elements with getElementById, querySelector.", time: "30 mins" },
            { task: "   - Modify attributes, styles, and content of HTML elements.", time: "30 mins" },
            { task: "5. Arrays and Objects:", time: "50 mins" },
            { task: "   - Learn array methods (push, pop, map, filter, reduce).", time: "30 mins" },
            { task: "   - Understand object properties and methods.", time: "20 mins" },
            { task: "6. Asynchronous JavaScript:", time: "70 mins" },
            { task: "   - Learn about asynchronous code and callbacks.", time: "30 mins" },
            { task: "   - Work with promises and async/await for asynchronous tasks.", time: "40 mins" },
            { task: "7. Error Handling:", time: "40 mins" },
            { task: "   - Write try-catch blocks to handle exceptions.", time: "40 mins" },
            { task: "8. JavaScript ES6+ Features:", time: "90 mins" },
            { task: "   - Learn new features like arrow functions, destructuring, and template literals.", time: "30 mins" },
            { task: "   - Work with modules and classes in JavaScript.", time: "60 mins" },
            { task: "9. JavaScript in the Browser:", time: "80 mins" },
            { task: "   - Use localStorage and sessionStorage to store data.", time: "40 mins" },
            { task: "   - Understand cookies and how to manipulate them in JavaScript.", time: "40 mins" }

        ],
        "CSS": [
            { task: "1. Introduction to CSS:", time: "30 mins" },
            { task: "   - Learn the purpose of CSS and how it styles HTML elements.", time: "10 mins" },
            { task: "   - Understand how to link CSS to HTML using inline, internal, and external stylesheets.", time: "20 mins" },
            { task: "2. Basic Styling:", time: "40 mins" },
            { task: "   - Learn how to use selectors (class, id, element) to target elements.", time: "15 mins" },
            { task: "   - Apply styles: color, font-family, font-size, and background properties.", time: "25 mins" },
            { task: "3. The Box Model:", time: "50 mins" },
            { task: "   - Understand the CSS box model (content, padding, border, margin).", time: "20 mins" },
            { task: "   - Practice adjusting width, height, and layout using the box model.", time: "30 mins" },
            { task: "4. Layouts and Positioning:", time: "60 mins" },
            { task: "   - Learn about CSS positioning (static, relative, absolute, fixed).", time: "30 mins" },
            { task: "   - Understand float and clear, and how to use them in layouts.", time: "30 mins" },
            { task: "5. Flexbox and Grid:", time: "90 mins" },
            { task: "   - Learn how Flexbox simplifies layout creation (flex-direction, align-items, justify-content).", time: "45 mins" },
            { task: "   - Explore Grid layout for creating complex, responsive grids (grid-template, grid-gap).", time: "45 mins" },
            { task: "6. Responsive Design:", time: "70 mins" },
            { task: "   - Learn about media queries to create responsive designs for different screen sizes.", time: "40 mins" },
            { task: "   - Practice using rem/em units and percentage-based layouts for scalability.", time: "30 mins" },
            { task: "7. CSS3 Features:", time: "50 mins" },
            { task: "   - Explore modern CSS features like transitions, transforms, and animations.", time: "30 mins" },
            { task: "   - Learn how to implement hover effects and keyframe animations.", time: "20 mins" },
            { task: "8. CSS Variables and Best Practices:", time: "40 mins" },
            { task: "   - Learn how to use CSS variables to maintain consistency and simplify updates.", time: "20 mins" },
            { task: "   - Understand best practices: DRY (Don’t Repeat Yourself), maintainability, and code structure.", time: "20 mins" }
        ],
        "SQL": [
            { task: "1. Introduction to SQL:", time: "30 mins" },
            { task: "   - Understand what SQL is and its role in database management.", time: "10 mins" },
            { task: "   - Learn about relational databases and how SQL interacts with them.", time: "20 mins" },
            { task: "2. Basic Queries:", time: "40 mins" },
            { task: "   - Write basic SELECT queries to retrieve data from a table.", time: "20 mins" },
            { task: "   - Learn how to filter data with WHERE clauses and sort results with ORDER BY.", time: "20 mins" },
            { task: "3. Data Manipulation:", time: "45 mins" },
            { task: "   - Learn how to insert new records using INSERT INTO.", time: "15 mins" },
            { task: "   - Update existing records with UPDATE, and delete records using DELETE.", time: "30 mins" },
            { task: "4. Functions and Aggregates:", time: "50 mins" },
            { task: "   - Learn about aggregate functions like COUNT, SUM, AVG, MAX, and MIN.", time: "25 mins" },
            { task: "   - Understand how to group data using GROUP BY and filter groups with HAVING.", time: "25 mins" },
            { task: "5. Joins:", time: "60 mins" },
            { task: "   - Learn how to combine data from multiple tables using INNER JOIN, LEFT JOIN, RIGHT JOIN.", time: "40 mins" },
            { task: "   - Explore using FULL OUTER JOIN and CROSS JOIN in specific scenarios.", time: "20 mins" },
            { task: "6. Subqueries:", time: "50 mins" },
            { task: "   - Write subqueries (nested queries) to solve complex problems.", time: "30 mins" },
            { task: "   - Learn how to use correlated subqueries for advanced queries.", time: "20 mins" },
            { task: "7. Indexes and Optimization:", time: "40 mins" },
            { task: "   - Learn about indexing to speed up query performance.", time: "20 mins" },
            { task: "   - Understand when to use indexes and how to avoid pitfalls.", time: "20 mins" },
            { task: "8. Database Design (optional):", time: "90 mins" },
            { task: "   - Understand normalization and how to design a relational database.", time: "45 mins" },
            { task: "   - Learn about primary keys, foreign keys, and relationships between tables.", time: "45 mins" }

        ]
    };

    // Function to stop the alarm sound
    function stopAlarm() {
        alarmSound.pause(); // Pause the sound
        alarmSound.currentTime = 0; // Reset the sound to the beginning
    }

    // Function to update the timer display
    function updateTimerDisplay(timeLeft) {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`; // Format display
    }

    // Start button functionality
    startTimerBtn.addEventListener('click', () => {
        stopAlarm(); // Stop the sound when the timer starts
        clearInterval(countdown); // Clear any existing interval

        if (!isPaused) { // If not paused, start fresh
            timeLeft = timeInput.value * 60; // Convert minutes to seconds
            initialTime = timeLeft; // Store the initial time
        }

        countdown = setInterval(() => {
            timeLeft--;
            updateTimerDisplay(timeLeft);

            if (timeLeft <= 0) {
                clearInterval(countdown);
                timerDisplay.textContent = "Time's up!";
                alarmSound.play(); // Play alarm sound when timer finishes
            }
        }, 1000);

        isPaused = false; // Reset the pause state
    });

    // Pause button functionality
    pauseTimerBtn.addEventListener('click', () => {
        clearInterval(countdown); // Stop the timer
        isPaused = true; // Set the pause state
        stopAlarm(); // Stop the sound when the pause button is clicked
    });

    // Reset button functionality
    resetTimerBtn.addEventListener('click', () => {
        clearInterval(countdown); // Stop the timer
        timeLeft = initialTime; // Reset to initial time
        updateTimerDisplay(timeLeft); // Update the display
        stopAlarm(); // Stop the sound when the reset button is clicked
        isPaused = false; // Reset the pause state
    });

    // Function to get the checklist
    getChecklistBtn.addEventListener('click', () => {
        const selectedLanguage = languageSelect.value;
        const checklist = learningPaths[selectedLanguage];

        checklistDisplay.innerHTML = ''; // Clear previous content

        if (checklist) {
            checklist.forEach((item, index) => {
                const checklistItem = document.createElement('div');
                checklistItem.classList.add('checklist-item');

                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.id = `task-${index}`;
                checkbox.addEventListener('change', (e) => {
                    if (e.target.checked) {
                        checklistItem.classList.add('completed');
                    } else {
                        checklistItem.classList.remove('completed');
                    }
                });

                const label = document.createElement('label');
                label.htmlFor = `task-${index}`;
                label.textContent = `${item.task} (${item.time})`;

                // Add classes based on whether it's a main task or a subtask (assuming subtasks are indented)
                if (item.task.startsWith(' ')) {
                    label.classList.add('sub-task'); // For subtasks (indented items)
                } else {
                    label.classList.add('main-task'); // For main tasks (numbered items)
                }

                checklistItem.appendChild(checkbox);
                checklistItem.appendChild(label);
                checklistDisplay.appendChild(checklistItem);
            });
        } else {
            checklistDisplay.innerHTML = '<p style="color: red;">Error: No checklist available for this language.</p>';
        }

    });
});
