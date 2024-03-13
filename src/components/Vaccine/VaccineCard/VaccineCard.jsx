import { useEffect, useState } from "react"
import "./VaccineCard.style.css"
import { getReports } from "../../../api/ReportService"
import { updateVaccine, deleteVaccine } from "../../../api/VaccineService"
import { getAnimals } from "../../../api/AnimalService"

const VaccineCard = ({ vaccine, setVaccines }) => {
    const [vaccineInCard, setVaccineInCard] = useState(vaccine);
    const [reports, setReports] = useState([]);
    const [animals, setAnimals] = useState([])

    useEffect(() => {
        setVaccineInCard(vaccine);
    }, [vaccine]);

    useEffect(() => {
        getReports().then(data => {
            setReports(data);
        });
    }, []);

    useEffect(() => {
        getAnimals().then(data => {
            setAnimals(data);
        });
    }, []);

    const handleReportSelect = (event) => {
        const selectedReportId = parseInt(event.target.value);
        const selectedReport = reports.find(report => report.id === selectedReportId);
        setVaccineInCard({ ...vaccineInCard, report: selectedReport });
    };

    const handleAnimalSelect = (event) => {
        const selectedAnimalId = parseInt(event.target.value);
        const selectedAnimal = animals.find(animal => animal.id === selectedAnimalId);
        setVaccineInCard({ ...vaccineInCard, animal: selectedAnimal });
    };

    const handleVaccineUpdate = () => {
        updateVaccine(vaccineInCard).then(data => {
            setVaccines(prev => [...prev.filter(obj => obj.id !== vaccineInCard.id), data]);
        });
    };

    const handleVaccineDelete = () => {
        deleteVaccine(vaccineInCard.id).then(() => {
            setVaccines(prev => prev.filter(obj => obj.id !== vaccineInCard.id));
        });
    };

    const handleUserInput = (event) => {
        setVaccineInCard({ ...vaccineInCard, [event.target.name]: event.target.value });
    };

    return (
        <div className="vaccine-card">
            <input onChange={handleUserInput} type="text" value={vaccineInCard.name} placeholder="Name" name="name" />
        <input onChange={handleUserInput} type="text" value={vaccineInCard.code} placeholder="Code" name="code" />
        <input onChange={handleUserInput} type="date" value={vaccineInCard.protectionStartDate} placeholder="Protection Start Date" name="protectionStartDate" />
        <input onChange={handleUserInput} type="date" value={vaccineInCard.protectionFinishDate} placeholder="Protection Finish Date" name="protectionFinishDate" />
    
    <select onChange={handleReportSelect} name="reportId" value={vaccineInCard.report ? vaccineInCard.report.id : ""}>
        <option value="">Select a report</option>
        {reports.map(report => (
            <option key={report.id} value={report.id}>{report.title}</option>
        ))}
    </select>

    <select onChange={handleAnimalSelect} name="animalId" value={vaccineInCard.animal ? vaccineInCard.animal.id : ""}>
        <option value="">Select an animal</option>
        {animals.map(animal => (
            <option key={animal.id} value={animal.id}>{animal.name}</option>
        ))}
    </select>

            <div>
                <button onClick={handleVaccineUpdate}>Update</button>
                <button onClick={handleVaccineDelete}>Delete</button>
            </div>
        </div>
    );
};

export default VaccineCard;
