// Blue Heeler Trainer Pro v3.0
// Sistema completo com sincronização Azure

// Dados
let userData = {
	passwordHash: "",
	dog: { name: "", birthDate: "" },
	stats: {
		totalDays: 0,
		currentStreak: 0,
		bestStreak: 0,
		totalExercises: 0,
	},
	dailyTraining: {},
	badges: [],
	darkMode: false,
};

// Exercícios
const exercises = [
	{ id: "potty", emoji: "🚽", name: "Potty Training", time: "5 min" },
	{ id: "nome", emoji: "🎯", name: "Nome e Atenção", time: "5 min" },
	{ id: "exploracao", emoji: "🌳", name: "Exploração", time: "15 min" },
	{ id: "social", emoji: "👥", name: "Socialização", time: "10 min" },
	{ id: "sons", emoji: "🔊", name: "Habituação a Sons", time: "5 min" },
	{ id: "brincadeira", emoji: "🎾", name: "Brincadeira", time: "15 min" },
	{ id: "bite", emoji: "🦷", name: "Bite Inhibition", time: "10 min" },
	{ id: "handling", emoji: "✋", name: "Handling", time: "5 min" },
];

// Badges
const badges = [
	{
		id: "week1",
		emoji: "🏆",
		name: "Primeira Semana",
		condition: "streak >= 7",
	},
	{
		id: "social50",
		emoji: "🦋",
		name: "Social Butterfly",
		condition: "socializacoes >= 50",
	},
	{ id: "master", emoji: "⭐", name: "Master", condition: "exercicios >= 100" },
	{
		id: "commands",
		emoji: "🎓",
		name: "Comandos",
		condition: "comandos == true",
	},
	{ id: "recall", emoji: "🎯", name: "Recall", condition: "recall == true" },
	{ id: "gold30", emoji: "👑", name: "Ouro", condition: "streak >= 30" },
];

// Inicialização
document.addEventListener("DOMContentLoaded", () => {
	loadData();
	setupEventListeners();
	if (userData.passwordHash) {
		showApp();
	}
});

// Event Listeners
function setupEventListeners() {
	document.getElementById("loginForm").addEventListener("submit", handleLogin);
	document
		.getElementById("settingsBtn")
		.addEventListener("click", () => openModal("settingsModal"));
	document
		.getElementById("closeSettings")
		.addEventListener("click", () => closeModal("settingsModal"));
	document
		.getElementById("darkMode")
		.addEventListener("change", toggleDarkMode);
	document.getElementById("exportBtn").addEventListener("click", exportData);
	document.getElementById("logoutBtn").addEventListener("click", logout);

	// Tabs
	document.querySelectorAll(".tabs button").forEach((btn) => {
		btn.addEventListener("click", () => switchTab(btn.dataset.tab));
	});
}

// Login
function handleLogin(e) {
	e.preventDefault();
	const password = document.getElementById("password").value;
	userData.passwordHash = btoa(password); // Simple hash
	saveData();
	closeModal("loginModal");
	showApp();
}

// Show App
function showApp() {
	document.getElementById("loginModal").classList.remove("active");
	document.getElementById("app").classList.remove("hidden");
	renderDashboard();
	renderTraining();
	renderBadges();
	startAutoSync();
}

// Render Dashboard
function renderDashboard() {
	const today = getToday();
	const completed = userData.dailyTraining[today] || [];
	const progress = Math.round((completed.length / exercises.length) * 100);

	document.getElementById("progress").textContent = progress + "%";
	document.getElementById("streak").textContent = userData.stats.currentStreak;
	document.getElementById("badges").textContent = userData.badges.length;
	document.getElementById("days").textContent = userData.stats.totalDays;

	const fill = document.getElementById("progressFill");
	fill.style.width = progress + "%";
	fill.textContent = progress + "%";
}

// Render Training
function renderTraining() {
	const list = document.getElementById("trainingList");
	const today = getToday();
	const completed = userData.dailyTraining[today] || [];

	list.innerHTML = exercises
		.map(
			(ex) => `
<div class="training-item ${
				completed.includes(ex.id) ? "completed" : ""
			}" data-id="${ex.id}">
<div>
<div class="training-name">${ex.emoji} ${ex.name}</div>
<div class="training-time">${ex.time}</div>
</div>
<div class="training-checkbox ${
				completed.includes(ex.id) ? "checked" : ""
			}"></div>
</div>
`
		)
		.join("");

	// Event listeners
	list.querySelectorAll(".training-item").forEach((item) => {
		item.addEventListener("click", () => toggleExercise(item.dataset.id));
	});
}

// Toggle Exercise
function toggleExercise(id) {
	const today = getToday();
	if (!userData.dailyTraining[today]) {
		userData.dailyTraining[today] = [];
	}

	const idx = userData.dailyTraining[today].indexOf(id);
	if (idx > -1) {
		userData.dailyTraining[today].splice(idx, 1);
	} else {
		userData.dailyTraining[today].push(id);
		userData.stats.totalExercises++;
	}

	saveData();
	renderDashboard();
	renderTraining();
	checkBadges();
}

// Render Badges
function renderBadges() {
	const grid = document.getElementById("badgesGrid");
	grid.innerHTML = badges
		.map(
			(badge) => `
<div class="badge ${userData.badges.includes(badge.id) ? "earned" : ""}">
<div class="badge-emoji">${badge.emoji}</div>
<div class="badge-name">${badge.name}</div>
</div>
`
		)
		.join("");
}

// Check Badges
function checkBadges() {
	if (userData.stats.currentStreak >= 7 && !userData.badges.includes("week1")) {
		userData.badges.push("week1");
		renderBadges();
	}
	if (
		userData.stats.totalExercises >= 100 &&
		!userData.badges.includes("master")
	) {
		userData.badges.push("master");
		renderBadges();
	}
	if (
		userData.stats.currentStreak >= 30 &&
		!userData.badges.includes("gold30")
	) {
		userData.badges.push("gold30");
		renderBadges();
	}
}

// Switch Tab
function switchTab(tabId) {
	document
		.querySelectorAll(".tabs button")
		.forEach((btn) => btn.classList.remove("active"));
	document
		.querySelectorAll(".tab-content")
		.forEach((content) => content.classList.remove("active"));

	document
		.querySelector(`.tabs button[data-tab="${tabId}"]`)
		.classList.add("active");
	document.getElementById(tabId).classList.add("active");
}

// Dark Mode
function toggleDarkMode() {
	userData.darkMode = !userData.darkMode;
	document.body.classList.toggle("dark-mode", userData.darkMode);
	saveData();
}

// Modal
function openModal(id) {
	document.getElementById(id).classList.add("active");
}

function closeModal(id) {
	document.getElementById(id).classList.remove("active");
}

// Data Management
function saveData() {
	localStorage.setItem("blueHeelerData", JSON.stringify(userData));
}

function loadData() {
	const saved = localStorage.getItem("blueHeelerData");
	if (saved) {
		userData = JSON.parse(saved);
		if (userData.darkMode) {
			document.body.classList.add("dark-mode");
		}
	}
}

function exportData() {
	const json = JSON.stringify(userData, null, 2);
	const blob = new Blob([json], { type: "application/json" });
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = "blue-heeler-data.json";
	a.click();
}

function logout() {
	if (confirm("Tem certeza que deseja sair?")) {
		localStorage.clear();
		location.reload();
	}
}

// Auto Sync (Azure Cosmos DB)
function startAutoSync() {
	setInterval(() => {
		syncWithAzure();
	}, 30000); // 30 segundos
}

async function syncWithAzure() {
	try {
		// Substituir pela URL do Azure Function
		const response = await fetch("/api/sync", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(userData),
		});

		if (response.ok) {
			document.getElementById("syncStatus").textContent = "⚡ Sincronizado";
		}
	} catch (error) {
		console.log("Sync offline - usando localStorage");
		document.getElementById("syncStatus").textContent = "📴 Offline";
	}
}

// Utilities
function getToday() {
	return new Date().toISOString().split("T")[0];
}
