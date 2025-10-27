export const lessonLibrary = [
	{
		id: "lesson-potty-ritual",
		phaseId: "phase1",
		moduleId: "module-rotina",
		moduleName: "Rotinas Essenciais",
		title: "Ritual Potty de Precisão",
		summary:
			"Constrói hábito imediato de eliminar no local correto e reduz acidentes em casa.",
		objectives: [
			"Associar acordar ou sair da crate a ir direto ao ponto designado.",
			"Registrar sinais prévios e intervalos ideais entre saídas.",
		],
		why: "O primeiro comportamento do dia define a expectativa do filhote. Blue Heelers aprendem rapidamente padrões; criar um ritual claro evita que ele experimente superfícies erradas e protege a consistência do potty training.",
		steps: [
			{
				title: "Acordar e Pausar",
				detail:
					"Abra a crate sem festa. Segure a guia, peça um micro 'fica' de 2 segundos e libere com 'vai potty'.",
			},
			{
				title: "Linha Reta até o Local",
				detail:
					"Caminhe direto, sem permitir farejar lateralmente. Ao chegar, repita a pista verbal, permaneça neutro e aguarde.",
			},
			{
				title: "Reforço em Cinema",
				detail:
					"Assim que terminar, marque com 'sim', ofereça jackpot e acrescente 2 minutos de exploração extra como bônus natural.",
			},
		],
		temperamentTips: {
			altaEnergia:
				"Faça uma breve massagem calmante antes de abrir a crate para evitar explosões na saída.",
			sensivel:
				"Use voz suave e mantenha a guia folgada; evite movimentos bruscos que possam assustar.",
			independente:
				"Varie os jackpots (petisco, brinquedo) para manter o interesse alto.",
		},
		tools: ["Guia leve", "Petiscos de alto valor", "Cronograma diário visível"],
		troubleshooting: [
			{
				title: "Distração antes do potty",
				detail:
					"Reduza o roteiro: caminhe em linha reta sem permitir paradas. Se necessário, bloqueie visão com o corpo até finalizar.",
			},
			{
				title: "Sem eliminação em 5 minutos",
				detail:
					"Volte para a crate por 3 minutos e repita o processo. Mantém consistência sem transformar o local em passeio.",
			},
		],
		metrics: {
			primary: "Tentativas bem-sucedidas / dia",
			secondary: "Maior intervalo sem acidentes",
			notes: "Meta inicial: 8 saídas programadas com 80% de sucesso.",
		},
		gamification: {
			badge: "Potty de Ouro",
			unlock: "5 dias consecutivos acima de 85% de acerto",
			points: 40,
		},
		followUp: ["lesson-potty-precision", "lesson-decompression"],
		references: ["DIYK9 Potty Blueprint", "AKC Puppy House Training Guide"],
	},
	{
		id: "lesson-attention-reflex",
		phaseId: "phase1",
		moduleId: "module-conexao",
		moduleName: "Conexao e Foco",
		title: "Reflexo de Atenção Relâmpago",
		summary:
			"Instala resposta imediata ao nome com associação positiva consistente.",
		objectives: [
			"Construir reflexo Pavloviano: nome => contato visual em até 2 segundos.",
			"Generalizar atenção mesmo em ambientes com estímulos leves.",
		],
		why: "Blue Heelers analisam tudo ao redor. Criar um reflexo automático de olhar para o tutor mantém o cérebro cooperando antes que o instinto tome a decisão sozinho.",
		steps: [
			{
				title: "Session Zero",
				detail:
					"Prepare 20 petiscos. Diga o nome, espere micro desvio de olhar, marque 'sim' e recompense no nível do peito.",
			},
			{
				title: "Adicione Movimento",
				detail:
					"Dê um passo lateral antes de falar o nome. Reforce o olhar mesmo que leve meio segundo extra.",
			},
			{
				title: "Distracao Controlada",
				detail:
					"Ligue som ambiente baixo ou coloque brinquedo parado; pratique 10 repetições mantendo taxa de pagamento alta.",
			},
		],
		temperamentTips: {
			altaEnergia:
				"Use petiscos úmidos para manter o foco no tutor, reduzindo tempo de mastigação.",
			sensivel:
				"Abaixe-se e fale suavemente; olhares intensos podem intimidar.",
			independente:
				"Misture recompensas: comida, mini cabo de guerra ou liberdade para explorar.",
		},
		tools: [
			"Petiscos macios",
			"Marcador verbal ou clicker",
			"Planilha de repetições",
		],
		troubleshooting: [
			{
				title: "Demora a olhar",
				detail:
					"Diminua estímulos, use jackpot de 3 petiscos seguidos e treine em séries de 5 para evitar saturação.",
			},
			{
				title: "Olha e já volta a explorar",
				detail:
					"Prolongue a entrega do petisco mantendo o contato por 1 segundo antes de liberar.",
			},
		],
		metrics: {
			primary: "Tempo medio para contato visual",
			secondary: "Numero de repetições por sessao",
			notes: "Objetivo: 20 reps com latência < 1,5 s.",
		},
		gamification: {
			badge: "Radar Azul",
			unlock: "3 sessões seguidas com latência abaixo de 1,2 s",
			points: 35,
		},
		followUp: ["lesson-structured-play", "lesson-obedience-triad"],
		references: [
			"Karen Pryor Clicker Training",
			"Manus AI Especializacao Blue Heeler",
		],
	},
	{
		id: "lesson-controlled-exploration",
		phaseId: "phase1",
		moduleId: "module-socializacao",
		moduleName: "Socializacao Sensorial",
		title: "Exploracao Supervisionada Inteligente",
		summary:
			"Transforma a curiosidade bruta em experiência estruturada sem sobrecarga.",
		objectives: [
			"Expor o filhote a pelo menos três texturas diferentes por sessão.",
			"Ensinar a buscar reforço no tutor depois de cada descoberta.",
		],
		why: "Durante a janela critica, o mapa sensorial se forma rapidamente. Guiar a exploracao evita medos futuros e reforca que a referencia de seguranca e voce.",
		steps: [
			{
				title: "Curadoria do Ambiente",
				detail:
					"Disponha tapete emborrachado, piso liso e grade metalica. Deixe petiscos invisiveis estrategicamente.",
			},
			{
				title: "Seguir o Ritmo",
				detail:
					"Acompanhe a filhote sem dirigir. Quando tocar nova superficie, marque e recompense junto a voce.",
			},
			{
				title: "Fechamento Calmo",
				detail:
					"Encoste no peitoral, ofereca massagem curta e finalize antes de sinais de cansaco mental.",
			},
		],
		temperamentTips: {
			altaEnergia:
				"Limite a area com cercadinho para evitar corridas aleatorias.",
			sensivel: "Introduza uma superficie por vez e use tom de voz alegre.",
			independente:
				"Permita pequenas escolhas (ordem dos objetos) mas sempre recompense o retorno.",
		},
		tools: ["Superficies variadas", "Petiscos pequenos", "Timer"],
		troubleshooting: [
			{
				title: "Nao quer aproximar",
				detail:
					"Use tecnica da ponte: posicione petiscos em trilha progressiva e mantenha portas de fuga abertas.",
			},
			{
				title: "Excesso de excitacao",
				detail:
					"Inserir micro 'senta' entre exploracoes e reforcar calm resets.",
			},
		],
		metrics: {
			primary: "Novas experiencias registradas",
			secondary: "Tempo medio de recuperacao apos novidade",
			notes: "Registrar foto ou video para revisão semanal.",
		},
		gamification: {
			badge: "Explorador Equilibrado",
			unlock: "Completar 12 superfícies diferentes em uma semana",
			points: 30,
		},
		followUp: ["lesson-social-field-trip", "lesson-sound-acclimation"],
		references: ["Puppy Culture Curriculum", "DIYK9 Social Checklist"],
	},
	{
		id: "lesson-positive-social",
		phaseId: "phase1",
		moduleId: "module-socializacao",
		moduleName: "Socializacao Sensorial",
		title: "Checklist Social Premium",
		summary:
			"Garante experiencias humanas positivas variadas sem forcar interacoes.",
		objectives: [
			"Registrar ao menos cinco pessoas diferentes por dia com resposta neutra ou positiva.",
			"Ensinar o filhote a aproximar e recuar por vontade propria.",
		],
		why: "Blue Heelers adultos podem ser reservados. Exposicoes estrategicas agora aumentam a tolerancia e previnem reatividade baseada em medo.",
		steps: [
			{
				title: "Planejamento",
				detail:
					"Use a checklist semanal (pessoa com chapeu, cadeira de rodas, crianca). Avise os participantes para ignorarem o filhote inicialmente.",
			},
			{
				title: "Controle de Distancia",
				detail:
					"Comece a 2 metros. Recompense quando olhar para voce ao notar a novidade. So permita aproximacao apos sinal de relaxamento.",
			},
			{
				title: "Log de Resultados",
				detail:
					"Grave notas rapidas: quem, onde, emocao observada, distancia maxima confortavel.",
			},
		],
		temperamentTips: {
			altaEnergia: "Intercale com micro comandos (senta) para evitar saltos.",
			sensivel: "Crie saida segura atras de voce; nunca force toque.",
			independente:
				"Use pessoas que oferecam trabalho simples (segurar brinquedo) para motivar cooperacao.",
		},
		tools: ["Checklist impresso", "Clique ou marcador", "Petiscos variados"],
		troubleshooting: [
			{
				title: "Tenta pular nas pessoas",
				detail:
					"Reforce quatro patas no chao e aplique 'senta' antes de liberar aproximacao.",
			},
			{
				title: "Congela ou evita",
				detail:
					"Diminua distancia, volte a reforcar olhar para voce e finalize a sessao em nota positiva.",
			},
		],
		metrics: {
			primary: "Numero de contatos registrados",
			secondary: "Escala de emocao (1 relaxado a 5 tenso)",
			notes: "Objetivo fase 1: 100 experiencias ate 16 semanas.",
		},
		gamification: {
			badge: "Diplomata Azul",
			unlock: "Completar 30 contatos documentados",
			points: 45,
		},
		followUp: ["lesson-social-field-trip", "lesson-social-high-distraction"],
		references: ["Puppy Start Right", "Manus AI Social Strategy"],
	},
	{
		id: "lesson-sound-acclimation",
		phaseId: "phase1",
		moduleId: "module-socializacao",
		moduleName: "Socializacao Sensorial",
		title: "Dessensibilizacao Sonora",
		summary:
			"Cria associacoes positivas com ruidos urbanos antes que o medo se instale.",
		objectives: [
			"Apresentar biblioteca de sons graduais com reforco simultaneo.",
			"Ensinar o filhote a auto-regular usando enriquecimento enquanto sons aumentam.",
		],
		why: "Blue Heelers possuem audição apurada; sem dessensibilização precoce podem desenvolver hipersensibilidade sonora.",
		steps: [
			{
				title: "Selecao da Trilha",
				detail:
					"Use playlist (fogos, transito, aspirador) iniciando em volume 10%. Associe a refeicao ou LickiMat.",
			},
			{
				title: "Incrementos",
				detail:
					"Aumente 5% por sessao se mantiver postura relaxada. Se levantar ou rosnar, reduza 10% e marque calma.",
			},
			{
				title: "Generalizacao",
				detail:
					"Replique com sons ao vivo leves (talheres, portas) mantendo reforco.",
			},
		],
		temperamentTips: {
			altaEnergia: "Forneca atividade de lamber para desacelerar.",
			sensivel: "Permita distanciamento e observacao a partir da crate aberta.",
			independente:
				"Use jogos de farejar enquanto o som toca para manter envolvimento.",
		},
		tools: [
			"Playlist especializada",
			"Enriquecimento alimentar",
			"Medidor de volume",
		],
		troubleshooting: [
			{
				title: "Assusta e tenta fugir",
				detail:
					"Diminua o volume imediatamente, premie calmamente e reinicie no nivel em que estava confortavel.",
			},
			{
				title: "Ignora o som",
				detail:
					"Adicione movimento visual associado (abrir guarda-chuva) para checar se realmente consolidou.",
			},
		],
		metrics: {
			primary: "Nivel maximo de volume tolerado confortavelmente",
			secondary: "Tempo de recuperacao apos sons inesperados",
			notes: "Registrar video semanal para comparar linguagem corporal.",
		},
		gamification: {
			badge: "Ouvido de Aco",
			unlock: "Concluir 10 sessões sem sinais de estresse",
			points: 30,
		},
		followUp: ["lesson-social-high-distraction", "lesson-decompression"],
		references: ["Sound Proof Puppy App", "Journal of Vet Behavior 2024"],
	},
	{
		id: "lesson-structured-play",
		phaseId: "phase1",
		moduleId: "module-instinto",
		moduleName: "Instinto e Mordida",
		title: "Brincadeira Estruturada com Redirecionamento",
		summary:
			"Alinha brincadeiras intensas com regras claras e controles de impulso.",
		objectives: [
			"Ensinar troca rapida de brinquedos sem tocar pele humana.",
			"Introduzir sinal de inicio ('trabalho') e fim ('livre').",
		],
		why: "Quando o tutor controla o ritmo, o filhote aprende a ligar e desligar o motor sem entrar em modo predatorio.",
		steps: [
			{
				title: "Setup com Dois Brinquedos",
				detail:
					"Use cabo de guerra e bola com corda. Inicie com 'trabalho' e entregue o brinquedo apenas quando estiver calmo.",
			},
			{
				title: "Jogo de Troca",
				detail:
					"Depois de 5 segundos de mordida firme, apresente o segundo brinquedo parado. Assim que soltar, marque e reforce.",
			},
			{
				title: "Desacelerar",
				detail:
					"Peça 'deita' ou 'place', conte ate 10 respirando junto e libere com 'livre'.",
			},
		],
		temperamentTips: {
			altaEnergia:
				"Trabalhe em ciclos curtos (30 segundos) para evitar sobrecarga.",
			sensivel:
				"Use brinquedos macios e elogios calmos; evite movimentos bruscos.",
			independente:
				"Permita que traga o brinquedo ate voce para iniciar nova rodada.",
		},
		tools: [
			"Dois brinquedos resistentes",
			"Tapete antideslizante",
			"Cronometro",
		],
		troubleshooting: [
			{
				title: "Segura e nao solta",
				detail:
					"Introduza troca por petisco premium e recomece com brinquedo diferente.",
			},
			{
				title: "Mira em maos",
				detail:
					"Reforce somente quando morder o centro do brinquedo; pause imediatamente se tocar pele.",
			},
		],
		metrics: {
			primary: "Trocas sem tocar pele",
			secondary: "Tempo necessario para entrar em modo calmo ao final",
			notes: "Objetivo: 5 trocas perfeitas por sessao.",
		},
		gamification: {
			badge: "Condutor de Energia",
			unlock: "Realizar 20 trocas perfeitas em uma semana",
			points: 45,
		},
		followUp: ["lesson-control-instinct", "lesson-place-relax"],
		references: [
			"Control Unleashed Pattern Games",
			"Manus AI Instinct Strategies",
		],
	},
	{
		id: "lesson-control-instinct",
		phaseId: "phase1",
		moduleId: "module-instinto",
		moduleName: "Instinto e Mordida",
		title: "Controle do Instinto de Pastoreio",
		summary:
			"Redireciona o nipping para trabalho funcional com comandos de liga/desliga.",
		objectives: [
			"Reconhecer sinais pre-ativacao (olhar fixo, postura baixa).",
			"Ensinar a buscar brinquedo certo em menos de 3 segundos apos comando.",
		],
		why: "O nipping nao e teimosia: e programa genetico para mover pernas de gado. Redirecionar e respeitar o DNA trabalhando a nosso favor.",
		steps: [
			{
				title: "Interromper sem Confronto",
				detail:
					"Congele a postura ('vira arvore'), espere quebrar foco e marque o primeiro olhar.",
			},
			{
				title: "Ativar Brinquedo de Trabalho",
				detail:
					"Apresente corda longa movimentando como gado. Diga 'trabalho' para liberar mordida.",
			},
			{
				title: "Comando de Saida",
				detail:
					"Após 5 segundos, peça 'livre', pare o brinquedo e premie quando soltar voluntariamente.",
			},
		],
		temperamentTips: {
			altaEnergia:
				"Use brinquedo mais resistente e acrescente sessões extras curtas ao longo do dia.",
			sensivel:
				"Mantenha volume da voz alegre; evite correções duras que podem minar confiança.",
			independente:
				"Incuta tarefas (arrastar objeto) para aumentar senso de propósito.",
		},
		tools: [
			"Brinquedo tipo cabo com corda longa",
			"Clicker",
			"Petiscos premium",
		],
		troubleshooting: [
			{
				title: "Volta a morder calcanhar",
				detail:
					"Aumente valor do brinquedo e reduza distrações. Ajuste a duração para 3 segundos inicialmente.",
			},
			{
				title: "Excitação excessiva",
				detail:
					"Intercale com 'place' e respirações guiadas antes de nova rodada.",
			},
		],
		metrics: {
			primary: "Redirecionamentos bem-sucedidos em ate 3s",
			secondary: "Tempo para desconectar apos comando 'livre'",
			notes: "Meta: 7 de 10 tentativas em duas semanas.",
		},
		gamification: {
			badge: "Mestre do Instinto",
			unlock: "10 dias consecutivos sem nipping em pessoas",
			points: 60,
		},
		followUp: ["lesson-structured-play", "lesson-place-proof"],
		references: [
			"Journal of Veterinary Behavior 2023",
			"Manus AI Herding Redirect",
		],
	},
	{
		id: "lesson-handling-zen",
		phaseId: "phase1",
		moduleId: "module-manutencao",
		moduleName: "Handling e Grooming",
		title: "Handling Zen",
		summary: "Transforma manipulacao veterinaria em experiencia relaxante.",
		objectives: [
			"Permitir tocar patas, orelhas e boca sem retração.",
			"Associar escova e toalhas a reforço contínuo.",
		],
		why: "Blue Heelers inteligentes lembram experiencias negativas rapidamente. Treinar cooperação precoce evita lutas em procedimentos de vida toda.",
		steps: [
			{
				title: "Petting em Ritmo",
				detail:
					"Inicie acariciando areas neutras. Toque rapido na pata, marque, ofereça petisco. Repita ate 10 vezes.",
			},
			{
				title: "Ferramentas Graduais",
				detail:
					"Introduza escova leve encostando e retirando. Construa ate 5 passadas sem sinais de desconforto.",
			},
			{
				title: "Cooperacao Ativa",
				detail:
					"Ensine 'toca' para filhote oferecer a pata voluntariamente antes de simular corte de unha.",
			},
		],
		temperamentTips: {
			altaEnergia: "Realize apos atividade fisica leve para reduzir agitação.",
			sensivel: "Use tapete de lamber durante toda sessão.",
			independente: "Permita pausas curtas para explorar entre manipulações.",
		},
		tools: ["Escova macia", "Toalha", "Petiscos pastosos"],
		troubleshooting: [
			{
				title: "Puxa a pata",
				detail:
					"Retroceda e recompense por micro contato. Mantenha sessões de 2 minutos.",
			},
			{
				title: "Morde a ferramenta",
				detail:
					"Troque por mordedor apropriado e segure ferramenta fora do alcance ate estar calmo.",
			},
		],
		metrics: {
			primary: "Tempo de cooperacao continua",
			secondary: "Numero de regioes manipuladas sem resistencia",
			notes: "Registrar dias em que aceita simulação completa de consulta.",
		},
		gamification: {
			badge: "Paciente Modelo",
			unlock: "Concluir check-up completo em casa duas vezes na semana",
			points: 35,
		},
		followUp: ["lesson-place-relax", "lesson-leave-it"],
		references: ["Fear Free Handling", "DIYK9 Handling Ladder"],
	},
	{
		id: "lesson-calm-crate",
		phaseId: "phase1",
		moduleId: "module-regulacao",
		moduleName: "Regulacao Emocional",
		title: "Crate como Spa",
		summary:
			"Ancoragem emocional para descanso profundo e prevencao de ansiedade de separacao.",
		objectives: [
			"Ensinar a entrar no crate por vontade própria.",
			"Aumentar duracao relaxada ate 20 minutos com porta aberta ou fechada.",
		],
		why: "Quando a crate vira lugar de decompression, o filhote aprende a desligar mesmo em casas movimentadas.",
		steps: [
			{
				title: "Convite VIP",
				detail:
					"Jogue petisco dentro, deixe explorar e sair. Repita ate entrar com entusiasmo.",
			},
			{
				title: "Banquete Calmo",
				detail:
					"Ofereça LickiMat ou Kong congelado apenas dentro do crate. Feche a porta por 1-2 minutos e abra antes de reclamar.",
			},
			{
				title: "Sair com Permissao",
				detail:
					"Antes de liberar, peça um comportamento calmo (senta). Aumente gradualmente o tempo com porta fechada.",
			},
		],
		temperamentTips: {
			altaEnergia: "Realize apos sessão mental para reduzir inquietação.",
			sensivel: "Mantenha crate em area silenciosa, cubra parcialmente.",
			independente:
				"Inclua brinquedo de resolver para tornar o ambiente interessante.",
		},
		tools: [
			"Crate confortável",
			"Enriquecimento alimentar",
			"Playlist relaxante",
		],
		troubleshooting: [
			{
				title: "Chora imediatamente",
				detail:
					"Diminuir duração, reforçar micro momentos de silêncio, evitar abrir durante vocalização.",
			},
			{
				title: "Sai como foguete",
				detail:
					"Segure porta semi aberta, peça 'wait', libere quando estiver calmo.",
			},
		],
		metrics: {
			primary: "Tempo relaxado no crate",
			secondary: "Numero de entradas voluntarias por dia",
			notes: "Meta fase 1: 20 minutos relaxados com porta fechada.",
		},
		gamification: {
			badge: "Spa Azul",
			unlock: "Manter 30 minutos tranquilos 3 vezes na semana",
			points: 40,
		},
		followUp: ["lesson-decompression", "lesson-place-relax"],
		references: ["Susan Garrett Crate Games", "Manus AI Calm Protocol"],
	},
	{
		id: "lesson-potty-precision",
		phaseId: "phase2",
		moduleId: "module-rotina",
		moduleName: "Rotinas Essenciais",
		title: "Potty com Comando e Diario Analitico",
		summary:
			"Aprimora o controle da bexiga e transforma o log em ferramenta de previsao.",
		objectives: [
			"Adicionar comando 'vai no banheiro' antes de cada saida.",
			"Identificar horario de maior risco e ajustar agenda.",
		],
		why: "Na adolescencia o filhote testa limites. Dados objetivos evitam regressao.",
		steps: [
			{
				title: "Comando Antecipado",
				detail:
					"Pare 2 metros antes do local, peça 'wait', depois 'vai no banheiro' enquanto avança.",
			},
			{
				title: "Checklist 3x ao Dia",
				detail:
					"Registre horario, sucesso e fator desencadeante (sono, brincadeira).",
			},
			{
				title: "Recompensa Variavel",
				detail: "Use jackpot em momentos críticos (noite, chuva).",
			},
		],
		temperamentTips: {
			altaEnergia:
				"Inclua caminhada calma de 2 minutos apos sucesso para gastar energia residual.",
			sensivel: "Evite ambientes com muito barulho durante a noite.",
			independente:
				"Incremente jogos de farejar no local correto para mantê-lo interessante.",
		},
		tools: ["Planilha de log", "Petiscos", "Timer"],
		troubleshooting: [
			{
				title: "Regressao noturna",
				detail:
					"Aumente ultima saída em 15 minutos e reduz agua 1h antes de dormir.",
			},
			{
				title: "Nao responde ao comando",
				detail:
					"Pratique o comando dentro de casa sobre tapete higiênico para reforcar associação verbal.",
			},
		],
		metrics: {
			primary: "Taxa de acerto semanal",
			secondary: "Maior intervalo entre saidas sem acidente",
			notes: "Objetivo Fase 2: 90% de acertos em 7 dias.",
		},
		gamification: {
			badge: "Potty Master",
			unlock: "10 dias seguidos acima de 92%",
			points: 45,
		},
		followUp: ["lesson-decompression", "lesson-strategic-review"],
		references: ["DIYK9 Potty Advanced", "AKC House Training"],
	},
	{
		id: "lesson-loose-leash",
		phaseId: "phase2",
		moduleId: "module-obediencia",
		moduleName: "Obediencia Estruturada",
		title: "Caminhada com Guia Frouxa",
		summary: "Ensina o heeler a sincronizar passadas sem puxar.",
		objectives: [
			"Estabelecer posicao de recompensa ao lado esquerdo.",
			"Criar reflexo de voltar para o tutor quando a guia tensiona.",
		],
		why: "Blue Heelers sao fortes e estrategicos. Sem conduta precoce, puxar vira jogo de força.",
		steps: [
			{
				title: "Zona de Recompensa",
				detail:
					"Demarque com fita no chao. Caminhe 2 passos, premie quando ombro alinhar ao seu joelho.",
			},
			{
				title: "Metodo Pare e Volte",
				detail:
					"Se puxar, pare e volte lentamente ate recuperar posicao desejada.",
			},
			{
				title: "Alternancia de Ritmo",
				detail: "Troque velocidade e direcoes mantendo guia folgada.",
			},
		],
		temperamentTips: {
			altaEnergia:
				"Faça micro sprints seguidos de 'senta' para liberar energia de forma controlada.",
			sensivel: "Evite arrastar; use voz suave e recompensas constantes.",
			independente:
				"Dê tarefas como carregar brinquedo na boca para aumentar engajamento.",
		},
		tools: ["Peitoral em Y", "Guia 1,8m", "Petiscos macios"],
		troubleshooting: [
			{
				title: "Puxa ao ver estimulo",
				detail:
					"Aumente distancia, peça 'olha pra mim' e relance recompensa maior.",
			},
			{
				title: "Anda atras de voce",
				detail: "Reduza ritmo, use voz animada e recompense quando alinhar.",
			},
		],
		metrics: {
			primary: "Metros percorridos com guia frouxa",
			secondary: "Numero de correcoes necessarias",
			notes: "Objetivo: 10 minutos sem tracao em ambientes calmos.",
		},
		gamification: {
			badge: "Guia de Seda",
			unlock: "5 caminhadas consecutivas sem puxões",
			points: 50,
		},
		followUp: ["lesson-place-relax", "lesson-recall-rocket"],
		references: ["Leslie McDevitt Pattern Games", "DIYK9 Loose Leash"],
	},
	{
		id: "lesson-obedience-triad",
		phaseId: "phase2",
		moduleId: "module-obediencia",
		moduleName: "Obediencia Estruturada",
		title: "Tríade Sit-Down-Stay",
		summary: "Constrói cadeias de comportamento com foco e calma.",
		objectives: [
			"Executar sequencia sit ➔ down ➔ stay com 80% de acerto.",
			"Adicionar distancia de dois passos ao 'stay'.",
		],
		why: "Combinar comandos reforca autocontrole e prepara para desafios mais complexos.",
		steps: [
			{
				title: "Blocos Individuais",
				detail: "Treine cada comando isolado 5 vezes com reforco.",
			},
			{
				title: "Sequencia Guiada",
				detail: "Sit ➔ Down ➔ Stay (5s) ➔ Libera. Pague apos cada bloco.",
			},
			{
				title: "Prova com Distração",
				detail:
					"Adicione brinquedo imóvel ou pessoa passando, mantendo taxa de acertos acima de 70%.",
			},
		],
		temperamentTips: {
			altaEnergia: "Use colchonete antiderrapante para que nao escorregue.",
			sensivel: "Fale baixo e evite gestos grandes.",
			independente: "Introduza clicker para clareza e mantenha sessões breves.",
		},
		tools: ["Marcador", "Tapete", "Petiscos"],
		troubleshooting: [
			{
				title: "Quebra o stay cedo",
				detail: "Reduza para 3 segundos e pague com jackpot quando completar.",
			},
			{
				title: "Responde lentamente",
				detail:
					"Aumente valor do reforco e divida a sequencia em partes novamente.",
			},
		],
		metrics: {
			primary: "Taxa de acerto da sequencia",
			secondary: "Latência media para obedecer",
			notes: "Objetivo: 3 sequencias limpas por sessão.",
		},
		gamification: {
			badge: "Maestro da Sequencia",
			unlock: "Realizar 20 sequencias perfeitas em 7 dias",
			points: 55,
		},
		followUp: ["lesson-generalization", "lesson-place-relax"],
		references: ["Control Unleashed", "DIYK9 Obedience Roadmap"],
	},
	{
		id: "lesson-generalization",
		phaseId: "phase2",
		moduleId: "module-obediencia",
		moduleName: "Obediencia Estruturada",
		title: "Drills de Generalizacao",
		summary: "Leva comportamentos aprendidos para novos cenarios rapidamente.",
		objectives: [
			"Reproduzir comandos basicos em tres ambientes diferentes.",
			"Manter consistencia de reforco variavel para cimentar comportamento.",
		],
		why: "Sem generalizacao, o Blue Heeler acha que comando so vale no local original.",
		steps: [
			{
				title: "Lista de Ambientes",
				detail: "Escolha tres locais (cozinha, quintal, garagem).",
			},
			{
				title: "Blocos Curtos",
				detail: "Execute 5 repeticoes em cada local com reforco alto.",
			},
			{
				title: "Prova Rápida",
				detail:
					"Insira distração moderada e pague com jackpot na primeira resposta correta.",
			},
		],
		temperamentTips: {
			altaEnergia: "Inclua micro corrida entre locais para manter engajamento.",
			sensivel: "Permita tempo extra para cheirar antes de iniciar.",
			independente: "Use jogos com brinquedo preferido como recompensa final.",
		},
		tools: ["Lista de ambientes", "Recompensas variadas"],
		troubleshooting: [
			{
				title: "Ignora em novo local",
				detail:
					"Volte um passo, pague toda resposta correta e reduza distrações.",
			},
			{
				title: "Perde interesse",
				detail: "Faça sessões de 3 minutos e finalize com brincadeira.",
			},
		],
		metrics: {
			primary: "Numero de ambientes com 80% de acerto",
			secondary: "Tempo para reestabelecer comportamento em local novo",
			notes: "Registrar progresso no diario.",
		},
		gamification: {
			badge: "Camaleao de Comandos",
			unlock: "Generalizar para cinco ambientes diferentes",
			points: 40,
		},
		followUp: ["lesson-social-field-trip", "lesson-recall-rocket"],
		references: ["Canine Cognition Lab 2022", "DIYK9 Generalization"],
	},
	{
		id: "lesson-social-field-trip",
		phaseId: "phase2",
		moduleId: "module-socializacao",
		moduleName: "Socializacao Avancada",
		title: "Passeio de Observacao Guiada",
		summary: "Mantem habito de observar o mundo mantendo foco no tutor.",
		objectives: [
			"Praticar 'olha pra mim' diante de estimulos em movimento.",
			"Registrar gatilhos que precisam de trabalho extra.",
		],
		why: "Durante adolescencia surgem medos secundarios. Manter passeios como aulas controladas prevene reatividade.",
		steps: [
			{
				title: "Escolha o Local",
				detail:
					"Praça tranquila ou estacionamento. Define zonas de distancia confortável.",
			},
			{
				title: "Ciclo de Observacao",
				detail:
					"Permita assistir 3 segundos, peça 'olha', marque e recompense com chuva de petiscos.",
			},
			{
				title: "Notas Imediatas",
				detail:
					"Anote o que apareceu e como reagiu. Ajuste distancia na proxima visita.",
			},
		],
		temperamentTips: {
			altaEnergia:
				"Inicie com pequena caminhada para gastar energia antes de posicionar.",
			sensivel: "Use tapete de place para oferecer referencia.",
			independente:
				"Transforme em jogo de scout: premio extra por olhar para voce apos detectar novidade.",
		},
		tools: ["Guia longa", "Tapete", "Planilha de log"],
		troubleshooting: [
			{
				title: "Late para estimulos",
				detail: "Aumente distancia e recompense antes que abra a boca.",
			},
			{
				title: "Desliga e deita",
				detail:
					"Finalize apos 5 minutos e volte em outro horario mais tranquilo.",
			},
		],
		metrics: {
			primary: "Numero de sucessos 'olha pra mim'",
			secondary: "Escala de intensidade do estimulo",
			notes: "Meta: 10 sucessos por passeio.",
		},
		gamification: {
			badge: "Sentinela Calma",
			unlock: "Registrar 8 passeios com notas positivas",
			points: 45,
		},
		followUp: ["lesson-social-high-distraction", "lesson-decompression"],
		references: ["Look At That Game", "Manus AI Field Trips"],
	},
	{
		id: "lesson-leave-it",
		phaseId: "phase2",
		moduleId: "module-controle",
		moduleName: "Autocontrole",
		title: "Protocolo Deixa/Larga",
		summary: "Garante que objetos perigosos sejam ignorados sob comando.",
		objectives: [
			"Ensinar 'deixa' para itens no chao e na mao.",
			"Trocar por recompensa melhor sem conflito.",
		],
		why: "Impulsividade e comum em Blue Heelers. Ensinar troca suave reduz risco de recursos indevidos.",
		steps: [
			{
				title: "Inicio na Mao",
				detail:
					"Feche o punho com petisco. Quando recuar, marque e ofereça outro petisco da outra mão.",
			},
			{
				title: "No Chao",
				detail:
					"Coloque petisco sob o pé. Diga 'deixa', espere recuar, premie pela outra mão.",
			},
			{
				title: "Itens Valiosos",
				detail:
					"Introduza brinquedo favorito, peça troca e devolva após poucos segundos.",
			},
		],
		temperamentTips: {
			altaEnergia:
				"Mantenha sessões curtas e energicas para evitar frustração.",
			sensivel: "Fale baixo, evite gestos bruscos.",
			independente: "Inclua comando 'pega' como recompensa controlada.",
		},
		tools: ["Petiscos de valores distintos", "Tapete", "Brinquedo preferido"],
		troubleshooting: [
			{
				title: "Rosna ao trocar",
				detail:
					"Aumente valor da recompensa oferecida e devolva o item original apos alguns segundos.",
			},
			{
				title: "Ignora o comando",
				detail: "Trabalhe novamente no nível da mão fechada.",
			},
		],
		metrics: {
			primary: "Tempo para recuar",
			secondary: "Numero de trocas sem resistencia",
			notes: "Busque latência abaixo de 1 segundo.",
		},
		gamification: {
			badge: "Guardiao Controlado",
			unlock: "30 trocas perfeitas registradas",
			points: 40,
		},
		followUp: ["lesson-impulse-games", "lesson-place-proof"],
		references: ["Susan Garrett It's Yer Choice", "DIYK9 Impulse Blueprint"],
	},
	{
		id: "lesson-recall-rocket",
		phaseId: "phase2",
		moduleId: "module-recall",
		moduleName: "Recall Explosivo",
		title: "Recall Foguete",
		summary: "Constrói retorno rapido mesmo em alta distração.",
		objectives: [
			"Manter resposta em menos de 2 segundos a 5 metros.",
			"Transformar vir quando chamado em evento incrivelmente positivo.",
		],
		why: "Recall salva vidas. Blue Heelers amam perseguir; sem treino especifico, ignoram o tutor.",
		steps: [
			{
				title: "Pega-Pega Invertido",
				detail: "Duas pessoas chamam alternadamente, agachadas, com jackpots.",
			},
			{
				title: "Nome + Vem",
				detail:
					"Adicione comando claro e premio aleatorio (comida, brinquedo).",
			},
			{
				title: "Prova com Distração",
				detail:
					"Introduza brinquedo no chão e chame. Se atender, jackpot triplo.",
			},
		],
		temperamentTips: {
			altaEnergia: "Use frisbee ou corrida como recompensa apos retorno.",
			sensivel: "Abaixe-se e abra os braços para convidar.",
			independente: "Acrescente tarefas de buscar alvo apos recall.",
		},
		tools: ["Guia longa", "Dois tutores", "Recompensas variáveis"],
		troubleshooting: [
			{
				title: "Demora a retornar",
				detail: "Diminuir distância e aumentar valor da recompensa.",
			},
			{
				title: "Para na metade",
				detail:
					"Corra de costas para ele e reforce o movimento constante até você.",
			},
		],
		metrics: {
			primary: "Latência do recall",
			secondary: "Taxa de sucesso em diferentes ambientes",
			notes: "Objetivo: 40 sessões documentadas.",
		},
		gamification: {
			badge: "Turbo Recall",
			unlock: "90% de sucesso em 40 sessões",
			points: 60,
		},
		followUp: ["lesson-recall-proof", "lesson-place-proof"],
		references: ["Leslie Nelson Really Reliable Recall", "DIYK9 Recall"],
	},
	{
		id: "lesson-mental-puzzle",
		phaseId: "phase2",
		moduleId: "module-enriquecimento",
		moduleName: "Energia Mental",
		title: "Rotacao de Puzzles Mentais",
		summary: "Fornece desafios cognitivos que cansam antes do corpo.",
		objectives: [
			"Apresentar pelo menos dois tipos de quebra-cabeças por semana.",
			"Registrar tempo de resolucao para calibrar dificuldade.",
		],
		why: "Heeler entediado cria problemas. Cansa-lo mentalmente reduz mordidas, latidos e ansiedade.",
		steps: [
			{
				title: "Selecao do Dia",
				detail: "Escolha entre nosework, caixa de copos, toalha enrolada.",
			},
			{
				title: "Cronometre",
				detail: "Use timer para saber o tempo até resolver e ajuste.",
			},
			{
				title: "Descompressao",
				detail: "Finalize com massagem ou calm reset.",
			},
		],
		temperamentTips: {
			altaEnergia: "Combine com obediencia rapida entre puzzles.",
			sensivel: "Evite puzzles barulhentos; prefira olfativos.",
			independente: "Escalone dificuldade para manter interesse.",
		},
		tools: ["Puzzles variados", "Timer", "Planilha"],
		troubleshooting: [
			{
				title: "Desiste rapido",
				detail: "Reduza dificuldade e ajude nas primeiras tentativas.",
			},
			{
				title: "Resolve em segundos",
				detail: "Aumente camadas ou use recheios congelados.",
			},
		],
		metrics: {
			primary: "Tempo medio para resolver",
			secondary: "Numero de puzzles diferentes na semana",
			notes: "Meta: 15 min de estimulação mental diária.",
		},
		gamification: {
			badge: "Cerebro de Titânio",
			unlock: "Executar 300 jogos mentais no acumulado",
			points: 55,
		},
		followUp: ["lesson-shaping-creative", "lesson-nosework-progression"],
		references: ["K9 Nosework Association", "Canine Enrichment Framework"],
	},
	{
		id: "lesson-place-relax",
		phaseId: "phase2",
		moduleId: "module-regulacao",
		moduleName: "Regulacao Emocional",
		title: "Place Relaxamento Progressivo",
		summary: "Ensina o cão a desligar em tapete ou cama sob comando.",
		objectives: [
			"Estender permanência calma para 2 minutos.",
			"Manter controle mesmo com estímulos leves ao redor.",
		],
		why: "Place é botão de pausa. Essencial para visitas, cafés e rotina caseira.",
		steps: [
			{
				title: "Criar Valor",
				detail:
					"Reforçe intensamente cada vez que tocar o tapete. Alimente reforços no chão.",
			},
			{
				title: "Duracao",
				detail:
					"Aumente em blocos de 5 segundos, oferecendo petiscos em intervalos variáveis.",
			},
			{
				title: "Distrações",
				detail:
					"Ande ao redor, jogue itens no chão a distância e premie quando permanecer calmo.",
			},
		],
		temperamentTips: {
			altaEnergia: "Pratique após atividade física.",
			sensivel: "Use tapete texturizado confortável.",
			independente:
				"Adicione osso ou brinquedo de mastigar ao final como bônus.",
		},
		tools: ["Tapete ou cama", "Petiscos", "Timer"],
		troubleshooting: [
			{
				title: "Levanta com frequência",
				detail: "Reduza duração e pague a cada 2 segundos inicialmente.",
			},
			{
				title: "Morde o tapete",
				detail:
					"Troque por superfície diferente e forneça brinquedo de mastigar adequado.",
			},
		],
		metrics: {
			primary: "Tempo em relaxamento",
			secondary: "Numero de distrações suportadas",
			notes: "Objetivo: 3 sessões de 2 minutos por dia.",
		},
		gamification: {
			badge: "Zen Master",
			unlock: "5 dias com place 5 minutos sem quebras",
			points: 50,
		},
		followUp: ["lesson-place-proof", "lesson-cafe-manners"],
		references: ["Relax on a Mat Protocol", "DIYK9 Calm"],
	},
	{
		id: "lesson-cardio-focus",
		phaseId: "phase3",
		moduleId: "module-trabalho",
		moduleName: "Trabalho Fisico e Foco",
		title: "Cardio com Foco",
		summary:
			"Alterna corrida e obediência para gastar energia sem perder controle.",
		objectives: [
			"Manter guia frouxa mesmo em trotes curtos.",
			"Responder a comandos apos esforço.",
		],
		why: "Blue Heelers precisam de cardio diário. Integrar comandos evita que ignorem instruções durante excitação.",
		steps: [
			{
				title: "Aquecimento",
				detail: "2 minutos de caminhada rápida com reforço intermitente.",
			},
			{
				title: "Ciclos",
				detail: "30 segundos correndo, 15 segundos em 'junto', 5 repetições.",
			},
			{
				title: "Resfriamento",
				detail: "Finalize com 'place' e água fresca.",
			},
		],
		temperamentTips: {
			altaEnergia: "Aumente número de ciclos gradualmente.",
			sensivel: "Evite superfícies ásperas, monitore respiração.",
			independente: "Adicione tarefas (carregar frisbee) para engajar.",
		},
		tools: ["Peitoral esportivo", "Chronometro", "Água"],
		troubleshooting: [
			{
				title: "Puxa demais",
				detail: "Retorne ao passo 1 com ritmo menor e aumente reforço.",
			},
			{
				title: "Perde interesse",
				detail: "Inclua mini brincadeira de cabo ao final de cada ciclo.",
			},
		],
		metrics: {
			primary: "Ciclos completados",
			secondary: "Frequência cardíaca (visual) após exercício",
			notes: "Objetivo: 20 minutos combinados, 4 vezes/semana.",
		},
		gamification: {
			badge: "Atleta Azul",
			unlock: "Completar 15 sessões de cardio controlado",
			points: 60,
		},
		followUp: ["lesson-nosework-progression", "lesson-impulse-games"],
		references: ["Canine Conditioning Coalition", "Manus AI Work Drive"],
	},
	{
		id: "lesson-shaping-creative",
		phaseId: "phase3",
		moduleId: "module-enriquecimento",
		moduleName: "Energia Mental",
		title: "Shaping Criativo",
		summary: "Expande repertório comportamental e autonomia cognitiva.",
		objectives: [
			"Capturar 3 novos micro comportamentos",
			"Usar clicker para construir truques complexos.",
		],
		why: "Shaping ativa a capacidade de resolver problemas de forma independente, reduzindo frustração.",
		steps: [
			{
				title: "Configurar Ambiente",
				detail:
					"Coloque caixa, cone e target. Click para qualquer movimento na direção desejada.",
			},
			{
				title: "Elevar Critério",
				detail:
					"Apenas clique quando tocar o target com a pata, depois quando mantiver 1 segundo.",
			},
			{
				title: "Nomear",
				detail: "Adicione comando quando comportamento estiver consistente.",
			},
		],
		temperamentTips: {
			altaEnergia: "Escolha comportamento que envolva movimento controlado.",
			sensivel: "Clique suave, use recompensa calma.",
			independente: "Permita explorar objetos antes de começar.",
		},
		tools: ["Clicker", "Targets", "Petiscos"],
		troubleshooting: [
			{
				title: "Fica frustrado",
				detail: "Volte um critério e aumente frequência de cliques.",
			},
			{
				title: "Repete comportamento antigo",
				detail: "Ignore e aguarde variação. Faça pausa curta.",
			},
		],
		metrics: {
			primary: "Novos comportamentos capturados",
			secondary: "Tempo ate comportamento final",
			notes: "Limite sessões a 5 minutos para manter motivação.",
		},
		gamification: {
			badge: "Arquiteto Cognitivo",
			unlock: "Capturar 10 truques via shaping",
			points: 55,
		},
		followUp: ["lesson-impulse-games", "lesson-recall-proof"],
		references: ["Kay Laurence Shaping", "DIYK9 Creative Sessions"],
	},
	{
		id: "lesson-place-proof",
		phaseId: "phase3",
		moduleId: "module-regulacao",
		moduleName: "Regulação Emocional",
		title: "Place com Provas",
		summary: "Fortalece permanencia em tapete mesmo com estímulos intensos.",
		objectives: [
			"Manter place por 3 minutos com distrações",
			"Introduzir comando de emergencia para desligar.",
		],
		why: "Vida real inclui visitas, crianças correndo e comida no chão. Place prova garante segurança.",
		steps: [
			{
				title: "Empilhar Distrações",
				detail:
					"Comece com barulho leve, depois movimento, depois comida passando.",
			},
			{
				title: "Distância do Tutor",
				detail: "Aumente distância até 3 metros mantendo reforço intermitente.",
			},
			{
				title: "Botão de Emergência",
				detail:
					"Adicione 'relaxa' com respiração e petisco entregue lentamente.",
			},
		],
		temperamentTips: {
			altaEnergia: "Faça cardio antes para reduzir excesso de impulsos.",
			sensivel: "Comece com distrações sonoras suaves, sem toque.",
			independente:
				"Recompense com liberação para trabalho (buscar brinquedo).",
		},
		tools: ["Tapete", "Petiscos", "Itens para distração"],
		troubleshooting: [
			{
				title: "Sai repetidamente",
				detail: "Reduza duração e aumente valor do reforço dentro do place.",
			},
			{
				title: "Late para distração",
				detail:
					"Aumente distância da distração e reforce comportamento quieto.",
			},
		],
		metrics: {
			primary: "Tempo máximo com distração",
			secondary: "Número de distrações toleradas",
			notes: "Meta: 3 minutos com distração média.",
		},
		gamification: {
			badge: "Guardião Zen",
			unlock: "Manter place 5 minutos com pessoas passando",
			points: 60,
		},
		followUp: ["lesson-cafe-manners", "lesson-decompression"],
		references: ["Karen Overall Relaxation Protocol", "DIYK9 Proofing"],
	},
	{
		id: "lesson-nosework-progression",
		phaseId: "phase3",
		moduleId: "module-trabalho",
		moduleName: "Trabalho Funcional",
		title: "Progresso em Nosework",
		summary: "Canaliza drive de busca para atividade estruturada em camadas.",
		objectives: [
			"Executar 3 rodadas com aumento de dificuldade",
			"Registrar padrões de busca e fadiga mental.",
		],
		why: "Olfato e a via mais natural de cansaço mental para heelers. Nosework cria trabalho significativo.",
		steps: [
			{
				title: "Busca Simples",
				detail: "Esconda 3 petiscos em caixas abertas.",
			},
			{
				title: "Camada Intermediária",
				detail: "Use caixas fechadas com furos; aumente altura.",
			},
			{
				title: "Distracoes",
				detail: "Adicione caixa vazia com cheiro neutro e peça para continuar.",
			},
		],
		temperamentTips: {
			altaEnergia: "Integre com exercícios físicos curtos entre rodadas.",
			sensivel: "Evite superfícies escorregadias.",
			independente: "Defina tempo limite para evitar auto reforço exagerado.",
		},
		tools: ["Caixas", "Fonte de odor", "Cronometro"],
		troubleshooting: [
			{
				title: "Late durante busca",
				detail: "Diminua dificuldade e recompense silêncio.",
			},
			{
				title: "Perde interesse",
				detail: "Use alimento mais aromático e reduza número de repetições.",
			},
		],
		metrics: {
			primary: "Tempo médio para achar cada odor",
			secondary: "Número de rodadas completadas sem desistência",
			notes: "Registrar comportamento no diário para ajustar.",
		},
		gamification: {
			badge: "Nariz de Ouro",
			unlock: "Mapear 50 buscas completas",
			points: 65,
		},
		followUp: ["lesson-recall-proof", "lesson-strategic-review"],
		references: ["NACSW Training", "Canine Nosework Research 2024"],
	},
	{
		id: "lesson-social-high-distraction",
		phaseId: "phase3",
		moduleId: "module-socializacao",
		moduleName: "Socializacao Avancada",
		title: "Socializacao em Alta Distração",
		summary: "Mantém equilíbrio emocional em ambientes urbanos intensos.",
		objectives: [
			"Alternar trabalho e relaxamento em locais cheios",
			"Identificar limites de estímulos e planejar ajustes.",
		],
		why: "Sem manutenção, a maturidade pode trazer seletividade. Ambientes intensos reforçam autocontrole.",
		steps: [
			{
				title: "Mapeamento",
				detail:
					"Escolha shopping aberto ou feira. Observe sinais antes de iniciar.",
			},
			{
				title: "Blocos Trabalho/Relax",
				detail: "1 minuto de 'junto', 30 segundos no place portátil.",
			},
			{
				title: "Resumo",
				detail: "Anote gatilhos fortes e planeje exposures futuras graduais.",
			},
		],
		temperamentTips: {
			altaEnergia: "Faça cardio leve antes.",
			sensivel: "Comece em horários menos movimentados.",
			independente: "Dê micro tarefas (carregar mochila leve) para foco.",
		},
		tools: ["Place portátil", "Guia dupla", "Planilha"],
		troubleshooting: [
			{
				title: "Late para pessoas",
				detail: "Aumente distancia, volte a foco com petiscos premium.",
			},
			{
				title: "Super estimulado",
				detail: "Encerre cedo e retorne em dia mais calmo.",
			},
		],
		metrics: {
			primary: "Tempo tolerado sem sinais de estresse",
			secondary: "Numero de estímulos enfrentados",
			notes: "Registrar vídeos para revisar linguagem corporal.",
		},
		gamification: {
			badge: "Cidadão Modelo",
			unlock: "Concluir 10 visitas urbanas equilibradas",
			points: 65,
		},
		followUp: ["lesson-cafe-manners", "lesson-decompression"],
		references: ["The Urban Dog Project", "DIYK9 Social Mastery"],
	},
	{
		id: "lesson-impulse-games",
		phaseId: "phase3",
		moduleId: "module-controle",
		moduleName: "Autocontrole Avançado",
		title: "Jogos de Impulso Inteligentes",
		summary: "Consolida decisão voluntária de esperar, mesmo com tentações.",
		objectives: [
			"Executar 'It's Yer Choice' com petiscos e brinquedos",
			"Manter auto-interrupção sem comando verbal.",
		],
		why: "Heeler descontrolado vira desafio. Jogar com impulsos mantém cérebro responsivo.",
		steps: [
			{
				title: "Versão Petisco",
				detail: "Petiscos na mão aberta. Reforce somente quando recuar.",
			},
			{
				title: "Versão Brinquedo",
				detail:
					"Brinquedo em movimento. Congele e espere contato visual antes de liberar.",
			},
			{
				title: "Combo",
				detail:
					"Misture petisco e brinquedo, pedindo comportamento alternativo (senta).",
			},
		],
		temperamentTips: {
			altaEnergia: "Faça séries curtas com intervalos para sucesso.",
			sensivel: "Use reforços suaves; mantenha expressão amigável.",
			independente: "Inclua liberação para trabalho real (buscar bola).",
		},
		tools: ["Petiscos", "Brinquedos", "Cronometro"],
		troubleshooting: [
			{
				title: "Rouba o petisco",
				detail: "Feche mão e volte ao passo anterior.",
			},
			{
				title: "Frustra rápido",
				detail: "Reduza duração e pague mais frequentemente.",
			},
		],
		metrics: {
			primary: "Tempo máximo de espera",
			secondary: "Número de repetições sem erro",
			notes: "Busque 10 repetições perfeitas seguidas.",
		},
		gamification: {
			badge: "Mestre do Autocontrole",
			unlock: "14 dias seguidos praticando jogos de impulso",
			points: 60,
		},
		followUp: ["lesson-place-proof", "lesson-recall-proof"],
		references: ["Susan Garrett IYC", "DIYK9 Impulse Program"],
	},
	{
		id: "lesson-recall-proof",
		phaseId: "phase3",
		moduleId: "module-recall",
		moduleName: "Recall Explosivo",
		title: "Recall com Provas",
		summary: "Garante retorno sob distração alta e sem guia.",
		objectives: [
			"Manter recall em 90% dos ensaios até 15 metros",
			"Utilizar reforço variavel e imprevisível.",
		],
		why: "Quando o instinto atacar, apenas um recall blindado protege.",
		steps: [
			{
				title: "Long-line",
				detail:
					"Use linha de 10m. Chame, pise na guia se necessário, premie com jackpot.",
			},
			{
				title: "Adiçao de Distrações",
				detail: "Bolas rolando, pessoas correndo. Chame no pico da distração.",
			},
			{
				title: "Prova Real",
				detail:
					"Ambiente seguro sem guia. Recompense com liberdade controlada após sucesso.",
			},
		],
		temperamentTips: {
			altaEnergia: "Inclua corrida como recompensa pós recall.",
			sensivel: "Não eleve voz; use tom alegre.",
			independente: "Combine com trabalho (traga objeto específico).",
		},
		tools: ["Long-line", "Jackpots", "Marcador sonoro"],
		troubleshooting: [
			{
				title: "Ignora comando",
				detail: "Reduza distancia e melhore reforço immediato.",
			},
			{
				title: "Responde lento",
				detail: "Chame e corra para lado oposto para aumentar urgência.",
			},
		],
		metrics: {
			primary: "Taxa de sucesso por distância",
			secondary: "Latência média",
			notes: "Registre no diário com vídeos mensais.",
		},
		gamification: {
			badge: "Recall Elite",
			unlock: "40 sessões consistentes com taxa 90%",
			points: 70,
		},
		followUp: ["lesson-strategic-review", "lesson-cafe-manners"],
		references: ["Really Reliable Recall", "DIYK9 Recall Advanced"],
	},
	{
		id: "lesson-decompression",
		phaseId: "phase3",
		moduleId: "module-regulacao",
		moduleName: "Regulação Emocional",
		title: "Protocolo de Decompressão Guiada",
		summary: "Fecha o dia reduzindo cortisol e consolidando aprendizados.",
		objectives: [
			"Executar rotina de relaxamento de 10 minutos",
			"Observar sinais de estresse residual",
		],
		why: "Sem decompression, o heeler acumula tensao e responde pior no dia seguinte.",
		steps: [
			{
				title: "Snuffle + Mastigação",
				detail: "Ofereça snuffle mat seguido de osso mastigável leve.",
			},
			{
				title: "Massagem",
				detail: "Massagem lenta da nuca ao rabo, acompanhando respiração.",
			},
			{
				title: "Respiração Guiada",
				detail: "Respire 4-7-8 ao lado enquanto o cão descansa no place.",
			},
		],
		temperamentTips: {
			altaEnergia: "Faça após sessão mental para facilitar desaceleração.",
			sensivel: "Use música ambiente calma.",
			independente: "Mantenha contato físico leve; permita afastar se desejar.",
		},
		tools: ["Snuffle mat", "Brinquedo mastigável", "Playlist relax"],
		troubleshooting: [
			{
				title: "Não desacelera",
				detail:
					"Reduza intensidade das sessões anteriores e inclua alongamentos.",
			},
			{
				title: "Se afasta",
				detail: "Respeite espaço e ofereça cama confortável próxima.",
			},
		],
		metrics: {
			primary: "Tempo para sinais de relaxamento",
			secondary: "Frequência cardíaca visível",
			notes: "Registrar notas sobre bocejos, suspiros e postura.",
		},
		gamification: {
			badge: "Zen Supremo",
			unlock: "30 sessões seguidas de decompression",
			points: 55,
		},
		followUp: ["lesson-strategic-review", "lesson-place-proof"],
		references: ["Canine Body Language 2024", "DIYK9 Calm Reset"],
	},
	{
		id: "lesson-strategic-review",
		phaseId: "phase3",
		moduleId: "module-planejamento",
		moduleName: "Planejamento Estrategico",
		title: "Review Estratégico Diário",
		summary: "Cria ciclo de feedback para evoluir plano semanal.",
		objectives: [
			"Registrar 3 vitórias, 1 ajuste e 1 foco para amanhã",
			"Atualizar métricas chave.",
		],
		why: "Sem reflexão, você repete erros. Review integra dados para melhorar decisões.",
		steps: [
			{
				title: "Vitórias",
				detail: "Liste três eventos positivos do dia.",
			},
			{
				title: "Ajuste",
				detail: "Identifique um ponto de melhoria e sua causa provável.",
			},
			{
				title: "Foco",
				detail: "Defina objetivo claro para a próxima sessão.",
			},
		],
		temperamentTips: {
			altaEnergia: "Realize após decompression quando mente estiver calma.",
			sensivel: "Reveja vídeos tranquilos para reforçar segurança.",
			independente: "Use checklists objetivos para manter disciplina.",
		},
		tools: ["Diário", "Planilha", "Video review"],
		troubleshooting: [
			{
				title: "Sem tempo",
				detail: "Use notas rápidas de voz e transcreva depois.",
			},
			{
				title: "Repete ajustes",
				detail: "Procure padrões e considere mudar abordagem do exercício.",
			},
		],
		metrics: {
			primary: "Dias com review registrado",
			secondary: "Metas atingidas semanalmente",
			notes: "Dedique 5 min por dia.",
		},
		gamification: {
			badge: "Estrategista Azul",
			unlock: "21 reviews consecutivos",
			points: 40,
		},
		followUp: ["lesson-plan-weekly", "lesson-behavior-audit"],
		references: ["Manus AI Strategy Notes", "DIYK9 Training Journal"],
	},
	{
		id: "lesson-potty-escalator",
		phaseId: "phase2",
		moduleId: "module-rotina",
		moduleName: "Rotinas Essenciais",
		title: "Escada Potty com Liberdade",
		summary: "Reforça que banheiro correto libera privilégios controlados.",
		objectives: [
			"Conectar sucesso a tempo de exploração extra",
			"Manter disciplina em ambientes novos.",
		],
		why: "Garante motivação alta mesmo quando necessidades básicas já estão controladas.",
		steps: [
			{
				title: "Sequência",
				detail:
					"Espera calm, comando 'vai', sucesso, liberação para explorar 2 minutos.",
			},
			{
				title: "Incrementos",
				detail: "Aumente liberdade 30 segundos por dia se manter 100%.",
			},
			{
				title: "Regra de Ouro",
				detail:
					"Liberdade só acontece após sucesso. Caso contrário, voltar para casa sem brincar.",
			},
		],
		temperamentTips: {
			altaEnergia: "Inclua minigames durante liberdade (farejar).",
			sensivel: "Evite locais com ruídos intensos na fase inicial.",
			independente: "Permita escolher direção da exploração, mantendo guia.",
		},
		tools: ["Guia", "Relógio", "Petiscos"],
		troubleshooting: [
			{
				title: "Se distrai e não faz",
				detail: "Reduza liberdade para 30 segundos até retomar foco.",
			},
			{
				title: "Faz perfeito mas continua excitado",
				detail: "Use calm reset antes de voltar para dentro.",
			},
		],
		metrics: {
			primary: "Número de sucessos com bônus",
			secondary: "Tempo livre concedido",
			notes: "Meta: 5 bônus por dia sem acidentes.",
		},
		gamification: {
			badge: "VIP do Potty",
			unlock: "Manter 7 dias sem acidentes usando escada",
			points: 35,
		},
		followUp: ["lesson-decompression", "lesson-strategic-review"],
		references: ["DIYK9 Potty Motivation"],
	},
	{
		id: "lesson-bite-redirect",
		phaseId: "phase1",
		moduleId: "module-instinto",
		moduleName: "Instinto e Mordida",
		title: "Troca Instantanea de Mordida",
		summary: "Instala hábito de soltar mão e escolher brinquedo autorizado.",
		objectives: [
			"Ensinar troca em menos de 2 segundos",
			"Manter dentes suaves em interações humanas.",
		],
		why: "Prevenir mordidas fortes enquanto ainda é filhote acelera aprendizado social.",
		steps: [
			{
				title: "Brinquedos Diversos",
				detail:
					"Mantenha três texturas prontas para oferecer assim que encostar pele.",
			},
			{
				title: "Troca",
				detail:
					"Apresente brinquedo, diga 'troca', marque ao pegar e recompense com tug controlado.",
			},
			{
				title: "Sinal de Fim",
				detail: "Ao terminar, peça 'senta' e conte 10 respirando juntos.",
			},
		],
		temperamentTips: {
			altaEnergia: "Use brinquedo mais resistente e troque com frequência.",
			sensivel: "Evite exclamações fortes; foque em reforço calmo.",
			independente: "Varie brinquedos para manter valor alto.",
		},
		tools: ["Brinquedos diversos", "Clicker", "Petiscos"],
		troubleshooting: [
			{
				title: "Nao solta",
				detail: "Introduza troca por petisco e recomece com menos excitação.",
			},
			{
				title: "Volta a morder",
				detail: "Faça pausa de 30 segundos e retome com intensidade menor.",
			},
		],
		metrics: {
			primary: "Tempo para trocar",
			secondary: "Numero de mordidas em pele por dia",
			notes: "Objetivo: 70% das tentativas redirecionadas.",
		},
		gamification: {
			badge: "Troca Ninja",
			unlock: "15 sessões sem mordidas doloridas",
			points: 40,
		},
		followUp: ["lesson-control-instinct", "lesson-structured-play"],
		references: ["DIYK9 Bite Inhibition"],
	},
	{
		id: "lesson-bite-calibration",
		phaseId: "phase2",
		moduleId: "module-instinto",
		moduleName: "Instinto e Mordida",
		title: "Calibração de Pressão",
		summary:
			"Ensina mordida suave durante manipulações veterinárias simuladas.",
		objectives: [
			"Manter boca macia ao manipular patas",
			"Respeitar comando 'suave'.",
		],
		why: "Preparar para exames e evitar acidentes com crianças.",
		steps: [
			{
				title: "Suave no Mordedor",
				detail: "Use mordedor, diga 'suave', premie mordidas leves.",
			},
			{
				title: "Manipulação",
				detail:
					"Massageie patas e ofereça mordedor; interrompa se aumentar pressão.",
			},
			{
				title: "Checklist Vet",
				detail: "Simule exame completo mantendo reforço contínuo.",
			},
		],
		temperamentTips: {
			altaEnergia: "Faça após caminhada para reduzir impulsividade.",
			sensivel: "Use reforço verbal suave.",
			independente:
				"Adicione pausa de trabalho (buscar brinquedo) para motivação.",
		},
		tools: ["Mordedor", "Petiscos", "Escova"],
		troubleshooting: [
			{
				title: "Morde forte",
				detail: "Retire mordedor, espere acalmar e retome com menor excitação.",
			},
			{
				title: "Evita mordedor",
				detail: "Use textura diferente e reforce mordidas leves imediatas.",
			},
		],
		metrics: {
			primary: "Pressão relatada (escala 1-5)",
			secondary: "Tempo cooperativo",
			notes: "Objetivo: manter escala <=2 durante sessão.",
		},
		gamification: {
			badge: "Mordida de Algodão",
			unlock: "10 sessões com pressão suave",
			points: 45,
		},
		followUp: ["lesson-handling-zen", "lesson-place-relax"],
		references: ["Fear Free Handling"],
	},
	{
		id: "lesson-cafe-manners",
		phaseId: "phase3",
		moduleId: "module-vida-real",
		moduleName: "Vida Real",
		title: "Etiqueta de Cafeteria",
		summary: "Transfere controle de impulso para ambientes públicos.",
		objectives: [
			"Executar sequência place + calma por 15 minutos",
			"Ignorar comida caída ou pessoas passando.",
		],
		why: "Permite aproveitar momentos sociais sem estresse.",
		steps: [
			{
				title: "Setup em Casa",
				detail: "Simule mesa com bebida e finalize 5 minutos de place.",
			},
			{
				title: "Cafe Calmo",
				detail:
					"Visite ambiente tranquilo, mantenha place, recompense respirações profundas.",
			},
			{
				title: "Cafe Movimentado",
				detail: "Adicione distrações reais (garçom, crianças).",
			},
		],
		temperamentTips: {
			altaEnergia: "Realize após caminhada longa.",
			sensivel: "Comece em horários vazios.",
			independente: "Dê tarefa leve (deitar em manta preferida).",
		},
		tools: ["Manta", "Petiscos", "Guia"],
		troubleshooting: [
			{
				title: "Late",
				detail: "Aumente distância e trabalhe foco antes de tentar novamente.",
			},
			{
				title: "Quer interagir com todos",
				detail: "Reforçe olhar para você e use calm resets.",
			},
		],
		metrics: {
			primary: "Tempo em calma",
			secondary: "Numero de distrações ignoradas",
			notes: "Objetivo: 15 minutos estáveis.",
		},
		gamification: {
			badge: "Companheiro Urbano",
			unlock: "5 cafés bem-sucedidos",
			points: 60,
		},
		followUp: ["lesson-social-high-distraction", "lesson-decompression"],
		references: ["Urban Dog Protocol"],
	},
];

export const lessonIndexByTask = {
	"p1-morning-potty": "lesson-potty-ritual",
	"p1-morning-focus": "lesson-attention-reflex",
	"p1-morning-explore": "lesson-controlled-exploration",
	"p1-afternoon-people": "lesson-positive-social",
	"p1-afternoon-sound": "lesson-sound-acclimation",
	"p1-afternoon-play": "lesson-structured-play",
	"p1-evening-bite": "lesson-control-instinct",
	"p1-evening-handling": "lesson-handling-zen",
	"p1-evening-settle": "lesson-calm-crate",
	"p2-morning-potty": "lesson-potty-precision",
	"p2-morning-heel": "lesson-loose-leash",
	"p2-morning-obedience": "lesson-obedience-triad",
	"p2-afternoon-social": "lesson-social-field-trip",
	"p2-afternoon-crate": "lesson-calm-crate",
	"p2-afternoon-leaveit": "lesson-leave-it",
	"p2-evening-recall": "lesson-recall-rocket",
	"p2-evening-brain": "lesson-mental-puzzle",
	"p2-evening-settle": "lesson-place-relax",
	"p3-morning-cardio": "lesson-cardio-focus",
	"p3-morning-shaping": "lesson-shaping-creative",
	"p3-morning-place": "lesson-place-proof",
	"p3-afternoon-nosework": "lesson-nosework-progression",
	"p3-afternoon-social": "lesson-social-high-distraction",
	"p3-afternoon-impulse": "lesson-impulse-games",
	"p3-evening-recall": "lesson-recall-proof",
	"p3-evening-recovery": "lesson-decompression",
	"p3-evening-review": "lesson-strategic-review",
	"goal-social-map": "lesson-positive-social",
	"goal-social-observe": "lesson-social-field-trip",
	"goal-potty-log": "lesson-potty-precision",
	"goal-potty-decompression": "lesson-potty-escalator",
	"goal-bite-switch": "lesson-bite-redirect",
	"goal-bite-calibrate": "lesson-bite-calibration",
	"goal-obedience-ladder": "lesson-obedience-triad",
	"goal-obedience-generalize": "lesson-generalization",
	"goal-recall-games": "lesson-recall-rocket",
	"goal-recall-longline": "lesson-recall-proof",
	"goal-enrich-nose": "lesson-mental-puzzle",
	"goal-enrich-shaping": "lesson-shaping-creative",
	"goal-impulse-place": "lesson-place-relax",
	"goal-impulse-mat": "lesson-cafe-manners",
};

export function getLessonById(id) {
	return lessonLibrary.find((lesson) => lesson.id === id) || null;
}

function normalizeTaskId(baseId) {
	return baseId ? baseId.replace(/-phase[0-9]+$/, "") : "";
}

export function findLessonByTask(baseId) {
	if (!baseId) {
		return null;
	}
	if (lessonIndexByTask[baseId]) {
		return getLessonById(lessonIndexByTask[baseId]);
	}
	const normalized = normalizeTaskId(baseId);
	if (lessonIndexByTask[normalized]) {
		return getLessonById(lessonIndexByTask[normalized]);
	}
	return null;
}

export default {
	lessonLibrary,
	lessonIndexByTask,
	getLessonById,
	findLessonByTask,
};
