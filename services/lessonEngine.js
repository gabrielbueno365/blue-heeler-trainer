import {
	lessonLibrary,
	findLessonByTask,
	getLessonById,
} from "../data/lessons.js";

export function enrichTasksWithLessons(tasks = []) {
	return tasks.map((task) => {
		const lesson = findLessonByTask(task.baseId);
		return {
			...task,
			lessonId: lesson?.id || null,
			lessonSummary: lesson ? lesson.summary : null,
		};
	});
}

export function getLessonsByPhase(phaseId) {
	return lessonLibrary.filter((lesson) => lesson.phaseId === phaseId);
}

export function getLessonsByModule(moduleId) {
	return lessonLibrary.filter((lesson) => lesson.moduleId === moduleId);
}

export function buildLessonProgressMap(logs = {}) {
	const progress = new Map();
	Object.values(logs).forEach((entry) => {
		const tasks = entry.tasks || {};
		Object.values(tasks).forEach((task) => {
			if (!task.lessonId) {
				return;
			}
			const current = progress.get(task.lessonId) || {
				completed: 0,
				attempts: 0,
			};
			current.attempts += 1;
			if (task.completed) {
				current.completed += 1;
			}
			progress.set(task.lessonId, current);
		});
	});
	return progress;
}

export function getLessonDetail(lessonId) {
	return getLessonById(lessonId);
}

export default {
	enrichTasksWithLessons,
	getLessonsByPhase,
	getLessonsByModule,
	buildLessonProgressMap,
	getLessonDetail,
};
