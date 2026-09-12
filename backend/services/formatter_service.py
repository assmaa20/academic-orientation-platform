class FormatterService:

    def format(self, filieres):

        results = []

        for score, f in filieres:

            results.append({

                # Recherche
                "score": round(score, 3),

                # Identifiants
                "id": f.id,
                "code_universite": f.code_universite,
                "code_etablissement": f.code_etablissement,
                "code_filiere": f.code_filiere,
                "code_diplome": f.code_diplome,

                # Informations générales
                "diplome": f.libelle_diplome,
                "discipline": f.discipline,
                "langue": f.langue,
                "session": f.session,
                "annee": f.annee,
                "annee_validite": f.annee_validite,
                "duree_accreditation": f.duree_accreditation,

                # Description
                "description": f.description,
                "competences": f.competences,
                "connaissances": f.connaissances,
                "matieres": f.matieres,
                "marche_travail": f.marche_travail,
                "metiers": f.metiers,
                "poursuite_etudes": f.poursuite_etudes,
                "series_bac": f.series_bac,

                # Accès
                "acces_dossier": f.acces_dossier,
                "acces_concours": f.acces_concours,
                "acces_autre": f.acces_autre,
                "acces_autres_annees": f.acces_autres_annees,

                # Enseignement
                "presentiel": f.presentiel,
                "distance": f.distance,
                "alternance": f.alternance,

                # Tronc commun
                "id_tronc_commun": f.id_tronc_commun,
                "libelle_tronc_commun": f.libelle_tronc_commun

            })

        return results