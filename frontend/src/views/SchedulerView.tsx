import FilterExportBar from "../components/scheduler/FilterExportBar";
import AppointmentsTable from "../components/scheduler/AppointmentsTable";

export default function SchedulerView() {
    return (
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
            <FilterExportBar />
            <AppointmentsTable />
        </div>
    );
}
