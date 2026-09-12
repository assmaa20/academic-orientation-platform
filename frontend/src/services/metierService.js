import axios from "axios";

const api = axios.create({

    baseURL: "http://127.0.0.1:8000"

});


// ==========================================================
// Liste des métiers
// ==========================================================

export async function getJobs() {

    const response = await api.get(

        "/metiers"

    );

    return response.data;

}


// ==========================================================
// Détails d'un métier
// ==========================================================

export async function getJob(id) {

    const response = await api.get(

        `/metiers/${encodeURIComponent(id)}`

    );

    return response.data;

}


// ==========================================================
// Statistiques
// ==========================================================

export async function getJobStatistics(id) {

    const response = await api.get(

        `/metiers/${encodeURIComponent(id)}/statistics`

    );

    return response.data;

}


// ==========================================================
// Filières
// ==========================================================

export async function getJobPrograms(id) {

    const response = await api.get(

        `/metiers/${encodeURIComponent(id)}/programs`

    );

    return response.data;

}


// ==========================================================
// Universités
// ==========================================================

export async function getJobUniversities(id) {

    const response = await api.get(

        `/metiers/${encodeURIComponent(id)}/universities`

    );

    return response.data;

}


// ==========================================================
// Disciplines
// ==========================================================

export async function getJobDisciplines(id) {

    const response = await api.get(

        `/metiers/${encodeURIComponent(id)}/disciplines`

    );

    return response.data;

}


// ==========================================================
// Langues
// ==========================================================

export async function getJobLanguages(id) {

    const response = await api.get(

        `/metiers/${encodeURIComponent(id)}/languages`

    );

    return response.data;

}