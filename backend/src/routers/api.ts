const { Router } = require('express');
const router = Router();
const  AuthController  = require('@/controllers/authController');
const authMiddleware=require('@/middlewares/authenticate');
const EmployeeController=require('@/controllers/employeeController')
// const TaskController=require('@/controller/taskController')
// const PerformanceController=require('@/controller/performanceController')
//const PerformanceParticipateController=require('@/controllers/PerformanceParticipateController')
//auth routes 
router.post("/auth/register", AuthController.register);
router.post("/auth/login",AuthController.login);

//employee routes
router.get('/employee',authMiddleware,EmployeeController.index)  //private route
router.get('/employee/:id',authMiddleware,EmployeeController.show)  //private route
router.put('/employee/:id',authMiddleware,EmployeeController.update)  //private route
router.post('/employee/:id',authMiddleware,EmployeeController.add)  //private route
router.delete('/employee/:id',authMiddleware,EmployeeController.delete)  //private route

//performance routes
// router.get('/performance',authMiddleware,PerformanceController.index)  //private route
// router.get('/performance/:id',authMiddleware,PerformanceController.show)  //private route
// router.put('/performance/:id',authMiddleware,PerformanceController.update)  //private route
// router.post('/performance/:id',authMiddleware,PerformanceController.add)  //private route

//task routes
// router.get('/task',authMiddleware,TaskController.index)  //private route
// router.get('/task/:id',authMiddleware,TaskController.show)  //private route
// router.put('/task/:id',authMiddleware,TaskController.update)  //private route
// router.post('/task/:id',authMiddleware,TaskController.add)  //private route
// router.delete('/task/:id',authMiddleware,TaskController.delete)  //private route

//performance-participate routes
//router.post('/performance-particpate/:id',authMiddleware,PerformanceParticipateController.add)  //private route

module.exports = router;
