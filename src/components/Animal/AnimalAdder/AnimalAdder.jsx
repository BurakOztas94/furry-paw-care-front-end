import { useEffect, useState } from "react"
import "./AnimalAdder.style.css"
import { getCustomers } from "../../../api/CustomerService"
import { createAnimal } from "../../../api/AnimalService"

const AnimalAdder = ({setAnimals}) => {

    const addAnimal = {
        name: "",
        species: "",
        breed: "",
        gender: "",
        color: "",
        dateOfBirth: ""
    }

    const [animalInAdd, setAnimalInAdd] = useState(addAnimal)

    const handleUserInput = (event) => {
        setAnimalInAdd({...animalInAdd, [event.target.name]: event.target.value})
    }

    const handleAnimalAdd = () => {
        createAnimal(animalInAdd).then(data => {
            setAnimals(prev => [...prev, data])
        })

        setAnimalInAdd(addAnimal)
    }

    const [customers, setCustomers] = useState([])

    useEffect(() => {
        getCustomers().then(data => {
            setCustomers(data)
        })
    }, [])

    const handleSelect = (event) => {
        const selectedCustomerId = parseInt(event.target.value);
        const selectedCustomer = customers.find(customer => customer.id === selectedCustomerId);
        setAnimalInAdd({ ...animalInAdd, customer: selectedCustomer });
    };

    return (
    <div className="animal-adder">
        <h3>Add Animal</h3>
        <input onChange={handleUserInput} type="text" value={animalInAdd.name} placeholder="name" name="name" />
        <input onChange={handleUserInput} type="text" value={animalInAdd.species} placeholder="species" name="species" />
        <input onChange={handleUserInput} type="text" value={animalInAdd.breed} placeholder="breed" name="breed" />
        <input onChange={handleUserInput} type="text" value={animalInAdd.gender} placeholder="gender" name="gender" />
        <input onChange={handleUserInput} type="text" value={animalInAdd.color} placeholder="color" name="color" />
        <input onChange={handleUserInput} type="date" value={animalInAdd.dateOfBirth} placeholder="date of birth" name="dateOfBirth" />

        <select onChange={handleSelect} name="customerId" value={animalInAdd.customer ? animalInAdd.customer.id : null}>
            <option value="">Select a customer</option>
            {customers.map(customer => (
                <option key={customer.id} value={customer.id}>{customer.name}</option>
            ))}
        </select>

        <button onClick={handleAnimalAdd}>Add</button>
    </div>
    )
}

export default AnimalAdder