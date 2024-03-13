import { useEffect, useState } from "react"
import "./VaccineAdder.style.css"
import { getReports } from "../../../api/ReportService"
import { createVaccine } from "../../../api/VaccineService"
import { getAnimals } from "../../../api/AnimalService"

const VaccineAdder = ({setVaccines}) => {

    const addVaccine = {
        name: "",
        code: "",
        protectionStartDate: "",
        protectionFinishDate: ""
    }

    const [vaccineInAdd, setVaccineInAdd] = useState(addVaccine)

    const handleUserInput = (event) => {
        setVaccineInAdd({...vaccineInAdd, [event.target.name]: event.target.value})
    }

    const handleVaccineAdd = () => {
        createVaccine(vaccineInAdd).then(data => {
            setVaccines(prev => [...prev, data])
            console.log(vaccineInAdd)
            console.log(data)
        })

        setVaccineInAdd(addVaccine)
    }

    const [reports, setReports] = useState([])

    useEffect(() => {
        getReports().then(data => {
            setReports(data)
        })
    }, [])

    const [animals, setAnimals] = useState([])

    useEffect(() => {
        getAnimals().then(data => {
            setAnimals(data)
        })
    }, [])

    const handleReportSelect = (event) => {
        const selectedReportId = parseInt(event.target.value);
        const selectedReport = reports.find(report => report.id === selectedReportId);
        setVaccineInAdd(prevState => ({ ...prevState, report: selectedReport }));
    };
    
    const handleAnimalSelect = (event) => {
        const selectedAnimalId = parseInt(event.target.value);
        const selectedAnimal = animals.find(animal => animal.id === selectedAnimalId);
        setVaccineInAdd(prevState => ({ ...prevState, animal: selectedAnimal }));
    };
    

    return (
    <div className="vaccine-adder">
        <h3>Add Vaccine</h3>
        <input onChange={handleUserInput} type="text" value={vaccineInAdd.name} placeholder="Name" name="name" />
        <input onChange={handleUserInput} type="text" value={vaccineInAdd.code} placeholder="Code" name="code" />
        <input onChange={handleUserInput} type="date" value={vaccineInAdd.protectionStartDate} placeholder="Protection Start Date" name="protectionStartDate" />
        <input onChange={handleUserInput} type="date" value={vaccineInAdd.protectionFinishDate} placeholder="Protection Finish Date" name="protectionFinishDate" />

        <select onChange={handleReportSelect} name="reportId" value={vaccineInAdd.report ? vaccineInAdd.report.id : ""}>
            <option value="">Select a report</option>
            {reports.map(report => (
                <option key={report.id} value={report.id}>{report.title}</option>
            ))}
        </select>

        <select onChange={handleAnimalSelect} name="animalId" value={vaccineInAdd.animal ? vaccineInAdd.animal.id : ""}>
            <option value="">Select an animal</option>
            {animals.map(animal => (
                <option key={animal.id} value={animal.id}>{animal.name}</option>
            ))}
        </select>


        <button onClick={handleVaccineAdd}>Add</button>
    </div>
    )
}

export default VaccineAdder