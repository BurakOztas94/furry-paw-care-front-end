import { useEffect, useState } from "react"
import "./VaccinePage.style.css"
import { getVaccines,filterVaccinesByAnimalName } from "../../api/VaccineService"
import VaccineCard from "../../components/Vaccine/VaccineCard/VaccineCard"
import VaccineAdder from "../../components/Vaccine/VaccineAdder/VaccineAdder"


const VaccinePage = () => {
    const [vaccines, setVaccines] = useState([])
    const [filteredVaccines,setFilteredVaccines]  =useState([])

    useEffect(() => {
        getVaccines().then(data => {
            setVaccines(data)
        })
    }, [])

    const [animalNameFilter, setAnimalNameFilter] = useState("")

    const handleAnimalChange = (event) => {
        setAnimalNameFilter(event.target.value)
    }
    
    const handleAnimalClick = () => {
        if (animalNameFilter === "") {
            setFilteredVaccines(vaccines)
            return
        }

        filterVaccinesByAnimalName(animalNameFilter).then(data => {
            setFilteredVaccines(data)
        })
    }




    return (
        <div className="vaccine-page">
            <h2>Vaccine Management</h2>

            <div className="vaccine-list-container">
                <h3>Vaccine List</h3>

                <input onChange={handleAnimalChange} placeholder="Animal Name" title="Animal Name" value ={animalNameFilter} />
                <button onClick={handleAnimalClick}>Search</button>

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