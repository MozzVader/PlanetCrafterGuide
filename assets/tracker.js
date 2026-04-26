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
        heroTag: 'PROGRESS TRACKER',
        heroTitle: 'Your',
        heroTitleAccent: 'Progress',
        heroSubtitle: 'Track your terraformation progress. Everything saves automatically in your browser.',
        btnExport: 'Export Progress',
        btnImport: 'Import Progress',
        btnReset: 'Reset All',
        sumStages: 'Stages',
        sumChests: 'Golden Chests',
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
        heroTag: 'SEGUIMIENTO DE PROGRESO',
        heroTitle: 'Tu',
        heroTitleAccent: 'Progreso',
        heroSubtitle: 'Segui tu progreso de terraformacion. Todo se guarda automaticamente en tu navegador.',
        btnExport: 'Exportar Progreso',
        btnImport: 'Importar Progreso',
        btnReset: 'Resetear Todo',
        sumStages: 'Etapas',
        sumChests: 'Cofres Dorados',
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
const stages = [
    { id: 's0', ti: 0,        key: 'stage0', coord: '' },
    { id: 's1', ti: 7000,     key: 'stage1', coord: '' },
    { id: 's2', ti: 50000,    key: 'stage2', coord: '' },
    { id: 's3', ti: 175000,   key: 'stage3', coord: '' },
    { id: 's4', ti: 500000,   key: 'stage4', coord: '' },
    { id: 's5', ti: 850000,   key: 'stage5', coord: '' },
    { id: 's6', ti: 1500000,  key: 'stage6', coord: '' },
    { id: 's7', ti: 3500000,  key: 'stage7', coord: '' },
    { id: 's8', ti: 10000000, key: 'stage8', coord: '' },
    { id: 's9', ti: 25000000, key: 'stage9', coord: '' },
];

const stageNames = {
    en: ['Barren', 'Blue Sky', 'Breathable Atmosphere', 'Algae', 'Insects', 'Grass', 'Trees', 'Animals', 'Birds', 'Full Terraformation'],
    es: ['Esteril', 'Cielo Azul', 'Atmosfera Respirable', 'Algas', 'Insectos', 'Hierba', 'Arboles', 'Animales', 'Aves', 'Terraformacion Completa'],
};

const chests = [
    { id: 'gc01', en: 'Crash Site Area', es: 'Zona del Naufragio', coord: '-15, 97, -8' },
    { id: 'gc02', en: 'Near Starting Pod', es: 'Cerca de la Capsula', coord: '40, 100, 50' },
    { id: 'gc03', en: 'First Cave Entrance', es: 'Primera Entrada de Cueva', coord: '95, 91, 285' },
    { id: 'gc04', en: 'Waterfall Cave', es: 'Cueva de la Cascada', coord: '285, 96, -505' },
    { id: 'gc05', en: 'Icespire Base', es: 'Base de las Puntas de Hielo', coord: '-1045, 165, -270' },
    { id: 'gc06', en: 'Icespire Peak', es: 'Cima de las Puntas de Hielo', coord: '-1090, 220, -310' },
    { id: 'gc07', en: 'Deep Icespire Cave', es: 'Cueva Profunda Icespire', coord: '-1080, 80, -290' },
    { id: 'gc08', en: 'Arches Area', es: 'Zona de los Arcos', coord: '10, 147, 1930' },
    { id: 'gc09', en: 'Left Path Arches', es: 'Arcos Camino Izquierdo', coord: '130, 155, 1950' },
    { id: 'gc10', en: 'Sand Dunes', es: 'Dunas de Arena', coord: '700, 100, 800' },
    { id: 'gc11', en: 'Hidden Cave Behind Waterfall', es: 'Cueva Oculta Detras de Cascada', coord: '290, 90, -520' },
    { id: 'gc12', en: 'Sulfur Fields Cave', es: 'Cueva de los Campos de Azufre', coord: '450, 85, 400' },
    { id: 'gc13', en: 'Lava Biome Entrance', es: 'Entrada del Bioma de Lava', coord: '-600, 140, -900' },
    { id: 'gc14', en: 'Lava Biome Deep', es: 'Bioma de Lava Profundo', coord: '-650, 80, -950' },
    { id: 'gc15', en: 'Mountain Ridge', es: 'Cresta Montana', coord: '-500, 200, 500' },
    { id: 'gc16', en: 'Abandoned Wreck', es: 'Naufragio Abandonado', coord: '350, 110, -350' },
    { id: 'gc17', en: 'Underground Lake Cave', es: 'Cueva del Lago Subterraneo', coord: '150, 75, 600' },
    { id: 'gc18', en: 'Crystal Cave', es: 'Cueva de Cristales', coord: '-300, 80, 700' },
    { id: 'gc19', en: 'Aluminum Mountain', es: 'Montana de Aluminio', coord: '500, 180, 1000' },
    { id: 'gc20', en: 'The Maze Cave', es: 'Cueva del Laberinto', coord: '-200, 70, 900' },
];

// === STATE ===
const STORAGE_KEY = 'pc-tracker-data';
let lang = localStorage.getItem('pc-lang') || 'en';
let state = loadState();

function defaultState() {
    return { stages: {}, chests: {}, ti: 0 };
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
    applyLanguage();
    buildStages();
    buildChests();
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

    // Lang switch button
    const langSwitch = document.getElementById('langSwitch');
    if (langSwitch) {
        langSwitch.textContent = lang === 'en' ? 'ES' : 'EN';
        langSwitch.href = '#';
        langSwitch.addEventListener('click', (e) => {
            e.preventDefault();
            lang = lang === 'en' ? 'es' : 'en';
            localStorage.setItem('pc-lang', lang);
            applyLanguage();
            buildStages();
            buildChests();
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
        const tiStr = stage.ti >= 1000000
            ? (stage.ti / 1000000).toFixed(stage.ti % 1000000 === 0 ? 0 : 1) + 'M'
            : stage.ti >= 1000
                ? (stage.ti / 1000) + 'K'
                : '0';
        const checked = state.stages[stage.id];

        const item = document.createElement('div');
        item.className = `checklist-item${checked ? ' checked' : ''}`;
        item.innerHTML = `
            <div class="check-box">${checked ? '✓' : ''}</div>
            <div>
                <div class="check-label">${i}. ${name}</div>
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
        const checked = state.chests[chest.id];

        const item = document.createElement('div');
        item.className = `checklist-item${checked ? ' checked' : ''}`;
        item.innerHTML = `
            <div class="check-box">${checked ? '✓' : ''}</div>
            <div>
                <div class="check-label">📦 ${name}</div>
                <div class="check-sub">${chest.coord}</div>
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

// === TI INPUT ===
function restoreTi() {
    const input = document.getElementById('tiInput');
    if (state.ti > 0) input.value = state.ti;
    updateTiNext();

    document.getElementById('tiSaveBtn').addEventListener('click', () => {
        state.ti = parseInt(input.value) || 0;
        if (state.ti < 0) state.ti = 0;
        if (state.ti > 25000000) state.ti = 25000000;
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

    document.getElementById('sumStages').textContent = `${stagesDone}/${stages.length}`;
    document.getElementById('sumChests').textContent = `${chestsDone}/${chests.length}`;
    document.getElementById('sumTi').textContent = state.ti.toLocaleString();

    // Overall: weighted average (stages 50%, chests 25%, ti 25%)
    const stagePct = stagesDone / stages.length;
    const chestPct = chestsDone / chests.length;
    const tiPct = Math.min(state.ti / 25000000, 1);
    const overall = Math.round((stagePct * 50 + chestPct * 25 + tiPct * 25));

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
