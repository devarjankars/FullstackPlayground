const {Docter,Booking} =require('../models/index');



 const getDocter=async(req, res)=>{
    try{
        const response=await Docter.findAll();
        return res.status(200).json({
            message:"succesfull get the Docters",
            data:response
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:"Something went Wrong in controller",
            err:error,
        });

    }
}


const createAppointment =async(req,res)=>{
    try {
        const data =req.body
        console.log("hello i booking controller");
        const {patientName,contact,doctor,channel,appointmentType,reason,date,note,timeSlot}=req.body
        const doc= await Docter.findOne({where:{name:doctor}});
            const docId=doc.id;
         let newObj={"patientName":patientName,docterId:docId,"contact":contact,"channel":channel,"appointmentType":appointmentType+" "+timeSlot+" "+reason,"time":date}
    const newBooking= await Booking.create(newObj);
        return res.status(201).json({
            message:"succesfull created Appoitment ",
            response:newBooking
        })
        
    } catch (error) {
        return res.status(500).json({
            message:"Something went Wrong",
            err:error,
        });
        
    }
}

const fetchData=async(req,res)=>{
    try {

        const response= await Booking.findByPk(req.params.id) ;
        return res.status(201).json({
            message:"succesfull created Appoitment ",
            response:response
        })
        
    } catch (error) {
        return res.status(401).json({
            message:"Something went Wrong",
            err:error,
        });
        
    }
}



module.exports={
    getDocter,
    createAppointment,
    fetchData
}