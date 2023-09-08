import express from 'express';
import "express-async-errors";
import cors from 'cors';
import router from './routes/index.routes.js';
import errorMidleware from './middlewares/errorMidleware.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use(router);
app.use(errorMidleware);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server listen on port ${port}`));