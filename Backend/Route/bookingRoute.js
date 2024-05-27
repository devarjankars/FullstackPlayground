const express= require('express');
const router=express.Router();
const bookingController= require('../Controller/bookingController')


router.get('/doctor', bookingController.getDocter);
router.post('/bookVisit', bookingController.createAppointment);
router.get('/Appointment', bookingController.fetchData);





module.exports=router;
