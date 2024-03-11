import { useEffect, useState } from "react"
import "./AvailableDateAdder.style.css"
import { getDoctors } from "../../../api/DoctorService"
import { createAvailableDate } from "../../../api/AvailableDateService"

const AvailableDateAdder = ({setAvailableDates}) => {

    const addAvailableDate = {
        name: "",
        species: "",
        breed: "",
        gender: "",
        color: "",
        dateOfBirth: ""
    }

    const [availableDateInAdd, setAvailableDateInAdd] = useState(addAvailableDate)

    const handleUserInput = (event) => {
        setAvailableDateInAdd({...availableDateInAdd, [event.target.name]: event.target.value})
    }

    const handleAvailableDateAdd = () => {
        createAvailableDate(availableDateInAdd).then(data => {
            setAvailableDates(prev => [...prev, data])
        })

        setAvailableDateInAdd(addAvailableDate)
    }

    const [doctors, setDoctors] = useState([])

    useEffect(() => {
        getDoctors().then(data => {
            setDoctors(data)
        })
    }, [])

    const handleSelect = (event) => {
        const selectedDoctorId = parseInt(event.target.value);
        const selectedDoctor = doctors.find(doctor => doctor.id === selectedDoctorId);
        setAvailableDateInAdd({ ...availableDateInAdd, doctor: selectedDoctor });
    };

    return (
    <div className="availableDate-adder">
        <h3>Add AvailableDate</h3>
        <input onChange={handleUserInput} type="date" value={availableDateInAdd.availableDate} placeholder="Available Date" name="availableDate" />
        
        <select onChange={handleSelect} name="doctorId" value={availableDateInAdd.doctor ? availableDateInAdd.doctor.id : null}>
            <option value="">Select a doctor</option>
            {doctors.map(doctor => (
                <option key={doctor.id} value={doctor.id}>{doctor.name}</option>
            ))}
        </select>

        <button onClick={handleAvailableDateAdd}>Add</button>
    </div>
    )
}

export default AvailableDateAdder