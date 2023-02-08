import express from 'express';
import expressLayouts from 'express-ejs-layouts';
import API from './api/app.js';

    const index = express();
    index.use(express.static('./public'));
    index.use(expressLayouts);
    index.set('layout', './layouts/full-width');
    index.set('view engine', 'ejs');

    const port = 3001;

    index.use("/", API);

    index.listen(port, () => {console.log(`confidently listening to port ${port}`)});


