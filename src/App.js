import React, { useState, useRef } from "react";

const C = {
  bg: "#F4F6FA", card: "#FFFFFF",
  border: "#E4E8F0", borderMed: "#C8D0E0",
  text: "#0F172A", textMed: "#334155", textSoft: "#64748B", textXsoft: "#94A3B8",
  red: "#DC2626", redBg: "#FEF2F2", redBorder: "#FECACA",
  orange: "#D97706", orangeBg: "#FFFBEB", orangeBorder: "#FDE68A",
  blue: "#1D4ED8", blueBg: "#EFF6FF", blueBorder: "#BFDBFE",
  green: "#15803D", greenBg: "#F0FDF4", greenBorder: "#BBF7D0",
  purple: "#6D28D9", purpleBg: "#F5F3FF", purpleBorder: "#DDD6FE",
  teal: "#0F766E", tealBg: "#F0FDFA", tealBorder: "#99F6E4",
  pink: "#BE185D", pinkBg: "#FDF2F8", pinkBorder: "#F9A8D4",
  indigo: "#3730A3", indigoBg: "#EEF2FF", indigoBorder: "#C7D2FE",
  slate: "#374151", slateBg: "#F8FAFC",
  accent: "#1D4ED8", new: "#7C3AED",
};

const ICONS = {
  heart: "M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z",
  zap: "M13 2 3 14 12 14 11 22 21 10 12 10 13 2",
  brain: "M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-2.66Z",
  lungs: "M6 4v6a6 6 0 0 0 12 0V4 M12 4v12",
  flask: "M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v11l-5 5a2 2 0 0 0 1.41 3.41L8 22h8l2.59-.59A2 2 0 0 0 20 19l-5-5V3",
  skull: "M12 2C6.5 2 2 6.5 2 12c0 3.5 2 6.5 5 8h10c3-1.5 5-4.5 5-8 0-5.5-4.5-10-10-10Z M8 17v4 M16 17v4",
  bug: "M8 2l1.88 1.88 M14.12 3.88 16 2 M9 7.13v-1a3.003 3.003 0 1 1 6 0v1 M12 20c-3.3 0-6-2.7-6-6v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v3c0 3.3-2.7 6-6 6z M12 20v-9 M6.53 9C4.6 8.8 3 7.1 3 5 M17.47 9c1.93-.2 3.53-1.9 3.53-4",
  stomach: "M12 2C9.4 2 7 4 7 7v2c0 1.5-1.5 3-3 5s-1 6 2 8h12c3-2 4-5.5 2-8s-3-3.5-3-5V7c0-3-2.4-5-5-5z",
  blood: "M12 2 8.5 8.5C7 11 7 13 8.5 15A5 5 0 0 0 17.5 15C19 13 19 11 17.5 8.5z M12 22v-7",
  baby: "M9 12h.01 M15 12h.01 M10 16c.5.3 1.2.5 2 .5s1.5-.2 2-.5 M19 6.3a9 9 0 0 1 1.8 3.9 2 2 0 0 1 0 3.6 9 9 0 0 1-17.6 0 2 2 0 0 1 0-3.6A9 9 0 0 1 12 3c2 0 3.5 1.1 3.5 2.5s-.9 2.5-2 3",
  bone: "M17 10c.7-.1 1.4 0 2 .4a2 2 0 0 1 .8 1.3 2 2 0 0 1-.5 1.7l-1.2 1.2 M7 14c-.7.1-1.4 0-2-.4A2 2 0 0 1 4.2 12a2 2 0 0 1 .5-1.7L6 9 M12.5 5.5l-7 7 M15 5l1 1 M5 15l1 1 M9.5 5.5l7 7",
  activity: "M22 12h-4l-3 9L9 3l-3 9H2",
  mind: "M12 2a5 5 0 0 1 5 5v6a5 5 0 0 1-10 0V7a5 5 0 0 1 5-5z M8 17v1a4 4 0 0 0 8 0v-1",
  skin: "M3 14c0 1.9.8 3.6 2.1 4.9C6.4 20.2 8.1 21 10 21h4c1.9 0 3.6-.8 4.9-2.1C20.2 17.6 21 15.9 21 14V8a6 6 0 0 0-6-6H9a6 6 0 0 0-6 6v6z",
  ventilator: "M3 12h4l3-9 4 18 3-9h4 M21 6h-3 M3 6h3",
  list: "M8 6h13 M8 12h13 M8 18h13 M3 6h.01 M3 12h.01 M3 18h.01",
  search: "M11 17.5a6.5 6.5 0 1 0 0-13 6.5 6.5 0 0 0 0 13z M21 21l-4.35-4.35",
  back: "M15 18l-6-6 6-6",
  check: "M20 6 9 17l-5-5",
  refresh: "M1 4v6h6 M23 20v-6h-6 M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4-4.64 4.36A9 9 0 0 1 3.51 15",
  warning: "M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z M12 9v4 M12 17h.01",
  book: "M4 19.5A2.5 2.5 0 0 1 6.5 17H20 M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z",
  chevron: "M9 18l6-6-6-6",
  stethoscope: "M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6 6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3 M8 15v1a6 6 0 0 0 6 6 6 6 0 0 0 6-6v-4",
  calculator: "M4 2h16a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z M8 6h8 M8 10h3 M13 10h3 M8 14h3 M13 14h3 M8 18h8",
  syringe: "m18 2 4 4 M17 7l3-3 M19 9 8.7 19.3c-1 1-2.5 1-3.4 0l-.6-.6c-1-1-1-2.5 0-3.4L15 5 M9 11l4 4 M5 19l-3 3 M14 4l6 6",
  star: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
};

const SvgIcon = ({ name, size = 20, color = "currentColor" }) => {
  const d = ICONS[name] || "";
  const paths = d.split(" M ").filter(Boolean);
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {paths.map((seg, i) => <path key={i} d={(i === 0 && !seg.startsWith("M")) ? seg : (i === 0 ? seg : "M " + seg)} />)}
    </svg>
  );
};

const GradeBadge = ({ grade }) => {
  const cfg = { "1A": "#14532D", "1B": "#166534", "2A": "#78350F", "2B": "#92400E", "GPS": "#1E3A8A" };
  return <span style={{ fontSize: 8, fontWeight: 800, padding: "2px 5px", borderRadius: 3, background: cfg[grade] || C.textSoft, color: "#fff", letterSpacing: "0.06em", flexShrink: 0, whiteSpace: "nowrap" }}>{grade}</span>;
};

const UrgBadge = ({ tag }) => {
  const cfg = {
    "ABSOLUE": { bg: C.redBg, border: C.redBorder, text: C.red },
    "URGENT": { bg: C.orangeBg, border: C.orangeBorder, text: C.orange },
    "SURVEILLANCE": { bg: C.blueBg, border: C.blueBorder, text: C.blue },
  };
  const c = cfg[tag] || cfg["URGENT"];
  return <span style={{ fontSize: 9, fontWeight: 700, padding: "2px 7px", borderRadius: 3, background: c.bg, border: `1px solid ${c.border}`, color: c.text, letterSpacing: "0.08em" }}>{tag}</span>;
};

const NewBadge = () => <span style={{ fontSize: 8, fontWeight: 800, padding: "2px 6px", borderRadius: 3, background: C.new, color: "#fff", letterSpacing: "0.06em" }}>2025</span>;

const DoseCalc = ({ drugs, color }) => {
  const [weight, setWeight] = useState("");
  const w = parseFloat(weight);
  return (
    <div style={{ background: C.blueBg, border: `1px solid ${C.blueBorder}`, borderRadius: 10, padding: "12px 14px", marginTop: 4 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
        <SvgIcon name="syringe" size={14} color={C.blue} />
        <span style={{ fontSize: 11, fontWeight: 700, color: C.blue }}>Calculateur de doses</span>
        <div style={{ marginLeft: "auto", opacity: 0.6 }}>
          <SyringeIllustration size={60} color={C.blue} />
        </div>
      </div>
      <input type="number" value={weight} onChange={e => setWeight(e.target.value)} placeholder="Poids en kg" style={{ width: "100%", border: `1.5px solid ${C.blueBorder}`, borderRadius: 8, padding: "8px 10px", fontSize: 14, color: C.text, outline: "none", fontFamily: "inherit", background: "#fff", boxSizing: "border-box" }} />
      {w > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 10 }}>
          {drugs.map((drug, i) => {
            let displayDose;
            if (drug.fixed) {
              displayDose = drug.fixed;
            } else {
              const raw = drug.perKg * w;
              const capped = drug.max ? Math.min(raw, drug.max) : raw;
              displayDose = capped.toFixed(drug.round ?? 0) + " " + drug.unit;
              if (drug.max && raw > drug.max) displayDose += " (max atteint)";
            }
            return (
              <div key={i} style={{ background: "#fff", borderRadius: 6, padding: "8px 10px", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: C.text }}>{drug.name}</div>
                  {drug.detail && <div style={{ fontSize: 10, color: C.textSoft, marginTop: 1 }}>{drug.detail}</div>}
                </div>
                <div style={{ fontSize: 12, fontWeight: 800, color: color || C.blue, textAlign: "right", whiteSpace: "nowrap" }}>{displayDose}</div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
const SPECS = [
  {
    id: "acr", label: "Arrêt Cardio-Respiratoire", short: "ACR", iconName: "zap", color: C.red, bgColor: C.redBg,
    protos: [
      {
        name: "Réanimation Cardio-Pulmonaire Avancée — ERC 2025",
        urgence: "ABSOLUE", isNew: true,
        aliases: ["ACR", "arrêt cardiaque", "fibrillation ventriculaire", "asystolie", "activité électrique sans pouls", "massage cardiaque", "FV", "AESP"],
        sections: [
          { title: "Prise en charge immédiate", items: [
            { text: "Massage cardiaque externe : 100 à 120 compressions par minute, profondeur 5 à 6 cm, décompression complète entre chaque compression — ratio 30 compressions pour 2 insufflations jusqu'au monitorage", grade: "1A" },
            { text: "Voie veineuse périphérique ou intraosseuse — oxygène 100% — capnographie obligatoire si intubé : courbe plate en fin d'expiration = mauvaise position ou réanimation inefficace", grade: "1A" },
            { text: "Minimiser les interruptions : pause < 5 secondes pour l'analyse du rythme, < 10 secondes pour la défibrillation", grade: "1A" },
          ]},
          { title: "Rythme choquable : fibrillation ventriculaire ou tachycardie ventriculaire sans pouls", items: [
            { text: "Défibrillation biphasique 200 joules → reprendre le massage cardiaque IMMÉDIATEMENT sans vérifier le pouls (2 minutes avant la prochaine analyse)", grade: "1A" },
            { text: "Adrénaline (épinéphrine) 1 mg en injection intraveineuse directe après le 2ème choc, puis toutes les 3 à 5 minutes", grade: "1A" },
            { text: "Amiodarone (Cordarone®) 300 mg en injection intraveineuse directe après le 3ème choc — 150 mg supplémentaires si récidive de fibrillation ventriculaire", grade: "1B" },
          ]},
          { title: "Rythme non choquable : asystolie ou activité électrique sans pouls", items: [
            { text: "Adrénaline 1 mg en injection intraveineuse directe dès la pose de la voie veineuse, puis toutes les 3 à 5 minutes", grade: "1A" },
            { text: "Rechercher et corriger la cause réversible en priorité absolue", grade: "1A" },
          ]},
          { title: "Causes réversibles — règle des 4H et 4T", items: [
            { text: "4H : Hypoxie — Hypovolémie — Hypo ou Hyperkaliémie — Hypothermie", grade: "GPS" },
            { text: "4T : Tamponnade péricardique — Tension pneumothorax — Thrombose (embolie pulmonaire ou infarctus) — Toxiques ou médicaments", grade: "GPS" },
          ]},
          { title: "Soins post-récupération d'activité cardiaque spontanée — ERC 2025", items: [
            { text: "Éviter l'hyperthermie : cible température ≤ 37,5°C pendant 72 heures — la fièvre post-arrêt cardiaque aggrave le pronostic neurologique (données de l'essai TTM2, 2021)", grade: "1A", isNew: true },
            { text: "Coronarographie urgente si sus-décalage du segment ST — pas systématique en l'absence de sus-ST (essais COACT et TOMAHAWK, 2021–2023)", grade: "1B", isNew: true },
            { text: "Neuroprognostication : délai minimum 72 heures après l'arrêt de la sédation — combiner électroencéphalogramme, potentiels évoqués et imagerie cérébrale", grade: "GPS" },
          ]},
        ],
        source: "ERC Guidelines 2025 · ILCOR CoSTR 2025 · Dankiewicz NEJM 2021 (TTM2) · Lemkes NEJM 2019 (COACT)"
      },
      {
        name: "Syndrome Coronarien Aigu avec sus-décalage ST (STEMI)",
        urgence: "ABSOLUE",
        aliases: ["infarctus du myocarde", "IDM", "STEMI", "sus-décalage ST", "douleur thoracique constrictive", "douleur bras gauche"],
        sections: [
          { title: "Diagnostic et délais cibles", items: [
            { text: "Électrocardiogramme dans les 10 minutes suivant le premier contact médical — sus-décalage ST ≥ 1 mm dans au moins 2 dérivations contiguës, ou bloc de branche gauche nouveau", grade: "1A" },
            { text: "Objectif : premier contact médical → ouverture de l'artère (ballon) < 90 minutes (< 120 si transfert inter-hospitalier)", grade: "1A" },
          ]},
          { title: "Traitement antithrombotique immédiat", items: [
            { text: "Aspirine (acide acétylsalicylique) 250 mg en injection intraveineuse directe, ou 300 mg à croquer par voie orale", grade: "1A" },
            { text: "Ticagrélor (Brilique®) 180 mg par voie orale en dose de charge — ou Prasugrel (Efient®) 60 mg si intervention coronaire prévue, patient < 75 ans, sans antécédent d'accident vasculaire cérébral", grade: "1A" },
            { text: "Héparine non fractionnée 70 à 100 unités/kg en injection intraveineuse directe (maximum 5 000 unités) avant l'intervention coronaire percutanée", grade: "1A" },
            { text: "Oxygène uniquement si saturation en oxygène < 90% — l'oxygène systématique est délétère si la saturation est normale", grade: "1A" },
          ]},
          { title: "Stratégie de reperfusion", items: [
            { text: "Intervention coronaire percutanée (angioplastie) primaire : stratégie de choix — objectif premier contact médical → ballon < 90 minutes", grade: "1A" },
            { text: "Thrombolyse si intervention coronaire percutanée impossible dans les délais : Ténectéplase (Metalyse®) en injection intraveineuse directe unique selon poids (30 mg < 60 kg, 35 mg de 60 à 70 kg, 40 mg de 70 à 80 kg, 45 mg de 80 à 90 kg, 50 mg > 90 kg)", grade: "1A" },
            { text: "Après thrombolyse réussie : transfert pour intervention coronaire percutanée dans les 2 à 24 heures", grade: "1B" },
          ], hasDoseCalc: true, drugs: [
            { name: "Ténectéplase (Metalyse®) — injection unique", detail: "0,5 mg/kg IV direct, max 50 mg", perKg: 0.5, unit: "mg", max: 50, round: 0 },
            { name: "Héparine non fractionnée avant ICP", detail: "Bolus IV", perKg: 80, unit: "UI", max: 5000, round: 0 },
          ]},
          { title: "Choc cardiogénique associé", items: [
            { text: "Intervention coronaire percutanée en urgence même si présentation tardive (étude SHOCK 1999 : nombre nécessaire à traiter = 8)", grade: "1B" },
            { text: "Noradrénaline (Levophed®) : vasopresseur de première ligne — supérieure à la dopamine en mortalité dans le choc cardiogénique", grade: "1A", isNew: true },
            { text: "Dobutamine 5 à 20 microgrammes/kg/minute : soutien inotrope si bas débit documenté — éviter si fréquence cardiaque > 110/minute", grade: "2B" },
          ]},
        ],
        source: "ESC STEMI Guidelines 2023 · Ibanez EHJ 44:3720 · Hochman NEJM 1999 (SHOCK)"
      },
      {
        name: "Tachycardie Ventriculaire et Torsades de Pointes",
        urgence: "ABSOLUE",
        aliases: ["tachycardie ventriculaire", "TV", "FV fibrillation ventriculaire", "QRS large tachycardie", "torsades de pointes", "QT long"],
        sections: [
          { title: "Si instabilité hémodynamique (hypotension, perte de conscience)", items: [
            { text: "Cardioversion électrique externe synchronisée d'emblée : 200 joules biphasique — ne pas attendre", grade: "1A" },
          ]},
          { title: "Tachycardie ventriculaire monomorphe stable hémodynamiquement", items: [
            { text: "Amiodarone (Cordarone®) 150 mg en injection intraveineuse directe sur 10 minutes, puis 1 mg/minute pendant 6 heures par seringue électrique", grade: "1B" },
            { text: "Vérapamil intraveineux CONTRE-INDIQUÉ si tachycardie ventriculaire — risque d'effondrement hémodynamique mortel", grade: "1A" },
          ]},
          { title: "Torsades de pointes (tachycardie ventriculaire polymorphe sur QT long)", items: [
            { text: "Sulfate de magnésium 2 g par voie intraveineuse sur 10 à 15 minutes — efficace même si la magnésémie est normale", grade: "1B" },
            { text: "Corriger impérativement : kaliémie cible > 4,5 mmol/L — calcémie — arrêter tous les médicaments allongeant le QTc", grade: "1A" },
            { text: "Si bradycardie déclenchante : entraînement électrosystolique transcutané 90/minute pour réduire le QTc — amiodarone contre-indiquée (allonge le QT)", grade: "GPS" },
          ]},
        ],
        source: "ESC Ventricular Arrhythmias Guidelines 2022 · Zeppenfeld EHJ 43:3997"
      },
      {
        name: "Bradycardie Symptomatique et Bloc Auriculo-Ventriculaire",
        urgence: "URGENT",
        aliases: ["bradycardie", "bloc auriculo-ventriculaire", "BAV", "BAV complet", "syncope vagale", "bradycardie médicamenteuse"],
        sections: [
          { title: "Traitement médicamenteux", items: [
            { text: "Atropine 0,5 mg en injection intraveineuse directe — répéter toutes les 3 à 5 minutes jusqu'à 3 mg au total (au-delà : effet paradoxal possible)", grade: "1A" },
            { text: "Si atropine inefficace : Isoprénaline 2 à 10 microgrammes/minute par seringue électrique — ou Adrénaline 2 à 10 microgrammes/minute par seringue électrique", grade: "1B" },
          ]},
          { title: "Entraînement électrosystolique d'urgence", items: [
            { text: "Stimulation transcutanée si bradycardie persistante et instabilité hémodynamique — douloureuse, nécessite une sédation légère (midazolam 1 à 2 mg intraveineux)", grade: "1A" },
            { text: "Sonde d'entraînement électrosystolique endocavitaire en urgence si : bloc auriculo-ventriculaire complet symptomatique, bradycardie réfractaire aux médicaments", grade: "1A" },
          ]},
          { title: "Causes à rechercher et traiter", items: [
            { text: "Médicaments : bêtabloquants, inhibiteurs calciques bradycardisants (vérapamil, diltiazem), digitaliques, amiodarone", grade: "GPS" },
            { text: "Infarctus inférieur : bloc auriculo-ventriculaire de haut degré (coronarographie urgente si ischémie active)", grade: "GPS" },
            { text: "Hyperkaliémie — Hypothermie — Hypothyroïdie — Hypertonie vagale (syncope vasovagale)", grade: "GPS" },
          ]},
        ],
        source: "ESC Cardiac Pacing Guidelines 2021 · Glikson EHJ 42:3427"
      },
      {
        name: "Dissection Aortique Aiguë",
        urgence: "ABSOLUE",
        aliases: ["dissection aortique", "dissection aorte type A type B", "douleur thoracique déchirante", "anévrisme disséquant"],
        sections: [
          { title: "Diagnostic", items: [
            { text: "Douleur thoracique ou dorsale brutale, migratrice (de l'avant vers l'arrière), qualifiée de déchirante ou arrachante — asymétrie des pouls ou de la pression artérielle entre les deux bras", grade: "GPS" },
            { text: "Angio-scanner thoraco-abdomino-pelvien en urgence : examen de référence — Echographie transthoracique si instabilité hémodynamique (recherche épanchement péricardique, insuffisance aortique)", grade: "1A" },
          ]},
          { title: "Type A (atteinte de l'aorte ascendante) — Chirurgie urgente", items: [
            { text: "Contrôle tensionnel en urgence : bêtabloquant intraveineux (esmolol ou labétalol) — cible fréquence cardiaque 60/minute et pression artérielle systolique 100 à 120 mmHg", grade: "1A" },
            { text: "Chirurgie cardio-vasculaire en urgence absolue — appel immédiat de l'équipe chirurgicale — aucune anticoagulation en phase aiguë", grade: "1A" },
          ]},
          { title: "Type B (aorte descendante uniquement)", items: [
            { text: "Contrôle tensionnel strict par voie intraveineuse : cible pression artérielle systolique 100 à 120 mmHg", grade: "1A" },
            { text: "Endoprothèse aortique (TEVAR) si complications : ischémie viscérale, expansion rapide, rupture menaçante", grade: "1B" },
          ]},
        ],
        source: "ESC Guidelines Aortic Disease 2024 · Erbel EHJ 2014"
      },
      {
        name: "Tamponnade Péricardique",
        urgence: "ABSOLUE",
        aliases: ["tamponnade", "épanchement péricardique compressif", "triade de Beck", "tamponnade cardiaque"],
        sections: [
          { title: "Diagnostic", items: [
            { text: "Triade de Beck (incomplète dans 30% des cas) : hypotension + turgescence jugulaire + bruits cardiaques étouffés", grade: "GPS" },
            { text: "Échographie cardiaque : compression des cavités droites en diastole — pendulum du cœur — signe de la veine cave inférieure non collabante", grade: "1A" },
            { text: "Pulsus paradoxus : chute de la pression artérielle systolique > 10 mmHg à l'inspiration — signe physique évocateur", grade: "GPS" },
          ]},
          { title: "Péricardiocentèse — geste salvateur", items: [
            { text: "Péricardiocentèse sous guidage échographique en urgence : abord sous-xiphoïdien, aiguille orientée vers l'épaule gauche — évacuation d'un petit volume suffit souvent à décompenser le tableau", grade: "1A" },
            { text: "Si arrêt cardiaque sur tamponnade : péricardiocentèse sans attendre l'échographie — évacuer 50 à 100 mL suffit à récupérer un débit cardiaque", grade: "GPS" },
            { text: "Remplissage vasculaire prudent en attente du geste : 500 mL de cristalloïdes pour maintenir la précharge", grade: "GPS" },
          ]},
        ],
        source: "ESC Pericardial Diseases 2015 (réf. en vigueur) · Spodick NEJM 2003"
      },
      {
        name: "Fibrillation Auriculaire à Réponse Ventriculaire Rapide",
        urgence: "URGENT",
        aliases: ["fibrillation auriculaire", "FA rapide", "flutter auriculaire", "tachycardie irrégulière", "arythmie FA réanimation"],
        sections: [
          { title: "Évaluation initiale", items: [
            { text: "Électrocardiogramme 12 dérivations : confirmer la fibrillation auriculaire (absence d'ondes P, irrégularité R-R) — évaluer la fréquence ventriculaire, la largeur des QRS, l'axe", grade: "1A" },
            { text: "Instabilité hémodynamique (hypotension, signes de choc, œdème pulmonaire aigu) → cardioversion électrique externe synchronisée d'emblée sans attendre", grade: "1A" },
            { text: "Durée de la fibrillation auriculaire : si > 48 heures ou inconnue → risque thromboembolique élevé avant tout contrôle du rythme — ne pas réduire sans anticoagulation préalable", grade: "1A" },
          ]},
          { title: "Contrôle de la fréquence — fibrillation auriculaire stable", items: [
            { text: "Métoprolol 5 mg en injection intraveineuse lente sur 5 minutes, répéter jusqu'à 3 fois — cible fréquence cardiaque < 110/minute", grade: "1A" },
            { text: "Amiodarone (Cordarone®) 150 mg en injection intraveineuse sur 10 minutes : si fibrillation auriculaire sur insuffisance cardiaque ou hémodynamique limite — contrôle de la fréquence et cardioversion pharmacologique possible", grade: "1B" },
            { text: "Digoxine 0,5 mg en injection intraveineuse lente : si dysfonction ventriculaire gauche sévère avec contre-indication aux bêtabloquants", grade: "1B" },
            { text: "Vérapamil 5 mg IV : UNIQUEMENT si fibrillation auriculaire à QRS fins et FEVG conservée — CONTRE-INDIQUÉ si insuffisance cardiaque systolique, hypotension, pré-excitation (WPW)", grade: "1B" },
          ]},
          { title: "Cardioversion électrique externe si instabilité hémodynamique", items: [
            { text: "Cardioversion électrique externe synchronisée 200 joules biphasique — sédation obligatoire avant le choc (propofol 1 mg/kg ou kétamine)", grade: "1A" },
            { text: "Fibrillation auriculaire < 48 heures : cardioversion possible sans anticoagulation préalable — anticoagulation curative démarrée immédiatement après", grade: "1A" },
            { text: "Fibrillation auriculaire > 48 heures ou durée inconnue : anticoagulation efficace ≥ 3 semaines avant la cardioversion, ou échographie transœsophagienne pour exclure un thrombus dans l'auricule gauche", grade: "1A" },
          ]},
          { title: "Anticoagulation", items: [
            { text: "Score CHA₂DS₂-VASc ≥ 2 chez l'homme ou ≥ 3 chez la femme : anticoagulation orale à long terme recommandée — anticoagulants oraux directs (NACO) prioritaires sur les AVK", grade: "1A" },
          ]},
        ],
        source: "ESC AF Guidelines 2024 · Hindricks EHJ 2021;42:373"
      },
      {
        name: "Syndrome Coronarien Aigu Sans Sus-Décalage ST (NSTEMI et Angor Instable)",
        urgence: "URGENT",
        aliases: ["NSTEMI", "angor instable", "SCA sans sus-décalage", "sous-décalage ST ischémie", "douleur thoracique troponine positive"],
        sections: [
          { title: "Stratification du risque — score GRACE", items: [
            { text: "Score GRACE ≥ 140 (risque élevé) : coronarographie dans les 24 heures — Score GRACE < 140 (risque intermédiaire) : dans les 72 heures", grade: "1A" },
            { text: "Critères de très haut risque → coronarographie immédiate < 2 heures : instabilité hémodynamique ou choc cardiogénique, arythmie ventriculaire grave, sus-décalage ST transitoire, douleur réfractaire", grade: "1A" },
          ]},
          { title: "Traitement antithrombotique", items: [
            { text: "Aspirine 250 mg en injection intraveineuse directe + Ticagrélor (Brilique®) 180 mg par voie orale en dose de charge (ou Clopidogrel 600 mg si Ticagrélor contre-indiqué)", grade: "1A" },
            { text: "Fondaparinux 2,5 mg en injection sous-cutanée : anticoagulant de référence dans les NSTEMI non en urgence immédiate (moins de saignements que l'HNF) — ou HNF 60 UI/kg IV si coronarographie prévue < 24h", grade: "1A" },
          ]},
          { title: "Traitement médical adjuvant", items: [
            { text: "Dérivés nitrés sublinguaux si douleur persistante et pression artérielle systolique > 90 mmHg", grade: "1B" },
            { text: "Statine à forte dose dès l'admission : atorvastatine 80 mg par voie orale", grade: "1A" },
            { text: "Bêtabloquants oraux si pas de contre-indication (insuffisance cardiaque aiguë, bradycardie, bronchospasme)", grade: "1B" },
          ]},
        ],
        source: "ESC ACS Guidelines 2023 · Collet EHJ 2021;42:1289"
      },
      {
        name: "Insuffisance Cardiaque Aiguë Décompensée — Œdème Pulmonaire Aigu",
        urgence: "URGENT",
        aliases: ["insuffisance cardiaque aiguë", "OAP", "œdème pulmonaire aigu", "décompensation cardiaque", "dyspnée orthopnée BNP"],
        sections: [
          { title: "Phénotype clinique et évaluation", items: [
            { text: "4 profils hémodynamiques : chaud-humide (majoritaire, congestion sans choc) · froid-humide (choc cardiogénique + congestion) · chaud-sec (décompensation modérée) · froid-sec (choc sans congestion)", grade: "GPS" },
            { text: "Examens urgents : BNP ou NT-proBNP (VPN élevée si normal), troponine, échocardiographie au lit du patient, radiographie thoracique, gaz du sang", grade: "1A" },
          ]},
          { title: "Traitement diurétique — profil congestif", items: [
            { text: "Furosémide (Lasilix®) 40 à 80 mg en injection intraveineuse directe si naïf de diurétique — ou dose équivalente à la dose orale habituelle", grade: "1A" },
            { text: "Perfusion continue de furosémide 5 à 10 mg/heure si résistance aux bolus — plus efficace que les bolus répétés (étude DOSE 2011)", grade: "1B" },
            { text: "Objectif : perte de 0,5 à 1 kg/jour — surveillance kaliémie (risque hypokaliémie) et créatinine", grade: "GPS" },
          ]},
          { title: "Vasodilatateurs et support ventilatoire", items: [
            { text: "Dérivés nitrés (isosorbide dinitrate) par seringue électrique si pression artérielle systolique > 110 mmHg : réduisent la précharge et la postcharge — amélioration rapide de la dyspnée", grade: "1B" },
            { text: "Ventilation non invasive (CPAP ou BiPAP) si saturation < 90% malgré oxygène à fort débit : réduit le taux d'intubation et la mortalité à court terme", grade: "1A" },
            { text: "Oxygène uniquement si saturation < 90% — l'hyperoxie aggrave le pronostic cardiovasculaire", grade: "1A" },
          ]},
        ],
        source: "ESC Heart Failure Guidelines 2023 Focused Update · McDonagh EHJ 2023"
      },
      {
        name: "Urgence Hypertensive — Hypertension Artérielle Maligne",
        urgence: "URGENT",
        aliases: ["HTA maligne", "urgence hypertensive", "crise hypertensive", "encéphalopathie hypertensive", "pression artérielle > 180/120"],
        sections: [
          { title: "Définition et bilan des atteintes cibles", items: [
            { text: "Urgence hypertensive : pression artérielle ≥ 180/120 mmHg avec atteinte d'organe cible (encéphalopathie hypertensive, AVC ischémique ou hémorragique, SCA, dissection aortique, œdème pulmonaire, insuffisance rénale aiguë, éclampsie)", grade: "GPS" },
            { text: "Bilan : fond d'œil (exsudats, hémorragies, œdème papillaire — grade III/IV = maligne), ECG, créatinine, bandelette urinaire, dosage BNP, scanner cérébral si signes neurologiques", grade: "1A" },
          ]},
          { title: "Traitement antihypertenseur intraveineux", items: [
            { text: "Nicardipine (Loxen®) par seringue électrique 1 à 5 mg/heure : antihypertenseur intraveineux de référence en France — titration par paliers toutes les 10 minutes", grade: "1B" },
            { text: "Labétalol (Trandate®) 20 mg en injection intraveineuse directe puis 40 à 80 mg toutes les 10 minutes (max 300 mg) : bêtabloquant alpha — si tachycardie ou grossesse — contre-indiqué si asthme", grade: "1B" },
            { text: "Objectif : réduire la pression artérielle moyenne de 10 à 25% dans la première heure — NE PAS normaliser brutalement (risque d'ischémie cérébrale par perte d'autorégulation)", grade: "1A" },
          ]},
          { title: "Situations spécifiques", items: [
            { text: "Dissection aortique : bêtabloquant IV d'emblée (esmolol ou labétalol) — cible fréquence cardiaque 60/minute ET pression artérielle systolique 100 à 120 mmHg", grade: "1A" },
            { text: "Éclampsie : sulfate de magnésium + nicardipine intraveineuse — voir protocole pré-éclampsie sévère", grade: "1A" },
          ]},
        ],
        source: "ESC Hypertension Guidelines 2024 · Williams EHJ 2018"
      },
      {
        name: "Myocardite Aiguë Grave",
        urgence: "URGENT",
        aliases: ["myocardite aiguë", "myocardite fulminante", "myocardite virale", "troponine élevée ECG diffus jeune", "insuffisance cardiaque aiguë jeune"],
        sections: [
          { title: "Diagnostic", items: [
            { text: "Triade évocatrice chez un sujet jeune après syndrome viral : douleur thoracique + modifications ECG diffuses (sus-décalage concave ou T négatives dans plusieurs territoires) + élévation de la troponine", grade: "GPS" },
            { text: "IRM cardiaque avec gadolinium : examen de référence (critères de Lake Louise 2018) — rehaussement tardif épicardique, œdème myocardique — sensibilité 80%", grade: "1A" },
            { text: "Éliminer un syndrome coronarien aigu : coronarographie urgente si terrain vasculaire ou présentation atypique", grade: "1A" },
          ]},
          { title: "Traitement", items: [
            { text: "Repos strict absolu : arrêt immédiat de toute activité physique (risque de mort subite par arythmie ventriculaire) — 3 à 6 mois minimum", grade: "1A" },
            { text: "Myocardite fulminante avec choc cardiogénique : dobutamine + noradrénaline + assistance circulatoire (ECMO veino-artérielle) si réfractaire", grade: "GPS" },
            { text: "Corticoïdes : NON en routine sur myocardite virale présumée — indiqués uniquement si myocardite à éosinophiles, à cellules géantes ou maladie auto-immune documentée (biopsie myocardique)", grade: "2B" },
          ]},
        ],
        source: "ESC Cardiomyopathies Guidelines 2023 · Caforio EHJ 2013;34:2636"
      },
      {
        name: "Péricardite Aiguë",
        urgence: "URGENT",
        aliases: ["péricardite aiguë", "frottement péricardique", "douleur thoracique posturale", "sus-décalage ST concave diffus"],
        sections: [
          {title: "Diagnostic — critères (≥ 2 sur 4)", items: [
            {text: "Douleur thoracique typique (irradie vers le trapèze, soulagée assis penché en avant) — frottement péricardique — modifications ECG diffuses (sus-décalage ST concave + dépression PR) — épanchement péricardique à l'échocardiographie", grade: "GPS"},
            {text: "Bilan : CRP (marqueur d'activité et de suivi), troponine (périmyocardite si élevée), NFS, créatinine — échocardiographie systématique", grade: "1A"},
          ]},
          {title: "Traitement — durée prolongée", items: [
            {text: "Ibuprofène 600 mg toutes les 8 heures pendant 2 semaines puis réduction progressive — ou Aspirine 750 à 1 000 mg toutes les 8 heures — protection gastrique systématique", grade: "1A"},
            {text: "Colchicine 0,5 mg × 2/jour pendant 3 mois (0,5 mg × 1/jour si < 70 kg) en association aux AINS — réduit le risque de récidive de 50% (étude COPE 2013)", grade: "1A"},
            {text: "Corticoïdes (prednisone 0,25 à 0,5 mg/kg/jour) UNIQUEMENT si contre-indication aux AINS ou péricardite récidivante réfractaire — ÉVITER en péricardite infectieuse présumée", grade: "2B"},
            {text: "Repos sportif STRICT jusqu'à normalisation de la CRP et des symptômes — 3 mois minimum pour les sportifs compétiteurs", grade: "1A"},
          ]},
        ],
        source: "ESC Pericardial Diseases 2015 · Imazio COPE Circulation 2005 / ICAP NEJM 2013"
      },
      {
        name: "Infarctus du Ventricule Droit",
        urgence: "ABSOLUE",
        aliases: ["infarctus ventricule droit", "IDM inférieur VD", "choc cardiogénique ventricule droit", "V3R V4R sus-décalage ST"],
        sections: [
          {title: "Diagnostic ECG — dérivations droites obligatoires", items: [
            {text: "Sus-décalage ST en V3R et V4R (dérivations droites miroir) : signe le plus sensible — réaliser SYSTÉMATIQUEMENT devant tout infarctus inférieur (sus-ST en D2/D3/aVF)", grade: "1A"},
            {text: "Triade clinique : hypotension + turgescence jugulaire + auscultation pulmonaire claire (sans crépitants) — signe de Kussmaul possible (distension jugulaire à l'inspiration)", grade: "GPS"},
          ]},
          {title: "Pièges spécifiques — traitements interdits", items: [
            {text: "CONTRE-INDICATION ABSOLUE aux dérivés nitrés et aux diurétiques : réduisent la précharge du ventricule droit défaillant — risque d'effondrement hémodynamique fatal", grade: "1A"},
            {text: "Remplissage vasculaire : 500 mL à 1 litre de sérum physiologique en premier geste — maintenir la précharge du ventricule droit", grade: "1A"},
            {text: "Revascularisation coronaire urgente (intervention coronaire percutanée primaire) : seul traitement efficace — l'artère coronaire droite est responsable dans 95% des cas", grade: "1A"},
            {text: "Fibrillation auriculaire sur VD défaillant : cardioversion électrique externe immédiate si instabilité (perte de la systole auriculaire = catastrophique)", grade: "1A"},
          ]},
        ],
        source: "ESC STEMI Guidelines 2023 · Dell'Italia Circulation 1998"
      },
      {
        name: "Arrêt Cardiaque Réfractaire — ECMO-RCP (eCPR)",
        urgence: "ABSOLUE",
        aliases: ["arrêt cardiaque réfractaire", "eCPR", "ECMO RCP", "ECPR", "ECLS arrêt cardiaque", "ECMO veino-artérielle arrêt"],
        sections: [
          { title: "Définition et concept", items: [
            { text: "Arrêt cardiaque réfractaire : absence de récupération d'une activité circulatoire spontanée après 20 minutes de réanimation cardio-pulmonaire spécialisée bien conduite", grade: "GPS" },
            { text: "L'eCPR consiste à implanter une ECMO veino-artérielle pendant la RCP pour restaurer une perfusion d'organe, en attendant le traitement de la cause (notamment coronaire)", grade: "GPS" },
          ]},
          { title: "Critères de sélection (concertation indispensable)", items: [
            { text: "No-flow court (< 5 min, idéalement RCP immédiate par témoin), low-flow < 60 min, rythme initial choquable ou cause réversible suspectée", grade: "1B" },
            { text: "Patient jeune, peu de comorbidités, EtCO₂ > 10 mmHg sous massage (témoin de la qualité de perfusion), absence de comorbidité majeure", grade: "1B" },
            { text: "Causes particulièrement éligibles : intoxications avec effet stabilisant de membrane, hypothermie profonde, embolie pulmonaire, SCA — la décision est multidisciplinaire et chronométrée", grade: "GPS" },
          ]},
          { title: "Données et mise en œuvre", items: [
            { text: "Les essais récents (ARREST 2020 positif, mais INCEPTION et Prague-OHCA plus nuancés) confirment un bénéfice conditionné à une sélection stricte et une filière organisée et rapide", grade: "2B" },
            { text: "Canulation fémoro-fémorale veino-artérielle percutanée échoguidée, sans interrompre le massage — surveillance de l'ischémie du membre canulé (cathéter de reperfusion)", grade: "GPS" },
            { text: "Après implantation : coronarographie en urgence si cause coronaire, contrôle ciblé de la température, prise en charge du syndrome post-arrêt cardiaque", grade: "1B" },
          ]},
        ],
        source: "Yannopoulos Lancet 2020 (ARREST) · Belohlavek NEJM 2022 (Prague-OHCA) · ERC 2021 · SFAR/SRLF"
      },
    ]
  },
  {
    id: "pneumo", label: "Insuffisance Respiratoire", short: "IRA", iconName: "lungs", color: C.blue, bgColor: C.blueBg,
    protos: [
      {
        name: "Syndrome de Détresse Respiratoire Aiguë — ESICM 2023 / ATS 2024",
        urgence: "ABSOLUE", isNew: true,
        aliases: ["SDRA", "ARDS", "syndrome de détresse respiratoire aiguë", "hypoxémie réfractaire", "rapport PaO2 FiO2 bas", "opacités bilatérales ventilation"],
        sections: [
          { title: "Nouvelle définition ESICM 2023", items: [
            { text: "La définition inclut désormais les patients non intubés sous oxygénothérapie à haut débit nasal ou ventilation non invasive (saturation/FiO₂ ≤ 315 ou rapport PaO₂/FiO₂ ≤ 300)", grade: "GPS", isNew: true },
            { text: "Sévérité : Léger = PaO₂/FiO₂ 200 à 300 — Modéré = 100 à 200 — Sévère < 100 — L'échographie pulmonaire est désormais acceptée pour documenter les opacités bilatérales", grade: "GPS", isNew: true },
          ]},
          { title: "Ventilation protectrice — ATS 2024", items: [
            { text: "Volume courant 4 à 8 mL/kg de poids prédit idéal (calculé sur la taille, pas le poids réel) — préférer 4 à 6 mL/kg si la pression plateau ou la pression motrice sont élevées", grade: "1A" },
            { text: "Pression plateau ≤ 30 cmH₂O — Pression motrice (différence pression plateau − PEP) ≤ 15 cmH₂O", grade: "1B" },
            { text: "Pression expiratoire positive (PEP) : titration individuelle selon compliance et recrutabilité — aucune table de PEP systématique recommandée en 2024", grade: "2B", isNew: true },
            { text: "Manœuvres de recrutement à haute pression (≥ 35 cmH₂O pendant > 1 minute) : NON recommandées — risque d'instabilité hémodynamique et de lésions pulmonaires induites", grade: "1B", isNew: true },
            { text: "Cible saturation en oxygène 92 à 96% — l'hyperoxie est délétère (radicaux libres oxygénés)", grade: "1B" },
          ], hasDoseCalc: true, drugs: [
            { name: "Volume courant 6 mL/kg (cible standard)", detail: "Calculé sur le poids PRÉDIT IDÉAL", perKg: 6, unit: "mL", round: 0 },
            { name: "Volume courant 4 mL/kg (si pression plateau > 30)", detail: "Calculé sur le poids PRÉDIT IDÉAL", perKg: 4, unit: "mL", round: 0 },
          ]},
          { title: "SDRA sévère (rapport PaO₂/FiO₂ < 150) — escalade thérapeutique", items: [
            { text: "Décubitus ventral (position sur le ventre) ≥ 16 heures par jour : réduit la mortalité (NNT = 6, étude PROSEVA 2013) — initier tôt après l'intubation", grade: "1A" },
            { text: "Corticoïdes : méthylprednisolone suggérée dans le SDRA précoce modéré à sévère — recommandation conditionnelle ATS 2024", grade: "2B", isNew: true },
            { text: "Curarisation courte 48 heures (cisatracurium) : envisager si rapport PaO₂/FiO₂ < 100 réfractaire malgré optimisation", grade: "2B" },
          ]},
          { title: "Oxygénation extracorporelle (ECMO veino-veineuse)", items: [
            { text: "Indications : rapport PaO₂/FiO₂ < 80 malgré optimisation ≥ 12 heures, score de Murray ≥ 3, ou hypercapnie sévère avec pH < 7,20", grade: "2A" },
            { text: "Contacter le centre de référence ECMO sans délai — ne pas retarder le transfert", grade: "GPS" },
          ]},
        ],
        source: "ESICM ARDS Guidelines 2023 · ATS Guidelines 2024 · Guérin NEJM 2013;368:2159 (PROSEVA)"
      },
      {
        name: "Exacerbation Grave de Bronchopneumopathie Chronique Obstructive",
        urgence: "URGENT",
        aliases: ["BPCO exacerbation", "bronchite chronique décompensée", "emphysème décompensé", "hypercapnie acidose respiratoire", "insuffisance respiratoire chronique décompensée"],
        sections: [
          { title: "Ventilation non invasive — traitement de première intention", items: [
            { text: "Ventilation non invasive en mode pression positive (BiPAP) : pression inspiratoire 12 à 20 cmH₂O, pression expiratoire 4 à 8 cmH₂O — FiO₂ titrée pour saturation 88 à 92% (éviter l'hyperoxie qui supprime le drive ventilatoire)", grade: "1A" },
            { text: "Indication formelle si pH < 7,35 avec PaCO₂ > 45 mmHg — Gaz du sang artériels de contrôle à 1 heure : absence d'amélioration du pH impose une réévaluation immédiate", grade: "1A" },
          ]},
          { title: "Traitements bronchodilatateurs et anti-inflammatoires", items: [
            { text: "Salbutamol (Ventoline®) 5 mg plus Ipratropium (Atrovent®) 0,5 mg par nébulisation toutes les 20 minutes × 3 fois, puis toutes les 4 à 6 heures", grade: "1A" },
            { text: "Méthylprednisolone (Solumédrol®) 40 mg en injection intraveineuse par jour pendant 5 jours — l'essai REDUCE a démontré la non-infériorité de 5 jours versus 14 jours", grade: "1A" },
            { text: "Antibiothérapie si expectorations purulentes avec fièvre et élévation de la protéine C-réactive : Amoxicilline-Acide clavulanique (Augmentin®) 1 g × 3 fois par jour pendant 5 à 7 jours", grade: "1B" },
          ]},
          { title: "Critères d'intubation orotrachéale", items: [
            { text: "pH artériel < 7,25 malgré 1 heure de ventilation non invasive optimale — Score de Glasgow < 13 — Apnées — Instabilité hémodynamique", grade: "1A" },
            { text: "Réglages post-intubation : rapport inspiration/expiration = 1:3 à 1:4 — fréquence respiratoire 10 à 12/minute — mesurer la pression expiratoire positive intrinsèque (auto-PEP)", grade: "GPS" },
          ]},
        ],
        source: "GOLD 2023 · Brochard NEJM 1995;333:817 · Leuppi JAMA 2013 (REDUCE)"
      },
      {
        name: "Sevrage Ventilatoire et Extubation",
        urgence: "SURVEILLANCE", isNew: true,
        aliases: ["sevrage ventilateur", "extubation", "épreuve de ventilation spontanée", "weaning réanimation", "critères sevrabilité"],
        sections: [
          { title: "Critères de sevrabilité — évaluation quotidienne obligatoire", items: [
            { text: "Cause de l'intubation résolue ou en voie de résolution — Score de Glasgow ≥ 13 — Hémodynamique stable sans vasopresseurs ou à doses faibles stables", grade: "1A" },
            { text: "Rapport PaO₂/FiO₂ ≥ 150 sous FiO₂ ≤ 0,40 et pression expiratoire positive ≤ 5 cmH₂O — Réduction de la sédation avant toute évaluation", grade: "1A" },
          ]},
          { title: "Épreuve de ventilation spontanée — méthode standardisée", items: [
            { text: "Durée 30 à 120 minutes — Mode : tube en T (trachée ouverte à l'air) ou aide inspiratoire basse 5 à 7 cmH₂O, pression expiratoire positive nulle ou ≤ 5 cmH₂O", grade: "1A" },
            { text: "Critères d'échec : fréquence respiratoire > 35/minute — saturation < 90% — fréquence cardiaque > 140/minute — pression artérielle systolique > 180 ou < 90 mmHg — agitation ou obnubilation", grade: "1A" },
            { text: "Index de Tobin = fréquence respiratoire divisée par le volume courant en litres : si > 105, prédit l'échec de l'extubation avec bonne fiabilité", grade: "2B" },
          ]},
          { title: "Extubation et prévention de la réintubation", items: [
            { text: "Ventilation non invasive préventive post-extubation chez les patients à risque élevé (bronchopneumopathie chronique, obésité, âge > 65 ans, insuffisance cardiaque) : réduit le taux de réintubation de 50% (étude Ferrer 2006)", grade: "1A" },
            { text: "Oxygénothérapie à haut débit nasal (débit ≥ 40 litres/minute, FiO₂ titrée) : alternative à la ventilation non invasive, améliore le confort", grade: "1B", isNew: true },
          ]},
        ],
        source: "SRLF/SFAR Sevrage Ventilatoire 2017 · WEAN-SAFE Lancet Respir Med 2023 · Boles ICM 2007"
      },
      {
        name: "Embolie Pulmonaire à Haut Risque",
        urgence: "ABSOLUE",
        aliases: ["embolie pulmonaire grave", "cœur pulmonaire aigu", "dyspnée brutale thrombose veineuse", "phlébite embolie", "EP massive"],
        sections: [
          { title: "Stratification du risque (ESC 2019)", items: [
            { text: "Haut risque (état de choc ou pression artérielle systolique < 90 mmHg) → thrombolyse systémique d'emblée", grade: "1B" },
            { text: "Risque intermédiaire élevé (dysfonction ventriculaire droite + troponine positive + score sPESI ≥ 1) → anticoagulation + surveillance — thrombolyse si dégradation", grade: "2B" },
          ]},
          { title: "Thrombolyse systémique — embolie pulmonaire à haut risque", items: [
            { text: "Altéplase (Actilyse®) 100 mg en perfusion intraveineuse sur 2 heures — Si arrêt cardiaque sur embolie pulmonaire : 50 mg en injection directe → reprendre le massage cardiaque 60 à 90 minutes", grade: "1B" },
            { text: "Héparine non fractionnée 60 unités/kg en injection directe dès la fin de la thrombolyse — remplissage vasculaire prudent ≤ 500 mL", grade: "1A" },
          ]},
          { title: "Soutien hémodynamique", items: [
            { text: "Noradrénaline si pression artérielle moyenne < 65 mmHg — Dobutamine 5 à 10 microgrammes/kg/minute si dysfonction ventriculaire droite sévère", grade: "2B" },
            { text: "Thrombectomie chirurgicale ou par cathéter si contre-indication à la thrombolyse ou échec à 2 heures", grade: "GPS" },
          ]},
        ],
        source: "ESC Guidelines PE 2019 · Konstantinides EHJ 41:543"
      },
      {
        name: "Asthme Aigu Grave",
        urgence: "ABSOLUE",
        aliases: ["asthme grave", "état de mal asthmatique", "bronchospasme sévère", "asthme aigu grave", "détresse respiratoire sifflante"],
        sections: [
          { title: "Traitement initial — les 3 piliers", items: [
            { text: "Salbutamol (Ventoline®) 5 mg par nébulisation continue ou 2,5 mg toutes les 20 minutes × 3 fois", grade: "1A" },
            { text: "Ipratropium (Atrovent®) 0,5 mg par nébulisation × 3 fois durant les 3 premières heures — synergie bronchodilatatrice prouvée avec le salbutamol", grade: "1A" },
            { text: "Méthylprednisolone (Solumédrol®) 1 à 2 mg/kg en injection intraveineuse (maximum 125 mg)", grade: "1A" },
          ]},
          { title: "Résistance — traitement de 2ème ligne", items: [
            { text: "Sulfate de magnésium 1,5 à 2 g en perfusion intraveineuse sur 20 minutes — nombre nécessaire à traiter pour éviter 1 hospitalisation ≈ 8 (méta-analyse Cochrane)", grade: "1A" },
            { text: "Salbutamol par voie intraveineuse 0,1 à 0,2 microgrammes/kg/minute si résistance totale aux nébulisations", grade: "2B" },
            { text: "Héliox (70% hélium 30% oxygène) si disponible : réduit les résistances des voies aériennes", grade: "2B" },
          ]},
          { title: "Intubation en dernier recours — risque barotraumatisme très élevé", items: [
            { text: "Kétamine (Kétalar®) 1,5 à 2 mg/kg en injection intraveineuse pour l'induction : bronchodilatateur, maintient la pression artérielle", grade: "1B" },
            { text: "Réglages ventilateur : volume courant 6 mL/kg — fréquence 8 à 10/minute — rapport inspiration/expiration = 1:4 — accepter l'hypercapnie permissive (pH > 7,20)", grade: "1B" },
            { text: "Surveiller la pression de plateau et l'auto-PEP — le barotraumatisme peut survenir brutalement", grade: "GPS" },
          ]},
        ],
        source: "GINA 2023 · Bloch Ann Emerg Med 1995 · Rowe Ann Emerg Med 1992"
      },
      {
        name: "Épanchement Pleural Parapneumonique et Empyème",
        urgence: "URGENT",
        aliases: ["épanchement pleural infecté", "empyème pleural", "pleurésie purulente", "pleurésie parapneumonique", "liquide pleural infectieux"],
        sections: [
          {title: "Classification et diagnostic", items: [
            {text: "Épanchement parapneumonique simple (stade I/II) : exsudat stérile avec pH > 7,20, glucose > 2,2 mmol/L, LDH < 1 000 UI/L — traitement antibiotique seul suffisant dans 70% des cas", grade: "GPS"},
            {text: "Empyème (stade III) : pus macroscopique OU germe à l'examen direct OU pH < 7,00 — drainage impératif", grade: "1A"},
            {text: "Ponction pleurale diagnostique systématique si épanchement > 10 mm : biochimie (pH, glucose, LDH, protéines), cytologie, bactériologie aéro-anaérobies", grade: "1A"},
          ]},
          {title: "Traitement", items: [
            {text: "Drain pleural thoracique si empyème confirmé : 12 à 14 French en aspiration douce (–20 cmH₂O) — lavages quotidiens au sérum physiologique", grade: "1A"},
            {text: "Fibrinolyse intrapleurale si loculations : altéplase 10 mg + DNase 5 mg × 2/jour × 3 jours (étude MIST-2, Lancet 2011) — réduit le recours à la chirurgie de 50%", grade: "1A"},
            {text: "Antibiothérapie prolongée 3 à 6 semaines : amoxicilline-acide clavulanique ou métronidazole pour couvrir les anaérobies", grade: "1A"},
            {text: "Thoracoscopie ou décortication chirurgicale si échec du drainage médical après 5 à 7 jours", grade: "1B"},
          ]},
        ],
        source: "BTS Pleural Disease Guidelines 2023 · Rahman Lancet 2011 (MIST-2)"
      },
      {
        name: "Hémoptysie Grave",
        urgence: "ABSOLUE",
        aliases: ["hémoptysie grave", "hémoptysie massive", "saignement bronchique abondant", "crachats sanglants massifs"],
        sections: [
          {title: "Définition et geste immédiat", items: [
            {text: "Hémoptysie grave : > 200 mL en 24 heures — risque vital par asphyxie (noyade dans ses propres sécrétions) plus que par choc hémorragique — taux de mortalité 30 à 50% sans prise en charge rapide", grade: "GPS"},
            {text: "Position latérale décubitus sur le côté atteint (si côté du saignement connu) : protège le poumon sain — oxygène à haut débit — ne jamais laisser le patient seul", grade: "GPS"},
          ]},
          {title: "Intubation sélective si asphyxie imminente", items: [
            {text: "Sonde d'intubation de gros calibre (≥ 8,5) dans la bronche souche controlatérale au saignement : protège le poumon sain — fibroscopie bronchique urgente pour localiser et tenter une hémostase endoscopique", grade: "GPS"},
            {text: "Tamponnade endobronchique au ballon de Fogarty par fibroscopie : mesure temporaire en attendant l'embolisation", grade: "1A"},
          ]},
          {title: "Embolisation artérielle bronchique — traitement de référence", items: [
            {text: "Embolisation artérielle bronchique par voie endovasculaire : arrêt du saignement dans 80 à 95% des cas — à réaliser en urgence en radiologie interventionnelle", grade: "1A"},
            {text: "Acide tranexamique (Exacyl®) 1 g IV toutes les 8 heures : adjuvant antifibrinolytique — utilisé en pratique malgré l'absence d'essai randomisé spécifique", grade: "2B"},
            {text: "Chirurgie de résection (lobectomie) : en dernier recours si échec — mortalité opératoire 10 à 30% en urgence", grade: "2B"},
          ]},
        ],
        source: "ERS Haemoptysis Guidelines 2022 · Khalil Eur Respir Rev 2008"
      },
      {
        name: "Pneumothorax — Spontané, Iatrogène et Compressif",
        urgence: "URGENT",
        aliases: ["pneumothorax spontané", "pneumothorax compressif", "pneumothorax iatrogène", "pneumothorax ventilé", "exsufflation aiguille pneumothorax"],
        sections: [
          {title: "Pneumothorax compressif — urgence vitale", items: [
            {text: "Diagnostic CLINIQUE uniquement — ne pas attendre la radio : absence de murmure vésiculaire unilatéral + déviation trachéale controlatérale + turgescence jugulaire + hypotension → agir IMMÉDIATEMENT", grade: "1A"},
            {text: "Exsufflation à l'aiguille : 2ème espace intercostal ligne médio-claviculaire, bord supérieur de la 3ème côte — aiguille 14G sur 16G — puis drain thoracique dans les minutes suivantes", grade: "1A"},
          ]},
          {title: "Pneumothorax spontané primitif", items: [
            {text: "Petit décollement < 2 cm chez patient asymptomatique : surveillance 3 à 6 heures — sortie si stable sans aggravation", grade: "1B"},
            {text: "Grand décollement ≥ 2 cm ou symptomatique : aspiration simple (kit pneumothorax ou cathéter 14G) en première intention — taux de succès 60 à 80%", grade: "1A"},
          ]},
          {title: "Pneumothorax sous ventilation mécanique", items: [
            {text: "URGENCE ABSOLUE sous ventilation mécanique : le pneumothorax devient compressif en quelques minutes sous pression positive — drain thoracique IMMÉDIAT sans aspiration préalable", grade: "1A"},
            {text: "Baisser provisoirement la PEP et le volume courant en attendant le drain — FiO₂ 1,0", grade: "GPS"},
          ]},
        ],
        source: "BTS Pneumothorax Guidelines 2023 · ERS/CHEST Guidelines 2022"
      },
      {
        name: "Trachéotomie — Indications, Technique et Décanulation",
        urgence: "SURVEILLANCE",
        aliases: ["trachéotomie", "trachéostomie", "canule trachéotomie", "trachéotomie percutanée", "décanulation"],
        sections: [
          {title: "Indications", items: [
            {text: "Ventilation mécanique prolongée prévisible (> 10 à 14 jours) — Protection des voies aériennes (trouble de déglutition définitif, coma persistant) — Sevrage ventilatoire difficile — Obstruction chronique des voies aériennes supérieures", grade: "1B"},
            {text: "Trachéotomie précoce (< J7) vs tardive (J10–J14) : aucune différence de mortalité ou de durée de séjour (essai TracMan JAMA 2013) — décision individualisée", grade: "1A"},
          ]},
          {title: "Technique percutanée (gold standard en réanimation)", items: [
            {text: "Trachéotomie percutanée par dilatation (technique de Ciaglia) : sous contrôle fibroscopique permanent, entre le 1er et 2ème ou le 2ème et 3ème anneau trachéal", grade: "1A"},
            {text: "Contre-indications relatives : coagulopathie (INR > 1,5, plaquettes < 50 G/L), anatomie défavorable (cou court, obésité, goitre, cicatrice), urgence absolue (chirurgicale préférée)", grade: "GPS"},
            {text: "Pression du ballonnet : 20 à 30 cmH₂O — vérifier 3 fois/jour à la manométrie — soins de stomie trachéale 2 fois/jour", grade: "1A"},
          ]},
          {title: "Décanulation", items: [
            {text: "Critères de décanulation : toux efficace + sécrétions peu abondantes + test d'occlusion toléré ≥ 24 heures + pas de besoin de ventilation nocturne — utiliser la valve de phonation (Passy-Muir) comme étape transitoire", grade: "GPS"},
          ]},
        ],
        source: "SRLF Trachéotomie 2021 · Young JAMA 2013 (TracMan)"
      },
      {
        name: "Obstruction Aiguë des Voies Aériennes — Épiglottite de l'Adulte",
        urgence: "ABSOLUE",
        aliases: ["épiglottite adulte", "obstruction voies aériennes supérieures", "corps étranger larynx adulte", "stridor aigu adulte", "dyspnée laryngée haute"],
        sections: [
          {title: "Diagnostic — urgence vitale", items: [
            {text: "Épiglottite adulte : fièvre + odynophagie sévère + voix de patate chaude + stridor + position en tripode (assis, penché en avant, bouche ouverte) — NE PAS allonger le patient avant sécurisation des voies aériennes", grade: "GPS"},
            {text: "Fibroscopie laryngée nasale en milieu sécurisé (bloc ou réanimation) : confirme l'épiglottite — NE PAS réaliser de laryngoscopie directe brutale", grade: "GPS"},
          ]},
          {title: "Sécurisation des voies aériennes — ne pas retarder", items: [
            {text: "Chirurgien ORL présent dès l'entrée en salle — intubation nasotrachéale sous fibroscopie patient vigile ou sédation légère — trachéotomie de secours chirurgicale sous anesthésie locale si impossible", grade: "1A"},
            {text: "Oxygène humidifié à fort débit — adrénaline nébulisée 5 mg : réduit l'œdème laryngé en 10 minutes — mesure temporaire en attendant l'intubation", grade: "GPS"},
          ]},
          {title: "Antibiothérapie et corticoïdes", items: [
            {text: "Ceftriaxone 2 g IV ou Céfotaxime 3 g IV : antibiothérapie systémique immédiate après sécurisation — durée 7 à 10 jours", grade: "1A"},
            {text: "Dexaméthasone 0,15 mg/kg IV : corticoïde pour réduire l'œdème — administrer dès la sécurisation des voies aériennes", grade: "GPS"},
          ]},
        ],
        source: "ERS Stridor Adult 2019 · Guldfred Dan Med J 2008"
      },
      {
        name: "ECMO Veino-Veineuse — SDRA Réfractaire",
        urgence: "URGENT",
        aliases: ["ECMO", "ECMO veino-veineuse", "ECMO VV", "oxygénation extracorporelle", "SDRA réfractaire ECMO", "assistance respiratoire extracorporelle"],
        sections: [
          { title: "Indications — SDRA très sévère réfractaire", items: [
            { text: "À envisager dans le SDRA sévère réfractaire malgré l'optimisation : ventilation protectrice, curarisation, décubitus ventral bien conduit", grade: "1B" },
            { text: "Critères type EOLIA : PaO₂/FiO₂ < 50 mmHg pendant > 3h, OU < 80 pendant > 6h, OU pH < 7,25 avec PaCO₂ ≥ 60 mmHg pendant > 6h malgré optimisation ventilatoire", grade: "1B" },
            { text: "L'essai EOLIA (NEJM 2018) et sa méta-analyse suggèrent un bénéfice de survie — adresser précocement à un centre ECMO avant défaillance multiviscérale", grade: "1B" },
          ]},
          { title: "Principe et canulation", items: [
            { text: "ECMO VV : draine le sang veineux, l'oxygène et l'épure en CO₂ via une membrane, le réinjecte dans le système veineux — assure l'hématose SANS support hémodynamique (réservée à la défaillance respiratoire pure)", grade: "GPS" },
            { text: "Canulation fémoro-jugulaire ou fémoro-fémorale par voie percutanée échoguidée — débit de pompe 4-6 L/min", grade: "GPS" },
            { text: "Sous ECMO : ventilation ultra-protectrice de repos pulmonaire (Vt très bas, pression de plateau limitée, FiO₂ réduite) pour laisser le poumon récupérer", grade: "1B" },
          ]},
          { title: "Complications et surveillance", items: [
            { text: "Hémorragiques (anticoagulation par héparine, cible TCA ou anti-Xa) — thrombotiques — hémolyse — infections de canules", grade: "GPS" },
            { text: "Surveillance : débit, pressions du circuit, D-dimères, hémoglobine libre plasmatique (hémolyse), bilan d'hémostase, gaz du sang pré et post-membrane", grade: "GPS" },
            { text: "Distinguer de l'ECMO veino-artérielle (VA) qui, elle, assure un support hémodynamique (choc cardiogénique, arrêt cardiaque réfractaire)", grade: "GPS" },
          ]},
        ],
        source: "Combes NEJM 2018 (EOLIA) · ELSO Guidelines 2021 · SRLF/SFAR"
      },
      {
        name: "Pneumopathie d'Inhalation",
        urgence: "URGENT",
        aliases: ["pneumopathie d'inhalation", "syndrome de Mendelson", "inhalation bronchique", "fausse route", "pneumopathie de déglutition"],
        sections: [
          { title: "Distinguer pneumonite chimique et pneumonie infectieuse", items: [
            { text: "Pneumonite chimique (syndrome de Mendelson) : lésion caustique aiguë par inhalation de liquide gastrique acide — détresse respiratoire immédiate, souvent régressive en 24-48h sans antibiotique", grade: "GPS" },
            { text: "Pneumonie d'inhalation infectieuse : surinfection bactérienne secondaire (germes oro-pharyngés, anaérobies) — survient chez les patients à troubles de déglutition, troubles de conscience, dénutris", grade: "GPS" },
          ]},
          { title: "Prise en charge", items: [
            { text: "Geste immédiat en cas d'inhalation observée : aspiration des voies aériennes, position proclive — NE PAS pratiquer de lavage alcalin ni de neutralisation", grade: "GPS" },
            { text: "Antibiothérapie NON systématique dans la pneumonite chimique pure — la réserver en cas de non-amélioration à 48h, de fièvre persistante, ou de terrain à risque (occlusion intestinale, colonisation)", grade: "1B" },
            { text: "Si antibiothérapie indiquée : amoxicilline-acide clavulanique (couvre les anaérobies) — éviter la couverture anaérobie systématique non justifiée", grade: "1B" },
            { text: "Support respiratoire selon la sévérité (oxygène, OHDN, ventilation protectrice si SDRA) — prévention par dépistage et prise en charge des troubles de déglutition", grade: "1A" },
          ]},
        ],
        source: "Mandell NEJM 2019 · Marik NEJM 2001 · SPILF"
      },
      {
        name: "Décubitus Ventral dans le SDRA — Mise en Œuvre",
        urgence: "URGENT",
        aliases: ["décubitus ventral", "DV", "proning", "retournement SDRA", "ventilation en décubitus ventral"],
        sections: [
          { title: "Indication", items: [
            { text: "SDRA modéré à sévère avec PaO₂/FiO₂ < 150 mmHg malgré une ventilation protectrice optimisée (FiO₂ ≥ 0,6, PEP ≥ 5) — à débuter précocement (essai PROSEVA)", grade: "1A" },
            { text: "Réduit la mortalité dans le SDRA sévère lorsqu'il est appliqué en séances prolongées (≥ 16 heures consécutives)", grade: "1A" },
          ]},
          { title: "Prérequis et sécurité avant retournement", items: [
            { text: "Sédation profonde ± curarisation, sonde d'intubation sécurisée et repérée, vidange gastrique, protection oculaire, fixation des cathéters et drains", grade: "GPS" },
            { text: "Équipe d'au moins 3 à 5 personnes, un opérateur dédié à la tête et à la sonde d'intubation — manœuvre coordonnée", grade: "GPS" },
            { text: "Contre-indications relatives : instabilité hémodynamique majeure non contrôlée, hypertension intracrânienne, fractures instables (rachis, bassin, face), chirurgie abdominale/thoracique récente", grade: "GPS" },
          ]},
          { title: "Conduite et surveillance", items: [
            { text: "Séances d'au moins 16 heures consécutives, répétées tant que persiste l'hypoxémie — réévaluer l'oxygénation 1h après chaque retournement", grade: "1A" },
            { text: "Prévention des complications : escarres (appui frontal, thoracique, iliaque), œdème facial, compressions nerveuses, extubation accidentelle (complication la plus redoutée), intolérance entérale", grade: "GPS" },
            { text: "Critères d'arrêt : amélioration durable de l'oxygénation (PaO₂/FiO₂ > 150 en décubitus dorsal avec PEP ≤ 10 et FiO₂ ≤ 0,6, 4h après retour sur le dos)", grade: "1B" },
          ]},
        ],
        source: "Guérin NEJM 2013 (PROSEVA) · SRLF/SFAR SDRA · ESICM ARDS Guidelines 2023"
      },
    ]
  },
  {
    id: "choc", label: "Choc & Hémodynamique", short: "CHOC", iconName: "activity", color: C.orange, bgColor: C.orangeBg,
    protos: [
      {
        name: "Choc Septique — Surviving Sepsis Campaign 2026",
        urgence: "ABSOLUE", isNew: true,
        aliases: ["sepsis", "choc septique", "infection grave", "défaillance organes multiples", "lactate élevé", "bactériémie grave"],
        sections: [
          { title: "Bilan initial dans l'heure", items: [
            { text: "Hémocultures × 2 flacons AVANT les antibiotiques (sans retarder les antibiotiques > 1 heure)", grade: "1A" },
            { text: "Lactate artériel — Numération sanguine — Bilan hépatique — Créatinine — Coagulation — Procalcitonine — Gaz du sang artériels", grade: "1B" },
          ]},
          { title: "Antibiothérapie dans la 1ère heure", items: [
            { text: "Pipéracilline-Tazobactam (Tazocilline®) 4 g en perfusion intraveineuse sur 30 minutes toutes les 6 à 8 heures — ou Méropénème (Méronem®) 2 g si risque de bactérie multirésistante, immunodépression ou hospitalisation récente en réanimation", grade: "1A" },
            { text: "Ajouter Vancomycine 30 mg/kg/jour si suspicion de Staphylocoque doré résistant à la méticilline (porte d'entrée cutanée, matériel étranger, colonisation connue)", grade: "2B" },
            { text: "Désescalade dès identification du germe et réception de l'antibiogramme : principe fondamental de l'antibiothérapie raisonnée en réanimation", grade: "1B" },
          ]},
          { title: "Remplissage vasculaire — SSC 2026", items: [
            { text: "Cristalloïdes (sérum physiologique ou Ringer Lactate) 30 mL/kg en 3 heures si signes d'hypoperfusion (lactate > 2 mmol/L, marbrures, temps de recoloration capillaire > 3 secondes)", grade: "1A" },
            { text: "Au-delà du remplissage initial : évaluation dynamique de la réponse avant chaque bolus supplémentaire — variation de la pression pulsée, épreuve de lever des jambes passif, échographie cardiaque avec mesure de l'intégrale temps-vitesse sous-aortique", grade: "1B", isNew: true },
            { text: "Albumine 20% si albuminémie < 20 g/L après remplissage important", grade: "2B" },
          ]},
          { title: "Vasopresseurs, corticoïdes et contrôle du foyer", items: [
            { text: "Noradrénaline (Levophed®) : vasopresseur de première ligne — cible pression artérielle moyenne ≥ 65 mmHg", grade: "1A" },
            { text: "Vasopressine 0,03 unités/minute en complément si noradrénaline > 0,25 microgrammes/kg/minute (économise la noradrénaline, réduit les arythmies — essai VASST)", grade: "1B" },
            { text: "Angiotensine II (Giapreza®) : option dans le choc vasoplégique réfractaire aux catécholamines (essai ATHOS-3, 2017)", grade: "2B", isNew: true },
            { text: "Hydrocortisone (Solucortef®) 200 mg/jour en perfusion continue si noradrénaline > 0,25 microgrammes/kg/minute depuis > 4 heures — Contrôle du foyer infectieux dans les 6 à 12 heures", grade: "1B" },
          ]},
        ],
        source: "Surviving Sepsis Campaign 2021 · SRLF/SFAR Sepsis et Choc Septique · Evans ICM 2021 · ATHOS-3 NEJM 2017"
      },
      {
        name: "Choc Hémorragique — Damage Control Resuscitation",
        urgence: "ABSOLUE",
        aliases: ["hémorragie grave", "choc hypovolémique", "traumatisme hémorragique", "damage control", "coagulopathie traumatique", "transfusion massive"],
        sections: [
          { title: "Priorité absolue : contrôle de l'hémorragie", items: [
            { text: "Contrôle chirurgical ou endovasculaire de l'hémorragie EN PREMIER — le remplissage ne remplace pas l'hémostase et peut diluer les facteurs de coagulation", grade: "1A" },
            { text: "Acide tranexamique (Exacyl®) 1 g en injection intraveineuse sur 10 minutes si < 3 heures du traumatisme, puis 1 g sur 8 heures — réduit la mortalité par hémorragie de 1,5% (essai CRASH-2, Lancet 2010)", grade: "1A" },
          ]},
          { title: "Transfusion par damage control resuscitation", items: [
            { text: "Transfusion en ratio 1:1:1 — 1 culot de globules rouges pour 1 plasma frais congelé pour 1 poche de plaquettes (essai PROPPR, JAMA 2015 : réduction mortalité à 24 heures)", grade: "1B" },
            { text: "Hypotension permissive : pression artérielle systolique cible 80 à 90 mmHg chez le traumatisé sans traumatisme crânien — cible ≥ 110 mmHg si traumatisme crânien grave", grade: "1B" },
            { text: "Fibrinogène si fibrinogène < 1,5 g/L : 3 à 4 g en injection intraveineuse — Calcium ionisé si < 1,1 mmol/L : gluconate de calcium 1 g pour 2 culots transfusés", grade: "1B" },
          ]},
          { title: "Prévenir la triade létale", items: [
            { text: "Hypothermie (température < 35°C) : réchauffer activement — couvertures chauffantes, perfusions réchauffées", grade: "1A" },
            { text: "Coagulopathie : plasma frais congelé + plaquettes + fibrinogène guidés par thromboélastographie si disponible", grade: "1B" },
          ]},
        ],
        source: "European Trauma Guidelines (Rossaint) 6e éd. 2023 · CRASH-2 Lancet 2010 · CRASH-3 Lancet 2019 · PROPPR JAMA 2015"
      },
      {
        name: "Choc Anaphylactique",
        urgence: "ABSOLUE",
        aliases: ["anaphylaxie", "allergie grave", "urticaire géant", "œdème de Quincke anaphylaxie", "choc allergique"],
        sections: [
          { title: "Classification française par grades de gravité", items: [
            { text: "Grade I : signes cutanéo-muqueux isolés (érythème, urticaire, œdème) — Grade II : atteinte multiviscérale modérée (hypotension, tachycardie, toux, gêne respiratoire) — Grade III : atteinte sévère menaçant le pronostic vital (collapsus, bronchospasme sévère, troubles du rythme) — Grade IV : arrêt circulatoire et/ou respiratoire", grade: "GPS" },
            { text: "L'adrénaline est indiquée à partir du grade II et titrée selon le grade — un grade I ne justifie pas d'adrénaline mais une surveillance", grade: "1A" },
          ]},
          { title: "Adrénaline — traitement de référence des grades ≥ II", items: [
            { text: "Hors anesthésie (patient non perfusé) : Adrénaline 0,3 à 0,5 mg en injection intramusculaire dans la face antérolatérale de la cuisse — PREMIER geste, sans délai", grade: "1A" },
            { text: "Répéter toutes les 5 à 15 minutes si insuffisant — pas de dose maximale en situation d'urgence vitale", grade: "1A" },
            { text: "Anaphylaxie périopératoire (patient monitoré et perfusé) : adrénaline IV titrée par bolus selon le grade — grade II : 10–20 µg, grade III : 100–200 µg, grade IV : 1 mg comme dans l'arrêt cardiaque (recommandations SFAR/SFA)", grade: "1A" },
          ], hasDoseCalc: true, drugs: [
            { name: "Adrénaline intramusculaire (adulte)", detail: "Face antérolatérale cuisse", fixed: "0,3 à 0,5 mg — dose fixe en urgence vitale" },
            { name: "Adrénaline IV si choc réfractaire", detail: "0,1 mg titrés IV", perKg: 0.001, unit: "mg", max: 0.1, round: 3 },
          ]},
          { title: "Mesures associées et surveillance", items: [
            { text: "Position allongée jambes surélevées — Remplissage 1 à 2 litres de sérum physiologique en bolus rapide", grade: "1B" },
            { text: "Oxygène à haut débit — Intubation trachéale précoce si œdème laryngé (obstruction peut survenir en quelques minutes)", grade: "1A" },
            { text: "Si patient sous bêtabloquants : glucagon 1 à 5 mg en injection intraveineuse directe (lève la résistance aux catécholamines)", grade: "GPS" },
            { text: "Surveillance minimum 6 heures après stabilisation : réaction biphasique dans 5 à 20% des cas (1 à 72 heures après la réaction initiale)", grade: "1B" },
          ]},
        ],
        source: "SFMU/SFA/GFRUP Anaphylaxie 2016 · SFAR/SFA Anaphylaxie périopératoire 2011 · WAO 2020"
      },
      {
        name: "Choc Cardiogénique",
        urgence: "ABSOLUE",
        aliases: ["choc cardiogénique", "bas débit cardiaque", "insuffisance ventriculaire gauche aiguë", "FEVG effondrée choc", "infarctus compliqué choc"],
        sections: [
          { title: "Traitement étiologique en priorité", items: [
            { text: "Infarctus du myocarde culpable : intervention coronaire percutanée en urgence absolue même si présentation tardive (étude SHOCK 1999 : réduction mortalité à 6 mois, NNT = 8)", grade: "1B" },
            { text: "Valvulopathie aiguë (régurgitation massive) : chirurgie urgente si instabilité hémodynamique persistante", grade: "GPS" },
          ]},
          { title: "Soutien hémodynamique", items: [
            { text: "Noradrénaline (Levophed®) : vasopresseur de première ligne dans le choc cardiogénique — supérieure à la dopamine en termes de mortalité selon les données récentes", grade: "1A", isNew: true },
            { text: "Dobutamine 5 à 20 microgrammes/kg/minute : soutien inotrope si bas débit cardiaque documenté — éviter si fréquence cardiaque > 110/minute ou arythmies ventriculaires", grade: "2B" },
            { text: "Remplissage vasculaire TRÈS LIMITÉ : maximum 200 mL sauf hypovolémie documentée — risque majeur d'œdème pulmonaire", grade: "GPS" },
            { text: "Diurétique (furosémide 20 à 40 mg intraveineux) si surcharge volémique et oligoanurie", grade: "GPS" },
          ]},
          { title: "Assistance circulatoire mécanique", items: [
            { text: "Contre-pulsion intra-aortique par ballon (IABP) : pas de réduction de mortalité démontrée (essai IABP-SHOCK II, NEJM 2012) — utilisée au cas par cas comme pont vers une assistance plus puissante", grade: "2B" },
            { text: "Impella CP ou 5.5 / ECMO veno-artérielle si choc réfractaire à toutes les mesures médicales — décision pluridisciplinaire urgente (équipe cardiologie + réanimation)", grade: "GPS" },
          ]},
        ],
        source: "Hochman NEJM 1999 (SHOCK) · Thiele NEJM 2012 (IABP-SHOCK II) · ESC HF Guidelines 2021"
      },
      {
        name: "Oxygénothérapie à Haut Débit Nasal (OHDN/HFNO)",
        urgence: "URGENT",
        aliases: ["oxygénothérapie haut débit", "OHDN", "HFNO", "Optiflow", "haut débit nasal", "ROX index", "insuffisance respiratoire hypoxémique"],
        sections: [
          { title: "Indications — Conférence de consensus SRLF-SFMU 2024", items: [
            { text: "L'oxygénothérapie à haut débit nasal (OHDN) est recommandée plutôt que l'oxygénothérapie conventionnelle chez les patients en insuffisance respiratoire aiguë hypoxémique de novo (recommandation forte)", grade: "1A" },
            { text: "L'OHDN est préférée à la ventilation non invasive (VNI) en cas d'insuffisance respiratoire aiguë hypoxémique de novo (sans hypercapnie, sans OAP cardiogénique)", grade: "1B" },
            { text: "Le décubitus ventral conscient est proposé chez les patients atteints de pneumonie à COVID-19 nécessitant le recours à l'OHDN", grade: "2B" },
          ]},
          { title: "Réglages initiaux", items: [
            { text: "Débit initial : 50 L/min (plage 40 à 60 L/min) — adapter selon la tolérance du patient", grade: "GPS" },
            { text: "FiO₂ titrée pour obtenir une SpO₂ entre 92 et 96% — débuter à FiO₂ 1,0 puis diminuer", grade: "1A" },
            { text: "Température de l'air humidifié : 37°C (ou 34°C si mauvaise tolérance) — l'humidification chauffée améliore la clairance muco-ciliaire et le confort", grade: "GPS" },
          ]},
          { title: "Surveillance — Index ROX (prédiction de l'échec)", items: [
            { text: "Index ROX = (SpO₂/FiO₂) / fréquence respiratoire — à mesurer à H2, H6 et H12 après l'initiation", grade: "1B" },
            { text: "ROX ≥ 4,88 à H2, H6 ou H12 : faible risque d'intubation — poursuivre l'OHDN", grade: "1B" },
            { text: "ROX < 3,85 : risque élevé d'échec et d'intubation — alerter le réanimateur, envisager l'intubation", grade: "1B" },
            { text: "ROX entre 3,85 et 4,88 : zone d'incertitude — réévaluer à 1–2h, surveillance rapprochée", grade: "GPS" },
          ]},
          { title: "Critères d'intubation — ne pas retarder", items: [
            { text: "Signes de détresse persistants malgré OHDN optimale : fréquence respiratoire > 40/min, tirage, balancement thoraco-abdominal, épuisement", grade: "1A" },
            { text: "Hypoxémie réfractaire (SpO₂ < 90% malgré FiO₂ 1,0 et débit maximal), troubles de conscience, instabilité hémodynamique", grade: "1A" },
            { text: "Le retard à l'intubation en cas d'échec de l'OHDN est associé à une surmortalité — ne pas s'acharner", grade: "1B" },
          ]},
        ],
        source: "Conférence de consensus SRLF-SFMU 2024 (Helms, Ann Intensive Care 2024;14:140) · Roca AJRCCM 2019 (ROX index)"
      },
    ]
  },
  {
    id: "neuro", label: "Neurologie Urgente", short: "NEURO", iconName: "brain", color: C.purple, bgColor: C.purpleBg,
    protos: [
      {
        name: "Accident Vasculaire Cérébral Ischémique — HAS Octobre 2025",
        urgence: "ABSOLUE", isNew: true,
        aliases: ["AVC ischémique", "accident vasculaire cérébral", "infarctus cérébral", "paralysie brusque", "aphasie brutale", "NIHSS", "thrombectomie thrombolyse"],
        sections: [
          { title: "Imagerie en urgence — chaque minute compte", items: [
            { text: "1,9 million de neurones détruits chaque minute sans reperfusion — IRM séquence de diffusion + angio-IRM ou scanner cérébral + angio-scanner — objectif porte → imagerie < 25 minutes", grade: "1A" },
            { text: "Objectif : porte → injection du thrombolytique < 60 minutes", grade: "1A" },
          ]},
          { title: "Thrombolyse intraveineuse — recommandations HAS octobre 2025", items: [
            { text: "Ténectéplase (Metalyse®) 0,25 mg/kg en injection intraveineuse directe unique (maximum 25 mg) : NOUVEAU STANDARD recommandé par la HAS, notamment avant thrombectomie — disponible en France depuis janvier 2025", grade: "1B", isNew: true },
            { text: "Altéplase (Actilyse®) 0,9 mg/kg (10% en bolus direct puis 90% sur 60 minutes, maximum 90 mg) : traitement de référence historique, toujours valide", grade: "1A" },
            { text: "Délai d'administration < 4 heures 30 après le début des symptômes — vérifier scrupuleusement les contre-indications (anticoagulants, chirurgie récente, hémorragie récente)", grade: "1A" },
            { text: "Accident vasculaire cérébral au réveil ou heure de début inconnue : éligible si pénombre cérébrale viable à l'IRM (discordance séquence diffusion/FLAIR)", grade: "2B" },
          ], hasDoseCalc: true, drugs: [
            { name: "Ténectéplase (Metalyse®) — bolus unique", detail: "0,25 mg/kg IV direct, max 25 mg", perKg: 0.25, unit: "mg", max: 25, round: 1 },
            { name: "Altéplase (Actilyse®) — dose totale", detail: "0,9 mg/kg IV, max 90 mg", perKg: 0.9, unit: "mg", max: 90, round: 0 },
            { name: "Altéplase — bolus initial (10% de la dose)", detail: "10% en IV direct", perKg: 0.09, unit: "mg", max: 9, round: 1 },
          ]},
          { title: "Thrombectomie mécanique — données 2025", items: [
            { text: "Indication validée : occlusion de grande artère (segment M1, artère carotide interne, artère basilaire) — score NIHSS ≥ 6 — délai < 6 heures (ou < 24 heures si pénombre viable, essais DAWN et DEFUSE-3)", grade: "1A" },
            { text: "Occlusions distales (segment M2) — DONNÉES NÉGATIVES 2024 : les essais ESCAPE-MeVO et DISTAL n'ont pas montré de bénéfice et ESCAPE-MeVO suggère un risque accru de mortalité — NE PAS proposer systématiquement", grade: "2B", isNew: true },
          ]},
          { title: "Mesures générales", items: [
            { text: "Pression artérielle : ne pas traiter sauf si > 220/120 mmHg (ou > 185/110 si thrombolyse prévue) — l'hypotension aggrave l'ischémie de la zone pénombre", grade: "1B" },
            { text: "Glycémie cible 7,7 à 10 mmol/L — corriger immédiatement toute hypoglycémie < 3,3 mmol/L — antipyrexie si température > 37,5°C (paracétamol 1 g IV)", grade: "1B" },
          ]},
        ],
        source: "HAS Recommandations AVC octobre 2025 · ESO Ténectéplase 2023 · ESCAPE-MeVO NEJM 2024 · DEFUSE-3 NEJM 2018"
      },
      {
        name: "État de Mal Épileptique",
        urgence: "ABSOLUE",
        aliases: ["état de mal épileptique", "convulsions prolongées > 5 minutes", "crise épileptique subintrante", "status epilepticus"],
        sections: [
          { title: "Phase 0 à 5 minutes : sécurisation", items: [
            { text: "Oxygène — Voie veineuse périphérique — Glycémie capillaire — Monitorage cardiaque et oxymétrie", grade: "1A" },
            { text: "Thiamine (Bévitine®) 100 mg en injection intraveineuse si alcoolisme ou dénutrition suspecté — avant tout apport glucidique", grade: "1A" },
          ]},
          { title: "Phase 5 à 20 minutes : benzodiazépines en première intention", items: [
            { text: "Lorazépam (Ativan®) 0,1 mg/kg en injection intraveineuse directe (maximum 4 mg) — ou Diazépam (Valium®) 10 mg en injection intraveineuse", grade: "1A" },
            { text: "Si pas de voie veineuse : Midazolam (Hypnovel®) 0,2 mg/kg par voie intramusculaire ou intranasale — aussi efficace que le lorazépam intraveineux (essai RAMPART)", grade: "1A" },
            { text: "Répéter une fois à 5 minutes si les convulsions persistent", grade: "1A" },
          ], hasDoseCalc: true, drugs: [
            { name: "Lorazépam (Ativan®) IV", detail: "0,1 mg/kg IV direct, max 4 mg", perKg: 0.1, unit: "mg", max: 4, round: 1 },
            { name: "Midazolam IM ou intranasale", detail: "Si pas de voie veineuse — 0,2 mg/kg", perKg: 0.2, unit: "mg", max: 10, round: 1 },
          ]},
          { title: "Phase 20 à 40 minutes : antiépileptique intraveineux — essai ESETT", items: [
            { text: "Valproate de sodium (Dépakine®) 40 mg/kg en perfusion intraveineuse sur 10 minutes — première intention si pas de contre-indication (grossesse, maladie métabolique)", grade: "1B" },
            { text: "Lévétiracétam (Keppra®) 60 mg/kg en perfusion intraveineuse sur 10 minutes (maximum 4 500 mg) — non inférieur au valproate (essais ESETT 2019 et ESTABLISHED 2022)", grade: "1B" },
            { text: "Fosphénytoïne 20 mg équivalents-phénytoïne/kg sur 15 minutes — surveillance cardiaque obligatoire", grade: "1B" },
          ], hasDoseCalc: true, drugs: [
            { name: "Valproate de sodium (Dépakine®)", detail: "IV sur 10 min, max 3000 mg", perKg: 40, unit: "mg", max: 3000, round: 0 },
            { name: "Lévétiracétam (Keppra®)", detail: "IV sur 10 min, max 4500 mg", perKg: 60, unit: "mg", max: 4500, round: 0 },
          ]},
          { title: "État de mal réfractaire > 40 minutes : intubation", items: [
            { text: "Intubation orotrachéale — Propofol (Diprivan®) 5 mg/kg/heure ou Midazolam 0,1 à 0,4 mg/kg/heure par seringue électrique", grade: "1B" },
            { text: "Électroencéphalogramme continu OBLIGATOIRE pour guider le traitement — objectif suppressions de bouffées ou silence électrique", grade: "1A" },
          ]},
        ],
        source: "Kapur NEJM 2019;381:2103 (ESETT) · Chamberlain NEJM 2022 (ESTABLISHED) · SRLF 2020"
      },
      {
        name: "Hypertension Intracrânienne et Engagement Cérébral",
        urgence: "ABSOLUE",
        aliases: ["hypertension intracrânienne", "HTIC", "engagement cérébral temporal", "œdème cérébral", "mydriase unilatérale aréflexique", "traumatisme crânien grave"],
        sections: [
          { title: "Mesures de base — Niveau 0 (tout patient)", items: [
            { text: "Position tête et buste à 30° en axe neutre strict — optimise le drainage veineux cérébral sans réduire la pression de perfusion cérébrale", grade: "1A" },
            { text: "Maintenir la pression artérielle moyenne > 80 mmHg pour garantir une pression de perfusion cérébrale ≥ 60 mmHg (Pression de perfusion cérébrale = Pression artérielle moyenne moins Pression intracrânienne)", grade: "1A" },
            { text: "Éviter absolument : température > 37,5°C — saturation < 94% — glycémie < 4 mmol/L — natrémie < 135 mmol/L", grade: "1A" },
          ]},
          { title: "Osmothérapie — si engagement clinique (Niveau 1)", items: [
            { text: "Solution saline hypertonique à 3% : 250 mL en perfusion intraveineuse sur 20 minutes — préférée si hypovolémie associée ou natrémie basse", grade: "1B" },
            { text: "Mannitol 20% : 0,5 à 1 g/kg en perfusion intraveineuse sur 20 minutes — contre-indiqué si natrémie > 155 mmol/L", grade: "1B" },
          ]},
          { title: "Hyperventilation et escalade chirurgicale (Niveaux 2 et 3)", items: [
            { text: "Hyperventilation temporaire si engagement imminent : PaCO₂ cible 30 à 35 mmHg — durée d'efficacité < 30 minutes — uniquement comme pont vers l'osmothérapie ou la chirurgie", grade: "2B" },
            { text: "Sédation : Propofol 1 à 4 mg/kg/heure + Sufentanil — Drainage ventriculaire externe si hydrocéphalie obstructive", grade: "1B" },
            { text: "Craniectomie décompressive : accident vasculaire cérébral sylvien malin chez patient < 60 ans — traumatisme crânien grave réfractaire", grade: "1B" },
          ]},
        ],
        source: "BTF TBI Guidelines 4th ed. 2016 · Vahedi Lancet Neurol 2007;6:215 · Rabinstein NEJM 2020;382:645"
      },
      {
        name: "Hémorragie Méningée (Rupture Anévrismale)",
        urgence: "ABSOLUE",
        aliases: ["hémorragie sous-arachnoïdienne", "HSA", "rupture anévrismale", "céphalée en coup de tonnerre", "anévrisme cérébral rompu"],
        sections: [
          { title: "Diagnostic", items: [
            { text: "Scanner cérébral sans injection : sensibilité 98% si réalisé dans les 6 heures — si négatif après 6 heures : ponction lombaire pour xanthochromie (spectrométrie, pas examen visuel seul)", grade: "1A" },
            { text: "Angio-scanner ou artériographie cérébrale pour localiser l'anévrisme et planifier le traitement", grade: "1A" },
          ]},
          { title: "Traitement immédiat", items: [
            { text: "Nimodipine (Nimotop®) 60 mg par voie orale ou sonde nasogastrique toutes les 4 heures pendant 21 jours : prévient le vasospasme et réduit les séquelles neurologiques", grade: "1A" },
            { text: "Contrôle tensionnel : cible pression artérielle systolique < 160 mmHg jusqu'à sécurisation de l'anévrisme — éviter à la fois l'hypertension (risque de resaignement) et l'hypotension", grade: "1A" },
            { text: "Analgésie et repos strict en chambre calme — paracétamol 1 g toutes les 6 heures intraveineux — éviter les antalgiques qui altèrent l'hémostase", grade: "GPS" },
          ]},
          { title: "Sécurisation de l'anévrisme en urgence", items: [
            { text: "Embolisation endovasculaire (coïling) : méthode de choix si techniquement accessible — résultats supérieurs à la chirurgie (essai ISAT, Lancet 2002)", grade: "1A" },
            { text: "Clippage neurochirurgical : si anévrisme non accessible par voie endovasculaire ou en cas d'hématome intraparenchymateux compressif nécessitant une évacuation", grade: "1B" },
            { text: "Surveiller l'hydrocéphalie secondaire : drainage ventriculaire externe si dilatation ventriculaire sur scanner de contrôle", grade: "GPS" },
          ]},
        ],
        source: "AHA/ASA aSAH Guidelines 2023 · Neurocritical Care Society 2023 · ISAT Lancet 2002"
      },
      {
        name: "Hématome Intracérébral Spontané",
        urgence: "ABSOLUE",
        aliases: ["hématome intracérébral", "AVC hémorragique", "hémorragie intraparenchymateuse", "hématome lobaire", "hématome noyaux gris"],
        sections: [
          { title: "Bilan initial", items: [
            { text: "Scanner cérébral sans injection : diagnostic, volume (formule ABC/2), localisation, présence d'hémorragie ventriculaire ou d'hydrocéphalie", grade: "1A" },
            { text: "Angio-scanner ou IRM si : patient < 55 ans, hématome lobaire, pas d'HTA connue — rechercher une malformation artérioveineuse ou un anévrisme", grade: "GPS" },
          ]},
          { title: "Bundle de soins précoce (INTERACT3 2023)", items: [
            { text: "L'essai INTERACT3 (Lancet 2023) a démontré qu'un bundle de soins précoce améliore le pronostic fonctionnel : contrôle tensionnel intensif + glycémique + de la température + reversal rapide de l'anticoagulation", grade: "1A" },
            { text: "Pression artérielle systolique cible < 140 mmHg, à atteindre précocement (dans l'heure) et à maintenir — réduit l'expansion de l'hématome", grade: "1B" },
            { text: "Nicardipine (Loxen®) ou urapidil (Eupressyl®) IV par seringue électrique : agents de choix pour un contrôle tensionnel titré — éviter les à-coups", grade: "GPS" },
            { text: "Contrôle glycémique (éviter hyper et hypoglycémie) et de la température (traiter la fièvre) dans le cadre du bundle", grade: "1B" },
          ]},
          { title: "Reversal des anticoagulants", items: [
            { text: "Anti-vitamines K : complexe prothrombinique (Kanokad® ou Octaplex®) 25 UI/kg intraveineux + vitamine K 10 mg intraveineuse — objectif INR < 1,3 dans l'heure", grade: "1A" },
            { text: "Héparine non fractionnée : sulfate de protamine 1 mg pour 100 UI d'héparine administrées dans les 4 dernières heures", grade: "1A" },
            { text: "Anticoagulants oraux directs (apixaban, rivaroxaban) : andexanet alfa (Ondexxya®) si disponible — ou complexe prothrombinique 50 UI/kg", grade: "1B" },
            { text: "Dabigatran (Pradaxa®) : idarucizumab (Praxbind®) 5 g intraveineux — antidote spécifique", grade: "1A" },
          ]},
        ],
        source: "AHA/ASA ICH Guidelines 2022 · Ma INTERACT3 Lancet 2023 · ESO ICH Guidelines 2024"
      },
      {
        name: "Coma d'Étiologie Inconnue — Démarche Diagnostique",
        urgence: "ABSOLUE",
        aliases: ["coma inexpliqué", "trouble de conscience inexpliqué", "patient inconscient", "Glasgow bas sans cause", "coma métabolique"],
        sections: [
          { title: "Gestes immédiats — ABCDE + glycémie en PREMIER", items: [
            { text: "Glycémie capillaire EN PREMIER geste : hypoglycémie (< 3 mmol/L) → glucose 30% 50 mL en injection intraveineuse directe — cause réversible la plus fréquemment manquée", grade: "1A" },
            { text: "Si Glasgow ≤ 8 : intubation orotrachéale d'emblée — Naloxone 0,4 mg IV si contexte d'intoxication aux opiacés (myosis, toxicomanie connue)", grade: "1A" },
            { text: "Thiamine (Bévitine®) 500 mg IV systématiquement si alcoolisme ou dénutrition suspectés — AVANT tout apport glucidique (prévention encéphalopathie de Gayet-Wernicke)", grade: "1A" },
          ]},
          { title: "Examen neurologique structuré", items: [
            { text: "Score de Glasgow détaillé (E+V+M) — Réactivité pupillaire (symétrie, taille, réflexe photomoteur) — Réflexes du tronc cérébral — Mouvements oculaires spontanés et provoqués", grade: "1A" },
            { text: "Signe de localisation → scanner cérébral urgent — Raideur méningée → ponction lombaire après imagerie — État de mal non convulsivant : EEG en urgence", grade: "1A" },
          ]},
          { title: "Bilan biologique systématique", items: [
            { text: "Ionogramme complet (Na⁺, K⁺, Ca²⁺, Mg²⁺) — Glycémie — Créatinine — Bilan hépatique — Ammoniémie — TSH — Cortisol — Troponine — Gaz du sang — Toxiques urinaires et plasmatiques", grade: "1A" },
          ]},
          { title: "Causes à ne pas manquer — mnémotechnique AEIOU-TIPS", items: [
            { text: "A = Alcool, Arythmie · E = Épilepsie, Électrolytes · I = Insuline (hypoglycémie) · O = Overdose (opiacés, BZD) · U = Urémie", grade: "GPS" },
            { text: "T = Traumatisme crânien · I = Infection (méningite, encéphalite) · P = Psychiatrique (diagnostic d'exclusion strict) · S = Stroke (AVC), Syncope", grade: "GPS" },
          ]},
        ],
        source: "Plum & Posner Diagnosis of Stupor and Coma · SRLF Coma 2020"
      },
      {
        name: "Encéphalite Herpétique (Herpès Simplex Virus — HSV)",
        urgence: "ABSOLUE",
        aliases: ["encéphalite herpétique", "HSV encéphalite", "encéphalite virale", "fièvre confusion temporale", "hallucinations olfactives fièvre"],
        sections: [
          { title: "Diagnostic — urgence thérapeutique", items: [
            { text: "Triade évocatrice : fièvre + confusion ou troubles de la conscience + signes d'atteinte temporale (hallucinations olfactives, amnésie, comportement bizarre, crise partielle)", grade: "GPS" },
            { text: "IRM cérébrale urgente : hypersignal T2/FLAIR temporal interne bilatéral ou unilatéral — présent chez 80% des patients — réaliser immédiatement", grade: "1A" },
            { text: "Ponction lombaire : polymérase en chaîne (PCR) HSV sur liquide céphalorachidien — sensibilité 98% — résultat en 6 à 12 heures — NE PAS attendre le résultat pour démarrer l'aciclovir", grade: "1A" },
          ]},
          { title: "Traitement antiviral — démarrer IMMÉDIATEMENT à la suspicion", items: [
            { text: "Aciclovir (Zovirax®) 10 mg/kg en perfusion intraveineuse sur 1 heure toutes les 8 heures pendant 14 à 21 jours — DÉMARRER dès la suspicion clinique", grade: "1A" },
            { text: "Adapter la dose à la fonction rénale — hydratation abondante obligatoire (risque de néphrotoxicité et neurotoxicité par cristallisation)", grade: "1A" },
          ], hasDoseCalc: true, drugs: [
            { name: "Aciclovir (Zovirax®) IV", detail: "10 mg/kg sur 1h toutes les 8h", perKg: 10, unit: "mg/dose", round: 0 },
          ]},
        ],
        source: "SPILF/SFN Encéphalite Herpétique 2017 · Tunkel Clin Infect Dis 2008;47:303"
      },
      {
        name: "Syndrome de Guillain-Barré — Forme Grave",
        urgence: "URGENT",
        aliases: ["Guillain-Barré", "polyradiculonévrite aiguë", "paralysie ascendante progressive", "aréflexie progressive", "SGB"],
        sections: [
          { title: "Surveillance respiratoire — critères d'intubation", items: [
            { text: "Capacité vitale (CV) toutes les 4 à 6 heures : intubation si CV < 20 mL/kg OU si déclin > 30% en 24 heures", grade: "1A" },
            { text: "Règle des 20/30/40 : intubation si CV < 20 mL/kg OU pression inspiratoire maximale < 30 cmH₂O OU pression expiratoire maximale < 40 cmH₂O", grade: "1A" },
            { text: "Dysautonomie : monitoring cardiaque continu obligatoire (arythmies, bradycardie, tachycardie), surveillance tensionnelle, sonde urinaire", grade: "1A" },
          ]},
          { title: "Traitement immunomodulateur", items: [
            { text: "Immunoglobulines polyvalentes intraveineuses 0,4 g/kg/jour pendant 5 jours : traitement de référence — efficacité équivalente aux échanges plasmatiques", grade: "1A" },
            { text: "Échanges plasmatiques : 4 à 6 échanges sur 2 semaines — alternative si contre-indication aux IVIg ou absence d'effet", grade: "1A" },
            { text: "Corticoïdes : NON indiqués — méta-analyses négatives, peuvent aggraver", grade: "1A" },
          ]},
          { title: "Médicaments contre-indiqués en SGB", items: [
            { text: "CONTRE-INDIQUÉS : aminosides (gentamicine, amikacine), fluoroquinolones, magnésium, curares non dépolarisants (rocuronium, cisatracurium) — risque de bloc neuromusculaire prolongé", grade: "1A" },
          ]},
        ],
        source: "PNDS SGB HAS 2022 · van den Berg Lancet 2014;384:1635"
      },
      {
        name: "Crise Myasthénique",
        urgence: "ABSOLUE",
        aliases: ["myasthénie grave", "crise myasthénique", "détresse respiratoire myasthénie", "ptosis dysphagie dyspnée", "déficit moteur fluctuant"],
        sections: [
          { title: "Surveillance respiratoire — critères d'intubation", items: [
            { text: "Capacité vitale toutes les 4 heures : intubation si CV < 20 mL/kg ou progression rapide — anticiper l'intubation (difficile après détresse installée)", grade: "1A" },
            { text: "Facteurs déclenchants à rechercher et corriger : infection, médicaments (aminosides, fluoroquinolones, magnésium, bêtabloquants), chirurgie récente, hypokaliémie", grade: "1A" },
          ]},
          { title: "Traitement immunomodulateur d'urgence", items: [
            { text: "Échanges plasmatiques : 5 à 6 échanges sur 10 à 14 jours — traitement de choix en crise — amélioration en 1 à 2 semaines", grade: "1A" },
            { text: "Immunoglobulines polyvalentes IV 2 g/kg sur 2 à 5 jours : alternative aux échanges — délai d'action identique", grade: "1A" },
            { text: "Inhibiteurs de la cholinestérase (pyridostigmine) : suspendre en crise myasthénique sévère (aggravation des sécrétions bronchiques, risque de crise cholinergique)", grade: "GPS" },
          ]},
          { title: "Précautions médicamenteuses absolues en réanimation", items: [
            { text: "CONTRE-INDIQUÉS : aminosides, fluoroquinolones, magnésium IV, curares non dépolarisants (rocuronium, cisatracurium, vecuronium) — risque de bloc neuromusculaire prolongé non réversible", grade: "1A" },
          ]},
        ],
        source: "PNDS Myasthénie HAS 2021 · Gilhus NEJM 2016;375:2570"
      },
      {
        name: "Thrombose Veineuse Cérébrale (TVC)",
        urgence: "URGENT",
        aliases: ["thrombose veineuse cérébrale", "TVC", "thrombose sinus veineux cérébral", "thrombophlébite cérébrale", "céphalées déficit neurologique"],
        sections: [
          {title: "Diagnostic", items: [
            {text: "Présentation variable : céphalées progressives ± déficit focal ± convulsions ± hypertension intracrânienne (papilloedème, nausées) — femme jeune sous contraceptif, post-partum, thrombophilie connue", grade: "GPS"},
            {text: "IRM cérébrale avec angio-IRM veineuse : hypersignal T1 dans le sinus (thrombus) + défaut de remplissage en angio-IRM — examen de référence", grade: "1A"},
            {text: "D-dimères élevés dans 97% des TVC (valeur prédictive négative élevée si normaux)", grade: "2B"},
          ]},
          {title: "Traitement anticoagulant", items: [
            {text: "Héparine non fractionnée ou HBPM à dose curative : DÉMARRER IMMÉDIATEMENT même en présence d'une transformation hémorragique (infarctus veineux hémorragique) — le bénéfice l'emporte sur le risque", grade: "1A"},
            {text: "Relais anticoagulant oral (NACO ou AVK) pendant 3 à 12 mois selon l'étiologie et le risque de récidive thrombophilique", grade: "1A"},
            {text: "Traiter les convulsions : antiépileptique IV en urgence — prophylaxie secondaire discutée (lésion corticale visible sur IRM)", grade: "1B"},
          ]},
        ],
        source: "ESVS/ESO TVC Guidelines 2023 · Ferro NEJM 2011;365:524"
      },
      {
        name: "Méningo-Encéphalite Auto-Immune (Anti-NMDA, Anti-LGI1)",
        urgence: "URGENT",
        aliases: ["encéphalite auto-immune", "encéphalite anti-NMDA", "encéphalite LGI1", "encéphalite limbique", "psychose aiguë encéphalite"],
        sections: [
          {title: "Tableau évocateur selon le type", items: [
            {text: "Encéphalite anti-NMDA (femme jeune dans 80%) : 5 phases — prodrome viral → troubles psychiatriques (psychose aiguë, agitation) → épilepsie → dyskinésies orofaciales → coma avec dysautonomie — chercher un tératome ovarien (30%)", grade: "GPS"},
            {text: "Encéphalite LGI1 : crises faciobrachiales dystoniennes pathognomoniques — hyponatrémie fréquente (SIADH) — sujet âgé > 50 ans", grade: "GPS"},
            {text: "Bilan : IRM cérébrale + EEG (delta brush pathognomonique en anti-NMDA) + auto-anticorps sériques ET dans le liquide céphalorachidien (plus sensibles)", grade: "1A"},
            {text: "Scanner thoraco-abdomino-pelvien + échographie pelvienne chez la femme : rechercher un tératome ovarien (ablation urgente si trouvé)", grade: "1A"},
          ]},
          {title: "Traitement immunomodulateur", items: [
            {text: "Première ligne : méthylprednisolone 1 g IV × 5 jours + immunoglobulines polyvalentes 2 g/kg sur 5 jours — en association simultanée", grade: "1B"},
            {text: "Échanges plasmatiques : si réponse insuffisante à J14 ou tableau grave d'emblée", grade: "1B"},
            {text: "Rituximab 375 mg/m² × 4 si résistance à la première ligne — deuxième ligne de référence", grade: "2B"},
          ]},
        ],
        source: "EAN Autoimmune Encephalitis Guidelines 2020 · Graus Lancet Neurol 2016"
      },
      {
        name: "Neuroprognostication Après Arrêt Cardiaque — ERC 2025",
        urgence: "SURVEILLANCE",
        aliases: ["pronostic neurologique post-ACR", "anoxie cérébrale", "état végétatif post-arrêt cardiaque", "EEG pronostic réanimation", "potentiels évoqués pronostic"],
        sections: [
          {title: "Délai et conditions d'évaluation — ERC 2025", items: [
            {text: "Toute évaluation neuropronostique avant 72 heures après l'arrêt de la sédation est PRÉMATURÉE et non fiable — respecter ce délai impérativement", grade: "1A"},
            {text: "Éliminer les confondants : sédatifs résiduels (dosages plasmatiques), hypothermie résiduelle (T > 36°C avant évaluation), troubles métaboliques (hypoglycémie, insuffisance rénale ou hépatique)", grade: "1A"},
          ]},
          {title: "Approche multimodale — aucun paramètre isolé suffisant", items: [
            {text: "Examen neurologique : absence bilatérale de réflexe cornéen ET de réaction pupillaire à 72 heures — spécificité 100% pour mauvais pronostic si confirmée en l'absence de confondants", grade: "1A"},
            {text: "Potentiels évoqués somesthésiques (PES) : absence bilatérale de la réponse N20 — prédicteur de mauvais pronostic avec spécificité > 99%", grade: "1A"},
            {text: "EEG continu : absence d'activité ou burst-suppression persistant à H24–H72 — patterns malins validés", grade: "1A"},
            {text: "Neuro-spécifique enolase (NSE) > 60 µg/L à H48–H72 : biomarqueur de lésion neuronale — IRM cérébrale à J3–J7 : anomalies de diffusion étendues", grade: "2B"},
          ]},
        ],
        source: "ERC/ESICM Post-Resuscitation Guidelines 2025 · Sandroni ICM 2022"
      },
      {
        name: "Compression Médullaire Aiguë",
        urgence: "ABSOLUE",
        aliases: ["compression médullaire aiguë", "paraplégie aiguë", "tétraplégie aiguë", "hématome épidural rachidien", "abcès épidural rachidien"],
        sections: [
          {title: "Diagnostic clinique et imagerie", items: [
            {text: "Syndrome lésionnel : déficit moteur et sensitif sous-lésionnel + troubles sphinctériens + niveau sensitif + dorsalgie ou cervicalgie associée", grade: "GPS"},
            {text: "IRM médullaire urgente : examen de référence — précise le niveau, l'étendue et l'étiologie (hématome épidural, abcès épidural, hernie discale massive, métastase vertébrale, luxation traumatique)", grade: "1A"},
          ]},
          {title: "Traitement — urgence chirurgicale", items: [
            {text: "Chirurgie de décompression dans les 6 heures : la récupération neurologique est temps-dépendante — chaque heure compte", grade: "1A"},
            {text: "Hématome épidural rachidien sous anticoagulants : reversal immédiat (complexe prothrombinique + vitamine K si AVK, ou antidote spécifique) + chirurgie urgente", grade: "1A"},
            {text: "Abcès épidural rachidien : chirurgie + vancomycine + rifampicine IV prolongée (Staphylocoque doré le plus fréquent)", grade: "1A"},
            {text: "Méthylprednisolone protocole NASCIS en traumatologie médullaire : NON recommandé en routine — rapport bénéfice/risque défavorable dans les méta-analyses récentes", grade: "1A"},
          ]},
        ],
        source: "AOSpine Spinal Cord Injury Guidelines 2022 · Fehlings Neurosurgery 2012"
      },
      {
        name: "Mort Encéphalique — Diagnostic et Constat Légal",
        urgence: "ABSOLUE",
        aliases: ["mort encéphalique", "mort cérébrale", "coma dépassé", "constat de décès neurologique", "diagnostic mort encéphalique"],
        sections: [
          { title: "Prérequis avant tout diagnostic", items: [
            { text: "Cause du coma connue, lésionnelle et irréversible — éliminer formellement les facteurs confondants : hypothermie (température ≥ 35°C), intoxication ou sédation résiduelle (dosages), troubles métaboliques ou endocriniens majeurs, hypotension", grade: "1A" },
            { text: "Le diagnostic ne peut être posé qu'en l'absence de toute sédation résiduelle — vérifier les demi-vies des agents administrés, doser si besoin", grade: "1A" },
          ]},
          { title: "Critères cliniques (les 3 simultanément)", items: [
            { text: "1. Coma aréactif profond (score de Glasgow 3) — absence totale de conscience et d'activité motrice spontanée ou provoquée", grade: "1A" },
            { text: "2. Abolition de TOUS les réflexes du tronc cérébral : photomoteur, cornéen, oculo-céphalique, oculo-vestibulaire, de toux, nauséeux", grade: "1A" },
            { text: "3. Absence de ventilation spontanée vérifiée par une épreuve d'hypercapnie (test d'apnée) : débrancher le respirateur sous oxygénation apnéique, confirmer l'absence de mouvement respiratoire pour une PaCO₂ ≥ 60 mmHg", grade: "1A" },
            { text: "Des automatismes médullaires peuvent persister (signe de Lazare) et n'excluent PAS la mort encéphalique — ils ne traduisent aucune activité cérébrale", grade: "GPS" },
          ]},
          { title: "Confirmation paraclinique — obligatoire en France (loi)", items: [
            { text: "Le Code de la santé publique exige UN examen paraclinique de confirmation : soit 2 EEG nuls et aréactifs de 30 minutes réalisés à 4 heures d'intervalle, soit une angiographie cérébrale (le plus souvent angioscanner) objectivant l'arrêt de la circulation encéphalique", grade: "1A" },
            { text: "Angioscanner cérébral : critère = absence d'opacification des veines cérébrales internes et des branches corticales des artères cérébrales moyennes, sur acquisition à 60 secondes après injection", grade: "1A" },
            { text: "En cas de sédation résiduelle ou de trouble métabolique gênant l'EEG, l'angioscanner cérébral est préféré (non influencé par ces facteurs)", grade: "1B" },
          ]},
          { title: "Aspects légaux et procédure", items: [
            { text: "Le procès-verbal de constat de la mort est signé par deux médecins ne participant ni au prélèvement ni à la transplantation (indépendance réglementaire)", grade: "1A" },
            { text: "L'heure légale du décès est celle de la confirmation paraclinique — la réanimation peut être poursuivie en vue d'un éventuel prélèvement d'organes", grade: "GPS" },
            { text: "Réaliser un angioscanner corps entier dans le même temps pour évaluer la faisabilité d'un prélèvement multi-organes", grade: "1B" },
          ]},
        ],
        source: "Décret 96-1041 du 2 décembre 1996 · SFNR Angioscanner 2007 · Agence de la Biomédecine 2024 · Code de la Santé Publique"
      },
      {
        name: "Prise en Charge du Donneur en Mort Encéphalique (PMO)",
        urgence: "URGENT",
        aliases: ["prélèvement multi-organes", "PMO", "donneur d'organes", "réanimation du donneur", "prise en charge donneur mort encéphalique"],
        sections: [
          { title: "Cadre légal du consentement", items: [
            { text: "En France, principe du consentement présumé : toute personne est donneuse sauf inscription au Registre National des Refus (à consulter obligatoirement) ou opposition exprimée de son vivant", grade: "1A" },
            { text: "Recueil systématique du témoignage des proches sur la position du défunt — entretien mené avec la coordination hospitalière de prélèvement", grade: "1A" },
          ]},
          { title: "Objectifs réanimatoires — maintien de l'homéostasie", items: [
            { text: "Hémodynamique : PAM ≥ 65 mmHg, diurèse ≥ 1 mL/kg/h — remplissage prudent + noradrénaline — la défaillance hémodynamique est constante (vasoplégie + dysfonction myocardique)", grade: "1A" },
            { text: "Diabète insipide quasi-constant (effondrement de l'ADH) : desmopressine (Minirin®) + compensation des pertes hydriques — surveiller la natrémie (hypernatrémie délétère pour le greffon)", grade: "1A" },
            { text: "Hormonothérapie de suppléance discutée : hydrocortisone, parfois hormones thyroïdiennes — corrige la défaillance hémodynamique réfractaire", grade: "2B" },
            { text: "Ventilation protectrice (Vt 6-8 mL/kg, PEP) pour préserver le greffon pulmonaire — normothermie active — correction des troubles ioniques", grade: "1A" },
          ]},
          { title: "Coordination et organisation", items: [
            { text: "Alerter précocement la coordination hospitalière de prélèvement et l'Agence de la Biomédecine — bilan du donneur (sérologies, groupe, imagerie, bilan d'organe)", grade: "1A" },
            { text: "Le maintien optimal des fonctions vitales conditionne directement la qualité des greffons et le nombre d'organes prélevables", grade: "GPS" },
          ]},
        ],
        source: "Agence de la Biomédecine 2024 · SRLF Prise en charge du sujet en mort encéphalique 2005 · SFAR"
      },
      {
        name: "Vasospasme et Ischémie Cérébrale Retardée (post-HSA)",
        urgence: "URGENT",
        aliases: ["vasospasme cérébral", "ischémie cérébrale retardée", "vasospasme post-hémorragie méningée", "DCI", "déficit neurologique retardé"],
        sections: [
          { title: "Reconnaissance", items: [
            { text: "Survient typiquement entre J4 et J14 après une hémorragie sous-arachnoïdienne anévrismale — pic à J7 — première cause de morbi-mortalité après sécurisation de l'anévrisme", grade: "GPS" },
            { text: "Se manifeste par un déficit neurologique focal nouveau ou une dégradation de la vigilance, après élimination des autres causes (hydrocéphalie, resaignement, convulsions, troubles métaboliques)", grade: "GPS" },
            { text: "Surveillance par doppler transcrânien quotidien (accélération des vitesses) et angioscanner/angiographie en cas de suspicion", grade: "1B" },
          ]},
          { title: "Prévention", items: [
            { text: "Nimodipine (Nimotop®) 60 mg PO toutes les 4 heures pendant 21 jours dès le diagnostic d'hémorragie sous-arachnoïdienne : seul traitement ayant démontré une amélioration du pronostic neurologique", grade: "1A" },
            { text: "Maintien de la normovolémie et de la normonatrémie — éviter l'hypovolémie et l'hyponatrémie qui aggravent l'ischémie", grade: "1A" },
          ]},
          { title: "Traitement du vasospasme symptomatique", items: [
            { text: "Optimisation hémodynamique : induction d'une hypertension (objectif PAM élevée par noradrénaline) pour améliorer la perfusion cérébrale — l'ancienne triple-H thérapie est abandonnée au profit de la seule hypertension induite avec euvolémie", grade: "1B" },
            { text: "Angioplastie endovasculaire (mécanique au ballon ou pharmacologique par vasodilatateur intra-artériel) si vasospasme réfractaire au traitement médical", grade: "1B" },
          ]},
        ],
        source: "Neurocritical Care Society SAH 2023 · AHA/ASA aSAH Guidelines 2023 · ESO 2013"
      },
      {
        name: "Neuromyopathie Acquise en Réanimation",
        urgence: "SURVEILLANCE",
        aliases: ["neuromyopathie de réanimation", "polyneuropathie de réanimation", "myopathie de réanimation", "faiblesse acquise en réanimation", "ICU-acquired weakness"],
        sections: [
          { title: "Reconnaissance", items: [
            { text: "Faiblesse musculaire diffuse, symétrique, prédominant aux membres (épargne souvent la face), acquise au cours d'un séjour prolongé en réanimation — cause fréquente d'échec de sevrage ventilatoire", grade: "GPS" },
            { text: "Facteurs de risque : sepsis, syndrome de défaillance multiviscérale, ventilation mécanique prolongée, corticoïdes, curares, hyperglycémie, immobilisation", grade: "GPS" },
            { text: "Diagnostic clinique (testing musculaire, score MRC < 48/60) confirmé si besoin par l'électroneuromyographie (distingue atteinte axonale et myopathique)", grade: "1B" },
          ]},
          { title: "Prévention — seule approche efficace", items: [
            { text: "Mobilisation et rééducation précoces : kinésithérapie active dès que possible — réduit la durée de ventilation et améliore le statut fonctionnel", grade: "1A" },
            { text: "Limiter les facteurs iatrogènes : minimiser la sédation (protocoles d'allègement quotidien), limiter curares et corticoïdes, contrôle glycémique raisonnable", grade: "1B" },
            { text: "Il n'existe pas de traitement curatif spécifique — la récupération est progressive sur des semaines à des mois et conditionne le pronostic fonctionnel à long terme", grade: "GPS" },
          ]},
        ],
        source: "Stevens ICM 2009 · Hermans Lancet Respir Med 2015 · SRLF"
      },
    ]
  },
  {
    id: "infecto", label: "Infectiologie Réanimation", short: "INFECT", iconName: "bug", color: "#DC2626", bgColor: "#FEF2F2",
    protos: [
      {
        name: "Méningite Bactérienne Purulente de l'Adulte",
        urgence: "ABSOLUE",
        aliases: ["méningite bactérienne", "méningocoque", "pneumocoque", "purpura fulminans", "raideur nuque fébrile", "syndrome méningé"],
        sections: [
          { title: "Diagnostic et ponction lombaire", items: [
            { text: "Triade classique présente dans seulement 44% des cas : fièvre + raideur de la nuque + céphalées en casque résistantes. Y penser devant toute fièvre avec syndrome méningé", grade: "GPS" },
            { text: "Ponction lombaire systématique et urgente — Ne nécessite ni scanner ni fond d'œil préalables SAUF SI : convulsions, signes de localisation neurologique, score de Glasgow < 13, papilloedème, immunodépression sévère", grade: "1A" },
            { text: "Ne jamais retarder les antibiotiques > 30 minutes pour réaliser la ponction lombaire — si délai inévitable, prélever les hémocultures et débuter les antibiotiques", grade: "1A" },
          ]},
          { title: "Antibiothérapie probabiliste IMMÉDIATE", items: [
            { text: "Céfotaxime (Claforan®) 300 mg/kg/jour en perfusion continue ou en 4 à 6 perfusions, maximum 24 g/jour — ou Ceftriaxone (Rocéphine®) 100 mg/kg/jour en 2 injections, maximum 4 g/jour", grade: "1A" },
            { text: "Ajouter Amoxicilline 200 mg/kg/jour en perfusion si sujet > 50 ans, immunodéprimé, ou grossesse : couvre Listeria monocytogenes", grade: "1B" },
            { text: "Purpura fulminans : injection immédiate de Ceftriaxone 1 à 2 g en injection intraveineuse directe ou intramusculaire AVANT le transport — ne pas attendre l'arrivée à l'hôpital", grade: "1A" },
          ], hasDoseCalc: true, drugs: [
            { name: "Céfotaxime (Claforan®)", detail: "300 mg/kg/j IV en 4–6 fois, max 24 g/j", perKg: 300, unit: "mg/j", max: 24000, round: 0 },
            { name: "Ceftriaxone (Rocéphine®)", detail: "100 mg/kg/j IV en 2 fois, max 4 g/j", perKg: 100, unit: "mg/j", max: 4000, round: 0 },
            { name: "Amoxicilline (si Listeria suspecté)", detail: "200 mg/kg/j IV, sujet > 50 ans", perKg: 200, unit: "mg/j", round: 0 },
          ]},
          { title: "Dexaméthasone — AVANT ou AVEC les antibiotiques", items: [
            { text: "Dexaméthasone 0,15 mg/kg toutes les 6 heures pendant 4 jours : démarrer avant ou simultanément aux antibiotiques — réduit la mortalité et les séquelles neurologiques, surtout dans la méningite à pneumocoque", grade: "1A" },
            { text: "Arrêter la dexaméthasone si germe différent du pneumocoque ou du méningocoque identifié", grade: "GPS" },
            { text: "Déclaration obligatoire à l'Agence Régionale de Santé pour méningocoque — chimioprophylaxie des contacts (rifampicine 600 mg × 2/jour × 2 jours)", grade: "1A" },
          ], hasDoseCalc: true, drugs: [
            { name: "Dexaméthasone", detail: "0,15 mg/kg IV toutes les 6h × 4 jours", perKg: 0.15, unit: "mg/dose", round: 1 },
          ]},
        ],
        source: "SPILF Méningites Bactériennes 2018 · van de Beek NEJM 2006;354:44 · de Gans NEJM 2002;347:1549"
      },
      {
        name: "Paludisme Grave à Plasmodium falciparum — HAS 2024",
        urgence: "ABSOLUE", isNew: true,
        aliases: ["paludisme grave", "neuropaludisme", "Plasmodium falciparum", "accès palustre grave", "retour voyage zone tropicale fièvre"],
        sections: [
          { title: "Critères de gravité OMS", items: [
            { text: "Troubles de la conscience ou coma (neuropaludisme) — Convulsions répétées — Détresse respiratoire — Anémie sévère (hémoglobine < 7 g/dL) — Hypoglycémie (< 2,2 mmol/L) — Choc — Insuffisance rénale — Hyperparasitémie > 4%", grade: "GPS" },
            { text: "Diagnostic : test de diagnostic rapide immunochromatographique puis confirmation par goutte épaisse et frottis sanguin — comptage parasitaire obligatoire", grade: "1A" },
          ]},
          { title: "Artésunate intraveineux — traitement de référence HAS juillet 2024", items: [
            { text: "Artésunate (Artesunate Amivas®) 2,4 mg/kg en injection intraveineuse ou intramusculaire à l'heure 0, puis heure 12, puis heure 24, puis 1 fois par jour jusqu'à prise orale possible — supérieur à la quinine en mortalité (études SEAQUAMAT et AQUAMAT)", grade: "1A", isNew: true },
            { text: "Si artésunate indisponible dans les 2 heures : démarrer quinine intraveineuse en attendant — relayer par artésunate dès disponibilité dans les 24 premières heures", grade: "1A" },
            { text: "Relais oral obligatoire par association à base d'artémisinine (Riamet®) pour 3 jours après au moins 4 injections d'artésunate", grade: "1A" },
          ], hasDoseCalc: true, drugs: [
            { name: "Artésunate IV/IM (Artesunate Amivas®)", detail: "H0 + H12 + H24 puis 1 fois/jour", perKg: 2.4, unit: "mg/dose", round: 0 },
            { name: "Quinine IV (si artésunate indisponible)", detail: "Dose de charge sur 4h", perKg: 16.7, unit: "mg", round: 0 },
          ]},
          { title: "Surveillance et mesures de réanimation", items: [
            { text: "Hypoglycémie très fréquente (aggravée par la quinine) : contrôle glycémique toutes les 4 heures — glucose 30% 50 mL si < 2,2 mmol/L", grade: "1A" },
            { text: "Hémolyse différée possible entre J7 et J21 après artésunate intraveineux (environ 14% des patients) — contrôler la numération sanguine à J7, J14, J21", grade: "GPS" },
          ]},
        ],
        source: "OMS Guidelines Malaria 2023 · HAS Artésunate Amivas juillet 2024 · Dondorp NEJM 2010 (AQUAMAT)"
      },
      {
        name: "Fasciite Nécrosante et Dermohypodermite Bactérienne Nécrosante",
        urgence: "ABSOLUE",
        aliases: ["fasciite nécrosante", "dermohypodermite nécrosante", "gangrène de Fournier", "infection nécrosante tissu mou", "streptocoque groupe A nécrose"],
        sections: [
          { title: "Signes d'alarme — ne pas retarder la chirurgie", items: [
            { text: "Douleur disproportionnée à l'aspect cutané — plaques violacées ou nécrotiques — crépitation sous-cutanée (emphysème) — hypoesthésie cutanée locale — état septique grave", grade: "GPS" },
            { text: "Le scanner est utile pour guider le chirurgien mais NE DOIT PAS retarder la chirurgie si le tableau clinique est évident", grade: "GPS" },
          ]},
          { title: "Chirurgie en urgence absolue — traitement principal", items: [
            { text: "Débridement chirurgical large et extensif dans les 2 à 6 heures : seul traitement efficace — retour au bloc opératoire toutes les 12 à 24 heures jusqu'à marges saines", grade: "1A" },
            { text: "Oxygénothérapie hyperbare si disponible : complément de la chirurgie, jamais un substitut", grade: "2B" },
          ]},
          { title: "Antibiothérapie large spectre en urgence", items: [
            { text: "Association triple : Méropénème 3 g/jour IV + Clindamycine (Dalacine®) 2 700 mg/jour IV (inhibe la production de toxines streptococciques) + Gentamicine 3 mg/kg/jour IV", grade: "1B" },
            { text: "Immunoglobulines polyvalentes IV (Tegeline®) 2 g/kg en dose unique si choc toxique streptococcique confirmé", grade: "2B" },
          ]},
        ],
        source: "IDSA SSTI 2014 · SFAR Dermohypodermites nécrosantes 2023"
      },
      {
        name: "Endocardite Infectieuse Compliquée",
        urgence: "ABSOLUE",
        aliases: ["endocardite infectieuse", "végétation valvulaire", "insuffisance aortique aiguë endocardite", "bactériémie Staphylocoque", "endocardite prothèse valvulaire"],
        sections: [
          { title: "Critères d'admission en réanimation", items: [
            { text: "Insuffisance cardiaque sévère sur régurgitation valvulaire aiguë — Choc septique réfractaire — Complication neurologique (accident vasculaire cérébral embolique) — Trouble conductif grave (bloc auriculo-ventriculaire complet) — Abcès péri-valvulaire", grade: "GPS" },
          ]},
          { title: "Antibiothérapie probabiliste avant identification du germe", items: [
            { text: "Valve native (germe non identifié) : Amoxicilline 200 mg/kg/jour IV + Cloxacilline (Orbénine®) 200 mg/kg/jour IV + Gentamicine 3 mg/kg/jour IV", grade: "1B" },
            { text: "Prothèse valvulaire ou suspicion de Staphylocoque doré résistant à la méticilline : Vancomycine 30 mg/kg/jour IV (résiduelle cible 15 à 20 mg/L) + Rifampicine 1 200 mg/jour + Gentamicine 3 mg/kg/jour", grade: "1B" },
            { text: "2 à 3 paires d'hémocultures AVANT les antibiotiques — la stratégie est TOUJOURS guidée par les hémocultures et l'antibiogramme", grade: "1A" },
          ]},
          { title: "Chirurgie urgente — équipe pluridisciplinaire (Heart Team)", items: [
            { text: "Indications urgentes (dans les 24 à 72 heures) : insuffisance cardiaque avec instabilité hémodynamique, végétation > 10 mm avec embolie, abcès péri-valvulaire avec trouble conductif", grade: "1A" },
          ]},
        ],
        source: "ESC Endocarditis Guidelines 2023 · Habib EHJ 44:3948"
      },
      {
        name: "Pneumonie Aiguë Communautaire Grave et PAVM",
        urgence: "URGENT",
        aliases: ["pneumonie grave", "pneumonie communautaire sévère", "pneumopathie réanimation", "PAVM", "pneumonie acquise sous ventilation mécanique", "Legionella Pneumocoque grave"],
        sections: [
          { title: "Critères de gravité — admission en réanimation", items: [
            { text: "Critères de gravité (SPILF-SPLF-SRLF 2025, repris de l'approche ATS/IDSA) — Critères majeurs : ventilation mécanique nécessaire, choc septique avec vasopresseurs — Critères mineurs (≥ 3) : fréquence respiratoire ≥ 30/min, rapport PaO₂/FiO₂ ≤ 250, infiltrats multilobaires, confusion, urée > 7 mmol/L, leucocytes < 4 G/L, plaquettes < 100 G/L, température < 36°C, hypotension", grade: "GPS" },
          ]},
          { title: "Antibiothérapie probabiliste pneumonie communautaire grave", items: [
            { text: "Bêtalactamine : Amoxicilline-Acide clavulanique 3 g IV ou Céfotaxime 1 g × 3/jour IV — associée à un macrolide (azithromycine 500 mg/jour) pour couvrir les germes atypiques (Legionella, Mycoplasme)", grade: "1A" },
            { text: "Si facteurs de risque de Pseudomonas : Pipéracilline-Tazobactam 4 g × 4/jour IV + Ciprofloxacine 400 mg × 3/jour IV", grade: "1B" },
            { text: "Antigénurie légionelle et pneumocoque en urgence — procalcitonine pour guider la durée du traitement", grade: "GPS" },
          ]},
          { title: "Pneumonie acquise sous ventilation mécanique (PAVM)", items: [
            { text: "Antibiothérapie probabiliste large spectre : Pipéracilline-Tazobactam 4 g × 4/jour IV + Amikacine 30 mg/kg/jour IV + Vancomycine si colonisation à Staphylocoque doré résistant à la méticilline connue", grade: "1B" },
            { text: "Désescalade dès la 48ème à 72ème heure selon les cultures du liquide broncho-alvéolaire ou de l'aspiration trachéale", grade: "1A" },
            { text: "Durée totale 8 jours sauf Pseudomonas ou Staphylocoque doré (14 jours) — guidage par la procalcitonine", grade: "1B" },
          ]},
        ],
        source: "SPILF-SPLF-SRLF-SFM-SFR-SFMU Pneumonies Communautaires 2025 · SRLF/SFAR PAVM 2017 · Dinh MMI 2025"
      },
      {
        name: "Candidémie et Candidose Invasive",
        urgence: "URGENT",
        aliases: ["candidémie", "candidose invasive", "Candida sepsis", "levure hémoculture réanimation", "antifongique réanimation"],
        sections: [
          { title: "Facteurs de risque et diagnostic", items: [
            { text: "Facteurs de risque principaux : nutrition parentérale > 7 jours, antibiothérapie large spectre prolongée, chirurgie abdominale majeure, dialyse, immunodépression profonde, cathéter central", grade: "GPS" },
            { text: "Hémocultures × 2 flacons — fond d'œil urgence si candidémie confirmée (endophtalmie dans 15% des cas) — bêta-D-glucane sérique si disponible", grade: "1A" },
          ]},
          { title: "Traitement antifongique", items: [
            { text: "Échinocandine en première intention : caspofungine 70 mg dose de charge puis 50 mg/jour IV, ou anidulafungine 200 mg J1 puis 100 mg/jour — supérieure au fluconazole en mortalité", grade: "1A" },
            { text: "Fluconazole 800 mg dose de charge puis 400 mg/jour IV : acceptable si Candida albicans documenté et patient stable — résistance naturelle de Candida krusei et glabrata", grade: "1B" },
            { text: "Durée minimale : 14 jours après la dernière hémoculture négative et disparition des signes cliniques", grade: "1A" },
          ]},
          { title: "Mesures associées", items: [
            { text: "Ablation de tous les cathéters centraux en place dès confirmation de la candidémie — poser un nouveau cathéter sur un site différent après 24 heures de traitement", grade: "1A" },
            { text: "Échocardiographie à la recherche d'une endocardite fongique si candidémie persistante > 72 heures sous traitement", grade: "1B" },
          ]},
        ],
        source: "ESCMID Candida Guidelines 2020 · IDSA Candidiasis Guidelines 2016"
      },
      {
        name: "Aspergillose Invasive Pulmonaire",
        urgence: "URGENT",
        aliases: ["aspergillose invasive", "aspergillus fumigatus", "infection fongique invasive", "IFI immunodéprimé", "galactomannane positif"],
        sections: [
          { title: "Population à risque et diagnostic", items: [
            { text: "À risque : neutropénie prolongée > 10 jours, greffe de cellules souches hématopoïétiques, corticothérapie > 0,3 mg/kg/jour > 3 semaines, traitement immunosuppresseur, BPCO sévère", grade: "GPS" },
            { text: "Scanner thoracique : signe du halo, caverne aspergillaire, nodules multiples — galactomannane sérique seuil > 0,5 en 2 prélèvements consécutifs — galactomannane lavage broncho-alvéolaire > 1", grade: "1A" },
          ]},
          { title: "Traitement antifongique — voriconazole en première ligne", items: [
            { text: "Voriconazole (Vfend®) : 6 mg/kg IV × 2 en dose de charge J1, puis 4 mg/kg × 2/jour — adapter selon dosage plasmatique (cible taux résiduel 1 à 5,5 mg/L)", grade: "1A" },
            { text: "Isavuconazole (Cresemba®) 200 mg × 3/jour J1–J2, puis 200 mg/jour : alternative — meilleur profil de tolérance hépatique et oculaire — non inférieur au voriconazole", grade: "1A" },
            { text: "Liposomal Amphotéricine B (AmBisome®) 3 mg/kg/jour IV : traitement de secours si résistance ou intolérance aux triazolés", grade: "1B" },
            { text: "Durée minimale 6 à 12 semaines — jusqu'à résolution scanographique et récupération immunitaire", grade: "GPS" },
          ]},
        ],
        source: "ESCMID Aspergillosis Guidelines 2018 · Patterson Clin Infect Dis 2016"
      },
      {
        name: "Choc Toxique Staphylococcique ou Streptococcique",
        urgence: "ABSOLUE",
        aliases: ["choc toxique staphylocoque", "TSS", "toxine TSST-1", "choc toxique streptocoque", "érythrodermie diffuse fièvre choc"],
        sections: [
          { title: "Diagnostic et porte d'entrée", items: [
            { text: "Triade : fièvre ≥ 38,9°C + hypotension (pression artérielle systolique < 90 mmHg) + érythrodermie diffuse scarlatiniforme — atteinte d'au moins 3 systèmes d'organes", grade: "GPS" },
            { text: "Rechercher la porte d'entrée IMMÉDIATEMENT : tampon vaginal, plaie chirurgicale, corps étranger, infection cutanée, sinusite — ablation immédiate si identifié", grade: "1A" },
          ]},
          { title: "Antibiothérapie", items: [
            { text: "Clindamycine (Dalacine®) 900 mg en injection intraveineuse toutes les 8 heures : INHIBE la synthèse des toxines staphylococciques et streptococciques — à associer impérativement", grade: "1B" },
            { text: "Oxacilline (Bristopen®) 2 g IV toutes les 4 heures si Staphylocoque sensible à la méticilline (SAMS) — ou Vancomycine si SARM suspecté", grade: "1A" },
            { text: "Immunoglobulines polyvalentes IV 2 g/kg en dose unique si choc toxique réfractaire (neutralisent les super-antigènes)", grade: "2B" },
          ]},
        ],
        source: "IDSA SSTI 2014 (réf.) · Burnham Intensive Care Med 2015 (choc toxique réa)"
      },
      {
        name: "Infection sur Cathéter Veineux Central (BABS)",
        urgence: "URGENT",
        aliases: ["BABS", "bactériémie cathéter", "infection CVC", "sepsis sur cathéter", "bactériémie associée aux soins"],
        sections: [
          { title: "Diagnostic", items: [
            { text: "Suspicion clinique : fièvre ou frissons sans autre foyer chez un patient porteur d'un cathéter central — hémocultures périphériques + sur cathéter simultanément", grade: "1A" },
            { text: "Critères diagnostiques : différentiel de temps de positivité ≥ 2 heures (hémoculture sur cathéter positive avant la périphérique) OU hémocultures positives sans autre foyer identifié", grade: "GPS" },
          ]},
          { title: "Traitement", items: [
            { text: "Ablation quasi-systématique du cathéter incriminé : poser un nouveau cathéter sur un site différent après 24 heures de traitement efficace", grade: "1A" },
            { text: "Vancomycine 30 mg/kg/jour IV (taux résiduel cible 15 à 20 mg/L) : couvre les Staphylocoques dont le SARM — traitement probabiliste de référence", grade: "1A" },
            { text: "Durée : 14 jours minimum si Staphylococcus aureus — 7 à 10 jours si Staphylocoque à coagulase négative — échocardiographie si S. aureus bactériémie", grade: "1A" },
          ]},
        ],
        source: "IDSA CRBSI Guidelines 2009 update 2021 · Mermel Clin Infect Dis 2009"
      },
      {
        name: "Angine de Ludwig et Cellulite Cervicale Profonde",
        urgence: "ABSOLUE",
        aliases: ["angine de Ludwig", "cellulite cervicale profonde", "phlegmon plancher buccal", "abcès rétropharyngé", "infection profonde cou"],
        sections: [
          {title: "Diagnostic — risque d'obstruction des voies aériennes", items: [
            {text: "Angine de Ludwig : infiltration bilatérale du plancher buccal (espace sous-mandibulaire) avec trismus, dysphagie, protrusion de la langue — origine dentaire (2ème ou 3ème molaire inférieure) dans 80% — odeur fétide anaérobie", grade: "GPS"},
            {text: "Scanner cervico-thoracique injecté urgent : délimite l'extension, détecte une médiastinite descendante (complication redoutable, mortalité 30 à 50%)", grade: "1A"},
          ]},
          {title: "Sécurisation des voies aériennes — priorité absolue", items: [
            {text: "NE PAS allonger le patient avant sécurisation des voies aériennes — ne jamais tenter une laryngoscopie directe brutale sur trismus sévère", grade: "1A"},
            {text: "Intubation nasotrachéale sous fibroscopie patient vigile en milieu sécurisé (bloc + ORL + chirurgien) — trachéotomie sous anesthésie locale de secours", grade: "1A"},
          ]},
          {title: "Antibiothérapie et chirurgie", items: [
            {text: "Amoxicilline-Acide clavulanique 3 g IV toutes les 8 heures + Métronidazole 500 mg IV toutes les 8 heures : couverture aéro-anaérobie — ou Pipéracilline-Tazobactam si suspicion de résistance", grade: "1A"},
            {text: "Drainage chirurgical d'urgence par voie externe : traitement définitif — NE PAS attendre la fluctuation (les espaces cervicaux profonds ne fluctuent que très tardivement)", grade: "1A"},
          ]},
        ],
        source: "ESCMID Deep Neck Infections 2019 · Furst ORL 2016"
      },
      {
        name: "Leptospirose Sévère — Syndrome de Weil",
        urgence: "URGENT",
        aliases: ["leptospirose sévère", "syndrome de Weil", "ictère fébrile hémorragique tropical", "contact eau douce rats leptospirose"],
        sections: [
          {title: "Diagnostic", items: [
            {text: "Syndrome de Weil : ictère + insuffisance rénale aiguë + manifestations hémorragiques (pulmonaires, digestives, musculaires) — contexte : contact eau douce, rongeurs, animaux domestiques, profession à risque", grade: "GPS"},
            {text: "PCR urine et sang en phase aiguë J1–J10 (résultat 24 heures) — Sérologie MAT ou ELISA IgM positive dès J7 — Urinaire : leucocyturie, hématurie, cylindres", grade: "1A"},
          ]},
          {title: "Traitement", items: [
            {text: "Pénicilline G 4 millions d'unités IV toutes les 6 heures pendant 7 jours : traitement de référence des formes sévères", grade: "1A"},
            {text: "Ceftriaxone 1 g IV par jour : alternative équivalente (plus pratique)", grade: "1A"},
            {text: "Dialyse précoce si insuffisance rénale oligo-anurique : récupération habituelle en 3 à 4 semaines si traitement adapté — hémorragie pulmonaire (SDRA-like) : mortalité > 50%, ventilation protectrice", grade: "1A"},
          ]},
        ],
        source: "WHO Leptospirosis · Haake Curr Top Microbiol Immunol 2015 (revue) · SPILF"
      },
      {
        name: "COVID-19 Grave en Réanimation",
        urgence: "URGENT",
        aliases: ["COVID-19 grave", "SARS-CoV-2 réanimation", "COVID pneumonie sévère", "hypoxémie COVID variants 2024"],
        sections: [
          {title: "Critères d'admission et support ventilatoire", items: [
            {text: "Oxygénothérapie à haut débit nasal (HFNO) en première intention : réduit le taux d'intubation de 40% par rapport au masque à haute concentration (essai HENIVOT) — intubation si HFNO inefficace à 40 L/minute", grade: "1A"},
            {text: "Ventilation non invasive en position ventrale : peut être tentée avant l'intubation dans les formes hypoxémiques modérées", grade: "2B"},
          ]},
          {title: "Traitements validés — recommandations OMS/HAS 2024", items: [
            {text: "Dexaméthasone 6 mg/jour IV ou PO pendant 10 jours chez TOUT patient nécessitant une supplémentation en oxygène ou ventilé : réduction de la mortalité de 28% (essai RECOVERY 2020 — 7 395 patients)", grade: "1A"},
            {text: "Baricitinib (Olumiant®) 4 mg/jour PO pendant 14 jours en association à la dexaméthasone si sous oxygène ou ventilation : anti-JAK, réduction supplémentaire de la mortalité (essai COV-BARRIER 2021)", grade: "1A"},
            {text: "Tocilizumab (RoActemra®) 8 mg/kg IV en dose unique si CRP > 75 mg/L + sous oxygène ou ventilation : anti-IL-6 (essai RECOVERY) — associer à la dexaméthasone", grade: "1A"},
          ]},
          {title: "Anticoagulation et thrombose", items: [
            {text: "Anticoagulation préventive renforcée (HBPM dose intermédiaire) chez TOUT patient en réanimation : risque thromboembolique multiplié par 5 — anticoagulation curative si thrombose documentée", grade: "1B"},
            {text: "Décubitus ventral ≥ 16 heures/jour si rapport PaO₂/FiO₂ < 150 : bénéfice identique au SDRA non-COVID (essai PROSEVA)", grade: "1A"},
          ]},
        ],
        source: "RECOVERY Trial NEJM 2021 · COV-BARRIER Lancet 2021 · WHO COVID-19 Treatment Guidelines 2024"
      },
      {
        name: "Tuberculose Miliaire Grave",
        urgence: "URGENT",
        aliases: ["tuberculose miliaire", "tuberculose disséminée", "BK miliaire", "tuberculose grave réanimation", "pneumopathie interstitielle BK"],
        sections: [
          {title: "Diagnostic", items: [
            {text: "Image en grain de mil sur la radiographie thoracique — scanner thoracique plus sensible — fièvre prolongée + altération de l'état général + lymphopénie — méningite tuberculeuse associée dans 20 à 30% des cas", grade: "GPS"},
            {text: "Examen cytobactériologique des crachats × 3, aspiration bronchique, lavage broncho-alvéolaire avec PCR GeneXpert — myélogramme et biopsie ostéomédullaire si négativité des prélèvements", grade: "1A"},
            {text: "IDR à la tuberculine souvent négative dans les formes disséminées (anergie) — ne pas éliminer la tuberculose sur une IDR négative", grade: "GPS"},
          ]},
          {title: "Traitement antituberculeux", items: [
            {text: "Quadrithérapie standard 2 mois : Isoniazide + Rifampicine + Pyrazinamide + Éthambutol (2HRZE) — puis bithérapie 4 mois : Isoniazide + Rifampicine (4HR) — durée totale 6 mois (9 à 12 mois si atteinte méningée)", grade: "1A"},
            {text: "Corticoïdes adjuvants si méningite tuberculeuse : dexaméthasone 0,3 mg/kg/jour décroissance progressive sur 6 à 8 semaines — réduit la mortalité et les séquelles neurologiques", grade: "1A"},
            {text: "Isolement aérien strict — déclaration obligatoire à l'ARS — enquête autour du cas index", grade: "1A"},
          ]},
        ],
        source: "HAS Tuberculose 2022 · WHO TB Guidelines 2022 · Thwaites NEJM 2004"
      },
      {
        name: "Pneumocystose Pulmonaire (PCP) chez l'Immunodéprimé",
        urgence: "URGENT",
        aliases: ["pneumocystose", "PCP", "Pneumocystis jirovecii", "pneumonie immunodéprimé", "VIH pneumonie hypoxémiante"],
        sections: [
          { title: "Diagnostic", items: [
            { text: "Terrain : VIH avec CD4 < 200/mm³, corticothérapie prolongée, immunosuppresseurs, greffe d'organe, hémopathie — toux sèche + dyspnée d'aggravation progressive + fièvre + hypoxémie souvent sévère", grade: "GPS" },
            { text: "Scanner thoracique : infiltrat interstitiel bilatéral en verre dépoli à prédominance péri-hilaire — LDH souvent élevées (non spécifique)", grade: "GPS" },
            { text: "Diagnostic de certitude : PCR Pneumocystis jirovecii et/ou immunofluorescence sur lavage broncho-alvéolaire (ou expectoration induite) — bêta-D-glucane sérique élevé (bonne valeur prédictive négative)", grade: "1A" },
          ]},
          { title: "Traitement de première intention", items: [
            { text: "Triméthoprime-Sulfaméthoxazole (cotrimoxazole) 15–20 mg/kg/jour de triméthoprime IV en 3–4 prises pendant 21 jours : traitement de référence", grade: "1A" },
            { text: "Corticothérapie adjuvante si hypoxémie (PaO₂ < 70 mmHg en air ambiant ou gradient alvéolo-artériel > 35 mmHg) : prednisone 40 mg × 2/jour puis décroissance sur 21 jours — réduit la mortalité dans les formes hypoxémiantes", grade: "1A" },
          ]},
          { title: "Alternatives si intolérance au cotrimoxazole", items: [
            { text: "Atovaquone 750 mg × 2/jour PO (formes modérées) — ou Pentamidine 4 mg/kg/jour IV (formes sévères, toxicité rénale et pancréatique) — ou Primaquine + Clindamycine", grade: "1B" },
            { text: "Prophylaxie secondaire après guérison : cotrimoxazole 1 comprimé/jour jusqu'à restauration immunitaire (CD4 > 200 pendant 3 mois)", grade: "1A" },
          ]},
        ],
        source: "ECIL-9 2023 · HAS Prise en charge VIH 2024 · Thomas NEJM 2004"
      },
      {
        name: "Toxoplasmose Cérébrale chez l'Immunodéprimé",
        urgence: "URGENT",
        aliases: ["toxoplasmose cérébrale", "abcès cérébral toxoplasme", "VIH abcès cérébral", "immunodéprimé lésion cérébrale"],
        sections: [
          { title: "Diagnostic", items: [
            { text: "Terrain : VIH avec CD4 < 100/mm³, immunosuppression sévère — céphalées + fièvre + déficit neurologique focal + crises convulsives ± troubles de conscience", grade: "GPS" },
            { text: "IRM cérébrale : lésions multiples en cocarde (prise de contraste annulaire) avec œdème péri-lésionnel, à prédilection des noyaux gris centraux et de la jonction cortico-sous-corticale", grade: "1A" },
            { text: "Sérologie toxoplasmose (IgG positive en faveur, une sérologie négative rend le diagnostic peu probable) — PCR toxoplasme sur LCR si ponction lombaire possible", grade: "GPS" },
          ]},
          { title: "Traitement d'attaque (6 semaines)", items: [
            { text: "Pyriméthamine 200 mg dose de charge puis 50–75 mg/jour PO + Sulfadiazine 4–6 g/jour PO en 4 prises + Acide folinique 25 mg/jour (prévention de la toxicité hématologique)", grade: "1A" },
            { text: "Alternative si intolérance sulfamides : Pyriméthamine + Clindamycine 600 mg × 4/jour", grade: "1B" },
            { text: "Test thérapeutique : amélioration clinique et radiologique attendue en 10–14 jours — si absence de réponse, reconsidérer le diagnostic (lymphome cérébral)", grade: "GPS" },
          ]},
          { title: "Mesures associées", items: [
            { text: "Corticothérapie (dexaméthasone) uniquement si effet de masse ou œdème menaçant — à éviter sinon (gêne l'interprétation de la réponse au traitement)", grade: "2B" },
            { text: "Traitement antiépileptique si crises — Introduction ou optimisation du traitement antirétroviral (restauration immunitaire) après 2 semaines", grade: "1B" },
            { text: "Prophylaxie secondaire : pyriméthamine-sulfadiazine à demi-dose jusqu'à CD4 > 200/mm³ pendant 6 mois", grade: "1A" },
          ]},
        ],
        source: "HAS Prise en charge VIH 2024 · EACS Guidelines 2023 · Dunay Clin Microbiol Rev 2018"
      },
      {
        name: "Grippe Grave et Infections Virales Respiratoires en Réanimation",
        urgence: "URGENT",
        aliases: ["grippe grave", "grippe maligne", "influenza réanimation", "SDRA grippal", "virose respiratoire grave", "oseltamivir"],
        sections: [
          { title: "Présentation et diagnostic", items: [
            { text: "Grippe grave : pneumonie virale primaire hypoxémiante (SDRA possible) ou surinfection bactérienne secondaire — terrains à risque : âge, obésité, grossesse, immunodépression, comorbidités cardiorespiratoires", grade: "GPS" },
            { text: "Diagnostic : PCR multiplex respiratoire (grippe A/B, VRS, SARS-CoV-2, métapneumovirus) sur prélèvement naso-pharyngé ou aspiration trachéale", grade: "1A" },
          ]},
          { title: "Traitement", items: [
            { text: "Oseltamivir (Tamiflu®) 75 mg × 2/jour PO ou SNG pendant 5 jours (doublé et prolongé dans les formes graves) : à débuter le plus PRÉCOCEMENT possible, sans attendre la PCR si forte suspicion", grade: "1A" },
            { text: "Antibiothérapie associée si suspicion de surinfection bactérienne (couvrir pneumocoque ET Staphylocoque doré, y compris SARM si grippe + pneumonie nécrosante)", grade: "1B" },
            { text: "Les corticoïdes ne sont PAS recommandés en routine dans la grippe grave (sauf autre indication : SDRA, choc) — risque de surinfection et de réplication virale prolongée", grade: "2B" },
          ]},
          { title: "Support et prévention", items: [
            { text: "Support ventilatoire selon la sévérité (OHDN, ventilation protectrice, décubitus ventral, ECMO VV si SDRA réfractaire) — isolement gouttelettes", grade: "1A" },
            { text: "Vaccination antigrippale annuelle des sujets à risque et des soignants : principale mesure de prévention", grade: "1A" },
          ]},
        ],
        source: "SPILF/SRLF Grippe grave 2024 · Uyeki Clin Infect Dis 2019 · HCSP"
      },
    ]
  },
  {
    id: "gastro", label: "Gastro-hépatologie Réa", short: "GASTRO", iconName: "stomach", color: "#B45309", bgColor: "#FFFBEB",
    protos: [
      {
        name: "Hémorragie Digestive Haute — Prise en Charge Endoscopique",
        urgence: "ABSOLUE",
        aliases: ["hémorragie digestive haute", "hématémèse", "méléna", "ulcère hémorragique", "varices oesophagiennes rompues", "rectorragie haute"],
        sections: [
          { title: "Stabilisation et évaluation de gravité", items: [
            { text: "Deux voies veineuses périphériques de gros calibre — remplissage vasculaire pour maintenir la pression artérielle — oxymétrie et monitorage cardiaque continus", grade: "1A" },
            { text: "Transfusion de culots globulaires si hémoglobine < 7 g/dL (< 9 g/dL si coronaropathie) — la transfusion libérale jusqu'à 10 g/dL augmente la mortalité (essai Villanueva, NEJM 2013)", grade: "1A" },
          ]},
          { title: "Inhibiteurs de la pompe à protons et préparation à l'endoscopie", items: [
            { text: "Ésoméprazole ou Oméprazole : bolus de 80 mg en injection intraveineuse directe, puis 8 mg/heure par seringue électrique pendant 72 heures — réduit le risque de récidive", grade: "1A" },
            { text: "Érythromycine 250 mg en injection intraveineuse 30 à 60 minutes avant l'endoscopie : améliore la visibilité gastrique (vidange de l'estomac)", grade: "1B" },
          ]},
          { title: "Fibroscopie œso-gastro-duodénale — délais impératifs", items: [
            { text: "Fibroscopie dans les 24 heures pour toute hémorragie digestive haute — dans les 12 heures maximum si instabilité hémodynamique, hématémèse active ou méléna abondant", grade: "1A" },
            { text: "Intubation orotrachéale AVANT l'endoscopie si : hémorragie active présumée, conscience altérée, hématémèse en jet — prévient l'inhalation", grade: "GPS" },
          ]},
          { title: "Varices œsophagiennes ou gastriques rompues — traitement spécifique", items: [
            { text: "Terlipressine (Glypressine®) 2 mg en injection intraveineuse directe toutes les 4 à 6 heures : à démarrer dès la suspicion de rupture de varices, AVANT l'endoscopie", grade: "1A" },
            { text: "Ligature élastique endoscopique des varices : traitement de référence — la sclérothérapie est une alternative", grade: "1A" },
            { text: "Antibiothérapie prophylactique systématique chez le cirrhotique : ceftriaxone 1 g/jour pendant 5 à 7 jours — réduit les infections bactériennes et la mortalité", grade: "1A" },
            { text: "Échec endoscopique : sonde de tamponnement de Sengstaken-Blakemore ou endoprothèse métallique (pont) en attente du TIPS (shunt porto-systémique intrahépatique) en urgence", grade: "1B" },
          ]},
        ],
        source: "SFED 2023 · Baveno VII 2022 · Villanueva NEJM 2013;368:11"
      },
      {
        name: "Pancréatite Aiguë Grave",
        urgence: "ABSOLUE",
        aliases: ["pancréatite aiguë grave", "pancréatite nécrosante", "nécrose pancréatique", "douleur épigastrique lipase élevée", "score Ranson", "Balthazar E"],
        sections: [
          { title: "Évaluation de la gravité", items: [
            { text: "Score de Ranson ≥ 3 ou score de Balthazar E (nécrose étendue) = forme grave — Score de défaillance d'organes SOFA pour les formes compliquées", grade: "GPS" },
            { text: "Scanner abdominal injecté (angio-TDM) : indication si doute diagnostique ou suspicion de complications — à réaliser idéalement entre 48 et 72 heures (pas en urgence immédiate)", grade: "1A" },
          ]},
          { title: "Réanimation initiale", items: [
            { text: "Remplissage vasculaire avec Ringer Lactate préféré au sérum physiologique (moins d'acidose hyperchlorémique) — 250 à 500 mL/heure les premières heures selon la tolérance", grade: "1B" },
            { text: "Analgésie : morphine ou paracétamol intraveineux — la morphine N'AGGRAVE PAS la pancréatite (mythe réfuté par les données actuelles)", grade: "GPS" },
            { text: "Aucun antibiotique prophylactique systématique : les méta-analyses sont négatives, les antibiotiques ne préviennent pas la surinfection de nécrose", grade: "1A" },
          ]},
          { title: "Nutrition entérale précoce — recommandation forte", items: [
            { text: "Alimentation entérale par sonde naso-jéjunale dès la 24ème heure si possible : supérieure à la nutrition parentérale — réduit les complications infectieuses, la durée de séjour et la mortalité", grade: "1A" },
          ]},
          { title: "Complications nécessitant une intervention", items: [
            { text: "Surinfection de nécrose confirmée par ponction guidée sous scanner : drainage endoscopique transgastrique ou percutané — chirurgie (nécrosectomie) en dernier recours", grade: "1B" },
            { text: "Angiocholite sur lithiase de la voie biliaire : sphinctérotomie endoscopique et extraction des calculs dans les 24 heures si forme sévère", grade: "1A" },
          ]},
        ],
        source: "IAP/APA Pancreatitis Guidelines 2013 · Leppäniemi WSES 2019 · Tenner ACG 2013"
      },
      {
        name: "Décompensation Aiguë de Cirrhose Hépatique",
        urgence: "URGENT",
        aliases: ["cirrhose décompensée", "insuffisance hépatocellulaire aiguë", "encéphalopathie hépatique", "ascite tendue cirrhotique", "péritonite bactérienne spontanée", "syndrome hépato-rénal"],
        sections: [
          { title: "Évaluation initiale", items: [
            { text: "Score MELD (calcul : 3,78 × ln[bilirubine mg/dL] + 11,2 × ln[INR] + 9,57 × ln[créatinine mg/dL] + 6,43) — MELD ≥ 15 : discussion de transplantation hépatique", grade: "GPS" },
            { text: "Recherche systématique d'un facteur déclenchant : infection bactérienne, hémorragie digestive, arrêt de l'alcool, médicament hépatotoxique, thrombose portale", grade: "1A" },
          ]},
          { title: "Encéphalopathie hépatique", items: [
            { text: "Lactulose 25 à 50 mL × 2 à 3 fois par jour (oral ou sonde nasogastrique) — objectif 2 à 3 selles molles par jour — réduit l'absorption intestinale d'ammoniac", grade: "1A" },
            { text: "Rifaximine (Xifaxan®) 550 mg × 2 par jour : antibiotique non absorbable réduisant la production intestinale d'ammoniac — en association au lactulose", grade: "1B" },
            { text: "Intubation si score de Glasgow < 10 ou risque d'inhalation documenté", grade: "GPS" },
          ]},
          { title: "Péritonite Bactérienne Spontanée", items: [
            { text: "Diagnostic : polynucléaires neutrophiles dans l'ascite ≥ 250/mm³ — ponction d'ascite systématique à l'admission de tout cirrhotique", grade: "1A" },
            { text: "Céfotaxime (Claforan®) 4 g/jour en injection intraveineuse pendant 5 jours", grade: "1A" },
            { text: "Albumine 1,5 g/kg à J1 puis 1 g/kg à J3 : réduit l'incidence du syndrome hépato-rénal — mortalité à 3 mois divisée par 3 (essai Sort, NEJM 1999)", grade: "1A" },
          ]},
          { title: "Syndrome Hépato-Rénal", items: [
            { text: "Terlipressine (Glypressine®) 1 mg toutes les 4 à 6 heures en injection intraveineuse + albumine 20 à 40 g/jour — expansion volémique préalable pour exclure une hypovolémie", grade: "1A" },
            { text: "La transplantation hépatique reste le seul traitement définitif — orienter vers une équipe de transplantation en urgence si éligible", grade: "1A" },
          ]},
        ],
        source: "EASL Clinical Practice Guidelines Cirrhosis 2018 · Sort NEJM 1999;341:403"
      },
      {
        name: "Ischémie Mésentérique Aiguë",
        urgence: "ABSOLUE",
        aliases: ["ischémie mésentérique", "infarctus mésentérique", "occlusion artère mésentérique supérieure", "douleur abdominale vasculaire", "nécrose intestinale"],
        sections: [
          { title: "Diagnostic — douleur disproportionnée à l'examen", items: [
            { text: "Douleur abdominale brutale, intense, périombilicale, DISPROPORTIONNÉE par rapport à l'examen clinique initialement peu parlant — terrain : fibrillation auriculaire, athérosclérose, bas débit cardiaque, chirurgie aortique récente", grade: "GPS" },
            { text: "Angio-scanner abdominal en urgence : examen de référence — visualise l'occlusion artérielle ou veineuse mésentérique, l'étendue de la nécrose, le pneumatose intestinale (mauvais pronostic)", grade: "1A" },
            { text: "Lactates artériels élevés (> 2 mmol/L) et D-dimères augmentés : suggestifs mais non spécifiques — ne pas attendre leur résultat pour l'imagerie", grade: "2B" },
          ]},
          { title: "Traitement en urgence absolue", items: [
            { text: "Chirurgie urgente (embolectomie/thrombectomie chirurgicale + résection intestin nécrotique) ou angioplastie endovasculaire selon le centre et le type de lésion", grade: "1A" },
            { text: "Anticoagulation par héparine non fractionnée dès la confirmation diagnostique : prévient l'extension de la thrombose mésentérique", grade: "1A" },
            { text: "Réanimation hémodynamique : remplissage, vasopresseurs (noradrénaline à doses minimales — éviter les vasoconstricteurs mésentériques)", grade: "GPS" },
          ]},
        ],
        source: "WSES Acute Mesenteric Ischaemia 2022 · ESVS Mesenteric 2017"
      },
      {
        name: "Colite Grave — Clostridioides difficile et Poussée Sévère de MICI",
        urgence: "URGENT",
        aliases: ["Clostridioides difficile", "colite pseudomembraneuse", "diarrhée antibiotique grave", "MICI colite grave", "RCH poussée sévère", "mégacôlon toxique"],
        sections: [
          { title: "Colite à Clostridioides difficile — critères de gravité", items: [
            { text: "Forme grave : leucocytes > 15 G/L, créatinine > 130 µmol/L, albumine < 25 g/L, âge > 65 ans — Forme fulminante : choc septique + mégacôlon + iléus — risque de décès > 50%", grade: "GPS" },
          ]},
          { title: "Traitement", items: [
            { text: "Vancomycine orale 125 mg × 4/jour × 10 à 14 jours : traitement de première ligne des formes graves (supérieure au métronidazole)", grade: "1A" },
            { text: "Fidaxomicine 200 mg × 2/jour × 10 jours : alternative — réduit le risque de récidive de 40% — à privilégier si facteurs de risque de récidive", grade: "1A" },
            { text: "Forme fulminante : vancomycine 500 mg × 4/jour par sonde naso-gastrique + métronidazole 500 mg IV × 3/jour + lavement de vancomycine si iléus — colectomie si non-amélioration à 24–48 heures", grade: "1B" },
            { text: "Méta-analyse 2023 : bezlotoxumab (Zinplava®) 10 mg/kg IV en dose unique lors du traitement antibiotique — réduit le taux de récidive chez les patients à haut risque", grade: "1B" },
          ]},
          { title: "MICI — poussée sévère (score de Truelove et Witts)", items: [
            { text: "Poussée sévère (≥ 6 selles/jour avec sang + au moins 1 critère systémique) : hospitalisation + méthylprednisolone 60 mg/jour IV", grade: "1A" },
            { text: "Sauvetage si échec corticoïdes à J3–J5 : ciclosporine 2 mg/kg/jour IV ou infliximab 5 mg/kg IV — colectomie si échec à J5–J7", grade: "1A" },
            { text: "Mégacôlon toxique (dilatation côlon > 6 cm + signes systémiques) : chirurgie urgente — NE PAS retarder au-delà de 24 à 48 heures", grade: "1A" },
          ]},
        ],
        source: "ESCP/ECCO Clostridioides difficile 2021 · ECCO MICI Guidelines 2022"
      },
      {
        name: "Hépatite Fulminante — Insuffisance Hépatique Aiguë Sévère",
        urgence: "ABSOLUE",
        aliases: ["hépatite fulminante", "insuffisance hépatique aiguë", "IHAS", "encéphalopathie hépatique aiguë", "TP effondré ictère"],
        sections: [
          {title: "Définition et causes", items: [
            {text: "Insuffisance hépatique aiguë sévère : ictère < 26 semaines + encéphalopathie hépatique + temps de prothrombine < 50% — sans hépatopathie chronique préalable — causes en France : paracétamol (30%), hépatites virales (A, B, E), médicaments", grade: "GPS"},
            {text: "Contacter IMMÉDIATEMENT un centre de transplantation hépatique dès le diagnostic — ne pas attendre la dégradation neurologique", grade: "1A"},
          ]},
          {title: "Traitement et prise en charge en réanimation spécialisée", items: [
            {text: "N-Acétylcystéine IV : démarrer TOUJOURS y compris si cause non-paracétamolique — hépatoprotecteur démontré dans les causes non médicamenteuses (essai Lee NEJM 2009)", grade: "1A"},
            {text: "Surveillance neurologique : hypertension intracrânienne (fréquente, gravissime) — mannitol + normocapnie + position 30° + normothermie", grade: "1A"},
            {text: "Prévention des complications : hypoglycémie (monitoring 2 heures), coagulopathie (vitamine K IV — NE PAS transfuser en l'absence de saignement), insuffisance rénale (dialyse précoce)", grade: "1A"},
          ]},
          {title: "Critères de transplantation hépatique en urgence — King's College", items: [
            {text: "Intoxication paracétamol : pH < 7,30 après réanimation — OU les 3 critères : INR > 6,5 + créatinine > 300 µmol/L + encéphalopathie III/IV", grade: "1B"},
            {text: "Cause non-paracétamolique : INR > 6,5 OU ≥ 3 critères (âge < 10 ou > 40 ans, bilirubine > 300 µmol/L, INR > 3,5, cause non-A non-B ou médicamenteuse, délai ictère-encéphalopathie > 7 jours)", grade: "1B"},
          ]},
        ],
        source: "EASL Acute Liver Failure 2017 · AASLD ALF 2023 · Lee NEJM 2009"
      },
      {
        name: "Cholangite Aiguë Grave — Angiocholite — Score de Tokyo",
        urgence: "URGENT",
        aliases: ["cholangite aiguë", "angiocholite grave", "score Tokyo cholangite", "triade de Charcot", "calcul cholédoque infecté ictère"],
        sections: [
          {title: "Diagnostic — triade de Charcot et score de Tokyo 2018", items: [
            {text: "Triade de Charcot : fièvre + ictère + douleur de l'hypochondre droit — présente dans seulement 50 à 75% des angiocholites — forme grave si choc ou défaillance d'organe (score de Tokyo Grade III)", grade: "GPS"},
            {text: "Score de Tokyo Grade III (sévère) : choc septique, altération de la conscience, dysfonction rénale ou hépatique — indique un drainage biliaire EN URGENCE (< 12 heures)", grade: "GPS"},
          ]},
          {title: "Antibiothérapie", items: [
            {text: "Pipéracilline-Tazobactam 4 g IV toutes les 8 heures : traitement probabiliste de référence — couvre les entérobactéries (E.coli, Klebsiella) et entérocoques", grade: "1A"},
            {text: "Méropénème si portage BLSE connu ou antécédent d'infection à bactérie multirésistante", grade: "1B"},
          ]},
          {title: "Drainage biliaire endoscopique — traitement étiologique", items: [
            {text: "Cholangiopancréatographie rétrograde endoscopique (CPRE) avec sphinctérotomie et extraction des calculs : traitement de référence — dans les 24 heures pour les grades II et dans les 12 heures pour le grade III", grade: "1A"},
            {text: "Drainage biliaire percutané ou par CPRE avec prothèse plastique si calcul non extractible en urgence — pont vers une extraction ultérieure", grade: "1A"},
          ]},
        ],
        source: "Tokyo Guidelines 2018 · Kiriyama JHBPsurg 2018"
      },
      {
        name: "Hépatite Alcoolique Aiguë Sévère",
        urgence: "URGENT",
        aliases: ["hépatite alcoolique", "hépatite alcoolique sévère", "score de Maddrey", "ictère alcoolique", "insuffisance hépatique alcoolique"],
        sections: [
          { title: "Diagnostic et évaluation de la sévérité", items: [
            { text: "Tableau : ictère récent (< 3 mois) + consommation d'alcool active + hépatomégalie douloureuse ± fièvre ± décompensation (ascite, encéphalopathie) sur terrain d'hépatopathie alcoolique", grade: "GPS" },
            { text: "Score de Maddrey (fonction discriminante) = 4,6 × (TP patient − TP témoin en secondes) + bilirubine (µmol/L)/17 — un score ≥ 32 définit la forme SÉVÈRE justifiant la corticothérapie", grade: "1A" },
            { text: "Score MELD et score de Lille (à J7) permettent d'affiner le pronostic et d'évaluer la réponse au traitement", grade: "1B" },
            { text: "La biopsie hépatique (transjugulaire) confirme le diagnostic en cas de doute — recommandée avant corticothérapie si présentation atypique", grade: "2B" },
          ]},
          { title: "Traitement de la forme sévère (Maddrey ≥ 32)", items: [
            { text: "Prednisolone 40 mg/jour PO pendant 28 jours puis décroissance : améliore la survie à court terme (1 mois) dans les formes sévères (essai STOPAH, NEJM 2015)", grade: "1B" },
            { text: "Évaluer la réponse au score de Lille à J7 : si score de Lille > 0,45 (non-répondeur), arrêter les corticoïdes (bénéfice nul, risque infectieux)", grade: "1A" },
            { text: "N-Acétylcystéine IV en association aux corticoïdes pendant les 5 premiers jours : pourrait réduire la mortalité précoce et le syndrome hépato-rénal", grade: "2B" },
          ]},
          { title: "Mesures associées indispensables", items: [
            { text: "Sevrage alcoolique encadré (prévention du delirium tremens : benzodiazépines) + vitaminothérapie B1-B6-PP (prévention de l'encéphalopathie de Gayet-Wernicke)", grade: "1A" },
            { text: "Dépistage et traitement systématique des infections (avant et pendant la corticothérapie) — l'infection est la principale cause de mortalité", grade: "1A" },
            { text: "Support nutritionnel : apport calorique 35–40 kcal/kg/jour et protéique 1,2–1,5 g/kg/jour — la dénutrition aggrave le pronostic", grade: "1A" },
            { text: "Abstinence alcoolique totale : seul facteur déterminant de la survie à long terme — orientation addictologique systématique", grade: "1A" },
          ]},
        ],
        source: "EASL Clinical Practice Guidelines 2018 · Thursz NEJM 2015 (STOPAH) · Louvet Gastroenterology 2007 (score de Lille)"
      },
      {
        name: "Syndrome Compartimental Abdominal (Hypertension Intra-Abdominale)",
        urgence: "URGENT",
        aliases: ["syndrome compartimental abdominal", "hypertension intra-abdominale", "HTIA", "pression intra-abdominale", "SCA abdominal"],
        sections: [
          { title: "Définitions et mesure", items: [
            { text: "Hypertension intra-abdominale (HTIA) : pression intra-abdominale ≥ 12 mmHg de façon soutenue — Syndrome compartimental abdominal : PIA > 20 mmHg + nouvelle défaillance d'organe", grade: "1A" },
            { text: "Mesure de référence : pression intra-vésicale (via la sonde urinaire, patient en décubitus dorsal, à l'expiration, vessie instillée de 25 mL) — répétée régulièrement chez les patients à risque", grade: "1A" },
            { text: "Terrains à risque : chirurgie abdominale, pancréatite grave, remplissage massif, brûlés étendus, traumatisme abdominal, laparotomie", grade: "GPS" },
          ]},
          { title: "Conséquences physiopathologiques", items: [
            { text: "Retentissement multiviscéral : baisse du retour veineux et du débit cardiaque, élévation des pressions de ventilation (compression diaphragmatique), oligo-anurie (compression rénale), ischémie mésentérique", grade: "GPS" },
          ]},
          { title: "Prise en charge", items: [
            { text: "Mesures médicales : sédation-analgésie, évacuation du contenu digestif (SNG, sonde rectale), drainage des collections, restriction du remplissage, optimisation de la volémie", grade: "1B" },
            { text: "Curarisation transitoire pour relâcher la paroi abdominale dans les formes sévères", grade: "2B" },
            { text: "Laparotomie de décompression en urgence si syndrome compartimental avéré réfractaire aux mesures médicales (PIA > 25 mmHg avec défaillance d'organe)", grade: "1B" },
          ]},
        ],
        source: "WSACS Guidelines 2013 (Kirkpatrick ICM) · SFAR"
      },
    ]
  },
  {
    id: "hemato", label: "Hématologie Réanimation", short: "HEMATO", iconName: "blood", color: C.red, bgColor: "#FFF1F2",
    protos: [
      {
        name: "Neutropénie Fébrile Profonde — Aplasie Post-Chimiothérapie",
        urgence: "ABSOLUE",
        aliases: ["neutropénie fébrile", "aplasie post-chimio", "agranulocytose fébrile", "polynucléaires < 500 fièvre", "immunodépression infection"],
        sections: [
          { title: "Définition et évaluation du risque", items: [
            { text: "Définition : polynucléaires neutrophiles < 500/mm³ ET température ≥ 38,3°C une fois ou ≥ 38°C pendant 1 heure", grade: "GPS" },
            { text: "Score MASCC < 21 = risque élevé de complications (aplasie attendue > 7 jours) → hospitalisation systématique en chambre avec isolement protecteur", grade: "1B" },
          ]},
          { title: "Antibiothérapie probabiliste — démarrer dans l'heure", items: [
            { text: "Pipéracilline-Tazobactam (Tazocilline®) 4 g × 4/jour IV — ou Céfépime (Axépim®) 2 g × 3/jour IV — ou Méropénème 1 g × 3/jour IV si antécédent de bactérie multirésistante", grade: "1A" },
            { text: "Ajouter Vancomycine si choc, cathéter central infecté présumé, ou colonisation connue à Staphylocoque doré résistant à la méticilline", grade: "1B" },
            { text: "Antifongique si aplasie > 7 jours attendue : Fluconazole 400 mg/jour ou Voriconazole si risque aspergillaire", grade: "1B" },
          ]},
        ],
        source: "IDSA Febrile Neutropenia 2011 · MASCC Guidelines 2016 · ECIL-9 2023"
      },
      {
        name: "Coagulation Intravasculaire Disséminée (CIVD)",
        urgence: "ABSOLUE",
        aliases: ["CIVD", "coagulopathie de consommation", "coagulation intravasculaire disséminée", "thrombopénie hémorragie rein", "fibrinogène effondré choc"],
        sections: [
          { title: "Diagnostic biologique — score ISTH", items: [
            { text: "Score ISTH : plaquettes + INR + fibrinogène + D-dimères — score ≥ 5 = CIVD manifeste", grade: "GPS" },
            { text: "CIVD hémorragique : plaquettes < 50 G/L + fibrinogène < 1 g/L + D-dimères > 20 fois la normale + temps de prothrombine < 30% de la normale", grade: "GPS" },
          ]},
          { title: "Traitement étiologique — priorité absolue", items: [
            { text: "Traiter la cause EN PRIORITÉ : antibiotiques urgents si sepsis, évacuation utérine si pathologie obstétricale, acide tout-trans-rétinoïque si leucémie aiguë promyélocytaire", grade: "1A" },
          ]},
          { title: "Transfusion de produits sanguins labiles", items: [
            { text: "Plasma frais congelé 15 à 20 mL/kg si saignement actif avec temps de prothrombine < 30% — pas de transfusion prophylactique", grade: "1B" },
            { text: "Plaquettes si < 20 G/L sans hémorragie, ou < 50 G/L avec hémorragie active — Fibrinogène (Clottafact®) si < 1,5 g/L : 1,5 à 2 g en injection intraveineuse", grade: "1B" },
          ]},
        ],
        source: "ISTH DIC Guidance 2023 · Taylor Thromb Haemost 2001 (score)"
      },
      {
        name: "Crise Vaso-Occlusive et Syndrome Thoracique Aigu — Drépanocytose",
        urgence: "URGENT",
        aliases: ["drépanocytose crise", "crise vaso-occlusive", "syndrome thoracique aigu drépanocytose", "HbS", "anémie falciforme"],
        sections: [
          { title: "Prise en charge de la crise vaso-occlusive", items: [
            { text: "Analgésie rapide et puissante : morphine titrée en injection intraveineuse (bolus de 2 à 3 mg toutes les 5 minutes jusqu'au soulagement) + paracétamol + anti-inflammatoires si pas de contre-indication rénale", grade: "1A" },
            { text: "Hydratation intraveineuse modérée 1,5 à 2 litres par 24 heures — ne pas surhydrater (risque d'aggravation en cas de syndrome thoracique aigu)", grade: "GPS" },
          ]},
          { title: "Syndrome Thoracique Aigu — complication la plus grave", items: [
            { text: "Définition : nouvel infiltrat pulmonaire à la radiographie thoracique + au moins un : fièvre ≥ 38,5°C, douleur thoracique, toux, dyspnée, hypoxémie (saturation < 90%)", grade: "GPS" },
            { text: "Transfusion d'échange (érythrocytaphérèse) si hypoxémie sévère ou syndrome thoracique aigu progressif : cible hémoglobine S < 30% après échange", grade: "1B" },
            { text: "Céfotaxime 100 mg/kg/jour IV + Azithromycine — Bronchodilatateurs si bronchospasme associé", grade: "1A" },
          ]},
        ],
        source: "ASH Sickle Cell Guidelines 2020 · PNDS Drépanocytose HAS 2022"
      },
      {
        name: "Purpura Thrombotique Thrombocytopénique (PTT) — Syndrome de Moschcowitz",
        urgence: "ABSOLUE",
        aliases: ["PTT", "Moschcowitz", "purpura thrombotique thrombocytopénique", "microangiopathie thrombotique", "MAT", "thrombopénie anémie hémolytique schizocytes"],
        sections: [
          { title: "Diagnostic biologique", items: [
            { text: "Frottis sanguin avec recherche de schizocytes (> 1%) + thrombopénie profonde (< 30 G/L) + LDH très élevés + haptoglobine effondrée + Coombs négatif = hémolyse mécanique", grade: "1A" },
            { text: "Dosage ADAMTS13 urgent : activité < 10% confirme le PTT acquis — résultat en 24 à 48 heures — NE PAS attendre pour démarrer les échanges plasmatiques", grade: "1A" },
          ]},
          { title: "Traitement — urgence absolue : démarrer dans les 4 à 8 heures", items: [
            { text: "Échanges plasmatiques thérapeutiques : 1 à 1,5 fois la volémie par séance, plasma frais congelé comme liquide de substitution — quotidien jusqu'à rémission (plaquettes > 150 G/L deux jours consécutifs)", grade: "1A" },
            { text: "Caplacizumab (Cablivi®) : anticorps anti-vWF en association aux échanges plasmatiques — réduit le délai de rémission et le risque de récidive (recommandation ISTH 2021)", grade: "1B" },
            { text: "Corticoïdes : prednisone 1 mg/kg/jour — Rituximab (MabThera®) 375 mg/m² si forme réfractaire ou récidivante fréquente", grade: "1B" },
          ]},
          { title: "CONTRE-INDICATION ABSOLUE", items: [
            { text: "Transfusion de plaquettes FORMELLEMENT CONTRE-INDIQUÉE (sauf hémorragie engageant le pronostic vital) : risque d'aggravation majeure par apport de substrat aux thrombus plaquettaires", grade: "1A" },
          ]},
        ],
        source: "ISTH PTT Guidelines 2021 · Scully NEJM 2019;380:335"
      },
      {
        name: "Lupus Érythémateux Systémique — Poussée Viscérale Grave",
        urgence: "URGENT",
        aliases: ["lupus grave", "LES poussée viscérale", "néphrite lupique", "hémorragie alvéolaire lupus", "lupus cérébral vascularite"],
        sections: [
          { title: "Manifestations engageant le pronostic vital", items: [
            { text: "Hémorragie alvéolaire : hémoptysie + opacités bilatérales + chute du taux d'hémoglobine — urgence absolue (mortalité 40–90%)", grade: "GPS" },
            { text: "Glomérulonéphrite lupique proliférative (classe III/IV) : protéinurie > 3,5 g/24h, hématurie, insuffisance rénale aiguë", grade: "GPS" },
            { text: "Atteinte neuropsychiatrique : convulsions, état de conscience altéré, déficits focaux — éliminer infection et CIVD avant d'attribuer au lupus", grade: "GPS" },
          ]},
          { title: "Traitement d'attaque", items: [
            { text: "Bolus de méthylprednisolone (Solumédrol®) 500 mg à 1 g IV pendant 3 jours, puis prednisone orale 1 mg/kg/jour (max 60 mg) — traitement de référence des poussées graves", grade: "1A" },
            { text: "Cyclophosphamide IV (protocole Eurolupus : 500 mg toutes les 2 semaines × 6) : indiqué dans la néphrite lupique proliférative et les atteintes viscérales sévères", grade: "1A" },
            { text: "Échanges plasmatiques : microangiopathie thrombotique, vascularite avec défaillance d'organe rapide", grade: "1B" },
          ]},
        ],
        source: "EULAR SLE Guidelines 2023 · Fanouriakis Ann Rheum Dis 2024"
      },
      {
        name: "Syndrome de Lyse Tumorale",
        urgence: "URGENT",
        aliases: ["syndrome de lyse tumorale", "lyse tumorale chimio", "hyperuricémie après chimiothérapie", "insuffisance rénale lymphome leucémie"],
        sections: [
          {title: "Critères biologiques (Cairo-Bishop)", items: [
            {text: "≥ 2 anomalies dans les 3 jours avant ou 7 jours après le début du traitement : uricémie > 476 µmol/L ou +25% — kaliémie > 6 mmol/L ou +25% — phosphatémie > 1,45 mmol/L ou +25% — calcémie < 1,75 mmol/L ou –25%", grade: "GPS"},
          ]},
          {title: "Prévention avant chimiothérapie", items: [
            {text: "Rasburicase (Fasturtec®) 0,2 mg/kg IV en 30 minutes × 1 à 5 jours : urate-oxydase recombinante — réduit l'uricémie en 4 heures — traitement de référence des formes à haut risque (lymphome de Burkitt, LAL)", grade: "1A"},
            {text: "Allopurinol 300 mg/jour : pour les formes à risque faible et intermédiaire — moins efficace et plus lent que la rasburicase", grade: "1B"},
            {text: "Hyperhydratation 2 à 3 litres/m²/jour IV — alcalinisation des urines NON recommandée (précipitation des phosphates calciques)", grade: "1A"},
          ]},
          {title: "Traitement des complications", items: [
            {text: "Hyperkaliémie > 6 mmol/L : traitement en urgence (gluconate de calcium + insuline-glucose + résines) — hémodialyse urgente si oligo-anurie", grade: "1A"},
            {text: "Insuffisance rénale oligo-anurique : hémodialyse urgente — indication à poser sans délai en contexte de lyse", grade: "1A"},
          ]},
        ],
        source: "Cairo Bishop Brit J Haematol 2010 · SOCIE 2021"
      },
      {
        name: "Aplasie Médullaire Aiguë Sévère",
        urgence: "URGENT",
        aliases: ["aplasie médullaire", "pancytopénie profonde", "aplasie médullaire idiopathique", "moelle vide biopsie", "pancytopénie aplasie"],
        sections: [
          {title: "Critères de sévérité (Camitta)", items: [
            {text: "Aplasie sévère (Camitta) : polynucléaires neutrophiles < 500/mm³ + plaquettes < 20 G/L + réticulocytes < 1% avec moelle pauvre ou vide à la biopsie ostéo-médullaire", grade: "GPS"},
            {text: "Bilan étiologique : myélogramme + biopsie ostéo-médullaire, caryotype, HLA (greffe), sérologies virales (VEB, CMV, parvovirus B19, hépatites A B C E)", grade: "1A"},
          ]},
          {title: "Traitement — contacter le centre de greffe en urgence", items: [
            {text: "Allogreffe de cellules souches hématopoïétiques : traitement de référence si donneur HLA-compatible disponible et âge < 50 à 60 ans — seule guérison possible", grade: "1A"},
            {text: "Sérum anti-lymphocytaire de cheval (ATG) + ciclosporine : si greffe impossible — taux de réponse 60 à 80% à 6 mois", grade: "1A"},
            {text: "Eltrombopag (Revolade®) 150 mg/jour en association à l'ATG-ciclosporine : améliore le taux de réponse complète", grade: "1B"},
          ]},
          {title: "Support transfusionnel en réanimation", items: [
            {text: "Seuil de transfusion plaquettaire : < 10 G/L en prophylaxie — < 20 G/L si fièvre ou geste invasif — < 50 G/L si saignement actif", grade: "1A"},
          ]},
        ],
        source: "EBMT Aplastic Anemia Guidelines 2022 · Scheinberg NEJM 2011"
      },
    ]
  },
  {
    id: "obst", label: "Obstétrique Réanimation", short: "OBSTÉT", iconName: "baby", color: C.pink, bgColor: C.pinkBg,
    protos: [
      {
        name: "Pré-éclampsie Sévère et Éclampsie",
        urgence: "ABSOLUE",
        aliases: ["pré-éclampsie sévère", "éclampsie", "HELLP syndrome", "hypertension gravidique sévère", "convulsions grossesse", "crise éclamptique"],
        sections: [
          { title: "Critères de gravité", items: [
            { text: "Pression artérielle ≥ 160/110 mmHg persistante + protéinurie ≥ 0,3 g/24h OU dysfonction d'organe — HELLP : hémolyse + élévation des transaminases + thrombopénie", grade: "GPS" },
            { text: "Signes imposant la réanimation : céphalées intenses résistantes, phosphènes, douleur épigastrique en barre, oligurie < 20 mL/heure, thrombopénie < 100 G/L", grade: "GPS" },
          ]},
          { title: "Sulfate de magnésium — prévention et traitement de l'éclampsie", items: [
            { text: "Bolus : 4 g en perfusion intraveineuse sur 20 minutes — puis entretien 1 à 2 g/heure par seringue électrique pendant 24 heures après l'accouchement", grade: "1A" },
            { text: "Récidive de crise éclamptique : bolus supplémentaire de 2 g en injection intraveineuse directe en 5 minutes", grade: "1A" },
            { text: "Signes de surdosage à surveiller chaque heure : abolition des réflexes ostéotendineux (premier signe), fréquence respiratoire < 12/minute, diurèse < 25 mL/heure — Antidote : gluconate de calcium 1 g en injection intraveineuse directe", grade: "GPS" },
          ], hasDoseCalc: true, drugs: [
            { name: "Sulfate de magnésium — bolus", detail: "IV sur 20 minutes", fixed: "4 g — dose fixe indépendante du poids" },
            { name: "Sulfate de magnésium — entretien IVSE", detail: "Pendant 24h post-partum", fixed: "1 à 2 g/heure" },
          ]},
          { title: "Traitement antihypertenseur en urgence", items: [
            { text: "Objectif : pression artérielle systolique < 160 mmHg et diastolique < 110 mmHg — NE PAS descendre trop rapidement (risque d'hypoperfusion placentaire)", grade: "1A" },
            { text: "Nicardipine (Loxen®) par seringue électrique 1 à 5 mg/heure, titrer par paliers de 0,5 mg toutes les 10 minutes : antihypertenseur de référence en France pendant la grossesse", grade: "1B" },
            { text: "Labétalol (Trandate®) 20 mg en injection intraveineuse directe si urgence hypertensive ≥ 180/120 — contre-indiqué si asthme bronchique", grade: "1B" },
          ]},
          { title: "Extraction fœtale", items: [
            { text: "L'accouchement est le seul traitement définitif — extraction en urgence si : âge gestationnel ≥ 34 semaines, détresse fœtale, éclampsie, HELLP, défaillance maternelle", grade: "1A" },
          ]},
        ],
        source: "SFAR/CNGOF Pré-éclampsie Sévère 2022 · Magpie Trial Lancet 2002;359:1877"
      },
      {
        name: "Hémorragie du Post-Partum",
        urgence: "ABSOLUE",
        aliases: ["hémorragie post-partum", "atonie utérine", "hémorragie accouchement", "rétention placentaire", "saignement délivrance"],
        sections: [
          { title: "Définition et alerte immédiate", items: [
            { text: "Perte sanguine > 500 mL dans les 24 heures après voie basse, ou > 1 000 mL après césarienne — Alerte équipe obstétricale + anesthésiste + transfusion immédiatement, sans attendre l'aggravation", grade: "GPS" },
          ]},
          { title: "Acide tranexamique — traitement de première ligne", items: [
            { text: "Acide tranexamique (Exacyl®) 1 g en injection intraveineuse sur 10 minutes dès le diagnostic — réduit la mortalité maternelle par hémorragie de 20% (essai WOMAN, Lancet 2017)", grade: "1A", isNew: true },
            { text: "Répéter 1 g supplémentaire si l'hémorragie persiste à 30 minutes ou récidive dans les 24 heures", grade: "1A" },
          ]},
          { title: "Traitement de l'atonie utérine (70 à 80% des cas)", items: [
            { text: "Ocytocine (Syntocinon®) 5 unités en injection intraveineuse directe lente, puis 10 à 20 unités/heure en perfusion continue", grade: "1A" },
            { text: "Sulprostone (Nalador®) 500 microgrammes dans 50 mL de sérum physiologique sur 30 à 60 minutes si ocytocine insuffisante — monitoring obligatoire", grade: "1A" },
            { text: "Massage utérin bimanuel + révision utérine sous anesthésie générale + vérification de la vacuité", grade: "1A" },
          ]},
          { title: "Escalade thérapeutique", items: [
            { text: "Embolisation des artères utérines si patiente stable et radiologie interventionnelle disponible — préserve la fertilité", grade: "1B" },
            { text: "Chirurgie hémostase : points de compression B-Lynch, ligature des artères utérines — hystérectomie d'hémostase en ultime recours", grade: "GPS" },
            { text: "Fibrinogène si < 2 g/L en obstétrique (seuil plus élevé qu'en traumatologie) : 2 à 4 g en injection intraveineuse", grade: "1B" },
          ]},
        ],
        source: "CNGOF/SFAR Hémorragie Post-Partum 2022 · WOMAN Trial Lancet 2017;389:2105"
      },
      {
        name: "Embolie Amniotique",
        urgence: "ABSOLUE",
        aliases: ["embolie amniotique", "embolie de liquide amniotique", "collapsus per-partum", "détresse maternelle accouchement"],
        sections: [
          { title: "Reconnaissance — diagnostic clinique d'urgence", items: [
            { text: "Survient pendant le travail, l'accouchement ou le post-partum immédiat — tableau brutal associant détresse respiratoire/hypoxémie, collapsus cardiovasculaire et coagulopathie (CIVD)", grade: "GPS" },
            { text: "Souvent : convulsions, arrêt cardiaque, hémorragie incoercible par CIVD massive — diagnostic d'élimination posé en urgence sur le tableau clinique", grade: "GPS" },
          ]},
          { title: "Prise en charge — symptomatique et immédiate", items: [
            { text: "Réanimation cardio-pulmonaire si arrêt — extraction fœtale immédiate (césarienne perimortem dans les 5 minutes si arrêt maternel et terme viable)", grade: "1A" },
            { text: "Support hémodynamique agressif (remplissage, noradrénaline, inotropes), support ventilatoire (intubation, FiO₂ élevée), envisager l'ECMO en cas de défaillance réfractaire", grade: "1B" },
            { text: "Traitement de la CIVD : transfusion massive selon protocole (CGR, PFC, plaquettes, fibrinogène), acide tranexamique — prise en charge de l'hémorragie obstétricale associée", grade: "1A" },
            { text: "Prise en charge multidisciplinaire immédiate : obstétricien, anesthésiste-réanimateur, hématologue — pronostic maternel et néonatal réservé", grade: "GPS" },
          ]},
        ],
        source: "CNGOF · SFAR Réanimation de l'arrêt cardiaque de la femme enceinte · Pacheco Am J Obstet Gynecol 2020"
      },
      {
        name: "Cardiomyopathie du Péripartum",
        urgence: "URGENT",
        aliases: ["cardiomyopathie du péripartum", "cardiomyopathie du post-partum", "insuffisance cardiaque grossesse", "CMPP"],
        sections: [
          { title: "Diagnostic", items: [
            { text: "Insuffisance cardiaque par dysfonction systolique du ventricule gauche (FEVG < 45%) survenant en fin de grossesse ou dans les mois suivant l'accouchement, sans autre cause identifiable", grade: "GPS" },
            { text: "Signes d'insuffisance cardiaque : dyspnée, œdèmes, orthopnée — à ne pas attribuer trop vite aux signes physiologiques de la grossesse. Échocardiographie et BNP", grade: "1B" },
          ]},
          { title: "Prise en charge", items: [
            { text: "Traitement de l'insuffisance cardiaque adapté à la grossesse/allaitement : les IEC/ARA2 sont contre-indiqués pendant la grossesse (tératogènes) — bêtabloquants et diurétiques possibles", grade: "1B" },
            { text: "Après l'accouchement : traitement standard de l'insuffisance cardiaque (IEC, bêtabloquant, antagoniste minéralocorticoïde)", grade: "1A" },
            { text: "La bromocriptine (inhibition de la prolactine) est une option spécifique discutée dans les formes sévères, en association à l'anticoagulation", grade: "2B" },
            { text: "Anticoagulation préventive (risque thrombo-embolique élevé si FEVG très basse) — assistance circulatoire/transplantation dans les formes réfractaires", grade: "1B" },
          ]},
        ],
        source: "ESC Grossesse et Cardiopathies 2018 · Sliwa Eur J Heart Fail 2010"
      },
      {
        name: "HELLP Syndrome et Stéatose Hépatique Aiguë Gravidique",
        urgence: "URGENT",
        aliases: ["HELLP syndrome", "stéatose hépatique gravidique", "SHAG", "hémolyse cytolyse thrombopénie grossesse", "complication hépatique pré-éclampsie"],
        sections: [
          { title: "HELLP syndrome", items: [
            { text: "Triade : Hémolyse (Hemolysis), cytolyse hépatique (Elevated Liver enzymes), thrombopénie (Low Platelets) — complication de la pré-éclampsie, parfois sans HTA franche", grade: "GPS" },
            { text: "Signes d'alerte : douleur épigastrique ou de l'hypochondre droit, nausées, malaise — risque d'hématome sous-capsulaire du foie et de rupture hépatique", grade: "GPS" },
            { text: "Prise en charge : traitement de la pré-éclampsie (contrôle tensionnel, sulfate de magnésium), corticoïdes pour maturation fœtale, EXTRACTION fœtale qui est le seul traitement curatif", grade: "1A" },
          ]},
          { title: "Stéatose hépatique aiguë gravidique (SHAG)", items: [
            { text: "Insuffisance hépatique aiguë du 3e trimestre : ictère, encéphalopathie, hypoglycémie, coagulopathie, insuffisance rénale — critères de Swansea", grade: "GPS" },
            { text: "Urgence vitale materno-fœtale : extraction fœtale immédiate + support de l'insuffisance hépatique (correction de l'hypoglycémie, des troubles de coagulation, transfert en réanimation)", grade: "1A" },
            { text: "Surveillance du risque d'insuffisance hépatique fulminante — discuter le transfert en centre de transplantation hépatique si non-amélioration après l'accouchement", grade: "1B" },
          ]},
        ],
        source: "CNGOF Pré-éclampsie 2022 · SFAR · Nelson Am J Obstet Gynecol 2013 (Swansea)"
      },
    ]
  },
  {
    id: "trauma", label: "Traumatologie Réanimation", short: "TRAUMA", iconName: "bone", color: "#334155", bgColor: "#F1F5F9",
    protos: [
      {
        name: "Polytraumatisé Grave — Damage Control",
        urgence: "ABSOLUE",
        aliases: ["polytraumatisé", "traumatisme grave multiple", "accident de la voie publique sévère", "chute grande hauteur", "blast traumatisme"],
        sections: [
          { title: "Évaluation primaire — C-ABCDE", items: [
            { text: "C (Catastrophic hemorrhage) : contrôle immédiat des hémorragies externes — garrot, pansement compressif, packing pelvien si fracture du bassin ouverte", grade: "1A" },
            { text: "A (Airway) : voies aériennes libres avec protection du rachis cervical (collier rigide) — intubation si score de Glasgow < 9", grade: "1A" },
            { text: "B (Breathing) : ventilation bilatérale — exsufflation à l'aiguille 14G si pneumothorax compressif (asymétrie auscultation + instabilité hémodynamique)", grade: "1A" },
            { text: "D (Disability) : score de Glasgow + réactivité pupillaire — E (Exposition) : déshabiller, retourner, chercher lésion dorsale", grade: "GPS" },
          ]},
          { title: "Bilan lésionnel", items: [
            { text: "Scanner corps entier (body scanner) sans puis avec injection : indiqué chez tout polytraumatisé stable — NE PAS scanner un patient instable", grade: "1A" },
            { text: "Échographie FAST (Focused Assessment Sonography in Trauma) en urgence si instabilité hémodynamique : recherche épanchement intra-abdominal ou péricardique", grade: "1A" },
          ]},
          { title: "Traumatisme Crânien Grave (score de Glasgow ≤ 8)", items: [
            { text: "Intubation en séquence rapide si score de Glasgow ≤ 8 — objectifs ventilatoires : PaCO₂ 35 à 40 mmHg, PaO₂ > 80 mmHg, saturation > 94%", grade: "1A" },
            { text: "Pression artérielle systolique cible ≥ 110 mmHg dès la prise en charge pré-hospitalière — l'hypotension est le facteur pronostique modifiable le plus important", grade: "1A" },
            { text: "Scanner cérébral en urgence si score de Glasgow ≤ 13 — neurochirurgie urgente si hématome extradural ou sous-dural compressif (déviation ligne médiane > 5 mm)", grade: "GPS" },
          ]},
        ],
        source: "ATLS 10th ed. · BTF TBI Guidelines 2016 · EAST Guidelines Polytrauma 2019"
      },
      {
        name: "Induction en Séquence Rapide (ISR)",
        urgence: "ABSOLUE",
        aliases: ["ISR", "induction séquence rapide", "intubation urgente", "intubation estomac plein", "crash induction", "intubation rapide réanimation"],
        sections: [
          { title: "Préparation — mnémotechnique MNAAP", items: [
            { text: "Monitorage complet AVANT induction : SpO₂, ECG, pression artérielle non invasive, capnographie branchée et prête", grade: "1A" },
            { text: "Nécessaire : voie veineuse périphérique fonctionnelle (ou intraosseuse si impossible) — médicaments préparés et étiquetés dans l'ordre d'injection", grade: "1A" },
            { text: "Aspiration : branchée, testée, à portée de main immédiate — canule de Yankauer", grade: "1A" },
            { text: "Aide : deuxième opérateur présent AVANT d'induire — ne jamais intuber seul en urgence", grade: "GPS" },
            { text: "Plan B identifié avant d'induire : masque laryngé (i-gel ou LMA) posé sur la table, kit de cricothyroïdotomie ouvert si terrain difficile", grade: "1A" },
          ]},
          { title: "Matériel voies aériennes — tout vérifié", items: [
            { text: "Laryngoscope : lame testée et lumineuse (Mac 3 adulte standard, Mac 4 si cou large ou obèse)", grade: "GPS" },
            { text: "Vidéolaryngoscope disponible et allumé : première intention si facteurs d'intubation difficile prévisibles", grade: "1B" },
            { text: "Sonde d'intubation : taille 7,5–8,0 homme / 7,0–7,5 femme — ballonnet vérifié — mandrin béquillé inséré — seringue 10 mL attachée", grade: "GPS" },
            { text: "Position optimale : oreille alignée avec le manubrium sternal (rampe de sniffing) — surélever la tête si obésité ou grossesse", grade: "1A" },
          ]},
          { title: "Médicaments — séquence ISR standard", items: [
            { text: "Atropine 0,5 mg en injection intraveineuse directe (optionnel : si bradycardie anticipée, enfant, ou succinylcholine)", grade: "GPS" },
            { text: "Sufentanil (Sufenta®) 0,2 à 0,5 microgrammes/kg en injection intraveineuse 3 minutes avant : atténue la réponse hémodynamique à la laryngoscopie", grade: "1B" },
            { text: "Hypnotique — Propofol 1,5 à 2,5 mg/kg : standard si hémodynamique stable (CONTRE-INDIQUÉ si PAM < 65 mmHg ou état de choc)", grade: "1A" },
            { text: "Hypnotique — Kétamine (Kétalar®) 1 à 2 mg/kg : CHOIX SI CHOC, asthme, bronchospasme, état de mal — maintient la pression artérielle", grade: "1A" },
            { text: "Hypnotique — Étomidate 0,3 mg/kg : option choc cardiovasculaire — UNE seule injection (suppression corticosurrénale)", grade: "2B" },
            { text: "Curare — Succinylcholine 1,5 mg/kg en injection intraveineuse directe : délai d'action 45 à 60 secondes — CONTRE-INDIQUÉ si kaliémie > 6 mmol/L, brûlures > 48h, myopathie, immobilisation prolongée > 5 jours", grade: "1A" },
            { text: "Curare (alternative) — Rocuronium 1,2 mg/kg : délai 60 à 90 secondes — antidote disponible : Sugammadex 16 mg/kg en injection intraveineuse directe", grade: "1A" },
          ], hasDoseCalc: true, drugs: [
            { name: "Sufentanil (prémédication)", detail: "0,3 µg/kg IV, 3 min avant", perKg: 0.0003, unit: "mg", round: 3 },
            { name: "Propofol (induction)", detail: "1,5–2,5 mg/kg IV", perKg: 2, unit: "mg", max: 200, round: 0 },
            { name: "Kétamine (si choc)", detail: "1–2 mg/kg IV", perKg: 1.5, unit: "mg", round: 0 },
            { name: "Succinylcholine", detail: "1,5 mg/kg IV direct", perKg: 1.5, unit: "mg", round: 0 },
            { name: "Rocuronium (alternative)", detail: "1,2 mg/kg IV direct", perKg: 1.2, unit: "mg", round: 0 },
            { name: "Sugammadex (reversal rocuronium)", detail: "16 mg/kg IV direct", perKg: 16, unit: "mg", round: 0 },
          ]},
          { title: "Séquence opératoire — pas à pas", items: [
            { text: "Préoxygénation : FiO₂ 1,0 pendant 3 minutes — cible EtO₂ > 90% — ventilation non invasive 5 cmH₂O si saturation < 93% à l'entrée", grade: "1A" },
            { text: "Injection hypnotique PUIS curare IMMÉDIATEMENT — SANS ventilation au masque entre les deux (évite l'insufflation gastrique)", grade: "1A" },
            { text: "Laryngoscopie dès la fin des fasciculations (succinylcholine) ou à 60 secondes (rocuronium) — NE PAS intuber à l'aveugle", grade: "1A" },
            { text: "Vérification obligatoire : courbe capnographique carrée (EtCO₂) + auscultation bilatérale + radiographie thoracique de contrôle", grade: "1A" },
            { text: "Gonfler le ballonnet entre 20 et 30 cmH₂O (mesurer à la seringue manométrique) — noter la profondeur d'insertion aux lèvres (H : 21–23 cm / F : 19–21 cm)", grade: "GPS" },
          ]},
          { title: "Post-intubation immédiate", items: [
            { text: "Sédation-analgésie par seringue électrique : Propofol 1 à 4 mg/kg/heure + Sufentanil 0,15 à 0,3 microgrammes/kg/heure — démarrer IMMÉDIATEMENT", grade: "1A" },
            { text: "Réglages respirateur initiaux : volume courant 6 à 8 mL/kg PPI — fréquence 12 à 16/min — PEP 5 cmH₂O — FiO₂ 1,0 puis titrer", grade: "GPS" },
            { text: "Surveiller la pression artérielle : chute fréquente post-induction — remplissage 250 mL ou noradrénaline si PAM < 65 mmHg", grade: "1A" },
          ]},
        ],
        source: "SFAR Recommandations ISR 2020 · El-Orbany Anesth Analg 2010;110:318 · DAS Guidelines 2015"
      },
      {
        name: "Brûlures Graves — Prise en Charge Initiale",
        urgence: "ABSOLUE",
        aliases: ["brûlures graves", "brûlures étendues", "règle des 9", "surface corporelle brûlée", "brûlures profondes réanimation"],
        sections: [
          { title: "Évaluation de la surface brûlée — règle des 9 de Wallace", items: [
            { text: "Tête + cou = 9% — Chaque membre supérieur = 9% — Chaque membre inférieur = 18% — Tronc antérieur = 18% — Tronc postérieur = 18% — Périnée = 1% — La paume du patient = 1% (brûlures irrégulières)", grade: "GPS" },
            { text: "Brûlures graves nécessitant la réanimation : surface corporelle brûlée ≥ 20% chez l'adulte (≥ 10% chez l'enfant ou > 60 ans), ou brûlures profondes (3ème degré) ≥ 10%, ou localisation critique (face, mains, pieds, périnée)", grade: "GPS" },
          ]},
          { title: "Remplissage vasculaire — formule de Parkland modifiée", items: [
            { text: "Ringer Lactate : 3 à 4 mL/kg/% surface brûlée dans les 24 premières heures — MOITIÉ dans les 8 premières heures (depuis le moment de la brûlure, pas de l'admission)", grade: "1A" },
            { text: "Objectif principal : diurèse 0,5 à 1 mL/kg/heure — guide principal pour adapter le débit de perfusion", grade: "1A" },
            { text: "Éviter le sur-remplissage : œdème pulmonaire et abdominal (syndrome des loges abdominal) — ne pas dépasser 250 mL/kg dans les 24 premières heures", grade: "1B" },
          ]},
          { title: "Voies aériennes — intubation précoce si doute", items: [
            { text: "Intubation immédiate si : brûlures du visage ou de la cavité buccale, poils des narines brûlés, expectorations carbonées, stridor, Glasgow < 13, brûlures ≥ 40%", grade: "1A" },
            { text: "L'œdème des voies aériennes supérieures s'aggrave dans les 8 à 12 premières heures — intubation précoce si le moindre doute (peut devenir IMPOSSIBLE secondairement)", grade: "1A" },
          ]},
          { title: "Mesures associées", items: [
            { text: "Monoxyde de carbone : co-oxymétrie artérielle obligatoire (la SpO₂ est faussement normale) — si carboxyhémoglobine > 25% ou signes neurologiques → oxygène 100% au moins 6 heures (caisson hyperbare si disponible)", grade: "1A" },
            { text: "Analgésie : morphine IV titrée + kétamine 0,5 mg/kg lors des pansements (analgésie dissociative)", grade: "1A" },
            { text: "Transfert en centre de traitement des brûlés pour brûlures > 20%, profondes, ou de localisation critique — NE PAS transférer sans stabilisation préalable", grade: "GPS" },
          ]},
        ],
        source: "SFAR/SFB Brûlures Graves 2020 · American Burn Association Guidelines 2021"
      },
      {
        name: "Noyade et Hypothermie Accidentelle Profonde",
        urgence: "ABSOLUE",
        aliases: ["noyade grave", "submersion accidentelle", "quasi-noyade", "hypothermie accidentelle profonde", "arrêt cardiaque noyade froid"],
        sections: [
          { title: "Noyade — prise en charge", items: [
            { text: "Pas de manœuvre de Heimlich — commencer la réanimation cardio-pulmonaire par 5 insufflations initiales (poumons contenant de l'eau) puis continuer selon algorithme ALS standard", grade: "1A" },
            { text: "Intubation si Glasgow ≤ 12, détresse respiratoire, saturation < 90% — SDRA fréquent dans les 24 à 48 heures — ventilation protectrice", grade: "1A" },
            { text: "Antibiotiques systématiques NON indiqués en routine — uniquement si infection documentée ou noyade en eau très souillée", grade: "1A" },
          ]},
          { title: "Hypothermie accidentelle profonde — classification", items: [
            { text: "HT I (32–35°C, conscient) : réchauffement passif + boissons chaudes — HT II (28–32°C, obnubilé) : réchauffement actif externe — HT III (24–28°C, inconscient) : réchauffement interne", grade: "GPS" },
            { text: "HT IV (< 24°C, arrêt cardiaque apparent) : réanimation continue pendant le transport vers un centre ECMO — « pas mort avant d'être chaud » — survies documentées à 13,7°C", grade: "1A" },
          ]},
          { title: "Réchauffement et défibrillation", items: [
            { text: "ECMO veino-artérielle : méthode de réchauffement la plus rapide (1 à 2°C/heure) — indiquée si arrêt cardiaque avec hypothermie < 30°C", grade: "1B" },
            { text: "Fibrillation ventriculaire : un seul choc électrique — si échec, NE PAS répéter avant T ≥ 30°C (myocarde froid résistant) — amiodarone moins efficace < 30°C", grade: "GPS" },
          ]},
        ],
        source: "ERC Drowning Guidelines 2021 · Szpilman NEJM 2012;366:2102 · Brown NEJM 2012;367:1930"
      },
      {
        name: "Traumatisme Thoracique Grave — Volet Costal et Contusion Pulmonaire",
        urgence: "URGENT",
        aliases: ["traumatisme thoracique grave", "volet costal", "contusion pulmonaire", "hémopneumothorax traumatique", "fractures côtes multiples"],
        sections: [
          {title: "Volet costal — diagnostic et gravité", items: [
            {text: "Volet costal : ≥ 3 côtes fracturées en ≥ 2 endroits — mouvement paradoxal (rentre à l'inspiration) — signe de gravité respiratoire majeur", grade: "GPS"},
            {text: "La contusion pulmonaire sous-jacente est souvent plus grave que le volet — scanner thoracique systématique pour évaluer l'étendue des lésions pulmonaires", grade: "1A"},
          ]},
          {title: "Analgésie — traitement prioritaire", items: [
            {text: "Bloc paravertébral ou cathéter péridural thoracique : analgésie de référence du volet costal — réduit significativement le recours à la ventilation mécanique — supérieure aux morphiniques systémiques en termes de complications", grade: "1A"},
            {text: "Ventilation mécanique si : saturation < 90%, fréquence respiratoire > 35/min, PaO₂/FiO₂ < 200 — VNI en première intention si pas d'autre indication d'intubation", grade: "GPS"},
          ]},
          {title: "Hémothorax traumatique", items: [
            {text: "Hémothorax > 500 mL : drain thoracique de gros calibre (28 à 32 French) voie postéro-latérale 5ème espace intercostal", grade: "1A"},
            {text: "Hémothorax non contrôlé (drainage > 1 500 mL initial ou > 200 mL/heure × 3 heures) : thoracotomie d'hémostase ou vidéo-thoracoscopie", grade: "1A"},
          ]},
        ],
        source: "ATLS 10th ed. · ETS Thoracic Trauma 2019 · Carrier J Trauma 2009"
      },
      {
        name: "Traumatisme Médullaire Traumatique",
        urgence: "ABSOLUE",
        aliases: ["traumatisme médullaire", "tétraplégie traumatique", "paraplégie traumatique", "traumatisme rachis cervical dorsal", "choc spinal"],
        sections: [
          {title: "Prise en charge initiale", items: [
            {text: "Immobilisation rachidienne stricte : collier cervical rigide + matelas coquille — log-roll pour tout retournement jusqu'au bilan radiologique complet", grade: "1A"},
            {text: "IRM médullaire urgente : examen de référence — scanner rachidien si IRM impossible", grade: "1A"},
            {text: "Choc spinal (lésions cervicales hautes) : hypotension + bradycardie + peau chaude vasodilatée — traitement : atropine si bradycardie + noradrénaline si hypotension", grade: "GPS"},
          ]},
          {title: "Traitement — urgence chirurgicale", items: [
            {text: "Décompression et stabilisation chirurgicale dans les 24 heures : améliore le pronostic neurologique (recommandation AOSpine 2022 — niveau I de preuve)", grade: "1A"},
            {text: "Méthylprednisolone NASCIS : NON recommandé en routine — rapport bénéfice/risque défavorable (risques infectieux et de sepsis supérieurs au bénéfice neurologique)", grade: "1A"},
            {text: "Prévention des complications : HBPM pour thrombose veineuse, retournements toutes les 2 heures pour escarres, sondage urinaire, kinésithérapie précoce", grade: "1A"},
          ]},
        ],
        source: "AOSpine Spinal Cord Injury Guidelines 2022 · Fehlings Neurosurgery 2012"
      },
      {
        name: "Électrisation et Électrocution Grave",
        urgence: "ABSOLUE",
        aliases: ["électrisation grave", "électrocution", "foudroiement", "brûlures électriques", "arrêt cardiaque courant électrique"],
        sections: [
          {title: "Spécificités de l'électrisation", items: [
            {text: "La lésion cutanée visible sous-estime TOUJOURS les lésions internes : le courant suit les structures à moindre résistance (vaisseaux, nerfs, muscles) — nécrose musculaire massive sous une peau parfois intacte", grade: "GPS"},
            {text: "Fibrillation ventriculaire et arrêt cardiaque (courant alternatif) ou asystolie (foudre) : RCP immédiate — risque d'arythmie ventriculaire secondaire (monitoring cardiaque 24 heures minimum)", grade: "1A"},
          ]},
          {title: "Prise en charge hospitalière", items: [
            {text: "Bilan des lésions : ECG + monitoring 24 heures, CPK (rhabdomyolyse), troponine (myocardite électrique), ionogramme, créatinine, myoglobinurie", grade: "1A"},
            {text: "Rhabdomyolyse électrique : hyperhydratation massive 2 à 3 litres/heure — objectif diurèse > 1 mL/kg/heure jusqu'à normalisation des urines", grade: "1A"},
            {text: "Transfert en centre de brûlés si : brûlures > 10% SCB, lésions des mains, trajet de foudroiement identifié, lésions oculaires", grade: "GPS"},
          ]},
        ],
        source: "SFAR Électrisation 2018 · Koumbourlis Paediatr Respir Rev 2002"
      },
      {
        name: "Syndrome d'Embolie Graisseuse",
        urgence: "URGENT",
        aliases: ["embolie graisseuse", "syndrome d'embolie graisseuse", "SEG", "fracture os longs détresse respiratoire", "purpura embolie graisseuse"],
        sections: [
          { title: "Diagnostic — triade évocatrice", items: [
            { text: "Survient typiquement 24 à 72 heures après une fracture d'os long (fémur, tibia) ou du bassin, plus rarement après chirurgie orthopédique ou liposuccion", grade: "GPS" },
            { text: "Triade clinique : détresse respiratoire (hypoxémie, SDRA), signes neurologiques (confusion, coma), purpura pétéchial (thorax, conjonctives, creux axillaires) — la triade complète est inconstante", grade: "GPS" },
            { text: "Diagnostic clinique (critères de Gurd) — pas de test spécifique. Thrombopénie, anémie et hypoxémie fréquentes. Imagerie cérébrale et pulmonaire pour éliminer les diagnostics différentiels", grade: "GPS" },
          ]},
          { title: "Prise en charge", items: [
            { text: "Traitement essentiellement SYMPTOMATIQUE et de support : oxygénothérapie, ventilation protectrice si SDRA, support hémodynamique", grade: "1B" },
            { text: "Prévention : fixation chirurgicale PRÉCOCE des fractures d'os long — réduit l'incidence du syndrome d'embolie graisseuse", grade: "1B" },
            { text: "Les corticoïdes n'ont pas fait la preuve d'un bénéfice établi en traitement curatif (place débattue en prévention) — pas d'indication en routine", grade: "2B" },
          ]},
        ],
        source: "Gurd J Bone Joint Surg · Kwiatt J Emerg Trauma Shock 2013"
      },
    ]
  },
  {
    id: "proced", label: "Procédures & Éthique", short: "PROCED", iconName: "stethoscope", color: "#374151", bgColor: "#F8FAFC",
    protos: [
      {
        name: "Voie Veineuse Centrale — Technique et Prévention des Complications",
        urgence: "SURVEILLANCE",
        aliases: ["voie veineuse centrale", "VVC", "cathéter central", "jugulaire interne sous-clavière fémorale", "CVC réanimation"],
        sections: [
          {title: "Indications", items: [
            {text: "Vasopresseurs ou inotropes — Nutrition parentérale — Monitorage de la pression veineuse centrale — Chimiothérapie veino-toxique — Absence de voie périphérique praticable — Épuration extra-rénale", grade: "GPS"},
          ]},
          {title: "Choix de la voie d'abord", items: [
            {text: "Jugulaire interne droite : VOIE DE RÉFÉRENCE en réanimation — guidage échographique systématique recommandé — faible risque de pneumothorax", grade: "1A"},
            {text: "Sous-clavière : confortable pour le patient, taux d'infection plus faible à long terme, risque de pneumothorax plus élevé — contre-indiquée si coagulopathie sévère", grade: "1B"},
            {text: "Fémorale : accessible rapidement en urgence (pas de pneumothorax) — taux d'infection plus élevé — à éviter hors urgence", grade: "2B"},
          ]},
          {title: "Technique — mesures barrières et guidage échographique", items: [
            {text: "Mesures barrières maximales obligatoires : casaque + gants stériles + masque + calot + champ stérile large — chlorhexidine alcoolique 2% pour la désinfection cutanée", grade: "1A"},
            {text: "Guidage échographique en temps réel pour la jugulaire interne : réduit les tentatives et les complications (ponction artérielle, hématome, échec) de 40 à 60%", grade: "1A"},
            {text: "Vérification de position : radiographie thoracique ou échographie intracardiaque — extrémité distale à la jonction veine cave supérieure/oreillette droite", grade: "1A"},
          ]},
        ],
        source: "SRLF Gestion Abords Vasculaires 2019 · NICE Guidelines CVC 2002"
      },
      {
        name: "Épuration Extra-Rénale en Réanimation — Indications et Modalités",
        urgence: "URGENT",
        aliases: ["hémodialyse réanimation", "épuration extra-rénale urgente", "EER réanimation", "dialyse continu CRRT", "indications dialyse"],
        sections: [
          {title: "Indications urgentes (ne pas retarder)", items: [
            {text: "Hyperkaliémie > 6,5 mmol/L réfractaire au traitement médical — Acidose métabolique pH < 7,15 réfractaire — Urémie symptomatique (encéphalopathie, péricardite) — Surcharge volémique avec oligurie résistant aux diurétiques", grade: "1A"},
            {text: "Intoxication dialysable : lithium, méthanol, éthylène glycol, salicylates — initier sans délai", grade: "1A"},
          ]},
          {title: "Timing — données récentes", items: [
            {text: "En l'absence d'indication métabolique urgente, ne pas débuter l'EER de façon précoce : une stratégie d'attente sous surveillance étroite est non inférieure (essais AKIKI 2016, IDEAL-ICU 2018, STARRT-AKI 2020) et évite des dialyses inutiles", grade: "1A"},
            {text: "L'essai AKIKI-2 (2021) a montré qu'une stratégie très tardive n'apporte pas de bénéfice supplémentaire et pourrait être délétère — initier dès qu'apparaît une indication ou une oligurie/azotémie très prolongée", grade: "1B"},
          ]},
          {title: "Modalités — continu vs intermittent", items: [
            {text: "Hémofiltration veino-veineuse continue (CRRT) : préférée si instabilité hémodynamique — meilleure tolérance cardiovasculaire et meilleur contrôle de la volémie", grade: "1B"},
            {text: "Hémodialyse intermittente : si patient hémodynamiquement stable — pas de différence de mortalité démontrée entre continu et intermittent (le choix dépend de la tolérance hémodynamique)", grade: "1A"},
            {text: "Anticoagulation du circuit en CRRT : citrate régional recommandé en première intention (KDIGO) — ou héparine non fractionnée si citrate contre-indiqué (insuffisance hépatique sévère)", grade: "1A"},
          ]},
        ],
        source: "KDIGO AKI 2012 · Gaudry NEJM 2016 (AKIKI) · STARRT-AKI NEJM 2020 · Gaudry Lancet 2021 (AKIKI-2)"
      },
      {
        name: "Limitation et Arrêt des Traitements Actifs (LATA) — Loi Claeys-Leonetti",
        urgence: "SURVEILLANCE",
        aliases: ["LATA", "limitation thérapeutique réanimation", "arrêt thérapeutiques réanimation", "loi Claeys-Leonetti", "procédure collégiale réanimation"],
        sections: [
          {title: "Cadre légal — loi n°2016-87 du 2 février 2016", items: [
            {text: "La loi Claeys-Leonetti interdit l'obstination déraisonnable et consacre le droit à une sédation profonde et continue jusqu'au décès — le médecin a l'obligation de ne pas maintenir des traitements inutiles, disproportionnés ou sans autre effet que de prolonger artificiellement la vie", grade: "GPS"},
            {text: "Directives anticipées valides (< 3 ans ou sans date de péremption depuis 2016) : contraignantes pour le médecin — à rechercher SYSTÉMATIQUEMENT (registre national DMP, famille, médecin traitant)", grade: "1A"},
          ]},
          {title: "Procédure collégiale obligatoire", items: [
            {text: "Consultation d'au moins un médecin extérieur au service (sans lien hiérarchique) + infirmiers en charge du patient + équipe soignante — décision prise par le médecin référent après cette consultation", grade: "1A"},
            {text: "Personne de confiance désignée : son témoignage est prépondérant sur toute autre personne si patient hors d'état de s'exprimer", grade: "GPS"},
            {text: "Traçabilité obligatoire dans le dossier médical : motivations de la décision, éléments du débat collégial, personnes consultées", grade: "GPS"},
          ]},
          {title: "Sédation profonde et continue (SPC) jusqu'au décès", items: [
            {text: "Indication (article L.1110-5-2 CSP) : pronostic vital engagé à court terme + souffrance réfractaire à tout autre traitement — OU arrêt d'un traitement de maintien en vie (ventilation, dialyse, alimentation artificielle)", grade: "GPS"},
            {text: "Midazolam IVSE à dose titrée (0,05 à 0,1 mg/kg/heure) : objectif RASS –4 à –5 — associer un opioïde si douleur — la sédation palliative n'est pas une euthanasie (doctrine du double effet)", grade: "GPS"},
          ]},
        ],
        source: "Loi Claeys-Leonetti 2016 · SRLF/SFMU LATA 2018 · Décret 3 août 2016"
      },
      {
        name: "Transfusion Sanguine en Réanimation — Seuils et Complications",
        urgence: "SURVEILLANCE",
        aliases: ["transfusion réanimation", "culot globulaire", "seuil transfusionnel", "hémoglobine transfusion", "complications transfusion TRALI TACO"],
        sections: [
          {title: "Seuils transfusionnels — stratégie restrictive", items: [
            {text: "Stratégie restrictive : transfuser si hémoglobine < 7 g/dL (< 8 g/dL si coronaropathie ou patient > 65 ans) — la transfusion systématique à 10 g/dL augmente la mortalité (essai TRICC, Hébert NEJM 1999)", grade: "1A"},
            {text: "Hémorragie active + instabilité hémodynamique : objectif 8 à 10 g/dL pendant la phase hémorragique — stratégie libérale temporaire justifiée", grade: "GPS"},
          ]},
          {title: "Transfusion de plaquettes — seuils", items: [
            {text: "Prophylaxie : < 10 G/L — Fièvre ou geste invasif : < 20 G/L — Saignement actif ou chirurgie : < 50 G/L — Neurochirurgie ou chirurgie ophtalmologique : < 100 G/L", grade: "1B"},
          ]},
          {title: "Complications transfusionnelles — reconnaître et traiter", items: [
            {text: "TRALI (lésion pulmonaire post-transfusionnelle) : SDRA dans les 6 heures suivant la transfusion — interrompre immédiatement la transfusion — traitement identique au SDRA", grade: "GPS"},
            {text: "TACO (surcharge volémique post-transfusionnelle) : plus fréquent (3 à 8%) — OAP dans les 6 heures — furosémide IV + ralentir ou arrêter la transfusion", grade: "GPS"},
            {text: "Incompatibilité ABO (hémolytique aiguë) : STOP transfusion immédiat + prélèvement de vérification + remplissage + furosémide — risque de CIVD et d'insuffisance rénale aiguë", grade: "GPS"},
          ]},
        ],
        source: "SFAR/SFTS Transfusion Réanimation 2022 · Hébert NEJM 1999 (TRICC) · Holst NEJM 2014 (TRISS)"
      },
      {
        name: "Antibioprophylaxie Chirurgicale (SFAR-SPILF 2024)",
        urgence: "SURVEILLANCE",
        aliases: ["antibioprophylaxie", "antibioprophylaxie chirurgicale", "ABP", "prophylaxie bloc opératoire", "prévention infection site opératoire"],
        sections: [
          { title: "Principes fondamentaux — les 4 piliers", items: [
            { text: "L'antibioprophylaxie réduit d'environ 50% le risque d'infection du site opératoire — elle repose sur 4 piliers : la bonne indication, le choix de la molécule, la bonne posologie, le moment adéquat", grade: "1A" },
            { text: "Indication : chirurgies à risque (ouverture du tractus digestif, respiratoire ou urogénital) — classes d'Altemeier I (propre avec prothèse) et II (propre-contaminée). Pas d'ABP pour la chirurgie propre sans implant", grade: "1A" },
          ]},
          { title: "Timing et réinjection", items: [
            { text: "Administration dans les 30 minutes précédant l'incision (idéalement à l'induction anesthésique) — JAMAIS après l'incision", grade: "1A" },
            { text: "Réinjection peropératoire si durée > 2 demi-vies de l'antibiotique (typiquement toutes les 2 heures pour la céfazoline) ou si saignement > 1500 mL", grade: "1A" },
            { text: "Durée : DOSE UNIQUE dans la très grande majorité des cas — l'antibioprophylaxie ne doit jamais dépasser 24 heures (au-delà = antibiothérapie curative, pas prophylaxie)", grade: "1A" },
          ]},
          { title: "Molécules de référence par type de chirurgie", items: [
            { text: "Céfazoline 2 g IV (3 g si poids > 100 kg) : molécule de référence de la majorité des chirurgies (orthopédie, paroi, vasculaire, gynécologie) — réinjection 2 g toutes les 4h", grade: "1A" },
            { text: "Chirurgie colorectale : céfoxitine 2 g, ou céfazoline + métronidazole (couverture anaérobie) — préparation digestive associée", grade: "1A" },
            { text: "Allergie vraie aux bêtalactamines : clindamycine 900 mg ± gentamicine, ou vancomycine 15 mg/kg si risque SARM", grade: "1B" },
          ]},
          { title: "Erreurs fréquentes à éviter", items: [
            { text: "Ne PAS prolonger l'ABP au-delà de la fermeture (drains, cathéters ne justifient pas la poursuite) — Ne PAS confondre ABP et antibiothérapie curative", grade: "1A" },
            { text: "Adapter la dose au poids (obésité) — Ne pas oublier la réinjection lors des chirurgies longues — Respecter le délai de 30 min avant incision", grade: "GPS" },
          ]},
        ],
        source: "RFE SFAR-SPILF Antibioprophylaxie en chirurgie et médecine interventionnelle 2024 (V1.3)"
      },
      {
        name: "Intubation Difficile — Algorithme",
        urgence: "URGENT",
        aliases: ["intubation difficile", "algorithme intubation difficile", "ventilation impossible intubation impossible", "vidéolaryngoscope", "abord trachéal"],
        sections: [
          { title: "Anticipation et préparation", items: [
            { text: "Dépistage des critères prédictifs : ouverture de bouche limitée, Mallampati 3-4, distance thyro-mentonnière courte, cou court/peu mobile, antécédent d'intubation difficile", grade: "GPS" },
            { text: "Préoxygénation optimale, position adaptée, matériel d'intubation difficile immédiatement disponible (vidéolaryngoscope, mandrins, masques laryngés, kit d'abord trachéal)", grade: "1A" },
          ]},
          { title: "Algorithme en cas de difficulté", items: [
            { text: "Échec d'intubation MAIS ventilation au masque possible : oxygéner, optimiser (mandrin béquillé, vidéolaryngoscope, manœuvre laryngée externe), limiter le nombre de tentatives (≤ 2-3)", grade: "1A" },
            { text: "Recourir précocement au vidéolaryngoscope et/ou au dispositif supra-glottique (masque laryngé) — appeler à l'aide sans délai", grade: "1A" },
            { text: "Situation « ne peut pas intuber, ne peut pas oxygéner » (CICO) : abord trachéal d'urgence (cricothyroïdotomie) sans délai — c'est une urgence vitale absolue", grade: "1A" },
          ]},
          { title: "Points clés", items: [
            { text: "Le maintien de l'oxygénation prime toujours sur l'intubation — ne pas s'acharner sur des tentatives répétées qui traumatisent et aggravent", grade: "1A" },
            { text: "Préparer mentalement et matériellement la stratégie d'échec AVANT l'induction — verbaliser le plan A/B/C en équipe", grade: "GPS" },
          ]},
        ],
        source: "SFAR Intubation Difficile 2017 · DAS Guidelines 2015"
      },
      {
        name: "Drainage Thoracique — Technique et Surveillance",
        urgence: "URGENT",
        aliases: ["drainage thoracique", "drain thoracique", "drain pleural", "pose de drain", "thoracostomie"],
        sections: [
          { title: "Indications", items: [
            { text: "Pneumothorax compressif (après exsufflation), pneumothorax mal toléré ou de grande abondance, épanchement pleural liquidien mal toléré, hémothorax, empyème", grade: "1A" },
            { text: "En urgence vitale (pneumothorax compressif) : l'exsufflation à l'aiguille précède le drain mais ne le remplace pas", grade: "1A" },
          ]},
          { title: "Technique", items: [
            { text: "Voie de référence : triangle de sécurité (bord antérieur du grand dorsal, bord latéral du grand pectoral, ligne du mamelon) — 4e-5e espace intercostal sur la ligne axillaire moyenne", grade: "GPS" },
            { text: "Asepsie chirurgicale, anesthésie locale, passage au RAS du bord SUPÉRIEUR de la côte inférieure (évite le paquet vasculo-nerveux intercostal sous-costal), contrôle échographique recommandé", grade: "1B" },
            { text: "Raccordement à un système de drainage avec valve anti-retour (bocal ou dispositif à usage unique), ± aspiration douce", grade: "GPS" },
          ]},
          { title: "Surveillance et complications", items: [
            { text: "Vérifier le bullage (fuite aérienne), l'oscillation (perméabilité), la quantité et l'aspect du liquide drainé — radiographie thoracique de contrôle après la pose", grade: "GPS" },
            { text: "Complications : malposition, lésion d'organe (poumon, foie, rate, cœur), hémorragie, infection, œdème pulmonaire de réexpansion (si évacuation trop rapide d'un épanchement abondant)", grade: "GPS" },
            { text: "Ablation lorsque l'indication est résolue (poumon ré-expandu, absence de bullage, drainage < 200 mL/j) — clampage non systématique", grade: "1B" },
          ]},
        ],
        source: "BTS Pleural Disease Guidelines 2023 · SFMU"
      },
    ]
  },
  {
    id: "meta", label: "Métabolisme & Endocrinologie", short: "META", iconName: "flask", color: C.teal, bgColor: C.tealBg,
    protos: [
      {
        name: "Acidocétose Diabétique",
        urgence: "URGENT",
        aliases: ["acidocétose diabétique", "DKA", "diabète décompensé", "hyperglycémie acidose", "cétonémie pH bas", "haleine acétonique"],
        sections: [
          { title: "Réhydratation intraveineuse", items: [
            { text: "Sérum physiologique (NaCl 0,9%) : 1 litre/heure la 1ère heure — puis 0,5 litre/heure × 4 heures — puis adapter selon la pression artérielle et la diurèse", grade: "1A" },
            { text: "Passer en sérum glucosé 5% + NaCl 0,9% quand la glycémie descend à ≤ 14 mmol/L (≤ 2,5 g/L) pour maintenir un apport glucidique tout en continuant l'insuline", grade: "1A" },
          ]},
          { title: "Potassium — corriger avant l'insuline", items: [
            { text: "Kaliémie > 5,5 mmol/L : pas de supplémentation — Kaliémie 3,5 à 5,5 : 20 à 40 mmol/heure IV", grade: "1A" },
            { text: "Kaliémie < 3,5 mmol/L : 40 mmol/heure IV — NE PAS démarrer l'insuline (risque d'hypokaliémie grave et trouble du rythme cardiaque)", grade: "1A" },
          ]},
          { title: "Insulinothérapie par seringue électrique", items: [
            { text: "Insuline rapide 0,1 unité/kg/heure — démarrer uniquement quand la kaliémie est > 3,5 mmol/L", grade: "1A" },
            { text: "Objectif : baisse de la glycémie de 3 à 4 mmol/L/heure", grade: "1A" },
          ], hasDoseCalc: true, drugs: [
            { name: "Insuline rapide IVSE (débit horaire)", detail: "0,1 UI/kg/h", perKg: 0.1, unit: "UI/h", round: 1 },
          ]},
          { title: "Bicarbonates et critères de résolution", items: [
            { text: "Bicarbonate de sodium UNIQUEMENT si pH < 6,9 : 50 mmol sur 1 heure — la correction spontanée sous insuline est attendue et préférable", grade: "2B" },
            { text: "Résolution : pH > 7,30 ET bicarbonates > 18 mmol/L ET cétonémie capillaire < 0,6 mmol/L — Transition insuline sous-cutanée : maintenir la perfusion 1 heure après la 1ère injection sous-cutanée", grade: "GPS" },
          ]},
        ],
        source: "ADA Standards of Care 2023 · Kitabchi Diabetes Care 2009;32:1335"
      },
      {
        name: "Hyperkaliémie Sévère avec Signes Électrocardiographiques",
        urgence: "ABSOLUE",
        aliases: ["hyperkaliémie sévère", "kaliémie élevée", "ondes T pointues ECG", "QRS élargi hyperkaliémie", "trouble conduction rénal"],
        sections: [
          { title: "Signes électrocardiographiques — urgence absolue", items: [
            { text: "Séquence évolutive : ondes T pointues et symétriques → allongement du PR → élargissement du QRS → rythme sinusoïdal → fibrillation ventriculaire et arrêt cardiaque", grade: "GPS" },
          ]},
          { title: "Protection cardiaque — effet en 2 à 3 minutes", items: [
            { text: "Gluconate de calcium 10% : 10 mL (1 g) en injection intraveineuse directe sur 2 à 5 minutes — répéter si l'électrocardiogramme ne se normalise pas — durée d'effet 30 à 60 minutes", grade: "1A" },
          ]},
          { title: "Transfert intracellulaire — effet en 15 à 30 minutes", items: [
            { text: "Insuline rapide 10 unités + glucose 30% 50 mL (15 g) en injection intraveineuse — abaisse la kaliémie d'environ 0,6 mmol/L — surveiller la glycémie à 2 heures (risque d'hypoglycémie)", grade: "1A" },
            { text: "Salbutamol (Ventoline®) 10 à 20 mg par nébulisation : adjuvant, abaisse la kaliémie de 0,5 mmol/L supplémentaire — Bicarbonate si acidose métabolique associée (pH < 7,20)", grade: "1B" },
          ]},
          { title: "Élimination du potassium", items: [
            { text: "Furosémide (Lasilix®) en injection intraveineuse si diurèse résiduelle préservée — Patiromer (Veltassa®) ou Sodium Zirconium (Lokelma®) : chélateurs oraux préférés aux anciennes résines", grade: "1B" },
            { text: "Hémodialyse urgente si insuffisance rénale oligo-anurique réfractaire — ne pas retarder l'indication", grade: "1A" },
          ]},
        ],
        source: "ERBP/UK Renal Hyperkalaemia 2023 · ESC 2021 · OPAL-HK NEJM 2015"
      },
      {
        name: "Insuffisance Surrénalienne Aiguë",
        urgence: "ABSOLUE",
        aliases: ["insuffisance surrénalienne aiguë", "crise surrénalienne", "maladie d'Addison décompensée", "hypotension corticoïdes", "asthénie profonde hypotension sodium bas"],
        sections: [
          { title: "Traitement immédiat — ne pas attendre les résultats biologiques", items: [
            { text: "Hydrocortisone (Solucortef®) 100 mg en injection intraveineuse directe IMMÉDIATEMENT si suspicion clinique forte — puis 200 mg/24 heures en perfusion continue (ou 50 mg toutes les 6 heures)", grade: "1A" },
            { text: "Remplissage : sérum physiologique 1 litre en 30 à 60 minutes, puis 1 litre/heure × 2 à 4 heures selon la pression artérielle", grade: "1A" },
            { text: "Corriger l'hypoglycémie associée : glucose 30% si glycémie < 3 mmol/L", grade: "1A" },
          ]},
          { title: "Précautions diagnostiques", items: [
            { text: "Ne pas utiliser la dexaméthasone si le diagnostic est incertain : fausse le test de stimulation au Synacthène qui sera fait après stabilisation", grade: "GPS" },
            { text: "Rechercher le facteur déclenchant : infection, chirurgie, trauma, arrêt brutal de la corticothérapie, pathologie intercurrente", grade: "GPS" },
          ]},
        ],
        source: "Society for Endocrinology Emergency Guidance 2020 · Bornstein Eur J Endocrinol 2016;175:G1"
      },
      {
        name: "Hyponatrémie Symptomatique",
        urgence: "URGENT",
        aliases: ["hyponatrémie", "natrémie basse", "SIADH", "convulsions hyponatrémie", "encéphalopathie hyponatrémique", "natrémie < 125"],
        sections: [
          { title: "Symptômes sévères — convulsions, coma, engagement cérébral", items: [
            { text: "Solution saline hypertonique à 3% (SSH 3%) : 100 à 150 mL en perfusion intraveineuse sur 20 minutes — répéter 1 à 2 fois si persistance des symptômes — objectif immédiat : élever la natrémie de +5 mmol/L en 1 heure", grade: "1A" },
          ]},
          { title: "Limites de correction — risque de myélinolyse centropontine", items: [
            { text: "LIMITE ABSOLUE : +10 mmol/L par 24 heures — +18 mmol/L par 48 heures — dépasser ces limites expose à la myélinolyse centropontine (démyélinisation irréversible)", grade: "1A" },
            { text: "Si correction trop rapide : administrer Desmopressine 2 microgrammes en injection intraveineuse + perfusion de glucose 5% pour freiner la correction (technique dite de re-lowering)", grade: "GPS" },
          ]},
          { title: "Traitement de la cause — syndrome de sécrétion inappropriée d'ADH (SIADH)", items: [
            { text: "Restriction hydrique 800 mL/jour en première intention — chercher et traiter la cause (médicaments, tumeur, pathologie pulmonaire ou neurologique)", grade: "2B" },
            { text: "Tolvaptan (Samsca®) si hyponatrémie sévère réfractaire : antagoniste des récepteurs V2 de l'ADH — surveillance hépatique obligatoire (risque d'hépatotoxicité)", grade: "2B" },
            { text: "Ionogramme urinaire (rapport Na/K urinaire) + osmolalité urinaire + plasma pour orienter le diagnostic étiologique", grade: "GPS" },
          ]},
        ],
        source: "ESE Hyponatrémie 2014 (réf. en vigueur) · Spasovski Eur J Endocrinol 2014 · ESICM mise au point 2023"
      },
      {
        name: "Coma Hyperosmolaire Hyperglycémique",
        urgence: "ABSOLUE",
        aliases: ["coma hyperosmolaire", "état hyperosmolaire hyperglycémique", "hyperglycémie sévère sans acidose", "diabète type 2 décompensé"],
        sections: [
          { title: "Caractéristiques", items: [
            { text: "Glycémie > 33 mmol/L (> 6 g/L) — Osmolarité plasmatique > 320 mOsm/kg — Absence d'acidose significative (pH > 7,30) — Cétonémie < 3 mmol/L — Déshydratation profonde (déficit 8 à 12 litres)", grade: "GPS" },
          ]},
          { title: "Réhydratation — priorité absolue avant l'insuline", items: [
            { text: "Sérum physiologique (NaCl 0,9%) 1 litre/heure les 2 premières heures — puis adapter selon la natrémie corrigée, la pression artérielle et la diurèse — objectif : 3 à 4 litres dans les 4 premières heures", grade: "1A" },
            { text: "Passer en NaCl 0,45% (sérum hypotonique) si natrémie corrigée > 145 mmol/L (hypernatrémie associée)", grade: "GPS" },
            { text: "Insuline IVSE 0,05 à 0,1 unité/kg/heure : démarrer uniquement après réhydratation initiale (au moins 1 à 2 litres) — risque d'effondrement tensionnel si insuline trop précoce", grade: "1A" },
          ]},
          { title: "Surveillance et complications", items: [
            { text: "Thromboses veineuses et artérielles fréquentes : anticoagulation prophylactique systématique (héparine de bas poids moléculaire)", grade: "1B" },
            { text: "Ionogramme + glycémie toutes les 2 heures en phase aiguë — osmolarité calculée de contrôle — rechercher le facteur déclenchant (infection +++ dans 50% des cas)", grade: "GPS" },
          ]},
        ],
        source: "ADA Standards of Care 2023 · Kitabchi Diabetes Care 2009"
      },
      {
        name: "Insuffisance Rénale Aiguë Oligo-Anurique",
        urgence: "URGENT",
        aliases: ["insuffisance rénale aiguë", "IRA", "oligurie réanimation", "anurie", "KDIGO", "créatinine qui monte"],
        sections: [
          { title: "Classification KDIGO et étiologie", items: [
            { text: "Stade 1 : créatinine × 1,5 à 1,9 fois la normale ou +26 µmol/L en 48 heures — Stade 2 : × 2 à 2,9 — Stade 3 : × 3 ou > 354 µmol/L ou recours à la dialyse", grade: "GPS" },
            { text: "Pré-rénale (choc, déshydratation) : épreuve de remplissage 250 mL — Post-rénale (obstruction) : échographie vésico-rénale urgente — Rénale : nécroses tubulaires, néphrites", grade: "1A" },
          ]},
          { title: "Traitement", items: [
            { text: "Arrêt IMMÉDIAT de tous les médicaments néphrotoxiques : anti-inflammatoires non stéroïdiens, inhibiteurs de l'enzyme de conversion ou sartans, aminosides, produit de contraste iodé", grade: "1A" },
            { text: "Maintien de la perfusion rénale : pression artérielle moyenne cible > 65 à 75 mmHg — remplissage si hypovolémie — vasopresseurs si choc", grade: "1A" },
            { text: "Furosémide intraveineux : n'améliore pas la récupération rénale mais facilite la gestion de la surcharge volémique", grade: "GPS" },
          ]},
          { title: "Indications de l'épuration extra-rénale urgente", items: [
            { text: "Hyperkaliémie > 6,5 mmol/L réfractaire au traitement médical — Surcharge volémique sévère résistante aux diurétiques — Acidose métabolique pH < 7,15 réfractaire — Urémie symptomatique (péricardite, encéphalopathie)", grade: "1A" },
          ]},
        ],
        source: "KDIGO AKI Guidelines 2012 · Kellum NEJM 2019;380:1256"
      },
      {
        name: "Tempête Thyroïdienne (Thyrotoxicose Maligne)",
        urgence: "ABSOLUE",
        aliases: ["tempête thyroïdienne", "thyrotoxicose aiguë", "crise thyroïdienne", "hyperthyroïdie maligne", "score Burch-Wartofsky > 45"],
        sections: [
          { title: "Diagnostic — score de Burch-Wartofsky ≥ 45", items: [
            { text: "Score de Burch-Wartofsky ≥ 45 : tempête thyroïdienne probable — fièvre > 40°C + tachycardie > 140/minute + dysfonction neurologique (confusion, agitation, coma) + insuffisance cardiaque + signes digestifs", grade: "GPS" },
            { text: "TSH effondrée (< 0,01 mUI/L) + T4 libre et T3 libre très élevées — NE PAS attendre le résultat pour démarrer le traitement", grade: "GPS" },
            { text: "Facteur déclenchant : chirurgie thyroïdienne, infection, accouchement, iode radioactif, arrêt des antithyroïdiens", grade: "GPS" },
          ]},
          { title: "Traitement — ORDRE D'ADMINISTRATION STRICT", items: [
            { text: "1. Bêtabloquant EN PRIORITÉ : propranolol 60 à 80 mg toutes les 4 heures par voie orale (ou 1 à 2 mg IV lent si voie orale impossible) — contrôle des symptômes adrénergiques + inhibe la conversion périphérique T4→T3", grade: "1A" },
            { text: "2. Antithyroïdien de synthèse : propylthiouracile (PTU) 200 à 300 mg toutes les 6 heures par sonde naso-gastrique — bloque la synthèse ET la conversion périphérique T4→T3", grade: "1A" },
            { text: "3. Iode (lugol ou iodure de sodium) : UNIQUEMENT 1 HEURE APRÈS le PTU pour éviter l'aggravation (effet Wolff-Chaikoff bloquant la libération hormonale)", grade: "1A" },
            { text: "4. Hydrocortisone 200 mg IV/jour : insuffisance surrénalienne relative fréquente + bloque la conversion T4→T3", grade: "1B" },
          ]},
          { title: "Réanimation symptomatique", items: [
            { text: "Refroidissement actif : PARACÉTAMOL (jamais d'aspirine — déplace la T4 de l'albumine), couvertures froides, glaçons", grade: "1A" },
            { text: "Si fibrillation auriculaire : bêtabloquant IV pour le contrôle de la fréquence — les digitaliques sont moins efficaces en hyperthyroïdie", grade: "GPS" },
          ]},
        ],
        source: "ETA Thyroid Storm Guidelines 2016 · Burch Wartofsky Thyroid 1993"
      },
      {
        name: "Coma Myxœdémateux — Hypothyroïdie Profonde",
        urgence: "ABSOLUE",
        aliases: ["coma myxœdémateux", "hypothyroïdie profonde", "myxœdème coma", "TSH très élevée coma", "insuffisance thyroïdienne grave"],
        sections: [
          { title: "Diagnostic", items: [
            { text: "Triade : hypothermie (< 35°C) + altération progressive de la conscience + contexte d'hypothyroïdie (connue ou signes cliniques : macroglossie, peau sèche, bradycardie, hypoventilation, constipation sévère)", grade: "GPS" },
            { text: "TSH très élevée (> 50 mUI/L) + T4 libre effondrée — hyponatrémie (50% des cas), hypoglycémie, hypercapnie, bradycardie sinusale", grade: "GPS" },
            { text: "Facteur déclenchant : infection, froid, médicaments (amiodarone, lithium, interféron), chirurgie, sédatifs", grade: "GPS" },
          ]},
          { title: "Traitement hormonal de substitution", items: [
            { text: "Hydrocortisone 100 mg IV EN PREMIER : insuffisance surrénalienne associée fréquente — à donner AVANT la lévothyroxine pour éviter une crise surrénalienne", grade: "1A" },
            { text: "Lévothyroxine (T4) 200 à 400 microgrammes IV en dose de charge unique, puis 100 microgrammes/jour IV — ou par sonde naso-gastrique si voie IV indisponible", grade: "1B" },
            { text: "Liothyronine (T3) 20 microgrammes IV puis 10 µg toutes les 4 heures : dans les formes sévères avec choc — action plus rapide que la T4", grade: "2B" },
          ]},
          { title: "Réanimation", items: [
            { text: "Réchauffement PROGRESSIF et PASSIF (couvertures chauffantes) — NE PAS réchauffer trop vite : risque de collapsus cardiovasculaire par vasodilatation périphérique brutale", grade: "1A" },
            { text: "Ventilation assistée si hypoventilation (PaCO₂ > 50 mmHg) — Corriger hyponatrémie progressivement et hypoglycémie", grade: "1A" },
          ]},
        ],
        source: "ETA Myxedema Coma Guidelines 2016 · Jonklaas Thyroid 2014"
      },
      {
        name: "Acidocétose Alcoolique",
        urgence: "URGENT",
        aliases: ["acidocétose alcoolique", "alcoolisme acidose cétonique", "cétose alcoolique", "acidose non diabétique alcool"],
        sections: [
          { title: "Diagnostic", items: [
            { text: "Patient alcoolique chronique, jeûne récent (souvent après vomissements et arrêt de l'alimentation) — douleur abdominale + vomissements + odeur acétonique — glycémie NORMALE ou basse (différence avec DKA)", grade: "GPS" },
            { text: "Gaz du sang : acidose métabolique avec trou anionique élevé — cétonurie + cétonémie positives — glycémie normale ou basse — alcoolémie parfois nulle au moment de la décompensation", grade: "GPS" },
          ]},
          { title: "Traitement", items: [
            { text: "Glucosé à 5% ou 10% par voie intraveineuse : traitement principal — stimule la sécrétion d'insuline, inhibe la lipolyse et la cétogenèse — amélioration rapide en quelques heures", grade: "1A" },
            { text: "Thiamine (Bévitine®) 500 mg IV AVANT tout apport glucidique : prévention impérative de l'encéphalopathie de Gayet-Wernicke", grade: "1A" },
            { text: "Corriger l'hypophosphatémie, l'hypokaliémie et l'hypomagnésémie : fréquentes et aggravent la défaillance musculaire", grade: "1A" },
            { text: "Pas d'insuline : glycémie normale ou basse — risque hypoglycémie sévère", grade: "GPS" },
          ]},
        ],
        source: "McGuire Emerg Med J 2006 (revue) · Long J Emerg Med 2021 (mise à jour)"
      },
      {
        name: "Hypercalcémie Sévère",
        urgence: "URGENT",
        aliases: ["hypercalcémie sévère", "calcium > 3 mmol/L", "crise hypercalcémique", "hypercalcémie maligne", "troubles conscience calcium"],
        sections: [
          {title: "Étiologies et diagnostic", items: [
            {text: "Causes en réanimation : hypercalcémie maligne (métastases ostéolytiques, myélome, PTHrP) — hyperparathyroïdie primaire — granulomatoses (sarcoïdose) — intoxication vitamine D", grade: "GPS"},
            {text: "Symptômes si calcémie > 3 mmol/L : nausées, vomissements, polyurie, confusion, troubles du rythme (QT court) — urgence vitale si > 3,5 mmol/L (valeur calcémie ionisée ou albumine-corrigée)", grade: "GPS"},
          ]},
          {title: "Traitement", items: [
            {text: "Hyperhydratation sérum physiologique 2 à 4 litres IV dans les 4 premières heures : ÉTAPE PRÉLIMINAIRE OBLIGATOIRE — dilue le calcium et augmente son excrétion rénale", grade: "1A"},
            {text: "Acide zolédronique (Zometa®) 4 mg IV sur 15 minutes : bisphosphonate IV — inhibe la résorption ostéoclastique — traitement de référence des hypercalcémies malignes — effet en 24 à 48 heures", grade: "1A"},
            {text: "Calcitonine (Miacalcic®) 4 à 8 UI/kg SC ou IM toutes les 6 à 12 heures : effet rapide (4 heures) mais tachyphylaxie à 48 heures — utile en attente des bisphosphonates", grade: "1B"},
            {text: "Hémodialyse si hypercalcémie menaçante (> 4 mmol/L) avec insuffisance rénale ou insuffisance cardiaque contre-indiquant l'hyperhydratation", grade: "GPS"},
          ]},
        ],
        source: "Endocrine Society Hypercalcemia · Minisola BMJ 2015 (revue) · Walsh JCEM 2016"
      },
      {
        name: "Rhabdomyolyse Aiguë Sévère",
        urgence: "URGENT",
        aliases: ["rhabdomyolyse aiguë", "myoglobinurie", "CPK très élevées", "urines couleur thé cola", "insuffisance rénale musculaire"],
        sections: [
          {title: "Diagnostic et causes", items: [
            {text: "CPK > 5 × la normale (souvent > 10 000 UI/L en forme sévère) + myoglobinurie (urines thé ou cola) + risque d'insuffisance rénale aiguë par nécrose tubulaire", grade: "GPS"},
            {text: "Causes fréquentes : traumatisme musculaire (crush syndrome), hyperthermie maligne, coup de chaleur, convulsions prolongées, alcoolisme aigu, médicaments (statines + fibrates, antipsychotiques), hypokaliémie profonde", grade: "GPS"},
          ]},
          {title: "Traitement — hyperhydratation intensive", items: [
            {text: "Remplissage massif sérum physiologique : objectif diurèse 200 à 300 mL/heure jusqu'à urines claires — peut nécessiter 10 à 20 litres dans les 24 premières heures", grade: "1A"},
            {text: "Alcalinisation par bicarbonate de sodium si pH urinaire < 6,5 : peut prévenir la précipitation tubulaire de la myoglobine — pratique courante malgré l'absence de preuve en essai randomisé", grade: "2B"},
            {text: "Traiter les complications : hyperkaliémie (urgence), hypocalcémie (ne corriger que si symptomatique), acidose métabolique", grade: "1A"},
            {text: "Épuration extra-rénale si insuffisance rénale oligo-anurique persistante malgré hyperhydratation intensive", grade: "1A"},
          ]},
        ],
        source: "KDIGO AKI 2012 · Chavez Crit Care 2016 (revue rhabdomyolyse)"
      },
      {
        name: "Diabète Insipide Central",
        urgence: "URGENT",
        aliases: ["diabète insipide central", "polyurie réanimation", "hypernatrémie polyurie", "neurochirurgie polyurie", "déficit ADH"],
        sections: [
          {title: "Diagnostic", items: [
            {text: "Polyurie > 250 mL/heure × 2 heures + densité urinaire < 1,005 + osmolalité urinaire < 200 mOsmol/kg + hypernatrémie progressive — contexte : neurochirurgie hypophysaire, traumatisme crânien grave, mort encéphalique", grade: "GPS"},
          ]},
          {title: "Traitement", items: [
            {text: "Desmopressine (DDAVP — Minirin®) 1 à 4 µg SC ou IV toutes les 12 à 24 heures : analogue synthétique de l'ADH — normalise la polyurie en 30 à 60 minutes", grade: "1A"},
            {text: "Compensation des pertes hydriques : eau pure par sonde naso-gastrique ou glucosé 5% IV — formuler le déficit en eau libre : poids × 0,6 × [(natrémie/140) – 1] en litres", grade: "1A"},
            {text: "Objectif : corriger la natrémie progressivement (< 12 mmol/L par 24 heures) — hypernatrémie corrigée trop vite → œdème cérébral", grade: "1A"},
          ]},
        ],
        source: "EES Diabetes Insipidus Guidelines 2022 · Sterns Clin J Am Soc Nephrol 2018"
      },
      {
        name: "Hypophosphatémie Sévère",
        urgence: "URGENT",
        aliases: ["hypophosphatémie sévère", "phosphore bas réanimation", "syndrome renutrition hypophosphatémie", "sevrage ventilatoire difficile phosphore"],
        sections: [
          {title: "Causes et conséquences", items: [
            {text: "Hypophosphatémie sévère (< 0,32 mmol/L) : syndrome de renutrition (dénutrition + reprise nutritive), alcoolisme chronique, acidocétose diabétique traitée, sepsis grave, diarrhées prolongées, médicaments (antiacides à base d'aluminium)", grade: "GPS"},
            {text: "Conséquences : faiblesse musculaire et diaphragmatique (sevrage ventilatoire impossible), dysfonction myocardique, anémie hémolytique, encéphalopathie, dysfonction plaquettaire", grade: "GPS"},
          ]},
          {title: "Supplémentation IV urgente", items: [
            {text: "Phosphate de sodium ou de potassium IV 0,3 à 0,5 mmol/kg sur 4 à 6 heures si phosphatémie < 0,32 mmol/L avec symptômes — contrôle phosphatémie 4 heures après", grade: "1A"},
            {text: "Prévention du syndrome de renutrition : démarrer la nutrition à 10 kcal/kg/jour les 2 premiers jours chez le patient dénutri — supplémenter thiamine, potassium, magnésium et phosphore AVANT le démarrage", grade: "1A"},
          ]},
        ],
        source: "ASPEN/SCCM Refeeding Syndrome 2020 · NICE Guidelines Nutrition 2006"
      },
      {
        name: "Hypokaliémie Sévère",
        urgence: "URGENT",
        aliases: ["hypokaliémie sévère", "kaliémie basse", "hypokaliémie menaçante", "troubles du rythme hypokaliémie"],
        sections: [
          { title: "Gravité et signes", items: [
            { text: "Hypokaliémie sévère : kaliémie < 2,5 mmol/L, ou toute hypokaliémie avec signes ECG ou symptômes — risque de troubles du rythme ventriculaire (torsades de pointes), surtout si cardiopathie ou digitaliques", grade: "GPS" },
            { text: "ECG : aplatissement de l'onde T, apparition d'une onde U, sous-décalage ST, allongement du QT — risque d'arythmie ventriculaire grave", grade: "GPS" },
          ]},
          { title: "Traitement", items: [
            { text: "Voie IV si hypokaliémie sévère ou signes ECG : chlorure de potassium dilué, débit ne dépassant pas 1 à 1,5 g/h sur voie périphérique (idéalement voie centrale et scope si débit élevé)", grade: "1A" },
            { text: "NE JAMAIS injecter le KCl en bolus direct (risque d'arrêt cardiaque) — toujours dilué et perfusé lentement sous surveillance scopique", grade: "1A" },
            { text: "Corriger une hypomagnésémie associée (fréquente) : sans correction du magnésium, l'hypokaliémie est réfractaire à la supplémentation potassique", grade: "1A" },
            { text: "Rechercher et traiter la cause : pertes digestives, diurétiques, hyperaldostéronisme, transfert intracellulaire (alcalose, insuline, bêta-2-mimétiques)", grade: "GPS" },
          ]},
        ],
        source: "ESC/Lang Kaliémie 2020 · KDIGO · UK Renal Association Guidelines"
      },
      {
        name: "Hypernatrémie Sévère",
        urgence: "URGENT",
        aliases: ["hypernatrémie sévère", "natrémie élevée", "déshydratation intracellulaire", "hypernatrémie réanimation"],
        sections: [
          { title: "Diagnostic et mécanismes", items: [
            { text: "Hypernatrémie : natrémie > 145 mmol/L — traduit toujours un déficit en eau relatif au sodium (déshydratation intracellulaire) — sévère si > 160 mmol/L", grade: "GPS" },
            { text: "Causes en réanimation : pertes hydriques (diabète insipide, pertes digestives, hyperthermie, polyurie osmotique), apports sodés excessifs, défaut d'accès à l'eau (patient sédaté)", grade: "GPS" },
          ]},
          { title: "Correction prudente — risque d'œdème cérébral", items: [
            { text: "Calculer le déficit en eau libre : eau = poids × 0,6 × [(natrémie/140) − 1] en litres — corriger par eau libre (PO/SNG) ou glucosé 5% IV", grade: "1A" },
            { text: "Vitesse de correction : NE PAS dépasser 10 mmol/L par 24h (le cerveau s'adapte par accumulation d'osmoles ; une correction trop rapide provoque un œdème cérébral)", grade: "1A" },
            { text: "Hypernatrémie aiguë (< 48h) : correction plus rapide possible — Hypernatrémie chronique : correction lente impérative", grade: "1B" },
            { text: "Si diabète insipide central confirmé : desmopressine (Minirin®) — restaurer l'accès libre à l'eau chez le patient conscient", grade: "1A" },
          ]},
        ],
        source: "Adrogué NEJM 2000 · Sterns Clin J Am Soc Nephrol 2018 · ESE Guidelines"
      },
      {
        name: "Acidose Métabolique — Démarche Diagnostique",
        urgence: "URGENT",
        aliases: ["acidose métabolique", "trou anionique", "acidose lactique", "acidose hyperchlorémique", "diagnostic acidose"],
        sections: [
          { title: "Confirmer et caractériser", items: [
            { text: "Acidose métabolique : pH < 7,38 avec bicarbonates < 22 mmol/L — calculer le trou anionique : TA = Na − (Cl + HCO₃) — normale 8-12 mmol/L (corrigé selon l'albumine)", grade: "GPS" },
            { text: "Étape clé : distinguer acidose à TROU ANIONIQUE ÉLEVÉ (accumulation d'acides) vs trou anionique NORMAL/hyperchlorémique (perte de bicarbonates)", grade: "1A" },
          ]},
          { title: "Acidose à trou anionique élevé (mnémo : KUSMALE)", items: [
            { text: "Acidose lactique (lactates ↑) : choc, hypoxie tissulaire, metformine, défaillance hépatique — c'est la cause la plus fréquente en réanimation", grade: "GPS" },
            { text: "Acidocétose (diabétique, alcoolique, jeûne) — Insuffisance rénale (rétention d'acides) — Intoxications : méthanol, éthylène glycol, salicylés, paracétamol (5-oxoproline)", grade: "GPS" },
            { text: "Mesurer le trou osmolaire si suspicion d'intoxication par alcools toxiques (méthanol, éthylène glycol)", grade: "1B" },
          ]},
          { title: "Acidose à trou anionique normal (hyperchlorémique)", items: [
            { text: "Pertes digestives de bicarbonates (diarrhée, fistules) — acidoses tubulaires rénales — apport excessif de chlore (remplissage massif au sérum salé isotonique)", grade: "GPS" },
            { text: "Traitement étiologique avant tout — alcalinisation par bicarbonate de sodium réservée aux acidoses sévères (pH < 7,10-7,15) ou à l'acidose hyperchlorémique avec insuffisance rénale (essai BICAR-ICU)", grade: "2B" },
          ]},
        ],
        source: "Jaber Lancet 2018 (BICAR-ICU) · Kraut NEJM 2014 · SRLF"
      },
      {
        name: "Syndrome de Levée d'Obstacle (Polyurie Post-Obstructive)",
        urgence: "SURVEILLANCE",
        aliases: ["syndrome de levée d'obstacle", "polyurie post-obstructive", "levée d'obstacle urinaire", "drainage vésical rétention"],
        sections: [
          { title: "Mécanisme", items: [
            { text: "Polyurie majeure survenant après la levée d'un obstacle urinaire chronique (drainage d'une rétention aiguë, dérivation d'une obstruction bilatérale) — par perte transitoire du pouvoir de concentration et diurèse osmotique (urée accumulée)", grade: "GPS" },
            { text: "Risque de déshydratation, d'hypovolémie et de troubles ioniques sévères (hypokaliémie, hyponatrémie, hypomagnésémie) si les pertes ne sont pas compensées", grade: "GPS" },
          ]},
          { title: "Prise en charge", items: [
            { text: "Surveillance horaire de la diurèse, du poids, de la pression artérielle et ionogramme répété — quantifier les pertes", grade: "1B" },
            { text: "Compensation hydro-électrolytique adaptée aux pertes (en général la moitié à deux tiers du volume uriné, par soluté adapté au ionogramme urinaire) — éviter la surcompensation qui entretient la polyurie", grade: "1B" },
            { text: "Décompression vésicale prudente en cas de rétention chronique volumineuse (risque d'hématurie a vacuo) — la polyurie est habituellement spontanément résolutive en quelques jours", grade: "GPS" },
          ]},
        ],
        source: "Recommandations AFU · Halbgewachs Can Fam Physician 2015"
      },
      {
        name: "Syndrome de Renutrition Inappropriée (Refeeding Syndrome)",
        urgence: "URGENT",
        aliases: ["syndrome de renutrition", "refeeding syndrome", "renutrition inappropriée", "hypophosphorémie renutrition", "complication renutrition dénutri"],
        sections: [
          { title: "Mécanisme et patients à risque", items: [
            { text: "Complication métabolique de la renutrition d'un patient dénutri : la reprise des apports glucidiques entraîne un transfert intracellulaire massif de phosphore, potassium et magnésium, avec carence aiguë en thiamine (B1)", grade: "GPS" },
            { text: "À risque : dénutrition sévère, jeûne prolongé (> 5-10 jours), alcoolisme, anorexie mentale, chirurgie bariatrique, cancer, post-réanimation prolongée", grade: "GPS" },
            { text: "Manifestations : hypophosphorémie profonde (signe biologique cardinal), troubles du rythme, défaillance cardiaque, troubles neurologiques, détresse respiratoire", grade: "GPS" },
          ]},
          { title: "Prévention et prise en charge", items: [
            { text: "Reprise PROGRESSIVE et prudente des apports caloriques chez le patient à risque (débuter bas, ~10 kcal/kg/j, augmenter sur plusieurs jours)", grade: "1A" },
            { text: "Supplémentation en thiamine (vitamine B1) AVANT tout apport glucidique, et supplémentation préventive en phosphore, potassium et magnésium", grade: "1A" },
            { text: "Surveillance biologique rapprochée du phosphore, potassium, magnésium pendant la phase de renutrition — correction des déficits avant et pendant", grade: "1A" },
            { text: "Surveillance scopée (risque d'arythmie) dans les formes sévères — ne pas interrompre la nutrition mais ralentir et corriger", grade: "1B" },
          ]},
        ],
        source: "NICE Nutrition Support CG32 · Friedli Nutrition 2017 · SFNCM"
      },
      {
        name: "Syndrome de Défaillance Multiviscérale (SDMV)",
        urgence: "URGENT",
        aliases: ["syndrome de défaillance multiviscérale", "SDMV", "défaillance multiviscérale", "MODS", "défaillance multi-organes"],
        sections: [
          { title: "Définition et physiopathologie", items: [
            { text: "Défaillance simultanée ou successive d'au moins deux systèmes d'organes, ne pouvant maintenir l'homéostasie sans intervention thérapeutique — quantifié par le score SOFA", grade: "GPS" },
            { text: "Causes principales : sepsis (première cause), choc prolongé, ischémie-reperfusion, polytraumatisme, pancréatite grave — réponse inflammatoire systémique dérégulée", grade: "GPS" },
            { text: "La mortalité augmente avec le nombre d'organes défaillants et la durée des défaillances", grade: "GPS" },
          ]},
          { title: "Principes de prise en charge", items: [
            { text: "Traitement étiologique impératif et précoce (contrôle de la source infectieuse, revascularisation, hémostase) — c'est le déterminant pronostique majeur", grade: "1A" },
            { text: "Support de chaque défaillance d'organe : ventilation protectrice, support hémodynamique, épuration extra-rénale, correction des troubles métaboliques et de l'hémostase", grade: "1A" },
            { text: "Éviter les défaillances iatrogènes (ventilation, sur-remplissage, néphrotoxiques, surdosages médicamenteux) — approche d'épargne d'organe", grade: "1B" },
            { text: "Réévaluation pluriquotidienne du SOFA et des objectifs thérapeutiques — discuter la proportionnalité des soins si aggravation réfractaire", grade: "GPS" },
          ]},
        ],
        source: "Singer JAMA 2016 (Sepsis-3) · Vincent Lancet 2013 · SRLF"
      },
      {
        name: "Syndrome Post-Réanimation (PICS) et Sevrage Prolongé",
        urgence: "SURVEILLANCE",
        aliases: ["syndrome post-réanimation", "PICS", "post intensive care syndrome", "séquelles de réanimation", "sevrage prolongé réanimation"],
        sections: [
          { title: "Définition", items: [
            { text: "Le syndrome post-réanimation (PICS) regroupe les séquelles physiques, cognitives et psychiatriques apparaissant après un séjour en réanimation et persistant au-delà", grade: "GPS" },
            { text: "Trois composantes : physique (neuromyopathie de réanimation, déconditionnement), cognitive (troubles de mémoire, des fonctions exécutives), psychique (anxiété, dépression, stress post-traumatique)", grade: "GPS" },
          ]},
          { title: "Prévention pendant le séjour", items: [
            { text: "Application du bundle ABCDEF : allègement de la sédation, réveil et ventilation spontanée quotidiens, prévention/dépistage du delirium (CAM-ICU), mobilisation précoce", grade: "1A" },
            { text: "Limiter la sédation profonde et prolongée, privilégier l'analgésie, maintenir le cycle nycthéméral, impliquer la famille", grade: "1B" },
          ]},
          { title: "Sevrage ventilatoire prolongé et suivi", items: [
            { text: "Sevrage difficile/prolongé : échec de 3 épreuves de ventilation spontanée ou ventilation > 7 jours après le premier essai — rechercher cause cardiaque, neuromusculaire, métabolique", grade: "1B" },
            { text: "Organiser le suivi post-réanimation (consultation dédiée) pour dépister et prendre en charge les séquelles — information du patient et des proches", grade: "GPS" },
          ]},
        ],
        source: "Needham CCM 2012 (PICS) · WEAN-SAFE Lancet Respir Med 2023 · SRLF"
      },
    ]
  },
  {
    id: "toxico", label: "Toxicologie Réanimation", short: "TOXICO", iconName: "skull", color: C.green, bgColor: C.greenBg,
    protos: [
      {
        name: "Intoxication au Paracétamol",
        urgence: "URGENT",
        aliases: ["intoxication paracétamol", "surdosage paracétamol", "overdose acétaminophène", "hépatotoxicité médicament", "NAC antidote"],
        sections: [
          { title: "Évaluation du risque hépatotoxique", items: [
            { text: "Dosage plasmatique du paracétamol à la 4ème heure minimum après l'ingestion — utiliser le nomogramme de Rumack-Matthew pour décider du traitement", grade: "1A" },
            { text: "Démarrer la N-Acétylcystéine SANS ATTENDRE le dosage si : ingestion massive documentée, heure d'ingestion inconnue, délai > 8 heures, ou insuffisance hépatique préexistante", grade: "1A" },
          ]},
          { title: "N-Acétylcystéine (Acetadote®) — antidote de référence", items: [
            { text: "Protocole en 3 phases : 1ère perfusion 150 mg/kg dans 200 mL glucose 5% sur 1 heure — 2ème perfusion 50 mg/kg dans 500 mL glucose 5% sur 4 heures — 3ème perfusion 100 mg/kg dans 1 000 mL glucose 5% sur 16 heures", grade: "1A" },
            { text: "Efficacité maximale dans les 8 heures — efficacité maintenue jusqu'à 24 heures et au-delà si hépatite constituée", grade: "1B" },
          ], hasDoseCalc: true, drugs: [
            { name: "NAC 1ère perfusion (sur 1 heure)", detail: "150 mg/kg dans 200 mL G5%", perKg: 150, unit: "mg", round: 0 },
            { name: "NAC 2ème perfusion (sur 4 heures)", detail: "50 mg/kg dans 500 mL G5%", perKg: 50, unit: "mg", round: 0 },
            { name: "NAC 3ème perfusion (sur 16 heures)", detail: "100 mg/kg dans 1000 mL G5%", perKg: 100, unit: "mg", round: 0 },
          ]},
          { title: "Surveillance et critères de transplantation", items: [
            { text: "Bilan hépatique + INR + créatinine toutes les 12 à 24 heures", grade: "1A" },
            { text: "Critères de King's College pour la transplantation urgente : pH artériel < 7,30 après réanimation — OU les 3 critères suivants réunis : INR > 6,5 + créatinine > 300 µmol/L + encéphalopathie hépatique de grade III ou IV", grade: "1B" },
          ]},
        ],
        source: "Recommandations SNFGE/EASL Acute Liver Failure 2017 · Wong Clin Toxicol 2023 (NAC) · Rumack nomogramme"
      },
      {
        name: "Intoxication aux Bêtabloquants et Inhibiteurs Calciques",
        urgence: "ABSOLUE",
        aliases: ["intoxication bêtabloquants", "surdosage propranolol métoprolol", "surdosage vérapamil diltiazem", "bradycardie toxique médicament", "choc cardiogénique toxique"],
        sections: [
          { title: "Décontamination", items: [
            { text: "Charbon activé (Carbomix®) 50 g par voie orale ou sonde nasogastrique si ingestion < 1 à 2 heures ET patient conscient protégeant ses voies aériennes", grade: "1B" },
          ]},
          { title: "Insulinothérapie euglycémique haute dose — traitement de référence", items: [
            { text: "Insuline rapide 1 unité/kg en bolus intraveineux direct, puis 1 unité/kg/heure par seringue électrique — efficace pour les inhibiteurs calciques ET les bêtabloquants lipophiles", grade: "1B" },
            { text: "Associer glucose 10% pour maintenir la glycémie entre 8 et 14 mmol/L — surveiller la kaliémie (risque d'hypokaliémie)", grade: "1B" },
          ], hasDoseCalc: true, drugs: [
            { name: "Insuline rapide bolus initial", detail: "1 UI/kg IV direct", perKg: 1, unit: "UI", round: 0 },
            { name: "Insuline rapide entretien IVSE", detail: "1 UI/kg/heure", perKg: 1, unit: "UI/h", round: 1 },
          ]},
          { title: "Glucagon (spécifique des bêtabloquants)", items: [
            { text: "Glucagon 3 à 10 mg en injection intraveineuse directe, puis 3 à 10 mg/heure par seringue électrique — contourne les récepteurs bêta bloqués via une voie AMPc indépendante — antiémétique systématique", grade: "2B" },
          ]},
          { title: "Émulsion lipidique et escalade thérapeutique", items: [
            { text: "Intralipid® 20% 1,5 mL/kg en bolus intraveineux si bêtabloquants lipophiles (propranolol, métoprolol) — séquestre le médicament dans une phase lipidique", grade: "2B" },
            { text: "Assistance circulatoire extracorporelle (ECMO veno-artérielle) si choc réfractaire à toutes les mesures médicales", grade: "GPS" },
          ]},
        ],
        source: "St-Onge Crit Care Med 2017 (consensus HIET) · Engebretsen Clin Toxicol 2011 · EXTRIP"
      },
      {
        name: "Intoxication aux Antidépresseurs Tricycliques",
        urgence: "ABSOLUE",
        aliases: ["intoxication tricycliques", "surdosage amitriptyline imipramine", "QRS large toxique médicament", "convulsions antidépresseurs"],
        sections: [
          { title: "Indication du bicarbonate de sodium", items: [
            { text: "QRS > 100 ms OU hypotension OU arythmie ventriculaire → bicarbonate de sodium 8,4% : 50 à 100 mL en injection intraveineuse directe (1 à 2 mmol/kg)", grade: "1B" },
            { text: "Objectif alcalinisation : pH artériel 7,45 à 7,55 — bicarbonate de sodium par seringue électrique si acidose persistante", grade: "1B" },
          ]},
          { title: "Contre-indications formelles", items: [
            { text: "Antiarythmiques de classe Ia et Ic (aggrave le trouble de conduction) — Flumazénil — Physostigmine — Phénytoïne si convulsions (aggrave la conduction)", grade: "1A" },
            { text: "Convulsions → benzodiazépines uniquement", grade: "1A" },
          ]},
          { title: "Traitement du choc et arrêt cardiaque réfractaire", items: [
            { text: "Emulsion lipidique Intralipid® 20% 1,5 mL/kg en bolus si arrêt cardiaque réfractaire", grade: "GPS" },
            { text: "Dialyse INEFFICACE (liaison aux protéines plasmatiques > 95%) — ECMO veno-artérielle si arrêt cardiaque réfractaire", grade: "GPS" },
          ]},
        ],
        source: "Goldfrank's Toxicologic Emergencies 11th ed. · ACMT Guidelines · EXTRIP Workgroup"
      },
      {
        name: "Intoxication aux Organophosphorés et Carbamates",
        urgence: "ABSOLUE",
        aliases: ["organophosphorés", "pesticides intoxication", "insecticides", "gaz neurotoxique", "sarin", "syndrome cholinergique", "SLUDGE"],
        sections: [
          { title: "Syndrome cholinergique — mnémotechnique SLUDGE", items: [
            { text: "Salivation — Larmoiement — Urination — Défécation — crampes Gastro-intestinales — Émèse + bradycardie, bronchospasme, miosis, sueurs profuses", grade: "GPS" },
            { text: "Protection du personnel OBLIGATOIRE — décontamination cutanée immédiate : retirer tous les vêtements, lavage peau et muqueuses à l'eau et au savon abondamment", grade: "1A" },
          ]},
          { title: "Atropine — pas de dose maximale en intoxication sévère", items: [
            { text: "Atropine 2 à 4 mg en injection intraveineuse directe toutes les 5 à 10 minutes jusqu'à disparition des sécrétions bronchiques (objectif = bronches sèches) — doses massives possibles (50 à 100 mg en intoxication grave)", grade: "1A" },
            { text: "L'atropine traite les effets muscariniques (sécrétions, bradycardie) mais PAS les effets nicotiniques (fasciculations, paralysie musculaire)", grade: "GPS" },
          ]},
          { title: "Pralidoxime — réactivateur de l'acétylcholinestérase", items: [
            { text: "Pralidoxime (Contrathion®) 1 à 2 g en perfusion intraveineuse sur 15 à 30 minutes, puis 0,5 g/heure — efficace si administré dans les 24 à 48 premières heures (avant le vieillissement irréversible de l'enzyme)", grade: "1B" },
            { text: "Intubation précoce si hypersécrétion bronchique massive ou insuffisance respiratoire — Benzodiazépines si convulsions", grade: "1A" },
          ]},
        ],
        source: "Eddleston Lancet 2008 (réf.) · Eddleston BMJ 2020 (mise à jour) · WHO"
      },
      {
        name: "Intoxication aux Opiacés — Surdosage",
        urgence: "ABSOLUE",
        aliases: ["surdosage opiacés", "overdose morphine héroïne", "intoxication morphinique", "dépression respiratoire opiacés", "naloxone antidote"],
        sections: [
          { title: "Triade du surdosage aux opiacés", items: [
            { text: "Triade classique : dépression respiratoire (fréquence < 12/minute) + coma (réponse à la douleur) + myosis bilatéral en myosis en tête d'épingle", grade: "GPS" },
          ]},
          { title: "Naloxone — antidote spécifique", items: [
            { text: "Naloxone (Narcan®) 0,4 mg en injection intraveineuse directe — répéter toutes les 2 à 3 minutes si réponse insuffisante — titration pour obtenir une fréquence respiratoire > 12/minute (éviter le sevrage brutal)", grade: "1A" },
            { text: "Si pas de voie veineuse : naloxone intramusculaire ou intranasale (0,8 mg par narine) — aussi efficace (études pré-hospitalières)", grade: "1A" },
            { text: "Naloxone par seringue électrique 0,4 à 0,8 mg/heure si intoxication aux opiacés à longue durée d'action (méthadone, fentanyl transdermique) — durée d'action du naloxone < durée de l'opiacé", grade: "1B" },
          ]},
          { title: "Surveillance et mesures associées", items: [
            { text: "Surveillance minimum 4 heures après la dernière injection de naloxone — hospitalisation si opiacé à longue durée d'action ou antécédents de surdosages répétés", grade: "GPS" },
            { text: "Si arrêt cardiaque sur surdosage d'opiacés : réanimation cardio-pulmonaire + naloxone 2 mg IV (ou intraosseux)", grade: "GPS" },
          ]},
        ],
        source: "WHO Opioid Overdose Guidelines 2014 · Aboubaker NEJM 2023 (pré-hospitalier naloxone)"
      },
      {
        name: "Intoxication aux Digitaliques — Surdosage Digoxine",
        urgence: "URGENT",
        aliases: ["intoxication digitaliques", "digoxine toxicité", "surdosage digoxine", "bradycardie BAV digitaliques", "digoxinémie élevée"],
        sections: [
          { title: "Diagnostic biologique et ECG", items: [
            { text: "Digoxinémie plasmatique : zone toxique > 3 ng/mL (efficace 0,5 à 2 ng/mL) — mesurer au minimum 6 heures après la dernière prise", grade: "GPS" },
            { text: "ECG : bradycardie sinusale, blocs auriculo-ventriculaires (tout degré), arythmies ventriculaires (bigéminisme, extrasystoles) — aspect cupuliforme du segment ST", grade: "GPS" },
            { text: "Ionogramme : hypokaliémie potentialise la toxicité — hypercalcémie idem — insuffisance rénale entraîne une accumulation", grade: "1A" },
          ]},
          { title: "Traitement", items: [
            { text: "Atropine 0,5 à 1 mg IV si bradycardie symptomatique — stimulation électrosystolique si atropine insuffisante (éviter l'isoprénaline)", grade: "1B" },
            { text: "Corriger l'hypokaliémie même si kaliémie normale-basse : cible K⁺ > 4 mmol/L — l'hypokaliémie potentialise la toxicité digitalique", grade: "1A" },
            { text: "Charbon activé 50 g par voie orale si ingestion < 2 heures — cycle entéro-hépatique des digitaliques (plusieurs doses de charbon efficaces)", grade: "1B" },
          ]},
          { title: "Antidote — Fragments Fab anti-digoxine (Digifab®)", items: [
            { text: "Indications absolues : bradycardie réfractaire avec instabilité hémodynamique, arythmies ventriculaires graves, kaliémie > 5 mmol/L dans une intoxication aiguë", grade: "1A" },
            { text: "Dose Digifab® : selon la quantité ingérée ou la digoxinémie — formule simplifiée : digoxinémie (ng/mL) × poids (kg) / 100 = nombre de flacons de 80 mg", grade: "GPS" },
          ]},
        ],
        source: "Goldfrank's 11th ed. · EXTRIP Workgroup Digoxin 2016"
      },
      {
        name: "Méthémoglobinémie Aiguë",
        urgence: "URGENT",
        aliases: ["méthémoglobinémie", "cyanose réfractaire oxygène médicament", "nitrites toxicité", "bleu méthylène antidote", "sang couleur chocolat"],
        sections: [
          { title: "Diagnostic", items: [
            { text: "Cyanose réfractaire à l'oxygène pur — SpO₂ faussement élevée (pulse-oxymètre lit environ 85% quelle que soit la vraie saturation) — sang de couleur chocolat brun", grade: "GPS" },
            { text: "Co-oxymétrie artérielle OBLIGATOIRE (pas le simple gazomètre) : mesure directe de la méthémoglobine — seuil symptomatique > 20%, urgent > 30%, fatal > 70%", grade: "1A" },
            { text: "Causes : nitrites (poppers, eau contaminée), dapsone, benzocaïne, prilocaïne, nitrodérivés, métoclopramide à forte dose", grade: "GPS" },
          ]},
          { title: "Traitement", items: [
            { text: "Bleu de méthylène (Proveblue®) 1 à 2 mg/kg en injection intraveineuse sur 5 minutes — efficace en 30 à 60 minutes — répéter à 1 mg/kg si insuffisant", grade: "1A" },
            { text: "CONTRE-INDICATIONS au bleu de méthylène : déficit en G6PD (risque d'hémolyse grave) — patient sous inhibiteurs de la recapture de la sérotonine (risque syndrome sérotoninergique)", grade: "1A" },
            { text: "Oxygène à haut débit systématique — transfusions ou échanges transfusionnels si méthémoglobinémie > 70% ou bleu de méthylène inefficace (déficit G6PD)", grade: "GPS" },
          ], hasDoseCalc: true, drugs: [
            { name: "Bleu de méthylène (Proveblue®)", detail: "1–2 mg/kg IV sur 5 min", perKg: 1.5, unit: "mg", round: 0 },
          ]},
        ],
        source: "Cortazzo J Cardiothorac Vasc Anesth 2014 (revue) · TOXBASE · BABS"
      },
      {
        name: "Hyperthermie Maligne d'Effort et Coup de Chaleur",
        urgence: "ABSOLUE",
        aliases: ["coup de chaleur", "hyperthermie maligne effort", "heat stroke", "temperature > 40 confusion chaleur", "sport hyperthermie"],
        sections: [
          { title: "Diagnostic", items: [
            { text: "Température centrale > 40°C + dysfonction du système nerveux central (confusion, agitation, coma) — coup de chaleur classique (personnes âgées, fortes chaleurs) ou d'effort (sportifs)", grade: "GPS" },
            { text: "Complications précoces : rhabdomyolyse (créatine phosphokinase élevées), insuffisance rénale aiguë, coagulation intravasculaire disséminée, insuffisance hépatocellulaire, syndrome de détresse respiratoire aiguë", grade: "GPS" },
          ]},
          { title: "Refroidissement — urgence absolue (chaque minute compte)", items: [
            { text: "Refroidissement externe actif immédiat : aspersion d'eau froide + ventilation forcée ou immersion si disponible — cible température < 39°C en moins de 30 minutes", grade: "1A" },
            { text: "Packs de glace dans les zones vasculaires (cou, aisselles, aines) — technique la plus rapide si pas d'immersion", grade: "1A" },
            { text: "ÉVITER les antipyrétiques (paracétamol, AINS) : mécanisme différent de la fièvre infectieuse — inefficaces et potentiellement délétères", grade: "1A" },
          ]},
          { title: "Réanimation", items: [
            { text: "Hydratation IV : 1 à 2 litres de sérum physiologique dans la première heure — objectif diurèse > 1 mL/kg/heure (prévention insuffisance rénale sur rhabdomyolyse)", grade: "1A" },
            { text: "Benzodiazépines si convulsions ou frissons intenses (qui augmentent la thermogenèse)", grade: "GPS" },
          ]},
        ],
        source: "Bouchama NEJM 2022 (Heat Stroke review) · Epstein NEJM 2019 · Leon CCM 2015"
      },
      {
        name: "Intoxication au Monoxyde de Carbone",
        urgence: "ABSOLUE",
        aliases: ["intoxication CO", "monoxyde de carbone", "carboxyhémoglobine", "intoxication gaz chauffage", "empoisonnement barbecue"],
        sections: [
          {title: "Diagnostic — SpO₂ faussement normale", items: [
            {text: "La SpO₂ au pulse-oxymètre est FAUSSEMENT NORMALE — seule la co-oxymétrie artérielle mesure la carboxyhémoglobine (COHb) — PRESCRIRE UN GAZ DU SANG ARTÉRIEL co-oxymètre", grade: "1A"},
            {text: "Signes cliniques selon COHb : 10–20% = céphalées, vertiges — 20–40% = nausées, confusion — 40–60% = coma, convulsions — > 60% = mort", grade: "GPS"},
          ]},
          {title: "Traitement — oxygénothérapie à 100%", items: [
            {text: "Oxygène 100% au masque haute concentration IMMÉDIATEMENT : réduit la demi-vie du CO de 4 à 5 heures (air ambiant) à 60 à 90 minutes", grade: "1A"},
            {text: "Oxygénothérapie hyperbare (HBO) — indications : COHb > 25%, perte de conscience (même brève), grossesse (toute COHb > 10%), signes neurologiques ou cardiaques, enfant COHb > 10% — contacter le centre de caisson hyperbare le plus proche", grade: "1B"},
            {text: "Intubation + ventilation FiO₂ 1,0 si coma ou convulsions : demi-vie CO réduite à 20 à 30 minutes — évacuation immédiate du lieu + déclaration si intoxication collective", grade: "1A"},
          ]},
        ],
        source: "Rose Am J Respir Crit Care Med 2017 (revue CO) · Weaver NEJM 2009 · SPILF"
      },
      {
        name: "Intoxication au Lithium",
        urgence: "URGENT",
        aliases: ["intoxication lithium", "surdosage lithium", "lithémie toxique", "tremblement ataxie lithium", "IRC lithémie élevée"],
        sections: [
          {title: "Diagnostic", items: [
            {text: "Lithémie thérapeutique 0,6 à 1,2 mmol/L — toxique > 1,5 mmol/L — potentiellement fatal > 2,5 mmol/L — corrélation clinique parfois médiocre (intoxication chronique plus grave que l'aiguë à lithémie identique)", grade: "GPS"},
            {text: "Syndrome neurotoxique par ordre d'aggravation : tremblements fins → ataxie cérébélleuse → confusion → convulsions → coma — séquelles définitives possibles (syndrome SILENT : Syndrome of Irreversible Lithium-Effectuated NeuroToxicity)", grade: "GPS"},
            {text: "Facteurs favorisants : déshydratation, AINS, IEC, sartans, diurétiques thiazidiques, insuffisance rénale — réduisent l'élimination rénale du lithium", grade: "GPS"},
          ]},
          {title: "Traitement", items: [
            {text: "ARRÊT du lithium — hyperhydratation sérum physiologique : cible diurèse 1 à 2 mL/kg/heure — le lithium est éliminé exclusivement par voie rénale", grade: "1A"},
            {text: "Hémodialyse urgente si lithémie > 2,5 mmol/L avec signes neurologiques, ou > 4 mmol/L, ou insuffisance rénale — méthode la plus efficace", grade: "1A"},
            {text: "Contrôle de la lithémie après chaque séance : rebond par redistribution tissulaire fréquent — peut nécessiter plusieurs séances de dialyse", grade: "GPS"},
            {text: "Charbon activé INEFFICACE : le lithium n'est pas adsorbé", grade: "1A"},
          ]},
        ],
        source: "EXTRIP Workgroup Lithium 2015 · Waring Clin J Med 2007"
      },
      {
        name: "Intoxication à l'Alcool Méthylique (Méthanol)",
        urgence: "ABSOLUE",
        aliases: ["intoxication méthanol", "alcool méthylique", "faux alcool artisanal", "acidose trou anionique alcool", "cécité acidose ingestion alcool"],
        sections: [
          {title: "Diagnostic — latence trompeuse", items: [
            {text: "Latence de 12 à 24 heures après l'ingestion (temps de métabolisation en acide formique) — puis : acidose métabolique sévère à trou anionique élevé + toxicité oculaire (flou visuel, cécité irréversible) + trou osmolaire élevé", grade: "GPS"},
            {text: "Biologie : acidose métabolique avec trou anionique très élevé + trou osmolaire élevé (méthanol non métabolisé) — dosage méthanol si disponible", grade: "1A"},
          ]},
          {title: "Traitement — bloquer le métabolisme en urgence", items: [
            {text: "Fomépizole (Fomépizole Aguettant®) 15 mg/kg IV en dose de charge sur 30 minutes : inhibiteur de l'alcool-déshydrogénase — traitement de référence — disponible dans les centres antipoison", grade: "1A"},
            {text: "Éthanol intraveineux si fomépizole indisponible : compétition avec le méthanol pour l'alcool-déshydrogénase — objectif alcoolémie 1 à 1,5 g/L", grade: "1B"},
            {text: "Hémodialyse urgente si acidose sévère (pH < 7,25), atteinte visuelle documentée, méthanol sanguin > 15,6 mmol/L, insuffisance rénale", grade: "1A"},
            {text: "Acide folinique (Lederfoline®) 50 mg IV toutes les 4 heures : accélère le métabolisme de l'acide formique en CO₂ — administrer dans tous les cas", grade: "GPS"},
          ]},
        ],
        source: "EXTRIP Workgroup Methanol 2019 · Barceloux Clin Toxicol 2002"
      },
    ]
  },
  {
    id: "psy", label: "Psychiatrie & Toxidromes", short: "PSY/TOX", iconName: "mind", color: C.indigo, bgColor: C.indigoBg,
    protos: [
      {
        name: "Agitation Sévère — Sédation d'Urgence",
        urgence: "URGENT",
        aliases: ["agitation sévère", "agitation psychomotrice", "contention médicale urgence", "délire agité réanimation", "sédation urgence psychiatrie"],
        sections: [
          { title: "Évaluation avant sédation — exclure une cause organique", items: [
            { text: "Glycémie capillaire — saturation en oxygène — électrocardiogramme — exclure : hypoglycémie, hypoxémie, cause neurologique ou métabolique (neuf causes organiques à éliminer avant de conclure à une cause psychiatrique)", grade: "GPS" },
          ]},
          { title: "Sédation médicamenteuse d'urgence", items: [
            { text: "Kétamine (Kétalar®) 4 mg/kg en injection intramusculaire : sédation dissociative rapide, maintien des réflexes protecteurs des voies aériennes — agent de choix si voie veineuse impossible", grade: "1B" },
            { text: "Midazolam (Hypnovel®) 5 à 10 mg en injection intramusculaire ou intraveineuse : benzodiazépine d'action rapide — risque de dépression respiratoire (oxymétrie obligatoire)", grade: "1B" },
            { text: "Dropéridol (Droleptan®) 5 à 10 mg en injection intramusculaire ou intraveineuse : neuroleptique sédatif pour agitation d'origine psychotique — surveillance électrocardiographique (allongement QT)", grade: "1B" },
          ], hasDoseCalc: true, drugs: [
            { name: "Kétamine IM (si voie veineuse impossible)", detail: "4 mg/kg IM", perKg: 4, unit: "mg", round: 0 },
            { name: "Kétamine IV (si voie veineuse disponible)", detail: "1,5 mg/kg IV", perKg: 1.5, unit: "mg", round: 0 },
          ]},
        ],
        source: "SRLF/SFMU Sédation-Analgésie 2020 · PAD Guidelines 2018"
      },
      {
        name: "Syndrome Sérotoninergique",
        urgence: "ABSOLUE",
        aliases: ["syndrome sérotoninergique", "hyperthermie sérotoninergique", "ISRS surdosage", "tramadol toxicité", "clonus hyperréflexie hyperthermie"],
        sections: [
          { title: "Triade diagnostique de Hunter", items: [
            { text: "Triade : hyperactivité neuromusculaire (clonus, hyperréflexie, myoclonies, tremblements) + altération de la conscience (agitation, confusion, coma) + instabilité du système nerveux autonome (hyperthermie, tachycardie, sueurs, diarrhée)", grade: "GPS" },
            { text: "Gravité proportionnelle à l'hyperthermie : température ≥ 41°C = forme sévère avec risque vital immédiat", grade: "GPS" },
          ]},
          { title: "Traitement", items: [
            { text: "ARRÊT IMMÉDIAT de tous les médicaments sérotoninergiques (inhibiteurs de la recapture de la sérotonine, tramadol, linézolide, bleu de méthylène...)", grade: "1A" },
            { text: "Cyproheptadine (Périactine®) 12 mg par voie orale ou sonde nasogastrique immédiatement, puis 2 mg toutes les 2 heures (maximum 32 mg/jour) : antagoniste des récepteurs sérotoninergiques 5-HT2A", grade: "2B" },
            { text: "Contrôle de l'hyperthermie : refroidissement physique actif — benzodiazépines pour l'hyperactivité musculaire — curarisation + intubation si température > 40°C réfractaire", grade: "1B" },
          ]},
        ],
        source: "Boyer NEJM 2005 (critères de Hunter, réf.) · Scotton Ochsner J 2019 (revue)"
      },
      {
        name: "Syndrome Malin des Neuroleptiques",
        urgence: "ABSOLUE",
        aliases: ["syndrome malin neuroleptiques", "hyperthermie neuroleptiques", "rigidité extrapyramidale hyperthermie", "antipsychotique rhabdomyolyse CPK"],
        sections: [
          { title: "Tétrade diagnostique", items: [
            { text: "Hyperthermie élevée (> 38,5°C) + rigidité musculaire extrapyramidale (type roue dentée ou plastique) + trouble de la conscience (confusion, stupeur) + instabilité végétative — évolution sur 24 à 72 heures sous neuroleptiques", grade: "GPS" },
            { text: "Créatine phosphokinase (CPK) > 1 000 UI/L (rhabdomyolyse) + hyperleucocytose — éliminer méningite, encéphalite, syndrome sérotoninergique", grade: "GPS" },
          ]},
          { title: "Traitement", items: [
            { text: "ARRÊT IMMÉDIAT et définitif de tous les neuroleptiques ou reprise de la L-dopa si sevrage brutal", grade: "1A" },
            { text: "Dantrolène (Dantrium®) 1 à 2,5 mg/kg en injection intraveineuse (maximum 10 mg/kg/jour) : relaxant musculaire direct", grade: "2B" },
            { text: "Bromocriptine (Parlodel®) 2,5 à 10 mg × 3/jour par sonde nasogastrique : agoniste dopaminergique — peut accélérer la résolution", grade: "2B" },
            { text: "Refroidissement physique actif, benzodiazépines, hydratation abondante pour prévenir l'insuffisance rénale sur rhabdomyolyse", grade: "1B" },
          ]},
        ],
        source: "Gurrera Acad Emerg Med 2011 (critères) · Ware Innov Clin Neurosci 2018 (revue)"
      },
      {
        name: "Sevrage Alcoolique Grave — Delirium Tremens",
        urgence: "ABSOLUE",
        aliases: ["delirium tremens", "sevrage alcoolique", "alcoolisme sevrage aigu", "hallucinations alcooliques", "convulsions sevrage alcool"],
        sections: [
          { title: "Évaluation — Score CIWA-Ar", items: [
            { text: "Score CIWA-Ar évalue 10 items (agitation, anxiété, sudation, tremblements, troubles perceptifs, céphalées, nausées, orientation) — Score > 20 : sevrage sévère nécessitant hospitalisation en réanimation", grade: "GPS" },
            { text: "Delirium tremens : confusion + hallucinations + tremblements + fièvre + tachycardie — Mortalité sans traitement 15% — Délai classique : 48 à 72 heures après le dernier verre", grade: "GPS" },
          ]},
          { title: "Benzodiazépines — traitement de référence", items: [
            { text: "Diazépam (Valium®) 10 à 20 mg par voie orale ou intraveineuse — répéter toutes les 30 à 60 minutes jusqu'à sédation légère et disparition des tremblements — pas de dose maximale en delirium tremens sévère", grade: "1A" },
            { text: "Lorazépam (Ativan®) si insuffisance hépatocellulaire sévère (métabolisme moins dépendant du foie) : 2 à 4 mg intraveineux", grade: "1B" },
            { text: "Phénobarbital en cas de résistance aux benzodiazépines : 130 à 260 mg intraveineux — utile en delirium tremens réfractaire", grade: "2B" },
          ]},
          { title: "Mesures associées", items: [
            { text: "Thiamine (Bévitine®) 500 mg en perfusion intraveineuse sur 30 minutes × 3 fois par jour pendant 3 jours AVANT tout apport glucidique — prévention de l'encéphalopathie de Gayet-Wernicke", grade: "1A" },
            { text: "Remplissage vasculaire, correction des troubles hydroélectrolytiques — magnésium IV si magnésémie basse (facteur de résistance aux benzodiazépines)", grade: "1A" },
            { text: "Prophylaxie antiépileptique : discutée — valproate ou lévétiracétam si antécédent de convulsions de sevrage", grade: "2B" },
          ]},
        ],
        source: "SFAR/SFA Sevrage Alcoolique 2019 · Mayo-Smith JAMA 1997;278:144 · CIWA-Ar Sullivan 1989"
      },
      {
        name: "Sédation-Analgésie en Réanimation — Protocole ABCDEF",
        urgence: "SURVEILLANCE",
        aliases: ["sédation réanimation", "RASS analgosédation", "sédation légère", "BPS douleur", "délire réanimation", "protocole sédation ICU"],
        sections: [
          { title: "Principes actualisés — analgésie avant sédation", items: [
            { text: "Analgésie EN PREMIER (analgesia-first ou analgosédation) : évaluer et traiter la douleur avant tout sédatif — réduction de la consommation de sédatifs de 20 à 30%", grade: "1A" },
            { text: "Sédation légère cible : score RASS –1 à 0 (patient calme, orientable à la voix) — la sédation profonde prolongée aggrave le pronostic et favorise le syndrome post-réanimation", grade: "1A" },
            { text: "Protocole ABCDEF : Awakening (réveil quotidien) · Breathing coordination · Coordination inter-équipes · Delirium (dépistage) · Early mobility (mobilisation précoce) · Family (famille)", grade: "1A" },
          ]},
          { title: "Évaluation — scores validés", items: [
            { text: "Douleur : Échelle BPS (Behavioral Pain Scale) si patient non communiquant (ventilé, sédaté) — score ≥ 5 = douleur significative → analgésie adaptée", grade: "1A" },
            { text: "Sédation : score RASS de –5 (coma non répondant) à +4 (agressif) — documenter 2 fois par jour au minimum", grade: "1A" },
            { text: "Délire : CAM-ICU deux fois par jour — prévalence 60 à 80% en réanimation — facteur pronostique indépendant de mortalité et de durée de séjour", grade: "1A" },
          ]},
          { title: "Analgésie", items: [
            { text: "Paracétamol 1 g × 4/jour IV : base de l'analgésie — épargne morphinique de 30%", grade: "1A" },
            { text: "Sufentanil (Sufenta®) 0,15 à 0,5 µg/kg/heure par seringue électrique : opioïde de référence en réanimation française — titration sur score BPS", grade: "1A" },
            { text: "Kétamine sous-dissociative 0,1 à 0,3 mg/kg/heure IVSE : adjuvant analgésique — réduit la consommation d'opioïdes de 30% — utile en post-opératoire et douleurs neuropathiques", grade: "1B" },
          ]},
          { title: "Sédation", items: [
            { text: "Propofol 0,5 à 4 mg/kg/heure IVSE : référence (réversibilité rapide) — surveiller syndrome de perfusion au propofol si > 48h à forte dose (> 4 mg/kg/h) : CPK, triglycérides, lactates, ECG", grade: "1A" },
            { text: "Dexmédétomidine (Dexdor®) 0,2 à 0,7 µg/kg/heure : alpha-2 agoniste — sédation coopérante, analgésie intrinsèque, réduit le délire — indiqué pour le sevrage de la ventilation", grade: "1B" },
            { text: "Midazolam : ÉVITER > 48 à 72 heures (accumulation importante) — réserver aux indications spécifiques (état de mal épileptique, sevrage alcool)", grade: "1B" },
          ]},
          { title: "Prévention et traitement du délire", items: [
            { text: "Mesures non pharmacologiques prioritaires : réorientation régulière, préserver le cycle jour/nuit (lumière, bruit), lunettes et prothèses auditives, mobilisation précoce dès J1", grade: "1A" },
            { text: "Éviter les benzodiazépines : principal facteur de risque modifiable du délire en réanimation", grade: "1A" },
            { text: "Halopéridol (Haldol®) 2,5 à 5 mg IV ou IM : traitement symptomatique du délire agité — ne prévient pas l'apparition du délire (méta-analyses négatives sur la prévention)", grade: "2B" },
          ]},
        ],
        source: "SRLF/SFAR Sédation-Analgésie 2020 · Devlin Crit Care Med 2018 (PAD Guidelines)"
      },
      {
        name: "Nutrition Artificielle en Réanimation — Entérale et Parentérale",
        urgence: "SURVEILLANCE",
        aliases: ["nutrition réanimation", "alimentation entérale", "nutrition parentérale", "dénutrition réanimation", "sonde naso-gastrique alimentation réa", "NE NP"],
        sections: [
          { title: "Principes — démarrage précoce", items: [
            { text: "Nutrition entérale dans les 24 à 48 heures suivant l'admission si le tube digestif est fonctionnel — supérieure à la nutrition parentérale (moins d'infections, durée de séjour réduite)", grade: "1A" },
            { text: "Besoins caloriques : 20 à 25 kcal/kg/jour de poids idéal en phase aiguë — augmentation progressive (éviter le syndrome de renutrition)", grade: "1A" },
            { text: "Besoins protéiques : 1,2 à 2 g de protéines/kg/jour — jusqu'à 2,5 g/kg si brûlures étendues, sepsis sévère ou phase anabolique", grade: "1B" },
          ]},
          { title: "Nutrition entérale (NE) — modalités pratiques", items: [
            { text: "Sonde naso-gastrique en position gastrique : vérifier la position (auscultation + pH < 5 + radiographie thoracique) avant utilisation — jamais d'alimentation avant confirmation", grade: "1A" },
            { text: "Position semi-assise 30 à 45° OBLIGATOIRE pendant toute la durée de l'alimentation entérale : réduit le risque de PAVM de 50%", grade: "1A" },
            { text: "Résidu gastrique : si > 500 mL en 6 heures → réduire le débit, érythromycine 250 mg IV toutes les 6 heures comme pro-kinétique — sonde naso-jéjunale si gastroparésie persistante", grade: "2B" },
          ]},
          { title: "Nutrition parentérale (NP) — indications", items: [
            { text: "Nutrition entérale impossible ou insuffisante après 3 jours d'optimisation — tube digestif non fonctionnel (occlusion, iléus paralytique, fistule à haut débit)", grade: "1A" },
            { text: "Par voie veineuse centrale uniquement (osmolarité > 800 mOsmol/L) — poches 3-en-1 commerciales — démarrage progressif sur 2 à 3 jours", grade: "1A" },
            { text: "Surveillance obligatoire : glycémie toutes les 4 à 6 heures (cible 6 à 10 mmol/L), phosphatémie (syndrome de renutrition), triglycerides, bilan hépatique", grade: "1A" },
          ]},
          { title: "Syndrome de renutrition inappropriée — prévention", items: [
            { text: "Patients à risque : dénutrition sévère, alcoolisme chronique, anorexie mentale, jeûne prolongé > 5 jours — manifestation : hypophosphatémie profonde avec défaillances multiviscérales", grade: "GPS" },
            { text: "Prévention : démarrer à 10 kcal/kg/jour les 2 premiers jours — supplémenter phosphore, potassium, magnésium et thiamine AVANT de démarrer la nutrition", grade: "1A" },
          ]},
        ],
        source: "SRLF/SFAR/SFNEP Nutrition Réanimation 2022 · Singer ESPEN ICM 2023"
      },
      {
        name: "Hyperthermie Maligne Per-Anesthésique",
        urgence: "ABSOLUE",
        aliases: ["hyperthermie maligne", "hyperthermie maligne per-anesthésique", "dantrolène", "hypertonie halogénés succinylcholine", "HM anesthésie"],
        sections: [
          { title: "Reconnaissance — urgence anesthésique", items: [
            { text: "Réaction pharmacogénétique (canal de la ryanodine RYR1) déclenchée par les anesthésiques halogénés et la succinylcholine — hypermétabolisme musculaire aigu", grade: "GPS" },
            { text: "Signes précoces : élévation inexpliquée de l'EtCO₂ malgré l'augmentation de la ventilation (signe le plus précoce et sensible), tachycardie, rigidité musculaire (notamment masséters)", grade: "GPS" },
            { text: "Puis : hyperthermie (tardive), acidose mixte, hyperkaliémie, rhabdomyolyse, troubles du rythme — distincte du coup de chaleur (contexte anesthésique)", grade: "GPS" },
          ]},
          { title: "Traitement immédiat", items: [
            { text: "ARRÊT IMMÉDIAT de tous les agents déclenchants (halogénés, succinylcholine) — passer en oxygène pur à haut débit, hyperventilation", grade: "1A" },
            { text: "DANTROLÈNE 2,5 mg/kg IV en bolus, à répéter toutes les 5-10 min jusqu'à régression (jusqu'à 10 mg/kg) : antidote spécifique qui bloque la libération de calcium", grade: "1A" },
            { text: "Refroidissement actif, correction de l'hyperkaliémie et de l'acidose, traitement des arythmies (éviter les inhibiteurs calciques avec le dantrolène), diurèse alcaline (rhabdomyolyse)", grade: "1A" },
            { text: "Surveillance prolongée en réanimation (risque de récidive), enquête familiale et orientation vers une consultation spécialisée (test de contracture, génétique RYR1)", grade: "1B" },
          ]},
        ],
        source: "SFAR Hyperthermie Maligne · MHAUS Guidelines · Glahn Br J Anaesth 2010"
      },
    ]
  },
  {
    id: "dermato", label: "Dermatologie Réanimation", short: "DERMATO", iconName: "skin", color: C.pink, bgColor: C.pinkBg,
    protos: [
      {
        name: "Purpura Fulminans",
        urgence: "ABSOLUE",
        aliases: ["purpura fulminans", "méningocoque purpura", "lésions purpuriques extensives fébriles", "purpura nécrotique enfant adulte"],
        sections: [
          { title: "Diagnostic et urgence absolue", items: [
            { text: "Purpura vasculaire avec au moins un élément nécrotique ou ecchymotique de diamètre ≥ 3 mm + fièvre = urgence absolue — mortalité sans traitement rapide > 50%", grade: "GPS" },
            { text: "Ne jamais attendre la confirmation biologique pour démarrer les antibiotiques — chaque minute est déterminante pour le pronostic", grade: "1A" },
          ]},
          { title: "Antibiothérapie immédiate — AVANT le transport si délai > 30 minutes", items: [
            { text: "Ceftriaxone (Rocéphine®) 1 à 2 g en injection intraveineuse directe ou intramusculaire — à injecter sur place si l'hôpital est à plus de 30 minutes", grade: "1A" },
            { text: "En réanimation : Céfotaxime 300 mg/kg/jour IV (maximum 24 g/jour) ± Amoxicilline si doute sur Listeria", grade: "1A" },
          ]},
          { title: "Réanimation du choc septique et prévention des séquelles", items: [
            { text: "Remplissage vasculaire et noradrénaline — objectif pression artérielle moyenne ≥ 65 mmHg", grade: "GPS" },
            { text: "Chirurgie plastique précoce pour les zones de nécrose cutanée — prévention des amputations par prise en charge spécialisée des extrémités nécrotiques", grade: "GPS" },
          ]},
        ],
        source: "DGS/SPILF Recommandations Méningococcémie 2018"
      },
      {
        name: "Nécrolyse Épidermique Toxique (Lyell et Stevens-Johnson)",
        urgence: "ABSOLUE",
        aliases: ["syndrome de Lyell", "syndrome de Stevens-Johnson", "nécrolyse épidermique toxique", "décollement cutané médicamenteux", "réaction médicamenteuse grave bulleuse"],
        sections: [
          { title: "Classification et score de gravité SCORTEN", items: [
            { text: "Syndrome de Stevens-Johnson : surface corporelle < 10% — Overlap : 10 à 30% — Syndrome de Lyell (nécrolyse épidermique toxique) : > 30% de surface corporelle décollée", grade: "GPS" },
            { text: "Score SCORTEN (1 point par critère) : âge > 40 ans, fréquence cardiaque > 120, surface atteinte > 10%, urée > 10 mmol/L, glycémie > 14 mmol/L, bicarbonates < 20 mmol/L, cancer actif — Score 6 points = mortalité > 90%", grade: "GPS" },
          ]},
          { title: "Prise en charge en centre spécialisé", items: [
            { text: "ARRÊT IMMÉDIAT du ou des médicaments suspects : le délai d'arrêt est le principal facteur pronostique modifiable — identifier le médicament coupable (délai médian d'introduction 7 à 21 jours avant les premières lésions)", grade: "1A" },
            { text: "Transfert en centre de brûlés ou dermato-réanimation spécialisé — prise en charge identique aux brûlés : chambre chauffée 28 à 30°C, pansements non adhérents, prévention de la surinfection cutanée", grade: "1A" },
          ]},
          { title: "Traitements immunomodulateurs (données en cours d'évaluation)", items: [
            { text: "Immunoglobulines polyvalentes intraveineuses 1 à 2 g/kg sur 3 à 4 jours : bénéfice discuté selon les séries — pratiqué dans certains centres experts", grade: "2B" },
            { text: "Corticoïdes systémiques : non recommandés — risque infectieux élevé sur peau lésée", grade: "2B" },
          ]},
        ],
        source: "ESF/SDFR Recommandations SJS-TEN 2023 · Bastuji-Garin JAMA 1993 (SCORTEN) · Schneider-Simon Lancet 2017"
      },
    ]
  },
  {
    id: "pediatrie", label: "Pédiatrie Réanimation", short: "PÉDIATR", iconName: "baby", color: "#0284C7", bgColor: "#F0F9FF",
    protos: [
      {
        name: "Choc Septique Pédiatrique — Critères Phoenix 2024",
        urgence: "ABSOLUE", isNew: true,
        aliases: ["sepsis enfant", "choc septique pédiatrique", "infection grave nourrisson", "méningocoque enfant", "purpura enfant fièvre choc"],
        sections: [
          { title: "Nouveaux critères Phoenix 2024 — SCCM Pédiatrique", items: [
            { text: "Le score Phoenix (2024) remplace les critères SIRS pédiatriques — intègre les dysfonctions neurologique, cardiovasculaire, coagulatoire et respiratoire avec des seuils adaptés à l'âge", grade: "GPS", isNew: true },
          ]},
          { title: "Remplissage vasculaire et vasopresseurs pédiatriques", items: [
            { text: "Bolus de cristalloïdes 10 à 20 mL/kg en 5 à 10 minutes — réévaluer après chaque bolus — maximum 40 à 60 mL/kg la 1ère heure (risque de surcharge plus rapide qu'en adulte)", grade: "1B" },
            { text: "Noradrénaline en première intention — Dobutamine si dysfonction cardiaque documentée par échographie", grade: "1B" },
          ], hasDoseCalc: true, drugs: [
            { name: "Bolus cristalloïdes pédiatrique", detail: "10–20 mL/kg sur 5–10 min", perKg: 20, unit: "mL", round: 0 },
            { name: "Céfotaxime pédiatrique", detail: "200 mg/kg/j en 4 fois, max 12 g/j", perKg: 200, unit: "mg/j", max: 12000, round: 0 },
          ]},
          { title: "Antibiothérapie", items: [
            { text: "Céfotaxime 200 mg/kg/jour IV ou Ceftriaxone 100 mg/kg/jour IV — adapter selon la porte d'entrée, l'âge et l'écologie locale du service", grade: "1A" },
          ]},
        ],
        source: "Phoenix Criteria SCCM 2024 · SSC Pédiatrique 2020 · PALS Guidelines 2020"
      },
      {
        name: "Bronchiolite Grave du Nourrisson",
        urgence: "URGENT",
        aliases: ["bronchiolite grave", "VRS nourrisson", "sibilants bébé polypnée", "insuffisance respiratoire nourrisson", "bronchiolite hospitalisation"],
        sections: [
          { title: "Critères de gravité imposant la réanimation", items: [
            { text: "Signes de lutte sévères (tirage intercostal, sus-sternal, battement des ailes du nez, geignement expiratoire) — Saturation en oxygène < 90% sous oxygène — Apnées > 20 secondes — Altération de la conscience", grade: "GPS" },
          ]},
          { title: "Traitement", items: [
            { text: "Oxygénothérapie à haut débit nasal (2 mL/kg/minute, FiO₂ titrée saturation > 94%) : réduit le taux d'intubation", grade: "1B" },
            { text: "Ventilation non invasive en pression positive continue (CPAP) nasale si l'oxygénothérapie à haut débit est insuffisante", grade: "1B" },
            { text: "Aucun bronchodilatateur ni corticoïde recommandé en routine dans la bronchiolite du nourrisson < 1 an (méta-analyses négatives)", grade: "1A" },
            { text: "Alimentation par sonde nasogastrique si refus de tétée ou fréquence respiratoire > 60/minute", grade: "GPS" },
          ]},
        ],
        source: "HAS Bronchiolite 2019 actualisée 2022 · AAP Guidelines 2014 rev. 2021"
      },
      {
        name: "Laryngite Sous-Glottique Aiguë (Croup)",
        urgence: "URGENT",
        aliases: ["laryngite sous-glottique", "croup", "laryngite stribilante enfant", "stridor inspiratoire enfant", "voix rauque toux aboyante"],
        sections: [
          { title: "Score de Westley et évaluation", items: [
            { text: "Score de Westley évalue stridor, tirage, entrée d'air, cyanose et conscience — Score ≤ 2 : léger — 3 à 5 : modéré — ≥ 6 : sévère — ≥ 8 : risque vital", grade: "GPS" },
          ]},
          { title: "Traitement", items: [
            { text: "Dexaméthasone orale 0,15 mg/kg (maximum 10 mg) : première intention, réduction rapide de l'œdème sous-glottique en 1 à 4 heures", grade: "1A" },
            { text: "Adrénaline nébulisée 0,5 mL/kg de la solution à 1/1 000 (maximum 5 mL) si score ≥ 6 : effet en 10 minutes, durée 2 heures — surveiller 3 à 4 heures après la nébulisation", grade: "1A" },
          ], hasDoseCalc: true, drugs: [
            { name: "Dexaméthasone orale", detail: "0,15 mg/kg PO, max 10 mg", perKg: 0.15, unit: "mg", max: 10, round: 1 },
            { name: "Adrénaline nébulisée (1/1000)", detail: "0,5 mL/kg, max 5 mL", perKg: 0.5, unit: "mL", max: 5, round: 1 },
          ]},
        ],
        source: "HAS Laryngite 2021 · Johnson Cochrane 2011 · Bjornson NEJM 2004;351:1306"
      },
      {
        name: "Convulsions Fébriles de l'Enfant",
        urgence: "URGENT",
        aliases: ["convulsions fébriles", "convulsion enfant fièvre", "crise fébrile nourrisson", "épilepsie fébrile"],
        sections: [
          { title: "Classification", items: [
            { text: "Convulsion fébrile simple : unique, généralisée, < 15 minutes, enfant 6 mois à 5 ans, sans déficit post-critique — excellent pronostic, récidive dans 30% des cas", grade: "GPS" },
            { text: "Convulsion fébrile complexe : durée ≥ 15 minutes, focale, récidive dans les 24 heures, déficit neurologique post-critique — bilan approfondi nécessaire", grade: "GPS" },
          ]},
          { title: "Traitement de la crise", items: [
            { text: "Diazépam intrarectal 0,5 mg/kg (maximum 10 mg) : premier recours hors hospitalisation", grade: "1A" },
            { text: "Midazolam 0,2 mg/kg intranasal ou intramusculaire : aussi efficace que le diazépam IV", grade: "1A" },
          ]},
        ],
        hasDoseCalc: true, drugs: [
          { name: "Diazépam intrarectal", detail: "0,5 mg/kg max 10 mg", perKg: 0.5, unit: "mg", max: 10, round: 1 },
          { name: "Midazolam IN/IM", detail: "0,2 mg/kg max 10 mg", perKg: 0.2, unit: "mg", max: 10, round: 1 },
        ],
        source: "HAS Convulsions Fébriles 2020 · AAP Febrile Seizures Guidelines 2011"
      },
      {
        name: "Méningite Bactérienne Pédiatrique",
        urgence: "ABSOLUE",
        aliases: ["méningite bactérienne enfant", "méningocoque nourrisson enfant", "méningite bébé", "purpura méningite enfant"],
        sections: [
          { title: "Signes d'alerte selon l'âge", items: [
            { text: "Nourrisson < 3 mois : ABSENCE de raideur de la nuque — chercher bombement de la fontanelle, refus de téter, somnolence, gémissement, hypotonie", grade: "GPS" },
          ]},
          { title: "Antibiothérapie adaptée à l'âge", items: [
            { text: "< 3 mois : Amoxicilline 200 mg/kg/jour IV + Céfotaxime 200 mg/kg/jour IV (couverture Listeria + E.coli)", grade: "1A" },
            { text: "> 3 mois : Céfotaxime 300 mg/kg/jour IV (max 24 g/j) ou Ceftriaxone 100 mg/kg/jour IV (max 4 g/j)", grade: "1A" },
            { text: "Dexaméthasone 0,15 mg/kg × 4/jour × 4 jours AVANT les antibiotiques : réduit séquelles auditives", grade: "1A" },
          ]},
        ],
        hasDoseCalc: true, drugs: [
          { name: "Céfotaxime (> 3 mois)", detail: "300 mg/kg/j en 4 fois", perKg: 300, unit: "mg/j", max: 24000, round: 0 },
          { name: "Ceftriaxone (> 3 mois)", detail: "100 mg/kg/j en 2 fois", perKg: 100, unit: "mg/j", max: 4000, round: 0 },
          { name: "Dexaméthasone", detail: "0,15 mg/kg IV × 6h × 4j", perKg: 0.15, unit: "mg/dose", round: 1 },
        ],
        source: "PNDS Méningites Pédiatriques HAS 2021 · Tunkel Clin Infect Dis 2004"
      },
    ]
  },
];
// ═══════════════════════════════════════════════════════════════
// BIBLIOTHÈQUE DE SCORES — RéaGuard
// ═══════════════════════════════════════════════════════════════
const SCORES = [
  // ─────────── GRAVITÉ GÉNÉRALE / SEPSIS ───────────
  {
    id: "sofa", name: "Score SOFA", cat: "Gravité & Sepsis", short: "Défaillance multiviscérale",
    fields: [
      { id: "resp", label: "Respiratoire — PaO₂/FiO₂", opts: [["≥ 400 mmHg", 0], ["300–399", 1], ["200–299", 2], ["100–199 sous VM", 3], ["< 100 sous VM", 4]] },
      { id: "plat", label: "Plaquettes (G/L)", opts: [["≥ 150", 0], ["100–149", 1], ["50–99", 2], ["20–49", 3], ["< 20", 4]] },
      { id: "bili", label: "Bilirubine (µmol/L)", opts: [["< 20", 0], ["20–32", 1], ["33–101", 2], ["102–204", 3], ["> 204", 4]] },
      { id: "cv", label: "Cardiovasculaire", opts: [["PAM ≥ 70 mmHg", 0], ["PAM < 70 mmHg", 1], ["Dopa ≤ 5 ou Dobutamine", 2], ["Dopa > 5 ou Noradré ≤ 0,1", 3], ["Dopa > 15 ou Noradré > 0,1", 4]] },
      { id: "gcs", label: "Glasgow", opts: [["15", 0], ["13–14", 1], ["10–12", 2], ["6–9", 3], ["< 6", 4]] },
      { id: "creat", label: "Créatinine / diurèse", opts: [["< 110 µmol/L", 0], ["110–170", 1], ["171–299", 2], ["300–440 ou < 500 mL/j", 3], ["> 440 ou < 200 mL/j", 4]] },
    ],
    interp: (s) => s <= 6 ? { text: `${s}/24 — Mortalité < 10%`, level: "ok" } : s <= 9 ? { text: `${s}/24 — Mortalité 15–20%`, level: "warn" } : s <= 12 ? { text: `${s}/24 — Mortalité 40–50%`, level: "bad" } : { text: `${s}/24 — Mortalité > 80%`, level: "bad" },
    note: "Une augmentation aiguë du SOFA ≥ 2 points définit le sepsis (Sepsis-3). Calculé à l'admission puis quotidiennement.",
    source: "Vincent ICM 1996 · Singer JAMA 2016 (Sepsis-3)"
  },
  {
    id: "qsofa", name: "qSOFA (quick SOFA)", cat: "Gravité & Sepsis", short: "Dépistage rapide du sepsis",
    fields: [
      { id: "fr", label: "Fréquence respiratoire ≥ 22/min", opts: [["Non", 0], ["Oui", 1]] },
      { id: "tas", label: "Pression artérielle systolique ≤ 100 mmHg", opts: [["Non", 0], ["Oui", 1]] },
      { id: "conf", label: "Altération de la conscience (Glasgow < 15)", opts: [["Non", 0], ["Oui", 1]] },
    ],
    interp: (s) => s >= 2 ? { text: `${s}/3 — Risque élevé : mortalité augmentée, évaluer le sepsis`, level: "bad" } : { text: `${s}/3 — Risque faible (ne pas éliminer un sepsis pour autant)`, level: "ok" },
    note: "Outil de dépistage au lit du patient hors réanimation. Un qSOFA ≥ 2 doit faire rechercher un sepsis et évaluer le SOFA complet.",
    source: "Singer JAMA 2016 (Sepsis-3)"
  },
  {
    id: "igs2", name: "IGS II (SAPS II)", cat: "Gravité & Sepsis", short: "Pronostic à l'admission en réa",
    fields: [
      { id: "age", label: "Âge", opts: [["< 40 ans", 0], ["40–59", 7], ["60–69", 12], ["70–74", 15], ["75–79", 16], ["≥ 80", 18]] },
      { id: "fc", label: "Fréquence cardiaque (/min)", opts: [["70–119", 0], ["40–69 ou 120–159", 4], ["< 40 ou ≥ 160", 11], ["", 7]] },
      { id: "tas", label: "PA systolique (mmHg)", opts: [["100–199", 0], ["≥ 200", 2], ["70–99", 5], ["< 70", 13]] },
      { id: "temp", label: "Température", opts: [["< 39°C", 0], ["≥ 39°C", 3]] },
      { id: "gcs", label: "Glasgow", opts: [["14–15", 0], ["11–13", 5], ["9–10", 7], ["6–8", 13], ["< 6", 26]] },
      { id: "uree", label: "Urée sanguine", opts: [["< 10 mmol/L", 0], ["10–29,9", 6], ["≥ 30", 10]] },
      { id: "gb", label: "Globules blancs (G/L)", opts: [["1–19,9", 0], ["≥ 20", 3], ["< 1", 12]] },
      { id: "k", label: "Kaliémie (mmol/L)", opts: [["3–4,9", 0], ["< 3 ou ≥ 5", 3]] },
      { id: "na", label: "Natrémie (mmol/L)", opts: [["125–144", 0], ["≥ 145", 1], ["< 125", 5]] },
      { id: "hco3", label: "Bicarbonates (mmol/L)", opts: [["≥ 20", 0], ["15–19", 3], ["< 15", 6]] },
      { id: "bili", label: "Bilirubine", opts: [["< 68,4 µmol/L", 0], ["68,4–102,5", 4], ["≥ 102,6", 9]] },
      { id: "chr", label: "Maladie chronique", opts: [["Aucune", 0], ["Cancer métastatique", 9], ["Hémopathie maligne", 10], ["SIDA", 17]] },
      { id: "adm", label: "Type d'admission", opts: [["Chirurgie programmée", 0], ["Médicale", 6], ["Chirurgie non programmée", 8]] },
    ],
    interp: (s) => s < 30 ? { text: `${s} points — Mortalité prédite faible (< 10%)`, level: "ok" } : s < 50 ? { text: `${s} points — Mortalité prédite modérée (~25%)`, level: "warn" } : { text: `${s} points — Mortalité prédite élevée (> 50%)`, level: "bad" },
    note: "Score de gravité généraliste calculé sur les valeurs les plus péjoratives des 24 premières heures. Prédit la mortalité hospitalière.",
    source: "Le Gall JAMA 1993"
  },
  {
    id: "apache2", name: "APACHE II", cat: "Gravité & Sepsis", short: "Sévérité physiologique aiguë",
    fields: [
      { id: "phys", label: "Somme des 12 variables physiologiques (APS)", type: "number", placeholder: "ex: 15" },
      { id: "age", label: "Points liés à l'âge", opts: [["≤ 44 ans (0)", 0], ["45–54 (2)", 2], ["55–64 (3)", 3], ["65–74 (5)", 5], ["≥ 75 (6)", 6]] },
      { id: "chr", label: "Maladie chronique sévère", opts: [["Aucune (0)", 0], ["Post-op programmé (2)", 2], ["Médical ou post-op urgent (5)", 5]] },
    ],
    interp: (s) => s <= 9 ? { text: `${s} points — Mortalité ~10%`, level: "ok" } : s <= 19 ? { text: `${s} points — Mortalité 12–25%`, level: "warn" } : s <= 29 ? { text: `${s} points — Mortalité 40–55%`, level: "bad" } : { text: `${s} points — Mortalité > 70%`, level: "bad" },
    note: "Le score physiologique aigu (APS) somme 12 paramètres (température, PAM, FC, FR, oxygénation, pH, Na, K, créatinine, hématocrite, GB, Glasgow). Saisir le sous-total APS.",
    source: "Knaus Crit Care Med 1985"
  },
  {
    id: "news2", name: "NEWS2", cat: "Gravité & Sepsis", short: "Alerte précoce de détérioration",
    fields: [
      { id: "fr", label: "Fréquence respiratoire", opts: [["12–20", 0], ["9–11", 1], ["21–24", 2], ["≤ 8 ou ≥ 25", 3]] },
      { id: "spo2", label: "SpO₂", opts: [["≥ 96%", 0], ["94–95%", 1], ["92–93%", 2], ["≤ 91%", 3]] },
      { id: "o2", label: "Oxygénothérapie", opts: [["Air ambiant", 0], ["Sous oxygène", 2]] },
      { id: "tas", label: "PA systolique", opts: [["111–219", 0], ["101–110", 1], ["91–100", 2], ["≤ 90 ou ≥ 220", 3]] },
      { id: "fc", label: "Fréquence cardiaque", opts: [["51–90", 0], ["41–50 ou 91–110", 1], ["111–130", 2], ["≤ 40 ou ≥ 131", 3]] },
      { id: "cons", label: "Conscience", opts: [["Alerte", 0], ["Confusion / réponse à voix-douleur-aucune", 3]] },
      { id: "temp", label: "Température", opts: [["36,1–38,0", 0], ["35,1–36,0 ou 38,1–39,0", 1], ["≥ 39,1", 2], ["≤ 35,0", 3]] },
    ],
    interp: (s) => s <= 4 ? { text: `${s} — Risque faible (surveillance standard)`, level: "ok" } : s <= 6 ? { text: `${s} — Risque moyen — avis urgent`, level: "warn" } : { text: `${s} — Risque élevé — appel réanimation`, level: "bad" },
    note: "Score d'alerte précoce. Un total ≥ 7, ou 3 dans un seul paramètre, impose une évaluation urgente en milieu de soins critiques.",
    source: "Royal College of Physicians NEWS2 2017"
  },

  // ─────────── NEUROLOGIE ───────────
  {
    id: "gcs", name: "Score de Glasgow (GCS)", cat: "Neurologie", short: "Niveau de conscience",
    fields: [
      { id: "eye", label: "Ouverture des yeux (E)", opts: [["Spontanée (E4)", 4], ["À la parole (E3)", 3], ["À la douleur (E2)", 2], ["Absente (E1)", 1]] },
      { id: "verb", label: "Réponse verbale (V)", opts: [["Orientée (V5)", 5], ["Confuse (V4)", 4], ["Mots inappropriés (V3)", 3], ["Sons incompréhensibles (V2)", 2], ["Absente (V1)", 1]] },
      { id: "mot", label: "Réponse motrice (M)", opts: [["Obéit (M6)", 6], ["Localise (M5)", 5], ["Évitement (M4)", 4], ["Décortication (M3)", 3], ["Décérébration (M2)", 2], ["Absente (M1)", 1]] },
    ],
    interp: (s) => s <= 8 ? { text: `${s}/15 — Coma grave — intubation si ≤ 8`, level: "bad" } : s <= 12 ? { text: `${s}/15 — Trouble modéré de conscience`, level: "warn" } : { text: `${s}/15 — Conscience conservée`, level: "ok" },
    note: "Score de 3 à 15. Un Glasgow ≤ 8 justifie la protection des voies aériennes (intubation).",
    source: "Teasdale Lancet 1974"
  },
  {
    id: "nihss", name: "NIHSS", cat: "Neurologie", short: "Sévérité de l'AVC",
    fields: [
      { id: "cons", label: "Conscience (1a)", opts: [["Alerte (0)", 0], ["Somnolent (1)", 1], ["Stuporeux (2)", 2], ["Coma (3)", 3]] },
      { id: "gaze", label: "Oculomotricité (2)", opts: [["Normale (0)", 0], ["Paralysie partielle (1)", 1], ["Déviation forcée (2)", 2]] },
      { id: "vis", label: "Champ visuel (3)", opts: [["Normal (0)", 0], ["Hémianopsie partielle (1)", 1], ["Hémianopsie complète (2)", 2], ["Cécité bilatérale (3)", 3]] },
      { id: "fac", label: "Parésie faciale (4)", opts: [["Normale (0)", 0], ["Mineure (1)", 1], ["Partielle (2)", 2], ["Complète (3)", 3]] },
      { id: "mg", label: "Bras gauche (5a)", opts: [["Pas de chute (0)", 0], ["Chute < 10s (1)", 1], ["Effort anti-gravité (2)", 2], ["Pas anti-gravité (3)", 3], ["Aucun mouvement (4)", 4]] },
      { id: "md", label: "Bras droit (5b)", opts: [["Pas de chute (0)", 0], ["Chute < 10s (1)", 1], ["Effort anti-gravité (2)", 2], ["Pas anti-gravité (3)", 3], ["Aucun mouvement (4)", 4]] },
      { id: "jg", label: "Jambe gauche (6a)", opts: [["Pas de chute (0)", 0], ["Chute < 5s (1)", 1], ["Effort anti-gravité (2)", 2], ["Pas anti-gravité (3)", 3], ["Aucun mouvement (4)", 4]] },
      { id: "jd", label: "Jambe droite (6b)", opts: [["Pas de chute (0)", 0], ["Chute < 5s (1)", 1], ["Effort anti-gravité (2)", 2], ["Pas anti-gravité (3)", 3], ["Aucun mouvement (4)", 4]] },
      { id: "atax", label: "Ataxie (7)", opts: [["Absente (0)", 0], ["1 membre (1)", 1], ["2 membres (2)", 2]] },
      { id: "sens", label: "Sensibilité (8)", opts: [["Normale (0)", 0], ["Déficit modéré (1)", 1], ["Déficit sévère (2)", 2]] },
      { id: "lang", label: "Langage (9)", opts: [["Normal (0)", 0], ["Aphasie légère (1)", 1], ["Aphasie sévère (2)", 2], ["Mutisme (3)", 3]] },
      { id: "dys", label: "Dysarthrie (10)", opts: [["Normale (0)", 0], ["Légère (1)", 1], ["Sévère (2)", 2]] },
      { id: "ext", label: "Extinction/négligence (11)", opts: [["Absente (0)", 0], ["Partielle (1)", 1], ["Complète (2)", 2]] },
    ],
    interp: (s) => s === 0 ? { text: "0 — Pas de déficit", level: "ok" } : s <= 4 ? { text: `${s} — AVC mineur`, level: "ok" } : s <= 15 ? { text: `${s} — AVC modéré`, level: "warn" } : s <= 20 ? { text: `${s} — AVC sévère`, level: "bad" } : { text: `${s} — AVC très sévère`, level: "bad" },
    note: "Score de 0 à 42. Guide l'indication de thrombolyse et de thrombectomie. À recalculer après traitement.",
    source: "Brott Stroke 1989 · NINDS"
  },
  {
    id: "rass", name: "Échelle RASS", cat: "Neurologie", short: "Sédation-agitation en réa",
    fields: [
      { id: "v", label: "Niveau observé", opts: [["+4 Combatif, dangereux", 4], ["+3 Très agité, arrache les dispositifs", 3], ["+2 Agité, lutte contre le respirateur", 2], ["+1 Anxieux mais calme", 1], ["0 Éveillé et calme", 0], ["−1 Somnolent, éveil > 10s à la voix", -1], ["−2 Sédation légère, éveil < 10s à la voix", -2], ["−3 Sédation modérée, mouvement à la voix sans contact visuel", -3], ["−4 Sédation profonde, réponse à la stimulation physique", -4], ["−5 Non réveillable", -5]] },
    ],
    interp: (s) => s >= 2 ? { text: `RASS +${s} — Agitation : adapter la sédation/analgésie`, level: "bad" } : s >= -1 ? { text: `RASS ${s} — Cible habituelle de confort (0 à −2)`, level: "ok" } : s >= -3 ? { text: `RASS ${s} — Sédation modérée`, level: "warn" } : { text: `RASS ${s} — Sédation profonde — réévaluer l'indication`, level: "bad" },
    note: "Cible recommandée en réanimation : RASS 0 à −2 (sédation légère) sauf indication spécifique (SDRA sévère, HTIC). Évaluer pluriquotidiennement.",
    source: "Sessler AJRCCM 2002"
  },
  {
    id: "hunt", name: "Hunt & Hess", cat: "Neurologie", short: "Gravité de l'hémorragie méningée",
    fields: [
      { id: "g", label: "Grade clinique", opts: [["I — Asymptomatique ou céphalée légère", 1], ["II — Céphalée sévère, raideur, pas de déficit (sauf paire crânienne)", 2], ["III — Somnolence, confusion, déficit focal léger", 3], ["IV — Stupeur, hémiparésie modérée à sévère", 4], ["V — Coma profond, décérébration", 5]] },
    ],
    interp: (s) => s <= 2 ? { text: `Grade ${s} — Bon pronostic`, level: "ok" } : s === 3 ? { text: `Grade ${s} — Pronostic intermédiaire`, level: "warn" } : { text: `Grade ${s} — Pronostic réservé`, level: "bad" },
    note: "Évalue la gravité clinique d'une hémorragie sous-arachnoïdienne anévrismale. Corrèle avec la mortalité et le pronostic.",
    source: "Hunt & Hess J Neurosurg 1968"
  },
  {
    id: "camicu", name: "CAM-ICU", cat: "Neurologie", short: "Dépistage du delirium",
    fields: [
      { id: "a", label: "1. Début aigu ou fluctuation de l'état mental", opts: [["Non", 0], ["Oui", 1]] },
      { id: "b", label: "2. Inattention (erreurs au test attentionnel)", opts: [["Non", 0], ["Oui", 1]] },
      { id: "c", label: "3. Niveau de conscience altéré (RASS ≠ 0)", opts: [["Non", 0], ["Oui", 1]] },
      { id: "d", label: "4. Pensée désorganisée", opts: [["Non", 0], ["Oui", 1]] },
    ],
    interp: (s, v) => (v.a == 1 && v.b == 1 && (v.c == 1 || v.d == 1)) ? { text: "CAM-ICU POSITIF — delirium présent", level: "bad" } : { text: "CAM-ICU négatif (si critères 1+2 et 3 ou 4 non réunis)", level: "ok" },
    note: "Positif si : critère 1 ET 2 présents, ET (critère 3 OU 4). Le delirium en réanimation aggrave le pronostic — dépister au moins une fois par équipe.",
    source: "Ely JAMA 2001"
  },

  // ─────────── RESPIRATOIRE ───────────
  {
    id: "berlin", name: "Critères de Berlin (SDRA)", cat: "Respiratoire", short: "Définition et sévérité du SDRA",
    fields: [
      { id: "delai", label: "Délai (≤ 1 semaine d'une agression)", opts: [["Oui", 0], ["Non — autre diagnostic", 99]] },
      { id: "img", label: "Imagerie : opacités bilatérales", opts: [["Oui", 0], ["Non", 99]] },
      { id: "orig", label: "Œdème non expliqué par défaillance cardiaque/surcharge", opts: [["Oui", 0], ["Non", 99]] },
      { id: "pf", label: "PaO₂/FiO₂ (avec PEP ≥ 5)", opts: [["200–300 → léger", 1], ["100–200 → modéré", 2], ["≤ 100 → sévère", 3]] },
    ],
    interp: (s, v) => (v.delai == 99 || v.img == 99 || v.orig == 99) ? { text: "Critères non réunis — ce n'est pas un SDRA au sens de Berlin", level: "ok" } : v.pf == 1 ? { text: "SDRA LÉGER (PaO₂/FiO₂ 200–300) — mortalité ~27%", level: "warn" } : v.pf == 2 ? { text: "SDRA MODÉRÉ (100–200) — mortalité ~32% — décubitus ventral si < 150", level: "bad" } : { text: "SDRA SÉVÈRE (≤ 100) — mortalité ~45% — DV + curares, discuter ECMO", level: "bad" },
    note: "Les 4 critères temporels/radiologiques/étiologiques doivent être réunis ; la sévérité est fixée par le rapport PaO₂/FiO₂ sous PEP ≥ 5 cmH₂O.",
    source: "ARDS Definition Task Force JAMA 2012"
  },
  {
    id: "curb65", name: "CURB-65", cat: "Respiratoire", short: "Gravité de la pneumonie",
    fields: [
      { id: "c", label: "Confusion", opts: [["Non", 0], ["Oui", 1]] },
      { id: "u", label: "Urée > 7 mmol/L", opts: [["Non", 0], ["Oui", 1]] },
      { id: "r", label: "Fréquence respiratoire ≥ 30/min", opts: [["Non", 0], ["Oui", 1]] },
      { id: "b", label: "PA systolique < 90 ou diastolique ≤ 60 mmHg", opts: [["Non", 0], ["Oui", 1]] },
      { id: "age", label: "Âge ≥ 65 ans", opts: [["Non", 0], ["Oui", 1]] },
    ],
    interp: (s) => s <= 1 ? { text: `${s}/5 — Ambulatoire possible (mortalité < 3%)`, level: "ok" } : s === 2 ? { text: `${s}/5 — Hospitalisation à considérer`, level: "warn" } : { text: `${s}/5 — Pneumonie grave — réanimation à envisager (mortalité 15–40%)`, level: "bad" },
    note: "Évalue la gravité d'une pneumonie communautaire et oriente le lieu de prise en charge. Score ≥ 3 = forme sévère.",
    source: "Lim Thorax 2003"
  },
  {
    id: "wells_ep", name: "Score de Wells (EP)", cat: "Respiratoire", short: "Probabilité d'embolie pulmonaire",
    fields: [
      { id: "tvp", label: "Signes cliniques de TVP", opts: [["Non", 0], ["Oui (+3)", 3]] },
      { id: "alt", label: "Diagnostic alternatif moins probable que l'EP", opts: [["Non", 0], ["Oui (+3)", 3]] },
      { id: "fc", label: "Fréquence cardiaque > 100/min", opts: [["Non", 0], ["Oui (+1,5)", 1.5]] },
      { id: "immob", label: "Immobilisation ou chirurgie < 4 semaines", opts: [["Non", 0], ["Oui (+1,5)", 1.5]] },
      { id: "atcd", label: "Antécédent de TVP ou EP", opts: [["Non", 0], ["Oui (+1,5)", 1.5]] },
      { id: "hemo", label: "Hémoptysie", opts: [["Non", 0], ["Oui (+1)", 1]] },
      { id: "k", label: "Cancer actif", opts: [["Non", 0], ["Oui (+1)", 1]] },
    ],
    interp: (s) => s < 2 ? { text: `${s} — Probabilité faible`, level: "ok" } : s <= 6 ? { text: `${s} — Probabilité modérée`, level: "warn" } : { text: `${s} — Probabilité forte — imagerie urgente`, level: "bad" },
    note: "Probabilité clinique pré-test d'embolie pulmonaire. En cas de probabilité faible, le dosage des D-dimères permet d'exclure le diagnostic.",
    source: "Wells Thromb Haemost 2000"
  },

  // ─────────── HÉMODYNAMIQUE / CARDIO ───────────
  {
    id: "killip", name: "Classe de Killip", cat: "Cardiologie", short: "IC à la phase aiguë de l'IDM",
    fields: [
      { id: "k", label: "Stade clinique", opts: [["I — Pas de signe d'insuffisance cardiaque", 1], ["II — Crépitants < mi-champs, B3, turgescence jugulaire", 2], ["III — Œdème aigu du poumon", 3], ["IV — Choc cardiogénique", 4]] },
    ],
    interp: (s) => s === 1 ? { text: "Killip I — Mortalité ~6%", level: "ok" } : s === 2 ? { text: "Killip II — Mortalité ~17%", level: "warn" } : s === 3 ? { text: "Killip III — Mortalité ~38%", level: "bad" } : { text: "Killip IV — Mortalité ~67%", level: "bad" },
    note: "Stratification pronostique de l'insuffisance cardiaque à la phase aiguë de l'infarctus du myocarde.",
    source: "Killip Am J Cardiol 1967"
  },
  {
    id: "chadsvasc", name: "CHA₂DS₂-VASc", cat: "Cardiologie", short: "Risque thrombo-embolique en FA",
    fields: [
      { id: "c", label: "Insuffisance cardiaque / dysfonction VG", opts: [["Non", 0], ["Oui (+1)", 1]] },
      { id: "h", label: "Hypertension artérielle", opts: [["Non", 0], ["Oui (+1)", 1]] },
      { id: "a", label: "Âge ≥ 75 ans", opts: [["Non", 0], ["Oui (+2)", 2]] },
      { id: "d", label: "Diabète", opts: [["Non", 0], ["Oui (+1)", 1]] },
      { id: "s", label: "AVC / AIT / embolie antérieurs", opts: [["Non", 0], ["Oui (+2)", 2]] },
      { id: "v", label: "Maladie vasculaire", opts: [["Non", 0], ["Oui (+1)", 1]] },
      { id: "a2", label: "Âge 65–74 ans", opts: [["Non", 0], ["Oui (+1)", 1]] },
      { id: "sc", label: "Sexe féminin", opts: [["Non", 0], ["Oui (+1)", 1]] },
    ],
    interp: (s) => s === 0 ? { text: "0 — Risque faible — pas d'anticoagulation", level: "ok" } : s === 1 ? { text: "1 — Anticoagulation à discuter", level: "warn" } : { text: `${s} — Anticoagulation recommandée`, level: "bad" },
    note: "Estime le risque thrombo-embolique annuel dans la fibrillation atriale non valvulaire et l'indication d'anticoagulation.",
    source: "Lip Chest 2010 · ESC 2020"
  },
  {
    id: "grace", name: "GRACE (simplifié)", cat: "Cardiologie", short: "Risque dans le SCA",
    fields: [
      { id: "killip", label: "Classe Killip", opts: [["I", 0], ["II", 20], ["III", 39], ["IV", 59]] },
      { id: "tas", label: "PA systolique", opts: [["≥ 200", 0], ["160–199", 10], ["120–159", 24], ["100–119", 34], ["80–99", 43], ["< 80", 58]] },
      { id: "fc", label: "Fréquence cardiaque", opts: [["< 70", 0], ["70–89", 7], ["90–109", 13], ["110–149", 23], ["150–199", 36], ["≥ 200", 46]] },
      { id: "age", label: "Âge", opts: [["< 40", 0], ["40–49", 18], ["50–59", 36], ["60–69", 55], ["70–79", 73], ["≥ 80", 91]] },
      { id: "creat", label: "Créatinine (µmol/L)", opts: [["< 35", 1], ["35–70", 4], ["71–105", 7], ["106–140", 10], ["141–176", 13], ["177–353", 21], ["> 353", 28]] },
      { id: "arret", label: "Arrêt cardiaque à l'admission", opts: [["Non", 0], ["Oui", 39]] },
      { id: "st", label: "Sus/sous-décalage ST", opts: [["Non", 0], ["Oui", 28]] },
      { id: "tropo", label: "Élévation des marqueurs", opts: [["Non", 0], ["Oui", 14]] },
    ],
    interp: (s) => s <= 108 ? { text: `${s} — Risque faible (mortalité hospit. < 1%)`, level: "ok" } : s <= 140 ? { text: `${s} — Risque intermédiaire (1–3%) — coronarographie < 72h`, level: "warn" } : { text: `${s} — Risque élevé (> 3%) — stratégie invasive précoce < 24h`, level: "bad" },
    note: "Stratifie le risque dans le syndrome coronarien aigu et oriente le délai de la stratégie invasive (coronarographie).",
    source: "Granger Arch Intern Med 2003 · ESC NSTEMI 2020"
  },

  // ─────────── DIGESTIF / HÉPATIQUE ───────────
  {
    id: "childpugh", name: "Child-Pugh", cat: "Digestif & Hépatique", short: "Sévérité de la cirrhose",
    fields: [
      { id: "enc", label: "Encéphalopathie", opts: [["Absente", 1], ["Grade 1–2", 2], ["Grade 3–4", 3]] },
      { id: "asc", label: "Ascite", opts: [["Absente", 1], ["Minime (contrôlée)", 2], ["Modérée à tendue", 3]] },
      { id: "bili", label: "Bilirubine", opts: [["< 34 µmol/L", 1], ["34–50", 2], ["> 50", 3]] },
      { id: "alb", label: "Albumine", opts: [["> 35 g/L", 1], ["28–35", 2], ["< 28", 3]] },
      { id: "tp", label: "TP / INR", opts: [["TP > 50% (INR < 1,7)", 1], ["TP 40–50% (INR 1,7–2,3)", 2], ["TP < 40% (INR > 2,3)", 3]] },
    ],
    interp: (s) => s <= 6 ? { text: `${s} — Classe A — survie à 1 an ~100%`, level: "ok" } : s <= 9 ? { text: `${s} — Classe B — survie à 1 an ~80%`, level: "warn" } : { text: `${s} — Classe C — survie à 1 an ~45%`, level: "bad" },
    note: "Évalue la sévérité et le pronostic de la cirrhose. Classe A : 5–6, B : 7–9, C : 10–15.",
    source: "Pugh Br J Surg 1973"
  },
  {
    id: "meld", name: "Score MELD", cat: "Digestif & Hépatique", short: "Pronostic hépatique / greffe",
    fields: [
      { id: "bili", label: "Bilirubine (mg/dL)", type: "number", placeholder: "ex: 2.0" },
      { id: "inr", label: "INR", type: "number", placeholder: "ex: 1.5" },
      { id: "creat", label: "Créatinine (mg/dL)", type: "number", placeholder: "ex: 1.2" },
    ],
    compute: (v) => {
      const ln = Math.log;
      let bili = Math.max(parseFloat(v.bili) || 1, 1);
      let inr = Math.max(parseFloat(v.inr) || 1, 1);
      let creat = Math.max(parseFloat(v.creat) || 1, 1);
      creat = Math.min(creat, 4);
      let meld = Math.round(3.78 * ln(bili) + 11.2 * ln(inr) + 9.57 * ln(creat) + 6.43);
      meld = Math.max(6, Math.min(40, meld));
      return meld;
    },
    interp: (s) => s < 10 ? { text: `MELD ${s} — Mortalité à 3 mois < 2%`, level: "ok" } : s < 20 ? { text: `MELD ${s} — Mortalité à 3 mois 6–20%`, level: "warn" } : { text: `MELD ${s} — Mortalité à 3 mois > 20% — discuter greffe`, level: "bad" },
    note: "Prédit la mortalité à 3 mois de la cirrhose et hiérarchise l'accès à la greffe hépatique. Convertir : bilirubine µmol/L ÷ 17 = mg/dL ; créat µmol/L ÷ 88,4 = mg/dL.",
    source: "Kamath Hepatology 2001"
  },
  {
    id: "blatchford", name: "Glasgow-Blatchford", cat: "Digestif & Hépatique", short: "Gravité d'hémorragie digestive haute",
    fields: [
      { id: "uree", label: "Urée (mmol/L)", opts: [["< 6,5", 0], ["6,5–7,9", 2], ["8–9,9", 3], ["10–24,9", 4], ["≥ 25", 6]] },
      { id: "hb", label: "Hémoglobine (g/dL)", opts: [["≥ 13 (H) / ≥ 12 (F)", 0], ["12–12,9 (H) / 10–11,9 (F)", 1], ["10–11,9 (H)", 3], ["< 10", 6]] },
      { id: "tas", label: "PA systolique (mmHg)", opts: [["≥ 110", 0], ["100–109", 1], ["90–99", 2], ["< 90", 3]] },
      { id: "autres", label: "Autres (FC ≥ 100, méléna, syncope, hépatopathie, IC)", opts: [["Aucun", 0], ["Un ou plusieurs présents", 3]] },
    ],
    interp: (s) => s === 0 ? { text: "0 — Très bas risque, prise en charge ambulatoire possible", level: "ok" } : s <= 5 ? { text: `${s} — Risque modéré`, level: "warn" } : { text: `${s} — Risque élevé — endoscopie et hospitalisation`, level: "bad" },
    note: "Évalue le risque d'une hémorragie digestive haute et la nécessité d'une intervention (transfusion, endoscopie). Un score de 0 autorise une prise en charge ambulatoire.",
    source: "Blatchford Lancet 2000"
  },
  {
    id: "ranson", name: "Score de Ranson", cat: "Digestif & Hépatique", short: "Gravité de la pancréatite aiguë",
    fields: [
      { id: "adm", label: "À l'admission : âge>55, GB>16G/L, glycémie>11mmol/L, LDH>350, ASAT>250", opts: [["0 critère", 0], ["1", 1], ["2", 2], ["3", 3], ["4", 4], ["5", 5]] },
      { id: "h48", label: "À 48h : ↓Ht>10%, ↑urée>1,8mmol/L, calcémie<2mmol/L, PaO₂<60, déficit base>4, séquestration>6L", opts: [["0 critère", 0], ["1", 1], ["2", 2], ["3", 3], ["4", 4], ["5", 5], ["6", 6]] },
    ],
    interp: (s) => s <= 2 ? { text: `${s} — Mortalité faible (~1%)`, level: "ok" } : s <= 4 ? { text: `${s} — Mortalité ~15%`, level: "warn" } : { text: `${s} — Pancréatite grave — mortalité 40–100%`, level: "bad" },
    note: "Évalue la gravité d'une pancréatite aiguë (critères à l'admission + à 48h). Un score ≥ 3 définit une forme sévère.",
    source: "Ranson Surg Gynecol Obstet 1974"
  },

  // ─────────── RÉNAL / DIVERS ───────────
  {
    id: "kdigo", name: "Stades KDIGO (IRA)", cat: "Rénal & Divers", short: "Insuffisance rénale aiguë",
    fields: [
      { id: "s", label: "Stade", opts: [["Stade 1 — créat ×1,5–1,9 ou +26,5 µmol/L ; diurèse < 0,5 mL/kg/h × 6–12h", 1], ["Stade 2 — créat ×2–2,9 ; diurèse < 0,5 mL/kg/h ≥ 12h", 2], ["Stade 3 — créat ×3 ou ≥ 354 µmol/L ou EER ; diurèse < 0,3 mL/kg/h ≥ 24h ou anurie ≥ 12h", 3]] },
    ],
    interp: (s) => s === 1 ? { text: "Stade 1 — IRA débutante", level: "warn" } : s === 2 ? { text: "Stade 2 — IRA modérée", level: "bad" } : { text: "Stade 3 — IRA sévère — discuter l'épuration extra-rénale", level: "bad" },
    note: "Classification de l'insuffisance rénale aiguë selon la créatinine et la diurèse. Le stade le plus péjoratif des deux critères est retenu.",
    source: "KDIGO AKI 2012"
  },
  {
    id: "parkland", name: "Formule de Parkland", cat: "Rénal & Divers", short: "Remplissage du brûlé",
    fields: [
      { id: "poids", label: "Poids (kg)", type: "number", placeholder: "ex: 70" },
      { id: "sct", label: "Surface cutanée brûlée (%)", type: "number", placeholder: "ex: 30" },
    ],
    compute: (v) => {
      const p = parseFloat(v.poids) || 0;
      const s = parseFloat(v.sct) || 0;
      return Math.round(4 * p * s);
    },
    interp: (s) => ({ text: `${s} mL de Ringer Lactate sur 24h — la moitié (${Math.round(s/2)} mL) sur les 8 premières heures`, level: "warn" }),
    note: "Volume de cristalloïdes (Ringer Lactate) des 24 premières heures du brûlé = 4 mL × poids × % surface brûlée. Moitié sur 8h, moitié sur 16h. Ajuster sur la diurèse (0,5–1 mL/kg/h).",
    source: "Baxter Parkland Formula · ABA Guidelines"
  },
  {
    id: "wells_tvp", name: "Score de Wells (TVP)", cat: "Rénal & Divers", short: "Probabilité de thrombose veineuse",
    fields: [
      { id: "k", label: "Cancer actif", opts: [["Non", 0], ["Oui (+1)", 1]] },
      { id: "para", label: "Paralysie/immobilisation MI", opts: [["Non", 0], ["Oui (+1)", 1]] },
      { id: "alit", label: "Alitement > 3j ou chirurgie < 12 sem.", opts: [["Non", 0], ["Oui (+1)", 1]] },
      { id: "traj", label: "Douleur sur trajet veineux", opts: [["Non", 0], ["Oui (+1)", 1]] },
      { id: "oed", label: "Œdème de tout le membre", opts: [["Non", 0], ["Oui (+1)", 1]] },
      { id: "mol", label: "Mollet augmenté > 3 cm", opts: [["Non", 0], ["Oui (+1)", 1]] },
      { id: "god", label: "Œdème prenant le godet", opts: [["Non", 0], ["Oui (+1)", 1]] },
      { id: "coll", label: "Circulation veineuse collatérale", opts: [["Non", 0], ["Oui (+1)", 1]] },
      { id: "alt", label: "Diagnostic alternatif aussi probable", opts: [["Non", 0], ["Oui (−2)", -2]] },
    ],
    interp: (s) => s < 1 ? { text: `${s} — Probabilité faible`, level: "ok" } : s <= 2 ? { text: `${s} — Probabilité modérée`, level: "warn" } : { text: `${s} — Probabilité forte — écho-doppler`, level: "bad" },
    note: "Probabilité clinique de thrombose veineuse profonde. Couplé aux D-dimères pour l'algorithme diagnostique.",
    source: "Wells NEJM 2003"
  },
  {
    id: "bps", name: "Behavioral Pain Scale (BPS)", cat: "Neurologie", short: "Douleur du patient intubé-sédaté",
    fields: [
      { id: "vis", label: "Expression du visage", opts: [["Détendu (1)", 1], ["Partiellement crispé — front plissé (2)", 2], ["Totalement crispé — paupières fermées (3)", 3], ["Grimace (4)", 4]] },
      { id: "mb", label: "Mouvements des membres supérieurs", opts: [["Aucun (1)", 1], ["Flexion partielle (2)", 2], ["Flexion complète avec doigts (3)", 3], ["Rétraction permanente (4)", 4]] },
      { id: "vent", label: "Adaptation au respirateur", opts: [["Adapté (1)", 1], ["Toux mais tolère (2)", 2], ["Lutte contre le respirateur (3)", 3], ["Non ventilable (4)", 4]] },
    ],
    interp: (s) => s <= 5 ? { text: `${s}/12 — Douleur contrôlée`, level: "ok" } : { text: `${s}/12 — Douleur significative — adapter l'analgésie (objectif < 6)`, level: "bad" },
    note: "Évalue la douleur chez le patient de réanimation intubé et sédaté, non communicant. Objectif thérapeutique : BPS < 6. Évaluation pluriquotidienne.",
    source: "Payen Crit Care Med 2001"
  },
  {
    id: "cpot", name: "CPOT", cat: "Neurologie", short: "Douleur du patient non communicant",
    fields: [
      { id: "vis", label: "Expression faciale", opts: [["Détendue (0)", 0], ["Tendue, front plissé (1)", 1], ["Grimace (2)", 2]] },
      { id: "mvt", label: "Mouvements corporels", opts: [["Absence (0)", 0], ["Protection (1)", 1], ["Agitation (2)", 2]] },
      { id: "mus", label: "Tension musculaire", opts: [["Détendu (0)", 0], ["Tendu, rigide (1)", 1], ["Très tendu ou rigide (2)", 2]] },
      { id: "vent", label: "Ventilation (intubé) ou vocalisation", opts: [["Tolère / parle normalement (0)", 0], ["Tousse mais tolère / soupire (1)", 1], ["Lutte contre le respirateur / pleure (2)", 2]] },
    ],
    interp: (s) => s <= 2 ? { text: `${s}/8 — Douleur peu probable`, level: "ok" } : { text: `${s}/8 — Douleur probable — adapter l'analgésie (seuil > 2)`, level: "bad" },
    note: "Critical-Care Pain Observation Tool : évalue la douleur du patient non communicant (intubé ou non). Un score > 2 évoque une douleur significative.",
    source: "Gélinas Am J Crit Care 2006"
  },
];

// ═══════════════════════════════════════════════════════════════
// MODULE VENTILATION MÉCANIQUE — RéaGuard v5
// Calculateurs + Schémas SVG + Interprétation alarmes
// ═══════════════════════════════════════════════════════════════

// ─── VENTILATION DATA ──────────────────────────────────────────
const VENT_MODES = [
  {
    id: "vac", name: "Ventilation Assistée Contrôlée (VAC)",
    short: "VAC / VC-CMV",
    description: "Le respirateur délivre un volume courant fixe à chaque cycle. Chaque inspiration déclenchée par le patient ou initiée par la machine reçoit le même volume programmé.",
    indications: ["Induction anesthésique", "Sédation profonde", "Coma", "Curarisation", "SDRA phase initiale"],
    avantages: ["Volume courant garanti", "Pression plateau mesurable", "Calcul de compliance facile"],
    inconvenients: ["Asynchronie patient-ventilateur", "Hyperventilation si patient agité", "Pression variable selon compliance"],
    parametres: [
      { name: "Volume courant (Vt)", cible: "6 mL/kg PPI (4–8 selon compliance)", alerte: "> 8 mL/kg = lésion pulmonaire" },
      { name: "Fréquence respiratoire", cible: "12–20/min", alerte: "> 35/min = fatigue · < 10/min = alcalose" },
      { name: "Pression expiratoire positive (PEP)", cible: "5–10 cmH₂O (adapter)", alerte: "> 15 = risque hémodynamique" },
      { name: "FiO₂", cible: "Titrée SpO₂ 92–96%", alerte: "> 0,60 prolongée = toxicité oxygène" },
      { name: "Débit inspiratoire", cible: "40–60 L/min", alerte: "< 40 = asynchronie · > 80 = turbulences" },
    ]
  },
  {
    id: "vsai", name: "Ventilation Spontanée avec Aide Inspiratoire (VSAI)",
    short: "VSAI / PS-VS",
    description: "Le patient déclenche chaque inspiration. La machine amplifie l'effort inspiratoire avec une pression d'aide réglable. La fréquence et le volume courant dépendent du patient.",
    indications: ["Sevrage ventilatoire", "Patient vigil collaborant", "Insuffisance respiratoire modérée", "Post-extubation VNI"],
    avantages: ["Confort patient", "Préserve la musculature respiratoire", "Synchronie optimale", "Moins de sédation"],
    inconvenients: ["Volume courant variable", "Dépend de l'effort du patient", "Risque de P-SILI (lésions auto-infligées)"],
    parametres: [
      { name: "Aide inspiratoire (PS)", cible: "10–20 cmH₂O (titrer au confort)", alerte: "> 25 = Vt excessif possible · < 5 = effort trop important" },
      { name: "PEP", cible: "5–8 cmH₂O", alerte: "> 10 = risque hémodynamique" },
      { name: "Trigger inspiratoire", cible: "–2 cmH₂O ou 2 L/min", alerte: "Trop sensible = auto-triggers · Trop seuil = asynchronie" },
      { name: "Fréquence respiratoire de secours", cible: "10–12/min (backup)", alerte: "Si FR > 30/min : réévaluer l'aide" },
    ]
  },
  {
    id: "bipap", name: "BiPAP / APRV",
    short: "BiPAP / APRV",
    description: "Alternance entre 2 niveaux de pression (haute et basse). Le patient peut respirer spontanément à n'importe quel moment du cycle. Particulièrement utile dans le SDRA pour maintenir le recrutement alvéolaire.",
    indications: ["SDRA modéré à sévère", "Sevrage difficile", "Hypoxémie réfractaire"],
    avantages: ["Recrutement alvéolaire maintenu", "Respiration spontanée préservée", "Moins de sédation"],
    inconvenients: ["Réglage complexe", "Risque P-SILI si effort spontané excessif", "Monitoring difficile"],
    parametres: [
      { name: "Pression haute (Phigh)", cible: "20–30 cmH₂O", alerte: "> 35 = barotraumatisme" },
      { name: "Temps haut (Thigh)", cible: "4–6 secondes (APRV)", alerte: "< 2s = dérecrutement · > 6s = CO₂ retention" },
      { name: "Pression basse (Plow)", cible: "0–5 cmH₂O", alerte: "> 10 = limitation expiration" },
      { name: "Temps bas (Tlow)", cible: "0,4–0,8 secondes (APRV)", alerte: "Titré sur débit expiratoire de pointe (75% flow)" },
    ]
  },
  {
    id: "vaci", name: "Ventilation Assistée Contrôlée Intermittente (VACI/SIMV)",
    short: "VACI / SIMV",
    description: "Mode mixte : la machine délivre un nombre fixe de cycles contrôlés (volume garanti), synchronisés avec les efforts du patient. Entre ces cycles imposés, le patient peut respirer spontanément, souvent avec une aide inspiratoire.",
    indications: ["Transition vers le sevrage", "Patient reprenant une ventilation spontanée", "Sevrage progressif (historique)"],
    avantages: ["Combine cycles garantis et respiration spontanée", "Transition douce vers la VSAI", "Maintien d'une ventilation minimale"],
    inconvenients: ["Asynchronies possibles", "Travail respiratoire parfois augmenté", "Largement supplanté par la VSAI pour le sevrage"],
    parametres: [
      { name: "Volume courant (cycles imposés)", cible: "6 mL/kg PPI", alerte: "> 8 mL/kg = surdistension" },
      { name: "Fréquence des cycles imposés", cible: "Diminuée progressivement (sevrage)", alerte: "Réduction trop rapide = fatigue" },
      { name: "Aide inspiratoire (cycles spontanés)", cible: "8–15 cmH₂O", alerte: "Insuffisante = épuisement" },
      { name: "PEP", cible: "5–8 cmH₂O", alerte: "> 10 = retentissement hémodynamique" },
    ]
  },
  {
    id: "cpap", name: "Pression Positive Continue (CPAP / VS-PEP)",
    short: "CPAP / VS-PEP",
    description: "Le patient respire spontanément à travers une pression positive continue, sans aide inspiratoire ajoutée. Maintient le recrutement alvéolaire et la capacité résiduelle fonctionnelle.",
    indications: ["Œdème aigu du poumon cardiogénique", "Épreuve de ventilation spontanée (sevrage)", "Apnée du sommeil", "Pré-oxygénation"],
    avantages: ["Recrutement alvéolaire", "Réduit le travail cardiaque dans l'OAP", "Non invasif possible (masque)"],
    inconvenients: ["Aucune aide à l'inspiration (tout l'effort est au patient)", "Inefficace si fatigue musculaire", "Intolérance au masque (VNI)"],
    parametres: [
      { name: "Niveau de PEP/CPAP", cible: "5–10 cmH₂O", alerte: "> 12 = retentissement hémodynamique" },
      { name: "FiO₂", cible: "Titrée SpO₂ 92–96%", alerte: "OAP : souvent FiO₂ élevée initiale" },
      { name: "Critère d'épreuve de sevrage", cible: "CPAP 5 / AI 7 pendant 30 min – 2h", alerte: "Échec = fréquence, désaturation, agitation" },
    ]
  },
  {
    id: "pcv", name: "Ventilation Contrôlée en Pression (PCV)",
    short: "PCV / VC-PC",
    description: "Le respirateur délivre une pression inspiratoire fixe pendant un temps réglé ; le volume courant résulte de la compliance et des résistances. Le débit est décélérant.",
    indications: ["SDRA (contrôle de la pression)", "Compliance pulmonaire très altérée", "Fuites (chirurgie thoracique, fistule)"],
    avantages: ["Pression de crête maîtrisée (limite le barotraumatisme)", "Débit décélérant favorable à la distribution gazeuse"],
    inconvenients: ["Volume courant VARIABLE selon la compliance (risque d'hypoventilation si aggravation)", "Surveillance rapprochée du Vt indispensable"],
    parametres: [
      { name: "Pression inspiratoire (au-dessus de la PEP)", cible: "Titrée pour Vt 6 mL/kg", alerte: "Pression motrice (driving pressure) < 15 cmH₂O" },
      { name: "Temps inspiratoire / I:E", cible: "I:E 1:2 (adapter)", alerte: "Inversé = auto-PEP, retentissement" },
      { name: "PEP", cible: "Selon la pathologie (SDRA : titrée)", alerte: "Vérifier le Vt résultant à chaque changement" },
      { name: "Fréquence respiratoire", cible: "15–25/min", alerte: "Surveiller la PaCO₂ (Vt variable)" },
    ]
  },
];

const VENT_PATHOLOGIES = [
  {
    id: "sdra", name: "SDRA", icon: "🫁", color: "#1D4ED8",
    strategy: "Ventilation ultra-protectrice + décubitus ventral",
    settings: {
      mode: "VAC (Volume Assistée Contrôlée)",
      vt: { formula: "6 mL/kg PPI", min: 4, max: 8, warning: "Réduire si Pplat > 30 ou ΔP > 15" },
      fr: { value: "20–28/min", note: "Compenser la réduction du Vt" },
      pep: { value: "8–16 cmH₂O", note: "Titration individuelle — ARDSnet ou compliance" },
      fio2: { value: "Titrée SpO₂ 92–96%", note: "Éviter > 0,6 prolongée" },
      fi: { value: "1:1 ou 1:1,5", note: "Peut inverser I:E si hypoxémie sévère" },
    },
    objectifs: ["Pression plateau ≤ 30 cmH₂O", "Pression motrice (ΔP) ≤ 15 cmH₂O", "SpO₂ 92–96%", "pH ≥ 7,20 (hypercapnie permissive)"],
    escalade: ["Décubitus ventral ≥ 16h/j si P/F < 150", "Curarisation 48h si P/F < 100", "ECMO VV si P/F < 80"],
    ppi_note: "Le Vt est calculé sur le POIDS PRÉDIT IDÉAL (PPI), pas le poids réel",
    source: "ARDSNet NEJM 2000 · ESICM 2023 · ATS 2024"
  },
  {
    id: "bpco", name: "BPCO décompensée", icon: "💨", color: "#D97706",
    strategy: "Limiter l'auto-PEP — expiration prolongée",
    settings: {
      mode: "VAC puis VSAI dès sevrage possible",
      vt: { formula: "6–8 mL/kg PPI", min: 6, max: 8, warning: "Auto-PEP > 8 cmH₂O → réduire FR ou augmenter Vt" },
      fr: { value: "10–14/min", note: "BASSE — laisser le temps à l'expiration" },
      pep: { value: "5–8 cmH₂O (< auto-PEP mesurée)", note: "PEP externe = 70–80% de l'auto-PEP" },
      fio2: { value: "SpO₂ cible 88–92%", note: "Risque d'inhibition du drive ventilatoire si > 92%" },
      fi: { value: "1:3 à 1:4", note: "Rapport IE LONG — priorité à l'expiration" },
    },
    objectifs: ["Auto-PEP < 5 cmH₂O", "pH ≥ 7,25 (hypercapnie permissive)", "SpO₂ 88–92%", "Pas de distension visible"],
    escalade: ["Mesurer auto-PEP systématiquement (pause expiratoire)", "Si auto-PEP élevée : réduire FR, augmenter temps expiratoire", "Bronchodilatateurs en nébulisation sur circuit"],
    ppi_note: "Mesurer l'auto-PEP par pause expiratoire de 2s — valeur normale < 3 cmH₂O",
    source: "GOLD 2023 · SRLF Recommandations VM"
  },
  {
    id: "asthme", name: "Asthme Grave Intubé", icon: "⚡", color: "#DC2626",
    strategy: "Hypercapnie permissive — éviter le barotraumatisme",
    settings: {
      mode: "VAC Volume Contrôlé",
      vt: { formula: "6 mL/kg PPI", min: 5, max: 7, warning: "PRIORITÉ à la Pplat — réduire Vt si Pplat > 30" },
      fr: { value: "8–12/min", note: "TRÈS BASSE — accepter hypercapnie (pH > 7,20)" },
      pep: { value: "0–5 cmH₂O", note: "PEP minimale — auto-PEP souvent très élevée" },
      fio2: { value: "SpO₂ > 94%", note: "FiO₂ 1,0 initialement puis réduire" },
      fi: { value: "1:4 à 1:5", note: "Temps expiratoire MAXIMAL — risque pneumothorax" },
    },
    objectifs: ["Pression plateau ≤ 30 cmH₂O", "Auto-PEP < 15 cmH₂O", "pH ≥ 7,20 (hypercapnie permissive acceptée)", "Éviter les barotraumatismes"],
    escalade: ["Sédation profonde + curarisation si asynchronie", "Bronchodilatateurs sur circuit", "Héliox si disponible", "Si pneumothorax → drain immédiat"],
    ppi_note: "⚠ Risque barotraumatisme élevé — surveiller pression plateau à chaque changement",
    source: "GINA 2023 · Tuxen Crit Care Med 1987"
  },
  {
    id: "postop", name: "Post-Opératoire Standard", icon: "🔧", color: "#15803D",
    strategy: "Ventilation protectrice peropératoire — sevrage rapide",
    settings: {
      mode: "VAC puis VSAI pour sevrage",
      vt: { formula: "6–8 mL/kg PPI", min: 6, max: 8, warning: "Vt > 10 mL/kg = lésion pulmonaire même poumon sain" },
      fr: { value: "12–16/min", note: "Adapter à la capnie et au pH" },
      pep: { value: "5–8 cmH₂O", note: "PEP minimale de protection — jusqu'à 10 si obésité" },
      fio2: { value: "SpO₂ > 95%", note: "Titrer — éviter FiO₂ 1,0 prolongée post-op" },
      fi: { value: "1:2", note: "Standard — adapter si obstruction" },
    },
    objectifs: ["Normocapnie PaCO₂ 35–45 mmHg", "SpO₂ > 95%", "Critères de sevrabilité dès H6–H12", "Analgésie multimodale pour sevrage rapide"],
    escalade: ["EVS dès critères réunis", "VNI préventive post-extubation si risque élevé", "HFNO si SpO₂ limite après extubation"],
    ppi_note: "Même en poumon sain : Vt > 10 mL/kg est délétère (études IMPROVE, LAS Vegas)",
    source: "ESA Guidelines Perop Vent 2017 · Serpa Neto JAMA 2012"
  },
  {
    id: "tcg", name: "Traumatisme Crânien Grave", icon: "🧠", color: "#6D28D9",
    strategy: "Normocapnie stricte — éviter hypoxie et hypercapnie",
    settings: {
      mode: "VAC — sédation profonde",
      vt: { formula: "6–8 mL/kg PPI", min: 6, max: 8, warning: "Hypercapnie → vasodilatation cérébrale → ↑ PIC" },
      fr: { value: "14–18/min", note: "Normocapnie STRICTE PaCO₂ 35–40 mmHg" },
      pep: { value: "5 cmH₂O", note: "PEP basse — PEP élevée ↑ PVC → ↑ PIC" },
      fio2: { value: "SpO₂ > 94% OBLIGATOIRE", note: "Hypoxie cérébrale = catastrophique — tolérance zéro" },
      fi: { value: "1:2", note: "Standard" },
    },
    objectifs: ["PaCO₂ 35–40 mmHg STRICT", "PaO₂ > 80 mmHg (SpO₂ > 94%)", "PIC < 20 mmHg", "PPC ≥ 60 mmHg"],
    escalade: ["Hyperventilation TEMPORAIRE si engagement : PaCO₂ 30–35 mmHg < 30 min", "Osmothérapie si HTIC (SSH 3% ou Mannitol)", "EEG continu si barbiturique"],
    ppi_note: "Contre-indication RELATIVE à l'hyperventilation prolongée — ischémie cérébrale par vasoconstriction",
    source: "BTF Guidelines TBI 4th ed. 2016"
  },
  {
    id: "pneumonie", name: "Pneumonie Grave / PAVM", icon: "🦠", color: "#0F766E",
    strategy: "Ventilation protectrice — position semi-assise",
    settings: {
      mode: "VAC puis VSAI",
      vt: { formula: "6–8 mL/kg PPI", min: 6, max: 8, warning: "Même sans SDRA : ventilation protectrice recommandée" },
      fr: { value: "16–22/min", note: "Adapter à la capnie — hypoxémie fréquente" },
      pep: { value: "8–12 cmH₂O", note: "Selon oxygénation et compliance" },
      fio2: { value: "SpO₂ 92–96%", note: "Éviter hyperoxie — délétère en pneumonie (Helmerhorst)" },
      fi: { value: "1:2", note: "Standard — prolonger si atteinte unilatérale" },
    },
    objectifs: ["SpO₂ 92–96%", "Pression plateau ≤ 30 cmH₂O", "Position semi-assise 30–45°", "Aspiration sous-glottique continue si sonde adaptée"],
    escalade: ["Décubitus ventral si P/F < 150 (SDRA associé)", "HFNO pré-intubation et post-extubation", "Antibiothérapie ciblée dès H48"],
    ppi_note: "Position semi-assise 30° OBLIGATOIRE : réduit le risque de PAVM de 50%",
    source: "SRLF PAVM 2017 · IDSA/ATS 2019"
  },
];

const ALARMES = [
  {
    alarme: "Haute pression (> Ppic limite)",
    causes: [
      "Toux, aspiration, agitation du patient",
      "Morsure de la sonde d'intubation",
      "Sécrétions obstruant la sonde",
      "Pneumothorax",
      "Bronchospasme aigu",
      "Mauvaise position de la sonde (dans bronche souche)",
      "Compliance pulmonaire diminuée (SDRA aggravé)",
    ],
    conduite: "1. Aspirer les sécrétions · 2. Vérifier position sonde (auscultation + Rx) · 3. Rechercher pneumothorax (écho, Rx) · 4. Bronchodilatateurs si bronchospasme · 5. Sédation si agitation",
    urgence: true,
  },
  {
    alarme: "Basse pression / Fuite",
    causes: [
      "Déconnexion du circuit",
      "Ballonnet dégonflé ou perforé",
      "Fuite au niveau de la sonde",
      "Raccord desserré",
    ],
    conduite: "1. Vérifier toutes les connexions du circuit · 2. Vérifier la pression du ballonnet (cible 20–30 cmH₂O) · 3. Si fuite persiste : changer la sonde",
    urgence: true,
  },
  {
    alarme: "Apnée (absence de déclenchement)",
    causes: [
      "Sédation trop profonde",
      "Curare non levé",
      "Lésion neurologique (tronc cérébral)",
      "Trigger trop peu sensible",
    ],
    conduite: "1. Vérifier que le patient respire (observe thorax) · 2. Réduire sédation si approprié · 3. Ajuster trigger · 4. Passer en mode contrôlé si apnée persistante",
    urgence: false,
  },
  {
    alarme: "FiO₂ basse / SpO₂ chute",
    causes: [
      "Source d'oxygène vide ou déconnectée",
      "Intubation sélective (sonde dans bronche souche droite)",
      "Pneumothorax compressif",
      "Aggravation SDRA",
      "Obstruction sonde par sécrétions ou caillot",
    ],
    conduite: "1. Vérifier source oxygène · 2. Ausculter les deux champs · 3. Passer FiO₂ 1,0 immédiatement · 4. Retirer sonde et ventiler au masque si obstruction totale · 5. Exsufflation si pneumothorax compressif",
    urgence: true,
  },
  {
    alarme: "Fréquence respiratoire élevée (tachypnée)",
    causes: [
      "Douleur, agitation",
      "Acidose métabolique non compensée",
      "Sevrage trop rapide (aide insuffisante)",
      "Auto-triggers (vibrations, eau dans circuit)",
      "Fièvre, sepsis",
    ],
    conduite: "1. Évaluer douleur et sédation · 2. Gaz du sang (acidose ?) · 3. Vider l'eau du circuit · 4. Augmenter aide inspiratoire si sevrage prématuré",
    urgence: false,
  },
  {
    alarme: "Volume courant expiré bas",
    causes: [
      "Fuite dans le circuit ou au niveau du ballonnet",
      "Effort inspiratoire insuffisant (en VSAI)",
      "Bronchospasme sévère",
    ],
    conduite: "1. Vérifier pression ballonnet · 2. Inspecter le circuit · 3. Ausculter pour bronchospasme · 4. Si VSAI : augmenter aide inspiratoire ou passer en mode contrôlé",
    urgence: false,
  },
];

const GAS_INTERPRETATION = {
  steps: [
    {
      step: 1, title: "Évaluer le pH",
      items: [
        { range: "pH < 7,35", interpretation: "Acidose", color: "#DC2626" },
        { range: "pH 7,35 – 7,45", interpretation: "Normal", color: "#15803D" },
        { range: "pH > 7,45", interpretation: "Alcalose", color: "#1D4ED8" },
      ]
    },
    {
      step: 2, title: "Identifier le trouble primaire",
      items: [
        { range: "Acidose + PaCO₂ élevée (> 45 mmHg)", interpretation: "Acidose RESPIRATOIRE", color: "#DC2626" },
        { range: "Acidose + Bicarbonates bas (< 22 mmol/L)", interpretation: "Acidose MÉTABOLIQUE", color: "#D97706" },
        { range: "Alcalose + PaCO₂ basse (< 35 mmHg)", interpretation: "Alcalose RESPIRATOIRE", color: "#1D4ED8" },
        { range: "Alcalose + Bicarbonates élevés (> 26 mmol/L)", interpretation: "Alcalose MÉTABOLIQUE", color: "#6D28D9" },
      ]
    },
    {
      step: 3, title: "Vérifier la compensation",
      items: [
        { range: "Acidose respiratoire aiguë", interpretation: "Bicarb attendu = 24 + (PaCO₂ – 40) × 0,1", color: "#DC2626" },
        { range: "Acidose respiratoire chronique", interpretation: "Bicarb attendu = 24 + (PaCO₂ – 40) × 0,35", color: "#DC2626" },
        { range: "Acidose métabolique", interpretation: "PaCO₂ attendue = 1,5 × [HCO₃⁻] + 8 (± 2) — Formule de Winter", color: "#D97706" },
        { range: "Alcalose métabolique", interpretation: "PaCO₂ attendue = 0,7 × [HCO₃⁻] + 21 (± 2)", color: "#6D28D9" },
      ]
    },
    {
      step: 4, title: "Calculer le trou anionique (si acidose métabolique)",
      items: [
        { range: "TA = Na⁺ – (Cl⁻ + HCO₃⁻)", interpretation: "Normale 8–12 mEq/L (sans albumine corrigée)", color: "#374151" },
        { range: "TA élevé (> 12)", interpretation: "MUDPILES : Méthanol, Urémie, Diabète (céto), Propylène, Isoniazide, Lactate, Éthanol, Salicylés", color: "#DC2626" },
        { range: "TA normal", interpretation: "Pertes digestives (diarrhée), APR tubulaire, Salin excessif", color: "#D97706" },
      ]
    },
  ]
};

// ─── PPI CALCULATOR ─────────────────────────────────────────────
const PPI_FORMULAS = {
  homme: (taille) => 50 + 0.91 * (taille - 152.4),
  femme: (taille) => 45.5 + 0.91 * (taille - 152.4),
};

// ═══════════════════════════════════════════════════════════════
// V5 — COMPOSANTS UI VENTILATION + SCHÉMAS SVG
// ═══════════════════════════════════════════════════════════════

// ─── COURBE PRESSION-TEMPS SVG ──────────────────────────────────
const PressureCurve = ({ mode, peep = 5, pip = 20, ti = 0.8, color = "#1D4ED8" }) => {
  const W = 280, H = 100, pad = 12;
  const cycles = 3;
  const cycleW = (W - pad * 2) / cycles;
  const tiW = cycleW * (ti / 2.5);
  const teW = cycleW - tiW;
  const baseY = H - pad;
  const peepY = baseY - (peep / 40) * (H - pad * 2);
  const pipY = baseY - (pip / 40) * (H - pad * 2);

  let paths = [];
  for (let i = 0; i < cycles; i++) {
    const x0 = pad + i * cycleW;
    const x1 = x0 + tiW;
    const x2 = x0 + cycleW;
    if (mode === "vac") {
      paths.push(`M${x0},${peepY} L${x0},${pipY} L${x1},${pipY} L${x1},${peepY} L${x2},${peepY}`);
    } else if (mode === "vsai") {
      paths.push(`M${x0},${peepY} Q${x0 + tiW * 0.3},${pipY - 8} ${x1},${pipY} L${x1 + tiW * 0.15},${peepY} L${x2},${peepY}`);
    } else {
      paths.push(`M${x0},${peepY} L${x0},${pipY} L${x1},${pipY} L${x1},${peepY} L${x2},${peepY}`);
    }
  }

  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: "auto" }}>
      {/* Grid */}
      <line x1={pad} y1={peepY} x2={W - pad} y2={peepY} stroke="#E2E8F0" strokeWidth="1" strokeDasharray="3,3" />
      <line x1={pad} y1={pipY} x2={W - pad} y2={pipY} stroke="#E2E8F0" strokeWidth="1" strokeDasharray="3,3" />
      {/* Labels */}
      <text x={4} y={pipY + 4} fontSize="8" fill="#94A3B8">Ppic</text>
      <text x={4} y={peepY + 4} fontSize="8" fill="#94A3B8">PEP</text>
      {/* Curve */}
      {paths.map((d, i) => <path key={i} d={d} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />)}
      {/* Axis */}
      <line x1={pad} y1={baseY} x2={W - pad} y2={baseY} stroke="#CBD5E1" strokeWidth="1" />
      <text x={W / 2} y={H - 2} fontSize="8" fill="#94A3B8" textAnchor="middle">Temps →</text>
    </svg>
  );
};

// ─── COURBE DÉBIT-TEMPS SVG ─────────────────────────────────────
const FlowCurve = ({ mode, color = "#15803D" }) => {
  const W = 280, H = 80, pad = 12;
  const cycles = 3;
  const cycleW = (W - pad * 2) / cycles;
  const tiW = cycleW * 0.35;
  const midY = H / 2;
  const ampY = (H / 2) - pad - 4;

  let paths = [];
  for (let i = 0; i < cycles; i++) {
    const x0 = pad + i * cycleW;
    const x1 = x0 + tiW;
    const x2 = x0 + cycleW;
    if (mode === "vac") {
      // Square flow inspiration, exponential expiration
      paths.push(`M${x0},${midY} L${x0},${midY - ampY} L${x1},${midY - ampY} L${x1},${midY} Q${x1 + (x2 - x1) * 0.3},${midY + ampY * 0.8} ${x2},${midY}`);
    } else {
      // Ramp inspiration, exponential expiration
      paths.push(`M${x0},${midY} Q${x0 + tiW * 0.4},${midY - ampY * 1.1} ${x1},${midY - ampY * 0.7} L${x1},${midY} Q${x1 + (x2 - x1) * 0.3},${midY + ampY * 0.8} ${x2},${midY}`);
    }
  }

  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: "auto" }}>
      <line x1={pad} y1={midY} x2={W - pad} y2={midY} stroke="#CBD5E1" strokeWidth="1" />
      <text x={4} y={midY - ampY + 4} fontSize="7" fill="#94A3B8">↑ insp</text>
      <text x={4} y={midY + ampY} fontSize="7" fill="#94A3B8">↓ exp</text>
      {paths.map((d, i) => <path key={i} d={d} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />)}
      <text x={W / 2} y={H - 2} fontSize="8" fill="#94A3B8" textAnchor="middle">Temps →</text>
    </svg>
  );
};

// ─── PULMONARY COMPLIANCE DIAGRAM SVG ──────────────────────────
const ComplianceDiagram = ({ compliance = "normal" }) => {
  const W = 220, H = 160, padX = 35, padY = 15;
  const graphW = W - padX - 10;
  const graphH = H - padY * 2 - 20;

  const curves = {
    normal: { color: "#15803D", label: "Normal (50–80 mL/cmH₂O)", points: [[0,0],[5,25],[10,55],[15,80],[20,98],[25,108],[30,112]] },
    sdra: { color: "#DC2626", label: "SDRA (< 30 mL/cmH₂O)", points: [[0,0],[5,10],[10,22],[15,34],[20,45],[25,53],[30,59]] },
    bpco: { color: "#D97706", label: "BPCO (> 100 mL/cmH₂O)", points: [[0,0],[5,40],[10,78],[15,100],[20,110],[25,115],[30,118]] },
  };

  const maxVol = 120, maxPres = 30;

  const toX = (p) => padX + (p / maxPres) * graphW;
  const toY = (v) => padY + graphH - (v / maxVol) * graphH;

  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: "auto" }}>
      {/* Grid */}
      {[0, 10, 20, 30].map(p => (
        <g key={p}>
          <line x1={toX(p)} y1={padY} x2={toX(p)} y2={padY + graphH} stroke="#F1F5F9" strokeWidth="1" />
          <text x={toX(p)} y={padY + graphH + 12} fontSize="8" fill="#94A3B8" textAnchor="middle">{p}</text>
        </g>
      ))}
      {[0, 40, 80, 120].map(v => (
        <g key={v}>
          <line x1={padX} y1={toY(v)} x2={padX + graphW} y2={toY(v)} stroke="#F1F5F9" strokeWidth="1" />
          <text x={padX - 4} y={toY(v) + 3} fontSize="8" fill="#94A3B8" textAnchor="end">{v}</text>
        </g>
      ))}
      {/* Axes */}
      <line x1={padX} y1={padY} x2={padX} y2={padY + graphH} stroke="#CBD5E1" strokeWidth="1.5" />
      <line x1={padX} y1={padY + graphH} x2={padX + graphW} y2={padY + graphH} stroke="#CBD5E1" strokeWidth="1.5" />
      <text x={W / 2} y={H - 2} fontSize="8" fill="#64748B" textAnchor="middle">Pression (cmH₂O) →</text>
      <text x={10} y={H / 2} fontSize="8" fill="#64748B" textAnchor="middle" transform={`rotate(-90, 10, ${H / 2})`}>Volume (mL)</text>
      {/* Curves */}
      {Object.entries(curves).map(([key, curve]) => {
        const pts = curve.points.map(([p, v]) => `${toX(p)},${toY(v)}`).join(" L");
        const isActive = compliance === key;
        return (
          <g key={key} opacity={isActive || compliance === "all" ? 1 : 0.25}>
            <polyline points={`${curve.points[0][0] === 0 ? toX(0) : toX(curve.points[0][0])},${toY(0)} L${pts}`} fill="none" stroke={curve.color} strokeWidth={isActive ? 2.5 : 1.5} strokeLinecap="round" />
            {isActive && (
              <text x={toX(curve.points[4][0]) + 4} y={toY(curve.points[4][1])} fontSize="7" fill={curve.color} fontWeight="600">{key === "sdra" ? "SDRA" : key === "bpco" ? "BPCO" : "Normal"}</text>
            )}
          </g>
        );
      })}
    </svg>
  );
};

// ─── ALVEOLAR DIAGRAM SVG ───────────────────────────────────────
const AlveoleDiagram = ({ state = "normal" }) => {
  const configs = {
    normal: { fill: "#DBEAFE", stroke: "#1D4ED8", label: "Alvéole normale", sublabel: "Compliance normale" },
    sdra: { fill: "#FEE2E2", stroke: "#DC2626", label: "Alvéole SDRA", sublabel: "Collapsée + exsudat" },
    recrutee: { fill: "#D1FAE5", stroke: "#15803D", label: "Recrutée (PEP+DV)", sublabel: "Après recrutement" },
    surdistension: { fill: "#FEF3C7", stroke: "#D97706", label: "Surdistension", sublabel: "Vt trop élevé" },
  };
  const c = configs[state] || configs.normal;

  return (
    <svg width={120} height={120} viewBox="0 0 120 120" style={{ width: 90, height: 90 }}>
      {state === "normal" && (
        <>
          <circle cx="60" cy="55" r="35" fill={c.fill} stroke={c.stroke} strokeWidth="2" />
          <path d="M60 20 Q45 35 50 55 Q55 70 60 90" fill="none" stroke={c.stroke} strokeWidth="1.5" opacity="0.5" />
          <circle cx="45" cy="50" r="8" fill={c.stroke} opacity="0.15" />
          <circle cx="72" cy="48" r="6" fill={c.stroke} opacity="0.15" />
          <text x="60" y="110" fontSize="9" fill="#374151" textAnchor="middle" fontWeight="600">{c.label}</text>
        </>
      )}
      {state === "sdra" && (
        <>
          <ellipse cx="60" cy="60" rx="30" ry="20" fill={c.fill} stroke={c.stroke} strokeWidth="2" />
          {[45, 55, 65, 75].map((x, i) => <circle key={i} cx={x} cy={55 + (i % 2) * 8} r="4" fill={c.stroke} opacity="0.4" />)}
          <text x="60" y="95" fontSize="9" fill="#374151" textAnchor="middle" fontWeight="600">{c.label}</text>
          <text x="60" y="107" fontSize="8" fill="#94A3B8" textAnchor="middle">{c.sublabel}</text>
        </>
      )}
      {state === "recrutee" && (
        <>
          <circle cx="60" cy="55" r="32" fill={c.fill} stroke={c.stroke} strokeWidth="2.5" />
          <path d="M48 48 L52 58 L58 44 L64 62 L70 48" fill="none" stroke={c.stroke} strokeWidth="1.5" />
          <text x="60" y="104" fontSize="9" fill="#374151" textAnchor="middle" fontWeight="600">{c.label}</text>
          <text x="60" y="116" fontSize="8" fill="#94A3B8" textAnchor="middle">{c.sublabel}</text>
        </>
      )}
      {state === "surdistension" && (
        <>
          <circle cx="60" cy="55" r="42" fill={c.fill} stroke={c.stroke} strokeWidth="2.5" strokeDasharray="4,2" />
          <text x="60" y="55" fontSize="18" textAnchor="middle" dominantBaseline="middle">⚠</text>
          <text x="60" y="112" fontSize="9" fill="#374151" textAnchor="middle" fontWeight="600">{c.label}</text>
        </>
      )}
    </svg>
  );
};

// ═══════════════════════════════════════════════════════════════
// V5 — ÉCRANS MODULE VENTILATION
// ═══════════════════════════════════════════════════════════════

// ─── VENT SETTINGS CALCULATOR ──────────────────────────────────
// ═══════════════════════════════════════════════════════════════
// RÉAGUARD V6 — BIBLIOTHÈQUE D'ILLUSTRATIONS SVG MÉDICALES
// ═══════════════════════════════════════════════════════════════

// ─── ILLUSTRATION CŒUR ─────────────────────────────────────────
const HeartIllustration = ({ size = 80, color = "#DC2626" }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
    <defs>
      <linearGradient id="hg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor={color} stopOpacity="0.15"/>
        <stop offset="100%" stopColor={color} stopOpacity="0.05"/>
      </linearGradient>
    </defs>
    {/* Silhouette cœur */}
    <path d="M50 82 C50 82 15 58 15 35 C15 24 23 16 33 16 C39 16 44 19 48 24 L50 27 L52 24 C56 19 61 16 67 16 C77 16 85 24 85 35 C85 58 50 82 50 82Z" fill={`url(#hg)`} stroke={color} strokeWidth="2.5" strokeLinejoin="round"/>
    {/* Aorte */}
    <path d="M48 24 Q44 12 50 8 Q56 12 52 24" fill="none" stroke={color} strokeWidth="2" opacity="0.6"/>
    {/* Artère pulmonaire */}
    <path d="M46 26 Q35 15 28 20" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5"/>
    {/* Veines */}
    <path d="M54 26 Q65 15 72 20" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5"/>
    {/* ECG intégré */}
    <path d="M22 50 L30 50 L33 44 L37 58 L41 50 L45 50" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.8"/>
  </svg>
);

// ─── ILLUSTRATION POUMONS ───────────────────────────────────────
const LungsIllustration = ({ size = 80, color = "#1D4ED8" }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
    <defs>
      <linearGradient id="lg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor={color} stopOpacity="0.15"/>
        <stop offset="100%" stopColor={color} stopOpacity="0.04"/>
      </linearGradient>
    </defs>
    {/* Trachée */}
    <rect x="46" y="8" width="8" height="22" rx="4" fill="none" stroke={color} strokeWidth="2"/>
    {/* Bronche droite */}
    <path d="M50 30 Q65 28 68 35" fill="none" stroke={color} strokeWidth="2"/>
    {/* Bronche gauche */}
    <path d="M50 30 Q35 28 32 35" fill="none" stroke={color} strokeWidth="2"/>
    {/* Poumon droit */}
    <path d="M68 35 Q80 38 80 52 Q80 70 68 78 Q60 82 55 75 L53 45 Q58 36 68 35Z" fill="url(#lg)" stroke={color} strokeWidth="2"/>
    {/* Poumon gauche */}
    <path d="M32 35 Q20 38 20 52 Q20 70 32 78 Q40 82 45 75 L47 45 Q42 36 32 35Z" fill="url(#lg)" stroke={color} strokeWidth="2"/>
    {/* Bronchioles droites */}
    <path d="M68 42 Q74 44 75 50" fill="none" stroke={color} strokeWidth="1" opacity="0.5"/>
    <path d="M68 50 Q75 52 76 58" fill="none" stroke={color} strokeWidth="1" opacity="0.5"/>
    <path d="M68 58 Q73 62 72 68" fill="none" stroke={color} strokeWidth="1" opacity="0.5"/>
    {/* Bronchioles gauches */}
    <path d="M32 42 Q26 44 25 50" fill="none" stroke={color} strokeWidth="1" opacity="0.5"/>
    <path d="M32 50 Q25 52 24 58" fill="none" stroke={color} strokeWidth="1" opacity="0.5"/>
    <path d="M32 58 Q27 62 28 68" fill="none" stroke={color} strokeWidth="1" opacity="0.5"/>
  </svg>
);

// ─── ILLUSTRATION CERVEAU ───────────────────────────────────────
const BrainIllustration = ({ size = 80, color = "#6D28D9" }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
    <defs>
      <linearGradient id="brg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor={color} stopOpacity="0.18"/>
        <stop offset="100%" stopColor={color} stopOpacity="0.05"/>
      </linearGradient>
    </defs>
    {/* Hémisphère gauche */}
    <path d="M50 20 Q25 20 18 38 Q12 52 18 66 Q24 78 38 80 L48 80 L48 20Z" fill="url(#brg)" stroke={color} strokeWidth="2"/>
    {/* Hémisphère droit */}
    <path d="M50 20 Q75 20 82 38 Q88 52 82 66 Q76 78 62 80 L52 80 L52 20Z" fill="url(#brg)" stroke={color} strokeWidth="2"/>
    {/* Scissure centrale */}
    <line x1="50" y1="20" x2="50" y2="80" stroke={color} strokeWidth="1.5" strokeDasharray="3,2"/>
    {/* Circonvolutions gauche */}
    <path d="M22 38 Q30 34 36 40 Q30 46 22 44" fill="none" stroke={color} strokeWidth="1.5" opacity="0.6"/>
    <path d="M18 52 Q28 48 35 54 Q28 60 18 58" fill="none" stroke={color} strokeWidth="1.5" opacity="0.6"/>
    <path d="M20 66 Q30 62 37 68" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5"/>
    {/* Circonvolutions droite */}
    <path d="M78 38 Q70 34 64 40 Q70 46 78 44" fill="none" stroke={color} strokeWidth="1.5" opacity="0.6"/>
    <path d="M82 52 Q72 48 65 54 Q72 60 82 58" fill="none" stroke={color} strokeWidth="1.5" opacity="0.6"/>
    <path d="M80 66 Q70 62 63 68" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5"/>
    {/* Tronc cérébral */}
    <path d="M44 80 Q44 90 50 92 Q56 90 56 80" fill="url(#brg)" stroke={color} strokeWidth="1.5"/>
  </svg>
);

// ─── ILLUSTRATION REIN ─────────────────────────────────────────
const KidneyIllustration = ({ size = 80, color = "#0F766E" }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
    <defs>
      <linearGradient id="kg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor={color} stopOpacity="0.18"/>
        <stop offset="100%" stopColor={color} stopOpacity="0.05"/>
      </linearGradient>
    </defs>
    {/* Rein droit */}
    <path d="M62 15 Q80 18 82 35 Q84 52 78 65 Q72 78 60 80 Q50 82 48 72 Q46 62 50 50 Q54 38 52 25 Q55 12 62 15Z" fill="url(#kg)" stroke={color} strokeWidth="2"/>
    {/* Bassinet droit */}
    <path d="M56 40 Q65 35 68 45 Q70 55 65 60 Q58 65 54 58 Q52 50 56 40Z" fill={color} fillOpacity="0.12" stroke={color} strokeWidth="1.5"/>
    {/* Uretère droit */}
    <path d="M54 72 Q52 85 50 92" fill="none" stroke={color} strokeWidth="2"/>
    {/* Rein gauche */}
    <path d="M38 15 Q20 18 18 35 Q16 52 22 65 Q28 78 40 80 Q50 82 52 72 Q54 62 50 50 Q46 38 48 25 Q45 12 38 15Z" fill="url(#kg)" stroke={color} strokeWidth="2"/>
    {/* Bassinet gauche */}
    <path d="M44 40 Q35 35 32 45 Q30 55 35 60 Q42 65 46 58 Q48 50 44 40Z" fill={color} fillOpacity="0.12" stroke={color} strokeWidth="1.5"/>
    {/* Uretère gauche */}
    <path d="M46 72 Q48 85 50 92" fill="none" stroke={color} strokeWidth="2"/>
    {/* Artères rénales */}
    <path d="M68 45 Q72 45 78 42" fill="none" stroke={color} strokeWidth="1.5" opacity="0.6"/>
    <path d="M32 45 Q28 45 22 42" fill="none" stroke={color} strokeWidth="1.5" opacity="0.6"/>
  </svg>
);

// ─── ILLUSTRATION FOIE ─────────────────────────────────────────
const LiverIllustration = ({ size = 80, color = "#B45309" }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
    <defs>
      <linearGradient id="livg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor={color} stopOpacity="0.18"/>
        <stop offset="100%" stopColor={color} stopOpacity="0.05"/>
      </linearGradient>
    </defs>
    {/* Corps principal */}
    <path d="M15 35 Q18 20 35 18 Q55 16 72 22 Q85 28 85 45 Q85 62 72 70 Q58 78 42 75 Q25 72 18 60 Q12 50 15 35Z" fill="url(#livg)" stroke={color} strokeWidth="2"/>
    {/* Lobe droit */}
    <path d="M50 20 Q70 22 80 35 Q82 45 75 52 Q65 58 55 55 Q48 45 50 20Z" fill={color} fillOpacity="0.08" stroke={color} strokeWidth="1" strokeDasharray="3,2"/>
    {/* Vésicule biliaire */}
    <ellipse cx="62" cy="65" rx="8" ry="12" fill={color} fillOpacity="0.15" stroke={color} strokeWidth="1.5"/>
    {/* Canal cholédoque */}
    <path d="M62 77 Q62 85 58 90" fill="none" stroke={color} strokeWidth="1.5"/>
    {/* Veine porte */}
    <path d="M30 70 Q30 80 35 88" fill="none" stroke={color} strokeWidth="2" opacity="0.6"/>
    {/* Scissure */}
    <path d="M50 18 Q48 40 50 72" fill="none" stroke={color} strokeWidth="1" strokeDasharray="2,3" opacity="0.4"/>
  </svg>
);

// ─── ILLUSTRATION SANG / COAGULATION ───────────────────────────
const BloodIllustration = ({ size = 80, color = "#DC2626" }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
    <defs>
      <linearGradient id="blg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor={color} stopOpacity="0.2"/>
        <stop offset="100%" stopColor={color} stopOpacity="0.05"/>
      </linearGradient>
    </defs>
    {/* Globule rouge principal */}
    <ellipse cx="38" cy="42" rx="18" ry="13" fill="url(#blg)" stroke={color} strokeWidth="2"/>
    <ellipse cx="38" cy="42" rx="10" ry="6" fill="none" stroke={color} strokeWidth="1" opacity="0.4"/>
    {/* Globule blanc */}
    <circle cx="68" cy="38" r="12" fill={color} fillOpacity="0.08" stroke={color} strokeWidth="1.5" strokeDasharray="2,2"/>
    {/* Plaquette */}
    <ellipse cx="55" cy="65" rx="8" ry="5" fill={color} fillOpacity="0.15" stroke={color} strokeWidth="1.5"/>
    {/* Fibrine */}
    <path d="M20 60 Q35 55 50 62 Q65 68 78 62" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5"/>
    <path d="M25 70 Q40 65 55 72 Q68 76 80 70" fill="none" stroke={color} strokeWidth="1.5" opacity="0.4"/>
    {/* Noyau GBlanc */}
    <path d="M62 32 Q68 28 74 32 Q72 38 68 40 Q64 38 62 32Z" fill={color} fillOpacity="0.2" stroke={color} strokeWidth="1"/>
  </svg>
);

// ─── ILLUSTRATION BÉBÉ / OBSTÉTRIQUE ───────────────────────────
const BabyIllustration = ({ size = 80, color = "#BE185D" }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
    <defs>
      <linearGradient id="babg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor={color} stopOpacity="0.15"/>
        <stop offset="100%" stopColor={color} stopOpacity="0.04"/>
      </linearGradient>
    </defs>
    {/* Utérus */}
    <path d="M25 45 Q22 30 35 22 Q50 15 65 22 Q78 30 75 45 Q75 65 60 78 Q50 85 40 78 Q25 65 25 45Z" fill="url(#babg)" stroke={color} strokeWidth="2"/>
    {/* Bébé - tête */}
    <circle cx="50" cy="42" r="14" fill={color} fillOpacity="0.15" stroke={color} strokeWidth="1.5"/>
    {/* Visage bébé */}
    <circle cx="45" cy="40" r="2" fill={color} fillOpacity="0.5"/>
    <circle cx="55" cy="40" r="2" fill={color} fillOpacity="0.5"/>
    <path d="M45 47 Q50 51 55 47" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    {/* Corps bébé */}
    <ellipse cx="50" cy="62" rx="10" ry="12" fill={color} fillOpacity="0.1" stroke={color} strokeWidth="1.5"/>
    {/* Cordon */}
    <path d="M50 56 Q42 52 38 58 Q34 64 40 68" fill="none" stroke={color} strokeWidth="1.5" opacity="0.6"/>
    {/* Col utérin */}
    <path d="M44 78 Q50 85 56 78" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

// ─── ILLUSTRATION OS / TRAUMA ───────────────────────────────────
const BoneIllustration = ({ size = 80, color = "#334155" }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
    <defs>
      <linearGradient id="bog" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor={color} stopOpacity="0.15"/>
        <stop offset="100%" stopColor={color} stopOpacity="0.04"/>
      </linearGradient>
    </defs>
    {/* Fémur */}
    <path d="M30 15 Q22 15 20 22 Q18 30 25 34 L40 48 L55 62 Q60 68 58 76 Q56 84 62 88 Q70 92 76 86 Q82 80 78 72 Q74 65 68 64 L52 50 L38 36 Q44 32 44 24 Q44 16 38 12 Q32 10 30 15Z" fill="url(#bog)" stroke={color} strokeWidth="2"/>
    {/* Rotule */}
    <circle cx="50" cy="52" r="7" fill={color} fillOpacity="0.1" stroke={color} strokeWidth="1.5"/>
    {/* Fracture simulée */}
    <path d="M38 36 L44 32" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" opacity="0.7"/>
    <path d="M40 38 L48 30" stroke="#DC2626" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
    {/* Trait cortical */}
    <path d="M26 22 Q28 28 32 32" fill="none" stroke={color} strokeWidth="1" opacity="0.4"/>
    <path d="M70 72 Q72 78 70 84" fill="none" stroke={color} strokeWidth="1" opacity="0.4"/>
  </svg>
);

// ─── ILLUSTRATION BOUTEILLE IV ──────────────────────────────────
const IVBagIllustration = ({ size = 70, color = "#1D4ED8" }) => (
  <svg width={size} height={size} viewBox="0 0 100 120" fill="none">
    {/* Crochet */}
    <path d="M50 5 Q50 12 44 14" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
    {/* Poche IV */}
    <path d="M30 18 Q18 18 16 32 L14 75 Q14 88 28 92 L72 92 Q86 88 86 75 L84 32 Q82 18 70 18 Z" fill={color} fillOpacity="0.12" stroke={color} strokeWidth="2"/>
    {/* Niveau liquide */}
    <path d="M16 55 Q50 50 84 55" fill={color} fillOpacity="0.2" stroke={color} strokeWidth="1" strokeDasharray="3,2"/>
    {/* Étiquette */}
    <rect x="28" y="38" width="44" height="28" rx="4" fill={color} fillOpacity="0.1" stroke={color} strokeWidth="1"/>
    <line x1="33" y1="47" x2="67" y2="47" stroke={color} strokeWidth="1" opacity="0.5"/>
    <line x1="33" y1="53" x2="60" y2="53" stroke={color} strokeWidth="1" opacity="0.4"/>
    <line x1="33" y1="59" x2="55" y2="59" stroke={color} strokeWidth="1" opacity="0.3"/>
    {/* Tubulure */}
    <path d="M50 92 L50 115" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
    {/* Goutte */}
    <ellipse cx="50" cy="110" rx="4" ry="6" fill={color} fillOpacity="0.3" stroke={color} strokeWidth="1"/>
  </svg>
);

// ─── ILLUSTRATION SERINGUE ──────────────────────────────────────
const SyringeIllustration = ({ size = 70, color = "#DC2626" }) => (
  <svg width={size} height={size} viewBox="0 0 120 40" fill="none">
    {/* Corps seringue */}
    <rect x="15" y="12" width="70" height="16" rx="4" fill={color} fillOpacity="0.1" stroke={color} strokeWidth="1.5"/>
    {/* Graduation */}
    {[25,35,45,55,65,75].map((x,i) => (
      <line key={i} x1={x} y1="12" x2={x} y2={i%2===0?"19":"16"} stroke={color} strokeWidth="1" opacity="0.5"/>
    ))}
    {/* Piston */}
    <rect x="10" y="10" width="8" height="20" rx="2" fill={color} fillOpacity="0.2" stroke={color} strokeWidth="1.5"/>
    <line x1="6" y1="15" x2="10" y2="15" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    <line x1="6" y1="20" x2="10" y2="20" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    <line x1="6" y1="25" x2="10" y2="25" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    {/* Cône */}
    <path d="M85 14 L95 18 L95 22 L85 26Z" fill={color} fillOpacity="0.15" stroke={color} strokeWidth="1.5"/>
    {/* Aiguille */}
    <line x1="95" y1="20" x2="118" y2="20" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    {/* Liquide */}
    <rect x="30" y="14" width="55" height="12" rx="2" fill={color} fillOpacity="0.15"/>
  </svg>
);

// ─── ILLUSTRATION ECG ───────────────────────────────────────────
const ECGIllustration = ({ size = 200, color = "#DC2626", pathologic = false }) => {
  const h = 50, w = size;
  const mid = h / 2;

  const normalTrace = `M0,${mid} L${w*0.08},${mid} L${w*0.1},${mid-8} L${w*0.12},${mid} L${w*0.15},${mid+3} L${w*0.17},${mid} L${w*0.19},${mid-25} L${w*0.21},${mid+12} L${w*0.23},${mid} L${w*0.28},${mid-5} L${w*0.32},${mid} L${w*0.45},${mid} L${w*0.47},${mid-8} L${w*0.49},${mid} L${w*0.52},${mid+3} L${w*0.54},${mid} L${w*0.56},${mid-25} L${w*0.58},${mid+12} L${w*0.60},${mid} L${w*0.65},${mid-5} L${w*0.69},${mid} L${w*0.82},${mid} L${w*0.84},${mid-8} L${w*0.86},${mid} L${w*0.89},${mid+3} L${w*0.91},${mid} L${w*0.93},${mid-25} L${w*0.95},${mid+12} L${w*0.97},${mid} L${w},${mid}`;

  const hyperkTrace = `M0,${mid} L${w*0.08},${mid} L${w*0.12},${mid-18} L${w*0.14},${mid} L${w*0.19},${mid-28} L${w*0.21},${mid+14} L${w*0.23},${mid} L${w*0.45},${mid} L${w*0.49},${mid-18} L${w*0.51},${mid} L${w*0.56},${mid-28} L${w*0.58},${mid+14} L${w*0.60},${mid} L${w*0.82},${mid} L${w*0.86},${mid-18} L${w*0.88},${mid} L${w*0.93},${mid-28} L${w*0.95},${mid+14} L${w*0.97},${mid} L${w},${mid}`;

  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{ width: "100%", height: "auto" }}>
      <rect width={w} height={h} fill={color} fillOpacity="0.04" rx="4"/>
      {/* Grille */}
      {[0.25,0.5,0.75].map((x,i) => <line key={i} x1={w*x} y1="0" x2={w*x} y2={h} stroke={color} strokeWidth="0.5" opacity="0.2"/>)}
      <line x1="0" y1={mid} x2={w} y2={mid} stroke={color} strokeWidth="0.5" opacity="0.3"/>
      {/* Trace ECG */}
      <path d={pathologic ? hyperkTrace : normalTrace} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
};

// ─── ILLUSTRATION VENTILATEUR ───────────────────────────────────
const VentilatorIllustration = ({ size = 80, color = "#1D4ED8" }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
    {/* Corps ventilateur */}
    <rect x="15" y="25" width="55" height="55" rx="8" fill={color} fillOpacity="0.1" stroke={color} strokeWidth="2"/>
    {/* Écran */}
    <rect x="20" y="30" width="45" height="28" rx="4" fill={color} fillOpacity="0.15" stroke={color} strokeWidth="1.5"/>
    {/* Courbe sur écran */}
    <path d="M23 44 L28 44 L31 38 L34 50 L37 44 L42 44 L45 38 L48 50 L51 44 L62 44" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    {/* Boutons */}
    <circle cx="25" cy="68" r="4" fill={color} fillOpacity="0.2" stroke={color} strokeWidth="1.5"/>
    <circle cx="38" cy="68" r="4" fill={color} fillOpacity="0.2" stroke={color} strokeWidth="1.5"/>
    <circle cx="51" cy="68" r="4" fill={color} fillOpacity="0.2" stroke={color} strokeWidth="1.5"/>
    <rect x="23" y="74" width="40" height="4" rx="2" fill={color} fillOpacity="0.15" stroke={color} strokeWidth="1"/>
    {/* Circuit patient */}
    <path d="M70 45 Q80 45 82 38 Q84 30 78 25" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
    <path d="M70 55 Q82 55 85 48 Q88 40 82 35" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
    {/* Sonde endotrachéale */}
    <path d="M78 25 Q82 20 85 18 Q88 20 88 24 L85 28" fill={color} fillOpacity="0.15" stroke={color} strokeWidth="1.5"/>
  </svg>
);

// ─── SCHÉMA CHOC — ARBRE DÉCISIONNEL ───────────────────────────
const ShockDiagram = ({ C }) => (
  <svg width="100%" viewBox="0 0 320 200" style={{ maxWidth: 400, display: "block" }}>
    {/* Choc */}
    <rect x="110" y="8" width="100" height="28" rx="6" fill="#DC2626" fillOpacity="0.15" stroke="#DC2626" strokeWidth="1.5"/>
    <text x="160" y="27" textAnchor="middle" fontSize="11" fontWeight="700" fill="#DC2626">ÉTAT DE CHOC</text>
    {/* Flèche centrale */}
    <line x1="160" y1="36" x2="160" y2="52" stroke="#94A3B8" strokeWidth="1.5"/>
    {/* Question */}
    <rect x="90" y="52" width="140" height="22" rx="5" fill="#EFF6FF" stroke="#BFDBFE" strokeWidth="1"/>
    <text x="160" y="67" textAnchor="middle" fontSize="9" fill="#1D4ED8">Mécanisme principal ?</text>
    {/* 4 branches */}
    <line x1="160" y1="74" x2="40" y2="95" stroke="#94A3B8" strokeWidth="1"/>
    <line x1="160" y1="74" x2="113" y2="95" stroke="#94A3B8" strokeWidth="1"/>
    <line x1="160" y1="74" x2="207" y2="95" stroke="#94A3B8" strokeWidth="1"/>
    <line x1="160" y1="74" x2="280" y2="95" stroke="#94A3B8" strokeWidth="1"/>
    {/* Type septique */}
    <rect x="5" y="95" width="70" height="28" rx="5" fill="#FEF2F2" stroke="#FECACA" strokeWidth="1.5"/>
    <text x="40" y="107" textAnchor="middle" fontSize="8" fontWeight="700" fill="#DC2626">Septique</text>
    <text x="40" y="116" textAnchor="middle" fontSize="7" fill="#DC2626">NA + ATB</text>
    {/* Type hypovolémique */}
    <rect x="78" y="95" width="70" height="28" rx="5" fill="#FFFBEB" stroke="#FDE68A" strokeWidth="1.5"/>
    <text x="113" y="107" textAnchor="middle" fontSize="8" fontWeight="700" fill="#D97706">Hémorragique</text>
    <text x="113" y="116" textAnchor="middle" fontSize="7" fill="#D97706">Remplissage+Hémostase</text>
    {/* Type cardiogénique */}
    <rect x="172" y="95" width="70" height="28" rx="5" fill="#EFF6FF" stroke="#BFDBFE" strokeWidth="1.5"/>
    <text x="207" y="107" textAnchor="middle" fontSize="8" fontWeight="700" fill="#1D4ED8">Cardiogénique</text>
    <text x="207" y="116" textAnchor="middle" fontSize="7" fill="#1D4ED8">Dobu + ICP</text>
    {/* Type anaphylactique */}
    <rect x="245" y="95" width="70" height="28" rx="5" fill="#F0FDF4" stroke="#BBF7D0" strokeWidth="1.5"/>
    <text x="280" y="107" textAnchor="middle" fontSize="8" fontWeight="700" fill="#15803D">Anaphylactique</text>
    <text x="280" y="116" textAnchor="middle" fontSize="7" fill="#15803D">Adrénaline IM</text>
    {/* PAM cible */}
    <rect x="90" y="140" width="140" height="22" rx="5" fill="#F5F3FF" stroke="#DDD6FE" strokeWidth="1"/>
    <text x="160" y="155" textAnchor="middle" fontSize="9" fill="#6D28D9">Cible PAM ≥ 65 mmHg</text>
    {/* Lactate */}
    <rect x="90" y="168" width="140" height="22" rx="5" fill="#F0FDFA" stroke="#99F6E4" strokeWidth="1"/>
    <text x="160" y="183" textAnchor="middle" fontSize="9" fill="#0F766E">Lactate contrôle à H2</text>
  </svg>
);

// ─── SCHÉMA ANATOMIE LARYNX (ISR) ──────────────────────────────
const LarynxDiagram = ({ C }) => (
  <svg width="100%" viewBox="0 0 280 200" style={{ maxWidth: 320, display: "block" }}>
    {/* Fond */}
    <rect width="280" height="200" rx="8" fill="#F8FAFC"/>
    {/* Langue */}
    <ellipse cx="140" cy="45" rx="55" ry="25" fill="#FECACA" stroke="#DC2626" strokeWidth="1.5" opacity="0.7"/>
    <text x="140" y="49" textAnchor="middle" fontSize="9" fill="#DC2626" fontWeight="600">Langue</text>
    {/* Épiglotte */}
    <path d="M118 62 Q140 55 162 62 Q155 80 140 82 Q125 80 118 62Z" fill="#FDE68A" stroke="#D97706" strokeWidth="1.5"/>
    <text x="140" y="75" textAnchor="middle" fontSize="8" fill="#D97706" fontWeight="600">Épiglotte</text>
    {/* Larynx */}
    <path d="M112 82 Q108 95 110 112 L130 120 L150 120 L170 112 Q172 95 168 82" fill="#DBEAFE" stroke="#1D4ED8" strokeWidth="1.5" fillOpacity="0.5"/>
    {/* Cordes vocales */}
    <path d="M118 95 Q140 88 162 95" fill="none" stroke="#1D4ED8" strokeWidth="2"/>
    <path d="M118 103 Q140 110 162 103" fill="none" stroke="#1D4ED8" strokeWidth="2"/>
    {/* Glotte */}
    <path d="M130 95 Q140 99 150 95 L150 103 Q140 99 130 103Z" fill="#1D4ED8" fillOpacity="0.25"/>
    <text x="140" y="103" textAnchor="middle" fontSize="7" fill="#1D4ED8" fontWeight="700">Glotte</text>
    {/* Trachée */}
    <rect x="128" y="120" width="24" height="50" rx="4" fill="#BBF7D0" stroke="#15803D" strokeWidth="1.5" fillOpacity="0.5"/>
    {/* Anneaux trachéaux */}
    {[130,140,150,160].map((y,i) => <line key={i} x1="128" y1={y} x2="152" y2={y} stroke="#15803D" strokeWidth="1" opacity="0.4"/>)}
    <text x="140" y="150" textAnchor="middle" fontSize="8" fill="#15803D" fontWeight="600">Trachée</text>
    {/* Sonde IOT */}
    <rect x="136" y="75" width="8" height="90" rx="3" fill="#6D28D9" fillOpacity="0.2" stroke="#6D28D9" strokeWidth="1.5" strokeDasharray="3,2"/>
    <ellipse cx="140" cy="158" rx="6" ry="3" fill="#6D28D9" fillOpacity="0.3" stroke="#6D28D9" strokeWidth="1"/>
    {/* Légendes */}
    <text x="178" y="93" fontSize="8" fill="#1D4ED8">Cordes</text>
    <text x="178" y="102" fontSize="8" fill="#1D4ED8">vocales</text>
    <line x1="163" y1="99" x2="177" y2="97" stroke="#1D4ED8" strokeWidth="0.8" strokeDasharray="2,1"/>
    <text x="8" y="148" fontSize="8" fill="#6D28D9">Sonde IOT</text>
    <line x1="45" y1="145" x2="134" y2="130" stroke="#6D28D9" strokeWidth="0.8" strokeDasharray="2,1"/>
  </svg>
);

// ─── SCHÉMA HÉMODYNAMIQUE ───────────────────────────────────────
const HemoDiagram = ({ C }) => (
  <svg width="100%" viewBox="0 0 300 180" style={{ maxWidth: 360, display: "block" }}>
    <rect width="300" height="180" rx="8" fill="#F8FAFC"/>
    {/* Cœur central */}
    <ellipse cx="150" cy="90" rx="28" ry="22" fill="#FEF2F2" stroke="#DC2626" strokeWidth="2"/>
    <text x="150" y="87" textAnchor="middle" fontSize="9" fontWeight="700" fill="#DC2626">Cœur</text>
    <text x="150" y="98" textAnchor="middle" fontSize="8" fill="#DC2626">DC = FC×VES</text>
    {/* Précharge → */}
    <rect x="8" y="78" width="72" height="24" rx="5" fill="#EFF6FF" stroke="#BFDBFE" strokeWidth="1.5"/>
    <text x="44" y="88" textAnchor="middle" fontSize="8" fontWeight="700" fill="#1D4ED8">PRÉCHARGE</text>
    <text x="44" y="97" textAnchor="middle" fontSize="7" fill="#1D4ED8">Volume → VES</text>
    <line x1="80" y1="90" x2="120" y2="90" stroke="#1D4ED8" strokeWidth="2" markerEnd="url(#arr)"/>
    <defs>
      <marker id="arr" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
        <path d="M0,0 L6,3 L0,6Z" fill="#1D4ED8"/>
      </marker>
      <marker id="arr2" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
        <path d="M0,0 L6,3 L0,6Z" fill="#D97706"/>
      </marker>
      <marker id="arr3" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
        <path d="M0,0 L6,3 L0,6Z" fill="#DC2626"/>
      </marker>
    </defs>
    {/* Postcharge ← */}
    <rect x="220" y="78" width="72" height="24" rx="5" fill="#FFFBEB" stroke="#FDE68A" strokeWidth="1.5"/>
    <text x="256" y="88" textAnchor="middle" fontSize="8" fontWeight="700" fill="#D97706">POSTCHARGE</text>
    <text x="256" y="97" textAnchor="middle" fontSize="7" fill="#D97706">RVS → PA</text>
    <line x1="220" y1="90" x2="180" y2="90" stroke="#D97706" strokeWidth="2" markerEnd="url(#arr2)"/>
    {/* Contractilité ↑ */}
    <rect x="104" y="8" width="92" height="24" rx="5" fill="#F0FDF4" stroke="#BBF7D0" strokeWidth="1.5"/>
    <text x="150" y="18" textAnchor="middle" fontSize="8" fontWeight="700" fill="#15803D">CONTRACTILITÉ</text>
    <text x="150" y="27" textAnchor="middle" fontSize="7" fill="#15803D">Inotropisme</text>
    <line x1="150" y1="32" x2="150" y2="67" stroke="#15803D" strokeWidth="2" markerEnd="url(#arr)"/>
    {/* FC */}
    <rect x="104" y="148" width="92" height="24" rx="5" fill="#F5F3FF" stroke="#DDD6FE" strokeWidth="1.5"/>
    <text x="150" y="158" textAnchor="middle" fontSize="8" fontWeight="700" fill="#6D28D9">FRÉQUENCE CARD.</text>
    <text x="150" y="167" textAnchor="middle" fontSize="7" fill="#6D28D9">Chronotropisme</text>
    <line x1="150" y1="148" x2="150" y2="113" stroke="#6D28D9" strokeWidth="2" markerEnd="url(#arr)"/>
    {/* Flèches NA et Dobu */}
    <text x="10" y="130" fontSize="7" fill="#DC2626" fontWeight="600">Noradrénaline →</text>
    <text x="10" y="140" fontSize="7" fill="#DC2626">↑ Postcharge + Précharge</text>
    <text x="165" y="130" fontSize="7" fill="#15803D" fontWeight="600">Dobutamine →</text>
    <text x="165" y="140" fontSize="7" fill="#15803D">↑ Contractilité</text>
  </svg>
);

// ─── SCHÉMA VVC — REPÈRES ANATOMIQUES ──────────────────────────
const VVCDiagram = ({ C }) => (
  <svg width="100%" viewBox="0 0 280 220" style={{ maxWidth: 320, display: "block" }}>
    <rect width="280" height="220" rx="8" fill="#F8FAFC"/>
    {/* Cou */}
    <path d="M90 20 Q90 10 140 8 Q190 10 190 20 L195 100 Q195 140 140 150 Q85 140 85 100Z" fill="#FEE2E2" stroke="#DC2626" strokeWidth="1.5" fillOpacity="0.3"/>
    {/* Veine jugulaire interne */}
    <path d="M145 15 Q150 40 148 80 Q146 120 148 150" fill="none" stroke="#1D4ED8" strokeWidth="8" strokeLinecap="round" opacity="0.5"/>
    <text x="160" y="60" fontSize="8" fill="#1D4ED8" fontWeight="600">VJI</text>
    {/* Artère carotide */}
    <path d="M130 15 Q128 40 130 80 Q132 120 130 150" fill="none" stroke="#DC2626" strokeWidth="6" strokeLinecap="round" opacity="0.5"/>
    <text x="100" y="60" fontSize="8" fill="#DC2626" fontWeight="600">Carotide</text>
    {/* Muscle SCM */}
    <path d="M105 20 Q100 60 95 100 Q92 130 95 150" fill="none" stroke="#92400E" strokeWidth="4" strokeLinecap="round" opacity="0.4"/>
    <text x="68" y="90" fontSize="7" fill="#92400E">SCM</text>
    {/* Point de ponction */}
    <circle cx="148" cy="70" r="6" fill="#1D4ED8" fillOpacity="0.3" stroke="#1D4ED8" strokeWidth="2"/>
    <line x1="148" y1="64" x2="148" y2="20" stroke="#1D4ED8" strokeWidth="1" strokeDasharray="3,2"/>
    <text x="155" y="35" fontSize="8" fill="#1D4ED8" fontWeight="600">Point de ponction</text>
    {/* Aiguille */}
    <line x1="148" y1="70" x2="175" y2="42" stroke="#6D28D9" strokeWidth="2.5" strokeLinecap="round"/>
    <polygon points="175,42 168,46 172,52" fill="#6D28D9"/>
    {/* Clavicule */}
    <path d="M80 170 Q140 160 200 170" fill="none" stroke="#374151" strokeWidth="4" strokeLinecap="round" opacity="0.5"/>
    <text x="140" y="185" textAnchor="middle" fontSize="8" fill="#374151" fontWeight="600">Clavicule</text>
    {/* Triangle de sécurité */}
    <path d="M100 150 L180 150 L148 70Z" fill="#F0FDF4" stroke="#15803D" strokeWidth="1" strokeDasharray="3,2" fillOpacity="0.3"/>
    <text x="148" y="130" textAnchor="middle" fontSize="7" fill="#15803D">Triangle</text>
    <text x="148" y="140" textAnchor="middle" fontSize="7" fill="#15803D">de sécurité</text>
    {/* Légende */}
    <rect x="5" y="190" width="270" height="26" rx="4" fill="#EFF6FF" stroke="#BFDBFE"/>
    <circle cx="15" cy="203" r="4" fill="#1D4ED8" fillOpacity="0.5"/>
    <text x="22" y="206" fontSize="7" fill="#1D4ED8">VJI droite — Voie de choix (faible risque pneumothorax)</text>
  </svg>
);

// ─── SCHÉMA TRIANGLE DE SÉCURITÉ DRAIN THORACIQUE ──────────────
const DrainDiagram = ({ C }) => (
  <svg width="100%" viewBox="0 0 280 200" style={{ maxWidth: 320, display: "block" }}>
    <rect width="280" height="200" rx="8" fill="#F8FAFC"/>
    {/* Thorax */}
    <path d="M60 30 Q60 15 140 12 Q220 15 220 30 L230 140 Q230 175 140 180 Q50 175 50 140Z" fill="#FEE2E2" stroke="#DC2626" strokeWidth="1.5" fillOpacity="0.2"/>
    {/* Côtes */}
    {[50,65,80,95,110].map((y,i) => (
      <path key={i} d={`M75 ${y+20} Q140 ${y+15} 205 ${y+20}`} fill="none" stroke="#94A3B8" strokeWidth="2" opacity="0.4"/>
    ))}
    {/* Triangle de sécurité */}
    <path d="M95 80 L175 80 L175 155 L95 155Z" fill="#D1FAE5" stroke="#15803D" strokeWidth="2" fillOpacity="0.4"/>
    <text x="135" y="115" textAnchor="middle" fontSize="9" fontWeight="700" fill="#15803D">Zone</text>
    <text x="135" y="126" textAnchor="middle" fontSize="9" fontWeight="700" fill="#15803D">sécurité</text>
    {/* Point idéal */}
    <circle cx="135" cy="100" r="7" fill="#15803D" fillOpacity="0.4" stroke="#15803D" strokeWidth="2"/>
    <text x="150" y="88" fontSize="8" fill="#15803D" fontWeight="600">4-5ème EIC</text>
    <text x="150" y="97" fontSize="8" fill="#15803D">Ligne axillaire</text>
    <text x="150" y="106" fontSize="8" fill="#15803D">antérieure</text>
    {/* Ligne axillaire antérieure */}
    <line x1="95" y1="20" x2="95" y2="180" stroke="#1D4ED8" strokeWidth="1.5" strokeDasharray="4,3" opacity="0.6"/>
    <text x="55" y="35" fontSize="7" fill="#1D4ED8">L.A.A.</text>
    {/* Ligne axillaire moyenne */}
    <line x1="140" y1="15" x2="140" y2="180" stroke="#94A3B8" strokeWidth="1" strokeDasharray="3,3" opacity="0.4"/>
    {/* Drain */}
    <path d="M135 100 L135 170 Q135 178 142 180" fill="none" stroke="#6D28D9" strokeWidth="3" strokeLinecap="round"/>
    <circle cx="135" cy="100" r="4" fill="#6D28D9"/>
    {/* Zones à éviter */}
    <path d="M140 155 L200 175 L220 155 L200 130Z" fill="#FEF2F2" stroke="#DC2626" strokeWidth="1" strokeDasharray="2,2" fillOpacity="0.3"/>
    <text x="182" y="155" textAnchor="middle" fontSize="7" fill="#DC2626">Éviter</text>
    <text x="182" y="164" textAnchor="middle" fontSize="7" fill="#DC2626">(diaphragme)</text>
  </svg>
);

// ─── HEADER CARD SPÉCIALITÉ enrichi ────────────────────────────
const SpecHeaderCard = ({ spec, C }) => {
  const illustrations = {
    acr: <HeartIllustration size={70} color={spec.color} />,
    pneumo: <LungsIllustration size={70} color={spec.color} />,
    neuro: <BrainIllustration size={70} color={spec.color} />,
    meta: null,
    nephro: <KidneyIllustration size={70} color={spec.color} />,
    gastro: <LiverIllustration size={70} color={spec.color} />,
    hemato: <BloodIllustration size={70} color={spec.color} />,
    obst: <BabyIllustration size={70} color={spec.color} />,
    trauma: <BoneIllustration size={70} color={spec.color} />,
    choc: null,
    infecto: null,
    toxico: null,
    psy: null,
    dermato: null,
    pediatrie: <BabyIllustration size={70} color={spec.color} />,
  };

  const illus = illustrations[spec.id];

  return (
    <div style={{ background: `linear-gradient(135deg, ${spec.color}18 0%, ${spec.color}08 100%)`, border: `1px solid ${spec.color}30`, borderRadius: 12, padding: "14px 16px", marginBottom: 14, display: "flex", alignItems: "center", gap: 14, overflow: "hidden", position: "relative" }}>
      {illus && (
        <div style={{ flexShrink: 0, opacity: 0.85 }}>{illus}</div>
      )}
      {!illus && (
        <div style={{ width: 70, height: 70, borderRadius: 12, background: spec.color + "20", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <SvgIcon name={spec.iconName} size={36} color={spec.color} />
        </div>
      )}
      <div>
        <div style={{ fontSize: 16, fontWeight: 800, color: spec.color, lineHeight: 1.2, marginBottom: 4 }}>{spec.label}</div>
        <div style={{ fontSize: 11, color: C.textSoft }}>{spec.protos.length} protocoles · Recommandations GRADE</div>
      </div>
    </div>
  );
};

// ─── SCHÉMA CONTEXTUEL PAR PROTOCOLE ───────────────────────────
const ProtocolIllustration = ({ specId, protoName, C }) => {
  if (specId === "choc" && protoName.includes("Choc")) return (
    <div style={{ background: "#fff", borderRadius: 10, border: `1px solid ${C.border}`, padding: "12px 14px", marginBottom: 12 }}>
      <div style={{ fontSize: 10, fontWeight: 700, color: C.textSoft, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 10 }}>Arbre décisionnel</div>
      <ShockDiagram C={C} />
    </div>
  );
  if ((specId === "neuro" || specId === "infecto") && protoName.includes("Méningite") || specId === "pneumo" && protoName.includes("Séquence")) return null;
  if (specId === "infecto" && protoName.includes("Voie") || specId === "acr" && protoName.includes("Cardio")) return null;
  return null;
};


// ═══ MODULE INFECTIOLOGIE DATA ═══
// ═══════════════════════════════════════════════════════════════
// MODULE INFECTIOLOGIE — RéaGuard v8
// Antibiothérapie · BMR · Désescalade · Posologies · Durées · PK/PD
// ═══════════════════════════════════════════════════════════════

const INFECTO_SITUATIONS = [
  {
    id: "sepsis_npe",
    name: "Sepsis sans porte d'entrée",
    icon: "🔴",
    color: "#DC2626",
    bgColor: "#FEF2F2",
    probabiliste: {
      standard: {
        label: "Pas de facteur de risque BMR",
        molecules: [
          { name: "Pipéracilline-Tazobactam (Tazocilline®)", dose: "4 g IV", frequence: "toutes les 6h (ou 4g en perfusion continue sur 24h)", duree: "jusqu'à identification du germe", note: "Spectre large, premier choix en sepsis communautaire sévère" },
          { name: "Gentamicine", dose: "5–7 mg/kg IV", frequence: "dose unique quotidienne", duree: "24–48h uniquement (synergie initiale)", note: "Dose unique, adapter selon la clairance — arrêter dès 48h" },
        ],
        source: "SSC 2024 · SRLF 2022"
      },
      bmr: {
        label: "Facteur de risque BMR ou sepsis nosocomial",
        molecules: [
          { name: "Méropénème (Méronem®)", dose: "2 g IV", frequence: "toutes les 8h (perfusion prolongée 3h si BLSE)", duree: "jusqu'à identification", note: "Couvre BLSE, Pseudomonas — réserver aux situations à risque élevé" },
          { name: "Vancomycine", dose: "30 mg/kg/j IV", frequence: "en perfusion continue ou 2 fois/j", duree: "jusqu'à antibiogramme", note: "Si suspicion SARM ou colonisation connue — cible AUC/CMI 400–600" },
        ],
        source: "SPILF 2022 · SRLF BMR 2022"
      },
      choc: {
        label: "Choc septique — couverture maximale d'emblée",
        molecules: [
          { name: "Méropénème", dose: "2 g IV", frequence: "toutes les 8h", duree: "désescalade à 48–72h", note: "" },
          { name: "Vancomycine", dose: "30 mg/kg/j IV", frequence: "continu", duree: "désescalade à 48–72h", note: "" },
          { name: "Amikacine", dose: "30 mg/kg IV", frequence: "dose unique J1 uniquement", duree: "1 dose (synergie initiale)", note: "Une seule injection — ne pas répéter sauf exception" },
        ],
        source: "SSC 2024"
      }
    }
  },
  {
    id: "pavm",
    name: "PAVM / Pneumonie nosocomiale",
    icon: "🫁",
    color: "#1D4ED8",
    bgColor: "#EFF6FF",
    probabiliste: {
      standard: {
        label: "PAVM précoce (< 5 jours) sans facteur de risque BMR",
        molecules: [
          { name: "Amoxicilline-Acide clavulanique (Augmentin®)", dose: "2 g IV", frequence: "toutes les 6h", duree: "8 jours total", note: "Forme précoce sans facteur de risque — germes communs" },
          { name: "Céfotaxime (Claforan®)", dose: "2 g IV", frequence: "toutes les 8h", duree: "8 jours", note: "Alternative — bonne couverture pneumocoque" },
        ],
        source: "IDSA/ATS HAP/VAP Guidelines 2024 · SRLF PAVM 2017"
      },
      bmr: {
        label: "PAVM tardive (≥ 5 jours) ou facteur de risque BMR",
        molecules: [
          { name: "Pipéracilline-Tazobactam", dose: "4 g IV", frequence: "toutes les 6h ou continu 16g/24h", duree: "8 jours (non-Pseudomonas) / 14 jours (Pseudomonas)", note: "Anti-Pseudomonas — perfusion continue si Pseudomonas suspecté" },
          { name: "Amikacine", dose: "30 mg/kg IV", frequence: "dose unique quotidienne × 3–5j", duree: "3–5 jours", note: "Synergie et couverture Pseudomonas — guider par dosage pharmacologique" },
          { name: "Vancomycine", dose: "30–45 mg/kg/j IV", frequence: "continu ou 2×/j", duree: "jusqu'à antibiogramme", note: "Si SARM suspecté (colonisation ou facteur de risque)" },
        ],
        source: "IDSA/ATS HAP/VAP Guidelines 2024"
      },
      choc: {
        label: "PAVM sévère — choc septique ou ventilation difficile",
        molecules: [
          { name: "Méropénème", dose: "2 g IV", frequence: "toutes les 8h en perfusion 3h", duree: "8–14 jours selon germe", note: "Perfusion prolongée augmente le temps au-dessus de la CMI" },
          { name: "Amikacine", dose: "30 mg/kg IV", frequence: "quotidienne × 3–5j", duree: "3–5 jours max", note: "" },
          { name: "Vancomycine ou Linézolide", dose: "600 mg IV/PO × 2/j (Linézolide)", frequence: "toutes les 12h", duree: "14 jours si SARM prouvé", note: "Linézolide supérieur à la vancomycine dans la PAVM à SARM (étude ZEPHyR)" },
        ],
        source: "IDSA/ATS 2024 · Wunderink CHEST 2012 (ZEPHyR)"
      }
    }
  },
  {
    id: "pneumonie_communautaire",
    name: "Pneumonie Communautaire Grave",
    icon: "💨",
    color: "#0284C7",
    bgColor: "#F0F9FF",
    probabiliste: {
      standard: {
        label: "Pneumonie communautaire grave — admission réanimation",
        molecules: [
          { name: "Amoxicilline-Acide clavulanique", dose: "1 g IV", frequence: "toutes les 8h", duree: "7 jours", note: "Couvre pneumocoque, H. influenzae, anaérobies" },
          { name: "Azithromycine (Zithromax®)", dose: "500 mg IV ou PO", frequence: "1×/j", duree: "5 jours", note: "Couverture des germes atypiques (Legionella, Mycoplasme) — à associer SYSTÉMATIQUEMENT en réa" },
        ],
        source: "SPILF/SPLF Pneumonie 2020"
      },
      bmr: {
        label: "Suspicion Legionella ou terrain immunodéprimé",
        molecules: [
          { name: "Lévofloxacine (Tavanic®)", dose: "500 mg IV", frequence: "toutes les 12h", duree: "10–14 jours si Legionella confirmée", note: "MONOTHÉRAPIE possible si Legionella — ajouter rifampicine si forme grave" },
          { name: "Céfotaxime", dose: "2 g IV", frequence: "toutes les 8h", duree: "7 jours", note: "Remplace l'amoxicilline si allergie ou résistance pneumocoque" },
          { name: "Rifampicine", dose: "600 mg IV", frequence: "toutes les 12h", duree: "21 jours si Legionella sévère", note: "Adjuvant à la lévofloxacine dans les formes très sévères de légionellose" },
        ],
        source: "SPILF Legionellose 2021"
      },
      choc: {
        label: "Pneumonie grave avec choc ou facteur de risque Pseudomonas",
        molecules: [
          { name: "Pipéracilline-Tazobactam", dose: "4 g IV", frequence: "toutes les 6h", duree: "8–10 jours", note: "Si bronchectasies, BPCO sévère, corticothérapie prolongée" },
          { name: "Lévofloxacine", dose: "500 mg IV", frequence: "toutes les 12h", duree: "7–10 jours", note: "Associer pour couvrir les atypiques" },
        ],
        source: "IDSA/ATS CAP Guidelines 2024"
      }
    }
  },
  {
    id: "infection_urinaire",
    name: "Infection Urinaire Haute Compliquée",
    icon: "🔬",
    color: "#0F766E",
    bgColor: "#F0FDFA",
    probabiliste: {
      standard: {
        label: "Pyélonéphrite compliquée ou prostatite — pas de BMR",
        molecules: [
          { name: "Céfotaxime", dose: "2 g IV", frequence: "toutes les 8h", duree: "10–14 jours total (switch oral à 48–72h si possible)", note: "Première intention — bonne couverture entérobactéries communautaires" },
          { name: "Gentamicine", dose: "5 mg/kg IV", frequence: "dose unique quotidienne", duree: "48–72h puis relais oral", note: "Alternative ou association initiale si forme sévère" },
        ],
        source: "SPILF Infections Urinaires 2024"
      },
      bmr: {
        label: "Suspicion BLSE ou infection nosocomiale",
        molecules: [
          { name: "Méropénème ou Ertapénème", dose: "1 g IV (Ertapénème)", frequence: "1×/j", duree: "10–14 jours", note: "Ertapénème si BLSE confirmé sans facteur de risque Pseudomonas (plus commode : 1×/j)" },
          { name: "Tigécycline", dose: "100 mg IV dose de charge puis 50 mg", frequence: "toutes les 12h", duree: "10–14 jours", note: "Si EPC (entérobactérie productrice de carbapénémase) — association obligatoire" },
        ],
        source: "SPILF BLSE 2022"
      },
      choc: {
        label: "Choc septique d'origine urinaire",
        molecules: [
          { name: "Méropénème", dose: "2 g IV", frequence: "toutes les 8h", duree: "désescalade à 48h si possible", note: "" },
          { name: "Amikacine", dose: "30 mg/kg IV", frequence: "dose unique J1", duree: "1 dose", note: "" },
        ],
        source: "SSC 2024"
      }
    }
  },
  {
    id: "peritonite",
    name: "Infection Abdominale — Péritonite",
    icon: "🩺",
    color: "#B45309",
    bgColor: "#FFFBEB",
    probabiliste: {
      standard: {
        label: "Péritonite communautaire",
        molecules: [
          { name: "Amoxicilline-Acide clavulanique", dose: "2 g IV", frequence: "toutes les 6h", duree: "5–7 jours après contrôle du foyer", note: "Couvre entérobactéries + anaérobies — péritonite communautaire simple" },
          { name: "Métronidazole (Flagyl®)", dose: "500 mg IV", frequence: "toutes les 8h", duree: "5–7 jours", note: "Couverture anaérobie renforcée si péritonite stercorale ou fécale" },
        ],
        source: "SFAR/SFCD Péritonite 2021 · WSES 2021"
      },
      bmr: {
        label: "Péritonite nosocomiale ou post-opératoire",
        molecules: [
          { name: "Pipéracilline-Tazobactam", dose: "4 g IV", frequence: "toutes les 6h", duree: "7–10 jours", note: "Couvre Pseudomonas et anaérobies — standard des péritonites post-opératoires" },
          { name: "Fluconazole", dose: "800 mg dose de charge puis 400 mg IV", frequence: "1×/j", duree: "14 jours si Candida isolé", note: "Antifongique SYSTÉMATIQUE si Candida dans le liquide péritonéal, nutrition parentérale ou chirurgie abdominale majeure" },
        ],
        source: "SFAR/SFCD 2021 · ESCMID Candida 2020"
      },
      choc: {
        label: "Péritonite avec choc septique",
        molecules: [
          { name: "Méropénème", dose: "2 g IV", frequence: "toutes les 8h", duree: "jusqu'à désescalade", note: "" },
          { name: "Amikacine", dose: "30 mg/kg IV", frequence: "dose unique J1", duree: "1 dose", note: "" },
          { name: "Caspofungine (Cancidas®)", dose: "70 mg J1 puis 50 mg IV", frequence: "1×/j", duree: "14 jours si Candida", note: "Préférer aux azolés en choc septique (meilleure fongicidie initiale)" },
        ],
        source: "SSC 2024 · ESCMID 2020"
      }
    }
  },
  {
    id: "meningite",
    name: "Méningite Bactérienne",
    icon: "🧠",
    color: "#6D28D9",
    bgColor: "#F5F3FF",
    probabiliste: {
      standard: {
        label: "Adulte immunocompétent < 50 ans",
        molecules: [
          { name: "Céfotaxime", dose: "300 mg/kg/j IV", frequence: "en 4–6 perfusions ou continu", duree: "10–14 jours (pneumocoque) / 7 jours (méningocoque)", note: "Maximum 24 g/jour — démarrer AVANT la ponction lombaire si délai > 30 min" },
          { name: "Dexaméthasone", dose: "0,15 mg/kg IV", frequence: "toutes les 6h × 4 jours", duree: "4 jours", note: "AVANT ou AVEC les antibiotiques — réduit la mortalité et les séquelles (pneumocoque)" },
        ],
        source: "SPILF Méningites 2018"
      },
      bmr: {
        label: "Sujet > 50 ans, immunodéprimé ou grossesse (couverture Listeria)",
        molecules: [
          { name: "Céfotaxime", dose: "300 mg/kg/j IV", frequence: "4–6 fois/j", duree: "10–21 jours selon germe", note: "" },
          { name: "Amoxicilline", dose: "200 mg/kg/j IV", frequence: "4–6 fois/j", duree: "21 jours si Listeria confirmée", note: "OBLIGATOIRE si > 50 ans ou immunodéprimé — Listeria résistante aux céphalosporines" },
          { name: "Dexaméthasone", dose: "0,15 mg/kg IV", frequence: "toutes les 6h × 4 jours", duree: "4 jours", note: "Arrêter si germe différent du pneumocoque ou du méningocoque" },
        ],
        source: "SPILF Méningites 2018"
      },
      choc: {
        label: "Purpura fulminans — traitement pré-hospitalier",
        molecules: [
          { name: "Ceftriaxone (Rocéphine®)", dose: "2 g IV ou IM", frequence: "dose unique — AVANT le transport", duree: "relais céfotaxime en réanimation", note: "Injecter SUR PLACE si délai de transfert > 30 minutes — ne jamais attendre" },
        ],
        source: "DGS/SPILF 2018"
      }
    }
  },
  {
    id: "endocardite",
    name: "Endocardite Infectieuse",
    icon: "❤️",
    color: "#DC2626",
    bgColor: "#FEF2F2",
    probabiliste: {
      standard: {
        label: "Valve native — germe non encore identifié",
        molecules: [
          { name: "Amoxicilline", dose: "200 mg/kg/j IV", frequence: "en 4–6 perfusions ou continu", duree: "4–6 semaines selon germe", note: "Couvre Streptocoques (60% des endocardites sur valve native)" },
          { name: "Oxacilline (Bristopen®)", dose: "200 mg/kg/j IV", frequence: "en 4–6 perfusions", duree: "4–6 semaines", note: "Couvre SAMS — associer si origine cutanée ou porte d'entrée staphylococcique" },
          { name: "Gentamicine", dose: "3 mg/kg/j IV", frequence: "1×/j", duree: "2 semaines uniquement (toxicité)", note: "Synergie bactéricide — ne pas prolonger au-delà de 2 semaines" },
        ],
        source: "ESC Endocardite Guidelines 2023"
      },
      bmr: {
        label: "Prothèse valvulaire ou suspicion SARM",
        molecules: [
          { name: "Vancomycine", dose: "30–45 mg/kg/j IV", frequence: "continu (cible AUC/CMI 400–600)", duree: "6 semaines", note: "Endocardite sur prothèse ou SARM — monitoring pharmacologique obligatoire" },
          { name: "Rifampicine", dose: "1 200 mg/j PO ou IV", frequence: "en 2 prises", duree: "6 semaines (prothèse)", note: "Pénètre dans le biofilm — INDISPENSABLE sur prothèse — ne jamais débuter en bactériémie active" },
          { name: "Gentamicine", dose: "3 mg/kg/j IV", frequence: "1×/j", duree: "2 semaines", note: "" },
        ],
        source: "ESC Endocardite Guidelines 2023"
      },
      choc: {
        label: "Endocardite avec insuffisance cardiaque ou choc",
        molecules: [
          { name: "Vancomycine", dose: "30–45 mg/kg/j IV continu", frequence: "continu", duree: "jusqu'à chirurgie puis relais", note: "Indication chirurgicale urgente dans les 24–72h si instabilité hémodynamique" },
          { name: "Gentamicine", dose: "3 mg/kg/j IV", frequence: "1×/j", duree: "2 semaines", note: "" },
        ],
        source: "ESC 2023 — Heart Team decision"
      }
    }
  },
  {
    id: "neutropenie",
    name: "Neutropénie Fébrile",
    icon: "🦠",
    color: "#15803D",
    bgColor: "#F0FDF4",
    probabiliste: {
      standard: {
        label: "Neutropénie fébrile — risque standard (aplasie < 7 jours)",
        molecules: [
          { name: "Pipéracilline-Tazobactam", dose: "4 g IV", frequence: "toutes les 6h", duree: "jusqu'à apyrexie 48h + PNN > 500", note: "Anti-Pseudomonas essentiel — ne jamais sous-traiter une neutropénie fébrile" },
          { name: "Amikacine", dose: "30 mg/kg IV", frequence: "dose unique quotidienne", duree: "3–5 jours si bactériémie documentée", note: "Synergie initiale — arrêter dès stabilisation" },
        ],
        source: "ECIL-9 2023 · IDSA 2011"
      },
      bmr: {
        label: "Neutropénie profonde prolongée (> 7 jours) ou instabilité",
        molecules: [
          { name: "Méropénème", dose: "1 g IV", frequence: "toutes les 8h", duree: "jusqu'à sortie d'aplasie", note: "Si aplasie > 7 jours ou antécédent BLSE/EPC" },
          { name: "Vancomycine", dose: "30 mg/kg/j IV", frequence: "continu", duree: "jusqu'à antibiogramme", note: "Si mucite sévère, cathéter infecté suspecté ou SARM connu" },
          { name: "Caspofungine", dose: "70 mg J1 puis 50 mg IV", frequence: "1×/j", duree: "jusqu'à sortie d'aplasie", note: "Antifongique empirique si fièvre persistante > 4 jours malgré ATB" },
        ],
        source: "ECIL-9 2023"
      },
      choc: {
        label: "Neutropénie fébrile avec choc septique",
        molecules: [
          { name: "Méropénème", dose: "2 g IV", frequence: "toutes les 8h", duree: "désescalade à 48h si possible", note: "" },
          { name: "Amikacine", dose: "30 mg/kg IV", frequence: "dose unique J1", duree: "1 dose", note: "" },
          { name: "Caspofungine", dose: "70 mg J1 puis 50 mg IV", frequence: "1×/j", duree: "14 jours minimum si Candida", note: "Antifongique d'emblée en choc chez le neutropénique" },
          { name: "Vancomycine", dose: "30–45 mg/kg/j IV", frequence: "continu", duree: "jusqu'à antibiogramme", note: "" },
        ],
        source: "ECIL-9 2023 · SSC 2024"
      }
    }
  },
];

// ─── DÉSESCALADE ANTIBIOTIQUE ──────────────────────────────────
const DESESCALADE = {
  // COCCI GRAM POSITIF
  "Staphylococcus aureus sensible méticilline (SAMS)": {
    color: "#D97706",
    molecules: [
      { name: "Oxacilline (Bristopen®)", dose: "150–200 mg/kg/j IV", frequence: "4–6×/j", duree: "Standard selon localisation", note: "MOLÉCULE DE RÉFÉRENCE — supérieure à la vancomycine sur SAMS" },
      { name: "Céfazoline (Kefzol®)", dose: "6–12 g/j IV", frequence: "3×/j", duree: "Standard", note: "Alternative si intolérance pénicillines (test allergie recommandé)" },
    ],
    arret_vanco: "⚠ DÉSESCALADER la vancomycine vers l'oxacilline dès SAMS confirmé — mortalité plus élevée sous vancomycine sur SAMS"
  },
  "Staphylococcus aureus résistant méticilline (SARM)": {
    color: "#DC2626",
    molecules: [
      { name: "Vancomycine", dose: "30–45 mg/kg/j IV", frequence: "continu — cible AUC/CMI 400–600", duree: "Selon localisation (endocardite 6 sem, bactériémie 14j minimum)", note: "Monitoring pharmacologique obligatoire — toxicité rénale" },
      { name: "Daptomycine (Cubicin®)", dose: "8–10 mg/kg IV", frequence: "1×/j", duree: "14j minimum bactériémie", note: "Alternative vancomycine — CONTRE-INDIQUÉ dans la pneumonie (inactivé par le surfactant)" },
      { name: "Linézolide (Zyvoxid®)", dose: "600 mg IV ou PO", frequence: "2×/j", duree: "14j", note: "Bonne biodisponibilité orale — privilégier dans la PAVM à SARM (supérieur à la vancomycine)" },
      { name: "Ceftaroline (Zinforo®)", dose: "600 mg IV", frequence: "2×/j sur 1h", duree: "5–14j", note: "Céphalosporine anti-SARM — bactériémie et pneumonie" },
    ],
    arret_vanco: ""
  },
  "Staphylocoque à coagulase négative (SCN)": {
    color: "#B45309",
    molecules: [
      { name: "Vancomycine", dose: "30 mg/kg/j IV", frequence: "continu", duree: "7–14j selon localisation", note: "Si résistant à la méticilline (fréquent sur matériel)" },
      { name: "Oxacilline", dose: "150 mg/kg/j IV", frequence: "4–6×/j", duree: "7–14j", note: "Si sensible à la méticilline" },
    ],
    arret_vanco: "Ablation du cathéter/matériel souvent indispensable"
  },
  "Streptocoque β-hémolytique (A, B, G)": {
    color: "#0F766E",
    molecules: [
      { name: "Amoxicilline", dose: "200 mg/kg/j IV", frequence: "4–6×/j", duree: "10–14j (bactériémie) / 21j (endocardite)", note: "Toujours sensible à la pénicilline — désescalade systématique" },
      { name: "Benzylpénicilline (Pénicilline G)", dose: "4 MUI IV", frequence: "toutes les 4h", duree: "10–14j", note: "Molécule de référence — efficacité maximale" },
    ],
    arret_vanco: "Arrêter systématiquement la vancomycine dès streptocoque identifié (toujours sensible pénicilline)"
  },
  "Streptococcus pneumoniae (Pneumocoque)": {
    color: "#1D4ED8",
    molecules: [
      { name: "Amoxicilline", dose: "200 mg/kg/j IV", frequence: "4–6×/j", duree: "10–14j méningite / 7j pneumonie", note: "Si CMI amoxicilline ≤ 0,06 mg/L (sensible) — vérifier l'antibiogramme" },
      { name: "Céfotaxime ou Ceftriaxone", dose: "Céfotaxime 300 mg/kg/j IV", frequence: "4–6×/j", duree: "10–14j", note: "Si résistance partielle amoxicilline — dépasse la CMI par effet temps-dépendant" },
    ],
    arret_vanco: ""
  },
  "Enterococcus faecalis": {
    color: "#7C3AED",
    molecules: [
      { name: "Amoxicilline", dose: "200 mg/kg/j IV", frequence: "4–6×/j", duree: "4–6 semaines si endocardite", note: "E. faecalis toujours sensible amoxicilline — jamais de vancomycine si sensible" },
      { name: "Amoxicilline + Gentamicine", dose: "Amoxicilline 200 mg/kg/j + Gentamicine 3 mg/kg/j", frequence: "4–6×/j + 1×/j", duree: "2 semaines gentamicine / 4–6 sem amoxicilline", note: "Synergie bactéricide — indispensable dans l'endocardite" },
    ],
    arret_vanco: "⚠ Désescalader la vancomycine vers l'amoxicilline dès E. faecalis sensible confirmé"
  },
  "Enterococcus faecium (ERV — résistant vancomycine)": {
    color: "#DC2626",
    molecules: [
      { name: "Linézolide", dose: "600 mg IV ou PO", frequence: "2×/j", duree: "14–21j", note: "Bactériostatique — pas de monothérapie dans l'endocardite" },
      { name: "Daptomycine", dose: "10–12 mg/kg IV", frequence: "1×/j", duree: "14–21j", note: "Haute dose si endocardite ou bactériémie — associer rifampicine ou ampicilline" },
      { name: "Tigécycline", dose: "100 mg puis 50 mg IV", frequence: "2×/j", duree: "14j", note: "Association recommandée — ne pas utiliser seule (résistance rapide)" },
    ],
    arret_vanco: ""
  },
  // BACILLES GRAM NÉGATIF
  "Escherichia coli sensible (sans BLSE)": {
    color: "#15803D",
    molecules: [
      { name: "Amoxicilline-Acide clavulanique", dose: "1 g IV", frequence: "3×/j", duree: "Selon localisation", note: "Si sensible à l'antibiogramme — désescalade systématique" },
      { name: "Céfotaxime ou Céfazoline", dose: "Céfazoline 2 g IV", frequence: "3×/j", duree: "Selon localisation", note: "Si résistant amoxicilline-acide clavulanique" },
      { name: "Triméthoprime-Sulfaméthoxazole (Bactrim®)", dose: "800/160 mg PO", frequence: "2×/j", duree: "Selon localisation", note: "Si sensible — option switch oral" },
    ],
    arret_vanco: "Arrêter carbapénème ou tazocilline — désescalade obligatoire"
  },
  "E. coli BLSE / Klebsiella BLSE": {
    color: "#D97706",
    molecules: [
      { name: "Ertapénème (Invanz®)", dose: "1 g IV", frequence: "1×/j", duree: "10–14j", note: "BLSE sans facteur de risque Pseudomonas — préférer à méropénème pour épargner les carbapénèmes larges spectre" },
      { name: "Méropénème", dose: "1–2 g IV", frequence: "3×/j", duree: "10–14j", note: "Si sepsis sévère, méningite, ou facteur de risque Pseudomonas" },
      { name: "Pivmécillinam (Selexid®)", dose: "400 mg PO", frequence: "3×/j", duree: "7j", note: "Switch oral si BLSE sur IU basse — vérifier sensibilité antibiogramme" },
    ],
    arret_vanco: ""
  },
  "Pseudomonas aeruginosa sensible": {
    color: "#0F766E",
    molecules: [
      { name: "Pipéracilline-Tazobactam", dose: "4 g IV", frequence: "toutes les 6h ou continu 16g/24h", duree: "10–14j", note: "En perfusion continue : maximise le temps au-dessus de la CMI" },
      { name: "Céfépime (Axépim®)", dose: "2 g IV", frequence: "3×/j", duree: "10–14j", note: "Alternative à la tazocilline" },
      { name: "Ciprofloxacine", dose: "400 mg IV", frequence: "2×/j", duree: "10–14j", note: "Si sensible — bonne biodisponibilité PO pour le switch oral" },
    ],
    arret_vanco: "Ne pas arrêter l'aminoside avant J3–J5 si Pseudomonas — risque d'échec"
  },
  "Pseudomonas aeruginosa résistant (multi-R)": {
    color: "#DC2626",
    molecules: [
      { name: "Colistine (Colimycine®)", dose: "9 MUI dose de charge puis 4,5 MUI IV", frequence: "2×/j", duree: "14j minimum", note: "Dernier recours — néphrotoxicité majeure — monitoring rénal quotidien" },
      { name: "Ceftolozane-Tazobactam (Zerbaxa®)", dose: "3 g IV", frequence: "3×/j en perfusion 1h", duree: "14j", note: "Active sur Pseudomonas multi-résistant — supérieure à la colistine (moins toxique)" },
      { name: "Ceftazidime-Avibactam (Avycaz®)", dose: "2,5 g IV", frequence: "3×/j en perfusion 2h", duree: "14j", note: "Active sur Pseudomonas ET EPC (KPC) — discuter avec infectiologue" },
    ],
    arret_vanco: "⚠ Consulter l'infectiologue OBLIGATOIREMENT avant toute prescription de colistine"
  },
  "Klebsiella pneumoniae EPC (carbapénémase)": {
    color: "#DC2626",
    molecules: [
      { name: "Ceftazidime-Avibactam (Avycaz®)", dose: "2,5 g IV", frequence: "3×/j en perfusion 2h", duree: "14j", note: "Active sur KPC et OXA-48 — traitement de référence des EPC" },
      { name: "Ceftazidime-Avibactam + Aztreonam", dose: "Association — voir infectiologue", frequence: "3×/j", duree: "14j", note: "Si MBL (métallo-carbapénémase NDM, VIM) — seule association active" },
      { name: "Imipénème-Cilastatine-Relebactam (Recarbrio®)", dose: "1,25 g IV", frequence: "3×/j", duree: "14j", note: "Alternative si KPC — disponible en ATU" },
    ],
    arret_vanco: "⚠ Isolement contact strict — signalement ARS — avis infectiologue OBLIGATOIRE"
  },
  "Acinetobacter baumannii multi-résistant": {
    color: "#DC2626",
    molecules: [
      { name: "Colistine", dose: "9 MUI dose de charge puis 4,5 MUI IV", frequence: "2×/j", duree: "14j", note: "Souvent seule option — néphrotoxicité, neurotoxicité" },
      { name: "Sulbactam (associé)", dose: "9 g/j IV", frequence: "3–4×/j", duree: "14j", note: "Associer à la colistine — activité propre sur A. baumannii" },
      { name: "Rifampicine + Colistine", dose: "600 mg IV × 2/j + colistine", frequence: "2×/j", duree: "14j", note: "Synergie démontrée in vitro — pas de preuve de supériorité clinique" },
    ],
    arret_vanco: "⚠ Cas difficile — avis infectiologue et microbiologiste INDISPENSABLE"
  },
  // ANAÉROBIES
  "Bacteroides fragilis / anaérobies": {
    color: "#374151",
    molecules: [
      { name: "Métronidazole", dose: "500 mg IV", frequence: "3×/j", duree: "Selon localisation (7–14j)", note: "RÉFÉRENCE des infections anaérobies — bonne pénétration tissulaire" },
      { name: "Amoxicilline-Acide clavulanique", dose: "1 g IV", frequence: "3×/j", duree: "Selon localisation", note: "Si association à des germes aérobies sensibles" },
    ],
    arret_vanco: ""
  },
  // FUNGI
  "Candida albicans (candidémie confirmée)": {
    color: "#BE185D",
    molecules: [
      { name: "Fluconazole", dose: "800 mg dose de charge puis 400 mg IV", frequence: "1×/j", duree: "14j après dernière hémoculture négative", note: "Si C. albicans, patient stable sans exposition azolés préalable — passage oral possible" },
      { name: "Caspofungine", dose: "70 mg J1 puis 50 mg IV", frequence: "1×/j", duree: "14j", note: "Préférer si choc, exposition azolés, ou immunodépression sévère" },
    ],
    arret_vanco: "Ablation du cathéter central OBLIGATOIRE — fond d'œil systématique"
  },
  "Candida glabrata / tropicalis / krusei": {
    color: "#DC2626",
    molecules: [
      { name: "Caspofungine", dose: "70 mg J1 puis 50 mg IV", frequence: "1×/j", duree: "14j minimum", note: "C. krusei résistant fluconazole — C. glabrata souvent résistant — échinocandine OBLIGATOIRE" },
      { name: "Micafungine (Mycamine®)", dose: "100–150 mg IV", frequence: "1×/j", duree: "14j minimum", note: "Alternative à la caspofungine — même spectre" },
      { name: "Voriconazole", dose: "6 mg/kg IV × 2 J1 puis 4 mg/kg × 2", frequence: "2×/j", duree: "14j", note: "Si sensible sur antifongigramme (C. glabrata parfois sensible)" },
    ],
    arret_vanco: "Antifongigramme OBLIGATOIRE — certaines espèces multirésistantes"
  },
  "Aspergillus fumigatus (aspergillose invasive confirmée ou probable)": {
    color: "#7C3AED",
    molecules: [
      { name: "Voriconazole (Vfend®)", dose: "6 mg/kg IV × 2 J1, puis 4 mg/kg × 2", frequence: "2×/j", duree: "6–12 semaines (jusqu'à récupération immunitaire)", note: "RÉFÉRENCE — monitoring plasma obligatoire (cible 1–5,5 mg/L) — interactions médicamenteuses nombreuses" },
      { name: "Isavuconazole (Cresemba®)", dose: "200 mg × 3/j J1–J2 puis 200 mg/j IV", frequence: "1×/j entretien", duree: "6–12 semaines", note: "Non-inférieur au voriconazole — meilleur profil hépatique et oculaire — moins d'interactions" },
      { name: "Liposomal Amphotéricine B (AmBisome®)", dose: "3 mg/kg/j IV", frequence: "1×/j", duree: "Jusqu'à switch oral possible", note: "2ème ligne — si échec azolés ou contre-indication — néphrotoxicité surveillée" },
    ],
    arret_vanco: "Associer traitement de l'immunodépression sous-jacente — scanner thoracique de contrôle à 2 semaines"
  },
  "Aspergillus résistant voriconazole": {
    color: "#DC2626",
    molecules: [
      { name: "Isavuconazole", dose: "200 mg × 3/j puis 200 mg/j IV", frequence: "1×/j", duree: "6–12 semaines", note: "Si résistance voriconazole — vérifier isavuconazole CMI" },
      { name: "Liposomal Amphotéricine B", dose: "3–5 mg/kg/j IV", frequence: "1×/j", duree: "Jusqu'à stabilisation", note: "Dernier recours — pas de résistance croisée avec les azolés" },
      { name: "Voriconazole + Anidulafungine", dose: "Association", frequence: "", duree: "6–12 semaines", note: "Association discutée — essai COMBISTRAT négatif — à réserver aux formes réfractaires sévères" },
    ],
    arret_vanco: "⚠ Discuter avec le centre de référence mycologie — antifungigramme OBLIGATOIRE"
  },
};


// ─── NOUVEAUX ANTIBIOTIQUES BGN — SRLF 2022 ────────────────────
const NOUVEAUX_ATB_BGN = {
  intro: "Conférence de consensus SRLF (décembre 2022) — Place des nouveaux antibiotiques dans les infections à bacilles à Gram négatif en réanimation. Algorithme par mécanisme de résistance.",
  mecanismes: [
    {
      id: "blse",
      nom: "Entérobactérie BLSE (bêtalactamase à spectre étendu)",
      color: "#D97706",
      definition: "Résistance aux céphalosporines de 3ème génération par production de bêtalactamase à spectre étendu. Reste sensible aux carbapénèmes.",
      premiere_intention: [
        { name: "Ertapénème (Invanz®)", dose: "1 g IV", frequence: "1×/j", note: "Si pas de facteur de risque Pseudomonas — épargne les carbapénèmes anti-Pseudomonas (méropénème, imipénème)" },
        { name: "Méropénème (Meronem®)", dose: "1–2 g IV", frequence: "toutes les 8h (perfusion prolongée 3h)", note: "Si sepsis sévère, choc, ou facteur de risque Pseudomonas associé" },
      ],
      epargne: [
        { name: "Pipéracilline-Tazobactam", note: "Option discutée sur IU à BLSE après contrôle de la source (étude MERINO : infériorité dans les bactériémies — à éviter en infection grave)" },
        { name: "Aminosides / Témocilline", note: "Alternatives d'épargne des carbapénèmes sur infections urinaires BLSE" },
      ],
      source: "SRLF 2022 (Dequin, Ann Intensive Care 2023) · MERINO Trial JAMA 2018"
    },
    {
      id: "parc",
      nom: "Pseudomonas aeruginosa résistant aux carbapénèmes (PARC)",
      color: "#DC2626",
      definition: "Pseudomonas résistant à l'imipénème et/ou au méropénème. Mécanisme principal : imperméabilité membranaire (porines OprD) ± efflux.",
      premiere_intention: [
        { name: "Ceftolozane-Tazobactam (Zerbaxa®)", dose: "3 g IV (2 g ceftolozane)", frequence: "toutes les 8h en perfusion 1h", note: "PREMIÈRE INTENTION du PARC selon SRLF 2022 — molécule de référence, plus stable face aux mécanismes de résistance du Pseudomonas" },
      ],
      alternatives: [
        { name: "Imipénème-Cilastatine-Relebactam (Recarbrio®)", dose: "1,25 g IV", frequence: "toutes les 6h", note: "Alternative si résistance au ceftolozane-tazobactam" },
        { name: "Céfidérocol (Fetcroja®)", dose: "2 g IV", frequence: "toutes les 8h en perfusion 3h", note: "Sidérophore — actif sur la plupart des BGN multirésistants — réserver aux impasses" },
        { name: "Ceftazidime-Avibactam (Zavicefta®)", dose: "2,5 g IV", frequence: "toutes les 8h en perfusion 2h", note: "Alternative possible sur PARC" },
      ],
      dernier_recours: [
        { name: "Colistine / Aminosides / Fosfomycine", note: "Si aucune alternative — toujours en association si infection grave (jamais en monothérapie)" },
      ],
      source: "SRLF 2022 (Dequin, Ann Intensive Care 2023)"
    },
    {
      id: "epc_kpc",
      nom: "Entérobactérie productrice de carbapénémase — type KPC ou OXA-48",
      color: "#B91C1C",
      definition: "EPC (carbapénémase de classe A — KPC, ou classe D — OXA-48). Hydrolyse les carbapénèmes. Mécanisme le plus fréquent en France.",
      premiere_intention: [
        { name: "Ceftazidime-Avibactam (Zavicefta®)", dose: "2,5 g IV", frequence: "toutes les 8h en perfusion 2h", note: "TRAITEMENT DE RÉFÉRENCE des EPC à KPC et OXA-48 — l'avibactam restaure l'activité sur ces carbapénémases" },
      ],
      alternatives: [
        { name: "Méropénème-Vaborbactam (Vaborem®)", dose: "2 g/2 g IV", frequence: "toutes les 8h en perfusion 3h", note: "Actif sur KPC (pas sur OXA-48 ni métallo-bêtalactamases)" },
        { name: "Céfidérocol (Fetcroja®)", dose: "2 g IV", frequence: "toutes les 8h perfusion 3h", note: "Actif sur toutes les classes de carbapénémases — alternative en impasse" },
      ],
      source: "SRLF 2022 · ESCMID 2022"
    },
    {
      id: "epc_mbl",
      nom: "Entérobactérie productrice de métallo-bêtalactamase (NDM, VIM, IMP)",
      color: "#7F1D1D",
      definition: "EPC de classe B (métallo-bêtalactamase — MBL : NDM, VIM, IMP). Hydrolyse TOUS les bêtalactamines y compris les associations avec inhibiteurs classiques. Mécanisme le plus difficile.",
      premiere_intention: [
        { name: "Aztréonam + Ceftazidime-Avibactam", dose: "Aztréonam 2 g + Ceftazidime-Avibactam 2,5 g IV", frequence: "toutes les 8h", note: "SEULE ASSOCIATION ACTIVE sur les MBL — l'aztréonam échappe à la MBL, l'avibactam protège l'aztréonam des autres bêtalactamases — AVIS INFECTIOLOGUE OBLIGATOIRE" },
      ],
      alternatives: [
        { name: "Céfidérocol (Fetcroja®)", dose: "2 g IV", frequence: "toutes les 8h perfusion 3h", note: "Actif sur les MBL (NDM) — alternative à l'association aztréonam + CAZ-AVI" },
      ],
      source: "SRLF 2022 · avis spécialisé systématique"
    },
    {
      id: "acineto",
      nom: "Acinetobacter baumannii résistant aux carbapénèmes",
      color: "#991B1B",
      definition: "A. baumannii multirésistant — souvent OXA-23. Pathogène redoutable en réanimation, écologie hospitalière.",
      premiere_intention: [
        { name: "Céfidérocol (Fetcroja®)", dose: "2 g IV", frequence: "toutes les 8h perfusion 3h", note: "Option sur A. baumannii résistant — discuter avec l'infectiologue" },
      ],
      alternatives: [
        { name: "Colistine + Sulbactam (haute dose)", dose: "Sulbactam 9 g/j + Colistine", frequence: "", note: "Association de référence historique — sulbactam a une activité propre sur A. baumannii" },
        { name: "Colistine + Rifampicine", dose: "", frequence: "", note: "Synergie in vitro — pas de bénéfice clinique démontré" },
      ],
      source: "SRLF 2022 · IDSA 2023"
    },
  ],
  principes: [
    "La tigécycline est NON recommandée pour les bactériémies et les pneumonies acquises sous ventilation mécanique (concentrations sériques insuffisantes).",
    "Une association n'est PAS recommandée si l'on utilise une bêtalactamine active sur le germe.",
    "L'association est suggérée uniquement en cas d'infection grave uniquement sensible à la colistine, aux aminosides, à la fosfomycine ou à la tigécycline.",
    "Préférer une molécule ancienne si elle est active (après contrôle de la source) pour les infections urinaires ou biliaires — épargne des nouveaux antibiotiques.",
    "Perfusion prolongée ou continue recommandée pour les bêtalactamines (optimisation PK/PD temps-dépendant).",
  ]
};



// ═══════════════════════════════════════════════════════════════
// MODULE HÉMODYNAMIQUE — RéaGuard
// Monitorage · Calculateurs · Profils de choc · Frank-Starling
// ═══════════════════════════════════════════════════════════════

// ─── PROFILS DE CHOC ───────────────────────────────────────────
const CHOC_PROFILES = [
  {
    id: "septique",
    nom: "Choc Septique",
    icon: "🔴",
    color: "#DC2626",
    profil: "Vasoplégique — débit cardiaque élevé, résistances basses",
    hemodynamique: {
      "Débit cardiaque (IC)": "Élevé ou normal (> 3,5 L/min/m²)",
      "Résistances (RVS)": "EFFONDRÉES (< 800 dynes·s·cm⁻⁵)",
      "Précharge (PVC/VCI)": "Variable — souvent basse (hypovolémie relative)",
      "ScvO₂": "Souvent élevée (> 70%) — défaut d'extraction",
      "Lactate": "Élevé (> 2 mmol/L)"
    },
    prise_en_charge: [
      { etape: "1. Remplissage initial", detail: "Cristalloïdes 30 mL/kg dans les 3 premières heures (Surviving Sepsis Campaign) — réévaluer par paramètres dynamiques", grade: "1B" },
      { etape: "2. Vasopresseur de 1ère ligne", detail: "Noradrénaline — objectif PAM ≥ 65 mmHg — débuter précocement sans attendre la fin du remplissage si PAM très basse", grade: "1A" },
      { etape: "3. Vasopresseur de 2ème ligne", detail: "Ajouter Vasopressine 0,03 U/min si noradrénaline > 0,5 µg/kg/min — épargne catécholaminergique", grade: "2B" },
      { etape: "4. Inotrope si dysfonction myocardique", detail: "Dobutamine si signes d'hypoperfusion persistante malgré remplissage et PAM correcte (cardiomyopathie septique)", grade: "2B" },
      { etape: "5. Corticoïdes si réfractaire", detail: "Hydrocortisone 200 mg/j si choc réfractaire aux vasopresseurs (noradrénaline ≥ 0,25 µg/kg/min depuis > 4h)", grade: "2B" },
    ],
    source: "Surviving Sepsis Campaign 2021 · SRLF Sepsis 2022"
  },
  {
    id: "cardiogenique",
    nom: "Choc Cardiogénique",
    icon: "💙",
    color: "#1D4ED8",
    profil: "Défaillance de pompe — débit bas, résistances hautes",
    hemodynamique: {
      "Débit cardiaque (IC)": "EFFONDRÉ (< 2,2 L/min/m²)",
      "Résistances (RVS)": "Élevées (> 1400 dynes·s·cm⁻⁵)",
      "Précharge (PAPO)": "Élevée (> 18 mmHg) — congestion",
      "ScvO₂": "Basse (< 60%) — extraction maximale",
      "Lactate": "Élevé — hypoperfusion"
    },
    prise_en_charge: [
      { etape: "1. Identifier et traiter la cause", detail: "Coronarographie urgente si SCA (cause la plus fréquente) — échocardiographie pour mécanisme (dysfonction VG, complication mécanique)", grade: "1A" },
      { etape: "2. Inotrope", detail: "Dobutamine 5–20 µg/kg/min — première ligne pour augmenter le débit cardiaque", grade: "1B" },
      { etape: "3. Vasopresseur si hypotension", detail: "Noradrénaline préférée à la dopamine (moins d'arythmies, meilleure survie — étude SOAP II)", grade: "1B" },
      { etape: "4. Assistance circulatoire", detail: "ECMO veino-artérielle ou Impella si choc réfractaire — discuter précocement avec centre expert", grade: "2B" },
      { etape: "5. Éviter le remplissage excessif", detail: "Précharge déjà élevée — remplissage prudent (250 mL) uniquement si précharge-dépendance documentée", grade: "GPS" },
    ],
    source: "ESC Heart Failure 2023 · SRLF Choc Cardiogénique 2022"
  },
  {
    id: "hypovolemique",
    nom: "Choc Hypovolémique / Hémorragique",
    icon: "🩸",
    color: "#991B1B",
    profil: "Perte volémique — précharge effondrée, débit bas, résistances hautes",
    hemodynamique: {
      "Débit cardiaque (IC)": "Bas (< 2,5 L/min/m²)",
      "Résistances (RVS)": "Élevées (vasoconstriction compensatrice)",
      "Précharge (PVC/VCI)": "EFFONDRÉE — VCI collabée, VPP élevée",
      "ScvO₂": "Basse — extraction maximale",
      "Lactate": "Élevé"
    },
    prise_en_charge: [
      { etape: "1. Contrôle de la source", detail: "Hémostase chirurgicale ou endovasculaire urgente si hémorragie — damage control", grade: "1A" },
      { etape: "2. Remplissage / Transfusion", detail: "Hémorragie : transfusion ratio 1:1:1 (CGR/PFC/plaquettes) — choc hypovolémique non hémorragique : cristalloïdes", grade: "1A" },
      { etape: "3. Acide tranexamique", detail: "1 g IV en 10 min puis 1 g sur 8h si hémorragie traumatique < 3h (étude CRASH-2)", grade: "1A" },
      { etape: "4. Vasopresseur transitoire", detail: "Noradrénaline pour maintenir PAM en attendant le remplissage — ne pas masquer l'hypovolémie", grade: "GPS" },
      { etape: "5. Cibles", detail: "Hémorragie non contrôlée : PAS 80–90 mmHg (hypotension permissive) jusqu'au contrôle — sauf traumatisme crânien (PAM ≥ 80)", grade: "1B" },
    ],
    source: "European Trauma Guidelines 2023 · CRASH-2"
  },
  {
    id: "obstructif",
    nom: "Choc Obstructif",
    icon: "⛔",
    color: "#7C3AED",
    profil: "Obstacle au remplissage ou à l'éjection — tamponnade, embolie, pneumothorax",
    hemodynamique: {
      "Débit cardiaque (IC)": "Bas",
      "Résistances (RVS)": "Élevées (compensation)",
      "Précharge": "Élevée en amont de l'obstacle (PVC haute)",
      "Signe clé": "Turgescence jugulaire + auscultation pulmonaire claire",
      "Lactate": "Élevé"
    },
    prise_en_charge: [
      { etape: "1. Tamponnade péricardique", detail: "Péricardiocentèse en urgence sous échographie — drainage évacuateur", grade: "1A" },
      { etape: "2. Embolie pulmonaire grave", detail: "Thrombolyse (altéplase) si choc + EP confirmée ou très probable — embolectomie si contre-indication", grade: "1A" },
      { etape: "3. Pneumothorax compressif", detail: "Exsufflation à l'aiguille IMMÉDIATE (2ème EIC) puis drain thoracique", grade: "1A" },
      { etape: "4. Support en attendant", detail: "Remplissage (augmente la précharge en amont de l'obstacle) + noradrénaline — mesure temporaire", grade: "GPS" },
    ],
    source: "ESC Embolie Pulmonaire 2019 · ERC 2021"
  },
];

// ─── CALCULATEURS HÉMODYNAMIQUES ───────────────────────────────
const HEMO_CALCULATORS = [
  {
    id: "ic",
    nom: "Index Cardiaque (IC)",
    formule: "IC = Débit cardiaque / Surface corporelle",
    inputs: [
      { id: "dc", label: "Débit cardiaque (L/min)", placeholder: "ex: 5.0" },
      { id: "sc", label: "Surface corporelle (m²)", placeholder: "ex: 1.8" },
    ],
    compute: (v) => {
      const ic = v.dc / v.sc;
      let interp, color;
      if (ic < 2.2) { interp = "Index cardiaque BAS — bas débit (choc cardiogénique, hypovolémie)"; color = "#DC2626"; }
      else if (ic <= 4.0) { interp = "Index cardiaque normal (2,2–4,0 L/min/m²)"; color = "#15803D"; }
      else { interp = "Index cardiaque ÉLEVÉ — état hyperdynamique (sepsis, anémie)"; color = "#D97706"; }
      return { value: ic.toFixed(2), unit: "L/min/m²", interp, color };
    },
    normes: "Normal : 2,5–4,0 L/min/m²"
  },
  {
    id: "rvs",
    nom: "Résistances Vasculaires Systémiques (RVS)",
    formule: "RVS = 80 × (PAM − PVC) / Débit cardiaque",
    inputs: [
      { id: "pam", label: "Pression artérielle moyenne (mmHg)", placeholder: "ex: 65" },
      { id: "pvc", label: "Pression veineuse centrale (mmHg)", placeholder: "ex: 8" },
      { id: "dc", label: "Débit cardiaque (L/min)", placeholder: "ex: 5.0" },
    ],
    compute: (v) => {
      const rvs = 80 * (v.pam - v.pvc) / v.dc;
      let interp, color;
      if (rvs < 800) { interp = "RVS BASSES — vasoplégie (choc septique, anaphylaxie)"; color = "#DC2626"; }
      else if (rvs <= 1200) { interp = "RVS normales (800–1200 dynes·s·cm⁻⁵)"; color = "#15803D"; }
      else { interp = "RVS ÉLEVÉES — vasoconstriction (choc cardiogénique, hypovolémie)"; color = "#1D4ED8"; }
      return { value: Math.round(rvs), unit: "dynes·s·cm⁻⁵", interp, color };
    },
    normes: "Normal : 800–1200 dynes·s·cm⁻⁵"
  },
  {
    id: "do2",
    nom: "Transport en Oxygène (DO₂)",
    formule: "DO₂ = Débit cardiaque × [(1,34 × Hb × SaO₂) + (0,003 × PaO₂)] × 10",
    inputs: [
      { id: "dc", label: "Débit cardiaque (L/min)", placeholder: "ex: 5.0" },
      { id: "hb", label: "Hémoglobine (g/dL)", placeholder: "ex: 10" },
      { id: "sao2", label: "SaO₂ (en décimal, ex 0.98)", placeholder: "ex: 0.98" },
      { id: "pao2", label: "PaO₂ (mmHg)", placeholder: "ex: 90" },
    ],
    compute: (v) => {
      const cao2 = (1.34 * v.hb * v.sao2) + (0.003 * v.pao2);
      const do2 = v.dc * cao2 * 10;
      let interp, color;
      if (do2 < 600) { interp = "DO₂ BAS — risque d'hypoxie tissulaire (< 600 mL/min)"; color = "#DC2626"; }
      else if (do2 <= 1100) { interp = "DO₂ normal (600–1100 mL/min)"; color = "#15803D"; }
      else { interp = "DO₂ élevé"; color = "#1D4ED8"; }
      return { value: Math.round(do2), unit: "mL/min", interp, color, extra: `Contenu artériel en O₂ (CaO₂) : ${cao2.toFixed(1)} mL/dL` };
    },
    normes: "Normal : 600–1100 mL/min (indexé 500–600 mL/min/m²)"
  },
  {
    id: "ppc",
    nom: "Pression de Perfusion Cérébrale (PPC)",
    formule: "PPC = PAM − PIC (Pression IntraCrânienne)",
    inputs: [
      { id: "pam", label: "Pression artérielle moyenne (mmHg)", placeholder: "ex: 85" },
      { id: "pic", label: "Pression intracrânienne (mmHg)", placeholder: "ex: 15" },
    ],
    compute: (v) => {
      const ppc = v.pam - v.pic;
      let interp, color;
      if (ppc < 60) { interp = "PPC INSUFFISANTE — risque d'ischémie cérébrale (cible ≥ 60 mmHg)"; color = "#DC2626"; }
      else if (ppc <= 70) { interp = "PPC correcte (60–70 mmHg) — cible recommandée traumatisme crânien"; color = "#15803D"; }
      else { interp = "PPC élevée — surveiller (risque SDRA si > 70 avec remplissage excessif)"; color = "#D97706"; }
      return { value: ppc, unit: "mmHg", interp, color };
    },
    normes: "Cible TCG : 60–70 mmHg (BTF Guidelines 2016)"
  },
];

// ─── MONITORAGE HÉMODYNAMIQUE ──────────────────────────────────
const MONITORING_HEMO = [
  {
    id: "picco",
    nom: "PiCCO — Thermodilution transpulmonaire",
    icon: "📉",
    color: "#1D4ED8",
    params: [
      { nom: "Index cardiaque (IC)", normes: "3,0–5,0 L/min/m²", interpretation: "Débit cardiaque indexé — bas = défaillance de pompe ou hypovolémie" },
      { nom: "Volume télédiastolique global indexé (ITBVI)", normes: "850–1000 mL/m²", interpretation: "Marqueur de PRÉCHARGE — bas = hypovolémie, indication au remplissage" },
      { nom: "Eau pulmonaire extravasculaire indexée (ELWI)", normes: "3,0–7,0 mL/kg", interpretation: "Marqueur d'ŒDÈME PULMONAIRE — élevé = surcharge hydrique ou SDRA — limite le remplissage" },
      { nom: "Index de fonction cardiaque (CFI)", normes: "4,5–6,5 /min", interpretation: "Marqueur de CONTRACTILITÉ — bas = dysfonction systolique" },
      { nom: "Variation du volume d'éjection (VVE/SVV)", normes: "< 10–13%", interpretation: "Marqueur de PRÉCHARGE-DÉPENDANCE — élevé = répond au remplissage (si ventilation contrôlée, rythme sinusal)" },
    ],
    note: "Le PiCCO nécessite un cathéter artériel fémoral thermistance + voie veineuse centrale. La calibration par thermodilution doit être répétée toutes les 8h ou après chaque changement thérapeutique majeur.",
    source: "SRLF Monitorage Hémodynamique 2014"
  },
  {
    id: "echo",
    nom: "Échocardiographie de Réanimation",
    icon: "🫀",
    color: "#DC2626",
    params: [
      { nom: "Fraction d'éjection VG (FEVG)", normes: "> 55%", interpretation: "Contractilité globale du VG — < 40% = dysfonction systolique significative (évaluation visuelle ou Simpson biplan)" },
      { nom: "Intégrale temps-vitesse sous-aortique (ITV)", normes: "18–22 cm", interpretation: "Reflet du volume d'éjection systolique — variation > 12% sous lever de jambe = précharge-dépendance" },
      { nom: "Rapport E/A mitral", normes: "0,8–2,0", interpretation: "Fonction diastolique — E/A < 0,8 = trouble de relaxation, E/A > 2 = pression de remplissage élevée" },
      { nom: "Diamètre VCI + variabilité respiratoire", normes: "VCI < 21 mm, variabilité < 50%", interpretation: "VCI petite et collabable = hypovolémie / précharge-dépendance ; VCI dilatée non variable = précharge haute" },
      { nom: "Rapport VD/VG", normes: "< 0,6", interpretation: "Dilatation VD (rapport > 1) = cœur pulmonaire aigu, embolie pulmonaire, SDRA sévère" },
    ],
    note: "L'échographie cardiaque au lit du patient est l'outil de monitorage hémodynamique de première intention — non invasif, répétable, intégrant la fonction systolique, diastolique et la volémie.",
    source: "SRLF/SFAR Échographie Réanimation 2019"
  },
  {
    id: "plr",
    nom: "Lever de Jambe Passif (PLR) & Précharge-dépendance",
    icon: "🦵",
    color: "#15803D",
    params: [
      { nom: "Technique du PLR", normes: "Tronc 45° → jambes 45°", interpretation: "Passer le patient de la position demi-assise (tronc 45°) à jambes surélevées 45°, tronc à plat — auto-transfusion de ~300 mL" },
      { nom: "Réponse positive", normes: "↑ débit cardiaque > 10%", interpretation: "Augmentation du débit cardiaque ou de l'ITV sous-aortique > 10% = PRÉCHARGE-DÉPENDANT = répondra au remplissage" },
      { nom: "Variation pression pulsée (VPP)", normes: "> 13% = répondeur", interpretation: "Valide UNIQUEMENT si : ventilation contrôlée, Vt ≥ 8 mL/kg, rythme sinusal, pas de ventilation spontanée" },
      { nom: "Épreuve de remplissage (mini-fluid challenge)", normes: "100 mL en 1 min → ↑ITV > 10%", interpretation: "Alternative au PLR — perfusion rapide de 100 mL de cristalloïde et mesure de la réponse" },
    ],
    note: "Le PLR est l'épreuve de précharge-dépendance la plus fiable car réversible et indépendante des conditions de ventilation. À privilégier avant toute expansion volémique pour éviter la surcharge.",
    source: "Monnet & Teboul ICM 2016 · SRLF 2014"
  },
];



// ─── FACTEURS DE RISQUE BMR ─────────────────────────────────────
const BMR_RISK_FACTORS = [
  { id: "hospit_recent", label: "Hospitalisation > 48h dans les 90 derniers jours", score: 2 },
  { id: "atb_recent", label: "Antibiothérapie dans les 90 derniers jours", score: 2 },
  { id: "ehpad", label: "Séjour en EHPAD ou structure de soins de longue durée", score: 1 },
  { id: "rea", label: "Séjour récent en réanimation ou soins intensifs", score: 2 },
  { id: "sonde", label: "Dispositif invasif en place (cathéter central, sonde urinaire, ventilation)", score: 1 },
  { id: "epc_connu", label: "Portage documenté de bactérie multirésistante (BLSE, SARM, EPC)", score: 3 },
  { id: "immuno", label: "Immunodépression (VIH, corticoïdes prolongés, chimiothérapie, greffe)", score: 2 },
  { id: "insuf_renale", label: "Insuffisance rénale chronique ou dialyse", score: 1 },
  { id: "voyage", label: "Voyage récent en zone à haute prévalence de BMR (Asie du Sud-Est, Inde, Afrique)", score: 2 },
  { id: "contact_bmr", label: "Exposition à un patient porteur de BMR dans les 30 jours", score: 2 },
  { id: "abdo", label: "Chirurgie abdominale majeure ou digestive récente", score: 1 },
  { id: "nutrition", label: "Nutrition parentérale prolongée > 7 jours", score: 1 },
];

// ─── ADAPTATION RÉNALE ─────────────────────────────────────────
const RENAL_ADAPT = [
  {
    molecule: "Vancomycine",
    classe: "Glycopeptide",
    elimination: "Rénale > 90%",
    normal: "30–45 mg/kg/j continu — cible AUC/CMI 400–600",
    adapt: [
      { dfg: "> 60", dose: "Dose standard — monitoring AUC ou résiduelle (15–20 mg/L si intermittent)" },
      { dfg: "30–60", dose: "Réduire de 25–50% — monitoring renforcé toutes les 24–48h" },
      { dfg: "15–30", dose: "Réduire de 50–75% — monitoring toutes les 24h" },
      { dfg: "< 15 ou dialyse", dose: "Dose de charge 25 mg/kg puis adapter selon niveau résiduel (CRRT : 500 mg/j)" },
    ]
  },
  {
    molecule: "Pipéracilline-Tazobactam",
    classe: "Pénicilline-inhibiteur",
    elimination: "Rénale 68%",
    normal: "4 g IV toutes les 6h ou 16 g/24h continu",
    adapt: [
      { dfg: "> 40", dose: "Dose standard" },
      { dfg: "20–40", dose: "4 g toutes les 8h (ou 12 g/24h continu)" },
      { dfg: "< 20", dose: "4 g toutes les 12h (ou 8 g/24h continu)" },
      { dfg: "Dialyse (CRRT)", dose: "4 g toutes les 8h — dosage pharmacologique si disponible" },
    ]
  },
  {
    molecule: "Méropénème",
    classe: "Carbapénème",
    elimination: "Rénale 70%",
    normal: "2 g IV toutes les 8h (perfusion 3h recommandée)",
    adapt: [
      { dfg: "> 50", dose: "Dose standard" },
      { dfg: "26–50", dose: "1 g toutes les 12h" },
      { dfg: "10–25", dose: "1 g toutes les 24h" },
      { dfg: "< 10 ou CRRT", dose: "500 mg toutes les 12h — adapter selon dosage" },
    ]
  },
  {
    molecule: "Amikacine",
    classe: "Aminoside",
    elimination: "Rénale > 95%",
    normal: "30 mg/kg IV en dose unique quotidienne",
    adapt: [
      { dfg: "> 60", dose: "Dose standard 30 mg/kg — espacer à 48h si DFG 40–60" },
      { dfg: "30–60", dose: "20–25 mg/kg toutes les 48h — dosage résiduel avant 2ème dose (< 2,5 mg/L)" },
      { dfg: "< 30", dose: "20 mg/kg — espacer selon résiduelle — 1 seule dose si oligurie" },
      { dfg: "Dialyse", dose: "CONTRE-INDICATION relative — une seule dose si absolument nécessaire" },
    ]
  },
  {
    molecule: "Céfotaxime",
    classe: "Céphalosporine 3G",
    elimination: "Rénale 60%",
    normal: "2 g IV toutes les 8h (méningite : 3 g toutes les 6h)",
    adapt: [
      { dfg: "> 60", dose: "Dose standard" },
      { dfg: "20–60", dose: "2 g toutes les 12h" },
      { dfg: "< 20", dose: "2 g toutes les 24h" },
      { dfg: "Dialyse", dose: "2 g toutes les 24h après chaque séance" },
    ]
  },
  {
    molecule: "Fluconazole",
    classe: "Azolé antifongique",
    elimination: "Rénale > 80%",
    normal: "800 mg dose de charge puis 400 mg/j",
    adapt: [
      { dfg: "> 50", dose: "Dose standard" },
      { dfg: "< 50 sans dialyse", dose: "50% de la dose (400 mg charge puis 200 mg/j)" },
      { dfg: "Dialyse (hémodialyse)", dose: "Dose standard — dialyse élimine le fluconazole — donner après chaque séance" },
    ]
  },
  {
    molecule: "Caspofungine",
    classe: "Échinocandine",
    elimination: "Hépatique — PAS d'adaptation rénale",
    normal: "70 mg J1 puis 50 mg/j IV",
    adapt: [
      { dfg: "Tout DFG", dose: "AUCUNE adaptation rénale nécessaire — ajuster uniquement si insuffisance hépatique (Child B/C : 35 mg/j)" },
    ]
  },
  {
    molecule: "Voriconazole IV",
    classe: "Azolé antifongique",
    elimination: "Hépatique CYP2C19",
    normal: "6 mg/kg × 2 J1 puis 4 mg/kg × 2/j",
    adapt: [
      { dfg: "> 50", dose: "Dose standard IV" },
      { dfg: "< 50", dose: "⚠ BASCULER vers la forme ORALE (biodisponibilité 96%) — excipient sulfobutyl-éther-cyclodextrine du IV s'accumule en IRC et est néphrotoxique" },
      { dfg: "Dialyse", dose: "Forme orale uniquement — 400 mg × 2/j à jeun ou 300 mg × 2/j avec repas" },
    ]
  },
  {
    molecule: "Linézolide",
    classe: "Oxazolidinone",
    elimination: "Hépatique/non rénale",
    normal: "600 mg IV ou PO toutes les 12h",
    adapt: [
      { dfg: "Tout DFG", dose: "AUCUNE adaptation rénale — attention aux accumulations des métabolites (thrombopénie, neuropathie si > 14 jours)" },
    ]
  },
  {
    molecule: "Daptomycine",
    classe: "Lipopeptide",
    elimination: "Rénale 78%",
    normal: "8–12 mg/kg IV toutes les 24h",
    adapt: [
      { dfg: "> 30", dose: "Dose standard toutes les 24h" },
      { dfg: "< 30 ou CRRT", dose: "Dose standard toutes les 48h — ou 8 mg/kg/j avec monitoring CPK (myopathie)" },
      { dfg: "Hémodialyse", dose: "Donner après la séance — 8 mg/kg toutes les 48h" },
    ]
  },
];

// ─── DURÉES DE TRAITEMENT ──────────────────────────────────────
const DUREES = [
  { infection: "Bactériémie à SARM ou E. faecalis", min: 14, max: 42, unite: "jours", note: "14 jours si source retirée et évolution favorable — 42 jours (6 semaines) si endocardite ou ostéite" },
  { infection: "Endocardite sur valve native à Streptocoque", min: 28, max: 28, unite: "jours", note: "4 semaines — possible 2 semaines si streptocoque très sensible (CMI péni ≤ 0,125 mg/L) et échocardiographie favorable" },
  { infection: "Endocardite sur prothèse valvulaire", min: 42, max: 42, unite: "jours", note: "6 semaines minimum — rifampicine associée au moins 6 semaines" },
  { infection: "Méningite à pneumocoque", min: 10, max: 14, unite: "jours", note: "Selon évolution clinique et LCR de contrôle" },
  { infection: "Méningite à méningocoque", min: 7, max: 7, unite: "jours", note: "7 jours suffisent si évolution favorable" },
  { infection: "Méningite à Listeria", min: 21, max: 21, unite: "jours", note: "21 jours minimum — rhombencéphalite : 28 jours" },
  { infection: "PAVM — non-Pseudomonas", min: 8, max: 8, unite: "jours", note: "8 jours — non inférieur à 15 jours (essai PRORATA 2010) — guider sur PCT" },
  { infection: "PAVM à Pseudomonas aeruginosa", min: 14, max: 14, unite: "jours", note: "14 jours minimum — risque de rechute si arrêt précoce" },
  { infection: "Pneumonie communautaire grave", min: 5, max: 7, unite: "jours", note: "5–7 jours — Legionella : 10–14 jours" },
  { infection: "Sepsis urinaire (pyélonéphrite)", min: 7, max: 14, unite: "jours", note: "7 jours si fluoroquinolone et évolution rapide — 14 jours si carbapénème ou E. coli BLSE" },
  { infection: "Candidémie (C. albicans)", min: 14, max: 14, unite: "jours après dernière HC négative", note: "Compter à partir de la première hémoculture négative — pas de la dernière positive" },
  { infection: "Candidémie (Candida non-albicans)", min: 14, max: 21, unite: "jours après dernière HC négative", note: "21 jours si OEIL atteint ou localisations profondes (hépatosplénique)" },
  { infection: "Aspergillose invasive pulmonaire", min: 42, max: 84, unite: "jours", note: "6 à 12 semaines — jusqu'à récupération immunitaire et stabilisation scanner" },
  { infection: "Infection sur cathéter (SCN)", min: 7, max: 14, unite: "jours", note: "7 jours si cathéter retiré et hémocultures négatives à 72h" },
  { infection: "Infection sur cathéter (S. aureus)", min: 14, max: 42, unite: "jours", note: "Minimum 14 jours — 28–42 jours si complication (endocardite, ostéite)" },
  { infection: "Péritonite post-opératoire contrôlée", min: 5, max: 8, unite: "jours", note: "Arrêt possible dès apyrexie 48h + reprise transit + GB en normalisation" },
  { infection: "Neutropénie fébrile — fièvre inexpliquée", min: 0, max: 0, unite: "", note: "Jusqu'à PNN > 500/mm³ et apyrexie 48h — pas de durée fixe" },
  { infection: "Encéphalite herpétique (HSV)", min: 14, max: 21, unite: "jours", note: "21 jours dans les formes avec immunodépression ou PCR positive persistante" },
  { infection: "Leptospirose sévère", min: 7, max: 7, unite: "jours", note: "Pénicilline G ou Ceftriaxone 7 jours" },
  { infection: "Choc toxique streptococcique / staphylococcique", min: 10, max: 14, unite: "jours", note: "Jusqu'au contrôle du foyer et de l'état systémique" },
];

// ─── PK/PD — OPTIMISATION ──────────────────────────────────────
const PKPD = [
  {
    classe: "Bêtalactamines (péni, céphalo, carbapénèmes)",
    type: "Temps-dépendant",
    objectif: "Maintenir la concentration plasmatique au-dessus de la CMI pendant 40–70% du temps (fT > CMI)",
    icon: "⏱",
    color: "#1D4ED8",
    strategies: [
      "Perfusion continue : diluer dans 50 mL, passer sur 24h — maximise le fT > CMI",
      "Perfusion prolongée (3–4h) : alternative à la perfusion continue",
      "Fractionner les doses plutôt qu'augmenter la dose unitaire",
    ],
    exemple: "Pipéracilline-Tazobactam : 4 g en perfusion continue sur 24h (au lieu de 4 g × 4 en 30 min) — fT > CMI passe de 50% à 100%",
    monitoring: "Dosage pharmacologique si disponible — taux résiduel avant prochaine dose"
  },
  {
    classe: "Aminosides (amikacine, gentamicine, tobramycine)",
    type: "Concentration-dépendant",
    objectif: "Cmax/CMI ≥ 8–10 — une seule dose élevée quotidienne maximise l'effet bactéricide",
    icon: "📈",
    color: "#DC2626",
    strategies: [
      "UNE SEULE DOSE élevée par 24h (jamais de doses fractionnées)",
      "Pic plasmatique à H1 : cible amikacine > 60–80 mg/L",
      "Résiduelle avant J2 : amikacine < 2,5 mg/L (toxicité rénale et cochléaire)",
      "Fenêtre thérapeutique : arrêter à 3–5 jours, jamais au-delà de 7 jours",
    ],
    exemple: "Amikacine 30 mg/kg (2 100 mg pour 70 kg) en injection IV de 30 min — dosage résiduel à H24 pour adapter J2",
    monitoring: "Résiduelle OBLIGATOIRE avant chaque injection à partir de J2"
  },
  {
    classe: "Fluoroquinolones",
    type: "Mixte (AUC/CMI et Cmax/CMI)",
    objectif: "AUC24/CMI ≥ 100–125 pour les infections sévères",
    icon: "📊",
    color: "#7C3AED",
    strategies: [
      "Biodisponibilité orale = IV (switch précoce justifié dès stabilisation)",
      "Augmenter les doses en cas de Pseudomonas (CMI plus élevée)",
      "Ciprofloxacine IV : 400 mg × 3/j (pas 2×/j) si Pseudomonas",
    ],
    exemple: "Lévofloxacine 750 mg/j PO = 500 mg IV × 2/j — switch oral possible dès J3–J5 si tube digestif fonctionnel",
    monitoring: "Pas de monitoring systématique — allongement QT en cas d'association (ECG)"
  },
  {
    classe: "Vancomycine",
    type: "AUC-dépendant",
    objectif: "AUC/CMI ≥ 400 mg·h/L (AUC cible 400–600) — résiduelle 15–20 mg/L si dosage intermittent",
    icon: "🎯",
    color: "#0F766E",
    strategies: [
      "Perfusion continue : plus simple pour atteindre la cible AUC — moins de variabilité",
      "Dose de charge 25 mg/kg en 1–2h pour atteindre rapidement la cible",
      "Monitoring AUC : calculé à partir de 2 dosages (pic + résiduelle) ou logiciel bayésien",
      "Néphrotoxicité : corrélée à l'AUC excessive (> 650) — réduire si créatinine augmente > 50%",
    ],
    exemple: "Vancomycine 2 500 mg (35 mg/kg pour 70 kg) en perfusion continue sur 24h — dosage résiduelle à H24 (cible 20–25 mg/L si continu)",
    monitoring: "Créatinine et dosage vancomycine QUOTIDIENS en réanimation"
  },
  {
    classe: "Échinocandines (caspofungine, micafungine, anidulafungine)",
    type: "Concentration-dépendant (AUC/CMI)",
    objectif: "Cmax/CMI ≥ 5–10 — dose unique quotidienne optimale",
    icon: "🍄",
    color: "#BE185D",
    strategies: [
      "Dose de charge indispensable (70 mg J1 pour caspofungine) pour atteindre rapidement la cible",
      "Aucune adaptation rénale — adapter si insuffisance hépatique (Child B/C)",
      "Switch oral vers fluconazole possible si C. albicans sensible et patient stable (step-down)",
    ],
    exemple: "Caspofungine 70 mg J1, puis 50 mg/j IV — step-down vers fluconazole 400 mg/j PO après 5–7j si hémocultures négatives et C. albicans sensible",
    monitoring: "Pas de monitoring systématique — surveiller transaminases (hépatotoxicité rare)"
  },
];

// ═══ MODULE INFECTIOLOGIE SCREENS ═══
// ═══════════════════════════════════════════════════════════════
// ÉCRANS MODULE INFECTIOLOGIE — RéaGuard
// ═══════════════════════════════════════════════════════════════

// ─── ÉCRAN ANTIBIOTHÉRAPIE PROBABILISTE ────────────────────────
const AntibioProbScreen = ({ C }) => {
  const [selected, setSelected] = useState(null);
  const [profil, setProfil] = useState("standard");
  const [weight, setWeight] = useState("");
  const w = parseFloat(weight);

  const situation = selected ? INFECTO_SITUATIONS.find(s => s.id === selected) : null;
  const traitement = situation ? situation.probabiliste[profil] : null;

  if (selected && situation) {
    return (
      <div>
        <button onClick={() => setSelected(null)} style={{ display:"flex", alignItems:"center", gap:6, background:"none", border:"none", cursor:"pointer", color:C.accent, fontSize:13, marginBottom:14, padding:0 }}>
          ← Antibiothérapie probabiliste
        </button>
        <div style={{ background:`${situation.color}12`, border:`1px solid ${situation.color}30`, borderLeft:`3px solid ${situation.color}`, borderRadius:10, padding:"12px 14px", marginBottom:14 }}>
          <div style={{ fontSize:15, fontWeight:800, color:situation.color }}>{situation.icon} {situation.name}</div>
        </div>

        {/* Profil BMR */}
        <div style={{ background:"#fff", borderRadius:10, border:`1px solid ${C.border}`, overflow:"hidden", marginBottom:12 }}>
          <div style={{ padding:"9px 14px", borderBottom:`1px solid ${C.border}`, background:C.slateBg }}>
            <span style={{ fontSize:11, fontWeight:700, color:C.text }}>Profil du patient</span>
          </div>
          <div style={{ padding:"10px 14px", display:"flex", flexDirection:"column", gap:6 }}>
            {[
              { id:"standard", label:"Pas de facteur de risque BMR", sub:"Communautaire / faible risque" },
              { id:"bmr", label:"Facteur de risque BMR", sub:"Nosocomial / exposition ATB récente" },
              { id:"choc", label:"Choc septique", sub:"Couverture maximale d'emblée" },
            ].map(p => (
              <button key={p.id} onClick={() => setProfil(p.id)} style={{ padding:"10px 12px", background: profil===p.id ? situation.color+"15" : "#fff", border:`1.5px solid ${profil===p.id ? situation.color : C.border}`, borderRadius:8, cursor:"pointer", textAlign:"left", fontFamily:"inherit" }}>
                <div style={{ fontSize:13, fontWeight:600, color: profil===p.id ? situation.color : C.text }}>{p.label}</div>
                <div style={{ fontSize:11, color:C.textSoft, marginTop:2 }}>{p.sub}</div>
              </button>
            ))}
          </div>
        </div>

        {traitement && (
          <>
            {/* Calculateur poids */}
            <div style={{ background:C.blueBg, border:`1px solid ${C.blueBorder}`, borderRadius:10, padding:"10px 14px", marginBottom:12 }}>
              <div style={{ fontSize:11, fontWeight:700, color:C.blue, marginBottom:8 }}>💊 Calculateur de doses (poids en kg)</div>
              <input type="number" value={weight} onChange={e=>setWeight(e.target.value)} placeholder="Poids du patient (kg)" style={{ width:"100%", border:`1.5px solid ${C.blueBorder}`, borderRadius:8, padding:"8px 10px", fontSize:14, color:C.text, outline:"none", fontFamily:"inherit", background:"#fff", boxSizing:"border-box" }} />
            </div>

            {/* Molécules recommandées */}
            <div style={{ background:"#fff", borderRadius:10, border:`1px solid ${C.border}`, overflow:"hidden", marginBottom:12 }}>
              <div style={{ padding:"9px 14px", borderBottom:`1px solid ${C.border}`, background:C.slateBg }}>
                <div style={{ fontSize:11, fontWeight:700, color:situation.color }}>{traitement.label}</div>
              </div>
              {traitement.molecules.map((mol, i) => {
                // Calculate dose if weight provided
                let calcDose = null;
                if (w > 0) {
                  if (mol.dose.includes("mg/kg") || mol.dose.includes("MUI/kg")) {
                    const match = mol.dose.match(/(\d+(?:\.\q+)?)\s*(?:–\s*(\d+(?:\.\d+)?))?\s*mg\/kg/);
                    if (match) {
                      const doseMin = parseFloat(match[1]);
                      const doseMax = match[2] ? parseFloat(match[2]) : doseMin;
                      const calcMin = Math.round(doseMin * w);
                      const calcMax = Math.round(doseMax * w);
                      calcDose = calcMin === calcMax ? `${calcMin} mg` : `${calcMin}–${calcMax} mg`;
                    }
                  }
                }
                return (
                  <div key={i} style={{ padding:"12px 14px", borderBottom: i < traitement.molecules.length-1 ? `1px solid ${C.border}` : "none" }}>
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:8, marginBottom:4 }}>
                      <div style={{ fontSize:13, fontWeight:700, color:C.text, flex:1 }}>{mol.name}</div>
                      {calcDose && <div style={{ fontSize:13, fontWeight:800, color:situation.color, whiteSpace:"nowrap", background:situation.color+"10", padding:"2px 8px", borderRadius:6 }}>{calcDose}</div>}
                    </div>
                    <div style={{ fontSize:12, color:C.blue, marginBottom:2 }}>📍 {mol.dose} — {mol.frequence}</div>
                    <div style={{ fontSize:11, color:"#D97706", marginBottom: mol.note ? 2 : 0 }}>⏱ Durée : {mol.duree}</div>
                    {mol.note && <div style={{ fontSize:11, color:C.textSoft, lineHeight:1.5, marginTop:4, padding:"6px 8px", background:C.slateBg, borderRadius:6 }}>💡 {mol.note}</div>}
                  </div>
                );
              })}
            </div>

            <div style={{ background:"#fff", borderRadius:8, border:`1px solid ${C.border}`, padding:"8px 12px", marginBottom:12 }}>
              <div style={{ fontSize:9, fontWeight:700, color:C.textXsoft, textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:4 }}>Source</div>
              <div style={{ fontSize:11, color:C.textSoft }}>{traitement.source}</div>
            </div>
          </>
        )}
      </div>
    );
  }

  return (
    <div>
      <div style={{ fontSize:12, color:C.textSoft, marginBottom:14, lineHeight:1.5 }}>
        Sélectionnez la situation clinique pour obtenir l'antibiothérapie probabiliste adaptée au profil du patient.
      </div>
      <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
        {INFECTO_SITUATIONS.map(sit => (
          <button key={sit.id} onClick={() => { setSelected(sit.id); setProfil("standard"); }} style={{ background:"#fff", border:`1px solid ${C.border}`, borderLeft:`3px solid ${sit.color}`, borderRadius:10, padding:"13px 14px", cursor:"pointer", textAlign:"left", display:"flex", alignItems:"center", gap:12 }}>
            <span style={{ fontSize:22 }}>{sit.icon}</span>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:13, fontWeight:700, color:C.text }}>{sit.name}</div>
              <div style={{ fontSize:10, color:C.textSoft, marginTop:2 }}>3 profils : standard · BMR · choc</div>
            </div>
            <span style={{ color:C.textXsoft, fontSize:18 }}>›</span>
          </button>
        ))}
      </div>
    </div>
  );
};

// ─── ÉCRAN DÉSESCALADE ─────────────────────────────────────────
const DesescaladeScreen = ({ C }) => {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(null);

  const germes = Object.keys(DESESCALADE);
  const filtered = query.length > 1
    ? germes.filter(g => g.toLowerCase().includes(query.toLowerCase()))
    : germes;

  const info = selected ? DESESCALADE[selected] : null;

  if (selected && info) {
    return (
      <div>
        <button onClick={() => setSelected(null)} style={{ display:"flex", alignItems:"center", gap:6, background:"none", border:"none", cursor:"pointer", color:C.accent, fontSize:13, marginBottom:14, padding:0 }}>
          ← Désescalade antibiotique
        </button>
        <div style={{ background:`${info.color}12`, border:`1px solid ${info.color}30`, borderLeft:`3px solid ${info.color}`, borderRadius:10, padding:"12px 14px", marginBottom:14 }}>
          <div style={{ fontSize:13, fontWeight:800, color:info.color, lineHeight:1.4 }}>{selected}</div>
        </div>

        {info.arret_vanco && (
          <div style={{ background:"#FEF3C7", border:"1px solid #FDE68A", borderRadius:8, padding:"10px 12px", marginBottom:12 }}>
            <div style={{ fontSize:12, color:"#92400E", fontWeight:600, lineHeight:1.5 }}>{info.arret_vanco}</div>
          </div>
        )}

        <div style={{ background:"#fff", borderRadius:10, border:`1px solid ${C.border}`, overflow:"hidden", marginBottom:12 }}>
          <div style={{ padding:"9px 14px", borderBottom:`1px solid ${C.border}`, background:C.slateBg }}>
            <span style={{ fontSize:11, fontWeight:700, color:info.color }}>Antibiotiques de désescalade — du plus étroit au plus large</span>
          </div>
          {info.molecules.map((mol, i) => (
            <div key={i} style={{ padding:"12px 14px", borderBottom: i < info.molecules.length-1 ? `1px solid ${C.border}` : "none" }}>
              <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:6 }}>
                <div style={{ width:20, height:20, borderRadius:"50%", background:info.color, color:"#fff", fontSize:10, fontWeight:800, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>{i+1}</div>
                <div style={{ fontSize:13, fontWeight:700, color:C.text }}>{mol.name}</div>
              </div>
              <div style={{ fontSize:12, color:C.blue, marginBottom:2 }}>📍 {mol.dose}</div>
              <div style={{ fontSize:11, color:"#D97706", marginBottom: mol.note ? 4 : 0 }}>⏱ {mol.duree}</div>
              {mol.note && <div style={{ fontSize:11, color:C.textSoft, lineHeight:1.5, padding:"6px 8px", background:C.slateBg, borderRadius:6 }}>💡 {mol.note}</div>}
            </div>
          ))}
        </div>
        <div style={{ fontSize:10, color:C.textXsoft, textAlign:"center" }}>Vérifier l'antibiogramme — désescalade systématique à 48–72h</div>
      </div>
    );
  }

  return (
    <div>
      <div style={{ fontSize:12, color:C.textSoft, marginBottom:12, lineHeight:1.5 }}>
        Germe identifié à l'antibiogramme → antibiotique le plus étroit possible. Désescalade systématique à 48–72h.
      </div>

      {/* Catégories */}
      {[
        { label: "🔵 Cocci Gram Positif", color:"#1D4ED8", items: ["Staphylococcus aureus sensible méticilline (SAMS)", "Staphylococcus aureus résistant méticilline (SARM)", "Staphylocoque à coagulase négative (SCN)", "Streptocoque β-hémolytique (A, B, G)", "Streptococcus pneumoniae (Pneumocoque)", "Enterococcus faecalis", "Enterococcus faecium (ERV — résistant vancomycine)"] },
        { label: "🟠 Bacilles Gram Négatif", color:"#D97706", items: ["Escherichia coli sensible (sans BLSE)", "E. coli BLSE / Klebsiella BLSE", "Pseudomonas aeruginosa sensible", "Pseudomonas aeruginosa résistant (multi-R)", "Klebsiella pneumoniae EPC (carbapénémase)", "Acinetobacter baumannii multi-résistant", "Bacteroides fragilis / anaérobies"] },
        { label: "🟣 Champignons — Candida & Aspergillus", color:"#7C3AED", items: ["Candida albicans (candidémie confirmée)", "Candida glabrata / tropicalis / krusei", "Aspergillus fumigatus (aspergillose invasive confirmée ou probable)", "Aspergillus résistant voriconazole"] },
      ].map(cat => (
        <div key={cat.label} style={{ marginBottom:16 }}>
          <div style={{ fontSize:11, fontWeight:700, color:C.textSoft, textTransform:"uppercase", letterSpacing:"0.07em", marginBottom:8 }}>{cat.label}</div>
          <div style={{ background:"#fff", borderRadius:10, border:`1px solid ${C.border}`, overflow:"hidden" }}>
            {cat.items.map((item, i) => (
              <button key={item} onClick={() => setSelected(item)} style={{ width:"100%", background:"none", border:"none", borderBottom: i < cat.items.length-1 ? `1px solid ${C.border}` : "none", padding:"11px 14px", cursor:"pointer", textAlign:"left", display:"flex", alignItems:"center", justifyContent:"space-between", gap:8 }}>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:12.5, fontWeight:600, color:C.text, lineHeight:1.4 }}>{item}</div>
                  <div style={{ fontSize:10, color:C.textSoft, marginTop:2 }}>{DESESCALADE[item]?.molecules?.length} option{DESESCALADE[item]?.molecules?.length > 1 ? "s" : ""}</div>
                </div>
                <span style={{ color:C.textXsoft, fontSize:16, flexShrink:0 }}>›</span>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

// ─── ÉCRAN ADAPTATION RÉNALE ───────────────────────────────────
const RenalAdaptScreen = ({ C }) => {
  const [dfg, setDfg] = useState("");
  const dfgNum = parseFloat(dfg);

  const getDfgCategory = (val) => {
    if (val > 60) return "> 60";
    if (val >= 30) return "30–60";
    if (val >= 15) return "15–30";
    if (val >= 10) return "10–25";
    if (val >= 20) return "20–40";
    return "< 15 ou dialyse";
  };

  const findAdaptation = (mol, dfgVal) => {
    for (const adapt of mol.adapt) {
      const range = adapt.dfg;
      if (range.includes("Tout DFG")) return adapt;
      if (range.includes("Dialyse") && dfgVal < 15) return adapt;
      if (range.includes(">") && !range.includes("Tout")) {
        const threshold = parseFloat(range.replace(/[^0-9.]/g, ""));
        if (dfgVal > threshold) return adapt;
      }
      if (range.includes("<") && !range.includes("Tout")) {
        const threshold = parseFloat(range.replace(/[^0-9.]/g, ""));
        if (dfgVal < threshold) return adapt;
      }
      if (range.includes("–") || range.includes("-")) {
        const parts = range.replace(/[^0-9.\-–]/g, "").split(/[–-]/);
        if (parts.length === 2) {
          const lo = parseFloat(parts[0]);
          const hi = parseFloat(parts[1]);
          if (!isNaN(lo) && !isNaN(hi) && dfgVal >= lo && dfgVal <= hi) return adapt;
        }
      }
    }
    return mol.adapt[0];
  };

  return (
    <div>
      <div style={{ fontSize:12, color:C.textSoft, marginBottom:14, lineHeight:1.5 }}>
        Entrez le DFG (clairance calculée selon CKD-EPI ou Cockcroft) pour obtenir les doses adaptées à la fonction rénale.
      </div>

      <div style={{ background:"#fff", borderRadius:10, border:`1px solid ${C.border}`, padding:"14px", marginBottom:14 }}>
        <div style={{ fontSize:12, color:C.textSoft, marginBottom:8 }}>DFG estimé (mL/min/1,73 m²) — ou "0" si dialyse</div>
        <input type="number" value={dfg} onChange={e => setDfg(e.target.value)} placeholder="ex: 45" style={{ width:"100%", border:`1.5px solid ${C.border}`, borderRadius:8, padding:"10px 12px", fontSize:16, color:C.text, outline:"none", fontFamily:"inherit", boxSizing:"border-box" }} />
        {dfgNum >= 0 && dfg !== "" && (
          <div style={{ marginTop:8, padding:"6px 10px", background: dfgNum > 60 ? C.greenBg : dfgNum > 30 ? C.orangeBg : C.redBg, borderRadius:6 }}>
            <span style={{ fontSize:11, fontWeight:700, color: dfgNum > 60 ? C.green : dfgNum > 30 ? C.orange : C.red }}>
              {dfgNum === 0 ? "Dialyse / anurie" : dfgNum > 90 ? "Fonction rénale normale" : dfgNum > 60 ? "IRC légère" : dfgNum > 30 ? "IRC modérée" : dfgNum > 15 ? "IRC sévère" : "IRC terminale"}
            </span>
          </div>
        )}
      </div>

      <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
        {RENAL_ADAPT.map((mol, i) => {
          const adapt = dfgNum >= 0 && dfg !== "" ? findAdaptation(mol, dfgNum) : null;
          return (
            <div key={i} style={{ background:"#fff", borderRadius:10, border:`1px solid ${C.border}`, overflow:"hidden" }}>
              <div style={{ padding:"10px 14px", borderBottom: adapt ? `1px solid ${C.border}` : "none", background:C.slateBg, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                <div>
                  <div style={{ fontSize:13, fontWeight:700, color:C.text }}>{mol.molecule}</div>
                  <div style={{ fontSize:10, color:C.textSoft, marginTop:1 }}>{mol.classe} · {mol.elimination}</div>
                </div>
              </div>
              {adapt && (
                <div style={{ padding:"10px 14px" }}>
                  <div style={{ fontSize:10, color:C.textSoft, marginBottom:4 }}>DFG {adapt.dfg}</div>
                  <div style={{ fontSize:13, color:C.text, lineHeight:1.6, fontWeight: adapt.dose.includes("⚠") || adapt.dose.includes("CONTRE") ? 700 : 400, color: adapt.dose.includes("⚠") || adapt.dose.includes("CONTRE") ? C.red : C.text }}>{adapt.dose}</div>
                </div>
              )}
              {!adapt && (
                <div style={{ padding:"10px 14px" }}>
                  <div style={{ fontSize:11, color:C.textSoft }}>Dose standard : {mol.normal}</div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ─── ÉCRAN DURÉES DE TRAITEMENT ────────────────────────────────
const DureesScreen = ({ C }) => {
  const [query, setQuery] = useState("");
  const filtered = query.length > 1
    ? DUREES.filter(d => d.infection.toLowerCase().includes(query.toLowerCase()))
    : DUREES;

  return (
    <div>
      <div style={{ fontSize:12, color:C.textSoft, marginBottom:12, lineHeight:1.5 }}>
        Durées recommandées selon les guidelines en vigueur. Guider sur la procalcitonine (PCT) et l'évolution clinique.
      </div>
      <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Rechercher une infection…" style={{ width:"100%", border:`1.5px solid ${C.border}`, borderRadius:8, padding:"9px 12px", fontSize:14, color:C.text, outline:"none", fontFamily:"inherit", background:"#fff", boxSizing:"border-box", marginBottom:12 }} />
      <div style={{ background:"#fff", borderRadius:12, border:`1px solid ${C.border}`, overflow:"hidden" }}>
        {filtered.map((d, i) => (
          <div key={i} style={{ padding:"12px 14px", borderBottom: i < filtered.length-1 ? `1px solid ${C.border}` : "none" }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:10 }}>
              <div style={{ fontSize:13, fontWeight:600, color:C.text, flex:1, lineHeight:1.4 }}>{d.infection}</div>
              <div style={{ fontSize:14, fontWeight:900, color:C.blue, flexShrink:0, textAlign:"right", minWidth:60 }}>
                {d.min === 0 ? "Variable" : d.min === d.max ? `${d.min}j` : `${d.min}–${d.max}j`}
              </div>
            </div>
            {d.unite && <div style={{ fontSize:10, color:C.textSoft, marginTop:2 }}>{d.unite !== "jours" ? d.unite : ""}</div>}
            {d.note && <div style={{ fontSize:11, color:C.textSoft, marginTop:5, lineHeight:1.5, padding:"5px 8px", background:C.slateBg, borderRadius:5 }}>💡 {d.note}</div>}
          </div>
        ))}
      </div>
      <div style={{ fontSize:11, color:C.textSoft, textAlign:"center", marginTop:12, padding:"8px", background:"#FFF7ED", borderRadius:8, border:"1px solid #FDE68A" }}>
        ⚠ Guider l'arrêt sur PCT : arrêt si PCT diminue de 80% depuis le pic OU PCT &lt; 0,5 µg/L
      </div>
    </div>
  );
};

// ─── ÉCRAN PK/PD ──────────────────────────────────────────────
const PkPdScreen = ({ C }) => {
  const [open, setOpen] = useState(null);

  return (
    <div>
      <div style={{ fontSize:12, color:C.textSoft, marginBottom:14, lineHeight:1.5 }}>
        Optimisation pharmacocinétique/pharmacodynamique des antibiotiques en réanimation. Adapter les modalités d'administration selon la classe d'antibiotique.
      </div>

      {PKPD.map((pk, i) => (
        <div key={i} style={{ background:"#fff", borderRadius:10, border:`1px solid ${C.border}`, marginBottom:10, overflow:"hidden" }}>
          <button onClick={() => setOpen(open === i ? null : i)} style={{ width:"100%", background:"none", border:"none", padding:"13px 14px", cursor:"pointer", textAlign:"left", display:"flex", alignItems:"center", gap:12 }}>
            <div style={{ width:36, height:36, borderRadius:9, background:pk.color+"15", display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, flexShrink:0 }}>{pk.icon}</div>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:13, fontWeight:700, color:C.text }}>{pk.classe}</div>
              <div style={{ fontSize:10, color:pk.color, fontWeight:600, marginTop:2 }}>{pk.type}</div>
            </div>
            <span style={{ color:C.textXsoft, fontSize:18 }}>{open === i ? "▲" : "▼"}</span>
          </button>
          {open === i && (
            <div style={{ borderTop:`1px solid ${C.border}` }}>
              <div style={{ padding:"10px 14px", borderBottom:`1px solid ${C.border}`, background:pk.color+"08" }}>
                <div style={{ fontSize:11, fontWeight:700, color:pk.color, marginBottom:4 }}>🎯 Objectif PK/PD</div>
                <div style={{ fontSize:12, color:C.textMed, lineHeight:1.6 }}>{pk.objectif}</div>
              </div>
              <div style={{ padding:"10px 14px", borderBottom:`1px solid ${C.border}` }}>
                <div style={{ fontSize:11, fontWeight:700, color:C.text, marginBottom:8 }}>Stratégies d'optimisation</div>
                {pk.strategies.map((s, si) => (
                  <div key={si} style={{ display:"flex", gap:8, marginBottom:6 }}>
                    <div style={{ width:16, height:16, borderRadius:"50%", background:pk.color, color:"#fff", fontSize:9, fontWeight:800, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginTop:1 }}>{si+1}</div>
                    <div style={{ fontSize:12, color:C.textMed, lineHeight:1.5 }}>{s}</div>
                  </div>
                ))}
              </div>
              <div style={{ padding:"10px 14px", borderBottom:`1px solid ${C.border}`, background:"#F0FDF4" }}>
                <div style={{ fontSize:10, fontWeight:700, color:"#15803D", textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:5 }}>Exemple pratique</div>
                <div style={{ fontSize:12, color:"#166534", lineHeight:1.6 }}>{pk.exemple}</div>
              </div>
              <div style={{ padding:"10px 14px", background:"#FFF7ED" }}>
                <div style={{ fontSize:10, fontWeight:700, color:"#D97706", textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:5 }}>Monitoring recommandé</div>
                <div style={{ fontSize:12, color:"#92400E", lineHeight:1.6 }}>{pk.monitoring}</div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

// ─── CALCULATEUR RISQUE BMR ────────────────────────────────────
const BmrRiskScreen = ({ C }) => {
  const [checked, setChecked] = useState({});
  const toggle = (id) => setChecked(p => ({ ...p, [id]: !p[id] }));
  const score = BMR_RISK_FACTORS.filter(f => checked[f.id]).reduce((a, f) => a + f.score, 0);

  const getRisk = () => {
    if (score === 0) return { level: "Faible", color: C.green, bg: C.greenBg, text: "Antibiothérapie probabiliste standard — pas d'élargissement du spectre justifié", reco: "standard" };
    if (score <= 3) return { level: "Modéré", color: C.orange, bg: C.orangeBg, text: "Discuter l'élargissement du spectre selon le contexte clinique et l'écologie locale du service", reco: "discuter" };
    return { level: "Élevé", color: C.red, bg: C.redBg, text: "Antibiothérapie large spectre d'emblée — couvrir les BMR — avis infectiologue recommandé", reco: "bmr" };
  };

  const risk = getRisk();

  return (
    <div>
      <div style={{ fontSize:12, color:C.textSoft, marginBottom:14, lineHeight:1.5 }}>
        Évaluez le risque de bactérie multirésistante pour adapter l'antibiothérapie probabiliste. Cochez les facteurs présents.
      </div>

      <div style={{ background:"#fff", borderRadius:10, border:`1px solid ${C.border}`, overflow:"hidden", marginBottom:14 }}>
        {BMR_RISK_FACTORS.map((f, i) => (
          <button key={f.id} onClick={() => toggle(f.id)} style={{ width:"100%", background: checked[f.id] ? "#FEF3C7" : "none", border:"none", borderBottom: i < BMR_RISK_FACTORS.length-1 ? `1px solid ${C.border}` : "none", padding:"11px 14px", cursor:"pointer", textAlign:"left", display:"flex", alignItems:"center", gap:10 }}>
            <div style={{ width:22, height:22, borderRadius:6, border:`2px solid ${checked[f.id] ? C.orange : C.border}`, background: checked[f.id] ? C.orange : "#fff", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
              {checked[f.id] && <span style={{ color:"#fff", fontSize:13, fontWeight:900 }}>✓</span>}
            </div>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:12.5, color: checked[f.id] ? "#92400E" : C.text, fontWeight: checked[f.id] ? 600 : 400, lineHeight:1.4 }}>{f.label}</div>
            </div>
            <div style={{ fontSize:11, fontWeight:700, color: checked[f.id] ? C.orange : C.textXsoft, flexShrink:0 }}>+{f.score}</div>
          </button>
        ))}
      </div>

      <div style={{ background: risk.bg, border:`2px solid ${risk.color}`, borderRadius:12, padding:"14px 16px", marginBottom:14 }}>
        <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:8 }}>
          <div style={{ fontSize:28, fontWeight:900, color:risk.color, fontFamily:"monospace" }}>{score}</div>
          <div>
            <div style={{ fontSize:14, fontWeight:800, color:risk.color }}>Risque BMR {risk.level}</div>
            <div style={{ fontSize:10, color:risk.color, opacity:0.8 }}>Score sur 20</div>
          </div>
        </div>
        <div style={{ fontSize:12, color:risk.color, lineHeight:1.6, fontWeight:500 }}>{risk.text}</div>
      </div>

      {Object.values(checked).some(Boolean) && (
        <button onClick={() => setChecked({})} style={{ width:"100%", background:"none", border:`1px solid ${C.border}`, borderRadius:8, padding:"9px", cursor:"pointer", fontSize:12, color:C.textSoft, fontFamily:"inherit" }}>
          ↺ Réinitialiser
        </button>
      )}
    </div>
  );
};

// ─── ÉCRAN PRINCIPAL INFECTIOLOGIE ────────────────────────────
const InfectoScreen = ({ C }) => {
  const [subview, setSubview] = useState("menu");

  const screens = {
    antibio: <AntibioProbScreen C={C} />,
    desescalade: <DesescaladeScreen C={C} />,
    nouveaux: <NouveauxAtbScreen C={C} />,
    renal: <RenalAdaptScreen C={C} />,
    durees: <DureesScreen C={C} />,
    pkpd: <PkPdScreen C={C} />,
    bmr: <BmrRiskScreen C={C} />,
  };

  const titles = {
    antibio: "Antibiothérapie Probabiliste",
    desescalade: "Désescalade Antibiotique",
    nouveaux: "Nouveaux Antibiotiques BGN — SRLF 2022",
    renal: "Adaptation à la Fonction Rénale",
    durees: "Durées de Traitement",
    pkpd: "PK/PD — Optimisation",
    bmr: "Score de Risque BMR",
  };

  if (subview !== "menu") {
    return (
      <div>
        <button onClick={() => setSubview("menu")} style={{ display:"flex", alignItems:"center", gap:6, background:"none", border:"none", cursor:"pointer", color:C.accent, fontSize:13, marginBottom:14, padding:0 }}>
          ← Infectiologie
        </button>
        <div style={{ fontSize:15, fontWeight:700, marginBottom:14, color:C.text }}>{titles[subview]}</div>
        {screens[subview]}
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div style={{ background:"linear-gradient(135deg, #DC2626 0%, #991B1B 100%)", borderRadius:12, padding:"16px", marginBottom:16, color:"#fff" }}>
        <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:8 }}>
          <span style={{ fontSize:24 }}>🦠</span>
          <div>
            <div style={{ fontSize:16, fontWeight:800 }}>Infectiologie</div>
            <div style={{ fontSize:10, opacity:0.8, letterSpacing:"0.06em" }}>ANTIBIOTHÉRAPIE · DÉSESCALADE · PK/PD</div>
          </div>
        </div>
        <div style={{ fontSize:12, opacity:0.9, lineHeight:1.6 }}>
          Antibiothérapie probabiliste par situation, désescalade par germe (SAMS, SARM, BLSE, EPC, Candida, Aspergillus), adaptation rénale et optimisation PK/PD.
        </div>
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:16 }}>
        {[
          { id:"antibio", icon:"💊", title:"Antibiothérapie probabiliste", desc:"Par situation clinique et profil BMR", color:"#DC2626" },
          { id:"desescalade", icon:"🎯", title:"Désescalade par germe", desc:"SAMS · SARM · BLSE · EPC · Candida · Aspergillus", color:"#15803D" },
          { id:"nouveaux", icon:"🆕", title:"Nouveaux ATB BGN", desc:"SRLF 2022 · CAZ-AVI · C/T · céfidérocol", color:"#B91C1C" },
          { id:"bmr", icon:"⚠️", title:"Risque BMR", desc:"Score de risque de résistance", color:"#D97706" },
          { id:"renal", icon:"🫘", title:"Adaptation rénale", desc:"DFG → doses adaptées", color:"#0F766E" },
          { id:"durees", icon:"📅", title:"Durées de traitement", desc:"Par infection et guidage PCT", color:"#1D4ED8" },
          { id:"pkpd", icon:"📈", title:"PK/PD & Optimisation", desc:"Temps-dépendant · Conc.-dépendant", color:"#7C3AED" },
        ].map(item => (
          <button key={item.id} onClick={() => setSubview(item.id)} style={{ background:"#fff", border:`1px solid ${C.border}`, borderTop:`3px solid ${item.color}`, borderRadius:12, padding:"13px 12px", cursor:"pointer", textAlign:"left" }}>
            <div style={{ fontSize:22, marginBottom:6 }}>{item.icon}</div>
            <div style={{ fontSize:11, fontWeight:700, color:C.text, lineHeight:1.3, marginBottom:3 }}>{item.title}</div>
            <div style={{ fontSize:9, color:C.textSoft, lineHeight:1.4 }}>{item.desc}</div>
          </button>
        ))}
      </div>

      {/* Rappel */}
      <div style={{ background:"#FEF2F2", border:"1px solid #FECACA", borderRadius:10, padding:"10px 14px" }}>
        <div style={{ fontSize:11, fontWeight:700, color:"#DC2626", marginBottom:4 }}>⚠ Règles fondamentales en réanimation</div>
        {[
          "Hémocultures AVANT les antibiotiques (sans retarder > 1h)",
          "Désescalade SYSTÉMATIQUE à 48–72h sur antibiogramme",
          "Durée guidée par la PCT + évolution clinique",
          "Avis infectiologue si BMR ou échec thérapeutique",
        ].map((r, i) => (
          <div key={i} style={{ fontSize:11, color:"#991B1B", display:"flex", gap:6, marginBottom:3 }}>
            <span>•</span><span>{r}</span>
          </div>
        ))}
      </div>
    </div>
  );
};



// ─── ÉCRAN NOUVEAUX ANTIBIOTIQUES BGN (SRLF 2022) ──────────────
const NouveauxAtbScreen = ({ C }) => {
  const [selected, setSelected] = useState(null);
  const meca = selected ? NOUVEAUX_ATB_BGN.mecanismes.find(m => m.id === selected) : null;

  if (selected && meca) {
    return (
      <div>
        <button onClick={() => setSelected(null)} style={{ display:"flex", alignItems:"center", gap:6, background:"none", border:"none", cursor:"pointer", color:C.accent, fontSize:13, marginBottom:14, padding:0 }}>
          ← Nouveaux antibiotiques BGN
        </button>
        <div style={{ background:`${meca.color}12`, border:`1px solid ${meca.color}30`, borderLeft:`3px solid ${meca.color}`, borderRadius:10, padding:"12px 14px", marginBottom:14 }}>
          <div style={{ fontSize:14, fontWeight:800, color:meca.color, lineHeight:1.4, marginBottom:6 }}>{meca.nom}</div>
          <div style={{ fontSize:11.5, color:C.textMed, lineHeight:1.6 }}>{meca.definition}</div>
        </div>

        {/* Première intention */}
        <div style={{ background:"#fff", borderRadius:10, border:`1px solid ${C.border}`, overflow:"hidden", marginBottom:12 }}>
          <div style={{ padding:"9px 14px", borderBottom:`1px solid ${C.border}`, background:"#F0FDF4" }}>
            <span style={{ fontSize:11, fontWeight:700, color:"#15803D" }}>✓ Première intention</span>
          </div>
          {meca.premiere_intention.map((mol, i) => (
            <div key={i} style={{ padding:"12px 14px", borderBottom: i < meca.premiere_intention.length-1 ? `1px solid ${C.border}` : "none" }}>
              <div style={{ fontSize:13, fontWeight:700, color:C.text, marginBottom:4 }}>{mol.name}</div>
              <div style={{ fontSize:12, color:C.blue, marginBottom: mol.note?4:0 }}>📍 {mol.dose} — {mol.frequence}</div>
              {mol.note && <div style={{ fontSize:11, color:C.textSoft, lineHeight:1.5, padding:"6px 8px", background:C.slateBg, borderRadius:6 }}>💡 {mol.note}</div>}
            </div>
          ))}
        </div>

        {/* Alternatives */}
        {meca.alternatives && (
          <div style={{ background:"#fff", borderRadius:10, border:`1px solid ${C.border}`, overflow:"hidden", marginBottom:12 }}>
            <div style={{ padding:"9px 14px", borderBottom:`1px solid ${C.border}`, background:"#FFFBEB" }}>
              <span style={{ fontSize:11, fontWeight:700, color:"#D97706" }}>↳ Alternatives (si résistance ou échec)</span>
            </div>
            {meca.alternatives.map((mol, i) => (
              <div key={i} style={{ padding:"12px 14px", borderBottom: i < meca.alternatives.length-1 ? `1px solid ${C.border}` : "none" }}>
                <div style={{ fontSize:13, fontWeight:700, color:C.text, marginBottom:4 }}>{mol.name}</div>
                {mol.dose && <div style={{ fontSize:12, color:C.blue, marginBottom: mol.note?4:0 }}>📍 {mol.dose}{mol.frequence?` — ${mol.frequence}`:""}</div>}
                {mol.note && <div style={{ fontSize:11, color:C.textSoft, lineHeight:1.5, padding:"6px 8px", background:C.slateBg, borderRadius:6 }}>💡 {mol.note}</div>}
              </div>
            ))}
          </div>
        )}

        {/* Épargne */}
        {meca.epargne && (
          <div style={{ background:"#fff", borderRadius:10, border:`1px solid ${C.border}`, overflow:"hidden", marginBottom:12 }}>
            <div style={{ padding:"9px 14px", borderBottom:`1px solid ${C.border}`, background:C.slateBg }}>
              <span style={{ fontSize:11, fontWeight:700, color:C.textMed }}>Options d'épargne des carbapénèmes</span>
            </div>
            {meca.epargne.map((mol, i) => (
              <div key={i} style={{ padding:"10px 14px", borderBottom: i < meca.epargne.length-1 ? `1px solid ${C.border}` : "none" }}>
                <div style={{ fontSize:12.5, fontWeight:600, color:C.text, marginBottom:2 }}>{mol.name}</div>
                <div style={{ fontSize:11, color:C.textSoft, lineHeight:1.5 }}>{mol.note}</div>
              </div>
            ))}
          </div>
        )}

        {/* Dernier recours */}
        {meca.dernier_recours && (
          <div style={{ background:"#FEF2F2", border:"1px solid #FECACA", borderRadius:10, padding:"10px 14px", marginBottom:12 }}>
            <div style={{ fontSize:11, fontWeight:700, color:"#DC2626", marginBottom:6 }}>⚠ Dernier recours</div>
            {meca.dernier_recours.map((mol, i) => (
              <div key={i}>
                <div style={{ fontSize:12.5, fontWeight:600, color:"#991B1B" }}>{mol.name}</div>
                <div style={{ fontSize:11, color:"#991B1B", lineHeight:1.5, marginTop:2 }}>{mol.note}</div>
              </div>
            ))}
          </div>
        )}

        <div style={{ background:"#fff", borderRadius:8, border:`1px solid ${C.border}`, padding:"8px 12px" }}>
          <div style={{ fontSize:9, fontWeight:700, color:C.textXsoft, textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:4 }}>Source</div>
          <div style={{ fontSize:11, color:C.textSoft }}>{meca.source}</div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div style={{ background:"#EFF6FF", border:"1px solid #BFDBFE", borderRadius:10, padding:"11px 14px", marginBottom:14 }}>
        <div style={{ fontSize:12, color:"#1E40AF", lineHeight:1.6 }}>{NOUVEAUX_ATB_BGN.intro}</div>
      </div>

      <div style={{ fontSize:11, fontWeight:700, color:C.textXsoft, letterSpacing:"0.07em", textTransform:"uppercase", marginBottom:10 }}>
        Choisir par mécanisme de résistance
      </div>
      <div style={{ display:"flex", flexDirection:"column", gap:8, marginBottom:16 }}>
        {NOUVEAUX_ATB_BGN.mecanismes.map(m => (
          <button key={m.id} onClick={() => setSelected(m.id)} style={{ background:"#fff", border:`1px solid ${C.border}`, borderLeft:`3px solid ${m.color}`, borderRadius:10, padding:"12px 14px", cursor:"pointer", textAlign:"left", display:"flex", alignItems:"center", gap:10 }}>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:12.5, fontWeight:700, color:C.text, lineHeight:1.4 }}>{m.nom}</div>
              <div style={{ fontSize:10, color:m.color, fontWeight:600, marginTop:3 }}>{m.premiere_intention[0].name.split(" (")[0]}</div>
            </div>
            <span style={{ color:C.textXsoft, fontSize:18, flexShrink:0 }}>›</span>
          </button>
        ))}
      </div>

      {/* Principes généraux */}
      <div style={{ background:"#fff", borderRadius:10, border:`1px solid ${C.border}`, overflow:"hidden" }}>
        <div style={{ padding:"9px 14px", borderBottom:`1px solid ${C.border}`, background:C.slateBg }}>
          <span style={{ fontSize:11, fontWeight:700, color:C.text }}>Principes fondamentaux SRLF 2022</span>
        </div>
        {NOUVEAUX_ATB_BGN.principes.map((p, i) => (
          <div key={i} style={{ padding:"10px 14px", borderBottom: i < NOUVEAUX_ATB_BGN.principes.length-1 ? `1px solid ${C.border}` : "none", display:"flex", gap:10 }}>
            <span style={{ color:"#1D4ED8", fontWeight:700, flexShrink:0 }}>•</span>
            <span style={{ fontSize:12, color:C.textMed, lineHeight:1.55 }}>{p}</span>
          </div>
        ))}
      </div>
    </div>
  );
};



// ═══ MODULE HÉMODYNAMIQUE — SCHÉMA FRANK-STARLING SVG ═══
const FrankStarlingDiagram = ({ state = "normal" }) => {
  const W = 300, H = 200, padX = 40, padY = 20;
  const gW = W - padX - 15, gH = H - padY - 30;
  const toX = (p) => padX + (p / 25) * gW;
  const toY = (v) => padY + gH - (v / 100) * gH;

  // Frank-Starling curves: normal, hypercontractile (sepsis early), failing (cardiogenic)
  const curves = {
    normal: { color: "#15803D", label: "Normal", pts: [[0,5],[5,40],[10,68],[15,85],[20,93],[25,97]] },
    failing: { color: "#DC2626", label: "Insuffisance cardiaque", pts: [[0,2],[5,15],[10,28],[15,38],[20,45],[25,50]] },
    hyper: { color: "#D97706", label: "Hypercontractile", pts: [[0,8],[5,55],[10,85],[15,98],[20,103],[25,105]] },
  };

  return (
    <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{ maxWidth: 360, display: "block" }}>
      <rect width={W} height={H} fill="#F8FAFC" rx="8"/>
      {/* Grid */}
      {[0,5,10,15,20,25].map(p => (
        <g key={p}>
          <line x1={toX(p)} y1={padY} x2={toX(p)} y2={padY+gH} stroke="#E2E8F0" strokeWidth="0.5"/>
          <text x={toX(p)} y={padY+gH+12} fontSize="7" fill="#94A3B8" textAnchor="middle">{p}</text>
        </g>
      ))}
      {/* Axes */}
      <line x1={padX} y1={padY} x2={padX} y2={padY+gH} stroke="#64748B" strokeWidth="1.5"/>
      <line x1={padX} y1={padY+gH} x2={padX+gW} y2={padY+gH} stroke="#64748B" strokeWidth="1.5"/>
      <text x={W/2} y={H-4} fontSize="8" fill="#475569" textAnchor="middle">Précharge (pression télédiastolique VG)</text>
      <text x={12} y={H/2} fontSize="8" fill="#475569" textAnchor="middle" transform={`rotate(-90, 12, ${H/2})`}>Volume d'éjection</text>
      {/* Curves */}
      {Object.entries(curves).map(([key, c]) => {
        const active = state === key || state === "all";
        const path = c.pts.map((p,i) => `${i===0?"M":"L"}${toX(p[0])},${toY(p[1])}`).join(" ");
        return (
          <g key={key} opacity={active ? 1 : 0.2}>
            <path d={path} fill="none" stroke={c.color} strokeWidth={active?2.5:1.5} strokeLinecap="round"/>
            {active && <text x={toX(c.pts[5][0])-2} y={toY(c.pts[5][1])-4} fontSize="8" fill={c.color} fontWeight="700" textAnchor="end">{c.label}</text>}
          </g>
        );
      })}
    </svg>
  );
};

// ═══ ÉCRAN PROFILS DE CHOC ═══
const ChocProfileScreen = ({ C }) => {
  const [selected, setSelected] = useState(null);
  const choc = selected ? CHOC_PROFILES.find(c => c.id === selected) : null;

  if (selected && choc) {
    return (
      <div>
        <button onClick={() => setSelected(null)} style={{ display:"flex", alignItems:"center", gap:6, background:"none", border:"none", cursor:"pointer", color:C.accent, fontSize:13, marginBottom:14, padding:0 }}>← Profils de choc</button>
        <div style={{ background:`${choc.color}12`, border:`1px solid ${choc.color}30`, borderLeft:`3px solid ${choc.color}`, borderRadius:10, padding:"12px 14px", marginBottom:14 }}>
          <div style={{ fontSize:15, fontWeight:800, color:choc.color }}>{choc.icon} {choc.nom}</div>
          <div style={{ fontSize:12, color:C.textMed, marginTop:4, fontWeight:600 }}>{choc.profil}</div>
        </div>

        <div style={{ background:"#fff", borderRadius:10, border:`1px solid ${C.border}`, overflow:"hidden", marginBottom:12 }}>
          <div style={{ padding:"9px 14px", borderBottom:`1px solid ${C.border}`, background:C.slateBg }}>
            <span style={{ fontSize:11, fontWeight:700, color:choc.color }}>Profil hémodynamique</span>
          </div>
          {Object.entries(choc.hemodynamique).map(([k,v], i, arr) => (
            <div key={k} style={{ padding:"9px 14px", borderBottom: i<arr.length-1?`1px solid ${C.border}`:"none", display:"flex", justifyContent:"space-between", gap:10 }}>
              <span style={{ fontSize:12, color:C.textSoft, flexShrink:0, maxWidth:"45%" }}>{k}</span>
              <span style={{ fontSize:12, fontWeight:600, color:C.text, textAlign:"right" }}>{v}</span>
            </div>
          ))}
        </div>

        <div style={{ background:"#fff", borderRadius:10, border:`1px solid ${C.border}`, overflow:"hidden", marginBottom:12 }}>
          <div style={{ padding:"9px 14px", borderBottom:`1px solid ${C.border}`, background:C.slateBg }}>
            <span style={{ fontSize:11, fontWeight:700, color:choc.color }}>Prise en charge — étape par étape</span>
          </div>
          {choc.prise_en_charge.map((e, i) => (
            <div key={i} style={{ padding:"11px 14px", borderBottom: i<choc.prise_en_charge.length-1?`1px solid ${C.border}`:"none" }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:3 }}>
                <span style={{ fontSize:12.5, fontWeight:700, color:C.text }}>{e.etape}</span>
                <GradeBadge grade={e.grade} />
              </div>
              <div style={{ fontSize:12, color:C.textMed, lineHeight:1.55 }}>{e.detail}</div>
            </div>
          ))}
        </div>
        <div style={{ background:"#fff", borderRadius:8, border:`1px solid ${C.border}`, padding:"8px 12px" }}>
          <div style={{ fontSize:9, fontWeight:700, color:C.textXsoft, textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:4 }}>Source</div>
          <div style={{ fontSize:11, color:C.textSoft }}>{choc.source}</div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div style={{ fontSize:12, color:C.textSoft, marginBottom:14, lineHeight:1.5 }}>
        Les 4 grands profils hémodynamiques de choc. Identifier le profil oriente le traitement (remplissage, vasopresseur, inotrope).
      </div>
      <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
        {CHOC_PROFILES.map(c => (
          <button key={c.id} onClick={() => setSelected(c.id)} style={{ background:"#fff", border:`1px solid ${C.border}`, borderLeft:`3px solid ${c.color}`, borderRadius:10, padding:"13px 14px", cursor:"pointer", textAlign:"left", display:"flex", alignItems:"center", gap:12 }}>
            <span style={{ fontSize:22 }}>{c.icon}</span>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:13, fontWeight:700, color:C.text }}>{c.nom}</div>
              <div style={{ fontSize:10.5, color:C.textSoft, marginTop:2, lineHeight:1.4 }}>{c.profil}</div>
            </div>
            <span style={{ color:C.textXsoft, fontSize:18 }}>›</span>
          </button>
        ))}
      </div>
    </div>
  );
};

// ═══ ÉCRAN CALCULATEURS HÉMODYNAMIQUES ═══
const HemoCalcScreen = ({ C }) => {
  const [selected, setSelected] = useState(null);
  const [vals, setVals] = useState({});
  const calc = selected ? HEMO_CALCULATORS.find(c => c.id === selected) : null;

  if (selected && calc) {
    const allFilled = calc.inputs.every(inp => vals[inp.id] && !isNaN(parseFloat(vals[inp.id])));
    const numVals = {};
    calc.inputs.forEach(inp => numVals[inp.id] = parseFloat(vals[inp.id]));
    const result = allFilled ? calc.compute(numVals) : null;

    return (
      <div>
        <button onClick={() => { setSelected(null); setVals({}); }} style={{ display:"flex", alignItems:"center", gap:6, background:"none", border:"none", cursor:"pointer", color:C.accent, fontSize:13, marginBottom:14, padding:0 }}>← Calculateurs</button>
        <div style={{ fontSize:15, fontWeight:700, color:C.text, marginBottom:6 }}>{calc.nom}</div>
        <div style={{ background:C.slateBg, borderRadius:8, padding:"8px 12px", marginBottom:14 }}>
          <div style={{ fontSize:11, color:C.textMed, fontFamily:"monospace", lineHeight:1.5 }}>{calc.formule}</div>
        </div>
        <div style={{ background:"#fff", borderRadius:10, border:`1px solid ${C.border}`, overflow:"hidden", marginBottom:14 }}>
          {calc.inputs.map((inp, i) => (
            <div key={inp.id} style={{ padding:"10px 14px", borderBottom: i<calc.inputs.length-1?`1px solid ${C.border}`:"none" }}>
              <div style={{ fontSize:11, color:C.textSoft, marginBottom:5 }}>{inp.label}</div>
              <input type="number" step="any" value={vals[inp.id]||""} onChange={e => setVals(p => ({...p, [inp.id]: e.target.value}))} placeholder={inp.placeholder} style={{ width:"100%", border:`1.5px solid ${C.border}`, borderRadius:8, padding:"9px 12px", fontSize:15, color:C.text, outline:"none", fontFamily:"inherit", boxSizing:"border-box" }} />
            </div>
          ))}
        </div>
        {result && (
          <div style={{ background:"#fff", borderRadius:12, border:`2px solid ${result.color}`, padding:"16px", marginBottom:14 }}>
            <div style={{ display:"flex", alignItems:"baseline", gap:8, marginBottom:8 }}>
              <span style={{ fontSize:32, fontWeight:900, color:result.color, fontFamily:"monospace" }}>{result.value}</span>
              <span style={{ fontSize:14, color:C.textSoft }}>{result.unit}</span>
            </div>
            <div style={{ fontSize:12.5, color:result.color, fontWeight:600, lineHeight:1.5 }}>{result.interp}</div>
            {result.extra && <div style={{ fontSize:11, color:C.textSoft, marginTop:6 }}>{result.extra}</div>}
          </div>
        )}
        <div style={{ background:C.blueBg, borderRadius:8, padding:"8px 12px" }}>
          <div style={{ fontSize:11, color:C.blue, fontWeight:600 }}>{calc.normes}</div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div style={{ fontSize:12, color:C.textSoft, marginBottom:14 }}>Calculateurs hémodynamiques de réanimation.</div>
      <div style={{ background:"#fff", borderRadius:12, border:`1px solid ${C.border}`, overflow:"hidden" }}>
        {HEMO_CALCULATORS.map((c, i) => (
          <button key={c.id} onClick={() => { setSelected(c.id); setVals({}); }} style={{ width:"100%", background:"none", border:"none", borderBottom: i<HEMO_CALCULATORS.length-1?`1px solid ${C.border}`:"none", padding:"13px 14px", cursor:"pointer", textAlign:"left", display:"flex", alignItems:"center", gap:12 }}>
            <div style={{ width:34, height:34, borderRadius:9, background:C.blueBg, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
              <span style={{ fontSize:16 }}>🧮</span>
            </div>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:13, fontWeight:600, color:C.text }}>{c.nom}</div>
              <div style={{ fontSize:10, color:C.textSoft, marginTop:1 }}>{c.normes}</div>
            </div>
            <span style={{ color:C.textXsoft, fontSize:16 }}>›</span>
          </button>
        ))}
      </div>
    </div>
  );
};

// ═══ ÉCRAN MONITORAGE ═══
const MonitoringScreen = ({ C }) => {
  const [open, setOpen] = useState(null);
  return (
    <div>
      <div style={{ fontSize:12, color:C.textSoft, marginBottom:14, lineHeight:1.5 }}>
        Interprétation des outils de monitorage hémodynamique en réanimation.
      </div>
      {MONITORING_HEMO.map((m, i) => (
        <div key={m.id} style={{ background:"#fff", borderRadius:10, border:`1px solid ${C.border}`, marginBottom:10, overflow:"hidden" }}>
          <button onClick={() => setOpen(open===i?null:i)} style={{ width:"100%", background:"none", border:"none", padding:"13px 14px", cursor:"pointer", textAlign:"left", display:"flex", alignItems:"center", gap:12 }}>
            <div style={{ width:36, height:36, borderRadius:9, background:m.color+"15", display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, flexShrink:0 }}>{m.icon}</div>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:13, fontWeight:700, color:C.text }}>{m.nom}</div>
            </div>
            <span style={{ color:C.textXsoft, fontSize:16 }}>{open===i?"▲":"▼"}</span>
          </button>
          {open===i && (
            <div style={{ borderTop:`1px solid ${C.border}` }}>
              {m.params.map((p, pi) => (
                <div key={pi} style={{ padding:"10px 14px", borderBottom:`1px solid ${C.border}` }}>
                  <div style={{ display:"flex", justifyContent:"space-between", gap:8, marginBottom:3 }}>
                    <span style={{ fontSize:12.5, fontWeight:700, color:C.text }}>{p.nom}</span>
                    <span style={{ fontSize:11, fontWeight:600, color:m.color, flexShrink:0 }}>{p.normes}</span>
                  </div>
                  <div style={{ fontSize:11.5, color:C.textMed, lineHeight:1.5 }}>{p.interpretation}</div>
                </div>
              ))}
              <div style={{ padding:"10px 14px", background:C.blueBg }}>
                <div style={{ fontSize:11, color:"#1E40AF", lineHeight:1.6 }}>💡 {m.note}</div>
              </div>
              <div style={{ padding:"7px 14px", background:C.slateBg }}>
                <div style={{ fontSize:10, color:C.textSoft }}>{m.source}</div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

// ═══ ÉCRAN FRANK-STARLING ═══
const FrankStarlingScreen = ({ C }) => {
  const [state, setState] = useState("all");
  return (
    <div>
      <div style={{ fontSize:12, color:C.textSoft, marginBottom:14, lineHeight:1.5 }}>
        La courbe de Frank-Starling relie la précharge (pression télédiastolique) au volume d'éjection. Elle explique la précharge-dépendance.
      </div>
      <div style={{ background:"#fff", borderRadius:12, border:`1px solid ${C.border}`, padding:"14px", marginBottom:14 }}>
        <div style={{ display:"flex", gap:6, marginBottom:12, flexWrap:"wrap" }}>
          {[["all","Toutes"],["normal","Normal"],["failing","Insuff. card."],["hyper","Hypercontractile"]].map(([k,l]) => (
            <button key={k} onClick={() => setState(k)} style={{ padding:"5px 10px", borderRadius:6, border:`1.5px solid ${state===k?C.accent:C.border}`, background: state===k?C.accent+"15":"#fff", color: state===k?C.accent:C.textSoft, fontSize:10.5, cursor:"pointer", fontFamily:"inherit", fontWeight: state===k?700:400 }}>{l}</button>
          ))}
        </div>
        <FrankStarlingDiagram state={state} />
      </div>
      <div style={{ background:"#fff", borderRadius:10, border:`1px solid ${C.border}`, overflow:"hidden" }}>
        <div style={{ padding:"9px 14px", borderBottom:`1px solid ${C.border}`, background:C.slateBg }}>
          <span style={{ fontSize:11, fontWeight:700, color:C.text }}>Lecture clinique</span>
        </div>
        {[
          ["Partie ascendante (raide)", "Le patient est PRÉCHARGE-DÉPENDANT : une expansion volémique augmente le volume d'éjection. Le remplissage est utile."],
          ["Plateau de la courbe", "Le patient n'est PLUS précharge-dépendant : le remplissage augmente la pression sans augmenter le débit → risque de surcharge et d'œdème pulmonaire."],
          ["Courbe abaissée (insuffisance cardiaque)", "À précharge égale, le volume d'éjection est plus bas. Le cœur défaillant atteint son plateau pour des pressions de remplissage basses → tolérance réduite au remplissage."],
        ].map(([t, d], i, arr) => (
          <div key={i} style={{ padding:"10px 14px", borderBottom: i<arr.length-1?`1px solid ${C.border}`:"none" }}>
            <div style={{ fontSize:12.5, fontWeight:700, color:C.text, marginBottom:3 }}>{t}</div>
            <div style={{ fontSize:11.5, color:C.textMed, lineHeight:1.55 }}>{d}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ═══ ÉCRAN PRINCIPAL HÉMODYNAMIQUE ═══

// ─── DROGUES VASOACTIVES & INOTROPES ───────────────────────────
const VASOACTIVES = [
  {
    id: "noradre", nom: "Noradrénaline", classe: "Vasopresseur", color: "#DC2626",
    recepteurs: "α1 +++ , β1 +",
    effet: "Vasoconstriction puissante (↑ RVS, ↑ PAM), effet inotrope modéré. Augmente peu la fréquence cardiaque.",
    indication: "Vasopresseur de PREMIÈRE INTENTION du choc septique et de la plupart des chocs vasoplégiques.",
    dose: "0,1 à 0,5 µg/kg/min (jusqu'à 1–3 µg/kg/min dans les formes réfractaires)",
    dilution: "Voie veineuse CENTRALE de préférence — dilution usuelle 8 mg/40 mL ou selon protocole local",
    surveillance: "PAM cible ≥ 65 mmHg, diurèse, lactates, perfusion périphérique. Risque d'ischémie distale aux fortes doses.",
    grade: "1A",
  },
  {
    id: "adre", nom: "Adrénaline", classe: "Vasopresseur + Inotrope", color: "#B91C1C",
    recepteurs: "α1, β1, β2 (dose-dépendant)",
    effet: "Faibles doses : effet β (inotrope, chronotrope, vasodilatation). Fortes doses : effet α (vasoconstriction).",
    indication: "Arrêt cardiaque (1 mg IV/3–5 min), choc anaphylactique, choc cardiogénique ou septique réfractaire, bradycardie.",
    dose: "ACR : 1 mg IVD toutes les 3–5 min · Anaphylaxie : 0,5 mg IM (0,01 mg/kg) · Perfusion : 0,05–0,5 µg/kg/min",
    dilution: "Voie centrale en perfusion continue · IM (face antéro-latérale de cuisse) dans l'anaphylaxie",
    surveillance: "Tachycardie, arythmies, hyperlactatémie, hyperglycémie. Effet pro-arythmogène.",
    grade: "1A",
  },
  {
    id: "dobu", nom: "Dobutamine", classe: "Inotrope", color: "#1D4ED8",
    recepteurs: "β1 +++ , β2 +",
    effet: "Inotrope positif (↑ contractilité et débit cardiaque), vasodilatation périphérique modérée (peut baisser la PAM).",
    indication: "Choc cardiogénique, dysfonction myocardique du choc septique (après optimisation de la précharge et de la PAM).",
    dose: "2,5 à 20 µg/kg/min",
    dilution: "Voie centrale de préférence — titrer par paliers sur le débit cardiaque et la perfusion",
    surveillance: "Débit cardiaque, ScvO₂, lactates. Risque de tachycardie, d'arythmie et d'hypotension (vasodilatation).",
    grade: "1B",
  },
  {
    id: "vaso", nom: "Vasopressine", classe: "Vasopresseur (non catécholaminergique)", color: "#7C3AED",
    recepteurs: "Récepteurs V1 vasculaires",
    effet: "Vasoconstriction indépendante des récepteurs adrénergiques. Épargne catécholaminergique.",
    indication: "Choc septique en ajout de la noradrénaline (épargne, ou si dose de noradrénaline élevée).",
    dose: "0,01 à 0,03 U/min (dose FIXE, non titrée au poids)",
    dilution: "Voie centrale — ne pas dépasser 0,04 U/min (risque ischémique)",
    surveillance: "Ischémie digitale, mésentérique, coronaire. Ne pas utiliser en monothérapie de première intention.",
    grade: "2B",
  },
  {
    id: "dopa", nom: "Dopamine", classe: "Vasopresseur + Inotrope", color: "#D97706",
    recepteurs: "Dopaminergiques, β1, α1 (dose-dépendant)",
    effet: "Effet dose-dépendant. Largement délaissée en réanimation au profit de la noradrénaline.",
    indication: "N'est PLUS recommandée en première intention (plus d'arythmies et surmortalité vs noradrénaline — essai SOAP II).",
    dose: "Historique : 5–20 µg/kg/min — non recommandée en routine",
    dilution: "Voie centrale",
    surveillance: "Tachyarythmies fréquentes. La « dose rénale » de dopamine est un concept abandonné (inefficace).",
    grade: "2B",
  },
  {
    id: "milri", nom: "Milrinone", classe: "Inodilatateur (inhibiteur PDE-3)", color: "#0F766E",
    recepteurs: "Inhibition de la phosphodiestérase 3",
    effet: "Inotrope positif + vasodilatateur (systémique et pulmonaire), indépendant des récepteurs β. « Inodilatateur ».",
    indication: "Choc cardiogénique, insuffisance cardiaque avec hypertension pulmonaire, dysfonction du VD — alternative à la dobutamine.",
    dose: "0,375 à 0,75 µg/kg/min (dose de charge souvent omise en réanimation)",
    dilution: "Voie centrale — élimination rénale (réduire si insuffisance rénale)",
    surveillance: "Hypotension (vasodilatation), arythmies. Demi-vie longue (effet prolongé après arrêt).",
    grade: "2B",
  },
];

// ─── ÉCRAN DROGUES VASOACTIVES ─────────────────────────────────
const VasoactivesScreen = ({ C }) => {
  const [open, setOpen] = useState(null);
  return (
    <div>
      <div style={{ fontSize:12, color:C.textSoft, marginBottom:14, lineHeight:1.5 }}>
        Catécholamines, vasopresseurs et inotropes : choix selon le profil de choc, posologies et surveillance.
      </div>
      {VASOACTIVES.map((d, i) => (
        <div key={d.id} style={{ background:"#fff", borderRadius:10, border:`1px solid ${C.border}`, borderLeft:`3px solid ${d.color}`, marginBottom:10, overflow:"hidden" }}>
          <button onClick={() => setOpen(open===i?null:i)} style={{ width:"100%", background:"none", border:"none", padding:"12px 14px", cursor:"pointer", textAlign:"left", display:"flex", alignItems:"center", gap:10 }}>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:13.5, fontWeight:800, color:C.text }}>{d.nom}</div>
              <div style={{ fontSize:10.5, color:d.color, fontWeight:600, marginTop:2 }}>{d.classe} · {d.recepteurs}</div>
            </div>
            <GradeBadge grade={d.grade} />
            <span style={{ color:C.textXsoft, fontSize:15 }}>{open===i?"▲":"▼"}</span>
          </button>
          {open===i && (
            <div style={{ borderTop:`1px solid ${C.border}` }}>
              {[
                ["Effet", d.effet],
                ["Indication", d.indication],
                ["Posologie", d.dose],
                ["Administration", d.dilution],
                ["Surveillance", d.surveillance],
              ].map(([label, val], li) => (
                <div key={li} style={{ padding:"9px 14px", borderBottom: li<4?`1px solid ${C.border}`:"none" }}>
                  <div style={{ fontSize:9.5, fontWeight:700, color:C.textXsoft, textTransform:"uppercase", letterSpacing:"0.07em", marginBottom:3 }}>{label}</div>
                  <div style={{ fontSize:12, color: label==="Posologie"?d.color:C.textMed, fontWeight: label==="Posologie"?700:400, lineHeight:1.55 }}>{val}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
      <div style={{ background:C.blueBg, border:`1px solid ${C.blueBorder}`, borderRadius:10, padding:"11px 14px", marginTop:6 }}>
        <div style={{ fontSize:11, color:"#1E40AF", lineHeight:1.6 }}>
          💡 Règle d'or : un vasopresseur (noradrénaline) corrige la vasoplégie, un inotrope (dobutamine) corrige la défaillance de pompe. Identifier le profil de choc AVANT de choisir la drogue.
        </div>
      </div>
    </div>
  );
};

const HemodynamiqueScreen = ({ C }) => {
  const [subview, setSubview] = useState("menu");
  const screens = {
    profils: <ChocProfileScreen C={C} />,
    vaso: <VasoactivesScreen C={C} />,
    calc: <HemoCalcScreen C={C} />,
    monitoring: <MonitoringScreen C={C} />,
    starling: <FrankStarlingScreen C={C} />,
  };
  const titles = { profils:"Profils de Choc", vaso:"Drogues Vasoactives & Inotropes", calc:"Calculateurs", monitoring:"Monitorage", starling:"Courbe de Frank-Starling" };

  if (subview !== "menu") {
    return (
      <div>
        <button onClick={() => setSubview("menu")} style={{ display:"flex", alignItems:"center", gap:6, background:"none", border:"none", cursor:"pointer", color:C.accent, fontSize:13, marginBottom:14, padding:0 }}>← Hémodynamique</button>
        <div style={{ fontSize:15, fontWeight:700, marginBottom:14, color:C.text }}>{titles[subview]}</div>
        {screens[subview]}
      </div>
    );
  }

  return (
    <div>
      <div style={{ background:"linear-gradient(135deg, #BE123C 0%, #881337 100%)", borderRadius:12, padding:"16px", marginBottom:16, color:"#fff" }}>
        <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:8 }}>
          <span style={{ fontSize:24 }}>💉</span>
          <div>
            <div style={{ fontSize:16, fontWeight:800 }}>Hémodynamique</div>
            <div style={{ fontSize:10, opacity:0.85, letterSpacing:"0.06em" }}>CHOC · DROGUES · MONITORAGE · CALCULS</div>
          </div>
        </div>
        <div style={{ fontSize:12, opacity:0.92, lineHeight:1.6 }}>
          Profils de choc, drogues vasoactives et inotropes, monitorage (PiCCO, échographie, PLR/VPP), calculateurs et courbe de Frank-Starling.
        </div>
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:16 }}>
        {[
          { id:"profils", icon:"🩺", title:"Profils de choc", desc:"Septique · Cardiogénique · Hypovolémique · Obstructif", color:"#DC2626" },
          { id:"vaso", icon:"💊", title:"Drogues vasoactives", desc:"Noradré · Adré · Dobutamine · Vasopressine", color:"#BE123C" },
          { id:"monitoring", icon:"📊", title:"Monitorage", desc:"PiCCO · Échographie · PLR/VPP", color:"#1D4ED8" },
          { id:"calc", icon:"🧮", title:"Calculateurs", desc:"IC · RVS · DO₂ · PPC", color:"#15803D" },
          { id:"starling", icon:"📈", title:"Frank-Starling", desc:"Précharge-dépendance", color:"#7C3AED" },
        ].map(item => (
          <button key={item.id} onClick={() => setSubview(item.id)} style={{ background:"#fff", border:`1px solid ${C.border}`, borderTop:`3px solid ${item.color}`, borderRadius:12, padding:"14px 12px", cursor:"pointer", textAlign:"left" }}>
            <div style={{ fontSize:24, marginBottom:8 }}>{item.icon}</div>
            <div style={{ fontSize:12, fontWeight:700, color:C.text, lineHeight:1.3, marginBottom:3 }}>{item.title}</div>
            <div style={{ fontSize:9.5, color:C.textSoft, lineHeight:1.4 }}>{item.desc}</div>
          </button>
        ))}
      </div>

      <div style={{ background:"#FEF2F2", border:"1px solid #FECACA", borderRadius:10, padding:"10px 14px" }}>
        <div style={{ fontSize:11, fontWeight:700, color:"#BE123C", marginBottom:4 }}>⚠ Principe fondamental</div>
        <div style={{ fontSize:11.5, color:"#991B1B", lineHeight:1.6 }}>
          Avant toute expansion volémique, évaluer la précharge-dépendance (PLR, VPP, variation ITV). Remplir un patient non précharge-dépendant aggrave l'œdème sans améliorer le débit.
        </div>
      </div>
    </div>
  );
};


const VentCalculator = ({ pathId, onBack, C }) => {
  const path = VENT_PATHOLOGIES.find(p => p.id === pathId);
  const [sexe, setSexe] = useState("homme");
  const [taille, setTaille] = useState("");
  const [poids, setPoids] = useState("");
  const [showCurves, setShowCurves] = useState(false);
  const [alveoleState, setAlveoleState] = useState("normal");

  const tNum = parseFloat(taille);
  const ppi = tNum > 0 ? Math.round(PPI_FORMULAS[sexe](tNum) * 10) / 10 : null;

  const vtCalc = (factor) => ppi ? Math.round(ppi * factor) : null;

  if (!path) return null;

  return (
    <div>
      {/* Header card */}
      <div style={{ background: path.color + "12", border: `1px solid ${path.color}30`, borderLeft: `3px solid ${path.color}`, borderRadius: 10, padding: "12px 14px", marginBottom: 14 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
          <span style={{ fontSize: 20 }}>{path.icon}</span>
          <span style={{ fontSize: 14, fontWeight: 700, color: C.text }}>{path.name}</span>
        </div>
        <div style={{ fontSize: 12, color: path.color, fontWeight: 600 }}>{path.strategy}</div>
      </div>

      {/* PPI Calculator */}
      <div style={{ background: "#fff", borderRadius: 10, border: `1px solid ${C.border}`, marginBottom: 12, overflow: "hidden" }}>
        <div style={{ padding: "9px 14px", borderBottom: `1px solid ${C.border}`, background: C.slateBg }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: path.color }}>Calculateur du Poids Prédit Idéal (PPI)</span>
        </div>
        <div style={{ padding: "12px 14px" }}>
          <div style={{ fontSize: 11, color: C.textSoft, marginBottom: 10, lineHeight: 1.5 }}>
            Le volume courant est calculé sur le <strong>poids prédit idéal</strong> (basé sur la taille), jamais sur le poids réel.
          </div>
          <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
            {["homme", "femme"].map(s => (
              <button key={s} onClick={() => setSexe(s)} style={{ flex: 1, padding: "8px", borderRadius: 8, border: `1.5px solid ${sexe === s ? path.color : C.border}`, background: sexe === s ? path.color + "15" : "#fff", color: sexe === s ? path.color : C.textSoft, fontWeight: sexe === s ? 700 : 400, cursor: "pointer", fontSize: 13, fontFamily: "inherit" }}>
                {s === "homme" ? "♂ Homme" : "♀ Femme"}
              </button>
            ))}
          </div>
          <input type="number" value={taille} onChange={e => setTaille(e.target.value)} placeholder="Taille en cm (ex: 170)" style={{ width: "100%", border: `1.5px solid ${C.border}`, borderRadius: 8, padding: "9px 12px", fontSize: 14, color: C.text, outline: "none", boxSizing: "border-box", fontFamily: "inherit", marginBottom: 10 }} />
          {ppi && (
            <div style={{ background: path.color + "10", border: `1px solid ${path.color}30`, borderRadius: 8, padding: "10px 12px" }}>
              <div style={{ fontSize: 11, color: C.textSoft, marginBottom: 6 }}>Poids Prédit Idéal :</div>
              <div style={{ fontSize: 24, fontWeight: 900, color: path.color, fontFamily: "monospace" }}>{ppi} kg</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, marginTop: 10 }}>
                {[4, 6, 8].map(f => (
                  <div key={f} style={{ background: "#fff", borderRadius: 6, padding: "6px 10px", border: `1px solid ${C.border}` }}>
                    <div style={{ fontSize: 9, color: C.textSoft }}>Vt {f} mL/kg</div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: f === 6 ? path.color : C.textMed }}>{vtCalc(f)} mL</div>
                  </div>
                ))}
                <div style={{ background: "#fff", borderRadius: 6, padding: "6px 10px", border: `1px solid ${C.border}` }}>
                  <div style={{ fontSize: 9, color: C.textSoft }}>Vt 8 mL/kg</div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: C.orange }}>{vtCalc(8)} mL ⚠</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Settings */}
      <div style={{ background: "#fff", borderRadius: 10, border: `1px solid ${C.border}`, marginBottom: 12, overflow: "hidden" }}>
        <div style={{ padding: "9px 14px", borderBottom: `1px solid ${C.border}`, background: C.slateBg }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: path.color }}>Réglages recommandés</span>
        </div>
        {Object.entries(path.settings).map(([key, val], i, arr) => (
          <div key={key} style={{ padding: "10px 14px", borderBottom: i < arr.length - 1 ? `1px solid ${C.border}` : "none" }}>
            <div style={{ fontSize: 10, color: C.textSoft, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 3 }}>
              {key === "mode" ? "Mode ventilatoire" : key === "vt" ? "Volume courant" : key === "fr" ? "Fréquence respiratoire" : key === "pep" ? "Pression expiratoire positive (PEP)" : key === "fio2" ? "FiO₂" : "Rapport I:E"}
            </div>
            <div style={{ fontSize: 13, fontWeight: 600, color: C.text }}>
              {typeof val === "string" ? val : (ppi && val.formula ? `${val.formula} = ${vtCalc(6)}–${vtCalc(8)} mL` : val.formula || val.value)}
            </div>
            {typeof val === "object" && val.note && (
              <div style={{ fontSize: 11, color: C.textSoft, marginTop: 2 }}>{val.note}</div>
            )}
            {typeof val === "object" && val.warning && (
              <div style={{ fontSize: 11, color: C.orange, marginTop: 3 }}>⚠ {val.warning}</div>
            )}
          </div>
        ))}
      </div>

      {/* Objectifs */}
      <div style={{ background: "#fff", borderRadius: 10, border: `1px solid ${C.border}`, marginBottom: 12, overflow: "hidden" }}>
        <div style={{ padding: "9px 14px", borderBottom: `1px solid ${C.border}`, background: C.slateBg }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: path.color }}>Objectifs à atteindre</span>
        </div>
        {path.objectifs.map((obj, i) => (
          <div key={i} style={{ padding: "9px 14px", borderBottom: i < path.objectifs.length - 1 ? `1px solid ${C.border}` : "none", display: "flex", gap: 10, alignItems: "flex-start" }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: path.color, marginTop: 5, flexShrink: 0 }} />
            <span style={{ fontSize: 13, color: C.textMed, lineHeight: 1.5 }}>{obj}</span>
          </div>
        ))}
      </div>

      {/* Courbes */}
      <div style={{ background: "#fff", borderRadius: 10, border: `1px solid ${C.border}`, marginBottom: 12, overflow: "hidden" }}>
        <button onClick={() => setShowCurves(!showCurves)} style={{ width: "100%", background: "none", border: "none", padding: "11px 14px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: path.color }}>Courbes ventilatoires</span>
          <span style={{ fontSize: 14, color: C.textXsoft }}>{showCurves ? "▲" : "▼"}</span>
        </button>
        {showCurves && (
          <div style={{ padding: "0 14px 14px", borderTop: `1px solid ${C.border}` }}>
            <div style={{ fontSize: 11, color: C.textSoft, margin: "10px 0 6px" }}>Courbe Pression-Temps</div>
            <PressureCurve mode={pathId === "bpco" || pathId === "asthme" ? "vac" : "vac"} peep={pathId === "sdra" ? 10 : 5} pip={pathId === "sdra" ? 22 : pathId === "asthme" ? 28 : 18} color={path.color} />
            <div style={{ fontSize: 11, color: C.textSoft, margin: "10px 0 6px" }}>Courbe Débit-Temps</div>
            <FlowCurve mode="vac" color={path.color} />
          </div>
        )}
      </div>

      {/* Schéma alvéolaire */}
      <div style={{ background: "#fff", borderRadius: 10, border: `1px solid ${C.border}`, marginBottom: 12, overflow: "hidden" }}>
        <div style={{ padding: "9px 14px", borderBottom: `1px solid ${C.border}`, background: C.slateBg }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: path.color }}>Physiologie alvéolaire</span>
        </div>
        <div style={{ padding: "12px 14px" }}>
          <div style={{ display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap" }}>
            {["normal", "sdra", "recrutee", "surdistension"].map(s => (
              <button key={s} onClick={() => setAlveoleState(s)} style={{ padding: "5px 10px", borderRadius: 6, border: `1.5px solid ${alveoleState === s ? path.color : C.border}`, background: alveoleState === s ? path.color + "15" : "#fff", color: alveoleState === s ? path.color : C.textSoft, fontSize: 10, cursor: "pointer", fontFamily: "inherit", fontWeight: alveoleState === s ? 700 : 400 }}>
                {s === "normal" ? "Normale" : s === "sdra" ? "SDRA" : s === "recrutee" ? "Recrutée" : "Surdistension"}
              </button>
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <AlveoleDiagram state={alveoleState} />
          </div>
        </div>
      </div>

      {/* Escalade */}
      {path.escalade.length > 0 && (
        <div style={{ background: "#fff", borderRadius: 10, border: `1px solid ${C.border}`, marginBottom: 12, overflow: "hidden" }}>
          <div style={{ padding: "9px 14px", borderBottom: `1px solid ${C.border}`, background: "#FFFBEB" }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: C.orange }}>⚠ Si réfractaire — Escalade thérapeutique</span>
          </div>
          {path.escalade.map((e, i) => (
            <div key={i} style={{ padding: "9px 14px", borderBottom: i < path.escalade.length - 1 ? `1px solid ${C.border}` : "none", display: "flex", gap: 10 }}>
              <span style={{ fontSize: 12, color: C.textSoft, flexShrink: 0 }}>{i + 1}.</span>
              <span style={{ fontSize: 13, color: C.textMed, lineHeight: 1.5 }}>{e}</span>
            </div>
          ))}
        </div>
      )}

      {/* Note PPI */}
      <div style={{ background: "#EFF6FF", border: `1px solid #BFDBFE`, borderRadius: 8, padding: "10px 12px", marginBottom: 12 }}>
        <div style={{ fontSize: 11, color: "#1D4ED8", lineHeight: 1.5 }}>💡 {path.ppi_note}</div>
      </div>

      <div style={{ fontSize: 10, color: C.textXsoft, textAlign: "center", paddingBottom: 8 }}>{path.source}</div>
    </div>
  );
};

// ─── ALARMES SCREEN ─────────────────────────────────────────────
const AlarmesScreen = ({ C }) => {
  const [openIdx, setOpenIdx] = useState(null);
  return (
    <div>
      <div style={{ fontSize: 12, color: C.textSoft, marginBottom: 14, lineHeight: 1.5 }}>
        Conduite à tenir devant les alarmes du respirateur — par ordre de priorité clinique.
      </div>
      {ALARMES.map((a, i) => (
        <div key={i} style={{ background: "#fff", borderRadius: 10, border: `1px solid ${a.urgence ? "#FECACA" : C.border}`, marginBottom: 8, overflow: "hidden" }}>
          <button onClick={() => setOpenIdx(openIdx === i ? null : i)} style={{ width: "100%", background: "none", border: "none", padding: "12px 14px", cursor: "pointer", textAlign: "left", display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: a.urgence ? "#DC2626" : "#D97706", flexShrink: 0 }} />
            <span style={{ fontSize: 13, fontWeight: 600, color: C.text, flex: 1 }}>{a.alarme}</span>
            <span style={{ fontSize: 9, padding: "2px 6px", borderRadius: 3, background: a.urgence ? "#FEF2F2" : "#FFFBEB", color: a.urgence ? "#DC2626" : "#D97706", fontWeight: 700, border: `1px solid ${a.urgence ? "#FECACA" : "#FDE68A"}` }}>
              {a.urgence ? "URGENT" : "NON URGENT"}
            </span>
          </button>
          {openIdx === i && (
            <div style={{ borderTop: `1px solid ${C.border}` }}>
              <div style={{ padding: "10px 14px", borderBottom: `1px solid ${C.border}` }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: C.textSoft, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>Causes possibles</div>
                {a.causes.map((c, ci) => (
                  <div key={ci} style={{ fontSize: 12.5, color: C.textMed, padding: "3px 0", display: "flex", gap: 8 }}>
                    <span style={{ color: C.textXsoft }}>•</span>{c}
                  </div>
                ))}
              </div>
              <div style={{ padding: "10px 14px", background: "#F0FDF4" }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: "#15803D", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6 }}>Conduite à tenir</div>
                <div style={{ fontSize: 12.5, color: "#166534", lineHeight: 1.6 }}>{a.conduite}</div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

// ─── GAS SCREEN ─────────────────────────────────────────────────
const GasScreen = ({ C }) => {
  const [ph, setPh] = useState("");
  const [paco2, setPaco2] = useState("");
  const [hco3, setHco3] = useState("");
  const [pao2, setPao2] = useState("");
  const [fio2Input, setFio2Input] = useState("");

  const interpret = () => {
    const phN = parseFloat(ph), co2N = parseFloat(paco2), hco3N = parseFloat(hco3), pao2N = parseFloat(pao2), fio2N = parseFloat(fio2Input);
    if (!phN || !co2N || !hco3N) return null;

    const results = [];
    // pH
    if (phN < 7.35) results.push({ label: "pH", value: phN, interp: "ACIDOSE", color: "#DC2626", severity: "high" });
    else if (phN > 7.45) results.push({ label: "pH", value: phN, interp: "ALCALOSE", color: "#1D4ED8", severity: "high" });
    else results.push({ label: "pH", value: phN, interp: "Normal", color: "#15803D", severity: "low" });

    // Primary
    if (phN < 7.35) {
      if (co2N > 45) results.push({ label: "Trouble primaire", value: `PaCO₂ ${co2N}`, interp: "Acidose RESPIRATOIRE", color: "#DC2626", severity: "high" });
      else if (hco3N < 22) results.push({ label: "Trouble primaire", value: `HCO₃⁻ ${hco3N}`, interp: "Acidose MÉTABOLIQUE", color: "#D97706", severity: "high" });
    } else if (phN > 7.45) {
      if (co2N < 35) results.push({ label: "Trouble primaire", value: `PaCO₂ ${co2N}`, interp: "Alcalose RESPIRATOIRE", color: "#1D4ED8", severity: "high" });
      else if (hco3N > 26) results.push({ label: "Trouble primaire", value: `HCO₃⁻ ${hco3N}`, interp: "Alcalose MÉTABOLIQUE", color: "#6D28D9", severity: "high" });
    }

    // Compensation
    if (phN < 7.35 && co2N > 45) {
      const expHco3 = 24 + (co2N - 40) * 0.35;
      const diff = Math.abs(hco3N - expHco3);
      results.push({ label: "Compensation attendue", value: `HCO₃⁻ attendu: ${expHco3.toFixed(1)} mEq/L`, interp: diff < 3 ? "Compensation adéquate" : diff > 3 ? "Sur/sous-compensation → trouble mixte" : "Limite", color: diff < 3 ? "#15803D" : "#D97706", severity: "med" });
    }
    if (phN < 7.35 && hco3N < 22) {
      const expCo2 = 1.5 * hco3N + 8;
      const diff = Math.abs(co2N - expCo2);
      results.push({ label: "Formule de Winter", value: `PaCO₂ attendue: ${(expCo2 - 2).toFixed(0)}–${(expCo2 + 2).toFixed(0)} mmHg (mesurée: ${co2N})`, interp: diff <= 2 ? "Compensation respiratoire adéquate" : "Trouble mixte à suspecter", color: diff <= 2 ? "#15803D" : "#D97706", severity: "med" });
      // Trou anionique
      results.push({ label: "Trou anionique", value: "Calculer Na⁺ − (Cl⁻ + HCO₃⁻)", interp: "Normal 8–12 mEq/L — Si élevé : MUDPILES (Méthanol, Urémie, Diabète, Propylène, Isoniazide, Lactate, Éthanol, Salicylés)", color: "#374151", severity: "info" });
    }

    // PaO2/FiO2
    if (pao2N && fio2N) {
      const ratio = Math.round(pao2N / fio2N);
      let sdraGrade = "";
      if (ratio >= 300) sdraGrade = "Pas de SDRA";
      else if (ratio >= 200) sdraGrade = "SDRA léger";
      else if (ratio >= 100) sdraGrade = "SDRA modéré";
      else sdraGrade = "SDRA sévère";
      results.push({ label: "Rapport PaO₂/FiO₂", value: `${ratio} mmHg`, interp: sdraGrade, color: ratio >= 300 ? "#15803D" : ratio >= 200 ? "#D97706" : "#DC2626", severity: ratio >= 300 ? "low" : "high" });
    }

    return results;
  };

  const results = interpret();

  return (
    <div>
      <div style={{ fontSize: 12, color: C.textSoft, marginBottom: 14 }}>Interprétation guidée des gaz du sang artériels</div>
      <div style={{ background: "#fff", borderRadius: 10, border: `1px solid ${C.border}`, overflow: "hidden", marginBottom: 12 }}>
        {[
          { id: "ph", label: "pH artériel", placeholder: "ex: 7.32", unit: "", val: ph, set: setPh },
          { id: "paco2", label: "PaCO₂ (mmHg)", placeholder: "ex: 52", unit: "mmHg", val: paco2, set: setPaco2 },
          { id: "hco3", label: "Bicarbonates HCO₃⁻ (mmol/L)", placeholder: "ex: 18", unit: "mmol/L", val: hco3, set: setHco3 },
          { id: "pao2", label: "PaO₂ (mmHg) — optionnel", placeholder: "ex: 68", unit: "mmHg", val: pao2, set: setPao2 },
          { id: "fio2", label: "FiO₂ — optionnel (ex: 0.40)", placeholder: "ex: 0.40", unit: "", val: fio2Input, set: setFio2Input },
        ].map((f, i, arr) => (
          <div key={f.id} style={{ padding: "10px 14px", borderBottom: i < arr.length - 1 ? `1px solid ${C.border}` : "none" }}>
            <div style={{ fontSize: 11, color: C.textSoft, marginBottom: 5 }}>{f.label}</div>
            <input type="number" step="0.01" value={f.val} onChange={e => f.set(e.target.value)} placeholder={f.placeholder} style={{ width: "100%", border: `1.5px solid ${C.border}`, borderRadius: 8, padding: "8px 12px", fontSize: 15, color: C.text, outline: "none", boxSizing: "border-box", fontFamily: "inherit" }} />
          </div>
        ))}
      </div>

      {results && results.length > 0 && (
        <div style={{ background: "#fff", borderRadius: 10, border: `1px solid ${C.border}`, overflow: "hidden", marginBottom: 12 }}>
          <div style={{ padding: "9px 14px", borderBottom: `1px solid ${C.border}`, background: C.slateBg }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: C.text }}>Interprétation</span>
          </div>
          {results.map((r, i) => (
            <div key={i} style={{ padding: "10px 14px", borderBottom: i < results.length - 1 ? `1px solid ${C.border}` : "none", display: "flex", gap: 10, alignItems: "flex-start" }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: r.color, marginTop: 5, flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 10, color: C.textSoft, marginBottom: 2 }}>{r.label}</div>
                <div style={{ fontSize: 12, color: C.textMed, marginBottom: 2 }}>{r.value}</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: r.color }}>{r.interp}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Guide rapide */}
      <div style={{ background: "#fff", borderRadius: 10, border: `1px solid ${C.border}`, overflow: "hidden" }}>
        <div style={{ padding: "9px 14px", borderBottom: `1px solid ${C.border}`, background: C.slateBg }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: C.text }}>Valeurs normales de référence</span>
        </div>
        {[
          ["pH", "7,35 – 7,45"],
          ["PaCO₂", "35 – 45 mmHg"],
          ["HCO₃⁻", "22 – 26 mmol/L"],
          ["PaO₂", "80 – 100 mmHg (air ambiant)"],
          ["SpO₂", "> 94% (réa : 92–96%)"],
          ["Lactate artériel", "< 2 mmol/L"],
          ["PaO₂/FiO₂", "> 300 mmHg (normal)"],
        ].map(([param, val], i, arr) => (
          <div key={i} style={{ padding: "8px 14px", borderBottom: i < arr.length - 1 ? `1px solid ${C.border}` : "none", display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontSize: 12.5, color: C.textMed }}>{param}</span>
            <span style={{ fontSize: 12.5, fontWeight: 600, color: C.text }}>{val}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── COMPLIANCE SCREEN ──────────────────────────────────────────
const ComplianceScreen = ({ C }) => {
  const [compState, setCompState] = useState("normal");
  const [pplat, setPplat] = useState("");
  const [peep, setPeep] = useState("");
  const [vt, setVt] = useState("");

  const calc = () => {
    const pN = parseFloat(pplat), pepN = parseFloat(peep), vtN = parseFloat(vt);
    if (!pN || !pepN || !vtN) return null;
    const dp = pN - pepN;
    const crs = Math.round(vtN / dp);
    return {
      dp, crs,
      dpOk: dp <= 15, platOk: pN <= 30,
      grade: crs >= 50 ? "Compliance normale" : crs >= 30 ? "Compliance diminuée — SDRA modéré" : "Compliance très basse — SDRA sévère",
      gradeColor: crs >= 50 ? "#15803D" : crs >= 30 ? "#D97706" : "#DC2626",
    };
  };
  const res = calc();

  return (
    <div>
      <div style={{ fontSize: 12, color: C.textSoft, marginBottom: 14 }}>Calcul de la compliance du système respiratoire et de la pression motrice</div>

      {/* Diagram */}
      <div style={{ background: "#fff", borderRadius: 10, border: `1px solid ${C.border}`, padding: "12px 14px", marginBottom: 12 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: C.text, marginBottom: 10 }}>Courbe pression-volume</div>
        <div style={{ display: "flex", gap: 8, marginBottom: 10, flexWrap: "wrap" }}>
          {["normal", "sdra", "bpco"].map(s => (
            <button key={s} onClick={() => setCompState(s)} style={{ padding: "5px 10px", borderRadius: 6, border: `1.5px solid ${compState === s ? C.accent : C.border}`, background: compState === s ? C.accent + "15" : "#fff", color: compState === s ? C.accent : C.textSoft, fontSize: 11, cursor: "pointer", fontFamily: "inherit" }}>
              {s === "normal" ? "Normal" : s === "sdra" ? "SDRA" : "BPCO"}
            </button>
          ))}
        </div>
        <ComplianceDiagram compliance={compState} />
      </div>

      {/* Calculator */}
      <div style={{ background: "#fff", borderRadius: 10, border: `1px solid ${C.border}`, overflow: "hidden", marginBottom: 12 }}>
        <div style={{ padding: "9px 14px", borderBottom: `1px solid ${C.border}`, background: C.slateBg }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: C.text }}>Calculateur compliance et pression motrice</span>
        </div>
        <div style={{ padding: "12px 14px", display: "flex", flexDirection: "column", gap: 10 }}>
          {[
            { label: "Pression plateau (Pplat) en cmH₂O", placeholder: "ex: 24", val: pplat, set: setPplat },
            { label: "PEP totale (externe) en cmH₂O", placeholder: "ex: 8", val: peep, set: setPeep },
            { label: "Volume courant (Vt) en mL", placeholder: "ex: 420", val: vt, set: setVt },
          ].map((f, i) => (
            <div key={i}>
              <div style={{ fontSize: 11, color: C.textSoft, marginBottom: 5 }}>{f.label}</div>
              <input type="number" value={f.val} onChange={e => f.set(e.target.value)} placeholder={f.placeholder} style={{ width: "100%", border: `1.5px solid ${C.border}`, borderRadius: 8, padding: "8px 12px", fontSize: 14, color: C.text, outline: "none", boxSizing: "border-box", fontFamily: "inherit" }} />
            </div>
          ))}
        </div>
        {res && (
          <div style={{ padding: "12px 14px", borderTop: `1px solid ${C.border}`, background: res.dpOk && res.platOk ? "#F0FDF4" : "#FEF2F2" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 10 }}>
              <div style={{ background: "#fff", borderRadius: 8, padding: "10px", border: `1px solid ${res.platOk ? "#BBF7D0" : "#FECACA"}` }}>
                <div style={{ fontSize: 9, color: C.textSoft }}>Pression motrice (ΔP)</div>
                <div style={{ fontSize: 22, fontWeight: 900, color: res.dpOk ? "#15803D" : "#DC2626", fontFamily: "monospace" }}>{res.dp}</div>
                <div style={{ fontSize: 9, color: res.dpOk ? "#15803D" : "#DC2626" }}>{res.dpOk ? "✓ ≤ 15 cmH₂O" : "⚠ > 15 cmH₂O"}</div>
              </div>
              <div style={{ background: "#fff", borderRadius: 8, padding: "10px", border: `1px solid ${C.border}` }}>
                <div style={{ fontSize: 9, color: C.textSoft }}>Compliance (Crs)</div>
                <div style={{ fontSize: 22, fontWeight: 900, color: res.gradeColor, fontFamily: "monospace" }}>{res.crs}</div>
                <div style={{ fontSize: 9, color: C.textSoft }}>mL/cmH₂O</div>
              </div>
            </div>
            <div style={{ fontSize: 12, fontWeight: 700, color: res.gradeColor }}>{res.grade}</div>
            {!res.dpOk && <div style={{ fontSize: 11, color: "#DC2626", marginTop: 4 }}>{"→ Réduire le volume courant pour abaisser la pression motrice"}</div>}
            {!res.platOk && <div style={{ fontSize: 11, color: "#DC2626", marginTop: 4 }}>{"→ Pression plateau > 30 cmH₂O : risque de lésions pulmonaires induites"}</div>}
          </div>
        )}
      </div>
    </div>
  );
};

// ─── VENTILATION MAIN SCREEN ────────────────────────────────────
const VentilationScreen = ({ C }) => {
  const [subview, setSubview] = useState("menu"); // menu | pathology | modes | alarmes | gas | compliance
  const [selectedPath, setSelectedPath] = useState(null);

  if (subview === "pathology" && selectedPath) {
    return (
      <div>
        <button onClick={() => setSubview("menu")} style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", cursor: "pointer", color: C.accent, fontSize: 13, marginBottom: 14, padding: 0 }}>
          ← Ventilation mécanique
        </button>
        <VentCalculator pathId={selectedPath} onBack={() => setSubview("menu")} C={C} />
      </div>
    );
  }

  if (subview === "alarmes") return (
    <div>
      <button onClick={() => setSubview("menu")} style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", cursor: "pointer", color: C.accent, fontSize: 13, marginBottom: 14, padding: 0 }}>← Ventilation mécanique</button>
      <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>Alarmes du Respirateur</div>
      <AlarmesScreen C={C} />
    </div>
  );

  if (subview === "gas") return (
    <div>
      <button onClick={() => setSubview("menu")} style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", cursor: "pointer", color: C.accent, fontSize: 13, marginBottom: 14, padding: 0 }}>← Ventilation mécanique</button>
      <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>Gaz du Sang — Interprétation</div>
      <GasScreen C={C} />
    </div>
  );

  if (subview === "compliance") return (
    <div>
      <button onClick={() => setSubview("menu")} style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", cursor: "pointer", color: C.accent, fontSize: 13, marginBottom: 14, padding: 0 }}>← Ventilation mécanique</button>
      <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>Compliance & Pression Motrice</div>
      <ComplianceScreen C={C} />
    </div>
  );

  if (subview === "modes") return (
    <div>
      <button onClick={() => setSubview("menu")} style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", cursor: "pointer", color: C.accent, fontSize: 13, marginBottom: 14, padding: 0 }}>← Ventilation mécanique</button>
      <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 14 }}>Modes Ventilatoires</div>
      {VENT_MODES.map((m, i) => (
        <div key={m.id} style={{ background: "#fff", borderRadius: 10, border: `1px solid ${C.border}`, marginBottom: 10, overflow: "hidden" }}>
          <div style={{ padding: "11px 14px", borderBottom: `1px solid ${C.border}`, background: C.slateBg }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: C.text }}>{m.name}</div>
            <div style={{ fontSize: 10, color: C.textSoft, marginTop: 2 }}>{m.short}</div>
          </div>
          <div style={{ padding: "10px 14px" }}>
            <div style={{ fontSize: 12.5, color: C.textMed, lineHeight: 1.6, marginBottom: 10 }}>{m.description}</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, marginBottom: 10 }}>
              <div style={{ background: "#F0FDF4", borderRadius: 7, padding: "8px 10px" }}>
                <div style={{ fontSize: 9, fontWeight: 700, color: "#15803D", textTransform: "uppercase", marginBottom: 5 }}>Avantages</div>
                {m.avantages.map((a, ai) => <div key={ai} style={{ fontSize: 11, color: "#166534", lineHeight: 1.5 }}>✓ {a}</div>)}
              </div>
              <div style={{ background: "#FEF2F2", borderRadius: 7, padding: "8px 10px" }}>
                <div style={{ fontSize: 9, fontWeight: 700, color: "#DC2626", textTransform: "uppercase", marginBottom: 5 }}>Limites</div>
                {m.inconvenients.map((a, ai) => <div key={ai} style={{ fontSize: 11, color: "#991B1B", lineHeight: 1.5 }}>• {a}</div>)}
              </div>
            </div>
            <div style={{ fontSize: 10, fontWeight: 700, color: C.textSoft, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 5 }}>Paramètres clés</div>
            {m.parametres.map((p, pi) => (
              <div key={pi} style={{ padding: "6px 0", borderBottom: pi < m.parametres.length - 1 ? `1px solid ${C.border}` : "none" }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: C.text }}>{p.name}</div>
                <div style={{ fontSize: 11, color: C.blue }}>Cible : {p.cible}</div>
                <div style={{ fontSize: 11, color: C.orange }}>⚠ {p.alerte}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  // MENU PRINCIPAL VENTILATION
  return (
    <div>
      <div style={{ background: "linear-gradient(135deg, #1D4ED8 0%, #1E40AF 100%)", borderRadius: 12, padding: "16px", marginBottom: 16, color: "#fff" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
          <span style={{ fontSize: 24 }}>🫁</span>
          <div>
            <div style={{ fontSize: 16, fontWeight: 800 }}>Ventilation Mécanique</div>
            <div style={{ fontSize: 10, opacity: 0.8, letterSpacing: "0.06em" }}>RÉGLAGES · MONITORING · INTERPRÉTATION</div>
          </div>
        </div>
        <div style={{ fontSize: 12, opacity: 0.9, lineHeight: 1.6 }}>
          Calculateurs de réglages par pathologie, courbes ventilatoires, interprétation gaz du sang et alarmes.
        </div>
      </div>

      {/* Par pathologie */}
      <div style={{ fontSize: 11, fontWeight: 700, color: C.textXsoft, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 10 }}>
        Réglages par pathologie
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 16 }}>
        {VENT_PATHOLOGIES.map(p => (
          <button key={p.id} onClick={() => { setSelectedPath(p.id); setSubview("pathology"); }} style={{ background: "#fff", border: `1px solid ${C.border}`, borderTop: `3px solid ${p.color}`, borderRadius: 10, padding: "12px 10px", cursor: "pointer", textAlign: "left" }}>
            <div style={{ fontSize: 20, marginBottom: 6 }}>{p.icon}</div>
            <div style={{ fontSize: 11, fontWeight: 700, color: C.text, lineHeight: 1.3 }}>{p.name}</div>
            <div style={{ fontSize: 9, color: C.textSoft, marginTop: 3, lineHeight: 1.3 }}>{p.strategy.split("—")[0].trim()}</div>
          </button>
        ))}
      </div>

      {/* Outils */}
      <div style={{ fontSize: 11, fontWeight: 700, color: C.textXsoft, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 10 }}>
        Outils cliniques
      </div>
      <div style={{ background: "#fff", borderRadius: 12, border: `1px solid ${C.border}`, overflow: "hidden", marginBottom: 14 }}>
        {[
          { id: "gas", icon: "🧪", title: "Gaz du Sang — Interprétation guidée", desc: "pH, PaCO₂, HCO₃⁻, rapport PaO₂/FiO₂" },
          { id: "compliance", icon: "📊", title: "Compliance & Pression Motrice", desc: "Calcul ΔP, Crs, courbe pression-volume" },
          { id: "alarmes", icon: "🚨", title: "Alarmes du Respirateur", desc: "Causes et conduite à tenir" },
          { id: "modes", icon: "⚙️", title: "Modes Ventilatoires", desc: "VAC, VSAI, BiPAP — avantages et paramètres" },
        ].map((item, i, arr) => (
          <button key={item.id} onClick={() => setSubview(item.id)} style={{ width: "100%", background: "none", border: "none", borderBottom: i < arr.length - 1 ? `1px solid ${C.border}` : "none", padding: "13px 14px", cursor: "pointer", textAlign: "left", display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: "#EFF6FF", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>
              {item.icon}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{item.title}</div>
              <div style={{ fontSize: 11, color: C.textSoft, marginTop: 2 }}>{item.desc}</div>
            </div>
            <span style={{ color: C.textXsoft, fontSize: 16 }}>›</span>
          </button>
        ))}
      </div>
    </div>
  );
};

const AboutScreen = ({ C }) => {
  return (
    <div>
      {/* Header */}
      <div style={{ background: "linear-gradient(135deg, #1D4ED8 0%, #1E3A8A 100%)", borderRadius: 14, padding: "20px", marginBottom: 16, color: "#fff" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
          <div style={{ width: 44, height: 44, borderRadius: 11, background: "rgba(255,255,255,0.18)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>🏥</div>
          <div>
            <div style={{ fontSize: 20, fontWeight: 900, letterSpacing: "-0.02em" }}>RéaGuard</div>
            <div style={{ fontSize: 10, opacity: 0.85, letterSpacing: "0.08em" }}>OUTIL PÉDAGOGIQUE DE RÉANIMATION</div>
          </div>
        </div>
        <div style={{ fontSize: 12.5, opacity: 0.92, lineHeight: 1.6 }}>
          Aide-mémoire clinique destiné à la formation des internes, résidents, étudiants en médecine et personnels paramédicaux de réanimation et de médecine intensive.
        </div>
      </div>

      {/* Positionnement */}
      <div style={{ background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: 12, padding: "14px 16px", marginBottom: 14 }}>
        <div style={{ fontSize: 13, fontWeight: 800, color: "#DC2626", marginBottom: 8, display: "flex", alignItems: "center", gap: 6 }}>
          <span>⚠️</span> Statut et avertissement
        </div>
        <div style={{ fontSize: 12, color: "#991B1B", lineHeight: 1.7 }}>
          <strong>RéaGuard est un outil pédagogique et universitaire.</strong> Il ne constitue PAS un dispositif médical ni un outil d'aide à la décision médicale au sens réglementaire. Les informations fournies sont des aide-mémoire de formation. <strong>Le jugement clinique du médecin prime sur tout protocole.</strong> La responsabilité de toute décision diagnostique ou thérapeutique incombe au praticien, qui doit se référer aux recommandations officielles en vigueur et aux protocoles locaux de son établissement.
        </div>
      </div>

      {/* Méthodologie */}
      <div style={{ background: "#fff", borderRadius: 12, border: `1px solid ${C.border}`, overflow: "hidden", marginBottom: 14 }}>
        <div style={{ padding: "11px 14px", borderBottom: `1px solid ${C.border}`, background: C.slateBg }}>
          <span style={{ fontSize: 12, fontWeight: 800, color: C.text }}>📚 Méthodologie et sources</span>
        </div>
        <div style={{ padding: "12px 14px" }}>
          {[
            "Chaque protocole est sourcé à partir des recommandations des sociétés savantes françaises (SFAR, SRLF, SPILF, SFMU, HAS) et internationales (ESC, IDSA, KDIGO, Surviving Sepsis Campaign).",
            "Les niveaux de preuve suivent la méthodologie GRADE (1A à 2C, GPS pour les bonnes pratiques).",
            "Priorité donnée aux sources publiées depuis 2020. La date et la référence de chaque recommandation sont affichées en bas de chaque protocole.",
            "Les calculateurs de doses sont fournis à titre indicatif et doivent toujours être recoupés avec le Vidal et la fonction rénale du patient.",
          ].map((t, i) => (
            <div key={i} style={{ display: "flex", gap: 9, marginBottom: 9 }}>
              <div style={{ width: 5, height: 5, borderRadius: "50%", background: C.accent, marginTop: 7, flexShrink: 0 }} />
              <div style={{ fontSize: 12, color: C.textMed, lineHeight: 1.6 }}>{t}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Contenu */}
      <div style={{ background: "#fff", borderRadius: 12, border: `1px solid ${C.border}`, overflow: "hidden", marginBottom: 14 }}>
        <div style={{ padding: "11px 14px", borderBottom: `1px solid ${C.border}`, background: C.slateBg }}>
          <span style={{ fontSize: 12, fontWeight: 800, color: C.text }}>🗂 Contenu de l'application</span>
        </div>
        <div style={{ padding: "12px 14px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {[
            { n: SPECS.reduce((a, s) => a + (s.protos ? s.protos.length : 0), 0), l: "Protocoles cliniques" },
            { n: SPECS.length, l: "Spécialités" },
            { n: "6", l: "Modules interactifs" },
            { n: SCORES.length, l: "Scores & calculateurs" },
          ].map((x, i) => (
            <div key={i} style={{ background: C.bg, borderRadius: 9, padding: "10px 12px", textAlign: "center" }}>
              <div style={{ fontSize: 22, fontWeight: 900, color: C.accent, fontFamily: "monospace" }}>{x.n}</div>
              <div style={{ fontSize: 10, color: C.textSoft, marginTop: 2 }}>{x.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Comité scientifique - placeholder */}
      <div style={{ background: "#fff", borderRadius: 12, border: `1px solid ${C.border}`, overflow: "hidden", marginBottom: 14 }}>
        <div style={{ padding: "11px 14px", borderBottom: `1px solid ${C.border}`, background: C.slateBg }}>
          <span style={{ fontSize: 12, fontWeight: 800, color: C.text }}>🎓 Validation scientifique</span>
        </div>
        <div style={{ padding: "12px 14px" }}>
          <div style={{ fontSize: 12, color: C.textMed, lineHeight: 1.7 }}>
            Le contenu de cette application est en cours de relecture par un comité scientifique de médecins seniors en médecine intensive et réanimation. Les noms et qualités des validateurs seront affichés ici à l'issue du processus de validation.
          </div>
          <div style={{ marginTop: 10, padding: "8px 12px", background: "#FFFBEB", border: "1px solid #FDE68A", borderRadius: 8 }}>
            <div style={{ fontSize: 11, color: "#92400E", lineHeight: 1.6 }}>
              <strong>Version en cours de validation pédagogique.</strong> Destinée à la relecture par les responsables de l'enseignement de la spécialité.
            </div>
          </div>
        </div>
      </div>

      {/* Auteur */}
      <div style={{ background: "#fff", borderRadius: 12, border: `1px solid ${C.border}`, padding: "14px 16px", marginBottom: 14 }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: C.textXsoft, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 6 }}>Auteur</div>
        <div style={{ fontSize: 14, fontWeight: 800, color: C.text }}>Yanis DJELAILIA</div>
        <div style={{ fontSize: 12, color: C.textSoft, marginTop: 2 }}>Interne en médecine</div>
      </div>

      <div style={{ fontSize: 10, color: C.textXsoft, textAlign: "center", lineHeight: 1.6, padding: "0 8px 8px" }}>
        RéaGuard v8 · Outil pédagogique · Ne remplace pas le jugement clinique<br />
        Conforme à un usage de formation — non destiné à un usage diagnostique direct
      </div>
    </div>
  );
};


// ═══════════════════════════════════════════════════════════════
// ÉCRAN SCORES — onglet dédié
// ═══════════════════════════════════════════════════════════════
const ScoresScreen = ({ C }) => {
  const [selected, setSelected] = useState(null);
  const [vals, setVals] = useState({});
  const [query, setQuery] = useState("");

  const levelColor = (level) => level === "ok" ? C.green : level === "warn" ? C.orange : C.red;
  const levelBg = (level) => level === "ok" ? C.greenBg : level === "warn" ? C.orangeBg : C.redBg;

  const cats = [...new Set(SCORES.map(s => s.cat))];

  if (selected) {
    const sc = SCORES.find(s => s.id === selected);
    // Compute result
    let total = 0;
    let computed = null;
    if (sc.compute) {
      computed = sc.compute(vals);
      total = computed;
    } else {
      total = sc.fields.reduce((a, f) => {
        const v = vals[f.id];
        return a + (typeof v === "number" ? v : 0);
      }, 0);
    }
    const allAnswered = sc.compute
      ? sc.fields.every(f => vals[f.id] !== undefined && vals[f.id] !== "")
      : sc.fields.every(f => vals[f.id] !== undefined);
    const result = allAnswered ? sc.interp(total, vals) : null;

    return (
      <div>
        <button onClick={() => { setSelected(null); setVals({}); }} style={{ display:"flex", alignItems:"center", gap:6, background:"none", border:"none", cursor:"pointer", color:C.accent, fontSize:13, marginBottom:14, padding:0 }}>
          ← Tous les scores
        </button>
        <div style={{ marginBottom:6 }}>
          <div style={{ fontSize:17, fontWeight:800, color:C.text }}>{sc.name}</div>
          <div style={{ fontSize:11, color:C.textSoft, marginTop:2 }}>{sc.cat} · {sc.short}</div>
        </div>

        {/* Fields */}
        <div style={{ display:"flex", flexDirection:"column", gap:10, marginTop:14, marginBottom:14 }}>
          {sc.fields.map(f => (
            <div key={f.id} style={{ background:"#fff", borderRadius:10, border:`1px solid ${C.border}`, padding:"11px 13px" }}>
              <div style={{ fontSize:12, fontWeight:600, color:C.text, marginBottom:8, lineHeight:1.4 }}>{f.label}</div>
              {f.type === "number" ? (
                <input type="number" step="any" value={vals[f.id] || ""} onChange={e => setVals(p => ({ ...p, [f.id]: e.target.value }))} placeholder={f.placeholder} style={{ width:"100%", border:`1.5px solid ${C.border}`, borderRadius:8, padding:"9px 12px", fontSize:15, color:C.text, outline:"none", fontFamily:"inherit", boxSizing:"border-box" }} />
              ) : (
                <div style={{ display:"flex", flexDirection:"column", gap:5 }}>
                  {f.opts.map((opt, oi) => (
                    <button key={oi} onClick={() => setVals(p => ({ ...p, [f.id]: opt[1] }))} style={{ padding:"8px 11px", background: vals[f.id] === opt[1] ? C.accent+"12" : "#fff", border:`1.5px solid ${vals[f.id] === opt[1] ? C.accent : C.border}`, borderRadius:7, cursor:"pointer", textAlign:"left", display:"flex", justifyContent:"space-between", alignItems:"center", gap:8, fontFamily:"inherit" }}>
                      <span style={{ fontSize:12, color: vals[f.id] === opt[1] ? C.accent : C.textMed, fontWeight: vals[f.id] === opt[1] ? 600 : 400, lineHeight:1.35 }}>{opt[0]}</span>
                      <span style={{ fontSize:11, fontWeight:800, color: vals[f.id] === opt[1] ? C.accent : C.textXsoft, flexShrink:0 }}>{opt[1] > 0 ? "+"+opt[1] : opt[1]}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Result */}
        {result && (
          <div style={{ background: levelBg(result.level), border:`2px solid ${levelColor(result.level)}`, borderRadius:12, padding:"16px", marginBottom:14, position:"sticky", bottom:80 }}>
            {!sc.compute && typeof total === "number" && (
              <div style={{ fontSize:34, fontWeight:900, color:levelColor(result.level), fontFamily:"monospace", lineHeight:1, marginBottom:6 }}>{total}</div>
            )}
            {sc.compute && (
              <div style={{ fontSize:34, fontWeight:900, color:levelColor(result.level), fontFamily:"monospace", lineHeight:1, marginBottom:6 }}>{computed}</div>
            )}
            <div style={{ fontSize:13, fontWeight:700, color:levelColor(result.level), lineHeight:1.5 }}>{result.text}</div>
          </div>
        )}
        {!result && (
          <div style={{ background:C.slateBg, borderRadius:10, padding:"12px 14px", marginBottom:14, textAlign:"center" }}>
            <span style={{ fontSize:12, color:C.textSoft }}>Complétez tous les items pour obtenir le résultat</span>
          </div>
        )}

        {/* Note + Source */}
        <div style={{ background:C.blueBg, border:`1px solid ${C.blueBorder}`, borderRadius:10, padding:"11px 14px", marginBottom:10 }}>
          <div style={{ fontSize:11.5, color:"#1E40AF", lineHeight:1.6 }}>💡 {sc.note}</div>
        </div>
        <div style={{ background:"#fff", borderRadius:8, border:`1px solid ${C.border}`, padding:"8px 12px" }}>
          <div style={{ fontSize:9, fontWeight:700, color:C.textXsoft, textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:3 }}>Source</div>
          <div style={{ fontSize:11, color:C.textSoft }}>{sc.source}</div>
        </div>
      </div>
    );
  }

  // List view
  const filtered = query.length > 1
    ? SCORES.filter(s => s.name.toLowerCase().includes(query.toLowerCase()) || s.short.toLowerCase().includes(query.toLowerCase()) || s.cat.toLowerCase().includes(query.toLowerCase()))
    : SCORES;

  return (
    <div>
      {/* Header */}
      <div style={{ background:"linear-gradient(135deg, #3730A3 0%, #1E1B4B 100%)", borderRadius:12, padding:"16px", marginBottom:14, color:"#fff" }}>
        <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:6 }}>
          <span style={{ fontSize:24 }}>🧮</span>
          <div>
            <div style={{ fontSize:16, fontWeight:800 }}>Scores & Calculateurs</div>
            <div style={{ fontSize:10, opacity:0.85, letterSpacing:"0.06em" }}>{SCORES.length} SCORES DE RÉANIMATION</div>
          </div>
        </div>
        <div style={{ fontSize:11.5, opacity:0.9, lineHeight:1.6 }}>
          Calcul interactif avec interprétation immédiate. Gravité, neurologie, respiratoire, cardiologie, hépatique, rénal.
        </div>
      </div>

      <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Rechercher un score…" style={{ width:"100%", border:`1.5px solid ${C.border}`, borderRadius:9, padding:"10px 13px", fontSize:14, color:C.text, outline:"none", fontFamily:"inherit", background:"#fff", boxSizing:"border-box", marginBottom:16 }} />

      {query.length > 1 ? (
        <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
          {filtered.map(s => (
            <button key={s.id} onClick={() => { setSelected(s.id); setVals({}); }} style={{ background:"#fff", border:`1px solid ${C.border}`, borderRadius:10, padding:"12px 14px", cursor:"pointer", textAlign:"left", display:"flex", alignItems:"center", gap:10 }}>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:13, fontWeight:700, color:C.text }}>{s.name}</div>
                <div style={{ fontSize:10.5, color:C.textSoft, marginTop:2 }}>{s.cat} · {s.short}</div>
              </div>
              <span style={{ color:C.textXsoft, fontSize:16 }}>›</span>
            </button>
          ))}
          {filtered.length === 0 && <div style={{ textAlign:"center", color:C.textSoft, fontSize:12, padding:20 }}>Aucun score trouvé</div>}
        </div>
      ) : (
        cats.map(cat => (
          <div key={cat} style={{ marginBottom:18 }}>
            <div style={{ fontSize:11, fontWeight:700, color:C.textSoft, textTransform:"uppercase", letterSpacing:"0.07em", marginBottom:8 }}>{cat}</div>
            <div style={{ background:"#fff", borderRadius:10, border:`1px solid ${C.border}`, overflow:"hidden" }}>
              {SCORES.filter(s => s.cat === cat).map((s, i, arr) => (
                <button key={s.id} onClick={() => { setSelected(s.id); setVals({}); }} style={{ width:"100%", background:"none", border:"none", borderBottom: i < arr.length-1 ? `1px solid ${C.border}` : "none", padding:"12px 14px", cursor:"pointer", textAlign:"left", display:"flex", alignItems:"center", justifyContent:"space-between", gap:8 }}>
                  <div style={{ flex:1 }}>
                    <div style={{ fontSize:13, fontWeight:700, color:C.text }}>{s.name}</div>
                    <div style={{ fontSize:10.5, color:C.textSoft, marginTop:1 }}>{s.short}</div>
                  </div>
                  <span style={{ color:C.textXsoft, fontSize:16, flexShrink:0 }}>›</span>
                </button>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};


// ═══════════════════════════════════════════════════════════════
// MODULE EEG EN RÉANIMATION — RéaGuard
// Générateur de tracés SVG + patterns + indications
// ═══════════════════════════════════════════════════════════════

// ─── GÉNÉRATEUR DE TRACÉ EEG SVG ───────────────────────────────
// Génère un tracé multi-dérivations selon une fonction de signal paramétrée
const EegTracing = ({ pattern = "normal", height = 150, channels = 4, label }) => {
  const W = 320, padL = 28, padR = 8;
  const gW = W - padL - padR;
  const chH = (height - 20) / channels;
  const samples = 240;

  // Pseudo-random déterministe (seed) pour un rendu stable
  const rng = (seed) => {
    let s = seed * 9301 + 49297;
    return () => { s = (s * 9301 + 49297) % 233280; return s / 233280; };
  };

  // Fonctions de signal par pattern — amplitude normalisée [-1, 1]
  const signalFns = {
    // Tracé normal de veille : rythme alpha postérieur ~10 Hz, basse amplitude
    normal: (t, r, ch) => {
      const alpha = Math.sin(t * 10 * 2 * Math.PI) * (ch >= channels - 2 ? 0.5 : 0.25);
      const beta = Math.sin(t * 20 * 2 * Math.PI) * 0.12;
      return alpha + beta + (r() - 0.5) * 0.18;
    },
    // Ralentissement diffus : ondes thêta/delta, encéphalopathie
    slowing: (t, r) => {
      const delta = Math.sin(t * 2.5 * 2 * Math.PI) * 0.7;
      const theta = Math.sin(t * 5 * 2 * Math.PI) * 0.25;
      return delta + theta + (r() - 0.5) * 0.12;
    },
    // Burst-suppression : bouffées d'activité sur fond suppressif
    burst: (t, r) => {
      const cycle = t % 0.55;
      const inBurst = cycle < 0.18;
      if (inBurst) {
        const env = Math.sin((cycle / 0.18) * Math.PI);
        return env * (Math.sin(t * 14 * 2 * Math.PI) * 0.7 + Math.sin(t * 7 * 2 * Math.PI) * 0.4 + (r() - 0.5) * 0.3);
      }
      return (r() - 0.5) * 0.05; // fond suppressif quasi-plat
    },
    // Silence électrique / tracé nul : mort encéphalique
    flat: (t, r) => (r() - 0.5) * 0.04,
    // Pointes-ondes rythmiques : état de mal / crise
    spikewave: (t, r) => {
      const cycle = t % 0.32; // ~3 Hz
      if (cycle < 0.04) return 0.9 - (cycle / 0.04) * 1.7; // pointe rapide
      const slow = -Math.sin(((cycle - 0.04) / 0.28) * Math.PI) * 0.55; // onde lente
      return slow + (r() - 0.5) * 0.06;
    },
    // Décharges périodiques (PDs type LPD/GPD)
    periodic: (t, r) => {
      const cycle = t % 0.85; // ~1.2 Hz, périodique
      if (cycle < 0.05) {
        const sharp = Math.sin((cycle / 0.05) * Math.PI);
        return sharp * 0.85;
      }
      return (r() - 0.5) * 0.08;
    },
    // Ondes triphasiques : encéphalopathie métabolique (hépatique)
    triphasic: (t, r) => {
      const cycle = t % 0.6; // ~1.7 Hz
      if (cycle < 0.18) {
        const p = cycle / 0.18;
        // 3 phases : petite négative, grande positive, négative lente
        if (p < 0.2) return -0.25 * Math.sin((p / 0.2) * Math.PI);
        if (p < 0.5) return 0.85 * Math.sin(((p - 0.2) / 0.3) * Math.PI);
        return -0.45 * Math.sin(((p - 0.5) / 0.5) * Math.PI);
      }
      return (r() - 0.5) * 0.06;
    },
    // Extreme delta brush : anti-NMDA (delta lent + bouffées beta surajoutées)
    deltabrush: (t, r) => {
      const delta = Math.sin(t * 1.5 * 2 * Math.PI) * 0.7;
      const onDelta = Math.sin(t * 1.5 * 2 * Math.PI) > 0.3;
      const brush = onDelta ? Math.sin(t * 22 * 2 * Math.PI) * 0.28 : 0;
      return delta + brush + (r() - 0.5) * 0.08;
    },
    // Tracé de sédation profonde (similaire au ralentissement marqué, plus régulier)
    sedation: (t, r) => {
      const delta = Math.sin(t * 1.8 * 2 * Math.PI) * 0.6;
      return delta + (r() - 0.5) * 0.1;
    },
  };

  const fn = signalFns[pattern] || signalFns.normal;

  const buildPath = (chIndex) => {
    const r = rng((chIndex + 1) * 137 + (pattern.length * 13));
    const midY = 10 + chIndex * chH + chH / 2;
    const amp = chH * 0.42;
    let d = "";
    for (let i = 0; i <= samples; i++) {
      const t = (i / samples) * 4; // 4 secondes simulées
      const x = padL + (i / samples) * gW;
      const y = midY - fn(t, r, chIndex) * amp;
      d += (i === 0 ? "M" : "L") + x.toFixed(1) + "," + y.toFixed(1) + " ";
    }
    return d;
  };

  const chLabels = ["Fp-F", "F-C", "C-P", "P-O"];

  return (
    <svg width="100%" viewBox={`0 0 ${W} ${height}`} style={{ maxWidth: 360, display: "block", background: "#FdFdFf", borderRadius: 8 }}>
      <rect width={W} height={height} fill="#FCFCFE" rx="8" />
      {/* Grille temporelle (1 carreau = 1 s) */}
      {[0, 1, 2, 3, 4].map(s => {
        const x = padL + (s / 4) * gW;
        return <line key={s} x1={x} y1={6} x2={x} y2={height - 8} stroke="#EEF1F6" strokeWidth="0.7" />;
      })}
      {/* Dérivations */}
      {Array.from({ length: channels }).map((_, ci) => (
        <g key={ci}>
          <text x={4} y={10 + ci * chH + chH / 2 + 3} fontSize="6.5" fill="#94A3B8" fontFamily="monospace">{chLabels[ci % 4]}</text>
          <path d={buildPath(ci)} fill="none" stroke="#1E293B" strokeWidth="0.9" strokeLinejoin="round" strokeLinecap="round" />
        </g>
      ))}
      {/* Échelle */}
      <text x={padL} y={height - 1} fontSize="6" fill="#CBD5E1" fontFamily="monospace">1 s/carreau</text>
      {label && <text x={W - padR} y={height - 1} fontSize="6.5" fill="#94A3B8" textAnchor="end" fontStyle="italic">schématique</text>}
    </svg>
  );
};

// ─── DONNÉES PATTERNS EEG ──────────────────────────────────────
const EEG_PATTERNS = [
  {
    id: "normal", nom: "Tracé normal de veille", pattern: "normal", color: "#15803D",
    desc: "Rythme alpha postérieur (8–12 Hz) réactif, bien organisé, avec gradient antéro-postérieur normal.",
    contexte: "Sujet éveillé, yeux fermés. Sert de référence pour reconnaître les anomalies.",
    points: [
      "Rythme alpha dominant en région occipitale, bloqué à l'ouverture des yeux (réactivité)",
      "Gradient antéro-postérieur présent (fréquences plus rapides en avant)",
      "Symétrie entre les deux hémisphères",
    ],
    signif: "Normal — pas de souffrance cérébrale diffuse.", signifLevel: "ok",
  },
  {
    id: "slowing", nom: "Ralentissement diffus", pattern: "slowing", color: "#D97706",
    desc: "Activité lente diffuse (ondes thêta 4–7 Hz puis delta < 4 Hz) remplaçant le rythme de fond normal.",
    contexte: "Encéphalopathie diffuse : métabolique, toxique, hypoxique, infectieuse.",
    points: [
      "Disparition du rythme alpha au profit d'ondes lentes",
      "Le degré de ralentissement est corrélé à la profondeur de l'encéphalopathie",
      "Souvent réactif aux stimulations (élément de bon pronostic relatif)",
    ],
    signif: "Souffrance cérébrale diffuse non spécifique — chercher la cause (iono, ammoniémie, toxiques, hypoxie).", signifLevel: "warn",
  },
  {
    id: "spikewave", nom: "Pointes-ondes / Activité critique", pattern: "spikewave", color: "#DC2626",
    desc: "Décharges de pointes-ondes rythmiques évoluant dans le temps et l'espace : marqueur d'activité épileptique.",
    contexte: "État de mal épileptique, en particulier non convulsivant (à suspecter devant tout coma inexpliqué).",
    points: [
      "Pointes ou pointes-ondes rythmiques ≥ 2,5 Hz évoluant en fréquence/amplitude/topographie",
      "L'EEG est INDISPENSABLE : l'état de mal non convulsivant n'a pas de traduction motrice",
      "Un coma persistant après une crise impose un EEG pour éliminer un état de mal infraclinique",
    ],
    signif: "État de mal épileptique probable — urgence thérapeutique (benzodiazépine puis antiépileptique).", signifLevel: "bad",
  },
  {
    id: "periodic", nom: "Décharges périodiques (PDs)", pattern: "periodic", color: "#DC2626",
    desc: "Décharges périodiques régulières (LPDs latéralisées ou GPDs généralisées) selon la terminologie ACNS 2021.",
    contexte: "Lésion cérébrale aiguë, encéphalite (HSV ++), anoxie, AVC étendu. Position sur le continuum ictal-interictal.",
    points: [
      "Décharges régulièrement périodiques sur un fond souvent suppressif",
      "LPDs (latéralisées) : fortement associées aux crises — évoquer une encéphalite herpétique",
      "GPDs (généralisées) : encéphalopathie sévère, anoxie — valeur pronostique post-arrêt cardiaque",
    ],
    signif: "Continuum ictal-interictal — discuter un test thérapeutique antiépileptique et chercher l'étiologie.", signifLevel: "bad",
  },
  {
    id: "triphasic", nom: "Ondes triphasiques", pattern: "triphasic", color: "#D97706",
    desc: "Ondes de morphologie triphasique, à prédominance frontale, périodiques (~1–2 Hz).",
    contexte: "Encéphalopathie métabolique, classiquement hépatique, mais aussi urémique ou septique.",
    points: [
      "Morphologie en trois phases caractéristique, gradient antéro-postérieur",
      "Évocatrices d'une encéphalopathie métabolique mais non spécifiques",
      "À distinguer des décharges épileptiques périodiques (parfois difficile : continuum)",
    ],
    signif: "Oriente vers une encéphalopathie métabolique — doser ammoniémie, bilan hépatique et rénal.", signifLevel: "warn",
  },
  {
    id: "burst", nom: "Burst-suppression", pattern: "burst", color: "#DC2626",
    desc: "Alternance de bouffées d'activité (≥ 0,5 s, polyphasiques) et de périodes de suppression (< 10 µV).",
    contexte: "Coma profond : anoxie sévère post-arrêt cardiaque, sédation très profonde (barbituriques), hypothermie.",
    points: [
      "Bouffées séparées par des intervalles suppressifs — définition ACNS 2021",
      "Iatrogène et réversible si sédation profonde / barbituriques (coma thérapeutique)",
      "Post-anoxique non réactif : élément de mauvais pronostic (avec les autres critères multimodaux)",
    ],
    signif: "Coma profond — distinguer une cause iatrogène (réversible) d'une cause anoxique (péjorative).", signifLevel: "bad",
  },
  {
    id: "deltabrush", nom: "Extreme delta brush", pattern: "deltabrush", color: "#6D28D9",
    desc: "Ondes delta lentes avec bouffées d'activité rapide (bêta) surimposées, en « brosse ».",
    contexte: "Évocateur de l'encéphalite à anticorps anti-récepteur NMDA (femme jeune ++).",
    points: [
      "Association d'ondes delta et d'une activité rapide rythmique surimposée",
      "Pattern assez spécifique de l'encéphalite anti-NMDA dans le contexte clinique adéquat",
      "Doit faire rechercher les anticorps anti-NMDA (sérum et LCR) et un tératome ovarien",
    ],
    signif: "Évoque une encéphalite auto-immune anti-NMDA — bilan immunologique et recherche de tumeur.", signifLevel: "warn",
  },
  {
    id: "flat", nom: "Silence électrique cérébral", pattern: "flat", color: "#991B1B",
    desc: "Absence d'activité électrique cérébrale > 2 µV sur un tracé de 30 minutes, de bonne qualité, en amplification maximale.",
    contexte: "Examen de confirmation réglementaire de la mort encéphalique en France (avec l'angiographie).",
    points: [
      "Tracé « inactif » : silence électrique défini par l'absence d'activité > 2 µV pendant 30 minutes",
      "Conditions strictes : éliminer hypothermie, sédation et troubles métaboliques (sinon angioscanner préféré)",
      "En France : 2 EEG nuls à 4 heures d'intervalle OU une angiographie cérébrale (cf protocole Mort Encéphalique)",
    ],
    signif: "Compatible avec une mort encéphalique si conditions réglementaires réunies — démarche médico-légale.", signifLevel: "bad",
  },
];

// ─── INDICATIONS DE L'EEG EN RÉANIMATION ───────────────────────
const EEG_INDICATIONS = [
  {
    nom: "État de mal épileptique non convulsivant", icon: "⚡", color: "#DC2626",
    txt: "Indication majeure. Tout coma inexpliqué ou prolongé après une crise doit faire réaliser un EEG : l'état de mal non convulsivant n'a aucune traduction motrice et ne peut être diagnostiqué autrement.",
  },
  {
    nom: "Confirmation de mort encéphalique", icon: "⚖️", color: "#991B1B",
    txt: "Examen de confirmation réglementaire en France (alternative : angiographie cérébrale). Recherche d'un silence électrique > 2 µV sur 30 minutes, après élimination des facteurs confondants.",
  },
  {
    nom: "Neuropronostication post-arrêt cardiaque", icon: "🫀", color: "#1D4ED8",
    txt: "Élément de l'approche multimodale (avec examen clinique, potentiels évoqués, NSE, imagerie). Un fond non réactif, un burst-suppression ou un état de mal post-anoxique sont des éléments de mauvais pronostic — jamais isolément.",
  },
  {
    nom: "Diagnostic d'une encéphalopathie", icon: "🌫️", color: "#D97706",
    txt: "Objective et quantifie une souffrance cérébrale diffuse (ralentissement), oriente vers une cause métabolique (ondes triphasiques) ou auto-immune (delta brush).",
  },
  {
    nom: "Monitorage de la sédation profonde", icon: "💤", color: "#6D28D9",
    txt: "Titration d'un coma thérapeutique barbiturique (HTIC réfractaire, état de mal réfractaire) : la cible est souvent un burst-suppression contrôlé.",
  },
];

// ─── ÉCRAN PATTERN EEG (détail) ────────────────────────────────
const EegPatternScreen = ({ C, pat, onBack }) => {
  const levelColor = pat.signifLevel === "ok" ? C.green : pat.signifLevel === "warn" ? C.orange : C.red;
  const levelBg = pat.signifLevel === "ok" ? C.greenBg : pat.signifLevel === "warn" ? C.orangeBg : C.redBg;
  return (
    <div>
      <button onClick={onBack} style={{ display:"flex", alignItems:"center", gap:6, background:"none", border:"none", cursor:"pointer", color:C.accent, fontSize:13, marginBottom:14, padding:0 }}>← Patterns EEG</button>
      <div style={{ fontSize:17, fontWeight:800, color:C.text, marginBottom:2 }}>{pat.nom}</div>
      <div style={{ fontSize:12, color:C.textSoft, marginBottom:14, lineHeight:1.5 }}>{pat.desc}</div>

      {/* Tracé */}
      <div style={{ background:"#fff", borderRadius:12, border:`1px solid ${C.border}`, padding:"10px", marginBottom:14 }}>
        <EegTracing pattern={pat.pattern} label />
      </div>

      {/* Contexte */}
      <div style={{ background:C.slateBg, borderRadius:10, padding:"11px 14px", marginBottom:12 }}>
        <div style={{ fontSize:10, fontWeight:700, color:C.textXsoft, textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:4 }}>Contexte clinique</div>
        <div style={{ fontSize:12.5, color:C.textMed, lineHeight:1.6 }}>{pat.contexte}</div>
      </div>

      {/* Points clés */}
      <div style={{ background:"#fff", borderRadius:10, border:`1px solid ${C.border}`, overflow:"hidden", marginBottom:12 }}>
        <div style={{ padding:"9px 14px", borderBottom:`1px solid ${C.border}`, background:C.slateBg }}>
          <span style={{ fontSize:11, fontWeight:700, color:C.text }}>Points clés de reconnaissance</span>
        </div>
        {pat.points.map((p, i) => (
          <div key={i} style={{ padding:"10px 14px", borderBottom: i < pat.points.length-1 ? `1px solid ${C.border}` : "none", display:"flex", gap:9 }}>
            <span style={{ color:pat.color, fontWeight:700, flexShrink:0 }}>•</span>
            <span style={{ fontSize:12, color:C.textMed, lineHeight:1.55 }}>{p}</span>
          </div>
        ))}
      </div>

      {/* Signification */}
      <div style={{ background:levelBg, border:`2px solid ${levelColor}`, borderRadius:10, padding:"12px 14px" }}>
        <div style={{ fontSize:10, fontWeight:700, color:levelColor, textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:4 }}>Signification clinique</div>
        <div style={{ fontSize:12.5, color:levelColor, fontWeight:600, lineHeight:1.6 }}>{pat.signif}</div>
      </div>
    </div>
  );
};

// ─── ÉCRAN PRINCIPAL EEG ───────────────────────────────────────
const EegScreen = ({ C }) => {
  const [view, setView] = useState("menu");
  const [pat, setPat] = useState(null);

  if (pat) return <EegPatternScreen C={C} pat={pat} onBack={() => setPat(null)} />;

  if (view === "indications") {
    return (
      <div>
        <button onClick={() => setView("menu")} style={{ display:"flex", alignItems:"center", gap:6, background:"none", border:"none", cursor:"pointer", color:C.accent, fontSize:13, marginBottom:14, padding:0 }}>← EEG en réanimation</button>
        <div style={{ fontSize:15, fontWeight:700, color:C.text, marginBottom:14 }}>Indications de l'EEG en réanimation</div>
        <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
          {EEG_INDICATIONS.map((ind, i) => (
            <div key={i} style={{ background:"#fff", borderRadius:10, border:`1px solid ${C.border}`, borderLeft:`3px solid ${ind.color}`, padding:"12px 14px" }}>
              <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:5 }}>
                <span style={{ fontSize:17 }}>{ind.icon}</span>
                <span style={{ fontSize:13, fontWeight:700, color:C.text }}>{ind.nom}</span>
              </div>
              <div style={{ fontSize:12, color:C.textMed, lineHeight:1.6 }}>{ind.txt}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div style={{ background:"linear-gradient(135deg, #4338CA 0%, #312E81 100%)", borderRadius:12, padding:"16px", marginBottom:16, color:"#fff" }}>
        <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:8 }}>
          <span style={{ fontSize:24 }}>📈</span>
          <div>
            <div style={{ fontSize:16, fontWeight:800 }}>EEG en Réanimation</div>
            <div style={{ fontSize:10, opacity:0.85, letterSpacing:"0.06em" }}>RECONNAISSANCE DES PATTERNS</div>
          </div>
        </div>
        <div style={{ fontSize:12, opacity:0.92, lineHeight:1.6 }}>
          Reconnaître les grands tracés EEG de réanimation : encéphalopathie, état de mal, mort encéphalique, neuropronostication.
        </div>
      </div>

      <button onClick={() => setView("indications")} style={{ width:"100%", background:"#fff", border:`1px solid ${C.border}`, borderRadius:10, padding:"13px 14px", cursor:"pointer", textAlign:"left", display:"flex", alignItems:"center", gap:10, marginBottom:16 }}>
        <span style={{ fontSize:18 }}>🎯</span>
        <div style={{ flex:1 }}>
          <div style={{ fontSize:13, fontWeight:700, color:C.text }}>Indications en réanimation</div>
          <div style={{ fontSize:10.5, color:C.textSoft, marginTop:1 }}>Quand demander un EEG</div>
        </div>
        <span style={{ color:C.textXsoft, fontSize:16 }}>›</span>
      </button>

      <div style={{ fontSize:11, fontWeight:700, color:C.textXsoft, textTransform:"uppercase", letterSpacing:"0.07em", marginBottom:10 }}>Atlas des patterns</div>
      <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
        {EEG_PATTERNS.map(p => (
          <button key={p.id} onClick={() => setPat(p)} style={{ background:"#fff", border:`1px solid ${C.border}`, borderRadius:12, padding:"10px", cursor:"pointer", textAlign:"left" }}>
            <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:8, padding:"0 4px" }}>
              <div style={{ width:8, height:8, borderRadius:"50%", background:p.color, flexShrink:0 }} />
              <span style={{ fontSize:13, fontWeight:700, color:C.text, flex:1 }}>{p.nom}</span>
              <span style={{ color:C.textXsoft, fontSize:16 }}>›</span>
            </div>
            <EegTracing pattern={p.pattern} height={90} channels={3} />
          </button>
        ))}
      </div>

      <div style={{ background:"#FFFBEB", border:"1px solid #FDE68A", borderRadius:10, padding:"11px 14px", marginTop:16 }}>
        <div style={{ fontSize:11, color:"#92400E", lineHeight:1.6 }}>
          ⚠ Les tracés présentés sont des <strong>représentations schématiques à visée pédagogique</strong>, destinées à la reconnaissance des grands patterns. Ils ne remplacent pas la lecture d'un EEG réel par un neurophysiologiste. Terminologie de référence : ACNS 2021.
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [tab, setTab] = useState("index");
  const [specId, setSpecId] = useState(null);
  const [protoIdx, setProtoIdx] = useState(null);
  const [scoreId, setScoreId] = useState(null);
  const [search, setSearch] = useState("");
  const [scoreVals, setScoreVals] = useState({});
  const searchRef = useRef(null);

  const curSpec = SPECS.find(s => s.id === specId);
  const curProto = curSpec && protoIdx !== null ? curSpec.protos[protoIdx] : null;
  const curScore = SCORES.find(s => s.id === scoreId);

  const searchResults = search.trim().length > 1
    ? SPECS.flatMap(sp => sp.protos.flatMap((p, i) => {
        const q = search.toLowerCase();
        return (p.name.toLowerCase().includes(q) || (p.aliases || []).some(a => a.toLowerCase().includes(q)))
          ? [{ sp, p, i }] : [];
      }))
    : [];

  const navReset = () => { setSpecId(null); setProtoIdx(null); setScoreId(null); setSearch(""); };
  const isDetail = specId || scoreId;

  const NAV_TABS = [
    { id: "index", label: "Protocoles", icon: "≡" },
    { id: "scores", label: "Scores", icon: "🧮" },
    { id: "ventilation", label: "Ventil.", icon: "🫁" },
    { id: "infecto", label: "Infectio", icon: "🦠" },
    { id: "hemo", label: "Hémo", icon: "💉" },
  ];

  return (
    <div style={{ background: C.bg, minHeight: "100vh", fontFamily: "-apple-system, 'Helvetica Neue', Arial, sans-serif", color: C.text, maxWidth: 520, margin: "0 auto", paddingBottom: 76 }}>

      {/* HEADER */}
      <div style={{ background: "#fff", borderBottom: `1px solid ${C.border}`, position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ display: "flex", alignItems: "center", minHeight: 54, padding: "0 16px", gap: 8 }}>
          {isDetail ? (
            <button onClick={() => { if (protoIdx !== null) setProtoIdx(null); else { setSpecId(null); setScoreId(null); } }} style={{ background: "none", border: "none", cursor: "pointer", padding: "4px 4px 4px 0", color: C.accent, display: "flex", alignItems: "center" }}>
              <SvgIcon name="back" size={22} color={C.accent} />
            </button>
          ) : tab === "search" ? (
            <button onClick={() => setTab("index")} style={{ background: "none", border: "none", cursor: "pointer", color: C.accent, fontSize: 14, padding: "4px 0" }}>Annuler</button>
          ) : null}

          <div style={{ flex: 1, minWidth: 0 }}>
            {tab === "search" ? (
              <input ref={searchRef} value={search} onChange={e => setSearch(e.target.value)} placeholder="Pathologie, signe clinique, médicament…" style={{ width: "100%", border: "none", outline: "none", fontSize: 16, color: C.text, background: "transparent" }} autoFocus />
            ) : protoIdx !== null && curProto ? (
              <div>
                <div style={{ fontSize: 10, color: curSpec.color, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em" }}>{curSpec.short}</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: C.text, lineHeight: 1.2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{curProto.name}</div>
              </div>
            ) : specId && curSpec ? (
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 28, height: 28, borderRadius: 7, background: curSpec.bgColor, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <SvgIcon name={curSpec.iconName} size={16} color={curSpec.color} />
                </div>
                <span style={{ fontSize: 15, fontWeight: 700, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{curSpec.label}</span>
              </div>
            ) : scoreId && curScore ? (
              <span style={{ fontSize: 15, fontWeight: 700 }}>{curScore.name}</span>
            ) : (
              <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                <div style={{ width: 30, height: 30, borderRadius: 8, background: C.redBg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <SvgIcon name="stethoscope" size={17} color={C.red} />
                </div>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1.1 }}>RéaGuard</div>
                  <div style={{ fontSize: 9, color: C.textXsoft, letterSpacing: "0.07em" }}>par <span style={{ color: C.accent, fontWeight: 700 }}>Y. DJELAILIA</span> · RÉANIMATION</div>
                </div>
              </div>
            )}
          </div>

          <div style={{ display: "flex", gap: 6 }}>
            <button onClick={() => { setTab("about"); navReset(); }} style={{ background: tab === "about" ? C.accent : C.bg, border: `1px solid ${tab === "about" ? C.accent : C.border}`, borderRadius: 10, padding: "6px 10px", cursor: "pointer", display: "flex", alignItems: "center", fontSize: 13, fontWeight: 800, color: tab === "about" ? "#fff" : C.textSoft }}>
              ⓘ
            </button>
            {!isDetail && tab !== "search" && (
              <button onClick={() => { setTab("search"); setSearch(""); navReset(); }} style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 10, padding: "6px 10px", cursor: "pointer", display: "flex", alignItems: "center" }}>
                <SvgIcon name="search" size={15} color={C.textSoft} />
              </button>
            )}
          </div>
        </div>
      </div>

      <div style={{ padding: "12px 14px 8px" }}>

        {/* VENTILATION TAB */}
        {tab === "ventilation" && <VentilationScreen C={C} />}

        {/* INFECTIOLOGIE TAB */}
        {tab === "infecto" && <InfectoScreen C={C} />}

        {/* SCORES TAB */}
        {tab === "scores" && <ScoresScreen C={C} />}

        {/* EEG TAB */}
        {tab === "eeg" && <EegScreen C={C} />}

        {/* À PROPOS TAB */}
        {tab === "about" && <AboutScreen C={C} />}

        {/* HÉMODYNAMIQUE TAB */}
        {tab === "hemo" && <HemodynamiqueScreen C={C} />}

        {/* HOME */}
        {tab === "index" && !isDetail && (
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: C.textXsoft, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 10 }}>
              {SPECS.length} spécialités · {SPECS.reduce((a, s) => a + s.protos.length, 0)} protocoles avec grades GRADE
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 16 }}>
              {SPECS.map(sp => {
                const miniIllus = {
                  acr: <HeartIllustration size={36} color={sp.color} />,
                  pneumo: <LungsIllustration size={36} color={sp.color} />,
                  neuro: <BrainIllustration size={36} color={sp.color} />,
                  nephro: <KidneyIllustration size={36} color={sp.color} />,
                  gastro: <LiverIllustration size={36} color={sp.color} />,
                  hemato: <BloodIllustration size={36} color={sp.color} />,
                  obst: <BabyIllustration size={36} color={sp.color} />,
                  trauma: <BoneIllustration size={36} color={sp.color} />,
                  pediatrie: <BabyIllustration size={36} color={sp.color} />,
                };
                const illus = miniIllus[sp.id];
                return (
                  <button key={sp.id} onClick={() => setSpecId(sp.id)} style={{ background: "#fff", border: `1px solid ${C.border}`, borderTop: `3px solid ${sp.color}`, borderRadius: 12, padding: "13px 12px", cursor: "pointer", textAlign: "left" }}
                    onMouseEnter={e => e.currentTarget.style.background = C.bg}
                    onMouseLeave={e => e.currentTarget.style.background = "#fff"}
                  >
                    <div style={{ width: 40, height: 40, borderRadius: 10, background: sp.bgColor, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 8, overflow: "hidden" }}>
                      {illus || <SvgIcon name={sp.iconName} size={20} color={sp.color} />}
                    </div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: C.text, lineHeight: 1.3 }}>{sp.label}</div>
                    <div style={{ fontSize: 10, color: C.textSoft, marginTop: 3 }}>{sp.protos.length} protocoles</div>
                  </button>
                );
              })}
            </div>

            <div style={{ fontSize: 11, fontWeight: 700, color: C.textXsoft, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 10 }}>
              Modules interactifs
            </div>
            <button onClick={() => { setTab("eeg"); navReset(); }} style={{ width: "100%", background: "linear-gradient(135deg, #4338CA 0%, #312E81 100%)", border: "none", borderRadius: 12, padding: "14px 16px", cursor: "pointer", textAlign: "left", display: "flex", alignItems: "center", gap: 12, marginBottom: 16, color: "#fff" }}>
              <span style={{ fontSize: 26 }}>📈</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 800 }}>EEG en Réanimation</div>
                <div style={{ fontSize: 10.5, opacity: 0.85, marginTop: 1 }}>Atlas des patterns · Indications · Mort encéphalique</div>
              </div>
              <span style={{ fontSize: 18, opacity: 0.7 }}>›</span>
            </button>

            <div style={{ fontSize: 9, color: C.textXsoft, textAlign: "center", lineHeight: 1.7 }}>
              Aide-mémoire clinique · Le jugement médical prime sur tout protocole<br />
              ERC 2025 · SSC 2026 · ESICM 2023 · ATS 2024 · HAS 2025 · ESC 2023–24<br />
              <span style={{ color: C.accent, fontWeight: 700 }}>© Yanis DJELAILIA</span> · Interne
            </div>
          </div>
        )}

        {/* SPECIALTY LIST */}
        {tab === "index" && specId && protoIdx === null && curSpec && (
          <div>
            <SpecHeaderCard spec={curSpec} C={C} />
            <div style={{ background: "#fff", borderRadius: 12, border: `1px solid ${C.border}`, overflow: "hidden" }}>
              {curSpec.protos.map((p, i) => (
                <button key={i} onClick={() => setProtoIdx(i)} style={{ width: "100%", background: "none", border: "none", borderBottom: i < curSpec.protos.length - 1 ? `1px solid ${C.border}` : "none", padding: "14px", cursor: "pointer", textAlign: "left" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 6 }}>
                    <UrgBadge tag={p.urgence} />
                    {p.isNew && <NewBadge />}
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: C.text, lineHeight: 1.35 }}>{p.name}</div>
                  <div style={{ fontSize: 11, color: C.textSoft, marginTop: 4 }}>{p.sections.reduce((a, s) => a + (s.items || []).length, 0)} recommandations</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* PROTOCOL DETAIL */}
        {tab === "index" && curProto && curSpec && (
          <div>
            <div style={{ display: "flex", gap: 7, alignItems: "center", marginBottom: 12 }}>
              <UrgBadge tag={curProto.urgence} />
              {curProto.isNew && <NewBadge />}
            </div>

            {/* ECG pathologique uniquement si hyperkaliémie */}
            {curSpec.id === "meta" && curProto.name.includes("Hyperkaliémie") && (
              <div style={{ background: "#fff", borderRadius: 10, border: `1px solid ${C.border}`, padding: "10px 14px", marginBottom: 12 }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: C.orange, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>
                  ECG — Signes d'hyperkaliémie sévère
                </div>
                <ECGIllustration color={C.orange} pathologic={true} />
                <div style={{ fontSize: 10, color: C.textSoft, marginTop: 6, lineHeight: 1.5 }}>
                  Ondes T pointues symétriques → élargissement QRS → rythme sinusoïdal → ACR
                </div>
              </div>
            )}

            {/* Illustration larynx si ISR */}
            {curProto.name.includes("Séquence Rapide") && (
              <div style={{ background: "#fff", borderRadius: 10, border: `1px solid ${C.border}`, padding: "12px 14px", marginBottom: 12 }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: C.textSoft, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 10 }}>Anatomie des voies aériennes</div>
                <LarynxDiagram C={C} />
              </div>
            )}

            {/* Schéma hémodynamique si choc */}
            {curProto.name.includes("Choc Septique") && (
              <div style={{ background: "#fff", borderRadius: 10, border: `1px solid ${C.border}`, padding: "12px 14px", marginBottom: 12 }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: C.textSoft, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 10 }}>Déterminants hémodynamiques</div>
                <HemoDiagram C={C} />
              </div>
            )}

            {/* Schéma VVC */}
            {curProto.name.includes("Voie Veineuse Centrale") && (
              <div style={{ background: "#fff", borderRadius: 10, border: `1px solid ${C.border}`, padding: "12px 14px", marginBottom: 12 }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: C.textSoft, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 10 }}>Repères anatomiques — Jugulaire interne</div>
                <VVCDiagram C={C} />
              </div>
            )}

            {/* Schéma drain thoracique */}
            {curProto.name.includes("Drainage Thoracique") && (
              <div style={{ background: "#fff", borderRadius: 10, border: `1px solid ${C.border}`, padding: "12px 14px", marginBottom: 12 }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: C.textSoft, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 10 }}>Triangle de sécurité — Repères</div>
                <DrainDiagram C={C} />
              </div>
            )}

            {/* Arbre décisionnel choc anaphylactique / choc hémorragique */}
            {(curProto.name.includes("Anaphylactique") || curProto.name.includes("Hémorragique") || curProto.name.includes("Cardiogénique")) && (
              <div style={{ background: "#fff", borderRadius: 10, border: `1px solid ${C.border}`, padding: "12px 14px", marginBottom: 12 }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: C.textSoft, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 10 }}>Vue d'ensemble — États de choc</div>
                <ShockDiagram C={C} />
              </div>
            )}
            <div style={{ background: C.blueBg, border: `1px solid ${C.blueBorder}`, borderRadius: 8, padding: "9px 12px", marginBottom: 12 }}>
              <div style={{ fontSize: 10, color: C.textSoft, marginBottom: 6, fontWeight: 600 }}>Niveaux de recommandation (GRADE) :</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "5px 12px" }}>
                {[["1A", "Forte · élevée"], ["1B", "Forte · modérée"], ["2B", "Faible · modérée"], ["GPS", "Bonne pratique"]].map(([g, l]) => (
                  <span key={g} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                    <GradeBadge grade={g} />
                    <span style={{ fontSize: 9, color: C.textSoft }}>{l}</span>
                  </span>
                ))}
              </div>
            </div>
            {curProto.sections.map((sec, si) => (
              <div key={si} style={{ background: "#fff", borderRadius: 10, border: `1px solid ${C.border}`, marginBottom: 10, overflow: "hidden" }}>
                {sec.title && (
                  <div style={{ padding: "9px 14px", borderBottom: `1px solid ${C.border}`, background: C.slateBg, display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 3, height: 16, borderRadius: 2, background: curSpec.color, flexShrink: 0 }} />
                    <span style={{ fontSize: 11, fontWeight: 700, color: curSpec.color, lineHeight: 1.3 }}>{sec.title}</span>
                  </div>
                )}
                <div style={{ padding: "2px 0" }}>
                  {(sec.items || []).map((item, ii) => (
                    <div key={ii} style={{ padding: "10px 14px", borderBottom: (ii < (sec.items || []).length - 1 || sec.hasDoseCalc) ? `1px solid ${C.border}` : "none", display: "flex", gap: 10, alignItems: "flex-start" }}>
                      <GradeBadge grade={item.grade} />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 13, lineHeight: 1.65, color: C.textMed }}>{item.text}</div>
                        {item.isNew && (
                          <div style={{ marginTop: 5, display: "inline-flex", alignItems: "center", gap: 4, background: C.purpleBg, border: `1px solid ${C.purpleBorder}`, borderRadius: 4, padding: "2px 8px" }}>
                            <span style={{ fontSize: 9, color: C.purple, fontWeight: 700 }}>★ Mise à jour 2024–2025</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                {sec.hasDoseCalc && sec.drugs && (
                  <div style={{ padding: "12px 14px" }}>
                    <DoseCalc drugs={sec.drugs} color={curSpec.color} />
                  </div>
                )}
              </div>
            ))}
            <div style={{ background: "#fff", borderRadius: 10, border: `1px solid ${C.border}`, padding: "10px 14px", marginBottom: 8 }}>
              <div style={{ fontSize: 9, fontWeight: 700, color: C.textXsoft, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 5 }}>Références</div>
              <div style={{ fontSize: 11, color: C.textSoft, lineHeight: 1.7 }}>{curProto.source}</div>
            </div>
            <div style={{ fontSize: 9, color: C.textXsoft, textAlign: "center", padding: "4px 0 8px" }}>Aide-mémoire clinique · Le jugement médical prime</div>
          </div>
        )}

        {/* SEARCH */}
        {tab === "search" && (
          <div>
            {search.length > 1 && searchResults.length === 0 && (
              <div style={{ textAlign: "center", color: C.textSoft, fontSize: 14, padding: "40px 0" }}>
                <div style={{ fontSize: 36, marginBottom: 12 }}>🔍</div>Aucun résultat pour « {search} »
              </div>
            )}
            {searchResults.length > 0 && (
              <div style={{ background: "#fff", borderRadius: 12, border: `1px solid ${C.border}`, overflow: "hidden" }}>
                {searchResults.map(({ sp, p, i }, ri) => (
                  <button key={ri} onClick={() => { setSpecId(sp.id); setProtoIdx(i); setTab("index"); setSearch(""); }} style={{ width: "100%", background: "none", border: "none", borderBottom: ri < searchResults.length - 1 ? `1px solid ${C.border}` : "none", padding: "13px 14px", cursor: "pointer", textAlign: "left" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 5 }}>
                      <div style={{ width: 20, height: 20, borderRadius: 5, background: sp.bgColor, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <SvgIcon name={sp.iconName} size={12} color={sp.color} />
                      </div>
                      <span style={{ fontSize: 10, color: sp.color, fontWeight: 700 }}>{sp.short}</span>
                      <UrgBadge tag={p.urgence} />
                      {p.isNew && <NewBadge />}
                    </div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: C.text, lineHeight: 1.3 }}>{p.name}</div>
                  </button>
                ))}
              </div>
            )}
            {search.length <= 1 && (
              <div style={{ textAlign: "center", color: C.textXsoft, fontSize: 13, padding: "40px 0" }}>
                <div style={{ fontSize: 36, marginBottom: 12 }}>⌨️</div>Tapez au moins 2 caractères
              </div>
            )}
          </div>
        )}
      </div>

      {/* BOTTOM NAV — 3 onglets */}
      <div style={{ position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: 520, background: "#fff", borderTop: `1px solid ${C.border}`, display: "flex", zIndex: 200 }}>
        {NAV_TABS.map(t => {
          const active = tab === t.id && !isDetail;
          return (
            <button key={t.id} onClick={() => { setTab(t.id); navReset(); }} style={{ flex: 1, background: "none", border: "none", padding: "10px 0 14px", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
              {(t.id === "ventilation" || t.id === "infecto" || t.id === "hemo" || t.id === "scores") ? (
                <span style={{ fontSize: 18, opacity: active ? 1 : 0.4 }}>{t.icon}</span>
              ) : (
                <SvgIcon name={t.id === "index" ? "list" : "search"} size={20} color={active ? C.accent : C.textXsoft} />
              )}
              <span style={{ fontSize: 10, color: active ? C.accent : C.textXsoft, fontWeight: active ? 600 : 400 }}>{t.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
