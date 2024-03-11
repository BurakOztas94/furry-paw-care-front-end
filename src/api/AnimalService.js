import axios from "axios";

export const getAnimals = async () => {
    const { data } = await axios.get(
        import.meta.env.VITE_APP_BASE_URL + `animals`
    );

    return data;
};

export const deleteAnimal = async (id) => {
    const { data } = await axios.delete(
        import.meta.env.VITE_APP_BASE_URL + `animals/` + id
    );

    return data;
};

export const createAnimal = async (animal) => {
    const { data } = await axios.post(
        import.meta.env.VITE_APP_BASE_URL + `animals`,
        animal
    );

    return data;
};

export const updateAnimal = async (animal) => {
    const { data } = await axios.put(
        import.meta.env.VITE_APP_BASE_URL + `animals/${animal.id}`,
        animal
    );

    return data;
};