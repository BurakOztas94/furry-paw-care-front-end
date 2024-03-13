import { useEffect, useState } from "react"
import "./VaccinePage.style.css"
import { getVaccines } from "../../api/VaccineService"
import VaccineCard from "../../components/Vaccine/VaccineCard/VaccineCard"
import VaccineAdder from "../../components/Vaccine/VaccineAdder/VaccineAdder"

const VaccinePage = () => {
    const [vaccines, setVaccines] = useState([])

    useEffect(() => {
        getVaccines().then(data => {
            setVaccines(data)
        })
    }, [])


    return (
        <div className="vaccine-page">
            <h2>Vaccine Management</h2>

            <div className="vaccine-list-container">
                <h3>Vaccine List</h3>

                <div className="vaccine-list">
                    {vaccines.map(vaccine => (
                        <VaccineCard key={vaccine.id} vaccine={vaccine} setVaccines={setVaccines}/>
                    ))}
                </div>
                

                <VaccineAdder setVaccines={setVaccines}/>
                
            </div>
        </div>
    )
}

export default VaccinePage