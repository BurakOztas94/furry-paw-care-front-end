import { useEffect, useState } from "react"
import "./DoctorCard.style.css"
import { deleteDoctor, updateDoctor } from "../../../api/DoctorService"

const DoctorCard = ({doctor, setDoctors}) => {
    const [doctorInCard, setDoctorInCard] = useState(doctor)

    useEffect(() => {
        setDoctorInCard(doctor)
    }, [doctor])

    const handleUserInput = (event) => {
        setDoctorInCard({...doctorInCard, [event.target.name]: event.target.value})
    }

    const handleDoctorUpdate = () => {
        updateDoctor(doctorInCard).then(data => {
            setDoctors(prev => prev.map(obj => obj.id === doctorInCard.id ? data : obj));
        });
    };
    

    const handleDoctorDelete = () => {
        deleteDoctor(doctorInCard.id).then(() => {
            setDoctors(prev => [...prev.filter(obj => obj.id !== doctorInCard.id)])
        })
    }

  return (
    <div className="doctor-card">
        <input onChange={handleUserInput} type="text" value={doctorInCard.email} name="email"/>
        <input onChange={handleUserInput} type="text" value={doctorInCard.name} name="name"/>
        <input onChange={handleUserInput} type="text" value={doctorInCard.address} name="address"/>
        <input onChange={handleUserInput} type="text" value={doctorInCard.city} name="city"/>
        <input onChange={handleUserInput} type="text" value={doctorInCard.phone} name="phone"/>

        <div className="doctor-update-delete">
            <button onClick={handleDoctorUpdate}>Update</button>
            <button onClick={handleDoctorDelete}>Delete</button>
        </div>
    </div>
  )
}

export default DoctorCard