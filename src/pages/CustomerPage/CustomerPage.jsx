import { useEffect, useState } from "react"
import "./CustomerPage.style.css"
import { filterByName, getCustomers } from "../../api/CustomerService"
import CustomerCard from "../../components/Customer/CustomerCard/CustomerCard"
import CustomerAdder from "../../components/Customer/CustomerAdder/CustomerAdder"

const CustomerPage = () => {
    const [customers, setCustomers] = useState([])
    const [filteredCustomers, setFilteredCustomers] = useState([])

    useEffect(() => {
        getCustomers().then(data => {
            setCustomers(data)
            setFilteredCustomers(data)
        })
    }, [])

    useEffect(() => {
        setFilteredCustomers(customers)
    }, [customers])

    const [filter, setFilter] = useState("")

    const handleChange = (event) => {

        setFilter(event.target.value)

    }

    const handleClick = () => {
        filterByName(filter).then(data => {
            setFilteredCustomers(data)
        })
    }

    return (
        <div className="customer-page">
            <h2>Customer Management</h2>

            <div className="customer-list-container">
                <h3>Customer List</h3>

                <input onChange={handleChange} placeholder="Name" title="Name" value={filter}/>
                <button onClick={handleClick}>Search</button>
                <div className="customer-list">
                    {filteredCustomers.map(customer => (
                        <CustomerCard key={customer.id} customer={customer} setCustomers={setCustomers}/>
                    ))}
                </div>
                

                <CustomerAdder setCustomers={setCustomers}/>
                
            </div>
        </div>
    )
}

export default CustomerPage