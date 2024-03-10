import { useEffect, useState } from "react"
import "./AnimalPage.style.css"
import { getAnimals } from "../../api/AnimalService"
import AnimalCard from "../../components/Animal/AnimalCard/AnimalCard"
import AnimalAdder from "../../components/Animal/AnimalAdder/AnimalAdder"

const AnimalPage = () => {
    const [animals, setAnimals] = useState([])

    useEffect(() => {
        getAnimals().then(data => {
            setAnimals(data)
        })
    }, [])


    return (
        <div className="animal-page">
            <h2>Animal Management</h2>

            <div className="animal-list-container">
                <h3>Animal List</h3>

                <div className="animal-list">
                    {animals.map(animal => (
                        <AnimalCard key={animal.id} animal={animal} setAnimals={setAnimals}/>
                    ))}
                </div>
            </div>

            <AnimalAdder setAnimals={setAnimals}/>
        </div>
    )
}

export default AnimalPage