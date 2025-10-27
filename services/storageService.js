const STORAGE_KEY_PREFIX = "blueHeelerTrainer";
const SYNC_DEBOUNCE_MS = 2000;

function safeParse(json) {
	if (!json) {
		return null;
	}
	try {
		return JSON.parse(json);
	} catch (_) {
		return null;
	}
}

function getLocalStorage() {
	try {
		if (typeof window !== "undefined" && window.localStorage) {
			return window.localStorage;
		}
	} catch (_) {
		return null;
	}
	return null;
}

export default class StorageService {
	constructor(apiBaseUrl) {
		this.apiBaseUrl = apiBaseUrl;
		this.memoryCache = new Map();
		this.pendingSync = null;
		this.syncTimer = null;
	}

	getStorageKey(userId) {
		return `${STORAGE_KEY_PREFIX}:${userId}`;
	}

	getLocalData(userId) {
		const storage = getLocalStorage();
		if (storage) {
			const raw = storage.getItem(this.getStorageKey(userId));
			const parsed = safeParse(raw);
			if (parsed) {
				return parsed;
			}
		}
		if (this.memoryCache.has(userId)) {
			return this.memoryCache.get(userId);
		}
		return null;
	}

	setLocalData(userId, data) {
		const snapshot = JSON.parse(JSON.stringify(data));
		this.memoryCache.set(userId, snapshot);
		const storage = getLocalStorage();
		if (storage) {
			storage.setItem(this.getStorageKey(userId), JSON.stringify(snapshot));
		}
	}

	async load(userId) {
		if (!userId) {
			return null;
		}

		const localData = this.getLocalData(userId);
		if (localData) {
			return JSON.parse(JSON.stringify(localData));
		}

		if (!this.apiBaseUrl) {
			return null;
		}

		try {
			const response = await fetch(
				`${this.apiBaseUrl}/sync-progress?userId=${encodeURIComponent(userId)}`
			);
			if (!response.ok) {
				return null;
			}
			const payload = await response.json();
			if (payload && payload.data) {
				this.setLocalData(userId, payload.data);
				return JSON.parse(JSON.stringify(payload.data));
			}
		} catch (error) {
			console.warn("StorageService remote load failed", error);
		}

		return null;
	}

	async save(userId, data) {
		if (!userId) {
			return;
		}
		this.setLocalData(userId, data);
		this.pendingSync = {
			userId,
			data: JSON.parse(JSON.stringify(data)),
			queuedAt: Date.now(),
		};
		this.scheduleSync();
	}

	scheduleSync() {
		if (this.syncTimer) {
			clearTimeout(this.syncTimer);
		}
		this.syncTimer = setTimeout(() => {
			this.syncTimer = null;
			this.syncNow().catch((error) => {
				console.warn("StorageService sync failed", error);
			});
		}, SYNC_DEBOUNCE_MS);
	}

	async syncNow(force = false) {
		if (!this.pendingSync && !force) {
			return;
		}
		if (!this.apiBaseUrl) {
			return;
		}
		const payload = force && !this.pendingSync ? null : this.pendingSync;
		if (!payload) {
			return;
		}

		try {
			const response = await fetch(`${this.apiBaseUrl}/sync-progress`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					userId: payload.userId,
					updatedAt: new Date().toISOString(),
					data: payload.data,
				}),
			});
			if (response.ok) {
				this.pendingSync = null;
			} else {
				console.warn("StorageService sync server error", response.status);
			}
		} catch (error) {
			console.warn("StorageService sync exception", error);
		}
	}
}
