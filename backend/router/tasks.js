const express =  require(`express`);
const router = express.Router();

const {getAlltasks,createTasks,getSingletask,updatetask,deletetask}= require(`../controllers/tasks`)

router.route(`/`).get(getAlltasks).post(createTasks)
router.route(`/:id`).get(getSingletask).delete(deletetask).patch(updatetask)

module.exports=router;