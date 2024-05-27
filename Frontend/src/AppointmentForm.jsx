import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker'
import './App.css'

const AppointmentForm = () => {
    const [book,setBook]=useState(false)
    const [show,setShow]=useState('')
    const [doctors, setDoctors] = useState([]);
    const [channels, setChannels] = useState(["first Visit", "Not First vist"]);
    const [timeSlots, setTimeSlots] = useState([]);
    const [selectedSlot, setSelectedSlot] = useState('');
    const [slots, setSlots] = useState([
        '10:00 AM - 11:30 AM',
        '11:00 AM - 12:30 PM',
        '12:00 PM - 01:30 PM',
        '01:00 PM - 02:30 PM'
      ]);
    
    const [appointmentTypes, setAppointmentTypes] = useState(["Online Session", " Physical Visit"]);
    const [reasons, setReasons] = useState(["Temperature, cold, Fever", "Pulse", "Respiration", "blood pressure ","Physical Issue"]);

    const [formData, setFormData] = useState({
        patientName: '',
        contact: '',
        doctor: '',
        channel: '',
        timeSlot: '',
        appointmentType: '',
        reason: '',
        date:'',
        note:''
    });
    
  const handleSlotChange = (e) => {
    formData.timeSlot=e.target.value;
    setSelectedSlot(e.target.value);
  };

    useEffect(() => {
        const fetchData = async () => {
            const doctorsRes = await axios.get('http://localhost:3000/api/doctor');
            console.log(doctorsRes);
            setDoctors(doctorsRes.data?.data);
            
            
            // const channelsRes = await axios.get('/api/channels');
            // setChannels(channelsRes.data);

            // const timeSlotsRes = await axios.get('/api/timeslots');
            // setTimeSlots(timeSlotsRes.data);

            // const appointmentTypesRes = await axios.get('/api/appointmenttypes');
            // setAppointmentTypes(appointmentTypesRes.data);

            // const reasonsRes = await axios.get('/api/reasons');
            // setReasons(reasonsRes.data);
        };

        fetchData();
    }, []);

    const handleDateChangeDate= (date)=>{
        formData.date=date;
        console.log(formData);
        setTimeSlots(date)
    }

    const handleChange = (e) => {
        console.log(formData)
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
            
        });
    };
    const bookAppointment=async(Data)=>{
        try {
            const res= await axios.post('http://localhost:3000/api/bookVisit',Data);
             setShow(res.data?.response);
             console.log(res.data.response);
            setBook(true);
        } catch (error) {
            console.log(error.message);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form data submitted:', formData);
        bookAppointment(formData);
         
    };
    return (  <div className=''>
        <div className='img'> <img 
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRarpf4pGXSwSgpgJwzRlwz8Z5npu3IF0NGaw&usqp=CAU" 
        alt="LOgo" />
        </div>
         {book ? (
        < div  className='booked'> 
           <div className='bok'>  <p> Appoinment Booked  </p>
           <div> <h3>{show.patientName}</h3>
           <h4> Type, Slot and Symptoms:{show.appointmentType}</h4>
                   <h4>Contact NO:{show.contact},Date Of Booking{show.time}</h4>
                  
                   {show.channel}


           </div>{
           }
           </div>
        </div>):(<form onSubmit={handleSubmit} className='form'>
           <div className='mainDiv'>
            <div className='section'>
                <div className='basic'>
                <label>Patient Name:</label>
                <input
                    type="text"
                    name="patientName"
                    value={formData.patientName}
                    onChange={handleChange}
                    required
                />
                 <div>
                <label>Contact:</label>
                <input
                    type="text"
                    name="contact"
                    value={formData.contact}
                    onChange={handleChange}
                    required
                />
                </div>
            </div> 
            
            <div className='DocDiv'>
                <img 
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyEmqyaDKMb6slZrhg6a3pAIgx5z5elLN6yg&usqp=CAU" className='docimg'
                 alt="" />
                 <p>Docter Availble in Backend</p>
                <label>Doctor:</label>
                <select
                    name="doctor"
                    value={formData.doctor}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select a doctor</option>
                    {doctors.map((doctor) => (
                        <option key={doctor.id} value={doctor.name}>
                            {doctor.name}
                        </option>
                    ))}
                </select>
            </div>
            </div>
            <div className='channel'>
                <label>Channel:</label>
                <select
                    name="channel"
                    value={formData.channel}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select a channel</option>
                    {channels.map((channel, index) => (
                        <option key={index} value={channel}>
                            {channel}
                        </option>
                    ))}
                </select>
            </div>
            
            <div className='timeslot'>
            
          <label>Select Time Slot:</label>
          <select value={formData.timeSlot} onChange={handleSlotChange}>
            <option value="">--Select a time slot--</option>
            {slots.map((slot, index) => (
              <option key={index} value={slot}>
                {slot}
              </option>
            ))}
          </select>
        </div>
                <div>
      
        <div className='date'>
          <label>Select Date:</label>
          <DatePicker
            selected={formData.date}
            onChange={handleDateChangeDate}
            dateFormat="yyyy/MM/dd"
          />
        </div>

            <div className=' type'>
                <label>Appointment Type:</label>
                <select
                    name="appointmentType"
                    value={formData.appointmentType}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select an appointment type</option>
                    {appointmentTypes.map((type, index) => (
                        <option key={index} value={type}>
                            {type}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label>Reason for Doctor:</label>
                <select
                    name="reason"
                    value={formData.reason}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select a reason</option>
                    {reasons.map((reason, index) => (
                        <option key={index} value={reason}>
                            {reason}
                        </option>
                    ))}
                </select>
            </div>
            
            </div>
            <div className='note'>
                <label>Note:</label>
                <input
                    type="text"
                    name="note"
                    value={formData.note}
                    onChange={handleChange}
                    required
                />
                </div>
                
            </div>
            <button type="submit">Book Appointment</button>
        </form>
        )}

            </div>
        
    );
};

export default AppointmentForm;
