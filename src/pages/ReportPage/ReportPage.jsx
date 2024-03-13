import { useEffect, useState } from "react"
import "./ReportPage.style.css"
import { getReports } from "../../api/ReportService"
import ReportCard from "../../components/Report/ReportCard/ReportCard"
import ReportAdder from "../../components/Report/ReportAdder/ReportAdder"

const ReportPage = () => {
    const [reports, setReports] = useState([])

    useEffect(() => {
        getReports().then(data => {
            setReports(data)
        })
    }, [])


    return (
        <div className="report-page">
            <h2>Report Management</h2>

            <div className="report-list-container">
                <h3>Report List</h3>

                <div className="report-list">
                    {reports.map(report => (
                        <ReportCard key={report.id} report={report} setReports={setReports}/>
                    ))}
                </div>
            </div>

            <ReportAdder setReports={setReports}/>
        </div>
    )
}

export default ReportPage