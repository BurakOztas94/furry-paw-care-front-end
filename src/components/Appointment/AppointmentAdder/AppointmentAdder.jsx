import { useEffect, useState } from "react"
import "./AppointmentAdder.style.css"
import { getDoctors } from "../../../api/DoctorService"
import { createAppointment } from "../../../api/AppointmentService"
import { getAnimals } from "../../../api/AnimalService"

const AppointmentAdder = ({setAppointments}) => {

    const addAppointment = {
        appointmentDate: "",
    }

    const [appointmentInAdd, setAppointmentInAdd] = useState(addAppointment)

    const handleUserInput = (event) => {
        setAppointmentInAdd({...appointmentInAdd, [event.target.name]: event.target.value})
    }

    const handleAppointmentAdd = () => {
        createAppointment(appointmentInAdd).then(data => {
            setAppointments(prev => [...prev, data])
        })

        setAppointmentInAdd(addAppointment)
    }

    const [doctors, setDoctors] = useState([])

    useEffect(() => {
        getDoctors().then(data => {
            setDoctors(data)
        })
    }, [])

    const [animals, setAnimals] = useState([])

    useEffect(() => {
        getAnimals().then(data => {
            setAnimals(data)
        })
    }, [])

    const handleDoctorSelect = (event) => {
        const selectedDoctorId = parseInt(event.target.value);
        const selectedDoctor = doctors.find(doctor => doctor.id === selectedDoctorId);
        setAppointmentInAdd(prevState => ({ ...prevState, doctor: selectedDoctor }));
    };
    
    const handleAnimalSelect = (event) => {
        const selectedAnimalId = parseInt(event.target.value);
        const selectedAnimal = animals.find(animal => animal.id === selectedAnimalId);
        setAppointmentInAdd(prevState => ({ ...prevState, animal: selectedAnimal }));
    };
    

    return (
    <div className="appointment-adder">
        <h3>Add Appointment</h3>
        <input onChange={handleUserInput} type="datetime-local" value={appointmentInAdd.appointmentDate} placeholder="Appointment Date" name="appointmentDate" />
    
        <select onChange={handleDoctorSelect} name="doctorId" value={appointmentInAdd.doctor ? appointmentInAdd.doctor.id : ""}>
            <option value="">Select a doctor</option>
            {doctors.map(doctor => (
                <option key={doctor.id} value={doctor.id}>{doctor.name}</option>
            ))}
        </select>

        <select onChange={handleAnimalSelect} name="animalId" value={appointmentInAdd.animal ? appointmentInAdd.animal.id : ""}>
            <option value="">Select an animal</option>
            {animals.map(animal => (
                <option key={animal.id} value={animal.id}>{animal.name}</option>
            ))}
        </select>


        <button onClick={handleAppointmentAdd}>Add</button>
    </div>
    )
}

export default AppointmentAdder