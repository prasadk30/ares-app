var express = require('express');
var app = express();

app.set('view engine', 'ejs');

// const PORT = process.env.PORT || 3000;
const URL = process.env.BACKEND_URL || 'http://localhost:8000/api';


app.get('/', async(req, res) => {
    try{
   
    console.log('Calling backend:', URL);

 // Fetch data from the backend API
    const response = await fetch(URL);

    console.log('Backend status:', response.status);

    //Check whether the backend request succeeded
    if (!response.ok) {
        const body = await response.text();
       throw new Error(
        `Backend returned ${response.status}: ${body}`);
        
    }

    // Convert the backend response to JSON
    const data = await response.json();
    console.log('Backend response:', data);

    //Render the EJS template with the data from the backend
    res.render('index.ejs', { data });
    
    } catch (err) {
    //     console.error('Backend connection or rendering error:', err);

    //    // res.status(500).send('Internal Server Error: Check the frontend termonal.');
    //   res.status(500).send(
    //     'Internal Server Error. Check the frontend terminal.'
    console.error('Frontend error:', err);

    res.status(500).send(`
        <h2>Frontend Error</h2>
        <pre>${String(err.stack || err.message || err)}</pre>
    `);
    }
});

app.listen(3000, '0.0.0.0', () => {
console.log('Express server listening on port 3000');
});
