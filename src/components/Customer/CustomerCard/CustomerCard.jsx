import { useEffect, useState } from "react"
import "./CustomerCard.style.css"
import { deleteCustomer, updateCustomer } from "../../../api/CustomerService"

const CustomerCard = ({customer, setCustomers}) => {
    const [customerInCard, setCustomerInCard] = useState(customer)

    useEffect(() => {
        setCustomerInCard(customer)
    }, [customer])

    const handleUserInput = (event) => {
        setCustomerInCard({...customerInCard, [event.target.name]: event.target.value})
    }

    const handleCustomerUpdate = () => {
        updateCustomer(customerInCard).then(data => {
            setCustomers(prev => [...prev.filter(obj => obj.id !== customerInCard.id), data])
        })
    }

    const handleCustomerDelete = () => {
        deleteCustomer(customerInCard.id).then(() => {
            setCustomers(prev => [...prev.filter(obj => obj.id !== customerInCard.id)])
        })
    }

  return (
    <div className="customer-card">
        <input onChange={handleUserInput} type="text" value={customerInCard.email} name="email"/>
        <input onChange={handleUserInput} type="text" value={customerInCard.name} name="name"/>
        <input onChange={handleUserInput} type="text" value={customerInCard.address} name="address"/>
        <input onChange={handleUserInput} type="text" value={customerInCard.city} name="city"/>
        <input onChange={handleUserInput} type="text" value={customerInCard.phone} name="phone"/>

        <div className="customer-update-delete">
            <button onClick={handleCustomerUpdate}>Update</button>
            <button onClick={handleCustomerDelete}>Delete</button>
        </div>
    </div>
  )
}

export default CustomerCard