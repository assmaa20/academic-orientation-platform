import api from "./api";

// ======================================================
// Liste des filières
// GET /filieres?search=...&page=...&limit=...
// ======================================================

export const getFilieres = async (

    search = "",

    page = 1,

    limit = 20

) => {

    try {

        const response = await api.get(

            "/filieres",

            {

                params: {

                    search,

                    page,

                    limit

                }

            }

        );

        return response.data;

    }

    catch (error) {

        console.error(

            "Erreur lors du chargement des filières :",

            error

        );

        return [];

    }

};

// ======================================================
// Une filière
// ======================================================

export const getFiliere = async (id) => {

    try {

        const response = await api.get(

            `/filieres/${id}`

        );

        return response.data;

    }

    catch (error) {

        console.error(

            "Erreur lors du chargement de la filière :",

            error

        );

        return null;

    }

};