import { useEffect, useState } from "react"
import "./AvailableDateCard.style.css"
import { getDoctors } from "../../../api/DoctorService"
import { updateAvailableDate, deleteAvailableDate } from "../../../api/AvailableDateService"


const AvailableDateCard = ({ availableDate, setAvailableDates }) => {
    const [availableDateInCard, setAvailableDateInCard] = useState(availableDate);
    const [doctors, setDoctors] = useState([]);

    useEffect(() => {
        setAvailableDateInCard(availableDate);
    }, [availableDate]);

    useEffect(() => {
        getDoctors().then(data => {
            setDoctors(data);
        });
    }, []);

    const handleSelect = (event) => {
        const selectedDoctorId = parseInt(event.target.value);
        const selectedDoctor = doctors.find(doctor => doctor.id === selectedDoctorId);
        setAvailableDateInCard({ ...availableDateInCard, doctor: selectedDoctor });
    };

    const handleAvailableDateUpdate = () => {
        updateAvailableDate(availableDateInCard).then(data => {
            setAvailableDates(prev => [...prev.filter(obj => obj.id !== availableDateInCard.id), data]);
        });
    };

    const handleAvailableDateDelete = () => {
        deleteAvailableDate(availableDateInCard.id).then(() => {
            setAvailableDates(prev => prev.filter(obj => obj.id !== availableDateInCard.id));
        });
    };

    const handleUserInput = (event) => {
        setAvailableDateInCard({ ...availableDateInCard, [event.target.name]: event.target.value });
    };

    return (
        <div className="availableDate-card">
            <input onChange={handleUserInput} type="date" value={availableDateInCard.availableDate} placeholder="Available Date" name="availableDate" />
            
            <select onChange={handleSelect} name="doctorId" value={availableDateInCard.doctor ? availableDateInCard.doctor.id : ""}>
                <option value="">Select a doctor</option>
                {doctors.map(doctor => (
                    <option key={doctor.id} value={doctor.id}>{doctor.name}</option>
                ))}
            </select>

            <div>
                <button onClick={handleAvailableDateUpdate}>Update</button>
                <button onClick={handleAvailableDateDelete}>Delete</button>
            </div>
        </div>
    );
};

export default AvailableDateCard;
