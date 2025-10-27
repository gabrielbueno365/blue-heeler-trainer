import StorageService from "./services/storageService.js";
import { runAssessment } from "./services/assessmentEngine.js";
import {
	generateDailyPlan,
	buildWeeklyOutlook,
	labLibrary,
	goalCatalog,
	calculateAgeInfo,
} from "./scripts/plan-engine.js";
import {
	enrichTasksWithLessons,
	getLessonDetail,
	buildLessonProgressMap,
} from "./services/lessonEngine.js";
import { generateSmartInsights } from "./services/behaviorAnalyzer.js";

const API_BASE_URL = "/api";
const LEVEL_STEP = 500;
const TASK_BASE_POINTS = 25;
const STORAGE_LAST_USER_KEY = "blueHeelerTrainer:lastUserId";

const DEFAULT_COUNTERS = {
	socialContacts: 0,
	newSurfaces: 0,
	soundAcclimation: 0,
	handling: 0,
	trainingSessions: 0,
	mentalGames: 0,
	calmResets: 0,
};

const DEFAULT_POTTY = {
	successes: 0,
	attempts: 0,
};

const GOAL_METADATA = goalCatalog.reduce((map, goal) => {
	map[goal.id] = goal;
	return map;
}, {});

const BADGES = {
	streak3: {
		icon: "🔥",
		name: "Streak 3",
		description: "3 dias seguidos treinando",
		criteria: (ctx) => ctx.currentStreak >= 3,
	},
	streak14: {
		icon: "🏆",
		name: "Streak 14",
		description: "14 dias sem falhar",
		criteria: (ctx) => ctx.currentStreak >= 14,
	},
	social50: {
		icon: "👥",
		name: "Social 50",
		description: "50 contatos registrados",
		criteria: (ctx) => ctx.counters.socialContacts >= 50,
	},
	mental150: {
		icon: "🧠",
		name: "Mente de Aço",
		description: "150 jogos mentais concluídos",
		criteria: (ctx) => ctx.counters.mentalGames >= 150,
	},
	pottyPro: {
		icon: "🎯",
		name: "Potty Pro",
		description: "Taxa de acerto 90%+",
		criteria: (ctx) => ctx.pottyRate >= 90 && ctx.pottyAttempts >= 30,
	},
	perfectFive: {
		icon: "💯",
		name: "Dias Perfeitos",
		description: "5 dias concluídos 100%",
		criteria: (ctx) => ctx.perfectDays >= 5,
	},
};

function deepClone(value) {
	return JSON.parse(JSON.stringify(value));
}

function createCounters(overrides = {}) {
	return { ...DEFAULT_COUNTERS, ...overrides };
}

function createPotty(overrides = {}) {
	return { ...DEFAULT_POTTY, ...overrides };
}

function formatDateKey(date = new Date()) {
	return new Date(date).toISOString().split("T")[0];
}

function toTitle(text) {
	return text.charAt(0).toUpperCase() + text.slice(1);
}

function safePercent(part, total) {
	if (!total) {
		return 0;
	}
	return Math.round((part / total) * 100);
}

class BlueHeelerApp {
	constructor() {
		this.storage = new StorageService(API_BASE_URL);
		this.state = this.createEmptyState();
		this.charts = {};
		this.currentScreen = "dashboard";
		this.onboardingStep = 0;
		this.featuredLessonId = null;
		this.toastTimers = [];

		this.setupEventListeners();
		this.bootstrap();
	}

	createEmptyState(userId = null) {
		return {
			userId,
			isAuthenticated: false,
			onboardingComplete: false,
			profile: {
				dogName: "",
				birthDate: "",
				sex: "",
				weightKg: "",
				coat: "",
				breederType: "",
			},
			temperament: {
				energy: 3,
				sensitivity: 3,
				independence: 3,
				herdingDrive: 4,
				notes: "",
				archetype: "equilibrado",
				description: "",
			},
			routine: {
				homeType: "casa",
				hasOutdoor: true,
				hasOtherPets: "nenhum",
				timePerDayMinutes: 90,
				workSchedule: "regular",
				supportNetwork: "solo",
				preferredSlots: null,
			},
			goals: [],
			challenges: {},
			focusNotes: "",
			availability: {
				morning: true,
				afternoon: true,
				evening: true,
			},
			plan: {
				phase: null,
				mission: "",
				focusAreas: [],
				riskFlags: [],
				metricsTargets: {
					counters: createCounters(),
					potty: {
						targetSuccessRate: 0,
						scheduledBreaks: 0,
					},
				},
				weeklyOutlook: [],
			},
			points: 0,
			level: 1,
			streak: {
				current: 0,
				best: 0,
				lastActiveDate: null,
			},
			stats: {
				totalDaysTracked: 0,
			},
			today: {
				dateKey: formatDateKey(),
			},
			logs: {},
			badgesUnlocked: [],
			knowledgeUnlocked: [],
			session: {
				timerSeconds: 0,
				timerInterval: null,
			},
		};
	}

	hydrateState(rawState = {}, userId) {
		const base = this.createEmptyState(userId);
		const state = {
			...base,
			...rawState,
			userId,
		};

		state.profile = { ...base.profile, ...(rawState.profile || {}) };
		state.temperament = {
			...base.temperament,
			...(rawState.temperament || {}),
		};
		state.routine = { ...base.routine, ...(rawState.routine || {}) };
		state.plan = { ...base.plan, ...(rawState.plan || {}) };
		state.plan.metricsTargets = {
			counters: createCounters(rawState.plan?.metricsTargets?.counters || {}),
			potty: {
				...base.plan.metricsTargets.potty,
				...(rawState.plan?.metricsTargets?.potty || {}),
			},
		};
		state.availability = {
			...base.availability,
			...(rawState.availability || {}),
		};
		state.stats = { ...base.stats, ...(rawState.stats || {}) };
		state.streak = { ...base.streak, ...(rawState.streak || {}) };
		state.today = { ...base.today, ...(rawState.today || {}) };
		state.badgesUnlocked = Array.isArray(rawState.badgesUnlocked)
			? Array.from(new Set(rawState.badgesUnlocked))
			: [];
		state.knowledgeUnlocked = Array.isArray(rawState.knowledgeUnlocked)
			? rawState.knowledgeUnlocked
			: [];
		state.logs = rawState.logs ? deepClone(rawState.logs) : {};

		Object.entries(state.logs).forEach(([dateKey, log]) => {
			if (!log.metrics) {
				log.metrics = { counters: createCounters(), potty: createPotty() };
			} else {
				log.metrics.counters = createCounters(log.metrics.counters || {});
				log.metrics.potty = createPotty(log.metrics.potty || {});
			}
			log.tasks = log.tasks ? deepClone(log.tasks) : {};
			Object.values(log.tasks).forEach((task) => {
				task.completed = Boolean(task.completed);
				task.rewardedPoints = task.rewardedPoints || 0;
			});
		});

		if (!state.today?.dateKey) {
			state.today = { ...state.today, dateKey: formatDateKey() };
		}

		return state;
	}

	setupEventListeners() {
		const loginButton = document.getElementById("loginButton");
		if (loginButton) {
			loginButton.addEventListener("click", () => this.handleLogin());
		}

		const loginPassword = document.getElementById("loginPassword");
		if (loginPassword) {
			loginPassword.addEventListener("keypress", (event) => {
				if (event.key === "Enter") {
					this.handleLogin();
				}
			});
		}

		const onboardingForm = document.getElementById("onboardingForm");
		if (onboardingForm) {
			onboardingForm.addEventListener("submit", (event) => {
				event.preventDefault();
				this.completeOnboarding();
			});

			onboardingForm.addEventListener("click", (event) => {
				const actionButton = event.target.closest("button[data-action]");
				if (!actionButton) {
					return;
				}
				event.preventDefault();
				const action = actionButton.dataset.action;
				if (action === "next") {
					this.advanceOnboardingStep(1);
				} else if (action === "prev") {
					this.advanceOnboardingStep(-1);
				}
			});
		}

		const birthInput = document.getElementById("dogBirthDate");
		if (birthInput) {
			birthInput.addEventListener("change", () => this.updateAgePreview());
		}

		document.addEventListener("click", (event) => {
			const goalCard = event.target.closest(".goal-card");
			if (goalCard) {
				goalCard.classList.toggle("selected");
			}
		});

		document.querySelectorAll(".nav-item").forEach((item) => {
			item.addEventListener("click", () => {
				const targetScreen = item.dataset.screen;
				if (targetScreen) {
					this.showScreen(targetScreen);
				}
			});
		});

		const tasksContainer = document.getElementById("tasksContainer");
		if (tasksContainer) {
			tasksContainer.addEventListener("click", (event) => {
				const button = event.target.closest("button[data-action]");
				if (!button) {
					return;
				}
				const taskCard = button.closest(".task-card");
				if (!taskCard) {
					return;
				}
				const taskId = taskCard.dataset.taskId;
				if (!taskId) {
					return;
				}
				const action = button.dataset.action;
				if (action === "toggle-task") {
					this.toggleTaskCompletion(taskId);
				} else if (action === "open-lesson") {
					const lessonId = button.dataset.lessonId;
					if (lessonId) {
						this.openLessonModal(lessonId);
					}
				}
			});
		}

		const metricsSection = document.querySelector(".metrics-section");
		if (metricsSection) {
			metricsSection.addEventListener("click", (event) => {
				const control = event.target.closest("button[data-action]");
				if (!control) {
					return;
				}
				const card = control.closest(".metric-card");
				if (!card) {
					return;
				}
				const metricKey = card.dataset.metric;
				if (!metricKey) {
					return;
				}
				if (control.dataset.action === "increment") {
					this.updateMetric(metricKey, 1);
				} else if (control.dataset.action === "decrement") {
					this.updateMetric(metricKey, -1);
				}
			});
		}

		const pottySuccessBtn = document.getElementById("pottySuccessBtn");
		if (pottySuccessBtn) {
			pottySuccessBtn.addEventListener("click", () =>
				this.recordPottyEvent(true)
			);
		}
		const pottyAccidentBtn = document.getElementById("pottyAccidentBtn");
		if (pottyAccidentBtn) {
			pottyAccidentBtn.addEventListener("click", () =>
				this.recordPottyEvent(false)
			);
		}

		const refreshWeeklyButton = document.getElementById("refreshWeeklyButton");
		if (refreshWeeklyButton) {
			refreshWeeklyButton.addEventListener("click", () =>
				this.refreshWeeklyPlan()
			);
		}

		const featuredLessonButton = document.getElementById("openFeaturedLesson");
		if (featuredLessonButton) {
			featuredLessonButton.addEventListener("click", () => {
				if (this.featuredLessonId) {
					this.openLessonModal(this.featuredLessonId);
				}
			});
		}

		const lessonModalClose = document.getElementById("lessonModalClose");
		if (lessonModalClose) {
			lessonModalClose.addEventListener("click", () => this.closeLessonModal());
		}

		const celebrationClose = document.getElementById("celebrationClose");
		if (celebrationClose) {
			celebrationClose.addEventListener("click", () => this.closeCelebration());
		}

		const exportDataButton = document.getElementById("exportDataButton");
		if (exportDataButton) {
			exportDataButton.addEventListener("click", () => this.exportData());
		}

		const logoutButton = document.getElementById("logoutButton");
		if (logoutButton) {
			logoutButton.addEventListener("click", () => this.logout());
		}

		const clickerButton = document.getElementById("clickerButton");
		if (clickerButton) {
			clickerButton.addEventListener("click", () =>
				this.playFeedback("clicker")
			);
		}

		const whistleButton = document.getElementById("whistleButton");
		if (whistleButton) {
			whistleButton.addEventListener("click", () =>
				this.playFeedback("whistle")
			);
		}

		const timerStart = document.getElementById("timerStart");
		if (timerStart) {
			timerStart.addEventListener("click", () => this.startSessionTimer());
		}
		const timerStop = document.getElementById("timerStop");
		if (timerStop) {
			timerStop.addEventListener("click", () => this.stopSessionTimer());
		}

		const openChecklist = document.getElementById("openChecklist");
		if (openChecklist) {
			openChecklist.addEventListener("click", () => this.showChecklistHint());
		}
	}

	async bootstrap() {
		await new Promise((resolve) => setTimeout(resolve, 600));
		this.toggleScreenVisibility("loadingScreen", false);

		const lastUserId = this.safeLocalStorage("getItem", STORAGE_LAST_USER_KEY);
		if (lastUserId) {
			const passwordField = document.getElementById("loginPassword");
			if (passwordField) {
				passwordField.placeholder = "Digite a senha da sua conta premium";
			}
		}

		this.toggleScreenVisibility("loginScreen", true);
	}

	toggleScreenVisibility(screenId, show) {
		const element = document.getElementById(screenId);
		if (!element) {
			return;
		}
		if (show) {
			element.classList.remove("hidden");
		} else {
			element.classList.add("hidden");
		}
	}

	safeLocalStorage(action, key, value) {
		try {
			if (typeof window === "undefined" || !window.localStorage) {
				return null;
			}
			if (action === "getItem") {
				return window.localStorage.getItem(key);
			}
			if (action === "setItem") {
				window.localStorage.setItem(key, value);
			}
			if (action === "removeItem") {
				window.localStorage.removeItem(key);
			}
		} catch (error) {
			console.warn("localStorage unavailable", error);
		}
		return null;
	}

	async handleLogin() {
		const passwordInput = document.getElementById("loginPassword");
		if (!passwordInput) {
			return;
		}
		const rawPassword = passwordInput.value.trim();
		if (!rawPassword) {
			this.showToast("Digite uma senha para acessar seu plano", "error");
			return;
		}

		const userId = rawPassword.toLowerCase();
		this.toggleScreenVisibility("loginScreen", false);
		this.toggleScreenVisibility("loadingScreen", true);

		let storedState = null;
		try {
			storedState = await this.storage.load(userId);
		} catch (error) {
			console.warn("Failed to load user data", error);
		}

		if (storedState) {
			this.state = this.hydrateState(storedState, userId);
			this.state.isAuthenticated = true;
		} else {
			this.state = this.createEmptyState(userId);
			this.state.isAuthenticated = true;
		}

		this.safeLocalStorage("setItem", STORAGE_LAST_USER_KEY, userId);

		await new Promise((resolve) => setTimeout(resolve, 400));
		this.toggleScreenVisibility("loadingScreen", false);

		if (!this.state.onboardingComplete) {
			this.resetOnboardingForm();
			this.toggleScreenVisibility("onboardingScreen", true);
		} else {
			await this.postLoginBootstrap();
			this.showMainApp();
		}
	}

	async postLoginBootstrap() {
		this.ensureTodayContext();
		this.renderAll();
		await this.persistState();
	}

	resetOnboardingForm() {
		this.onboardingStep = 0;
		document.querySelectorAll(".onboarding-step").forEach((step, index) => {
			if (index === 0) {
				step.classList.remove("hidden");
			} else {
				step.classList.add("hidden");
			}
		});
		const form = document.getElementById("onboardingForm");
		if (form) {
			form.reset();
		}
		this.updateAgePreview();
	}

	advanceOnboardingStep(delta) {
		const steps = Array.from(document.querySelectorAll(".onboarding-step"));
		const newIndex = Math.min(
			Math.max(this.onboardingStep + delta, 0),
			steps.length - 1
		);
		if (newIndex === this.onboardingStep) {
			return;
		}
		steps.forEach((step, index) => {
			if (index === newIndex) {
				step.classList.remove("hidden");
			} else {
				step.classList.add("hidden");
			}
		});
		this.onboardingStep = newIndex;
	}

	collectOnboardingData() {
		const selectedGoals = Array.from(
			document.querySelectorAll(".goal-card.selected")
		)
			.map((card) => card.dataset.goal)
			.filter(Boolean);

		const challenges = {
			nipping: document.getElementById("challengeNipping")?.checked || false,
			toiletAccidents:
				document.getElementById("challengeToilet")?.checked || false,
			recallIssues:
				document.getElementById("challengeRecall")?.checked || false,
			jump: document.getElementById("challengeJump")?.checked || false,
		};

		return {
			dog: {
				dogName: document.getElementById("dogName")?.value.trim() || "",
				birthDate: document.getElementById("dogBirthDate")?.value || "",
				sex: document.getElementById("dogSex")?.value || "",
				weightKg: document.getElementById("dogWeight")?.value || "",
				coat: document.getElementById("dogCoat")?.value.trim() || "",
				breederType: document.getElementById("breederType")?.value || "",
			},
			temperament: {
				energyLevel: document.getElementById("temperamentEnergy")?.value || "3",
				sensitivity:
					document.getElementById("temperamentSensitivity")?.value || "3",
				independence:
					document.getElementById("temperamentIndependence")?.value || "3",
				herdingDrive:
					document.getElementById("temperamentHerding")?.value || "4",
				notes: document.getElementById("temperamentNotes")?.value.trim() || "",
			},
			routine: {
				homeType: document.getElementById("homeType")?.value || "casa",
				hasOutdoor: document.getElementById("hasOutdoor")?.value === "true",
				hasOtherPets:
					document.getElementById("hasOtherPets")?.value || "nenhum",
				timePerDayMinutes: Number(
					document.getElementById("timePerDay")?.value || 90
				),
				workSchedule:
					document.getElementById("workSchedule")?.value || "regular",
				supportNetwork:
					document.getElementById("supportNetwork")?.value || "solo",
			},
			goals: selectedGoals,
			challenges,
			focusNotes: document.getElementById("focusNotes")?.value.trim() || "",
		};
	}

	async completeOnboarding() {
		const onboardingData = this.collectOnboardingData();
		if (!onboardingData.dog.dogName) {
			this.showToast("Informe o nome do seu Blue Heeler", "error");
			return;
		}
		if (!onboardingData.dog.birthDate) {
			this.showToast(
				"Defina a data de nascimento para calibrar o plano",
				"error"
			);
			return;
		}
		if (!onboardingData.goals.length) {
			this.showToast("Selecione pelo menos um objetivo prioritário", "error");
			return;
		}

		this.toggleScreenVisibility("onboardingScreen", false);
		this.toggleScreenVisibility("loadingScreen", true);

		let assessment;
		try {
			assessment = runAssessment({
				dog: {
					birthDate: onboardingData.dog.birthDate,
				},
				temperament: onboardingData.temperament,
				routine: onboardingData.routine,
				goals: onboardingData.goals,
				challenges: onboardingData.challenges,
				focusNotes: onboardingData.focusNotes,
			});
		} catch (error) {
			console.error("Assessment failed", error);
			this.showToast(
				"Não foi possível gerar o plano. Tente novamente.",
				"error"
			);
			this.toggleScreenVisibility("loadingScreen", false);
			this.toggleScreenVisibility("onboardingScreen", true);
			return;
		}

		this.state.onboardingComplete = true;
		this.state.profile = {
			dogName: onboardingData.dog.dogName,
			birthDate: onboardingData.dog.birthDate,
			sex: onboardingData.dog.sex,
			weightKg: onboardingData.dog.weightKg,
			coat: onboardingData.dog.coat,
			breederType: onboardingData.dog.breederType,
		};
		this.state.temperament = {
			energy: assessment.temperament.energy,
			sensitivity: assessment.temperament.sensitivity,
			independence: assessment.temperament.independence,
			herdingDrive: assessment.temperament.herdingDrive,
			archetype: assessment.temperament.archetype,
			description: assessment.temperament.description,
			notes: onboardingData.temperament.notes,
		};
		this.state.routine = onboardingData.routine;
		this.state.goals = assessment.goals;
		this.state.challenges = onboardingData.challenges;
		this.state.focusNotes = onboardingData.focusNotes;
		this.state.availability = assessment.availability;

		this.state.plan = {
			phase: assessment.phase,
			mission: assessment.mission,
			focusAreas: assessment.focusAreas,
			riskFlags: assessment.riskFlags,
			metricsTargets: assessment.metricsTargets,
			weeklyOutlook: assessment.weeklyOutlook,
			ageInfo: assessment.ageInfo,
		};

		this.ensureTodayContext(assessment.recommendedTasks);
		await this.persistState();

		this.toggleScreenVisibility("loadingScreen", false);
		this.showCelebration(
			"🎉",
			"Plano criado!",
			"Seu treino premium está pronto."
		);
		this.showMainApp();
		this.renderAll();
	}

	ensureTodayContext(prefetchedTasks = null) {
		const todayKey = formatDateKey();
		const lastActive = this.state.streak.lastActiveDate;

		if (lastActive !== todayKey) {
			if (lastActive) {
				const yesterday = formatDateKey(new Date(Date.now() - 86_400_000));
				if (lastActive === yesterday) {
					this.state.streak.current += 1;
				} else {
					this.state.streak.best = Math.max(
						this.state.streak.best,
						this.state.streak.current
					);
					this.state.streak.current = 0;
				}
			}
			this.state.streak.lastActiveDate = todayKey;
			this.state.stats.totalDaysTracked += 1;
		}

		this.state.today.dateKey = todayKey;

		const dailyPlan = prefetchedTasks
			? {
					tasks: prefetchedTasks,
					metricsTargets: this.state.plan.metricsTargets,
					mission: this.state.plan.mission,
			  }
			: generateDailyPlan({
					date: new Date(),
					birthDate: this.state.profile.birthDate,
					goals: this.state.goals,
					availability: this.state.availability,
					focusNotes: this.state.focusNotes,
			  });

		if (!prefetchedTasks) {
			this.state.plan.metricsTargets = dailyPlan.metricsTargets;
			this.state.plan.mission = dailyPlan.mission;
			this.state.plan.phase = dailyPlan.phase;
			this.state.plan.phaseId = dailyPlan.phaseId;
			this.state.plan.phaseName = dailyPlan.phaseName;
			this.state.plan.highlights = dailyPlan.highlights;
			this.state.plan.ageInfo = dailyPlan.ageInfo;
		}

		const enrichedTasks = enrichTasksWithLessons(dailyPlan.tasks || []);
		this.ensureDailyLog(todayKey, enrichedTasks);
		this.state.plan.weeklyOutlook = buildWeeklyOutlook({
			birthDate: this.state.profile.birthDate,
			goals: this.state.goals,
			availability: this.state.availability,
			focusNotes: this.state.focusNotes,
		});

		this.featuredLessonId =
			enrichedTasks.find((task) => task.lessonId)?.lessonId || null;
	}

	ensureDailyLog(dateKey, tasks) {
		const existingLog = this.state.logs[dateKey];
		if (!existingLog) {
			this.state.logs[dateKey] = {
				metrics: {
					counters: createCounters(),
					potty: createPotty(),
				},
				tasks: {},
				createdAt: new Date().toISOString(),
			};
		}

		const log = this.state.logs[dateKey];
		const newTasks = {};
		tasks.forEach((task) => {
			const previousTask = log.tasks[task.id];
			newTasks[task.id] = {
				id: task.id,
				baseId: task.baseId,
				title: task.title,
				description: task.description,
				duration: task.duration || "10 min",
				points: task.points || TASK_BASE_POINTS,
				category: task.category || "Rotina",
				timeOfDay: task.timeOfDay || "flex",
				lessonId: task.lessonId || null,
				lessonSummary: task.lessonSummary || null,
				completed: previousTask ? Boolean(previousTask.completed) : false,
			};
		});
		log.tasks = newTasks;
	}

	async persistState() {
		if (!this.state.userId) {
			return;
		}
		try {
			await this.storage.save(this.state.userId, deepClone(this.state));
		} catch (error) {
			console.warn("Persist failed", error);
		}
	}

	showMainApp() {
		this.toggleScreenVisibility("mainApp", true);
		this.showScreen("dashboard");
		this.renderAll();
	}

	showScreen(screenName) {
		document.querySelectorAll(".nav-item").forEach((item) => {
			if (item.dataset.screen === screenName) {
				item.classList.add("active");
			} else {
				item.classList.remove("active");
			}
		});

		document.querySelectorAll(".app-screen").forEach((screen) => {
			if (screen.id === `${screenName}Screen`) {
				screen.classList.remove("hidden");
			} else {
				screen.classList.add("hidden");
			}
		});

		this.currentScreen = screenName;
		this.renderScreen(screenName);
	}

	renderAll() {
		this.renderScreen("dashboard");
		this.renderScreen("training");
		this.renderScreen("insights");
		this.renderScreen("badges");
		this.renderScreen("profile");
	}

	renderScreen(screenName) {
		switch (screenName) {
			case "dashboard":
				this.renderDashboard();
				break;
			case "training":
				this.renderTraining();
				break;
			case "insights":
				this.renderInsights();
				break;
			case "badges":
				this.renderBadges();
				break;
			case "profile":
				this.renderProfile();
				break;
			default:
				break;
		}
	}

	getStatsSnapshot() {
		const counters = createCounters();
		const pottyTotals = { successes: 0, attempts: 0 };
		let totalCompletedTasks = 0;
		let totalTasks = 0;
		let perfectDays = 0;
		const logsEntries = Object.entries(this.state.logs);

		logsEntries.forEach(([, log]) => {
			Object.entries(log.metrics?.counters || {}).forEach(([key, value]) => {
				counters[key] = (counters[key] || 0) + (value || 0);
			});
			pottyTotals.successes += log.metrics?.potty?.successes || 0;
			pottyTotals.attempts += log.metrics?.potty?.attempts || 0;

			const taskList = Object.values(log.tasks || {});
			const completedCount = taskList.filter((task) => task.completed).length;
			if (taskList.length) {
				totalTasks += taskList.length;
				totalCompletedTasks += completedCount;
				if (completedCount === taskList.length) {
					perfectDays += 1;
				}
			}
		});

		const weekly = this.buildWeeklyHistory(7);

		return {
			counters,
			pottyTotals,
			pottyRate: safePercent(pottyTotals.successes, pottyTotals.attempts),
			pottyAttempts: pottyTotals.attempts,
			totalCompletedTasks,
			totalTasks,
			perfectDays,
			weekly,
		};
	}

	buildWeeklyHistory(days) {
		const history = [];
		for (let i = days - 1; i >= 0; i -= 1) {
			const date = new Date();
			date.setDate(date.getDate() - i);
			const dateKey = formatDateKey(date);
			const log = this.state.logs[dateKey];
			const tasks = Object.values(log?.tasks || {});
			history.push({
				dateKey,
				completed: tasks.filter((task) => task.completed).length,
				total: tasks.length,
				metrics: log?.metrics,
			});
		}
		return history;
	}

	renderDashboard() {
		const stats = this.getStatsSnapshot();
		const dogName = this.state.profile.dogName || "Seu Blue Heeler";
		const ageInfo = calculateAgeInfo(this.state.profile.birthDate);

		const dogSummary = document.getElementById("dogSummary");
		if (dogSummary) {
			const ageText = ageInfo.valid
				? ageInfo.humanReadable
				: "idade a atualizar";
			dogSummary.textContent = `${dogName} • ${ageText}`;
		}

		const phasePill = document.getElementById("phasePill");
		if (phasePill) {
			phasePill.textContent =
				this.state.plan.phase?.name || "Fase personalizada";
		}

		const levelElement = document.getElementById("userLevel");
		if (levelElement) {
			levelElement.textContent = this.state.level;
		}

		this.updateProgressRing("streakDays", this.state.streak.current, 30);
		this.updateProgressRing(
			"totalPoints",
			this.state.points,
			(this.state.level || 1) * LEVEL_STEP
		);
		this.updateProgressRing(
			"badgesEarned",
			this.state.badgesUnlocked.length,
			Object.keys(BADGES).length
		);

		const weeklyHistory = stats.weekly;
		const completedSum = weeklyHistory.reduce(
			(sum, day) => sum + day.completed,
			0
		);
		const totalSum = weeklyHistory.reduce((sum, day) => sum + day.total, 0);
		const completionRate = safePercent(completedSum, totalSum);
		this.updateProgressRing("completionRate", completionRate, 100);

		const pointsToNext = document.getElementById("pointsToNextLevel");
		if (pointsToNext) {
			const nextLevelPoints =
				(Math.floor(this.state.points / LEVEL_STEP) + 1) * LEVEL_STEP;
			pointsToNext.textContent = `${
				nextLevelPoints - this.state.points
			} até o próximo nível`;
		}

		const quickMetrics = {
			socialCount: stats.counters.socialContacts,
			pottySuccessRate: `${stats.pottyRate}%`,
			mentalGamesCount: stats.counters.mentalGames,
			avgSessionTime: `${Math.max(
				10,
				Math.round(
					(stats.counters.trainingSessions /
						Math.max(this.state.stats.totalDaysTracked, 1)) *
						15
				)
			)}m`,
		};
		Object.entries(quickMetrics).forEach(([id, value]) => {
			const element = document.getElementById(id);
			if (element) {
				element.textContent = value;
			}
		});

		const missionTitle = document.getElementById("missionTitle");
		if (missionTitle) {
			missionTitle.textContent =
				this.state.plan.mission ||
				"Estruture o dia para manter foco e contenção.";
		}

		const missionList = document.getElementById("missionFocus");
		if (missionList) {
			const focuses =
				this.state.plan.focusAreas?.slice(0, 3) ||
				this.state.plan.highlights ||
				[];
			if (focuses.length) {
				missionList.innerHTML = focuses
					.map((focus) => `<li>${focus}</li>`)
					.join("");
			} else {
				missionList.innerHTML =
					"<li>Finalize as três tarefas de maior impacto.</li>";
			}
		}

		const streakSubtitle = document.getElementById("streakSubtitle");
		if (streakSubtitle) {
			if (this.state.streak.current) {
				streakSubtitle.textContent = `Sequência ativa há ${this.state.streak.current} dias`;
			} else {
				streakSubtitle.textContent = "Comece hoje para ativar o streak";
			}
		}

		const planPhaseLabel = document.getElementById("planPhaseLabel");
		if (planPhaseLabel) {
			planPhaseLabel.textContent = this.state.plan.phase?.name || "Fase ativa";
		}
		const planAgeLabel = document.getElementById("planAgeLabel");
		if (planAgeLabel) {
			planAgeLabel.textContent = ageInfo.valid
				? ageInfo.humanReadable
				: "Defina a idade";
		}

		const riskSection = document.getElementById("riskSection");
		const riskList = document.getElementById("riskList");
		if (riskSection && riskList) {
			const risks = this.state.plan.riskFlags || [];
			if (risks.length) {
				riskSection.classList.remove("hidden");
				riskList.innerHTML = risks
					.map((risk) => `<li class="risk-item">${risk}</li>`)
					.join("");
			} else {
				riskSection.classList.add("hidden");
				riskList.innerHTML = "";
			}
		}

		this.renderWeeklyOutlook();
		this.renderFeaturedLesson();
		this.renderKnowledgeLibrary();
		this.renderRecommendations(stats);
	}

	updateProgressRing(elementId, value, max) {
		const element = document.getElementById(elementId);
		if (!element) {
			return;
		}
		const progressRing = element.closest(".progress-ring");
		const circle = progressRing?.querySelector(".progress-ring-circle");
		element.textContent = Math.min(Math.round(value || 0), 999);
		if (circle) {
			const percentage = Math.min(max ? (value / max) * 100 : 0, 100);
			const circumference = 251.2;
			const offset = circumference - (percentage / 100) * circumference;
			circle.style.strokeDashoffset = `${offset}`;
		}
	}

	renderWeeklyOutlook() {
		const container = document.getElementById("weeklyOutlook");
		if (!container) {
			return;
		}
		const outlook = this.state.plan.weeklyOutlook || [];
		if (!outlook.length) {
			container.innerHTML = `<div class="weekly-card">Gere seu plano para visualizar a semana.</div>`;
			return;
		}
		container.innerHTML = outlook
			.map((day) => {
				const focus = (day.focus || [])
					.map((item) => `<span>${item}</span>`)
					.join(" · ");
				const tasks = (day.topTasks || [])
					.map((task) => `<li>${task}</li>`)
					.join("");
				return `
          <div class="weekly-card">
            <strong>${day.weekday?.toUpperCase() || "Dia"}</strong>
            <span class="weekly-tags">${
							focus || "Missão manter consistência"
						}</span>
            <ul>${tasks}</ul>
          </div>
        `;
			})
			.join("");
	}

	renderFeaturedLesson() {
		const title = document.getElementById("featuredLessonTitle");
		const summary = document.getElementById("featuredLessonSummary");
		if (!title || !summary) {
			return;
		}
		if (!this.featuredLessonId) {
			title.textContent = "Explore o módulo de controle de mordidas";
			summary.textContent =
				"Complete as tarefas relacionadas em seu plano diário para desbloquear a lição completa.";
			return;
		}
		const lesson = getLessonDetail(this.featuredLessonId);
		if (!lesson) {
			return;
		}
		title.textContent = lesson.title;
		summary.textContent = lesson.summary;
	}

	renderKnowledgeLibrary() {
		const container = document.getElementById("knowledgeLibrary");
		if (!container) {
			return;
		}
		container.innerHTML = labLibrary
			.map(
				(entry) => `
          <article class="knowledge-card">
            <h3>${entry.title}</h3>
            <p>${entry.summary}</p>
            <ul>${entry.bullets
							.slice(0, 3)
							.map((item) => `<li>${item}</li>`)
							.join("")}</ul>
            <small>Referência: ${entry.reference}</small>
          </article>
        `
			)
			.join("");
	}

	renderRecommendations(stats) {
		const container = document.getElementById("recommendationsContainer");
		if (!container) {
			return;
		}
		const recommendations = [];

		if (this.state.streak.current === 0) {
			recommendations.push({
				icon: "🔥",
				title: "Ative o streak",
				description:
					"Complete ao menos uma tarefa hoje para destravar multiplicadores de pontos.",
			});
		} else if (this.state.streak.current >= 7) {
			recommendations.push({
				icon: "💪",
				title: "Streak lendário",
				description: `Você já soma ${this.state.streak.current} dias seguidos. Proteja essa sequência!`,
			});
		}

		const pottyRate = stats.pottyRate;
		if (pottyRate && pottyRate < 80) {
			recommendations.push({
				icon: "🚽",
				title: "Refine o potty",
				description:
					"Aumente a cadência de saídas e anote sinais prévios para subir acima de 85%.",
			});
		}

		if (stats.counters.mentalGames < 10) {
			recommendations.push({
				icon: "🧠",
				title: "Mais jogos mentais",
				description:
					"Blue Heelers brilham com puzzles diários. Agende pelo menos 2 sessões extras esta semana.",
			});
		}

		if (!recommendations.length) {
			recommendations.push({
				icon: "✨",
				title: "Plano equilibrado",
				description: "Continue exatamente como está — consistência impecável!",
			});
		}

		container.innerHTML = recommendations
			.map(
				(item) => `
          <div class="recommendation-card">
            <span class="recommendation-icon">${item.icon}</span>
            <div>
              <h4>${item.title}</h4>
              <p>${item.description}</p>
            </div>
          </div>
        `
			)
			.join("");
	}

	renderTraining() {
		const today = new Date();
		const dateLabel = document.getElementById("todayDate");
		if (dateLabel) {
			dateLabel.textContent = today.toLocaleDateString("pt-BR", {
				weekday: "long",
				day: "numeric",
				month: "long",
			});
		}

		const log = this.state.logs[this.state.today.dateKey];
		const tasks = Object.values(log?.tasks || {});

		const completedCount = tasks.filter((task) => task.completed).length;
		const totalTasks = tasks.length;
		const progress = totalTasks
			? Math.round((completedCount / totalTasks) * 100)
			: 0;

		const progressBar = document.getElementById("dailyProgressBar");
		if (progressBar) {
			progressBar.style.width = `${progress}%`;
		}
		const completedLabel = document.getElementById("completedTasks");
		if (completedLabel) {
			completedLabel.textContent = completedCount;
		}
		const totalLabel = document.getElementById("totalTasks");
		if (totalLabel) {
			totalLabel.textContent = totalTasks;
		}

		const tasksContainer = document.getElementById("tasksContainer");
		if (tasksContainer) {
			if (!tasks.length) {
				tasksContainer.innerHTML = `<div class="task-card">Nenhuma tarefa encontrada. Recalcule o plano.</div>`;
			} else {
				tasksContainer.innerHTML = tasks
					.map((task) => {
						const lessonButton = task.lessonId
							? `<button class="task-lesson-button" data-action="open-lesson" data-lesson-id="${task.lessonId}">Ver lição</button>`
							: "";
						return `
              <article class="task-card ${
								task.completed ? "completed" : ""
							}" data-task-id="${task.id}">
                <div class="task-header">
                  <div>
                    <h3 class="task-title">${task.title}</h3>
                    <div class="task-meta">${toTitle(
											task.timeOfDay || "flex"
										)} • ${task.duration}</div>
                  </div>
                  <span class="task-tag">+${task.points} pts</span>
                </div>
                <p>${task.description}</p>
                <div class="task-actions">
                  <button class="btn btn--primary" data-action="toggle-task">${
										task.completed ? "Desfazer" : "Concluir"
									}</button>
                  ${lessonButton}
                </div>
              </article>
            `;
					})
					.join("");
			}
		}

		const metricsTargets = this.state.plan.metricsTargets?.counters || {};
		Object.entries(metricsTargets).forEach(([metric, target]) => {
			if (!target) {
				return;
			}
			const element = document.querySelector(
				`.metric-card[data-metric="${metric}"] .metric-target`
			);
			if (element) {
				element.textContent = `Meta: ${target}`;
			}
		});

		Object.entries(log?.metrics?.counters || {}).forEach(([metric, value]) => {
			const element = document.getElementById(`metric-${metric}`);
			if (element) {
				element.textContent = value;
			}
		});

		const targetSummary = document.getElementById("metricsTargetSummary");
		if (targetSummary) {
			const pieces = Object.entries(metricsTargets)
				.filter(([, value]) => value)
				.map(([key, value]) => `${this.metricLabel(key)} ${value}`)
				.slice(0, 5);
			targetSummary.textContent = pieces.length
				? `Meta semanal: ${pieces.join(" • ")}`
				: "Registre suas métricas para calibrar o plano.";
		}

		const pottyMetrics = log?.metrics?.potty || createPotty();
		const pottyRate = safePercent(
			pottyMetrics.successes,
			pottyMetrics.attempts
		);
		const pottyRateLabel = document.getElementById("pottyRate");
		if (pottyRateLabel) {
			pottyRateLabel.textContent = `${pottyRate}%`;
		}
		const pottySuccesses = document.getElementById("pottySuccesses");
		if (pottySuccesses) {
			pottySuccesses.textContent = pottyMetrics.successes;
		}
		const pottyAttempts = document.getElementById("pottyAttempts");
		if (pottyAttempts) {
			pottyAttempts.textContent = pottyMetrics.attempts;
		}
		const pottyTargetLabel = document.getElementById("pottyTargetLabel");
		if (pottyTargetLabel) {
			const successTarget =
				this.state.plan.metricsTargets?.potty?.targetSuccessRate || 0;
			pottyTargetLabel.textContent = successTarget
				? `Meta ${Math.round(successTarget * 100)}%+`
				: "Meta 85%+";
		}

		const subtitle = document.getElementById("planSubtitle");
		if (subtitle) {
			subtitle.textContent =
				this.state.plan.mission || "Converta energia em progresso real.";
		}
	}

	metricLabel(metric) {
		switch (metric) {
			case "socialContacts":
				return "👥";
			case "newSurfaces":
				return "🌍";
			case "soundAcclimation":
				return "🔊";
			case "handling":
				return "🤲";
			case "mentalGames":
				return "🧠";
			case "trainingSessions":
				return "🎓";
			case "calmResets":
				return "😌";
			default:
				return metric;
		}
	}

	renderInsights() {
		const stats = this.getStatsSnapshot();
		const insights = generateSmartInsights({
			metricsTargets: this.state.plan.metricsTargets,
			logs: this.state.logs,
			streak: this.state.streak.current,
			temperament: this.state.temperament,
			completedLessonIds: Array.from(
				buildLessonProgressMap(this.state.logs).keys()
			),
		});

		const highlightsContainer = document.getElementById("insightHighlights");
		const warningsContainer = document.getElementById("insightWarnings");
		const suggestionsContainer = document.getElementById("insightSuggestions");

		if (highlightsContainer) {
			highlightsContainer.innerHTML = (insights.highlights || [])
				.map(
					(item) =>
						`<li>${item.icon || "✅"} ${item.title} — ${item.description}</li>`
				)
				.join("");
		}
		if (warningsContainer) {
			warningsContainer.innerHTML = (insights.warnings || [])
				.map(
					(item) =>
						`<li>${item.icon || "⚠️"} ${item.title} — ${item.description}</li>`
				)
				.join("");
		}
		if (suggestionsContainer) {
			suggestionsContainer.innerHTML = (insights.insights || [])
				.map(
					(item) =>
						`<li>${item.icon || "💡"} ${item.title} — ${item.description}</li>`
				)
				.join("");
		}

		this.renderWeeklyChart(stats.weekly);
		this.renderCategoryChart(stats.counters);
		this.renderHeatmap();
	}

	renderWeeklyChart(weeklyHistory) {
		const canvas = document.getElementById("weeklyChart");
		if (!canvas || typeof Chart === "undefined") {
			return;
		}
		if (this.charts.weekly) {
			this.charts.weekly.destroy();
		}
		const labels = weeklyHistory.map((day) => {
			const parsed = new Date(day.dateKey);
			return parsed.toLocaleDateString("pt-BR", { weekday: "short" });
		});
		const data = weeklyHistory.map((day) => day.completed);
		const totals = weeklyHistory.map((day) => day.total || 0);

		this.charts.weekly = new Chart(canvas, {
			type: "bar",
			data: {
				labels,
				datasets: [
					{
						label: "Completas",
						data,
						backgroundColor: "rgba(56, 189, 248, 0.6)",
					},
					{
						type: "line",
						label: "Planejadas",
						data: totals,
						borderColor: "rgba(148, 163, 184, 0.9)",
						backgroundColor: "rgba(148, 163, 184, 0.15)",
						tension: 0.3,
						fill: false,
					},
				],
			},
			options: {
				responsive: true,
				maintainAspectRatio: false,
				scales: {
					y: {
						beginAtZero: true,
						ticks: {
							stepSize: 1,
						},
					},
				},
			},
		});
	}

	renderCategoryChart(counters) {
		const canvas = document.getElementById("categoryChart");
		if (!canvas || typeof Chart === "undefined") {
			return;
		}
		if (this.charts.category) {
			this.charts.category.destroy();
		}
		const labels = [
			"Contatos sociais",
			"Sessões de treino",
			"Jogos mentais",
			"Manipulação",
			"Calm resets",
		];
		const data = [
			counters.socialContacts,
			counters.trainingSessions,
			counters.mentalGames,
			counters.handling,
			counters.calmResets,
		];

		this.charts.category = new Chart(canvas, {
			type: "doughnut",
			data: {
				labels,
				datasets: [
					{
						data,
						backgroundColor: [
							"#38bdf8",
							"#a855f7",
							"#f97316",
							"#facc15",
							"#f43f5e",
						],
					},
				],
			},
			options: {
				responsive: true,
				maintainAspectRatio: false,
			},
		});
	}

	renderHeatmap() {
		const container = document.getElementById("heatmapContainer");
		if (!container) {
			return;
		}
		const days = [];
		for (let i = 27; i >= 0; i -= 1) {
			const date = new Date();
			date.setDate(date.getDate() - i);
			const dateKey = formatDateKey(date);
			const log = this.state.logs[dateKey];
			const tasks = Object.values(log?.tasks || {});
			const completed = tasks.filter((task) => task.completed).length;
			const intensity = tasks.length ? completed / tasks.length : 0;
			days.push({ date, intensity, completed });
		}
		container.innerHTML = days
			.map((day) => {
				const level =
					day.intensity >= 0.9
						? "high"
						: day.intensity >= 0.4
						? "medium"
						: "low";
				return `
          <div class="heatmap-cell" data-level="${level}" title="${
					day.completed
				} tarefas completas">
            <strong>${day.date.getDate()}</strong>
            <span>${Math.round(day.intensity * 100)}%</span>
          </div>
        `;
			})
			.join("");
	}

	renderBadges() {
		this.evaluateBadges();
		const container = document.getElementById("badgesContainer");
		if (!container) {
			return;
		}
		container.innerHTML = Object.entries(BADGES)
			.map(([id, badge]) => {
				const earned = this.state.badgesUnlocked.includes(id);
				return `
          <div class="badge-card ${earned ? "earned" : ""}">
            <span class="badge-icon">${badge.icon}</span>
            <strong>${badge.name}</strong>
            <p>${badge.description}</p>
            ${earned ? "<small>Desbloqueado ✔️</small>" : ""}
          </div>
        `;
			})
			.join("");
	}

	renderProfile() {
		const stats = this.getStatsSnapshot();
		const levelLabel = document.getElementById("profileLevel");
		if (levelLabel) {
			levelLabel.textContent = this.state.level;
		}
		const pointsLabel = document.getElementById("profilePoints");
		if (pointsLabel) {
			pointsLabel.textContent = this.state.points;
		}
		const totalDays = document.getElementById("totalDays");
		if (totalDays) {
			totalDays.textContent = this.state.stats.totalDaysTracked;
		}
		const bestStreak = document.getElementById("bestStreak");
		if (bestStreak) {
			bestStreak.textContent = Math.max(
				this.state.streak.best,
				this.state.streak.current
			);
		}
		const totalTasksCompleted = document.getElementById("totalTasksCompleted");
		if (totalTasksCompleted) {
			totalTasksCompleted.textContent = stats.totalCompletedTasks;
		}
		const avgCompletion = document.getElementById("avgCompletionRate");
		if (avgCompletion) {
			avgCompletion.textContent = stats.totalTasks
				? `${safePercent(stats.totalCompletedTasks, stats.totalTasks)}%`
				: "0%";
		}

		const dogNameLabel = document.getElementById("profileDogName");
		if (dogNameLabel) {
			dogNameLabel.textContent =
				this.state.profile.dogName || "Blue Heeler Trainer";
		}
		const dogAgeLabel = document.getElementById("profileDogAge");
		if (dogAgeLabel) {
			const ageInfo = calculateAgeInfo(this.state.profile.birthDate);
			dogAgeLabel.textContent = ageInfo.valid
				? `Idade • ${ageInfo.humanReadable}`
				: "Atualize a data de nascimento";
		}

		const goalsContainer = document.getElementById("profileGoals");
		if (goalsContainer) {
			goalsContainer.innerHTML = this.state.goals
				.map((goalId) => {
					const meta = GOAL_METADATA[goalId];
					return `<span class="goal-tag">${meta?.label || goalId}</span>`;
				})
				.join("");
		}
	}

	toggleTaskCompletion(taskId) {
		const log = this.state.logs[this.state.today.dateKey];
		if (!log?.tasks?.[taskId]) {
			return;
		}
		const task = log.tasks[taskId];
		const wasCompleted = task.completed;
		const basePoints = task.points || TASK_BASE_POINTS;
		if (wasCompleted) {
			const awarded = task.rewardedPoints || basePoints;
			task.completed = false;
			task.rewardedPoints = 0;
			this.state.points = Math.max(0, this.state.points - awarded);
		} else {
			const multiplier = 1 + Math.floor(this.state.streak.current / 7);
			const awarded = basePoints * multiplier;
			task.completed = true;
			task.rewardedPoints = awarded;
			this.state.points += awarded;
		}

		const newLevel = Math.floor(this.state.points / LEVEL_STEP) + 1;
		if (newLevel > this.state.level) {
			this.state.level = newLevel;
			this.showCelebration(
				"⬆️",
				"Level up!",
				`Você alcançou o nível ${newLevel}.`
			);
		}

		const tasks = Object.values(log.tasks);
		const completedCount = tasks.filter((item) => item.completed).length;
		if (completedCount === tasks.length && tasks.length) {
			this.showCelebration(
				"🎉",
				"Dia perfeito!",
				"Todas as tarefas concluídas."
			);
		}

		this.evaluateBadges();
		this.renderScreen("training");
		this.renderScreen("dashboard");
		this.renderScreen("insights");
		this.renderScreen("badges");
		this.persistState();
	}

	updateMetric(metric, delta) {
		const log = this.state.logs[this.state.today.dateKey];
		if (!log) {
			return;
		}
		const counters = log.metrics.counters;
		counters[metric] = Math.max(0, (counters[metric] || 0) + delta);
		this.renderScreen("training");
		this.renderScreen("dashboard");
		this.renderScreen("insights");
		this.persistState();
	}

	recordPottyEvent(success) {
		const log = this.state.logs[this.state.today.dateKey];
		if (!log) {
			return;
		}
		const potty = log.metrics.potty;
		potty.attempts += 1;
		if (success) {
			potty.successes += 1;
			this.showToast("✅ Sucesso registrado!", "success");
		} else {
			this.showToast(
				"⚠️ Anote o que aconteceu para ajustar o plano",
				"warning"
			);
		}
		this.renderScreen("training");
		this.renderScreen("dashboard");
		this.renderScreen("insights");
		this.persistState();
	}

	evaluateBadges() {
		const stats = this.getStatsSnapshot();
		const context = {
			currentStreak: this.state.streak.current,
			counters: stats.counters,
			pottyRate: stats.pottyRate,
			pottyAttempts: stats.pottyAttempts,
			perfectDays: stats.perfectDays,
		};
		Object.entries(BADGES).forEach(([id, badge]) => {
			if (!this.state.badgesUnlocked.includes(id) && badge.criteria(context)) {
				this.state.badgesUnlocked.push(id);
				this.showCelebration(
					"🏆",
					"Novo badge!",
					`Você desbloqueou ${badge.name}.`
				);
			}
		});
	}

	refreshWeeklyPlan() {
		this.state.plan.weeklyOutlook = buildWeeklyOutlook({
			birthDate: this.state.profile.birthDate,
			goals: this.state.goals,
			availability: this.state.availability,
			focusNotes: this.state.focusNotes,
		});
		this.renderScreen("dashboard");
		this.showToast("Plano semanal atualizado!", "success");
		this.persistState();
	}

	openLessonModal(lessonId) {
		const lesson = getLessonDetail(lessonId);
		if (!lesson) {
			this.showToast("Não encontramos a lição", "error");
			return;
		}
		const modal = document.getElementById("lessonModal");
		if (!modal) {
			return;
		}
		modal.classList.remove("hidden");
		document.getElementById("lessonModalTitle").textContent = lesson.title;
		document.getElementById("lessonModalSummary").textContent = lesson.summary;
		document.getElementById("lessonPhaseTag").textContent = lesson.phaseId
			? lesson.phaseId.toUpperCase()
			: "Fase";
		document.getElementById("lessonModuleTag").textContent =
			lesson.moduleName || "Módulo";
		this.fillLessonSection("lessonObjectives", "Objetivos", lesson.objectives);
		this.fillLessonSection("lessonWhy", "Por que importa", [lesson.why]);
		this.fillLessonSection(
			"lessonSteps",
			"Passo a passo",
			lesson.steps?.map((step) => `${step.title}: ${step.detail}`)
		);
		this.fillLessonSection(
			"lessonTemperament",
			"Ajustes de temperamento",
			Object.values(lesson.temperamentTips || {})
		);
		this.fillLessonSection("lessonTools", "Ferramentas", lesson.tools);
		this.fillLessonSection(
			"lessonTroubleshooting",
			"Resolução de problemas",
			lesson.troubleshooting?.map((item) => `${item.title}: ${item.detail}`)
		);
		this.fillLessonSection(
			"lessonMetrics",
			"Métricas",
			[lesson.metrics?.primary, lesson.metrics?.secondary].filter(Boolean)
		);
		this.fillLessonSection("lessonNextSteps", "Follow-up", lesson.followUp);
		this.fillLessonSection(
			"lessonReferences",
			"Referências",
			lesson.references
		);
	}

	fillLessonSection(sectionId, title, items) {
		const container = document.getElementById(sectionId);
		if (!container) {
			return;
		}
		if (!items || !items.length) {
			container.classList.add("hidden");
			return;
		}
		container.classList.remove("hidden");
		const listItems = items.map((item) => `<li>${item}</li>`).join("");
		container.innerHTML = `<h4>${title}</h4><ul>${listItems}</ul>`;
	}

	closeLessonModal() {
		const modal = document.getElementById("lessonModal");
		if (modal) {
			modal.classList.add("hidden");
		}
	}

	updateAgePreview() {
		const birthInput = document.getElementById("dogBirthDate");
		const display = document.getElementById("dogAgeDisplay");
		if (!birthInput || !display) {
			return;
		}
		const age = calculateAgeInfo(birthInput.value || null);
		display.textContent = age.valid
			? `Idade estimada: ${age.humanReadable}`
			: "Idade estimada: --";
	}

	playFeedback(type) {
		const message =
			type === "clicker"
				? "Click! Reforço marcado."
				: "Assobio! Recall turbo ativado.";
		this.showToast(message, "success");
	}

	startSessionTimer() {
		if (this.state.session.timerInterval) {
			return;
		}
		this.state.session.timerSeconds = 0;
		const display = document.getElementById("timerDisplay");
		this.state.session.timerInterval = setInterval(() => {
			this.state.session.timerSeconds += 1;
			if (display) {
				const minutes = String(
					Math.floor(this.state.session.timerSeconds / 60)
				).padStart(2, "0");
				const seconds = String(this.state.session.timerSeconds % 60).padStart(
					2,
					"0"
				);
				display.textContent = `${minutes}:${seconds}`;
			}
		}, 1000);
	}

	stopSessionTimer() {
		if (this.state.session.timerInterval) {
			clearInterval(this.state.session.timerInterval);
			this.state.session.timerInterval = null;
			this.showToast("Cronômetro pausado.", "success");
		}
	}

	showChecklistHint() {
		this.showToast(
			"Checklist disponível na aba social. Registre progressos ao final do dia.",
			"success"
		);
	}

	showToast(message, type = "success") {
		const container = document.getElementById("toastContainer");
		if (!container) {
			return;
		}
		const toast = document.createElement("div");
		toast.className = `toast ${type}`;
		toast.innerHTML = `<span class="toast-icon">${
			type === "error" ? "❌" : type === "warning" ? "⚠️" : "✅"
		}</span><div>${message}</div>`;
		container.appendChild(toast);
		const timeout = setTimeout(() => {
			toast.remove();
		}, 3000);
		this.toastTimers.push(timeout);
	}

	showCelebration(icon, title, message) {
		const modal = document.getElementById("celebrationModal");
		if (!modal) {
			return;
		}
		document.getElementById("celebrationIcon").textContent = icon;
		document.getElementById("celebrationTitle").textContent = title;
		document.getElementById("celebrationMessage").textContent = message;
		modal.classList.remove("hidden");
	}

	closeCelebration() {
		const modal = document.getElementById("celebrationModal");
		if (modal) {
			modal.classList.add("hidden");
		}
	}

	exportData() {
		const payload = deepClone(this.state);
		const blob = new Blob([JSON.stringify(payload, null, 2)], {
			type: "application/json",
		});
		const url = URL.createObjectURL(blob);
		const anchor = document.createElement("a");
		anchor.href = url;
		anchor.download = `blue-heeler-trainer-${this.state.today.dateKey}.json`;
		anchor.click();
		URL.revokeObjectURL(url);
		this.showToast("Exportação concluída!", "success");
	}

	async logout() {
		this.stopSessionTimer();
		this.safeLocalStorage("removeItem", STORAGE_LAST_USER_KEY);
		await this.persistState();
		window.location.reload();
	}
}

const app = new BlueHeelerApp();
window.app = app;
