import { useEffect, useState } from "react"
import "./CustomerPage.style.css"
import { getCustomers } from "../../api/CustomerService"
import CustomerCard from "../../components/Customer/CustomerCard/CustomerCard"
import CustomerAdder from "../../components/Customer/CustomerAdder/CustomerAdder"

const CustomerPage = () => {
    const [customers, setCustomers] = useState([])

    useEffect(() => {
        getCustomers().then(data => {
            setCustomers(data)
        })
    }, [])


    return (
        <div className="customer-page">
            <h2>Customer Management</h2>

            <div className="customer-list-container">
                <h3>Customer List</h3>

                <div className="customer-list">
                    {customers.map(customer => (
                        <CustomerCard key={customer.id} customer={customer} setCustomers={setCustomers}/>
                    ))}
                </div>
                

                <CustomerAdder setCustomers={setCustomers}/>
                
            </div>
        </div>
    )
}

export default CustomerPage