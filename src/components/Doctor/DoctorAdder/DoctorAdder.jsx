import { useState } from "react"
import "./DoctorAdder.style.css"
import { createDoctor } from "../../../api/DoctorService"

const DoctorAdder = ({setDoctors}) => {

    const addDoctor = {
        name: "",
        email: "",
        address: "",
        city: "",
        phone: ""
    }

    const [doctorInAdd, setDoctorInAdd] = useState(addDoctor)

    const handleUserInput = (event) => {
        setDoctorInAdd({...doctorInAdd, [event.target.name]: event.target.value})
    }

    const handleDoctorAdd = () => {
        createDoctor(doctorInAdd).then(data => {
            setDoctors(prev => [...prev, data])
        })
    }

  return (
    <div className="doctor-adder">
        <h3>Add Doctor</h3>
        <input onChange={handleUserInput} type="text" value={doctorInAdd.email} name="email" placeholder="email"/>
        <input onChange={handleUserInput} type="text" value={doctorInAdd.name} name="name" placeholder="name"/>
        <input onChange={handleUserInput} type="text" value={doctorInAdd.address} name="address" placeholder="address"/>
        <input onChange={handleUserInput} type="text" value={doctorInAdd.city} name="city" placeholder="city"/>
        <input onChange={handleUserInput} type="text" value={doctorInAdd.phone} name="phone" placeholder="phone"/>

        <button onClick={handleDoctorAdd}>Add</button>
    </div>
  )
}

export default DoctorAdder