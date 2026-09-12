import axios from "axios";

const api = axios.create({

    baseURL: "http://127.0.0.1:8000"

});


// ==========================================================
// Liste des universités
// ==========================================================

export async function getUniversities() {

    const response = await api.get(

        "/universities"

    );

    return response.data;

}


// ==========================================================
// Détails d'une université
// ==========================================================

export async function getUniversity(

    universityId

) {

    const response = await api.get(

        `/universities/${universityId}`

    );

    return response.data;

}


// ==========================================================
// Statistiques
// ==========================================================

export async function getUniversityStatistics(

    universityId

) {

    const response = await api.get(

        `/universities/${universityId}/statistics`

    );

    return response.data;

}


// ==========================================================
// Filières
// ==========================================================

export async function getUniversityPrograms(

    universityId

) {

    const response = await api.get(

        `/universities/${universityId}/programs`

    );

    return response.data;

}


// ==========================================================
// Disciplines
// ==========================================================

export async function getUniversityDisciplines(

    universityId

) {

    const response = await api.get(

        `/universities/${universityId}/disciplines`

    );

    return response.data;

}


// ==========================================================
// Métiers
// ==========================================================

export async function getUniversityJobs(

    universityId

) {

    const response = await api.get(

        `/universities/${universityId}/jobs`

    );

    return response.data;

}


// ==========================================================
// Langues
// ==========================================================

export async function getUniversityLanguages(

    universityId

) {

    const response = await api.get(

        `/universities/${universityId}/languages`

    );

    return response.data;

}