import { useEffect, useState } from "react"
import "./AnimalCard.style.css"
import { getCustomers } from "../../../api/CustomerService"
import { updateAnimal, deleteAnimal } from "../../../api/AnimalService"


const AnimalCard = ({ animal, setAnimals }) => {
    const [animalInCard, setAnimalInCard] = useState(animal);
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        setAnimalInCard(animal);
    }, [animal]);

    useEffect(() => {
        getCustomers().then(data => {
            setCustomers(data);
        });
    }, []);

    const handleSelect = (event) => {
        const selectedCustomerId = parseInt(event.target.value);
        const selectedCustomer = customers.find(customer => customer.id === selectedCustomerId);
        setAnimalInCard({ ...animalInCard, customer: selectedCustomer });
    };

    const handleAnimalUpdate = () => {
        updateAnimal(animalInCard).then(data => {
            setAnimals(prev => prev.map(obj => obj.id === animalInCard.id ? data : obj));
        });
    };
    

    const handleAnimalDelete = () => {
        deleteAnimal(animalInCard.id).then(() => {
            setAnimals(prev => prev.filter(obj => obj.id !== animalInCard.id));
        });
    };

    const handleUserInput = (event) => {
        setAnimalInCard({ ...animalInCard, [event.target.name]: event.target.value });
    };

    return (
        <div className="animal-card">
            <input onChange={handleUserInput} type="text" value={animalInCard.name} placeholder="name" name="name" />
            <input onChange={handleUserInput} type="text" value={animalInCard.species} placeholder="species" name="species" />
            <input onChange={handleUserInput} type="text" value={animalInCard.breed} placeholder="breed" name="breed" />
            <input onChange={handleUserInput} type="text" value={animalInCard.gender} placeholder="gender" name="gender" />
            <input onChange={handleUserInput} type="text" value={animalInCard.color} placeholder="color" name="color" />
            <input onChange={handleUserInput} type="text" value={animalInCard.dateOfBirth} placeholder="date of birth" name="dateOfBirth" />

            <select onChange={handleSelect} name="customerId" value={animalInCard.customer ? animalInCard.customer.id : ""}>
                <option value="">Select a customer</option>
                {customers.map(customer => (
                    <option key={customer.id} value={customer.id}>{customer.name}</option>
                ))}
            </select>
            <div className = "button-container" >
                <div className ="update"> <button onClick={handleAnimalUpdate}>Update</button></div>
                <div className ="delete"> <button onClick={handleAnimalDelete}>Delete</button></div>
            </div>
        </div>
    );
};

export default AnimalCard;
