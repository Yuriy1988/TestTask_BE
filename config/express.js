import express from 'express';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import cors from 'cors';
import routes from '../server/routes/index.route';

const app = express();

app.use(bodyParser.json({ limit: '50mb' }));
app.use(methodOverride());
app.use(cors());
app.use('/api', routes);

export default app;
