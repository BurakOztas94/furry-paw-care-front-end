import { useEffect, useState } from "react"
import "./AnimalPage.style.css"
import { filterAnimalsByName, getAnimals, filterAnimalsByCustomerName } from "../../api/AnimalService"
import AnimalCard from "../../components/Animal/AnimalCard/AnimalCard"
import AnimalAdder from "../../components/Animal/AnimalAdder/AnimalAdder"

const AnimalPage = () => {
    const [animals, setAnimals] = useState([])
    const [filteredAnimals, setFilteredAnimals] = useState([])

    useEffect(() => {
        getAnimals().then(data => {
            setAnimals(data)
            setFilteredAnimals(data)
        })
    }, [])

    

    const [animalNameFilter, setAnimalNameFilter] = useState("")

    const handleAnimalChange = (event) => {
        setAnimalNameFilter(event.target.value)
    }
    
    const handleAnimalClick = () => {
        if (animalNameFilter === "") {
            setFilteredAnimals(animals)
            return
        }

        filterAnimalsByName(animalNameFilter).then(data => {
            setFilteredAnimals(data)
        })
    }

    const [customerNameFilter, setCustomerNameFilter] = useState("")

    const handleCustomerChange = (event) => {
        setCustomerNameFilter(event.target.value)
    }
    
    const handleCustomerClick = () => {
        if (customerNameFilter === "") {
            setFilteredAnimals(animals)
            return
        }

        filterAnimalsByCustomerName(customerNameFilter).then(data => {
            setFilteredAnimals(data)
        })
    }

    

    return (
        <div className="animal-page">
            <h2>Animal Management</h2>

            <div className="animal-list-container">
                <h3>Animal List</h3>

                <input onChange={handleAnimalChange} placeholder="Animal Name" title="Animal Name" value={animalNameFilter}/>
                <button onClick={handleAnimalClick}>Search</button>

                <input onChange={handleCustomerChange} placeholder="Customer Name" title="Customer Name" value={customerNameFilter}/>
                <button onClick={handleCustomerClick}>Search</button>

                <div className="animal-list">
                    {filteredAnimals.map(animal => (
                        <AnimalCard key={animal.id} animal={animal} setAnimals={setAnimals}/>
                    ))}
                </div>
            </div>

            <AnimalAdder setAnimals={setAnimals}/>
        </div>
    )
}

export default AnimalPage