const DAY_MS = 86_400_000;

const timeOfDayOrder = {
	morning: 1,
	afternoon: 2,
	evening: 3,
	flex: 4,
};

export const goalCatalog = [
	{
		id: "socialization",
		label: "Socialização 100+",
		description:
			"Exposições positivas e graduais a pessoas, ambientes, superfícies e sons diversos.",
	},
	{
		id: "pottyMastery",
		label: "Banheiro impecável",
		description:
			"Estruturar rotina de eliminação com 90%+ de acertos e prevenção de acidentes.",
	},
	{
		id: "biteControl",
		label: "Controle de mordidas",
		description:
			"Sessões diárias para refinar bite inhibition e redirecionar instintos de pastoreio.",
	},
	{
		id: "obedience",
		label: "Obediência essencial",
		description:
			"Construir sit, down, stay, foco e resposta ao nome com consistência de 80%+.",
	},
	{
		id: "recall",
		label: "Recall e guia",
		description:
			"Criar resposta explosiva ao chamado e caminhadas com guia frouxa.",
	},
	{
		id: "enrichment",
		label: "Energia mental",
		description:
			"Nosework, puzzles e shaping para esgotar a mente antes do corpo.",
	},
	{
		id: "impulseControl",
		label: "Controle de impulso",
		description:
			"Estratégias para ensinar calma sob excitação e estabilidade emocional.",
	},
];

const phaseDefinitions = [
	{
		id: "phase1",
		name: "Fase 1 • Socialização Crítica",
		startDay: 0,
		endDay: 98,
		summary:
			"O cérebro está em plasticidade máxima. Priorize socialização estruturada, potty training e manipulação positiva.",
		focus: [
			"100 experiências positivas até o fim da janela crítica",
			"Nome + Atenção < 2 segundos",
			"Controle de mordida (pressão suave)",
			"Crate = lugar seguro",
		],
		dailyRoutine: {
			morning: [
				{
					id: "p1-morning-potty",
					icon: "🚽",
					title: "Potty imediato ao acordar",
					description:
						"Leve a filhote ao local designado antes de qualquer interação. Reforce com petisco de alto valor ao terminar.",
					duration: "5 min",
					rationale: "Constrói hábito e evita acidentes dentro de casa.",
				},
				{
					id: "p1-morning-focus",
					icon: "🎯",
					title: "Nome + Atenção de ouro",
					description:
						'10 repetições: diga o nome, marque com "Yes!" quando olhar, entregue o petisco. Finalize com mini sessão de brincadeira controlada.',
					duration: "5 min",
					rationale: "Instala o reflexo de foco imediato no tutor.",
				},
				{
					id: "p1-morning-explore",
					icon: "🌳",
					title: "Exploração supervisionada",
					description:
						"Abra o ambiente (sala ou quintal) com 3 superfícies diferentes. Siga o ritmo dela, recompense curiosidade calma.",
					duration: "15 min",
					rationale:
						"Generaliza confiança ambiental e inicia controle de impulsos.",
				},
			],
			afternoon: [
				{
					id: "p1-afternoon-people",
					icon: "🧑‍🤝‍🧑",
					title: "Socialização guiada",
					description:
						"Apresente 2 pessoas novas (chapéu, óculos, diferentes tons de voz). Recompense aproximações voluntárias.",
					duration: "10 min",
					rationale: "Previne neofobia e constrói respostas sociais saudáveis.",
				},
				{
					id: "p1-afternoon-sound",
					icon: "🔊",
					title: "Playlist de dessensibilização",
					description:
						"Toque sons urbanos em volume baixo enquanto oferece Kong ou refeição. Aumente gradualmente se estiver relaxada.",
					duration: "5 min",
					rationale: "Cria associações positivas com ruídos comuns.",
				},
				{
					id: "p1-afternoon-play",
					icon: "🎾",
					title: "Brincadeira estruturada",
					description:
						"Sessão de 10 min alternando cabo de guerra controlado e redirecionamento para brinquedo quando morder mãos.",
					duration: "10 min",
					rationale: "Canaliza energia de pastoreio para objetos corretos.",
				},
			],
			evening: [
				{
					id: "p1-evening-bite",
					icon: "🦷",
					title: "Bite inhibition premium",
					description:
						'Use o protocolo: mordida forte → "Ai!" agudo + pausa 30s. Recompense mordidas suaves. Introduza brinquedo-textura.',
					duration: "10 min",
					rationale: "Ensina auto modulação de pressão antes da adolescência.",
				},
				{
					id: "p1-evening-handling",
					icon: "✋",
					title: "Handling zen",
					description:
						"Toque patas, orelhas, boca. Petiscos em fluxo constante. Adicione escova leve ao final.",
					duration: "5 min",
					rationale: "Garante cooperação em groomer e veterinário.",
				},
				{
					id: "p1-evening-settle",
					icon: "🌙",
					title: "Ritual de acalmar",
					description:
						"Coloque-a na crate com recheio calmante, diminua luzes e sons. Respiração lenta ao lado por 2 minutos.",
					duration: "10 min",
					rationale: "Constrói associação crate = descanso profundo.",
				},
			],
		},
		metricsTargets: {
			counters: {
				socialContacts: 5,
				newSurfaces: 3,
				soundAcclimation: 1,
				handling: 1,
				trainingSessions: 3,
				mentalGames: 1,
				calmResets: 2,
			},
			potty: {
				targetSuccessRate: 0.8,
				scheduledBreaks: 10,
			},
		},
		milestones: [
			{
				id: "phase1-name-response",
				label: "Nome responde em 2s",
				description: "80% de resposta ao nome mesmo com distração baixa.",
				targetDay: 63,
			},
			{
				id: "phase1-social-50",
				label: "50 pessoas positivas",
				description: "Exposições variadas com associação positiva registrada.",
				targetDay: 84,
			},
			{
				id: "phase1-bite-soft",
				label: "Mordida sob controle",
				description:
					'Brincadeiras sem marcas roxas e resposta imediata ao "Ai".',
				targetDay: 98,
			},
		],
	},
	{
		id: "phase2",
		name: "Fase 2 • Obediência Fundamental",
		startDay: 99,
		endDay: 168,
		summary:
			"Consolide comandos básicos, caminhar na guia e generalização. Adolescência exige consistência absoluta.",
		focus: [
			"Sit/Down/Stay confiáveis em ambientes calmos",
			"Recall explosivo em 5 metros",
			"Crate = relaxamento voluntário",
			"Manter socialização semanal",
		],
		dailyRoutine: {
			morning: [
				{
					id: "p2-morning-potty",
					icon: "🚿",
					title: 'Potty + comando "fica"',
					description:
						'Ao sair da crate, peça "fica" por 2 segundos antes de liberar para potty. Reforce calmamente.',
					duration: "6 min",
					rationale: "Integra autocontrole dentro da rotina.",
				},
				{
					id: "p2-morning-heel",
					icon: "🐾",
					title: "Micro caminhada na guia",
					description:
						'5 minutos em formato "L": recompensa a guia frouxa; se puxar, pare e recomece.',
					duration: "10 min",
					rationale: "Constrói padrão de caminhar conectado.",
				},
				{
					id: "p2-morning-obedience",
					icon: "🎓",
					title: "Tríade Sit-Down-Stay",
					description:
						"Sequência 3x: sit → down → stay (5s). Aumente distância para 2 passos quando sólido.",
					duration: "12 min",
					rationale: "Encaixa obediência sob leve fadiga física.",
				},
			],
			afternoon: [
				{
					id: "p2-afternoon-social",
					icon: "🌆",
					title: "Passeio de observação",
					description:
						'Visite local novo, pratique "Olha pra mim" + petisco quando surgir estímulo forte.',
					duration: "15 min",
					rationale: "Generaliza foco em ambientes mais complexos.",
				},
				{
					id: "p2-afternoon-crate",
					icon: "🛖",
					title: "Crate com enriquecimento",
					description:
						"Sessão 20 min com brinquedo recheado; abra a porta quando estiver relaxada e escolha sair.",
					duration: "20 min",
					rationale: "Ensina autocontrole e autogerenciamento.",
				},
				{
					id: "p2-afternoon-leaveit",
					icon: "🚫",
					title: "Deixa / Larga",
					description:
						'Use petisco baixo valor no chão → "Deixa" → recompensa com petisco melhor vindo de você.',
					duration: "8 min",
					rationale:
						"Constrói confiança na liderança e prevenção de ingestão indevida.",
				},
			],
			evening: [
				{
					id: "p2-evening-recall",
					icon: "🎯",
					title: "Recall foguete",
					description:
						"Jogo do pega-pega: duas pessoas chamando alternadamente com jackpot quando chegar.",
					duration: "10 min",
					rationale: "Mantém retorno como evento altamente valorizado.",
				},
				{
					id: "p2-evening-brain",
					icon: "🧩",
					title: "Puzzle mental",
					description:
						"Apresente quebra-cabeça novo ou variação (toalha enrolada, caixa com copos). Cronometre tempo de resolução.",
					duration: "12 min",
					rationale: "Suprimento diário de desafio cognitivo.",
				},
				{
					id: "p2-evening-settle",
					icon: "🧘",
					title: "Calma induzida no tapete",
					description:
						'Use "vai pro tapete" seguido de reforços variáveis enquanto mantém postura relaxada.',
					duration: "8 min",
					rationale: 'Trabalha ativamente o botão de "desligar".',
				},
			],
		},
		metricsTargets: {
			counters: {
				socialContacts: 3,
				newSurfaces: 1,
				soundAcclimation: 1,
				handling: 1,
				trainingSessions: 4,
				mentalGames: 2,
				calmResets: 2,
			},
			potty: {
				targetSuccessRate: 0.9,
				scheduledBreaks: 7,
			},
		},
		milestones: [
			{
				id: "phase2-sit-reliable",
				label: "Sit 90%",
				description: 'Responde ao "senta" em até 3s em ambientes calmos.',
				targetDay: 126,
			},
			{
				id: "phase2-stay-30",
				label: "Stay 30s",
				description: 'Mantém "fica" por 30 segundos com tutor a 2 metros.',
				targetDay: 140,
			},
			{
				id: "phase2-crate-60",
				label: "Crate zen 60 min",
				description:
					"Permanece relaxada na crate por 1 hora com enriquecimento.",
				targetDay: 154,
			},
		],
	},
	{
		id: "phase3",
		name: "Fase 3 • Trabalho e Maestria",
		startDay: 169,
		endDay: 365,
		summary:
			"Canalize o motor de trabalho para atividades avançadas. Foque em controle sob alta excitação e tarefas mentais complexas.",
		focus: [
			"Consolidação do recall mesmo com distrações",
			"Programas de agility, treibball ou nosework",
			"Impulso controlado (deita em movimento, place)",
			"Carga mental diária (30-45 min)",
		],
		dailyRoutine: {
			morning: [
				{
					id: "p3-morning-cardio",
					icon: "⚡",
					title: "Cardio + foco",
					description:
						'Sessão de 20 min alternando corrida leve e "junto" formal com recompensas estratégicas.',
					duration: "20 min",
					rationale: "Gasta energia e reforça conexões motoras sob comando.",
				},
				{
					id: "p3-morning-shaping",
					icon: "🛠️",
					title: "Shaping criativo",
					description:
						"Sessão free shaping de 10 min para truque novo (ex.: tocar alvo, empurrar bola). Use clicker.",
					duration: "10 min",
					rationale: "Aumenta repertório e autonomia cognitiva.",
				},
				{
					id: "p3-morning-place",
					icon: "🛏️",
					title: "Place sob distração",
					description:
						'Pratique "place" com distrações graduais (porta batendo, brinquedos). Reforce permanência tranquila.',
					duration: "12 min",
					rationale: "Fortalece autocontrole com estímulos intensos.",
				},
			],
			afternoon: [
				{
					id: "p3-afternoon-nosework",
					icon: "👃",
					title: "Busca olfativa",
					description:
						"Esconda 6 petiscos em dois ambientes. Faça 3 rodadas aumentando dificuldade.",
					duration: "18 min",
					rationale: "Desgasta a mente com recompensa baseada em instinto.",
				},
				{
					id: "p3-afternoon-social",
					icon: "🏞️",
					title: "Socialização com distrações",
					description:
						"Exposição a ambiente movimentado. Pratique alternância trabalho/relax (junto curto + deitar/calmar).",
					duration: "15 min",
					rationale: "Generaliza autocontrole em cenários reais.",
				},
				{
					id: "p3-afternoon-impulse",
					icon: "🧰",
					title: "Jogos de impulso",
					description:
						'Utilize o jogo "It\'s yer choice" com petiscos e brinquedos de alto valor.',
					duration: "12 min",
					rationale: "Fortalece decisão ativa por autocontrole.",
				},
			],
			evening: [
				{
					id: "p3-evening-recall",
					icon: "📣",
					title: "Recall com distração",
					description:
						"Use long-line em parque. Introduza distrações controladas (bolas, pessoas). Reforce com jackpot variável.",
					duration: "15 min",
					rationale: "Mantém resposta explosiva mesmo cansada.",
				},
				{
					id: "p3-evening-recovery",
					icon: "🌌",
					title: "Decompressão guiada",
					description:
						"Snuffle mat + massagem relaxante. Observe sinais de estresse e ajuste intensidade para o dia seguinte.",
					duration: "12 min",
					rationale: "Fecha o dia com pressão baixa e consolidação emocional.",
				},
				{
					id: "p3-evening-review",
					icon: "🗒️",
					title: "Review estratégico",
					description:
						"Documente 3 vitórias, 1 ajuste necessário e plano para o dia seguinte.",
					duration: "6 min",
					rationale: "Cria ciclo de melhoria contínua e accountability.",
				},
			],
		},
		metricsTargets: {
			counters: {
				socialContacts: 2,
				newSurfaces: 1,
				soundAcclimation: 1,
				handling: 1,
				trainingSessions: 5,
				mentalGames: 3,
				calmResets: 3,
			},
			potty: {
				targetSuccessRate: 0.95,
				scheduledBreaks: 5,
			},
		},
		milestones: [
			{
				id: "phase3-recall-proof",
				label: "Recall blindado",
				description: "Retorna mesmo com distrações médias em 90% dos ensaios.",
				targetDay: 210,
			},
			{
				id: "phase3-mental-30",
				label: "30 min de trabalho mental",
				description:
					"Executa 3 blocos mentais diferentes por dia com entusiasmo.",
				targetDay: 240,
			},
			{
				id: "phase3-impulse",
				label: "Impulso sob comando",
				description: 'Mantém "place" enquanto estímulos passam por 2 min.',
				targetDay: 270,
			},
		],
	},
];

const goalMetricsAdjustments = {
	socialization: {
		counters: {
			socialContacts: 3,
			newSurfaces: 1,
		},
	},
	pottyMastery: {
		counters: {
			calmResets: 1,
		},
		potty: {
			targetSuccessRate: 0.92,
			scheduledBreaks: 12,
		},
	},
	biteControl: {
		counters: {
			handling: 1,
			calmResets: 1,
		},
	},
	obedience: {
		counters: {
			trainingSessions: 1,
		},
	},
	recall: {
		counters: {
			trainingSessions: 1,
			calmResets: 1,
		},
	},
	enrichment: {
		counters: {
			mentalGames: 2,
		},
	},
	impulseControl: {
		counters: {
			calmResets: 2,
		},
	},
};

const goalTaskGenerators = {
	socialization: ({ phase, dateKey }) => {
		const base = phase.id === "phase1" ? 5 : phase.id === "phase2" ? 3 : 2;
		return [
			{
				id: `goal-social-map-${phase.id}`,
				icon: "🗺️",
				title: "Checklist Social do Dia",
				description: `Registre pelo menos ${base} pessoas novas e 2 superfícies diferentes no diário. Priorize qualidade positiva.
`,
				duration: "10 min",
				rationale:
					"Sem rastrear, não há garantia de atingir a meta 100+ até 16 semanas.",
				timeOfDay: "afternoon",
				category: "Socialização",
				metric: "socialContacts",
			},
			{
				id: `goal-social-observe-${phase.id}`,
				icon: "🔭",
				title: "Passeio de observação guiada",
				description:
					"Leve a filhote para observar movimento sem interação direta. Recompense calma e foco em você ao notar novidades.",
				duration: "12 min",
				rationale:
					"Ensina a lidar com estímulos fortes mantendo senso de segurança.",
				timeOfDay: "morning",
				category: "Ambiente",
				metric: "calmResets",
			},
		];
	},
	pottyMastery: ({ phase }) => [
		{
			id: `goal-potty-log-${phase.id}`,
			icon: "📓",
			title: "Log detalhado de potty",
			description:
				"Anote horários, sinais prévios e resultados. Identifique intervalo máximo sem acidentes.",
			duration: "5 min",
			rationale: "Permite ajustes precisos na agenda e antecipa acidentes.",
			timeOfDay: "evening",
			category: "Potty",
			metric: "scheduledBreaks",
		},
		{
			id: `goal-potty-decompression-${phase.id}`,
			icon: "🪜",
			title: "Protocolo escada Potty",
			description:
				'Introduza "vai ao banheiro" como pista. A cada sucesso, libere 2 minutos de exploração extra.',
			duration: "8 min",
			rationale:
				"Cria associação direta entre eliminação e recompensas naturais.",
			timeOfDay: "afternoon",
			category: "Potty",
		},
	],
	biteControl: ({ phase }) => [
		{
			id: `goal-bite-switch-${phase.id}`,
			icon: "🔄",
			title: "Redirecionamento instantâneo",
			description:
				"Tenha 3 texturas de brinquedo preparadas. Assim que iniciar mordida em pele/roupa, troque pelo brinquedo e marque calma.",
			duration: "8 min",
			rationale: "Canaliza o instinto de heeler para alvos corretos.",
			timeOfDay: "evening",
			category: "Bite",
		},
		{
			id: `goal-bite-calibrate-${phase.id}`,
			icon: "🧪",
			title: "Testes de pressão",
			description:
				"Simule manipulação veterinária enquanto oferece mordedor. Recompense manter boca suave.",
			duration: "6 min",
			rationale: "Garante tolerância a procedimentos.",
			timeOfDay: "afternoon",
			category: "Bite",
			metric: "handling",
		},
	],
	obedience: ({ phase }) => [
		{
			id: `goal-obedience-ladder-${phase.id}`,
			icon: "🪜",
			title: "Ladder de comandos",
			description:
				"Construa sequência Sit → Down → Fica (10s) → Libera. Aumente dificuldade adicionando distração leve.",
			duration: "12 min",
			rationale: "Encadeia habilidades com clareza de comunicação.",
			timeOfDay: "morning",
			category: "Obediência",
			metric: "trainingSessions",
		},
		{
			id: `goal-obedience-generalize-${phase.id}`,
			icon: "🧭",
			title: "Generalização rápida",
			description:
				"Repita os comandos em novo cômodo ou quintal. Recompense com jackpot na primeira resposta rápida.",
			duration: "6 min",
			rationale: 'Previne comportamento "só em casa".',
			timeOfDay: "afternoon",
			category: "Obediência",
		},
	],
	recall: ({ phase }) => [
		{
			id: `goal-recall-games-${phase.id}`,
			icon: "🎲",
			title: "Jogos de recall",
			description:
				"Faça o jogo da perseguição invertida: corra na direção oposta, agache, premie com chuva de petiscos ao chegar.",
			duration: "10 min",
			rationale: "Constrói valor emocional no retorno.",
			timeOfDay: "evening",
			category: "Recall",
			metric: "trainingSessions",
		},
		{
			id: `goal-recall-longline-${phase.id}`,
			icon: "🪢",
			title: "Long-line estratégica",
			description:
				"Use guia longa 10m. Dê liberdade controlada e reforce quando escolher retornar sem ser chamado.",
			duration: "10 min",
			rationale: "Aumenta responsabilidade e iniciativa.",
			timeOfDay: "afternoon",
			category: "Recall",
		},
	],
	enrichment: ({ phase }) => [
		{
			id: `goal-enrich-nose-${phase.id}`,
			icon: "🕵️",
			title: "Mini nosework indoor",
			description:
				"Esconda 3 odores/petiscos em caixas diferentes. Cronometre e registre evolução.",
			duration: "12 min",
			rationale: "Mentalmente esgotador com baixo impacto físico.",
			timeOfDay: "afternoon",
			category: "Enriquecimento",
			metric: "mentalGames",
		},
		{
			id: `goal-enrich-shaping-${phase.id}`,
			icon: "🎬",
			title: "Sessão de shaping",
			description:
				"Capture comportamentos criativos (ex.: subir em plataforma) usando clicker. Máximo 5 minutos.",
			duration: "5 min",
			rationale: "Mantém inteligência em modo exploratório saudável.",
			timeOfDay: "morning",
			category: "Enriquecimento",
		},
	],
	impulseControl: ({ phase }) => [
		{
			id: `goal-impulse-place-${phase.id}`,
			icon: "🪑",
			title: "Place com prova",
			description:
				'Peça "place" e mova-se ao redor com brinquedos. Recompense permanecer relaxada.',
			duration: "8 min",
			rationale: "Trabalha resistência sob excitação.",
			timeOfDay: "evening",
			category: "Autocontrole",
			metric: "calmResets",
		},
		{
			id: `goal-impulse-mat-${phase.id}`,
			icon: "☕",
			title: "Calma na cafeteria",
			description:
				'Simule cafeteria: sente-se com bebida fictícia enquanto ela mantém "deita". Reforce respirações profundas.',
			duration: "10 min",
			rationale: "Transfere autocontrole para vida real.",
			timeOfDay: "afternoon",
			category: "Autocontrole",
		},
	],
};

export const socialChecklistTemplate = {
	people: {
		label: "Pessoas",
		items: [
			"Adulto usando chapéu",
			"Pessoa com barba",
			"Criança correndo",
			"Pessoa com guarda-chuva",
			"Profissional com uniforme",
			"Pessoa usando cadeira de rodas ou bengala",
			"Grupo de 3 ou mais pessoas conversando",
		],
	},
	animals: {
		label: "Animais",
		items: [
			"Cão adulto calmo",
			"Cão filhote equilibrado",
			"Gato amigável",
			"Pássaros em praça",
			"Pequenos mamíferos (coelho ou hamster)",
			"Animal grande (cavalo, vaca) a distância segura",
			"Dois cães brincando perto",
		],
	},
	environments: {
		label: "Ambientes e superfícies",
		items: [
			"Grama alta",
			"Piso metálico/grade",
			"Paralelepípedo",
			"Escada com degraus vazados",
			"Elevador em movimento",
			"Loja pet movimentada",
			"Calçada com bicicletas",
		],
	},
	sounds: {
		label: "Sons",
		items: [
			"Fogos controlados em volume baixo",
			"Trânsito intenso",
			"Aspirador de pó",
			"Secador de cabelo",
			"Chuva forte",
			"Ferramentas de obra",
			"Crianças gritando",
		],
	},
	handling: {
		label: "Manipulação",
		items: [
			"Examinar orelhas",
			"Segurar patas traseiras",
			"Simular corte de unhas",
			"Limpar dentes com gaze",
			"Colocar peitoral/arnês",
			"Escovar dorso",
			"Checar cauda e traseiro",
		],
	},
};

export const labLibrary = [
	{
		id: "psyche",
		title: "Psicologia do Blue Heeler",
		summary:
			"Entenda o drive de pastoreio, a inteligência afiada e como redirecionar mordidas para trabalho produtivo.",
		bullets: [
			"Instinto heeler: mover e controlar calcanhares — nunca suprimir, sempre canalizar.",
			"Foco intenso (stare) é leitura de ambiente, não desafio.",
			"Teimosia aparente geralmente é falta de propósito claro.",
		],
		reference:
			"Dog Gone Problems, BlackPaw Dog Training, Guia Especialista Manus AI",
	},
	{
		id: "critical-periods",
		title: "Períodos críticos e medo",
		summary:
			"Planejamento de socialização entre 3-16 semanas e manejo dos fear periods para evitar fobias futuras.",
		bullets: [
			"Janela 3-16 semanas: 100 experiências curtas, positivas e variadas.",
			"Primeiro fear period (8-11 semanas): permitir recuo, não forçar.",
			"Segundo fear period (6-14 meses): reforçar confiança com comandos já dominados.",
		],
		reference: "American Kennel Club, Manus AI",
	},
	{
		id: "methodology",
		title: "Metodologia de maestria",
		summary:
			"Reforço positivo estruturado, repetição espaçada e consistência absoluta entre tutores.",
		bullets: [
			"Sessões curtas (5-10 min) com término em sucesso.",
			"Valor de recompensa proporcional à dificuldade do exercício.",
			"Progresso = duração → distância → distração (uma variável por vez).",
		],
		reference: "Dog Training Decoded (DIYK9)",
	},
	{
		id: "daily-structure",
		title: "Estrutura diária vencedora",
		summary:
			"Manhã: gastar energia e foco; tarde: socialização e enriquecimento; noite: bite + handling + calma.",
		bullets: [
			"Potty + nome + exploração logo cedo.",
			"Padrão socialização → sons → brincadeira estruturada à tarde.",
			"Fechar o dia com bite inhibition e handling positivos.",
		],
		reference: "Plano Manus AI, Apps premium analisados",
	},
	{
		id: "health",
		title: "Nutrição e saúde preventiva",
		summary:
			"Alta proteína, controle de peso e rastreamento de predisposições genéticas (displasia, PRA, MDR1).",
		bullets: [
			"Dividir refeições do filhote em 3-4 porções.",
			"Evitar exercícios de alto impacto em superfícies duras enquanto articulações maturam.",
			"Agendamento PennHIP e teste BAER quando indicado.",
		],
		reference: "PetMD, The Honest Kitchen",
	},
];

export const trainingPlanBlueprint = {
	phases: phaseDefinitions,
	goalTasks: goalTaskGenerators,
};

function ensureAllCounters(targets = {}) {
	const template = {
		socialContacts: 0,
		newSurfaces: 0,
		soundAcclimation: 0,
		handling: 0,
		trainingSessions: 0,
		mentalGames: 0,
		calmResets: 0,
	};
	return { ...template, ...targets };
}

function mergeMetricsTargets(baseMetrics, selectedGoals) {
	const merged = {
		counters: ensureAllCounters(baseMetrics?.counters),
		potty: {
			targetSuccessRate: baseMetrics?.potty?.targetSuccessRate ?? 0,
			scheduledBreaks: baseMetrics?.potty?.scheduledBreaks ?? 0,
		},
	};

	selectedGoals.forEach((goalId) => {
		const adjustments = goalMetricsAdjustments[goalId];
		if (!adjustments) return;
		if (adjustments.counters) {
			Object.entries(adjustments.counters).forEach(([key, value]) => {
				merged.counters[key] = (merged.counters[key] ?? 0) + value;
			});
		}
		if (adjustments.potty) {
			if (adjustments.potty.targetSuccessRate) {
				merged.potty.targetSuccessRate = Math.max(
					merged.potty.targetSuccessRate,
					adjustments.potty.targetSuccessRate
				);
			}
			if (adjustments.potty.scheduledBreaks) {
				merged.potty.scheduledBreaks = Math.max(
					merged.potty.scheduledBreaks,
					adjustments.potty.scheduledBreaks
				);
			}
		}
	});

	return merged;
}

function cloneTask(task, dateKey, fallbackTimeOfDay) {
	const baseId = task.baseId || task.id;
	return {
		...task,
		baseId,
		timeOfDay: task.timeOfDay || fallbackTimeOfDay,
		category: task.category || "Rotina",
		order: timeOfDayOrder[task.timeOfDay || fallbackTimeOfDay || "flex"] || 4,
		id: `${baseId}-${dateKey}`,
	};
}

export function calculateAgeInfo(birthDate, referenceDate = new Date()) {
	if (!birthDate) {
		return {
			valid: false,
			ageDays: 0,
			ageWeeks: 0,
			ageMonths: 0,
			humanReadable: "Informe a data de nascimento",
		};
	}
	const birth = new Date(birthDate);
	const ref = new Date(referenceDate);
	if (Number.isNaN(birth.getTime()) || Number.isNaN(ref.getTime())) {
		return {
			valid: false,
			ageDays: 0,
			ageWeeks: 0,
			ageMonths: 0,
			humanReadable: "Data inválida",
		};
	}
	const birthMs = new Date(
		birth.getFullYear(),
		birth.getMonth(),
		birth.getDate()
	).getTime();
	const refMs = new Date(
		ref.getFullYear(),
		ref.getMonth(),
		ref.getDate()
	).getTime();
	const diffMs = Math.max(0, refMs - birthMs);
	const ageDays = Math.floor(diffMs / DAY_MS);
	const ageWeeks = ageDays / 7;
	const ageMonths = diffMs / (DAY_MS * 30.4375);

	const weeks = Math.floor(ageWeeks);
	const daysRemainder = ageDays - weeks * 7;
	const months = Math.floor(ageMonths);
	const humanReadable =
		months >= 1
			? `${months} ${months === 1 ? "mês" : "meses"} e ${Math.max(
					0,
					Math.round((ageMonths - months) * 30)
			  )} dias`
			: `${weeks} ${
					weeks === 1 ? "semana" : "semanas"
			  } e ${daysRemainder} dias`;

	return {
		valid: true,
		ageDays,
		ageWeeks,
		ageMonths,
		humanReadable,
	};
}

export function determinePhase(ageDays, blueprint = trainingPlanBlueprint) {
	const phases = blueprint.phases;
	if (!phases?.length) {
		return null;
	}
	const sorted = [...phases].sort((a, b) => a.startDay - b.startDay);
	const match = sorted.find(
		(phase) => ageDays >= phase.startDay && ageDays <= phase.endDay
	);
	if (match) {
		return match;
	}
	if (ageDays < sorted[0].startDay) {
		return sorted[0];
	}
	return sorted[sorted.length - 1];
}

export function generateDailyPlan({
	date,
	birthDate,
	goals = [],
	availability = { morning: true, afternoon: true, evening: true },
	focusNotes = "",
	blueprint = trainingPlanBlueprint,
	previousLog = null,
}) {
	const dateObj = new Date(date);
	const dateKey = dateObj.toISOString().split("T")[0];
	const ageInfo = calculateAgeInfo(birthDate, dateObj);
	const phase = determinePhase(ageInfo.ageDays, blueprint);

	if (!phase) {
		return {
			phase: null,
			ageInfo,
			tasks: [],
			metricsTargets: {
				counters: ensureAllCounters(),
				potty: { targetSuccessRate: 0, scheduledBreaks: 0 },
			},
			mission: "",
			highlights: [],
		};
	}

	const tasks = [];
	const routine = phase.dailyRoutine || {};
	["morning", "afternoon", "evening"].forEach((slot) => {
		if (slot !== "flex" && availability && !availability[slot]) {
			return;
		}
		const slotTasks = routine[slot] || [];
		slotTasks.forEach((task) => {
			tasks.push(cloneTask(task, dateKey, slot));
		});
	});

	const flexTasks = routine.flex || [];
	flexTasks.forEach((task) => {
		tasks.push(cloneTask(task, dateKey, task.timeOfDay || "flex"));
	});

	const uniqueGoals =
		Array.isArray(goals) && goals.length > 0
			? goals
			: ["socialization", "pottyMastery", "obedience"];
	uniqueGoals.forEach((goalId) => {
		const generator = blueprint.goalTasks[goalId];
		if (!generator) return;
		const goalTasks = generator({ phase, ageInfo, dateKey, previousLog });
		goalTasks.forEach((task) => {
			const preferredSlot = task.timeOfDay || "flex";
			if (
				preferredSlot !== "flex" &&
				availability &&
				!availability[preferredSlot]
			) {
				const fallbackSlot = availability.morning
					? "morning"
					: availability.afternoon
					? "afternoon"
					: availability.evening
					? "evening"
					: "flex";
				tasks.push(cloneTask(task, dateKey, fallbackSlot));
			} else {
				tasks.push(cloneTask(task, dateKey, preferredSlot));
			}
		});
	});

	const dedupedTasks = [];
	const seen = new Set();
	tasks.forEach((task) => {
		if (seen.has(task.id)) return;
		seen.add(task.id);
		dedupedTasks.push(task);
	});

	dedupedTasks.sort((a, b) => {
		if (a.order === b.order) {
			return a.title.localeCompare(b.title);
		}
		return a.order - b.order;
	});

	const metricsTargets = mergeMetricsTargets(phase.metricsTargets, uniqueGoals);

	const primaryFocus = phase.focus?.slice(0, 2) || [];
	const extraMission = focusNotes
		? `Endereçar: ${focusNotes.split("\n")[0]}`
		: uniqueGoals
				.map((goalId) => goalCatalog.find((g) => g.id === goalId)?.label)
				.filter(Boolean)
				.slice(0, 2)
				.join(" · ");

	return {
		phase,
		phaseId: phase.id,
		phaseName: phase.name,
		ageInfo,
		tasks: dedupedTasks,
		metricsTargets,
		mission: primaryFocus.length
			? `${primaryFocus[0]}${primaryFocus[1] ? " | " + primaryFocus[1] : ""}`
			: extraMission,
		highlights: primaryFocus,
	};
}

export function buildWeeklyOutlook({
	startDate = new Date(),
	days = 7,
	birthDate,
	goals,
	availability,
	focusNotes,
	blueprint = trainingPlanBlueprint,
}) {
	const outlook = [];
	for (let i = 0; i < days; i += 1) {
		const day = new Date(startDate);
		day.setDate(day.getDate() + i);
		const plan = generateDailyPlan({
			date: day,
			birthDate,
			goals,
			availability,
			focusNotes,
			blueprint,
		});
		const weekday = day.toLocaleDateString("pt-BR", {
			weekday: "short",
		});
		outlook.push({
			date: day.toISOString().split("T")[0],
			weekday,
			phaseId: plan.phase?.id,
			phaseName: plan.phase?.name,
			mission: plan.mission,
			focus: plan.highlights?.slice(0, 2) || [],
			topTasks: plan.tasks.slice(0, 3).map((task) => task.title),
		});
	}
	return outlook;
}

export function aggregateWeeklyMetrics(
	logs = {},
	endDate = new Date(),
	days = 7
) {
	const counters = ensureAllCounters();
	const potty = { successes: 0, attempts: 0 };
	let tasksCompleted = 0;
	let tasksTotal = 0;
	let daysTracked = 0;
	let successDays = 0;

	const end = new Date(endDate);
	const start = new Date(end);
	start.setDate(start.getDate() - (days - 1));

	Object.entries(logs).forEach(([dateKey, log]) => {
		const current = new Date(dateKey);
		if (current < start || current > end) {
			return;
		}
		daysTracked += 1;
		const metrics = log.metrics || {};
		const logCounters = metrics.counters || {};
		Object.entries(logCounters).forEach(([key, value]) => {
			counters[key] = (counters[key] ?? 0) + (value ?? 0);
		});
		if (metrics.potty) {
			potty.successes += metrics.potty.successes ?? 0;
			potty.attempts += metrics.potty.attempts ?? 0;
		}
		const taskEntries = Object.values(log.tasks || {});
		const completed = taskEntries.filter((task) => task?.completed).length;
		tasksCompleted += completed;
		tasksTotal += taskEntries.length;
		if (taskEntries.length && completed / taskEntries.length >= 0.6) {
			successDays += 1;
		}
	});

	return {
		counters,
		potty,
		tasksCompleted,
		tasksTotal,
		daysTracked,
		successDays,
	};
}

export function getMilestonesForAge(
	ageDays,
	blueprint = trainingPlanBlueprint
) {
	const milestones = [];
	blueprint.phases.forEach((phase) => {
		phase.milestones?.forEach((milestone) => {
			milestones.push({
				...milestone,
				phaseId: phase.id,
				phaseName: phase.name,
				achieved: ageDays >= milestone.targetDay,
			});
		});
	});
	return milestones.sort((a, b) => a.targetDay - b.targetDay);
}

export default {
	trainingPlanBlueprint,
	goalCatalog,
	labLibrary,
	socialChecklistTemplate,
	calculateAgeInfo,
	determinePhase,
	generateDailyPlan,
	buildWeeklyOutlook,
	aggregateWeeklyMetrics,
	getMilestonesForAge,
};
