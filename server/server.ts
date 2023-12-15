import * as express from 'express';
import {Application} from 'express';
import {getAllCourses, getCourseById} from './get-courses.route';


const app: Application = express();

const cors = require('cors');
const bodyParser = require('body-parser');
app.use(cors({origin: true}));

app.use(bodyParser.json());


app.route('/api/courses').get(getAllCourses);

app.route('/api/courses/:id').get(getCourseById);


const httpServer:any = app.listen(9000, () => {
    console.log("HTTP REST API Server running at http://localhost:" + httpServer.address().port);
});




