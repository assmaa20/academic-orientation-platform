import { useEffect, useState } from "react";

import Hero from "../../components/Dashboard/Hero";
import QuickStats from "../../components/Dashboard/QuickStats";
import SearchSection from "../../components/Dashboard/SearchSection";
import RecentFilieres from "../../components/Dashboard/RecentFilieres";
import AssistantCard from "../../components/Dashboard/AssistantCard";
import ActivityCard from "../../components/Dashboard/ActivityCard";

import api from "../../services/api";

export default function Dashboard() {

  const [stats, setStats] = useState({
    filieres: 0,
    universites: 0,
    diplomes: 0,
    metiers: 0,
  });

  const [filieres, setFilieres] = useState([]);

  const [search, setSearch] = useState("");

  useEffect(() => {
    loadStats();
  }, []);

  useEffect(() => {
    loadFilieres();
  }, [search]);

  const loadStats = async () => {
    try {
      const response = await api.get("/stats");
      setStats(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const loadFilieres = async () => {
    try {
      const response = await api.get("/filieres", {
        params: {
          search: search,
        },
      });

      setFilieres(response.data);

    } catch (error) {
      console.log(error);
    }
  };

  return (

    <div className="space-y-10">

      <Hero />

      <QuickStats stats={stats} />

      <SearchSection
        search={search}
        setSearch={setSearch}
      />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

        <div className="xl:col-span-2">

          <RecentFilieres
            filieres={filieres}
          />

        </div>

        <div className="space-y-8">

          <AssistantCard />

          <ActivityCard />

        </div>

      </div>

    </div>

  );

}