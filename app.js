let appData = {
  dog: {
    name: "Meu Blue Heeler",
    birthDate: "2024-09-01",
    experience: "iniciante",
    objectives: ["obediencia", "socializacao"]
  },
  stats: {
    totalSessions: 0,
    currentStreak: 0,
    overallProgress: 0,
    completedExercises: {},
    trainingDays: [],
    badges: []
  },
  currentExercise: null,
  timer: {
    minutes: 5,
    seconds: 0,
    running: false,
    interval: null
  },
  repCounter: 0
};

const tips = [
  "Sessões curtas (5-10 min) são mais eficazes que longas!",
  "Sempre termine o treino com sucesso para manter motivação.",
  "Blue Heelers precisam de 60-90 min de exercício DIÁRIO quando adultos.",
  "Socialize AGORA! Janela crítica fecha às 14 semanas.",
  "Petiscos de alto valor: frango, queijo, salsicha (pequenos pedaços).",
  "Timing é tudo: recompensa imediata (0,5s) após comportamento.",
  "Consistência > Perfeição. Treino diário irregular é melhor que nenhum.",
  "'Yes!' deve ser sempre o mesmo tom. Escolha seu marcador e mantenha.",
  "Bite inhibition é CRÍTICO para Heelers. Não negligencie!",
  "Exercício físico ANTES de treino mental = melhor foco."
];

const exercises = {
  socializacao: {
    title: "Socialização",
    description: "Fundamental para desenvolvimento saudável",
    exercises: [
      {
        id: "nome-atencao",
        title: "Nome e Atenção",
        duration: 5,
        description: "Ensinar o cão a responder ao nome e prestar atenção",
        method: "Diga o nome → quando olhar → 'Yes!' + petisco. Repita 10-15x",
        progression: "Casa silenciosa → com distrações → ambientes diferentes",
        goal: "Olhar imediatamente ao nome em 80% das vezes",
        tips: "Use tom alegre e consistente. Nunca use o nome para repreender."
      },
      {
        id: "socializacao-pessoas",
        title: "Socialização com Pessoas",
        duration: 10,
        description: "Exposição positiva a diferentes pessoas",
        method: "Apresentar 5-10 pessoas novas por semana. Pessoa oferece petisco ao filhote",
        progression: "Família → amigos → estranhos → diferentes idades/tipos",
        goal: "100+ pessoas diferentes até 14 semanas",
        tips: "Deixar filhote aproximar no próprio ritmo. Variar: idades, gêneros, roupas."
      },
      {
        id: "socializacao-caes",
        title: "Socialização com Cães",
        duration: 15,
        description: "Interação com outros cães de forma segura",
        method: "Interações supervisionadas com cães vacinados, calmos e bem socializados. 2-3x/semana",
        goal: "Aprender sinais caninos e brincadeira apropriada",
        tips: "Começar com cães adultos calmos. Supervisionar sempre."
      },
      {
        id: "habituacao-sons",
        title: "Habituação a Sons",
        duration: 5,
        description: "Acostumar com sons do ambiente",
        method: "YouTube: sons de aspirador, liquidificador, trovão, fogos. Começar volume 10%, aumentar gradualmente",
        goal: "Indiferença a sons domésticos comuns",
        tips: "Nunca forçar. Se mostrar medo, diminuir volume."
      }
    ]
  },
  obediencia: {
    title: "Obediência Básica",
    description: "Comandos fundamentais para vida em sociedade",
    exercises: [
      {
        id: "sit",
        title: "Sit (Sentar)",
        duration: 10,
        description: "Comando básico essencial",
        method: "Lure: petisco no nariz → mover para cima/trás → bumbum desce → 'Yes!' + petisco",
        progression: "Com lure → sem lure → a distância → com duração → com distrações",
        goal: "Sentar com comando verbal em 3s, 90% das vezes"
      },
      {
        id: "down",
        title: "Down (Deitar)",
        duration: 10,
        description: "Comando de relaxamento e controle",
        method: "De sit: lure petisco para baixo entre patas → corpo desce → 'Yes!' + petisco",
        tips: "Pode demorar. Use shaping: recompense aproximações",
        goal: "Deitar com comando verbal, 80% acerto"
      },
      {
        id: "stay",
        title: "Stay (Ficar)",
        duration: 10,
        description: "Autocontrole e espera",
        method: "De sit/down: mão aberta 'Stay' → 1 segundo → 'Yes!' + petisco. Aumentar tempo gradualmente",
        progression: "1s → 5s → 10s → 30s → 1min",
        goal: "Stay de 30s com pessoa a 2m de distância"
      },
      {
        id: "come-recall",
        title: "Come/Recall (Vem)",
        duration: 10,
        description: "Comando de segurança vital",
        method: "Casa: nome + 'Come!' + agachar + braços abertos → quando vier → FESTA + petiscos múltiplos",
        important: "NUNCA chamar para algo negativo. Sempre recompensa máxima",
        progression: "1m → 3m → 5m → 10m → com distrações",
        goal: "Recall 100% confiável sem distrações"
      },
      {
        id: "leave-it",
        title: "Leave It (Deixa)",
        duration: 10,
        description: "Controle de impulsos",
        method: "Petisco em mão fechada → cão tenta pegar → espera → quando desiste → 'Yes!' + petisco melhor da outra mão",
        progression: "Mão → chão coberto → chão → andar perto",
        goal: "Ignorar item no chão com comando"
      }
    ]
  },
  heeler_especifico: {
    title: "Específico Blue Heeler",
    description: "Controles específicos para a raça",
    exercises: [
      {
        id: "bite-inhibition",
        title: "Bite Inhibition",
        duration: 10,
        description: "Controle da força da mordida - CRÍTICO para Heelers",
        method: "Durante brincadeira: morder forte → 'Ai!' agudo + parar 30s. Retomar. Ignorar mordidas leves",
        importance: "CRÍTICO para Blue Heelers (instinto de nip/heeling)",
        goal: "Controle total da força da mordida até 4-5 meses",
        tips: "Consistência é fundamental. Todos da família devem reagir igual."
      },
      {
        id: "handling",
        title: "Handling (Manipulação)",
        duration: 5,
        description: "Acostumar com manipulação para vet/grooming",
        method: "Tocar patas, orelhas, boca, cauda. DAR PETISCOS CONTINUAMENTE durante. 2-3 min/dia",
        progression: "Toque leve → segurar → manipular (simular corte de unha)",
        goal: "Cão relaxado durante manipulação vet/grooming"
      },
      {
        id: "controle-herding",
        title: "Controle de Herding",
        duration: 15,
        description: "Canalizar instinto de pastoreio adequadamente",
        problem: "Nip em calcanhares, perseguir/controlar movimento",
        solution: "Redirecionar para brinquedos, ensinar 'easy', impulse control",
        alternatives: "Herding balls, treibball, flyball",
        tips: "Não reprimir completamente - redirecionar para atividades apropriadas."
      }
    ]
  },
  rotina: {
    title: "Casa e Rotina",
    description: "Estabelecer bons hábitos domésticos",
    exercises: [
      {
        id: "potty-training",
        title: "Potty Training",
        frequency: "A cada 1-2h, após comer, brincar, acordar",
        method: "Levar ao local → esperar → quando fizer → 'Yes!' + festa + petisco IMEDIATAMENTE",
        tips: "Nunca punir acidente. Apenas limpar sem alarde",
        goal: "90% acertos até 12-14 semanas",
        duration: 5
      },
      {
        id: "crate-training",
        title: "Crate Training",
        start: "Semana 14-15",
        method: "Porta aberta + petiscos dentro → refeições dentro → fechar porta 1s → aumentar tempo",
        objective: "Crate = lugar seguro, não punição",
        goal: "Relaxar na crate por 1-2h durante dia",
        duration: 10
      },
      {
        id: "leash-walking",
        title: "Leash Walking",
        start: "Semana 16-17",
        method: "Coleira leve + guia. Andar → se puxar, PARAR + esperar → folga na guia → 'Yes!' + seguir",
        tips: "Petisco a cada 3-5 passos sem puxar",
        progression: "Casa → quintal → calçada calma → rua",
        goal: "Caminhada com guia frouxa por 5-10 min",
        duration: 15
      }
    ]
  }
};

const dailyPlan = {
  morning: [
    { exercise: "potty-training", time: "Logo ao acordar", duration: 5 },
    { exercise: "nome-atencao", duration: 5 },
    { exercise: "exploracao-supervisionada", duration: 15, description: "Exploração livre em área segura" },
    { exercise: "potty-training", time: "Após refeição", duration: 5 }
  ],
  afternoon: [
    { exercise: "potty-training", duration: 5 },
    { exercise: "socializacao-pessoas", duration: 10 },
    { exercise: "habituacao-sons", duration: 5 },
    { exercise: "brincadeira-livre", duration: 15, description: "Brincadeira supervisionada" },
    { exercise: "potty-training", time: "Após refeição", duration: 5 }
  ],
  evening: [
    { exercise: "potty-training", duration: 5 },
    { exercise: "bite-inhibition", duration: 10 },
    { exercise: "handling", duration: 5 },
    { exercise: "potty-training", time: "Final antes de dormir", duration: 5 }
  ]
};

const badges = [
  { id: "first-week", name: "Primeira Semana!", condition: "7 dias consecutivos", icon: "🏆", unlocked: false },
  { id: "social-butterfly", name: "Social Butterfly", condition: "50 pessoas diferentes", icon: "🦋", unlocked: false },
  { id: "social-master", name: "Socialização Master", condition: "100 pessoas diferentes", icon: "⭐", unlocked: false },
  { id: "basic-commands", name: "Comandos Básicos", condition: "Sit, Down, Stay dominados", icon: "🎓", unlocked: false },
  { id: "perfect-recall", name: "Recall Perfeito", condition: "10 recalls consecutivos", icon: "🎯", unlocked: false },
  { id: "golden-consistency", name: "Consistência de Ouro", condition: "30 dias consecutivos", icon: "👑", unlocked: false }
];

const milestones = [
  { week: 8, items: ["Responde ao nome", "Tolera handling básico", "50% acerto potty"] },
  { week: 12, items: ["Sit confiável", "80%+ acerto potty", "Confortável com 50+ pessoas"] },
  { week: 16, items: ["Sit/Down/Stay básico", "Leash walking iniciado", "100+ pessoas"] },
  { week: 24, items: ["Comandos básicos sólidos", "Recall confiável", "Bem socializado"] }
];

const weeklyChecklist = [
  { item: "Socialização: 5+ pessoas novas", meta: 5, current: 0 },
  { item: "Socialização: 2+ cães novos", meta: 2, current: 0 },
  { item: "Ambientes: 3+ lugares novos", meta: 3, current: 0 },
  { item: "Sessões de treino: 21 (3/dia x 7)", meta: 21, current: 0 },
  { item: "Handling: 7 sessões", meta: 7, current: 0 },
  { item: "Sons novos: 10 diferentes", meta: 10, current: 0 }
];

function init() {
  updateDashboard();
  renderDailyPlan();
  renderLibrary();
  renderProgress();
  renderProfile();
  showRandomTip();
  
  if (!appData.dog.name || appData.dog.name === "Meu Blue Heeler") {
    setTimeout(() => showSetupModal(), 1000);
  }
}

function showRandomTip() {
  const randomTip = tips[Math.floor(Math.random() * tips.length)];
  document.getElementById('dailyTip').textContent = randomTip;
}

function updateDashboard() {
  document.getElementById('totalSessions').textContent = appData.stats.totalSessions;
  document.getElementById('currentStreak').textContent = appData.stats.currentStreak;
  document.getElementById('overallProgress').textContent = appData.stats.overallProgress + '%';
  
  const birthDate = new Date(appData.dog.birthDate);
  const today = new Date();
  const diffTime = Math.abs(today - birthDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const weeks = Math.floor(diffDays / 7);
  const days = diffDays % 7;
  
  let ageText;
  if (weeks === 0) {
    ageText = `${diffDays} dias`;
  } else {
    ageText = `${weeks} semana${weeks > 1 ? 's' : ''}${days > 0 ? ` e ${days} dias` : ''}`;
  }
  
  document.getElementById('dogAge').textContent = `${ageText} • Socialização Crítica`;
  document.getElementById('dogName').textContent = appData.dog.name;
}

function renderDailyPlan() {
  renderTimeSection('morningExercises', dailyPlan.morning, 'morning');
  renderTimeSection('afternoonExercises', dailyPlan.afternoon, 'afternoon');
  renderTimeSection('eveningExercises', dailyPlan.evening, 'evening');
}

function renderTimeSection(containerId, exercisesList, timeId) {
  const container = document.getElementById(containerId);
  container.innerHTML = '';
  
  exercisesList.forEach((ex, index) => {
    const exerciseId = `${timeId}-${index}`;
    const isCompleted = appData.stats.completedExercises[exerciseId] || false;
    
    const exerciseDiv = document.createElement('div');
    exerciseDiv.className = `exercise-item ${isCompleted ? 'completed' : ''}`;
    exerciseDiv.onclick = () => showExerciseDetail(ex, exerciseId);
    
    exerciseDiv.innerHTML = `
      <div class="exercise-checkbox ${isCompleted ? 'checked' : ''}" onclick="event.stopPropagation(); toggleExercise('${exerciseId}')">>
        ${isCompleted ? '✓' : ''}
      </div>
      <div class="exercise-info">
        <div class="exercise-title">${getExerciseTitle(ex.exercise) || ex.description || ex.exercise}</div>
        <div class="exercise-duration">${ex.duration} min${ex.time ? ' • ' + ex.time : ''}</div>
      </div>
    `;
    
    container.appendChild(exerciseDiv);
  });
}

function getExerciseTitle(exerciseKey) {
  for (const category in exercises) {
    const exercise = exercises[category].exercises?.find(ex => ex.id === exerciseKey);
    if (exercise) return exercise.title;
  }
  
  const fallbackTitles = {
    'potty-training': 'Potty Training',
    'nome-atencao': 'Nome e Atenção',
    'exploracao-supervisionada': 'Exploração Supervisionada',
    'socializacao-pessoas': 'Socialização com Pessoas',
    'habituacao-sons': 'Habituação a Sons',
    'brincadeira-livre': 'Brincadeira Livre',
    'bite-inhibition': 'Bite Inhibition',
    'handling': 'Handling'
  };
  
  return fallbackTitles[exerciseKey] || exerciseKey;
}

function toggleExercise(exerciseId) {
  const isCompleted = appData.stats.completedExercises[exerciseId] || false;
  appData.stats.completedExercises[exerciseId] = !isCompleted;
  
  if (!isCompleted) {
    appData.stats.totalSessions++;
    showSuccessAnimation();
    checkBadges();
  } else {
    appData.stats.totalSessions = Math.max(0, appData.stats.totalSessions - 1);
  }
  
  updateDashboard();
  renderDailyPlan();
  updateProgress();
}

function showSuccessAnimation() {
  const message = document.createElement('div');
  message.textContent = ['Excelente!', 'Ótimo trabalho!', 'Continue assim!', 'Parabéns!'][Math.floor(Math.random() * 4)];
  message.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: var(--color-success);
    color: var(--color-btn-primary-text);
    padding: 16px 24px;
    border-radius: 12px;
    font-weight: 600;
    z-index: 9999;
    animation: bounce 0.6s ease-in-out;
    box-shadow: var(--shadow-lg);
  `;
  
  document.body.appendChild(message);
  setTimeout(() => message.remove(), 1000);
}

function checkBadges() {
  if (appData.stats.currentStreak >= 7 && !badges.find(b => b.id === 'first-week').unlocked) {
    unlockBadge('first-week');
  }
  
  if (appData.stats.currentStreak >= 30 && !badges.find(b => b.id === 'golden-consistency').unlocked) {
    unlockBadge('golden-consistency');
  }
}

function unlockBadge(badgeId) {
  const badge = badges.find(b => b.id === badgeId);
  if (badge) {
    badge.unlocked = true;
    showBadgeUnlock(badge);
  }
}

function showBadgeUnlock(badge) {
  const message = document.createElement('div');
  message.innerHTML = `
    <div style="font-size: 40px; margin-bottom: 8px;">${badge.icon}</div>
    <div style="font-weight: 600; margin-bottom: 4px;">Conquista Desbloqueada!</div>
    <div>${badge.name}</div>
  `;
  message.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: var(--color-surface);
    border: 2px solid var(--color-primary);
    color: var(--color-text);
    padding: 24px;
    border-radius: 16px;
    text-align: center;
    z-index: 9999;
    animation: bounce 0.8s ease-in-out;
    box-shadow: var(--shadow-lg);
  `;
  
  document.body.appendChild(message);
  setTimeout(() => message.remove(), 3000);
}

function showExerciseDetail(exercise, exerciseId) {
  appData.currentExercise = { ...exercise, id: exerciseId };
  
  let fullExercise = null;
  for (const category in exercises) {
    fullExercise = exercises[category].exercises?.find(ex => ex.id === exercise.exercise);
    if (fullExercise) break;
  }
  
  const title = fullExercise?.title || getExerciseTitle(exercise.exercise) || exercise.description;
  document.getElementById('modalTitle').textContent = title;
  
  let content = `<div class="exercise-duration-badge">${exercise.duration} min</div>`;
  
  if (fullExercise) {
    content += `<div class="exercise-description">${fullExercise.description}</div>`;
    
    if (fullExercise.method) {
      content += `<div class="mb-16"><div class="meta-label">Como fazer:</div>${fullExercise.method}</div>`;
    }
    
    if (fullExercise.progression) {
      content += `<div class="mb-16"><div class="meta-label">Progressão:</div>${fullExercise.progression}</div>`;
    }
    
    if (fullExercise.goal) {
      content += `<div class="mb-16"><div class="meta-label">Meta:</div>${fullExercise.goal}</div>`;
    }
    
    if (fullExercise.tips) {
      content += `<div class="mb-16"><div class="meta-label">Dicas:</div>${fullExercise.tips}</div>`;
    }
    
    if (fullExercise.important) {
      content += `<div class="mb-16 text-error"><div class="meta-label">Importante:</div>${fullExercise.important}</div>`;
    }
  } else {
    content += `<div class="exercise-description">${exercise.description || 'Exercício fundamental para o desenvolvimento do seu Blue Heeler.'}</div>`;
  }
  
  document.getElementById('modalContent').innerHTML = content;
  document.getElementById('exerciseModal').classList.add('active');
}

function markExerciseComplete() {
  if (appData.currentExercise) {
    toggleExercise(appData.currentExercise.id);
    closeModal('exerciseModal');
  }
}

function renderLibrary() {
  const container = document.getElementById('libraryContent');
  container.innerHTML = '';
  
  for (const categoryKey in exercises) {
    const category = exercises[categoryKey];
    
    const headerDiv = document.createElement('div');
    headerDiv.className = 'category-header';
    headerDiv.innerHTML = `
      <div class="category-title">${category.title}</div>
      <div class="category-desc">${category.description}</div>
    `;
    container.appendChild(headerDiv);
    
    if (category.exercises) {
      category.exercises.forEach(exercise => {
        const exerciseDiv = document.createElement('div');
        exerciseDiv.className = 'exercise-card';
        exerciseDiv.onclick = () => showLibraryExercise(exercise);
        
        exerciseDiv.innerHTML = `
          <div class="exercise-card-header">
            <div class="exercise-card-title">${exercise.title}</div>
            <div class="exercise-duration-badge">${exercise.duration || 10} min</div>
          </div>
          <div class="exercise-description">${exercise.description}</div>
          <div class="exercise-meta">
            ${exercise.goal ? `<div class="meta-item"><span class="meta-label">Meta:</span> ${exercise.goal.substring(0, 50)}...</div>` : ''}
          </div>
        `;
        
        container.appendChild(exerciseDiv);
      });
    }
  }
}

function showLibraryExercise(exercise) {
  appData.currentExercise = { ...exercise, id: 'library-' + exercise.id };
  
  document.getElementById('modalTitle').textContent = exercise.title;
  
  let content = `<div class="exercise-duration-badge">${exercise.duration || 10} min</div>`;
  content += `<div class="exercise-description">${exercise.description}</div>`;
  
  if (exercise.method) {
    content += `<div class="mb-16"><div class="meta-label">Como fazer:</div>${exercise.method}</div>`;
  }
  
  if (exercise.progression) {
    content += `<div class="mb-16"><div class="meta-label">Progressão:</div>${exercise.progression}</div>`;
  }
  
  if (exercise.goal) {
    content += `<div class="mb-16"><div class="meta-label">Meta:</div>${exercise.goal}</div>`;
  }
  
  if (exercise.tips) {
    content += `<div class="mb-16"><div class="meta-label">Dicas:</div>${exercise.tips}</div>`;
  }
  
  if (exercise.important) {
    content += `<div class="mb-16 text-error"><div class="meta-label">Importante:</div>${exercise.important}</div>`;
  }
  
  if (exercise.frequency) {
    content += `<div class="mb-16"><div class="meta-label">Frequência:</div>${exercise.frequency}</div>`;
  }
  
  if (exercise.sessions) {
    content += `<div class="mb-16"><div class="meta-label">Sessões:</div>${exercise.sessions}</div>`;
  }
  
  document.getElementById('modalContent').innerHTML = content;
  document.getElementById('exerciseModal').classList.add('active');
}

function renderProgress() {
  renderBadges();
  renderCalendar();
  renderMilestones();
  renderWeeklyChecklist();
}

function renderBadges() {
  const container = document.getElementById('badgesContainer');
  container.innerHTML = '';
  
  badges.forEach(badge => {
    const badgeDiv = document.createElement('div');
    badgeDiv.className = `badge ${badge.unlocked ? '' : 'locked'}`;
    badgeDiv.innerHTML = `
      <span>${badge.icon}</span>
      <span>${badge.name}</span>
    `;
    container.appendChild(badgeDiv);
  });
}

function renderCalendar() {
  const container = document.getElementById('trainingCalendar');
  container.innerHTML = '';
  
  const today = new Date();
  for (let i = 29; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    const dayDiv = document.createElement('div');
    dayDiv.className = 'calendar-day';
    if (i === 0) dayDiv.classList.add('today');
    
    const hasTraining = Math.random() < 0.6;
    if (hasTraining && i > 0) {
      dayDiv.classList.add('completed');
    }
    
    dayDiv.textContent = date.getDate();
    container.appendChild(dayDiv);
  }
}

function renderMilestones() {
  const container = document.getElementById('milestonesContainer');
  container.innerHTML = '';
  
  milestones.forEach(milestone => {
    const milestoneDiv = document.createElement('div');
    milestoneDiv.className = 'exercise-card';
    
    const currentWeek = 7;
    const isReached = currentWeek >= milestone.week;
    
    milestoneDiv.innerHTML = `
      <div class="exercise-card-header">
        <div class="exercise-card-title">Semana ${milestone.week}</div>
        <div class="badge ${isReached ? '' : 'locked'}">
          ${isReached ? '✅' : '🔒'}
        </div>
      </div>
      <ul style="margin: 0; padding-left: 20px;">
        ${milestone.items.map(item => `<li>${item}</li>`).join('')}
      </ul>
    `;
    
    container.appendChild(milestoneDiv);
  });
}

function renderWeeklyChecklist() {
  const container = document.getElementById('weeklyChecklist');
  container.innerHTML = '';
  
  weeklyChecklist.forEach(item => {
    const progress = Math.floor((item.current / item.meta) * 100);
    
    const itemDiv = document.createElement('div');
    itemDiv.className = 'exercise-card';
    itemDiv.innerHTML = `
      <div class="exercise-card-header">
        <div class="exercise-card-title">${item.item}</div>
        <div class="exercise-duration-badge">${item.current}/${item.meta}</div>
      </div>
      <div class="progress-bar">
        <div class="progress-fill" style="width: ${progress}%"></div>
      </div>
    `;
    
    container.appendChild(itemDiv);
  });
}

function updateProgress() {
  const totalExercises = Object.keys(dailyPlan.morning).length + 
                       Object.keys(dailyPlan.afternoon).length + 
                       Object.keys(dailyPlan.evening).length;
  const completedToday = Object.keys(appData.stats.completedExercises).length;
  appData.stats.overallProgress = Math.min(100, Math.floor((completedToday / (totalExercises * 7)) * 100));
}

function renderProfile() {
  document.getElementById('profileName').textContent = appData.dog.name;
  document.getElementById('profileAge').textContent = document.getElementById('dogAge').textContent.split(' •')[0];
  
  const totalDays = appData.stats.trainingDays.length || 0;
  const totalExercises = appData.stats.totalSessions || 0;
  const consistency = totalDays > 0 ? Math.floor((totalExercises / (totalDays * 3)) * 100) : 0;
  
  document.getElementById('profileTotalDays').textContent = totalDays;
  document.getElementById('profileTotalExercises').textContent = totalExercises;
  document.getElementById('profileConsistency').textContent = consistency + '%';
}

function startTimer() {
  showModal('timerModal');
  resetTimer();
}

function toggleTimer() {
  if (appData.timer.running) {
    pauseTimer();
  } else {
    resumeTimer();
  }
}

function resumeTimer() {
  appData.timer.running = true;
  document.getElementById('timerBtn').innerHTML = '⏸️ Pausar';
  
  appData.timer.interval = setInterval(() => {
    if (appData.timer.seconds > 0) {
      appData.timer.seconds--;
    } else if (appData.timer.minutes > 0) {
      appData.timer.minutes--;
      appData.timer.seconds = 59;
    } else {
      pauseTimer();
      playFinishSound();
      alert('Tempo esgotado! 🎉');
      return;
    }
    updateTimerDisplay();
  }, 1000);
}

function pauseTimer() {
  appData.timer.running = false;
  document.getElementById('timerBtn').innerHTML = '▶️ Continuar';
  if (appData.timer.interval) {
    clearInterval(appData.timer.interval);
  }
}

function resetTimer() {
  pauseTimer();
  appData.timer.minutes = 5;
  appData.timer.seconds = 0;
  document.getElementById('timerBtn').innerHTML = '▶️ Iniciar';
  updateTimerDisplay();
}

function updateTimerDisplay() {
  const display = `${appData.timer.minutes.toString().padStart(2, '0')}:${appData.timer.seconds.toString().padStart(2, '0')}`;
  document.getElementById('timerDisplay').textContent = display;
}

function playFinishSound() {
  if (typeof AudioContext !== 'undefined' || typeof webkitAudioContext !== 'undefined') {
    const AudioCtx = AudioContext || webkitAudioContext;
    const audioCtx = new AudioCtx();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    oscillator.frequency.value = 800;
    gainNode.gain.value = 0.3;
    
    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 0.5);
  }
}

function showClicker() {
  showModal('clickerModal');
}

function playClick() {
  if (typeof AudioContext !== 'undefined' || typeof webkitAudioContext !== 'undefined') {
    const AudioCtx = AudioContext || webkitAudioContext;
    const audioCtx = new AudioCtx();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    oscillator.frequency.value = 2000;
    oscillator.type = 'square';
    gainNode.gain.value = 0.1;
    
    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 0.05);
  }
  
  const btn = document.querySelector('.clicker-btn');
  btn.style.transform = 'scale(0.95)';
  setTimeout(() => {
    btn.style.transform = 'scale(1)';
  }, 100);
}

function showCounter() {
  showModal('counterModal');
}

function incrementCounter() {
  appData.repCounter++;
  document.getElementById('repCount').textContent = appData.repCounter;
}

function resetCounter() {
  appData.repCounter = 0;
  document.getElementById('repCount').textContent = appData.repCounter;
}

function showSetupModal() {
  document.getElementById('dogNameInput').value = appData.dog.name;
  document.getElementById('birthDate').value = appData.dog.birthDate;
  document.getElementById('experience').value = appData.dog.experience;
  
  appData.dog.objectives.forEach(obj => {
    const checkbox = document.querySelector(`input[value="${obj}"]`);
    if (checkbox) checkbox.checked = true;
  });
  
  showModal('setupModal');
}

function handleSetupForm(event) {
  event.preventDefault();
  
  appData.dog.name = document.getElementById('dogNameInput').value;
  appData.dog.birthDate = document.getElementById('birthDate').value;
  appData.dog.experience = document.getElementById('experience').value;
  
  const objectiveCheckboxes = document.querySelectorAll('input[type="checkbox"]:checked');
  appData.dog.objectives = Array.from(objectiveCheckboxes).map(cb => cb.value);
  
  updateDashboard();
  renderProfile();
  closeModal('setupModal');
  
  setTimeout(() => {
    alert('Configuração salva! Seu plano personalizado foi gerado. 🎉');
  }, 500);
}

function showModal(modalId) {
  document.getElementById(modalId).classList.add('active');
}

function closeModal(modalId) {
  document.getElementById(modalId).classList.remove('active');
}

function showScreen(screenId) {
  document.querySelectorAll('.screen').forEach(screen => {
    screen.classList.remove('active');
  });
  
  document.getElementById(screenId).classList.add('active');
  
  document.querySelectorAll('.nav-item').forEach(item => {
    item.classList.remove('active');
  });
  
  const navItem = document.querySelector(`.nav-item[onclick*="'${screenId}'"]`);
  if (navItem) navItem.classList.add('active');
}

document.getElementById('setupForm').addEventListener('submit', handleSetupForm);

document.querySelectorAll('.modal').forEach(modal => {
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
    }
  });
});

document.addEventListener('DOMContentLoaded', init);