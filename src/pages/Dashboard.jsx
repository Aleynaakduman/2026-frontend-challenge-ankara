import React, { useState, useEffect } from "react";
import { Search, MapPin, MessageSquare, Eye, FileText, UserCheck, ChevronRight, AlertTriangle, User } from "lucide-react";
import "../css/Dashboard.css";

const categoryConfig = {
  "261065067494966": { label: "Checkin", icon: <UserCheck size={20} />, color: "#dcfce7" },
  "261065765723966": { label: "Message", icon: <MessageSquare size={20} />, color: "#e0f2fe" },
  "261065244786967": { label: "Sighting", icon: <Eye size={20} />, color: "#fee2e2" },
  "261065509008958": { label: "Personal Note", icon: <FileText size={20} />, color: "#fef9c3" },
  "261065875889981": { label: "Anonymous Tip", icon: <AlertTriangle size={20} />, color: "#ffedd5" },
};

const riskStyles = {
  Kritik: { bg: "#fee2e2", color: "#991b1b" },
  Yüksek: { bg: "#ffedd5", color: "#9a3412" },
  Orta: { bg: "#fef9c3", color: "#854d0e" },
};

export default function Dashboard() {
  const [cases, setCases] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  
  const API_KEY = "ad39735f1449a6dc28d60e0921352665"; 

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true);
        const formIds = Object.keys(categoryConfig);
        
        
        const requests = formIds.map(id => 
          fetch(`https://api.jotform.com/form/${id}/submissions?apiKey=${API_KEY}`)
            .then(res => res.json())
        );

        const results = await Promise.all(requests);
        let allSubmissions = [];

        results.forEach((data, index) => {
          if (data.responseCode === 200) {
            const formSubmissions = data.content.map(sub => ({
              id: sub.id,
              typeId: sub.form_id, 
              // Jotform'daki cevapları parse etme (Soru ID'lerine göre düzenle)
              title: `${categoryConfig[sub.form_id].label} Kaydı`,
              desc: extractAnswer(sub.answers, "desc") || "Detay belirtilmemiş.",
              time: new Date(sub.created_at).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }),
              location: extractAnswer(sub.answers, "location") || "Konum Bilgisi Yok",
              risk: "Orta", // İstersen formdaki bir soruya göre dinamik yapabilirsin
            }));
            allSubmissions = [...allSubmissions, ...formSubmissions];
          }
        });

        // Tarihe göre sırala 
        allSubmissions.sort((a, b) => b.id - a.id);
        setCases(allSubmissions);
      } catch (err) {
        console.error("API Hatası:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);


  const extractAnswer = (answers, type) => {
   
    const mapping = {
      desc: ["3", "4", "5"], 
      location: ["6", "7"]  
    };
    
    for (let id of mapping[type]) {
      if (answers[id]?.answer) return answers[id].answer;
    }
    return null;
  };

  if (loading) return <div className="loading-screen">Veriler Senkronize Ediliyor...</div>;

  return (
    <div className="container">
      {/* SOL PANEL */}
      <aside className="left-panel">
        <h3 className="small-title">İstihbarat Paneli</h3>
        <div className="search-box">
          <Search size={16} color="#94a3b8" />
          <input placeholder="ID veya Konum ara..." />
        </div>

        <h4 className="small-title">Kategoriler</h4>
        {Object.entries(categoryConfig).map(([id, config]) => (
          <div key={id} className="filter-item">
            {config.icon}
            <span>{config.label}</span>
          </div>
        ))}
      </aside>

      {/* ORTA PANEL - AKIŞ */}
      <main className="center-panel">
        <h2 style={{ marginBottom: "24px", fontWeight: 800 }}>Vaka Akışı ({cases.length})</h2>
        {cases.map((c) => {
          const config = categoryConfig[c.typeId];
          return (
            <div
              key={c.id}
              className={`case-card ${selected?.id === c.id ? "selected" : ""}`}
              onClick={() => setSelected(c)}
            >
              <div className="icon-box" style={{ backgroundColor: config.color }}>
                {config.icon}
              </div>

              <div className="card-body">
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <strong>{c.title}</strong>
                  <span className="time">{c.time}</span>
                </div>
                <div className="type-id">Submission ID: {c.id}</div>
                <p className="desc" style={{ marginTop: "4px" }}>{c.desc}</p>
              </div>
              <ChevronRight size={18} color="#cbd5e1" />
            </div>
          );
        })}
      </main>

      {/* SAĞ PANEL*/}
      <aside className="right-panel">
        {!selected ? (
          <div className="empty-msg">Analiz için bir kayıt seçin</div>
        ) : (
          <>
            <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
              <div style={{ background: "#f1f5f9", padding: "10px", borderRadius: "8px" }}>
                <User size={24} />
              </div>
              <div>
                <strong style={{ fontSize: "18px" }}>Detay Analizi</strong>
                <div className="type-id">VAKA: {selected.id}</div>
              </div>
            </div>

            <div className="risk-badge" style={{ backgroundColor: riskStyles[selected.risk].bg, color: riskStyles[selected.risk].color }}>
              <AlertTriangle size={18} />
              {selected.risk} Risk Seviyesi
            </div>

            <div className="info-block">
              <span className="label">KATEGORİ</span>
              <div style={{ fontWeight: 600, fontSize: "14px", color: "#334155" }}>
                {categoryConfig[selected.typeId].label}
              </div>
            </div>

            <div className="info-block">
              <span className="label">KONUM</span>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", fontWeight: 600 }}>
                <MapPin size={16} color="#ef4444" />
                {selected.location}
              </div>
            </div>

            <div className="info-block">
              <span className="label">İÇERİK</span>
              <p className="note-box">{selected.desc}</p>
            </div>

           
          </>
        )}
      </aside>
    </div>
  );
}