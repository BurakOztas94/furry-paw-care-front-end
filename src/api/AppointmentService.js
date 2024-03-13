import axios from "axios";

export const getAppointments = async () => {
    const { data } = await axios.get(
        import.meta.env.VITE_APP_BASE_URL + `appointments`
    );

    return data;
};

export const deleteAppointment = async (id) => {
    const { data } = await axios.delete(
        import.meta.env.VITE_APP_BASE_URL + `appointments/` + id
    );

    return data;
};

export const createAppointment = async (appointment) => {
    const { data } = await axios.post(
        import.meta.env.VITE_APP_BASE_URL + `appointments`,
        appointment
    );

    return data;
};

export const updateAppointment = async (appointment) => {
    const { data } = await axios.put(
        import.meta.env.VITE_APP_BASE_URL + `appointments/${appointment.id}`,
        appointment
    );

    return data;
};