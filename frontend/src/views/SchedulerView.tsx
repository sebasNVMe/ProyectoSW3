import FilterExportBar from "../components/scheduler/FilterExportBar";
import AppointmentsTable from "../components/scheduler/AppointmentsTable";
import { useSchedulerViewModel } from "../viewmodels/useSchedulerViewModel";

export default function SchedulerView() {
    const {
        // Filters
        filterCodProf,
        setFilterCodProf,
        filterDate,
        setFilterDate,
        filterCedula,
        setFilterCedula,
        handleFilter,

        // Data
        professionals,
        appointments,
        totalAppointments,
        isLoadingAppointments,
        isErrorAppointments,
        displayDate,

        // Actions
        changeStatus,
        isChangingStatus,
        cancel,
        isCancelling,
        handleExportCSV,
    } = useSchedulerViewModel();

    return (
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
            <FilterExportBar
                professionals={professionals}
                filterCodProf={filterCodProf}
                setFilterCodProf={setFilterCodProf}
                filterDate={filterDate}
                setFilterDate={setFilterDate}
                filterCedula={filterCedula}
                setFilterCedula={setFilterCedula}
                onFilter={handleFilter}
                onExportCSV={handleExportCSV}
            />
            <AppointmentsTable
                appointments={appointments}
                totalAppointments={totalAppointments}
                displayDate={displayDate}
                isLoading={isLoadingAppointments}
                isError={isErrorAppointments}
                onChangeStatus={(id, status) => changeStatus({ id, status })}
                onCancel={(id) => cancel(id)}
                isChangingStatus={isChangingStatus}
                isCancelling={isCancelling}
            />
        </div>
    );
}
