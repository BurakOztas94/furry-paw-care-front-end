import { useState } from "react"
import "./CustomerAdder.style.css"
import { createCustomer } from "../../../api/CustomerService"

const CustomerAdder = ({setCustomers}) => {

    const addCustomer = {
        name: "",
        email: "",
        address: "",
        city: "",
        phone: ""
    }

    const [customerInAdd, setCustomerInAdd] = useState(addCustomer)

    const handleUserInput = (event) => {
        setCustomerInAdd({...customerInAdd, [event.target.name]: event.target.value})
    }

    const handleCustomerAdd = () => {
        createCustomer(customerInAdd).then(data => {
            setCustomers(prev => [...prev, data])
        })
    }

  return (
    <div className="customer-adder">
        <h3>Add Customer</h3>
        <input onChange={handleUserInput} type="text" value={customerInAdd.email} name="email" placeholder="email"/>
        <input onChange={handleUserInput} type="text" value={customerInAdd.name} name="name" placeholder="name"/>
        <input onChange={handleUserInput} type="text" value={customerInAdd.address} name="address" placeholder="address"/>
        <input onChange={handleUserInput} type="text" value={customerInAdd.city} name="city" placeholder="city"/>
        <input onChange={handleUserInput} type="text" value={customerInAdd.phone} name="phone" placeholder="phone"/>

        <button onClick={handleCustomerAdd}>Add</button>
    </div>
  )
}

export default CustomerAdder