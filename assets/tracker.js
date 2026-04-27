/* ============================================
   PLANET CRAFTER TRACKER - SCRIPTS
   Progress tracking con localStorage
   Bilingue (ES/EN)
   ============================================ */

// === TRANSLATIONS ===
const i18n = {
    en: {
        navGuide: 'Guide',
        navTracker: 'Tracker',
        navBadge: 'Tracker',
        heroTag: 'PROGRESS TRACKER',
        heroTitle: 'Your',
        heroTitleAccent: 'Progress',
        heroSubtitle: 'Track your terraformation progress. Everything saves automatically in your browser.',
        btnExport: 'Export Progress',
        btnImport: 'Import Progress',
        btnReset: 'Reset All',
        sumStages: 'Stages',
        sumChests: 'Golden Chests',
        sumBunkers: 'Bunkers',
        sumTi: 'Current Ti',
        sumOverall: 'Overall',
        overallProgress: 'Overall Progress',
        tiTitle: 'Your Terraformation Index',
        tiDesc: 'Enter your current Ti to track your progress toward the next stage.',
        btnSave: 'Save',
        tiNext: 'Next stage:',
        stagesTitle: 'Terraformation Stages',
        stagesDesc: 'Mark each stage as you complete it.',
        chestsTitle: 'Golden Chests',
        chestsDesc: 'Check off each golden chest you find.',
        bunkersTitle: 'Bunkers',
        bunkersDesc: 'Check off each bunker you explore.',
        exportTitle: 'Export Progress',
        exportDesc: 'Copy this code to save your progress. You can import it later on any browser.',
        btnClose: 'Close',
        btnCopy: 'Copy',
        importTitle: 'Import Progress',
        importDesc: 'Paste your saved progress code below. This will overwrite your current progress.',
        btnCancel: 'Cancel',
        btnImportConfirm: 'Import',
        resetTitle: 'Reset All Progress?',
        resetDesc: 'This will permanently delete all your tracked progress. This action cannot be undone. Consider exporting your progress first.',
        btnResetConfirm: 'Reset',
        footerText: 'Unofficial fan-made guide.',
        footerUpdated: 'Last updated: April 2026',
        copyOk: 'Copied!',
        importOk: 'Progress imported successfully!',
        importErr: 'Invalid code. Check and try again.',
        resetOk: 'Progress has been reset.',
    },
    es: {
        navGuide: 'Guia',
        navTracker: 'Tracker',
        navBadge: 'Tracker',
        heroTag: 'SEGUIMIENTO DE PROGRESO',
        heroTitle: 'Tu',
        heroTitleAccent: 'Progreso',
        heroSubtitle: 'Segui tu progreso de terraformacion. Todo se guarda automaticamente en tu navegador.',
        btnExport: 'Exportar Progreso',
        btnImport: 'Importar Progreso',
        btnReset: 'Resetear Todo',
        sumStages: 'Etapas',
        sumChests: 'Cofres Dorados',
        sumBunkers: 'Bunkers',
        sumTi: 'Ti Actual',
        sumOverall: 'General',
        overallProgress: 'Progreso General',
        tiTitle: 'Tu Indice de Terraformacion',
        tiDesc: 'Ingresa tu Ti actual para trackear tu progreso hacia la proxima etapa.',
        btnSave: 'Guardar',
        tiNext: 'Proxima etapa:',
        stagesTitle: 'Etapas de Terraformacion',
        stagesDesc: 'Marca cada etapa a medida que la completes.',
        chestsTitle: 'Cofres Dorados',
        chestsDesc: 'Tilde cada cofre dorado que encuentres.',
        bunkersTitle: 'Bunkers',
        bunkersDesc: 'Tilde cada bunker que explores.'}, {
        exportTitle: 'Exportar Progreso',
        exportDesc: 'Copia este codigo para guardar tu progreso. Podes importarlo despues en cualquier navegador.',
        btnClose: 'Cerrar',
        btnCopy: 'Copiar',
        importTitle: 'Importar Progreso',
        importDesc: 'Pega tu codigo de progreso guardado abajo. Esto va a sobrescribir tu progreso actual.',
        btnCancel: 'Cancelar',
        btnImportConfirm: 'Importar',
        resetTitle: 'Resetear todo el progreso?',
        resetDesc: 'Esto va a borrar permanentemente todo tu progreso. No se puede deshacer. Considera exportar tu progreso primero.',
        btnResetConfirm: 'Resetear',
        footerText: 'Guia no oficial creada por fans.',
        footerUpdated: 'Ultima actualizacion: Abril 2026',
        copyOk: 'Copiado!',
        importOk: 'Progreso importado con exito!',
        importErr: 'Codigo invalido. Revisa e intenta de nuevo.',
        resetOk: 'El progreso ha sido reseteado.',
    }
};

// === DATA ===
const MAX_TI = 4000000000000; // 4 TTi

const stages = [
    { id: 's1',  ti: 0 },                  // 1. Barren
    { id: 's2',  ti: 175000 },             // 2. Blue Sky (175 kTi)
    { id: 's3',  ti: 350000 },             // 3. Clouds (350 kTi)
    { id: 's4',  ti: 875000 },             // 4. Rain (875 kTi)
    { id: 's5',  ti: 3000000 },            // 5. Liquid Water (3 MTi)
    { id: 's6',  ti: 50000000 },           // 6. Lakes (50 MTi)
    { id: 's7',  ti: 200000000 },          // 7. Moss (200 MTi)
    { id: 's8',  ti: 700000000 },          // 8. Flora (700 MTi)
    { id: 's9',  ti: 2000000000 },         // 9. Trees (2 GTi)
    { id: 's10', ti: 8000000000 },         // 10. Insects (8 GTi)
    { id: 's11', ti: 32000000000 },        // 11. Breathable Atmosphere (32 GTi)
    { id: 's12', ti: 120000000000 },       // 12. Fish (120 GTi)
    { id: 's13', ti: 425000000000 },       // 13. Amphibians (425 GTi)
    { id: 's14', ti: 1250000000000 },      // 14. Mammals (1.25 TTi)
    { id: 's15', ti: 4000000000000 },      // 15. Complete Terraformation (4 TTi)
];

const stageNames = {
    en: ['Barren', 'Blue Sky', 'Clouds', 'Rain', 'Liquid Water', 'Lakes', 'Moss', 'Flora', 'Trees', 'Insects', 'Breathable Atmosphere', 'Fish', 'Amphibians', 'Mammals', 'Complete Terraformation'],
    es: ['Esteril', 'Cielo Azul', 'Nubes', 'Lluvia', 'Agua Liquida', 'Lagos', 'Musgo', 'Flora', 'Arboles', 'Insectos', 'Atmosfera Respirable', 'Peces', 'Anfibios', 'Mamiferos', 'Terraformacion Completa'],
};

function formatTi(val) {
    if (val >= 1e12) return (val / 1e12).toFixed(val % 1e12 === 0 ? 0 : 2) + ' TTi';
    if (val >= 1e9)  return (val / 1e9).toFixed(val % 1e9 === 0 ? 0 : 2) + ' GTi';
    if (val >= 1e6)  return (val / 1e6).toFixed(val % 1e6 === 0 ? 0 : 2) + ' MTi';
    if (val >= 1e3)  return (val / 1e3).toFixed(val % 1e3 === 0 ? 0 : 2) + ' kTi';
    return val.toString();
}

const chests = [
    { id: 'gc01', en: 'Starting Valley', es: 'Valle Inicial', coord: '260:27:487', desc_en: 'Bottom of the wall opposite Steep Hill', desc_es: 'Al pie de la pared opuesta a Steep Hill', biome: 'Starting Valley' },
    { id: 'gc02', en: 'Steep Hill', es: 'Colina Empinada', coord: '291:162:1008', desc_en: 'Top of ship', desc_es: 'Tope del barco', biome: 'Steep Hill' },
    { id: 'gc03', en: 'Aluminum Hills', es: 'Colinas de Aluminio', coord: '1023:17:7', desc_en: 'Behind a northern aluminum pillar', desc_es: 'Detras de un pilar de aluminio al norte', biome: 'Aluminum Hills' },
    { id: 'gc04', en: 'Iridium Mine', es: 'Mina de Iridio', coord: '834:40:1194', desc_en: 'Behind the second floor\'s rock slate', desc_es: 'Detras de la losa de roca del segundo piso', biome: 'Iridium Mine' },
    { id: 'gc05', en: 'Cracked Spires', es: 'Agujas Agrietadas', coord: '400:5:-246', desc_en: 'In the shade under the spike', desc_es: 'A la sombra bajo la aguja', biome: 'Cracked Spires' },
    { id: 'gc06', en: 'Central Plateau', es: 'Meseta Central', coord: '922:19:357', desc_en: 'Under the rock bridge in the creek between Plateau and Aluminum Hills', desc_es: 'Bajo el puente de roca en el arroyo entre la Meseta y las Colinas de Aluminio', biome: 'Central Plateau' },
    { id: 'gc07', en: 'Labyrinth Canyons', es: 'Canon del Laberinto', coord: '1481:13:650', desc_en: 'Behind a pillar near the wreck', desc_es: 'Detras de un pilar cerca del naufragio', biome: 'Labyrinth Canyons' },
    { id: 'gc08', en: 'Sand Falls #1', es: 'Cascadas de Arena #1', coord: '463:66:1567', desc_en: 'In the crevice between rocks', desc_es: 'En la grieta entre rocas', biome: 'Sand Falls' },
    { id: 'gc09', en: 'Grand Rift', es: 'Gran Grieta', coord: '2157:3:242', desc_en: 'Behind the pillar', desc_es: 'Detras del pilar', biome: 'Grand Rift' },
    { id: 'gc10', en: 'The Highlands', es: 'Las Tierras Altas', coord: '1749:1:1993', desc_en: 'Under multiple big rocks', desc_es: 'Bajo multiples rocas grandes', biome: 'The Highlands' },
    { id: 'gc11', en: 'Gate Desert', es: 'Desierto de la Puerta', coord: '928:86:-776', desc_en: 'In a hole on a rock', desc_es: 'En un agujero sobre una roca', biome: 'Gate Desert' },
    { id: 'gc12', en: 'Sand Falls #2', es: 'Cascadas de Arena #2', coord: '707:155:1888', desc_en: 'On top of the sand falls', desc_es: 'Sobre las cascadas de arena', biome: 'Sand Falls' },
    { id: 'gc13', en: 'Mushroom River', es: 'Rio de Hongos', coord: '-422:-56:111', desc_en: 'In the river near wooden structures', desc_es: 'En el rio cerca de las estructuras de madera', biome: 'Mushroom River' },
    { id: 'gc14', en: 'Waterfall #1', es: 'Cascada #1', coord: '-142:181:784', desc_en: 'North of the waterfall, up on a ledge of an orange rock overhang', desc_es: 'Norte de la cascada, sobre un saliente de roca naranja', biome: 'Waterfall' },
    { id: 'gc15', en: 'Ancient City', es: 'Ciudad Antigua', coord: '642:24:2087', desc_en: 'In one of the buildings', desc_es: 'En uno de los edificios', biome: 'Ancient City' },
    { id: 'gc16', en: 'Lost Paradise #1', es: 'Paraiso Perdido #1', coord: '1102:124:2933', desc_en: 'In the butterfly dome', desc_es: 'En la cupula de mariposas', biome: 'Lost Paradise' },
    { id: 'gc17', en: 'Lost Paradise #2', es: 'Paraiso Perdido #2', coord: '1102:124:2933', desc_en: 'In the butterfly dome', desc_es: 'En la cupula de mariposas', biome: 'Lost Paradise' },
    { id: 'gc18', en: 'Waterfall #2', es: 'Cascada #2', coord: '-855:285:595', desc_en: 'On a western ledge of the waterfall mountain', desc_es: 'En un saliente oeste de la montana de la cascada', biome: 'Waterfall' },
    { id: 'gc19', en: 'Waterfall #3', es: 'Cascada #3', coord: '-715:52:289', desc_en: 'On the eastern side of the waterfall, under a pile of rocks (may be underwater)', desc_es: 'En el lado este de la cascada, bajo un monton de rocas (puede estar bajo el agua)', biome: 'Waterfall' },
    { id: 'gc20', en: 'Waterfall #4', es: 'Cascada #4', coord: '-979:46:646', desc_en: 'On the west side of the waterfall, under an overhang (may be underwater)', desc_es: 'En el lado oeste de la cascada, bajo un saliente (puede estar bajo el agua)', biome: 'Waterfall' },
    { id: 'gc21', en: 'Cenote', es: 'Cenote', coord: '-183:73:1934', desc_en: 'In a cave at the bottom of the deep plunge', desc_es: 'En una cueva al fondo del sumidero profundo', biome: 'Cenote' },
    { id: 'gc22', en: 'Volcano', es: 'Volcan', coord: '-1060:66:-128', desc_en: 'In a cave with lava', desc_es: 'En una cueva con lava', biome: 'Volcano' },
    { id: 'gc23', en: 'Cascades', es: 'Cascadas', coord: '-1060:67:1928', desc_en: 'In an alcove covered by vines west of the waterfall (submerged in lategame)', desc_es: 'En un recodo cubierto de enredaderas al oeste de la cascada (sumergido en late game)', biome: 'Cascades' },
    { id: 'gc24', en: 'Rainbow Caves', es: 'Cuevas Arcoiris', coord: '2111:36:1844', desc_en: 'Blazar Quartz cave, up on a higher ledge hidden behind rocks', desc_es: 'Cueva de Cuarzo Blazar, en un saliente alto escondido detras de rocas', biome: 'Rainbow Caves' },
    { id: 'gc25', en: 'Red Falls', es: 'Cascadas Rojas', coord: '2461:126:-601', desc_en: 'Loop around the biome 3/4 ways, in a pond near a small shuttle', desc_es: 'Rodea el bioma 3/4 de camino, en un estanque cerca de una pequeña nave', biome: 'Red Falls' },
    { id: 'gc26', en: 'Lush Desert', es: 'Desierto Verde', coord: '-648:66:-1248', desc_en: 'At the southern cliffs in the Lush Desert area', desc_es: 'En los acantilados del sur del area del Desierto Verde', biome: 'Lush Desert' },
    { id: 'gc27', en: 'Toxic Cave', es: 'Cueva Toxica', coord: '-1036:44:-1272', desc_en: 'Northwest part of the toxic pool', desc_es: 'Parte noroeste de la pileta toxica', biome: 'Toxic Cave' },
];

const bunkers = [
    { id: 'bk01', en: 'Dune Desert', es: 'Desierto de Dunas', coord: '1170:8:1288', desc_en: '1 room (built by Ikhlas)', desc_es: '1 habitacion (construido por Ikhlas)' },
    { id: 'bk02', en: 'The Highlands', es: 'Las Tierras Altas', coord: '1135:15:2355', desc_en: '2 rooms connected by cave (Ikhlas)', desc_es: '2 habitaciones conectadas por cueva (Ikhlas)' },
    { id: 'bk03', en: 'Gate Desert', es: 'Desierto de la Puerta', coord: '700:35:-882', desc_en: '2 rooms, submerged (Ikhlas)', desc_es: '2 habitaciones sumergidas (Ikhlas)' },
    { id: 'bk04', en: 'Meteor Crater (small)', es: 'Crater de Meteorito (chico)', coord: '-304:4:1342', desc_en: '2 rooms, submerged (Ikhlas)', desc_es: '2 habitaciones sumergidas (Ikhlas)' },
    { id: 'bk05', en: 'Meteor Crater (large)', es: 'Crater de Meteorito (grande)', coord: '-578:88:1523', desc_en: 'Large complex with Golden Effigy (Ikhlas)', desc_es: 'Complejo grande con Golden Effigy (Ikhlas)' },
    { id: 'bk06', en: 'Cenote', es: 'Cenote', coord: '-130:-4:2174', desc_en: 'Biodome, submerged (Ikhlas)', desc_es: 'Biodomo sumergido (Ikhlas)' },
    { id: 'bk07', en: 'Wasteland', es: 'Yermo', coord: '-318:35:-700', desc_en: 'Large complex (Xiaodan)', desc_es: 'Complejo grande (Xiaodan)' },
    { id: 'bk08', en: 'Volcano', es: 'Volcan', coord: '-863:91:-419', desc_en: 'Large complex (Xiaodan)', desc_es: 'Complejo grande (Xiaodan)' },
    { id: 'bk09', en: 'Lush Desert', es: 'Desierto Verde', coord: '114:53:-1608', desc_en: '2 rooms connected by cave (Jermyi)', desc_es: '2 habitaciones conectadas por cueva (Jermyi)' },
];

// === STATE ===
const STORAGE_KEY = 'pc-tracker-data';
let lang = localStorage.getItem('pc-lang') || 'en';
let state = loadState();

function defaultState() {
    return { stages: {}, chests: {}, bunkers: {}, ti: 0 };
}

function loadState() {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) return { ...defaultState(), ...JSON.parse(saved) };
    } catch (e) {}
    return defaultState();
}

function saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

// === INIT ===
document.addEventListener('DOMContentLoaded', () => {
    initLangSwitch();
    applyLanguage();
    buildStages();
    buildChests();
    buildBunkers();
    updateSummary();
    restoreTi();
    initStarfield();
    initNav();
    initModals();
    initFadeIn();
});

// === LANGUAGE ===
function applyLanguage() {
    const t = i18n[lang];
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.dataset.i18n;
        if (t[key]) el.textContent = t[key];
    });

    // Update lang switch button label (NO event listener here - registered once in initLangSwitch)
    const langSwitch = document.getElementById('langSwitch');
    if (langSwitch) {
        langSwitch.textContent = lang === 'en' ? 'ES' : 'EN';
    }
}

function initLangSwitch() {
    const langSwitch = document.getElementById('langSwitch');
    if (langSwitch) {
        langSwitch.href = '#';
        langSwitch.addEventListener('click', (e) => {
            e.preventDefault();
            lang = lang === 'en' ? 'es' : 'en';
            localStorage.setItem('pc-lang', lang);
            applyLanguage();
            buildStages();
            buildChests();
            buildBunkers();
            updateSummary();
            updateTiNext();
        });
    }
}

// === BUILD CHECKLISTS ===
function buildStages() {
    const grid = document.getElementById('stagesGrid');
    grid.innerHTML = '';
    stages.forEach((stage, i) => {
        const name = stageNames[lang][i];
        const tiStr = formatTi(stage.ti);
        const checked = state.stages[stage.id];

        const item = document.createElement('div');
        item.className = `checklist-item${checked ? ' checked' : ''}`;
        item.innerHTML = `
            <div class="check-box">${checked ? '✓' : ''}</div>
            <div>
                <div class="check-label">${i + 1}. ${name}</div>
                ${stage.ti > 0 ? `<div class="check-sub">Ti ${tiStr}</div>` : ''}
            </div>
        `;
        item.addEventListener('click', () => {
            state.stages[stage.id] = !state.stages[stage.id];
            saveState();
            buildStages();
            updateSummary();
        });
        grid.appendChild(item);
    });
}

function buildChests() {
    const grid = document.getElementById('chestsGrid');
    grid.innerHTML = '';
    chests.forEach(chest => {
        const name = chest[lang];
        const desc = lang === 'en' ? chest.desc_en : chest.desc_es;
        const checked = state.chests[chest.id];

        const item = document.createElement('div');
        item.className = `checklist-item${checked ? ' checked' : ''}`;
        item.innerHTML = `
            <div class="check-box">${checked ? '✓' : ''}</div>
            <div>
                <div class="check-label">📦 ${name}</div>
                <div class="check-sub">${chest.coord}</div>
                <div class="check-desc">${desc}</div>
            </div>
        `;
        item.addEventListener('click', () => {
            state.chests[chest.id] = !state.chests[chest.id];
            saveState();
            buildChests();
            updateSummary();
        });
        grid.appendChild(item);
    });
}

function buildBunkers() {
    const grid = document.getElementById('bunkersGrid');
    grid.innerHTML = '';
    bunkers.forEach(bunker => {
        const name = bunker[lang];
        const desc = lang === 'en' ? bunker.desc_en : bunker.desc_es;
        const checked = state.bunkers[bunker.id];

        const item = document.createElement('div');
        item.className = `checklist-item${checked ? ' checked' : ''}`;
        item.innerHTML = `
            <div class="check-box">${checked ? '✓' : ''}</div>
            <div>
                <div class="check-label">🏗️ ${name}</div>
                <div class="check-sub">${bunker.coord}</div>
                <div class="check-desc">${desc}</div>
            </div>
        `;
        item.addEventListener('click', () => {
            state.bunkers[bunker.id] = !state.bunkers[bunker.id];
            saveState();
            buildBunkers();
            updateSummary();
        });
        grid.appendChild(item);
    });
}

// === TI INPUT ===
function restoreTi() {
    const input = document.getElementById('tiInput');
    if (state.ti > 0) input.value = state.ti;
    updateTiNext();

    document.getElementById('tiSaveBtn').addEventListener('click', () => {
        state.ti = parseInt(input.value) || 0;
        if (state.ti < 0) state.ti = 0;
        if (state.ti > MAX_TI) state.ti = MAX_TI;
        saveState();
        updateSummary();
        updateTiNext();
    });

    // Also save on Enter
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') document.getElementById('tiSaveBtn').click();
    });
}

function updateTiNext() {
    const ti = state.ti;
    const nextStage = stages.find(s => s.ti > ti);
    const el = document.getElementById('tiNextStage');
    if (nextStage) {
        const idx = stages.indexOf(nextStage);
        el.classList.remove('hidden');
        document.getElementById('tiNextName').textContent = stageNames[lang][idx];
        document.getElementById('tiNextTi').textContent = nextStage.ti.toLocaleString();
    } else {
        el.classList.add('hidden');
    }
}

// === SUMMARY ===
function updateSummary() {
    const stagesDone = Object.values(state.stages).filter(Boolean).length;
    const chestsDone = Object.values(state.chests).filter(Boolean).length;
    const bunkersDone = Object.values(state.bunkers).filter(Boolean).length;

    document.getElementById('sumStages').textContent = `${stagesDone}/${stages.length}`;
    document.getElementById('sumChests').textContent = `${chestsDone}/${chests.length}`;
    document.getElementById('sumBunkers').textContent = `${bunkersDone}/${bunkers.length}`;
    document.getElementById('sumTi').textContent = state.ti.toLocaleString();

    // Overall: weighted average (stages 40%, chests 20%, bunkers 15%, ti 25%)
    const stagePct = stagesDone / stages.length;
    const chestPct = chestsDone / chests.length;
    const bunkerPct = bunkersDone / bunkers.length;
    const tiPct = Math.min(state.ti / MAX_TI, 1);
    const overall = Math.round((stagePct * 40 + chestPct * 20 + bunkerPct * 15 + tiPct * 25));

    document.getElementById('sumOverall').textContent = `${overall}%`;
    document.getElementById('overallPct').textContent = `${overall}%`;
    document.getElementById('overallBar').style.width = `${overall}%`;
}

// === MODALS ===
function initModals() {
    const t = i18n[lang];

    // Export
    document.getElementById('btnExport').addEventListener('click', () => {
        document.getElementById('exportData').value = btoa(JSON.stringify(state));
        document.getElementById('exportModal').classList.add('active');
    });
    document.getElementById('exportClose').addEventListener('click', () => {
        document.getElementById('exportModal').classList.remove('active');
    });
    document.getElementById('exportCopy').addEventListener('click', () => {
        const textarea = document.getElementById('exportData');
        textarea.select();
        navigator.clipboard.writeText(textarea.value).then(() => {
            const btn = document.getElementById('exportCopy');
            btn.textContent = t.copyOk;
            setTimeout(() => btn.textContent = t.btnCopy, 1500);
        });
    });

    // Import
    document.getElementById('btnImport').addEventListener('click', () => {
        document.getElementById('importData').value = '';
        document.getElementById('importModal').classList.add('active');
    });
    document.getElementById('importClose').addEventListener('click', () => {
        document.getElementById('importModal').classList.remove('active');
    });
    document.getElementById('importConfirm').addEventListener('click', () => {
        try {
            const data = JSON.parse(atob(document.getElementById('importData').value.trim()));
            if (data.stages && data.chests) {
                state = { ...defaultState(), ...data };
                saveState();
                document.getElementById('tiInput').value = state.ti || '';
                buildStages();
                buildChests();
                buildBunkers();
                updateSummary();
                updateTiNext();
                document.getElementById('importModal').classList.remove('active');
                showToast(t.importOk);
            } else {
                showToast(t.importErr);
            }
        } catch (e) {
            showToast(t.importErr);
        }
    });

    // Reset
    document.getElementById('btnReset').addEventListener('click', () => {
        document.getElementById('resetModal').classList.add('active');
    });
    document.getElementById('resetClose').addEventListener('click', () => {
        document.getElementById('resetModal').classList.remove('active');
    });
    document.getElementById('resetConfirm').addEventListener('click', () => {
        state = defaultState();
        saveState();
        document.getElementById('tiInput').value = '';
        buildStages();
        buildChests();
        buildBunkers();
        updateSummary();
        updateTiNext();
        document.getElementById('resetModal').classList.remove('active');
        showToast(t.resetOk);
    });

    // Close modals on overlay click
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) overlay.classList.remove('active');
        });
    });
}

// === TOAST ===
function showToast(msg) {
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.style.cssText = `
        position: fixed; bottom: 30px; left: 50%; transform: translateX(-50%);
        background: var(--bg-card); border: 1px solid var(--accent-green); color: var(--accent-green);
        padding: 12px 24px; border-radius: 12px; font-size: 0.85rem; font-weight: 600;
        z-index: 3000; box-shadow: 0 4px 20px rgba(0,255,136,0.2);
        animation: fadeInUp 0.3s ease;
    `;
    toast.textContent = msg;
    document.body.appendChild(toast);
    setTimeout(() => { toast.style.opacity = '0'; toast.style.transition = 'opacity 0.3s'; }, 2000);
    setTimeout(() => toast.remove(), 2300);
}

// === STARFIELD (lite) ===
function initStarfield() {
    const canvas = document.getElementById('starfield');
    const ctx = canvas.getContext('2d');
    let stars = [];

    function resize() { canvas.width = innerWidth; canvas.height = innerHeight; }
    resize();
    window.addEventListener('resize', resize);

    for (let i = 0; i < 150; i++) {
        stars.push({
            x: Math.random() * canvas.width, y: Math.random() * canvas.height,
            s: Math.random() * 1.5 + 0.5, sp: Math.random() * 0.2 + 0.03,
            o: Math.random() * 0.6 + 0.2, tp: Math.random() * 6.28, ts: Math.random() * 0.015 + 0.005
        });
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        stars.forEach(s => {
            s.tp += s.ts;
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.s, 0, 6.28);
            ctx.fillStyle = `rgba(200,220,255,${s.o * (0.5 + 0.5 * Math.sin(s.tp))})`;
            ctx.fill();
            s.y += s.sp;
            if (s.y > canvas.height) { s.y = 0; s.x = Math.random() * canvas.width; }
        });
        requestAnimationFrame(draw);
    }
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) draw();
}

// === NAV (simplified) ===
function initNav() {
    const toggle = document.getElementById('navToggle');
    const links = document.getElementById('navLinks');
    if (toggle && links) {
        toggle.addEventListener('click', () => {
            toggle.classList.toggle('active');
            links.classList.toggle('active');
        });
        links.querySelectorAll('a').forEach(a => {
            a.addEventListener('click', () => {
                toggle.classList.remove('active');
                links.classList.remove('active');
            });
        });
    }

    // Back to top
    const btn = document.getElementById('backToTop');
    if (btn) {
        window.addEventListener('scroll', () => {
            btn.classList.toggle('visible', window.scrollY > 300);
        }, { passive: true });
        btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }

    // Navbar scroll
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            navbar.classList.toggle('scrolled', window.scrollY > 50);
        }, { passive: true });
    }
}

// === FADE IN ===
function initFadeIn() {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    document.querySelectorAll('.fade-in').forEach(el => {
        if (prefersReduced) { el.classList.add('visible'); return; }
        const obs = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) { el.classList.add('visible'); obs.unobserve(el); }
        }, { threshold: 0.1 });
        obs.observe(el);
    });
}
