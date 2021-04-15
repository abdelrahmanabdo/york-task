const express = require('express');
const cors = require('cors')
const classrooms = require('./data/classrooms');
const students = require('./data/students');
const resources = require('./data/resources');

const {
  PORT = 3000,
} = process.env

const run = async () => {
  const app = express();
  const router = express.Router();
  app.use(express.json());
  app.use(cors());
  app.use('/public', express.static('resources'));

  /* Application */
  /**
   * Get /classrooms => get specific classrooms list.
   * 
   * @private
   **/
  router.get('/classrooms', (req, res) => res.json(classrooms));

  /**
   * Get /classrooms/{id} => get specific classroom students list.
   * 
   * @params {Int} id
   * @private
   **/
  router.get('/classrooms/:id', (req, res) => {
    const {id} = req.params;
    if (!id) return res.status(400).json({ message: 'Classroom id is required'});
    const data = students.filter((student) => student.grade_id === parseInt(id));
    res.json(data);
  });

  /**
   * Get /students/{id} => get student profile.
   * 
   * @params {String} id
   * @private
   **/
  router.get('/students/:id', (req, res) => {
    const {id} = req.params;
    if (!id) return res.status(400).json({ message: 'student id is required'});
    const data = students.find((student) => student.id === id);
    if (!data) return res.status(500).json({'message': 'No student data !!'})
    res.json(data);
  });

  /**
   * Get / resources => get resources list.
   * 
   * @private
   **/
  router.get('/resources', (req, res) => res.json(resources));

  /**
   * POST body to save an assignment
   * The body should look like this
   * {
   *   "name": "My First Assignment",
   *   "date": "1617719851333", - This is a unix time stamp. You can use `new Date().getTime()` to get this
   *   "resources": [2,3],
   *   "students": ["5bd9e9fbecef8d003e003001", "5bd9e9fbecef8d003e003003"]
   * }
   */
  router.post('/assignment', (req, res) => {
    const messages = [];

    if (!req.body.name) messages.push("Please add an assignment name")
    if (!req.body.date) messages.push("Please add an assignment due date")
    if (!req.body.resources) messages.push("Please add a least 1 resource for the assignment")
    if (!req.body.students) messages.push("Please provide a list of students assigned to the task")

    if (messages.length > 0) return res.status(400).json({messages});
    return res.status(201).json({message: "Accepted assignment response successfully"});
  })

  /**
   * POST body to save an student book assignment
   * The body should look like this
   * {
   *   "date": "1617719851333",
   *   "book_id": 2,
   *   "student_id":  "5bd9e9fbecef8d003e003003"
   * }
   */
  router.post('/student/book', (req, res) => {
    const messages = [];

    if (!req.body.date) messages.push("Please add an assignment due date")
    if (!req.body.book_id) messages.push("Please add a least 1 resource")
    if (!req.body.student_id) messages.push("Please provide student id assigned to the book")

    if (messages.length > 0) return res.status(400).json({messages});
    return res.status(201).json({message: "Accepted student book assign response successfully"});
  })

  app.use('/', router);

  const server = app.listen(PORT, () => {
    const { address, port } = server.address()
    console.log(`Listening: http://${address}:${port}`)
  })
}

run().then(() => console.log('Started server'));
