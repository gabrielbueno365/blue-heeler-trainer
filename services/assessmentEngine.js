import {
	calculateAgeInfo,
	determinePhase,
	generateDailyPlan,
	buildWeeklyOutlook,
	trainingPlanBlueprint,
} from "../scripts/plan-engine.js";

function toNumber(value, fallback = 3) {
	const parsed = Number(value);
	if (Number.isNaN(parsed) || parsed <= 0) {
		return fallback;
	}
	return parsed;
}

function normalizeBoolean(value) {
	if (typeof value === "boolean") {
		return value;
	}
	if (typeof value === "string") {
		const normalized = value.trim().toLowerCase();
		return (
			normalized === "true" || normalized === "yes" || normalized === "sim"
		);
	}
	return false;
}

function computeAvailability(routine = {}) {
	const availability = {
		morning: true,
		afternoon: true,
		evening: true,
	};

	if (routine.preferredSlots && Array.isArray(routine.preferredSlots)) {
		return {
			morning: routine.preferredSlots.includes("morning"),
			afternoon: routine.preferredSlots.includes("afternoon"),
			evening: routine.preferredSlots.includes("evening"),
		};
	}

	const timePerDay = toNumber(routine.timePerDayMinutes, 120);
	if (timePerDay <= 60) {
		availability.afternoon = false;
	}
	if (normalizeBoolean(routine.workerNightShift)) {
		availability.morning = false;
	}
	if (normalizeBoolean(routine.workerMorningShift)) {
		availability.evening = false;
	}

	return availability;
}

function deriveGoals(inputs = {}) {
	const selected = Array.isArray(inputs.goals)
		? inputs.goals.filter(Boolean)
		: [];
	if (selected.length > 0) {
		return selected;
	}

	const challenges = inputs.challenges || {};
	const autoGoals = new Set();
	if (
		normalizeBoolean(challenges.nipping) ||
		normalizeBoolean(challenges.herdingExcess)
	) {
		autoGoals.add("biteControl");
	}
	if (normalizeBoolean(challenges.toiletAccidents)) {
		autoGoals.add("pottyMastery");
	}
	if (normalizeBoolean(challenges.jump)) {
		autoGoals.add("impulseControl");
	}
	if (normalizeBoolean(challenges.recallIssues)) {
		autoGoals.add("recall");
	}
	if (autoGoals.size === 0) {
		autoGoals.add("socialization");
		autoGoals.add("obedience");
	}
	return Array.from(autoGoals);
}

function summariseTemperament(temperament = {}) {
	const energy = toNumber(temperament.energyLevel, 4);
	const sensitivity = toNumber(temperament.sensitivity, 3);
	const independence = toNumber(temperament.independence, 3);
	const herdingDrive = toNumber(temperament.herdingDrive, 4);

	const archetype =
		energy >= 4 && herdingDrive >= 4
			? "motor-instinto"
			: energy <= 2
			? "calmo-estratega"
			: "equilibrado";

	return {
		energy,
		sensitivity,
		independence,
		herdingDrive,
		archetype,
		description:
			archetype === "motor-instinto"
				? "Alta energia e drive de trabalho intenso. Precisa de tarefas diárias estruturadas e redirecionamento constante."
				: archetype === "calmo-estratega"
				? "Perfil mais calmo, valoriza rotina previsível e reforços sociais suaves."
				: "Equilíbrio entre drive e controle. Ideal para mesclar trabalho físico e mental com foco em consistência.",
	};
}

function buildFocusAreas(temperamentSummary, goals) {
	const priorities = [];
	if (temperamentSummary.energy >= 4) {
		priorities.push("Cardio controlado", "Enriquecimento mental");
	}
	if (temperamentSummary.sensitivity >= 4) {
		priorities.push("Socialização suave", "Handling zen");
	}
	if (temperamentSummary.independence >= 4) {
		priorities.push("Vínculo e cooperação", "Jogos de foco");
	}
	if (temperamentSummary.herdingDrive >= 4) {
		priorities.push("Redirecionamento de pastoreio", "Trabalho funcional");
	}
	goals.forEach((goal) => {
		switch (goal) {
			case "socialization":
				priorities.push("Janelas de socialização estruturada");
				break;
			case "pottyMastery":
				priorities.push("Log de potty de alta precisão");
				break;
			case "biteControl":
				priorities.push("Controle de mordida com mudanças de textura");
				break;
			case "obedience":
				priorities.push("Sequências sit/down/stay consolidadas");
				break;
			case "recall":
				priorities.push("Recall turbo diário");
				break;
			case "enrichment":
				priorities.push("Puzzles e nosework avançados");
				break;
			case "impulseControl":
				priorities.push("Place com provas e jogos de impulso");
				break;
			default:
				break;
		}
	});
	return Array.from(new Set(priorities));
}

export function runAssessment(onboardingResponses = {}) {
	const dog = onboardingResponses.dog || {};
	const temperamentSummary = summariseTemperament(
		onboardingResponses.temperament
	);
	const goals = deriveGoals(onboardingResponses);

	const ageInfo = calculateAgeInfo(dog.birthDate);
	const phase =
		determinePhase(ageInfo.ageDays, trainingPlanBlueprint) ||
		trainingPlanBlueprint.phases[0];
	const availability = computeAvailability(onboardingResponses.routine);

	const todayPlan = generateDailyPlan({
		date: new Date(),
		birthDate: dog.birthDate,
		goals,
		availability,
		focusNotes: onboardingResponses.focusNotes || "",
		blueprint: trainingPlanBlueprint,
	});

	const weeklyOutlook = buildWeeklyOutlook({
		birthDate: dog.birthDate,
		goals,
		availability,
		blueprint: trainingPlanBlueprint,
	});

	const focusAreas = buildFocusAreas(temperamentSummary, goals);

	const riskFlags = [];
	if (ageInfo.ageWeeks <= 16 && !goals.includes("socialization")) {
		riskFlags.push(
			"Adicionar socialização 100+ enquanto a janela crítica está aberta."
		);
	}
	if (temperamentSummary.herdingDrive >= 4 && !goals.includes("biteControl")) {
		riskFlags.push(
			"Acione módulo de controle de instinto para evitar nipping persistente."
		);
	}
	if (temperamentSummary.energy >= 4 && !goals.includes("enrichment")) {
		riskFlags.push("Garanta pelo menos 30 minutos de trabalho mental diário.");
	}

	return {
		ageInfo,
		phase,
		temperament: temperamentSummary,
		availability,
		goals,
		focusAreas,
		metricsTargets: todayPlan.metricsTargets,
		mission: todayPlan.mission,
		weeklyOutlook,
		recommendedTasks: todayPlan.tasks,
		riskFlags,
	};
}

export default {
	runAssessment,
};
