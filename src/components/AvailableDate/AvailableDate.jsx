import "./AvailableDate.style.css"
import { useState, useEffect } from "react"
import AvailableDateCard from "./AvailableDateCard/AvailableDateCard"
import AvailableDateAdder from "./AvailableDateAdder/AvailableDateAdder"
import { getAvailableDates } from "../../api/AvailableDateService"

const AvailableDate = () => {
    const [availableDates, setAvailableDates] = useState([])

    useEffect(() => {
        getAvailableDates().then(data => {
            setAvailableDates(data)
        })
    }, [])


    return (
        <div className="availableDate-page">
            <h2>AvailableDate Management</h2>

            <div className="availableDate-list-container">
                <h3>AvailableDate List</h3>

                <div className="availableDate-list">
                    {availableDates.map(availableDate => (
                        <AvailableDateCard key={availableDate.id} availableDate={availableDate} setAvailableDates={setAvailableDates}/>
                    ))}
                </div>
            </div>

            <AvailableDateAdder setAvailableDates={setAvailableDates}/>
        </div>
    )
}


export default AvailableDate