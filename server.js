const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const multer = require('multer');

const app = express();
const port = 3000;

// Set up middleware and routes
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', 'views');

// Set up database connection
const db = new sqlite3.Database('news_app.db', (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log('Connected to the news_app database.');
    }
});

// Set up multer for handling file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    },
});
const upload = multer({ storage: storage });

// Routes
app.get('/', (req, res) => {
    res.render('home');
});

app.get('/login', (req, res) => {
    res.render('login');
});

// ...

app.post('/login', (req, res) => {
    // Process login data and authenticate user
    const { username, email, password } = req.body;
    // Check user credentials and perform authentication logic

    // Assuming authentication is successful and user data is available
    const userData = {
        name: username, // Update this with the authenticated user's name
        email: email,
        // Add other user data fields as needed
    };

    // Redirect to user profile with the user data
    res.render('user-profile', { userData });
});

// ...


app.get('/register', (req, res) => {
    res.render('register');
});

app.post('/register', (req, res) => {
    // Process registration data and create a new user account
    const { username, email, password } = req.body;
    // Create new user account and save to database

    // Redirect to login page after successful registration
    res.redirect('/login');
});


app.get('/admin-login', (req, res) => {
    res.render('admin-login');
});

app.post('/admin-login', (req, res) => {
    // Process admin login data and authenticate admin
    const { username, email, password } = req.body;
    // Check admin credentials and perform authentication logic
    const adminData = {
        email: email,
    };
    // Assuming authentication is successful, redirect to admin page
    res.render('admin', { adminData: adminData });
});




app.get('/admin-register', (req, res) => {
    res.render('admin-register');
});

app.post('/admin-register', (req, res) => {
    // Process admin registration data and create a new admin account
    const { name, email, password } = req.body;
    // Create new admin account and save to database

    // Redirect to admin login page after successful registration
    res.redirect('/admin-login');
});

app.get('/admin', (req, res) => {
    res.render('admin');
});

app.post('/add-news', upload.single('newsImage'), (req, res) => {
    // Process news data and save to database
    const { title, category, description } = req.body;
    const image = req.file;

    // Save the news data to the database
    // ...

    // Redirect to admin page after adding the news
    res.redirect('/admin');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
