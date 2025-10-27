import { aggregateWeeklyMetrics } from "../scripts/plan-engine.js";

function percent(part, total) {
	if (!total) {
		return 0;
	}
	return Math.round((part / total) * 100);
}

export function generateSmartInsights(state = {}) {
	const insights = [];
	const warnings = [];
	const highlights = [];

	const planTargets = state.metricsTargets || state.plan?.metricsTargets || {};
	const weeklyStats = aggregateWeeklyMetrics(state.logs || {}, new Date(), 7);

	const counters = planTargets.counters || {};
	Object.entries(counters).forEach(([metricKey, targetValue]) => {
		const actual = weeklyStats.counters[metricKey] || 0;
		if (!targetValue) {
			return;
		}
		if (actual >= targetValue) {
			highlights.push({
				icon: "💪",
				title: `Meta de ${metricKey} atingida`,
				description: `Você registrou ${actual} (${targetValue} planejado). Excelente consistência!`,
			});
		} else {
			insights.push({
				icon: "🧭",
				title: `Aumente ${metricKey}`,
				description: `Planejado ${targetValue}, computado ${actual}. Ajuste agenda para priorizar essa métrica esta semana.`,
			});
		}
	});

	if (planTargets.potty) {
		const success = weeklyStats.potty.successes;
		const attempts = weeklyStats.potty.attempts;
		const rate = percent(success, attempts);
		const targetRate = planTargets.potty.targetSuccessRate
			? Math.round(planTargets.potty.targetSuccessRate * 100)
			: null;
		if (targetRate) {
			if (rate >= targetRate) {
				highlights.push({
					icon: "🚽",
					title: "Potty consistente",
					description: `Taxa atual ${rate}% (meta ${targetRate}%). Continue alimentando a escada de reforço.`,
				});
			} else {
				warnings.push({
					icon: "⚠️",
					title: "Potty abaixo da meta",
					description: `Taxa atual ${rate}% (meta ${targetRate}%). Reforce a rotina com saídas mais frequentes e log detalhado.`,
				});
			}
		}
	}

	const streak = state.streak || state.currentStreak || 0;
	if (streak >= 7) {
		highlights.push({
			icon: "🔥",
			title: `Streak de ${streak} dias`,
			description:
				"A consistência está desbloqueando progresso acelerado. Mantenha-se nessa cadência!",
		});
	} else if (streak === 0) {
		insights.push({
			icon: "🚀",
			title: "Inicie nova sequência",
			description:
				"Complete pelo menos uma tarefa hoje para construir momentum e destravar multiplicadores de pontos.",
		});
	}

	if (
		state.temperament?.herdingDrive >= 4 &&
		!state.completedLessonIds?.includes("lesson-control-instinct")
	) {
		warnings.push({
			icon: "🦴",
			title: "Ative o módulo de controle de instinto",
			description:
				"Drive de pastoreio alto detectado. Execute a lição 'Controle do Instinto de Pastoreio' no mínimo 3x nesta semana.",
		});
	}

	if (state.temperament?.energy >= 4 && weeklyStats.counters.mentalGames < 10) {
		insights.push({
			icon: "🧠",
			title: "Aumente jogos mentais",
			description:
				"Energia alta precisa de ao menos 10 jogos mentais semanais. Considere sessões extras de nosework ou puzzles.",
		});
	}

	return {
		highlights,
		warnings,
		insights,
	};
}

export default {
	generateSmartInsights,
};
