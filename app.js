// =====================================================
// BLUE HEELER TRAINER PRO - APPLICATION LOGIC
// Versão 2.0 - Sistema Completo de Treinamento
// =====================================================

// === CONFIGURAÇÃO ===
const CONFIG = {
	API_BASE_URL: "/api", // Azure Static Web Apps integrated API
	SYNC_INTERVAL: 30000, // 30 segundos
	DOG_BIRTH_DATE: "2025-09-01",
	AUTO_SAVE: true,
};

// === ESTADO GLOBAL ===
let appState = {
	dogData: {
		name: "Meu Blue Heeler",
		birthDate: CONFIG.DOG_BIRTH_DATE,
		goals: [],
	},
	dailyTraining: {},
	badges: [],
	streak: 0,
	totalSessions: 0,
	lastSync: null,
};

// === EXERCÍCIOS DE TREINAMENTO ===
const TRAINING_EXERCISES = [
	{
		id: "potty",
		name: "🚽 Potty Training",
		description: "Levar ao local apropriado a cada 1-2h",
		duration: "5 min",
		category: "básico",
		difficulty: "easy",
		phase: 1,
	},
	{
		id: "nome",
		name: "🎯 Nome e Atenção",
		description: "Responder ao nome com contato visual",
		duration: "5 min",
		category: "obediência",
		difficulty: "easy",
		phase: 1,
	},
	{
		id: "exploracao",
		name: "🌳 Exploração Supervisionada",
		description: "Diferentes superfícies e ambientes",
		duration: "15 min",
		category: "socialização",
		difficulty: "easy",
		phase: 1,
	},
	{
		id: "socializacao_pessoas",
		name: "👥 Socialização com Pessoas",
		description: "Apresentar 2-3 pessoas diferentes",
		duration: "10 min",
		category: "socialização",
		difficulty: "medium",
		phase: 1,
	},
	{
		id: "sons",
		name: "🔊 Habituação a Sons",
		description: "Sons domésticos em volume baixo",
		duration: "5 min",
		category: "socialização",
		difficulty: "easy",
		phase: 1,
	},
	{
		id: "brincadeira",
		name: "🎾 Brincadeira Interativa",
		description: "Brinquedos apropriados, sem nipping",
		duration: "15 min",
		category: "enriquecimento",
		difficulty: "easy",
		phase: 1,
	},
	{
		id: "bite_inhibition",
		name: "🦷 Bite Inhibition",
		description: "Treino de boca gentil",
		duration: "10 min",
		category: "comportamento",
		difficulty: "medium",
		phase: 1,
	},
	{
		id: "handling",
		name: "✋ Handling e Manipulação",
		description: "Tocar patas, orelhas, boca",
		duration: "5 min",
		category: "básico",
		difficulty: "easy",
		phase: 1,
	},
];

// === BIBLIOTECA DE EXERCÍCIOS ===
const LIBRARY_CONTENT = [
	{
		id: "socialização-crítica",
		title: "Socialização no Período Crítico",
		description:
			"Protocolo completo para expor seu filhote a 100+ experiências positivas",
		icon: "👥",
		duration: "8-16 semanas",
		difficulty: "medium",
		content: `
            <h3>Por que é Crítico?</h3>
            <p>O período de 5-16 semanas é uma janela neurológica única onde o cérebro está programado para aceitar novas experiências. Após isso, a neofobia (medo do novo) aumenta drasticamente.</p>
            
            <h3>Checklist de Socialização</h3>
            <ul>
                <li><strong>100+ Pessoas:</strong> Idades, etnias, gêneros, roupas, acessórios</li>
                <li><strong>20+ Cães:</strong> Tamanhos, idades, raças diferentes</li>
                <li><strong>50+ Ambientes:</strong> Casas, parques, pet shops, estacionamentos</li>
                <li><strong>Superfícies:</strong> Grama, concreto, madeira, metal, areia</li>
                <li><strong>Sons:</strong> Aspirador, liquidificador, trovão, fogos, trânsito</li>
            </ul>
            
            <h3>Como Fazer Corretamente</h3>
            <p>Cada experiência deve ser:</p>
            <ul>
                <li>✅ Curta (5-15 minutos)</li>
                <li>✅ Positiva (petiscos de alto valor)</li>
                <li>✅ No ritmo do filhote (sem forçar)</li>
                <li>✅ Abaixo do limiar de medo</li>
            </ul>
        `,
	},
	{
		id: "bite-inhibition",
		title: "Bite Inhibition para Blue Heelers",
		description: "Técnica essencial para controlar o instinto de nip/heeling",
		icon: "🦷",
		duration: "8-18 semanas",
		difficulty: "hard",
		content: `
            <h3>Por que Blue Heelers Precisam Disso</h3>
            <p>Blue Heelers foram criados para controlar gado mordiscando calcanhares. Este instinto é GENÉTICO e não pode ser eliminado, apenas redirecionado.</p>
            
            <h3>Protocolo de Time-Out Reverso</h3>
            <ol>
                <li>Durante brincadeira, se morder com força:</li>
                <li>Emita um "Ai!" agudo</li>
                <li>Deixe sua mão mole</li>
                <li>Se continuar: Levante-se e saia da área por 30-60s</li>
                <li>Retorne e reinicie brincadeira calma</li>
            </ol>
            
            <h3>O Que NÃO Fazer</h3>
            <ul>
                <li>❌ Nunca bata ou grite</li>
                <li>❌ Não segure o focinho</li>
                <li>❌ Evite brincadeiras muito agitadas</li>
            </ul>
            
            <h3>Meta</h3>
            <p>Controle total da pressão de mordida até 16-18 semanas.</p>
        `,
	},
	{
		id: "recall-confiavel",
		title: "Recall 100% Confiável",
		description: "O comando mais importante para segurança do seu cão",
		icon: "📣",
		duration: "12+ semanas",
		difficulty: "hard",
		content: `
            <h3>Por que é Difícil com Blue Heelers</h3>
            <p>Blue Heelers têm alto impulso de caça e independência. O recall deve ser construído metodicamente.</p>
            
            <h3>Protocolo de Progressão</h3>
            <ol>
                <li><strong>Fase 1:</strong> Casa, sem distrações, 1-2 metros</li>
                <li><strong>Fase 2:</strong> Casa, distrações leves, 3-5 metros</li>
                <li><strong>Fase 3:</strong> Quintal, sem distrações, 5-10 metros</li>
                <li><strong>Fase 4:</strong> Quintal, distrações moderadas</li>
                <li><strong>Fase 5:</strong> Parque com guia longa (15-30m)</li>
                <li><strong>Fase 6:</strong> Área segura sem guia</li>
            </ol>
            
            <h3>Regras de Ouro</h3>
            <ul>
                <li>✅ SEMPRE recompense com festa + petiscos múltiplos</li>
                <li>✅ NUNCA chame para algo negativo</li>
                <li>✅ Use palavra especial ("VEM" vs "aqui")</li>
                <li>✅ Pratique 10-20x por dia</li>
            </ul>
        `,
	},
	{
		id: "enriquecimento-mental",
		title: "Enriquecimento Mental Diário",
		description: "Essencial para prevenir comportamentos destrutivos",
		icon: "🧩",
		duration: "Diário - 30min",
		difficulty: "easy",
		content: `
            <h3>Por que É Crucial</h3>
            <p>Blue Heelers precisam de 60-90 min de exercício físico + 30-60 min de estimulação mental. Sem isso, criam seus próprios "trabalhos" (geralmente destrutivos).</p>
            
            <h3>Atividades Caseiras Gratuitas</h3>
            <ul>
                <li><strong>Puzzle Feeders:</strong> Garrafas PET com furos, caixas de papelão</li>
                <li><strong>Nosework:</strong> Esconder petiscos pela casa</li>
                <li><strong>Toalha Enrolada:</strong> Petiscos entre dobras de toalha</li>
                <li><strong>Caixas de Papelão:</strong> 10 caixas, petiscos em algumas</li>
                <li><strong>Gelo com Petiscos:</strong> Congelar petiscos em água</li>
            </ul>
            
            <h3>Rotina Sugerida</h3>
            <p>Manhã: Exercício físico → Puzzle feeder no café<br>
            Tarde: Nosework 10 min<br>
            Noite: Treino de truques 10 min</p>
        `,
	},
	{
		id: "clicker-training",
		title: "Clicker Training para Iniciantes",
		description: "Comunicação precisa e aceleração de aprendizado",
		icon: "🔔",
		duration: "1+ semana",
		difficulty: "medium",
		content: `
            <h3>O Que É Clicker Training</h3>
            <p>Um marcador temporal preciso (som de clicker) que identifica o exato momento do comportamento correto.</p>
            
            <h3>Fase 1: Carregar o Clicker (Dias 1-3)</h3>
            <ol>
                <li>Click → petisco imediato</li>
                <li>Repetir 50-100 vezes</li>
                <li>Teste: Click sem avisar. Cão deve virar expectante</li>
            </ol>
            
            <h3>Fase 2: Capturar Comportamentos</h3>
            <p>Quando o cão faz algo desejado (ex: senta naturalmente) → Click → Petisco</p>
            
            <h3>Fase 3: Adicionar Comando</h3>
            <p>Quando comportamento é consistente, adicione palavra antes dele acontecer</p>
            
            <h3>Apps de Clicker Gratuitos</h3>
            <ul>
                <li>Dog Clicker Training (iOS/Android)</li>
                <li>Alternativa: Tampa de garrafa</li>
            </ul>
        `,
	},
	{
		id: "leash-walking",
		title: "Caminhada com Guia Frouxa",
		description: "Eliminar puxões e transformar passeios",
		icon: "🦮",
		duration: "16+ semanas",
		difficulty: "hard",
		content: `
            <h3>Por que É Desafiador</h3>
            <p>Blue Heelers têm alta energia e impulso de exploração. Puxar é natural; andar junto não é.</p>
            
            <h3>Método de Parar e Esperar</h3>
            <ol>
                <li>Cão puxa → Você PARA imediatamente</li>
                <li>Espera (sem falar nada)</li>
                <li>Quando guia afrouxar → "Sim!" + seguir</li>
                <li>Petisco a cada 3-5 passos sem puxar</li>
            </ol>
            
            <h3>Progressão Gradual</h3>
            <ul>
                <li>Semana 1-2: Dentro de casa (5 min)</li>
                <li>Semana 3-4: Quintal (10 min)</li>
                <li>Semana 5-6: Calçada calma (15 min)</li>
                <li>Semana 7+: Rua com distrações</li>
            </ul>
            
            <h3>Equipamento</h3>
            <p>Use harness frontal (impede puxão) + guia de 4-6 pés</p>
        `,
	},
];

// === BADGES/CONQUISTAS ===
const BADGES = [
	{
		id: "primeira-semana",
		name: "Primeira Semana",
		description: "7 dias consecutivos de treinamento",
		icon: "🎉",
		requirement: () => appState.streak >= 7,
	},
	{
		id: "social-butterfly-50",
		name: "Social Butterfly",
		description: "50 pessoas diferentes conhecidas",
		icon: "🦋",
		requirement: () => false, // Implemente contador
	},
	{
		id: "mestresessoes-30",
		name: "Mestre das Sessões",
		description: "30 sessões completas",
		icon: "🎓",
		requirement: () => appState.totalSessions >= 30,
	},
	{
		id: "streak-30",
		name: "Consistência de Ouro",
		description: "30 dias consecutivos",
		icon: "👑",
		requirement: () => appState.streak >= 30,
	},
	{
		id: "early-bird",
		name: "Madrugador",
		description: "Treino antes das 7h",
		icon: "🌅",
		requirement: () => false, // Implemente verificação de horário
	},
	{
		id: "completionista",
		name: "Completionista",
		description: "100% de conclusão por 7 dias",
		icon: "💯",
		requirement: () => false, // Implemente verificação
	},
	{
		id: "periodo-critico",
		name: "Período Crítico Dominado",
		description: "Completou todas socializações de 8-16 semanas",
		icon: "⭐",
		requirement: () => false,
	},
	{
		id: "bite-master",
		name: "Bite Inhibition Master",
		description: "Controle completo de mordida",
		icon: "🦷",
		requirement: () => false,
	},
	{
		id: "recall-pro",
		name: "Recall Profissional",
		description: "Recall 100% confiável",
		icon: "📣",
		requirement: () => false,
	},
	{
		id: "biblioteca-completa",
		name: "Estudioso",
		description: "Leu todos os guias da biblioteca",
		icon: "📚",
		requirement: () => false,
	},
	{
		id: "heeler-expert",
		name: "Blue Heeler Expert",
		description: "Completou todos os marcos de treinamento",
		icon: "🏆",
		requirement: () => false,
	},
	{
		id: "partnership",
		name: "Parceria Perfeita",
		description: "100 sessões completas",
		icon: "💙",
		requirement: () => appState.totalSessions >= 100,
	},
];

// === INICIALIZAÇÃO ===
document.addEventListener("DOMContentLoaded", () => {
	loadFromLocalStorage();
	renderUI();
	startAutoSync();
	updatePuppyAge();

	// Atualizar idade do filhote a cada hora
	setInterval(updatePuppyAge, 3600000);
});

// === FUNÇÕES DE UI ===
function renderUI() {
	renderDashboard();
	renderTodayTraining();
	renderProgress();
	renderLibrary();
	renderBadges();
}

function renderDashboard() {
	const today = getTodayKey();
	const todayData = appState.dailyTraining[today] || {};
	const completed = Object.keys(todayData).filter((k) => todayData[k]).length;
	const total = TRAINING_EXERCISES.length;
	const percentage = Math.round((completed / total) * 100);

	document.getElementById("progressValue").textContent = `${percentage}%`;
	document.getElementById("miniProgress").style.width = `${percentage}%`;
	document.getElementById("streakValue").textContent = appState.streak;
	document.getElementById(
		"badgesValue"
	).textContent = `${appState.badges.length}/${BADGES.length}`;
	document.getElementById("totalSessions").textContent = appState.totalSessions;
}

function renderTodayTraining() {
	const today = getTodayKey();
	const todayData = appState.dailyTraining[today] || {};
	const list = document.getElementById("trainingList");
	list.innerHTML = "";

	TRAINING_EXERCISES.forEach((exercise) => {
		const isCompleted = todayData[exercise.id] || false;
		const item = document.createElement("div");
		item.className = `training-item ${isCompleted ? "completed" : ""}`;
		item.onclick = () => toggleTraining(exercise.id);

		item.innerHTML = `
            <div class="training-checkbox">
                ${
									isCompleted
										? '<svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" /></svg>'
										: ""
								}
            </div>
            <div class="training-info">
                <div class="training-name">${exercise.name}</div>
                <div class="training-meta">
                    <span>⏱️ ${exercise.duration}</span>
                    <span>📁 ${exercise.category}</span>
                </div>
                <div class="training-tags">
                    <span class="tag">${exercise.difficulty}</span>
                    <span class="tag">Fase ${exercise.phase}</span>
                </div>
            </div>
        `;

		list.appendChild(item);
	});
}

function renderProgress() {
	const today = getTodayKey();
	const todayData = appState.dailyTraining[today] || {};
	const completed = Object.keys(todayData).filter((k) => todayData[k]).length;
	const total = TRAINING_EXERCISES.length;
	const percentage = Math.round((completed / total) * 100);

	document.getElementById("weeklyProgress").style.width = `${percentage}%`;
	document.getElementById("weeklyProgressText").textContent = `${percentage}%`;
	document.getElementById("completedCount").textContent = completed;
	document.getElementById("totalTime").textContent = `${Math.round(
		(completed * 8) / 60
	)}h`;

	// Cálculo de melhoria (placeholder - implemente comparação com semana anterior)
	document.getElementById("improvement").textContent = "+15%";

	renderActivityCalendar();
}

function renderActivityCalendar() {
	const calendar = document.getElementById("activityCalendar");
	if (!calendar) return;

	calendar.innerHTML = "<p>Calendário de atividades será implementado aqui</p>";
	// TODO: Implementar visualização de calendário com histórico
}

function renderLibrary() {
	const grid = document.getElementById("libraryGrid");
	if (!grid) return;

	grid.innerHTML = "";

	LIBRARY_CONTENT.forEach((item) => {
		const card = document.createElement("div");
		card.className = "library-card";
		card.onclick = () => openLibraryItem(item);

		card.innerHTML = `
            <div class="library-image">${item.icon}</div>
            <div class="library-content">
                <h3 class="library-title">${item.title}</h3>
                <p class="library-description">${item.description}</p>
                <div class="library-footer">
                    <span class="library-duration">
                        <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        ${item.duration}
                    </span>
                    <span class="library-difficulty ${item.difficulty}">${item.difficulty}</span>
                </div>
            </div>
        `;

		grid.appendChild(card);
	});
}

function renderBadges() {
	const grid = document.getElementById("badgesGrid");
	if (!grid) return;

	grid.innerHTML = "";

	BADGES.forEach((badge) => {
		const isEarned = badge.requirement();
		const card = document.createElement("div");
		card.className = `badge-card ${isEarned ? "earned" : ""}`;

		card.innerHTML = `
            <div class="badge-icon">${badge.icon}</div>
            <h4 class="badge-name">${badge.name}</h4>
            <p class="badge-description">${badge.description}</p>
        `;

		grid.appendChild(card);
	});
}

// === AÇÕES DO USUÁRIO ===
function toggleTraining(exerciseId) {
	const today = getTodayKey();
	if (!appState.dailyTraining[today]) {
		appState.dailyTraining[today] = {};
	}

	appState.dailyTraining[today][exerciseId] =
		!appState.dailyTraining[today][exerciseId];

	// Incrementar sessões totais se completou
	if (appState.dailyTraining[today][exerciseId]) {
		appState.totalSessions++;
	} else {
		appState.totalSessions--;
	}

	calculateStreak();
	saveToLocalStorage();
	renderUI();

	if (CONFIG.AUTO_SAVE) {
		syncToServer();
	}
}

function switchTab(tabName) {
	// Remover active de todas as tabs
	document
		.querySelectorAll(".tab")
		.forEach((tab) => tab.classList.remove("active"));
	document
		.querySelectorAll(".tab-content")
		.forEach((content) => content.classList.remove("active"));

	// Adicionar active na tab clicada
	document.querySelector(`[data-tab="${tabName}"]`).classList.add("active");
	document.getElementById(`tab-${tabName}`).classList.add("active");
}

function openSettings() {
	const modal = document.getElementById("settingsModal");
	modal.classList.add("active");

	// Preencher dados atuais
	document.getElementById("dogName").value = appState.dogData.name;
	document.getElementById("dogBirthDate").value = appState.dogData.birthDate;

	appState.dogData.goals.forEach((goal) => {
		const checkbox = document.getElementById(`goal-${goal}`);
		if (checkbox) checkbox.checked = true;
	});
}

function closeSettings() {
	document.getElementById("settingsModal").classList.remove("active");
}

function saveSettings() {
	appState.dogData.name = document.getElementById("dogName").value;
	appState.dogData.birthDate = document.getElementById("dogBirthDate").value;

	appState.dogData.goals = [];
	["obedience", "herding", "tricks", "socialization"].forEach((goal) => {
		const checkbox = document.getElementById(`goal-${goal}`);
		if (checkbox && checkbox.checked) {
			appState.dogData.goals.push(goal);
		}
	});

	saveToLocalStorage();
	syncToServer();
	renderUI();
	updatePuppyAge();
	closeSettings();

	showNotification("Configurações salvas com sucesso!", "success");
}

function toggleDarkMode() {
	document.body.classList.toggle("dark-mode");
	const isDark = document.body.classList.contains("dark-mode");
	localStorage.setItem("darkMode", isDark);
}

function exportData() {
	const dataStr = JSON.stringify(appState, null, 2);
	const dataBlob = new Blob([dataStr], { type: "application/json" });
	const url = URL.createObjectURL(dataBlob);
	const link = document.createElement("a");
	link.href = url;
	link.download = `blue-heeler-progresso-${getTodayKey()}.json`;
	link.click();

	showNotification("Dados exportados com sucesso!", "success");
}

function addQuickNote() {
	const note = prompt("Adicionar nota sobre o treino de hoje:");
	if (note) {
		const today = getTodayKey();
		if (!appState.dailyTraining[today]) {
			appState.dailyTraining[today] = {};
		}
		appState.dailyTraining[today]._note = note;
		saveToLocalStorage();
		showNotification("Nota adicionada!", "success");
	}
}

function openLibraryItem(item) {
	// TODO: Implementar modal com conteúdo completo
	alert(
		`${item.title}\n\n${item.description}\n\nConteúdo completo será exibido em um modal.`
	);
}

// === UTILIDADES ===
function getTodayKey() {
	return new Date().toISOString().split("T")[0];
}

function calculateStreak() {
	const dates = Object.keys(appState.dailyTraining).sort().reverse();
	let streak = 0;
	const today = new Date();

	for (let i = 0; i < dates.length; i++) {
		const date = new Date(dates[i]);
		const expected = new Date(today);
		expected.setDate(expected.getDate() - i);

		if (
			date.toISOString().split("T")[0] === expected.toISOString().split("T")[0]
		) {
			const dayData = appState.dailyTraining[dates[i]];
			const hasCompletedAny = Object.keys(dayData).some(
				(k) => k !== "_note" && dayData[k]
			);
			if (hasCompletedAny) {
				streak++;
			} else {
				break;
			}
		} else {
			break;
		}
	}

	appState.streak = streak;
}

function updatePuppyAge() {
	const birthDate = new Date(appState.dogData.birthDate);
	const today = new Date();
	const diffTime = Math.abs(today - birthDate);
	const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
	const weeks = Math.floor(diffDays / 7);

	const nameEl = document.getElementById("puppyName");
	const ageEl = document.getElementById("puppyAge");
	const daysEl = document.getElementById("daysOld");

	if (nameEl) nameEl.textContent = appState.dogData.name;
	if (ageEl)
		ageEl.textContent = `${weeks} semanas • Período Crítico de Socialização`;
	if (daysEl) daysEl.textContent = `${diffDays} dias`;
}

function showNotification(message, type = "success") {
	const notification = document.createElement("div");
	notification.className = `notification ${type}`;
	notification.textContent = message;
	notification.style.cssText = `
        position: fixed;
        top: 90px;
        right: 20px;
        padding: 16px 24px;
        background: ${type === "success" ? "var(--success)" : "var(--danger)"};
        color: white;
        border-radius: var(--radius-lg);
        box-shadow: var(--shadow-xl);
        z-index: var(--z-toast);
        animation: slideIn 0.3s ease;
    `;

	document.body.appendChild(notification);

	setTimeout(() => {
		notification.style.animation = "slideOut 0.3s ease";
		setTimeout(() => notification.remove(), 300);
	}, 3000);
}

// === PERSISTÊNCIA LOCAL ===
function saveToLocalStorage() {
	try {
		localStorage.setItem("blue_heeler_data", JSON.stringify(appState));
		console.log("✅ Dados salvos localmente");
	} catch (error) {
		console.error("❌ Erro ao salvar localmente:", error);
	}
}

function loadFromLocalStorage() {
	try {
		const stored = localStorage.getItem("blue_heeler_data");
		if (stored) {
			appState = { ...appState, ...JSON.parse(stored) };
			console.log("✅ Dados carregados localmente");
		}

		// Dark mode
		const darkMode = localStorage.getItem("darkMode") === "true";
		if (darkMode) {
			document.body.classList.add("dark-mode");
		}
	} catch (error) {
		console.error("❌ Erro ao carregar dados:", error);
	}
}

// === SINCRONIZAÇÃO COM AZURE ===
async function syncToServer() {
	setSyncStatus("Sincronizando...", true);

	try {
		const response = await fetch(`${CONFIG.API_BASE_URL}/sync-data`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				deviceId: getDeviceId(),
				timestamp: new Date().toISOString(),
				data: appState,
			}),
		});

		if (response.ok) {
			appState.lastSync = new Date().toISOString();
			saveToLocalStorage();
			setSyncStatus("Sincronizado", false);
			console.log("✅ Sincronizado com servidor");
		} else {
			throw new Error("Erro na sincronização");
		}
	} catch (error) {
		console.error("❌ Erro ao sincronizar:", error);
		setSyncStatus("Modo Offline", false);
	}
}

async function loadFromServer() {
	setSyncStatus("Carregando...", true);

	try {
		const response = await fetch(`${CONFIG.API_BASE_URL}/load-data`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ deviceId: getDeviceId() }),
		});

		if (response.ok) {
			const result = await response.json();
			if (result.data) {
				appState = { ...appState, ...result.data };
				saveToLocalStorage();
				renderUI();
			}
			setSyncStatus("Sincronizado", false);
			console.log("✅ Dados carregados do servidor");
		}
	} catch (error) {
		console.error("❌ Erro ao carregar:", error);
		setSyncStatus("Modo Offline", false);
	}
}

function startAutoSync() {
	// Carregar dados do servidor ao iniciar
	loadFromServer();

	// Sincronizar periodicamente
	setInterval(() => {
		if (CONFIG.AUTO_SAVE) {
			syncToServer();
		}
	}, CONFIG.SYNC_INTERVAL);
}

function setSyncStatus(text, syncing = false) {
	const statusEl = document.getElementById("syncStatus");
	if (statusEl) {
		statusEl.querySelector("span").textContent = text;
		const indicator = statusEl.querySelector(".sync-indicator");
		if (syncing) {
			indicator.classList.add("syncing");
		} else {
			indicator.classList.remove("syncing");
		}
	}
}

function getDeviceId() {
	let deviceId = localStorage.getItem("device_id");
	if (!deviceId) {
		deviceId = "device_" + Math.random().toString(36).substr(2, 9) + Date.now();
		localStorage.setItem("device_id", deviceId);
	}
	return deviceId;
}

// === EXPORTS ===
window.toggleTraining = toggleTraining;
window.switchTab = switchTab;
window.openSettings = openSettings;
window.closeSettings = closeSettings;
window.saveSettings = saveSettings;
window.toggleDarkMode = toggleDarkMode;
window.exportData = exportData;
window.addQuickNote = addQuickNote;
