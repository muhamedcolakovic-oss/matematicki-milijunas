    let currentLanguage = 'bs';
    let phoneTimer = null;
	let viewers = 0;
    let adminLanguage = 'bs';
    let currentAdminCategory = 'history';
    let editingQuestionIndex = null;
    let soundEnabled = true;
    let currentTheme = 'dark';
    let gameStats = {
      totalGames: 0,
      totalScore: 0,
      bestScore: 0,
      currentStreak: 0,
      lastGameWon: false,
      badges: []
    };
    let wrongQuestionData = null;

function hashString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 31 + str.charCodeAt(i)) >>> 0;
  }
  return hash.toString(36);
}

function makeQuestionId(q) {
  return hashString(q.question);
}

function getSeenQuestions() {
  return JSON.parse(localStorage.getItem("seenQuestions") || "[]");
}

function saveSeenQuestion(id) {
  const seen = getSeenQuestions();
  seen.push(id);
  if (seen.length > 3000) {
    seen.splice(0, 500);
  }
  localStorage.setItem("seenQuestions", JSON.stringify(seen));
}

    const translations = {
      bs: {
        question: "Pitanje",
        of: "od",
        congratulations: "Čestitamo!",
        gameOver: "Kraj Igre",
        youWon: "Osvojili ste",
        wrongAnswer: "Nažalost, pogrešan odgovor.",
        incredible: "Nevjerovatno! Osvojili ste milion!",
        playAgain: "Igraj Ponovo",
        close: "Zatvori",
        phoneTitle: "📞 Phone a Friend",
        audienceTitle: "👥 Ask the Audience",
        audienceResults: "Rezultati glasanja publike:",
        friendSays: "",
        calling: "Zovem prijatelja...",
        explanation: "Objašnjenje",
        commonMistake: "Najčešća greška",
        correctAnswer: "Tačan odgovor",
        statistics: "Statistika",
        totalGames: "Ukupno igara",
        avgScore: "Prosječan rezultat",
        bestScore: "Najbolji rezultat",
        currentStreak: "Trenutni niz",
        badges: "Bedževi",
        share: "Podijeli"
      },
  ge: {
        question: "Pitanje",
        of: "od",
        congratulations: "Čestitamo!",
        gameOver: "Kraj Igre",
        youWon: "Osvojili ste",
        wrongAnswer: "Nažalost, pogrešan odgovor.",
        incredible: "Nevjerovatno! Osvojili ste milion!",
        playAgain: "Igraj Ponovo",
        close: "Zatvori",
        phoneTitle: "📞 Phone a Friend",
        audienceTitle: "👥 Ask the Audience",
        audienceResults: "Rezultati glasanja publike:",
        friendSays: "",
        calling: "Zovem prijatelja...",
        explanation: "Objašnjenje",
        commonMistake: "Najčešća greška",
        correctAnswer: "Tačan odgovor",
        statistics: "Statistika",
        totalGames: "Ukupno igara",
        avgScore: "Prosječan rezultat",
        bestScore: "Najbolji rezultat",
        currentStreak: "Trenutni niz",
        badges: "Bedževi",
        share: "Podijeli"
      },
	 gk: {
     question: "Question",
        of: "of",
        congratulations: "Congratulations!",
        gameOver: "Game Over",
        youWon: "You won",
        wrongAnswer: "Unfortunately, wrong answer.",
        incredible: "Incredible! You won a million!",
        playAgain: "Play Again",
        close: "Close",
        phoneTitle: "📞 Phone a Friend",
        audienceTitle: "👥 Ask the Audience",
        audienceResults: "Audience Poll Results:",
        friendSays: "",
        calling: "Calling friend...",
        explanation: "Explanation",
        commonMistake: "Common Mistake",
        correctAnswer: "Correct Answer",
        statistics: "Statistics",
        totalGames: "Total Games",
        avgScore: "Average Score",
        bestScore: "Best Score",
        currentStreak: "Current Streak",
        badges: "Badges",
        share: "Share"
      },  
  
      en: {
        question: "Question",
        of: "of",
        congratulations: "Congratulations!",
        gameOver: "Game Over",
        youWon: "You won",
        wrongAnswer: "Unfortunately, wrong answer.",
        incredible: "Incredible! You won a million!",
        playAgain: "Play Again",
        close: "Close",
        phoneTitle: "📞 Phone a Friend",
        audienceTitle: "👥 Ask the Audience",
        audienceResults: "Audience Poll Results:",
        friendSays: "",
        calling: "Calling friend...",
        explanation: "Explanation",
        commonMistake: "Common Mistake",
        correctAnswer: "Correct Answer",
        statistics: "Statistics",
        totalGames: "Total Games",
        avgScore: "Average Score",
        bestScore: "Best Score",
        currentStreak: "Current Streak",
        badges: "Badges",
        share: "Share"
      }
    };
    
function playSound(soundId) {

  if (masterMuted) return;

  const sound = document.getElementById(soundId);

  if (!sound) return;

  if (music.volume === 0) return;

  sound.volume = music.volume;
  sound.currentTime = 0;

  sound.play().catch(()=>{});
}
    
// =======================================
// PREMIUM CANVAS CONFETTI (LIGHTWEIGHT)
// =======================================

function createConfetti(){

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.style.position = "fixed";
    canvas.style.inset = "0";
    canvas.style.pointerEvents = "none";
    canvas.style.zIndex = "99999";

    document.body.appendChild(canvas);


    function resize(){
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    resize();


    const colors = [
        "#FFD700",
        "#FF1744",
        "#00E5FF",
        "#7C4DFF",
        "#00E676",
        "#FFFFFF",
        "#FF9100"
    ];


    const particles = [];

    for(let i=0;i<160;i++){

        particles.push({

            x: Math.random()*canvas.width,

            y: -20 - Math.random()*200,


            size: Math.random()*8+4,


            color:
            colors[Math.floor(Math.random()*colors.length)],


            speedY:
            Math.random()*3+2,


            speedX:
            (Math.random()-0.5)*3,


            gravity:
            0.05 + Math.random()*0.05,


            rotation:
            Math.random()*360,


            rotationSpeed:
            (Math.random()-0.5)*12,


            shape:
            Math.random()>0.5 ? "rect":"circle"

        });

    }



    let frame;


    function animate(){

        ctx.clearRect(
            0,
            0,
            canvas.width,
            canvas.height
        );


        particles.forEach((p,index)=>{


            p.y += p.speedY;
            p.speedY += p.gravity;

            p.x += p.speedX;

            p.rotation += p.rotationSpeed;



            ctx.save();


            ctx.translate(
                p.x,
                p.y
            );


            ctx.rotate(
                p.rotation*Math.PI/180
            );


            ctx.fillStyle=p.color;


            if(p.shape==="rect"){

                ctx.fillRect(
                    -p.size/2,
                    -p.size/2,
                    p.size,
                    p.size*1.8
                );

            }
            else{

                ctx.beginPath();

                ctx.arc(
                    0,
                    0,
                    p.size/2,
                    0,
                    Math.PI*2
                );

                ctx.fill();

            }


            ctx.restore();



            if(p.y > canvas.height+50){

                particles.splice(index,1);

            }


        });



        if(particles.length){

            frame=requestAnimationFrame(animate);

        }
        else{

            cancelAnimationFrame(frame);
            canvas.remove();

        }

    }


    animate();


    window.addEventListener(
        "resize",
        resize,
        {once:true}
    );

}
    
    // Load stats from localStorage
    function loadStats() {
      const saved = localStorage.getItem('millionaireStats');
      if (saved) {
        gameStats = JSON.parse(saved);
      }
    }
    
    // Save stats to localStorage
    function saveStats() {
      localStorage.setItem('millionaireStats', JSON.stringify(gameStats));
    }
    
    // Update stats display
    function updateStatsDisplay() {
      const t = translations[currentLanguage];
      document.getElementById('totalGames').textContent = gameStats.totalGames;
      document.getElementById('avgScore').textContent = gameStats.totalGames > 0 
        ? Math.round(gameStats.totalScore / gameStats.totalGames) 
        : 0;
      document.getElementById('bestScore').textContent = gameStats.bestScore;
      document.getElementById('currentStreak').textContent = gameStats.currentStreak;
      // Update badge labels
      document.getElementById('totalGamesLabel').textContent = t.totalGames;
      document.getElementById('avgScoreLabel').textContent = t.avgScore;
      document.getElementById('bestScoreLabel').textContent = t.bestScore;
      document.getElementById('currentStreakLabel').textContent = t.currentStreak;
      document.getElementById('badgesLabel').textContent = t.badges;
      document.getElementById('statsTitle').textContent = t.statistics;
      
      // Display badges
      displayBadges();
    }
    
    // Check and award badges
    function checkBadges(score, usedLifelines) {
      const newBadges = [];
      
      if (score >= 10 && !gameStats.badges.includes('10_questions')) {
        newBadges.push({ id: '10_questions', name: currentLanguage === 'bs' ? '🎯 Prvih 10' : '🎯 First 10', desc: currentLanguage === 'bs' ? 'Prešao 10 pitanja' : 'Passed 10 questions' });
        gameStats.badges.push('10_questions');
      }
      
      if (score >= 15 && !gameStats.badges.includes('math_master')) {
        newBadges.push({ id: 'math_master', name: currentLanguage === 'bs' ? '👑 Math Master' : '    Math Master', desc: currentLanguage === 'bs' ? 'Osvojio milion!' : 'Won a million!' });
        gameStats.badges.push('math_master');
      }
      
      if (score >= 5 && !usedLifelines && !gameStats.badges.includes('no_lifelines')) {
        newBadges.push({ id: 'no_lifelines', name: currentLanguage === 'bs' ? '💪 Samostalno' : '💪 Solo Player', desc: currentLanguage === 'bs' ? 'Prešao 5+ bez jokera' : 'Passed 5+ without lifelines' });
        gameStats.badges.push('no_lifelines');
      }
      
      if (gameStats.currentStreak >= 3 && !gameStats.badges.includes('streak_3')) {
        newBadges.push({ id: 'streak_3', name: currentLanguage === 'bs' ? '🔥 U vatri' : '   On Fire', desc: currentLanguage === 'bs' ? '3 igre zaredom' : '3 games in a row' });
        gameStats.badges.push('streak_3');
      }
      
      if (gameStats.totalGames >= 10 && !gameStats.badges.includes('veteran')) {
        newBadges.push({ id: 'veteran', name: currentLanguage === 'bs' ? '🎖️ Veteran' : '🎖️ Veteran', desc: currentLanguage === 'bs' ? '10+ odigranih igara' : '10+ games played' });
        gameStats.badges.push('veteran');
      }
      
      return newBadges;
    }
    
    // Display badges
    function displayBadges() {
      const badgesList = document.getElementById('badgesList');
      badgesList.innerHTML = '';
      const badgeDefinitions = {
        '10_questions': { name: currentLanguage === 'bs' ? '🎯 Prvih 10' : '🎯 First 10', desc: currentLanguage === 'bs' ? 'Prešao 10 pitanja' : 'Passed 10 questions' },
        'math_master': { name: currentLanguage === 'bs' ? '👑 Math Master' : '👑 Math Master', desc: currentLanguage === 'bs' ? 'Osvojio milion!' : 'Won a million!' },
        'no_lifelines': { name: currentLanguage === 'bs' ? '💪 Samostalno' : '    Solo Player', desc: currentLanguage === 'bs' ? 'Prešao 5+ bez jokera' : 'Passed 5+ without lifelines' },
        'streak_3': { name: currentLanguage === 'bs' ? '🔥 U vatri' : '🔥 On Fire', desc: currentLanguage === 'bs' ? '3 igre zaredom' : '3 games in a row' },
        'veteran': { name: currentLanguage === 'bs' ? '  ️ Veteran' : '🎖️ Veteran', desc: currentLanguage === 'bs' ? '10+ odigranih igara' : '10+ games played' }
      };
      
      if (gameStats.badges.length === 0) {
        badgesList.innerHTML = '<p class="text-gray-400 text-sm">' + 
          (currentLanguage === 'bs' ? 'Još nemaš bedževa. Nastavi igrati!' : 'No badges yet. Keep playing!') + 
          '</p>';
        return;
      }
      
      gameStats.badges.forEach(badgeId => {
        const badge = badgeDefinitions[badgeId];
        if (badge) {
          const badgeEl = document.createElement('div');
          badgeEl.className = 'bg-yellow-600 bg-opacity-30 border-2 border-yellow-500 rounded-lg px-3 py-2 text-sm';
          badgeEl.title = badge.desc;
          badgeEl.innerHTML = badge.name;
          badgesList.appendChild(badgeEl);
        }
      });
    }
    
    // Theme toggle
    function toggleTheme() {
      if (currentTheme === 'dark') {
        currentTheme = 'light';
        document.body.classList.remove('dark-mode');
        document.body.classList.add('light-mode');
        document.getElementById('themeToggle').textContent = '☀️';
      } else {
        currentTheme = 'dark';
        document.body.classList.remove('light-mode');
        document.body.classList.add('dark-mode');
        document.getElementById('themeToggle').textContent = '🌙';
      }
      localStorage.setItem('theme', currentTheme);
    }
    
    // Load theme
function loadTheme() {
  const saved = localStorage.getItem('theme');

  if (saved === 'light') {
    currentTheme = 'light';
    document.body.classList.add('light-mode');
    document.getElementById('themeToggle').textContent = '☀️';
  } else {
    // 👇 DEFAULT = DARK
    currentTheme = 'dark';
    document.body.classList.add('dark-mode');
    document.getElementById('themeToggle').textContent = '🌙';
  }
}
    
const VERSION = "1.0";

if (localStorage.getItem("qVersion") !== VERSION) {
  localStorage.setItem("questionBank", JSON.stringify(window.questionBank));
  localStorage.setItem("qVersion", VERSION);
}
	
function selectLanguage(lang) {
  currentLanguage = lang;

const languageScreen = document.getElementById('languageScreen');
const gameScreen = document.getElementById('gameScreen');
languageScreen.classList.add('hidden');
gameScreen.classList.remove('hidden');
gameScreen.classList.add('flex');

  const title = document.getElementById('gameTitle');

  const titles = {
    bs: "Matematički milijunaš",
    en: "Maths Millionaire",
    gk: "Who Wants to Be a Millionaire?",
    ge: "Ko želi biti milijunaš?"
  };
  title.textContent = titles[lang] || "Milijunaš";
  initGame();
}

function resetQuestionBankFromFile() {
  localStorage.setItem("questionBank", JSON.stringify(window.questionBank));
}

window.questionBank = JSON.parse(localStorage.getItem("questionBank")) || {
  bs: {},
  en: {},
  gk: {},
  ge: {}
};

let questionBank = window.questionBank;



function exportQuestionBank() {

  function clean(obj) {
    if (Array.isArray(obj)) {
      return obj.map(clean);
    }

    if (obj && typeof obj === "object") {
      const copy = {};

      for (const key in obj) {
        // 🚫 SKIP meta fields
        if (key === "_category" || key === "_difficulty") continue;

        copy[key] = clean(obj[key]);
      }

      return copy;
    }

    return obj;
  }

  function format(obj, indent = 0) {
    const pad = '  '.repeat(indent);

    if (Array.isArray(obj)) {
      return '[\n' +
        obj.map(v => pad + '  ' + format(v, indent + 1)).join(',\n') +
        '\n' + pad + ']';
    }

    if (obj && typeof obj === 'object') {
      return '{\n' +
        Object.entries(obj)
          .map(([k, v]) => pad + '  ' + k + ': ' + format(v, indent + 1))
          .join(',\n') +
        '\n' + pad + '}';
    }

    if (typeof obj === 'string') {
      return `"${obj.replaceAll('"', '\\"')}"`;
    }

    return String(obj);
  }

  const cleanBank = clean(questionBank);

  const fileContent =
    "window.questionBank = " +
    format(cleanBank) +
    ";\n";

  const blob = new Blob([fileContent], { type: "text/javascript" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "questions.js";
  a.click();

  URL.revokeObjectURL(url);
}

let selectedQuestions = [];

const prizes = [
  "100", "200", "300", "500", "1,000",
  "2,000", "4,000", "8,000", "16,000", "32,000",
  "64,000", "125,000", "250,000", "500,000", "1,000,000"
];

const milestones = [4, 9, 14];

let currentQuestion = 0;
let lifelines = {
  fiftyFifty: true,
  phoneAFriend: true,
  askAudience: true
};

function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function selectRandomQuestions() {
  const lang = currentLanguage;
  const bank = questionBank[lang];

  let seen = new Set(getSeenQuestions());

  const easy = [];
  const hard = [];
  const hardest = [];

  Object.keys(bank).forEach(category => {
    ["easy", "hard", "hardest"].forEach(diff => {
      if (bank[category][diff]) {
        bank[category][diff].forEach(q => {
          q._category = category;
          q._difficulty = diff;
        });

        if (diff === "easy") easy.push(...bank[category][diff]);
        if (diff === "hard") hard.push(...bank[category][diff]);
        if (diff === "hardest") hardest.push(...bank[category][diff]);
      }
    });
  });

  const filterSeen = (arr) => {
    let filtered = arr.filter(q => !seen.has(makeQuestionId(q)));

    // 🔥 FIX: ako je sve potrošeno → reset
    if (filtered.length === 0) {
      localStorage.removeItem("seenQuestions");
      seen = new Set();
      filtered = arr;
    }

    return filtered;
  };

  selectedQuestions = [
    ...shuffleArray(filterSeen(easy)).slice(0, 5),
    ...shuffleArray(filterSeen(hard)).slice(0, 5),
    ...shuffleArray(filterSeen(hardest)).slice(0, 5)
  ];
}

function initGame() {
  currentQuestion = 0;
  lifelines = {
    fiftyFifty: true,
    phoneAFriend: true,
    askAudience: true
  };
  
  selectRandomQuestions();
  updateLanguageLabels();
  renderPrizeLadder();
  loadQuestion();
  resetLifelines();
  document.getElementById('gameOverModal').classList.add('hidden');
}

function updateLanguageLabels() {
  const t = translations[currentLanguage];
  document.getElementById('questionLabel').textContent = t.question;
  document.getElementById('ofLabel').textContent = t.of;
}

function renderPrizeLadder() {
  const ladder = document.getElementById('prizeLadder');
  ladder.innerHTML = '';
  
  for (let i = prizes.length - 1; i >= 0; i--) {
    const prizeDiv = document.createElement('div');
    prizeDiv.className = 'prize-item px-2 py-1 text-center font-bold text-xs transition-all';
    prizeDiv.dataset.index = i;
    
    const isMilestone = milestones.includes(i);
    
    if (isMilestone) {
      prizeDiv.classList.add('prize-milestone');
    }
    
    if (i === currentQuestion) {
  prizeDiv.classList.add('prize-active');
  prizeDiv.classList.add('pulse-active');
      prizeDiv.classList.remove('prize-item');
      if (isMilestone) {
        prizeDiv.classList.remove('prize-milestone');
      }
      prizeDiv.classList.add('prize-active');
      const prizeNumber = `<span class="text-white font-extrabold text-sm">${i + 1}.</span>`;
      const prizeAmount = `<span class="text-white font-extrabold text-base ml-1">$ ${prizes[i]}</span>`;
      const milestone = isMilestone ? ' <span class="text-white text-lg ml-1">♦</span>' : '';
      prizeDiv.innerHTML = `${prizeNumber} ${prizeAmount}${milestone}`;
    } else if (i < currentQuestion) {
      prizeDiv.style.opacity = '0.4';
      const prizeNumber = `<span class="text-gray-500 text-sm">${i + 1}.</span>`;
      const prizeAmount = `<span class="text-gray-500 text-sm ml-1">$ ${prizes[i]}</span>`;
      const milestone = isMilestone ? ' <span class="text-gray-600 text-base ml-1">♦</span>' : '';
      prizeDiv.innerHTML = `${prizeNumber} ${prizeAmount}${milestone}`;
    } else {
      const prizeNumber = `<span class="text-blue-300 text-sm">${i + 1}.</span>`;
      const prizeAmount = `<span class="text-white text-sm ml-1">$ ${prizes[i]}</span>`;
      const milestone = isMilestone ? ' <span class="text-orange-400 text-base ml-1">♦</span>' : '';
      prizeDiv.innerHTML = `${prizeNumber} ${prizeAmount}${milestone}`;
    }
    
    ladder.appendChild(prizeDiv);
  }
}


function loadQuestion() {
  if (currentQuestion >= selectedQuestions.length) {
    endGame(true);
    return;
  }

  const q = selectedQuestions[currentQuestion];
saveSeenQuestion(makeQuestionId(q));

  document.getElementById('questionNumber').textContent = currentQuestion + 1;

  const questionEl = document.getElementById('questionText');

  // fade out
  questionEl.style.opacity = '0';
  questionEl.style.transform = 'translateY(10px)';
  questionEl.style.transition = 'all 0.25s ease';

  setTimeout(() => {
    questionEl.textContent = q.question;

    questionEl.style.opacity = '1';
    questionEl.style.transform = 'translateY(0)';
  }, 150);

  const answerButtons = document.querySelectorAll('.answer-btn');

  answerButtons.forEach((btn, index) => {
    const letter = btn.dataset.answer;

    btn.querySelector('.answer-text').textContent = q.answers[letter];

    btn.disabled = false;
    btn.style.pointerEvents = 'auto';
btn.style.cursor = 'pointer'; //

    btn.classList.remove('correct', 'wrong', 'selected');

    btn.style.opacity = '0';
    btn.style.transform = 'translateY(8px)';

    setTimeout(() => {
      btn.style.transition = 'all 0.2s ease';
      btn.style.opacity = '1';
      btn.style.transform = 'translateY(0)';
    }, index * 70);
  });

  renderPrizeLadder();
  updateMobileProgress();
}
function checkAnswer(selectedAnswer) {
  const q = selectedQuestions[currentQuestion];
  const answerButtons = document.querySelectorAll('.answer-btn');

  // lock input
  answerButtons.forEach(btn => {
    btn.disabled = true;
    btn.style.pointerEvents = 'none';
  });

  const selectedBtn = document.querySelector(`[data-answer="${selectedAnswer}"]`);
  const correctBtn = document.querySelector(`[data-answer="${q.correct}"]`);

  // show selection (orange)
  selectedBtn.classList.add('selected');
  playSound('lockSound');

  // small press effect
  selectedBtn.style.transform = 'scale(1.02)';
  selectedBtn.style.transition = 'all 0.15s ease';

  // ⏳ WAIT (TV QUIZ FEEL)
  setTimeout(() => {

    selectedBtn.classList.remove('selected');

    // ✅ CORRECT
    if (selectedAnswer === q.correct) {

      selectedBtn.classList.add('correct');
      playSound('correctSound');

      if (milestones.includes(currentQuestion)) {
setTimeout(() => {
  viewers += 250 + Math.random() * 300;

  if (viewers > 1500) viewers = 1500;

  document.getElementById("viewers").textContent =
    Math.floor(viewers).toLocaleString();
}, 500);
        setTimeout(() => {
          selectedBtn.classList.add('celebrate');
          playSound('milestoneSound');
          createConfetti();
setTimeout(createConfetti, 300);
setTimeout(createConfetti, 600);
        }, 400);
      }
      setTimeout(() => {
        currentQuestion++;
        loadQuestion();
      }, 1600);
    } 
    // ❌ WRONG
    else {

      selectedBtn.classList.add('wrong');
      correctBtn.classList.add('correct');
      playSound('wrongSound');

      wrongQuestionData = {
        question: q.question,
        answers: q.answers,
        correct: q.correct,
        selected: selectedAnswer,
        explanation: q.explanation || 'No explanation available.',
        commonMistake: q.commonMistake || 'No common mistake info.'
      };

      setTimeout(() => {
        endGame(false);
viewers -= 200 + Math.random() * 300;

if (viewers < 0) viewers = 0;

document.getElementById("viewers").textContent =
  Math.floor(viewers).toLocaleString();
      }, 2000);
    }

  }, 1500);
}


    function endGame(won) {
      const t = translations[currentLanguage];
      let prize = "$0";
      let message = "";
      let score = currentQuestion;
      // Update stats
      gameStats.totalGames++;
      gameStats.totalScore += score;
      if (score > gameStats.bestScore) {
        gameStats.bestScore = score;
      }
      
      // Update streak
      if (won || score >= 10) {
        gameStats.currentStreak++;
        gameStats.lastGameWon = true;
      } else {
        gameStats.currentStreak = 0;
        gameStats.lastGameWon = false;
      }
      
      // Check if any lifelines were used
      const usedLifelines = !lifelines.fiftyFifty || !lifelines.phoneAFriend || !lifelines.askAudience;
      
      // Check for new badges
      checkBadges(score, !usedLifelines);
      
      saveStats();
      
      if (won) {
        prize = "$ " + prizes[prizes.length - 1];
        message = t.incredible;
        document.getElementById('gameOverTitle').textContent = `🎉 ${t.congratulations} 🎉`;
        playSound('winSound');
        createConfetti();
setTimeout(createConfetti, 300);
setTimeout(createConfetti, 600);
      } else {
        for (let i = milestones.length - 1; i >= 0; i--) {
          if (currentQuestion > milestones[i]) {
            prize = "$ " + prizes[milestones[i]];
            break;
          }
        }
        message = t.wrongAnswer;
        document.getElementById('gameOverTitle').textContent = t.gameOver;
        playSound('loseSound');
        
        // Show explanation if wrong answer
        if (wrongQuestionData) {
          document.getElementById('explanationSection').classList.remove('hidden');
          document.getElementById('wrongQuestionText').textContent = wrongQuestionData.question;
          document.getElementById('wrongAnswerA').innerHTML = `A: ${wrongQuestionData.answers.A}`;
          document.getElementById('wrongAnswerB').innerHTML = `B: ${wrongQuestionData.answers.B}`;
          document.getElementById('wrongAnswerC').innerHTML = `C: ${wrongQuestionData.answers.C}`;
          document.getElementById('wrongAnswerD').innerHTML = `D: ${wrongQuestionData.answers.D}`;
          document.getElementById('correctAnswerDisplay').textContent = `${wrongQuestionData.correct}: ${wrongQuestionData.answers[wrongQuestionData.correct]}`;
          document.getElementById('explanationText').textContent = wrongQuestionData.explanation;
          document.getElementById('commonMistakeText').textContent = wrongQuestionData.commonMistake;
          
          // Update labels
          document.getElementById('explanationTitle').textContent = t.explanation;
          document.getElementById('correctAnswerLabel').textContent = t.correctAnswer;
          document.getElementById('explanationLabel').textContent = t.explanation;
          document.getElementById('commonMistakeLabel').textContent = t.commonMistake;
        }
      }
      
      document.getElementById('gameOverMessage').innerHTML = `${message}<br>${t.youWon}: <span id="finalPrize" class="text-green-400 font-bold">${prize}</span>`;
      document.querySelector('#playAgain').textContent = t.playAgain;
      document.getElementById('shareLabel').textContent = t.share;
      
      // Update stats display
      updateStatsDisplay();
      
      document.getElementById('gameOverModal').classList.remove('hidden');
	  
	  const modal = document.getElementById('gameOverModal');

modal.classList.remove('million-win', 'game-lost');

if (won) {
    modal.classList.add('million-win');
} else {
    modal.classList.add('game-lost');
}

    }

    function useFiftyFifty() {
  if (!lifelines.fiftyFifty) return;

  // 🎧 SOUND
  const audio = document.getElementById("fiftyFiftySound");
  if (audio) {
    audio.currentTime = 0;
    audio.volume = 0.8;
playEffect("fiftyFiftySound");
  }


  setTimeout(() => {
  }, 150);

  const q = selectedQuestions[currentQuestion];
  const answerButtons = document.querySelectorAll('.answer-btn');

  let wrongAnswers = [];

  answerButtons.forEach(btn => {
    if (btn.dataset.answer !== q.correct) {
      wrongAnswers.push(btn);
    }
  });

  for (let i = 0; i < 2 && wrongAnswers.length > 0; i++) {
    const randomIndex = Math.floor(Math.random() * wrongAnswers.length);
    const btnToDisable = wrongAnswers[randomIndex];

    btnToDisable.disabled = true;
    btnToDisable.style.opacity = '0.3';
    btnToDisable.style.cursor = 'not-allowed';

    wrongAnswers.splice(randomIndex, 1);
  }

  lifelines.fiftyFifty = false;
  document.getElementById('fiftyFifty').classList.add('lifeline-used');
  document.getElementById('joker1').style.opacity = '0.3';
  document.getElementById('joker1').classList.add('joker-crossed');
}
function usePhoneAFriend() {
  if (!lifelines.phoneAFriend) return;

  // 📞 SOUND START
  const phoneSound = document.getElementById("phoneFriendSound");
  phoneSound.currentTime = 0;
playEffect("phoneFriendSound");
  const t = translations[currentLanguage];
  document.getElementById('lifelineTitle').textContent = t.phoneTitle;
  document.getElementById('lifelineMessage').textContent = t.calling;
  document.getElementById('timerCircle').classList.remove('hidden');
  document.getElementById('audienceGraph').classList.add('hidden');
  document.getElementById('lifelineModal').classList.remove('hidden');

  let timeLeft = 25;
  document.getElementById('timerValue').textContent = timeLeft;

  phoneTimer = setInterval(() => {
    timeLeft--;
    document.getElementById('timerValue').textContent = timeLeft;

  // 🎯 KAD “PRIJATELJ JAVI”
// 🎯 KAD “PRIJATELJ JAVI”
if (timeLeft === 21) {
  const q = selectedQuestions[currentQuestion];
  const rand = Math.random();

  let friendAnswer = "";
  let friendMessage = "";

  // 🎯 REALISTIČNA TAČNOST PO TEŽINI
  let accuracy = 0.65;

  if (q._difficulty === "easy") accuracy = 0.78;
  if (q._difficulty === "hard") accuracy = 0.55;
  if (q._difficulty === "hardest") accuracy = 0.40;

  // malo ljudske greške (ne predvidivo)
  accuracy += (Math.random() - 0.5) * 0.10;

  // clamp (da ne ode ispod ili iznad granica)
  if (accuracy < 0.25) accuracy = 0.25;
  if (accuracy > 0.90) accuracy = 0.90;

  // 🟢 odluka TAČAN / NETAČAN (odvojeno od teksta)
  let isCorrect = Math.random() < accuracy;

  if (isCorrect) {
    friendAnswer = q.correct;

    const correctLines = [
      "Mislim da je tačan odgovor pod: " + friendAnswer,
      "Ovo mi izgleda kao da je tačan odgovor pod: " + friendAnswer,
      "Prilično sam siguran da je odgovor pod: " + friendAnswer,
      friendAnswer + " to mi djeluje najlogičnije"
    ];

    friendMessage = correctLines[Math.floor(Math.random() * correctLines.length)];

  } else {
    const wrongOptions = ['A', 'B', 'C', 'D'].filter(a => a !== q.correct);
    friendAnswer = wrongOptions[Math.floor(Math.random() * wrongOptions.length)];

    const wrongLines = [
      "Nisam siguran, ali rekao bih da je tačan odgovor pod: " + friendAnswer,
      "Možda je odgovor pod: " + friendAnswer + ", ali nemoj rizikovati",
	  "Žao mi je, ne znam odgovor na to pitanje",
	  "Ne znam stvarno, baš je teško pitanje",
      "Ovo je teško... Mislim da je tačan odgovor pod: " + friendAnswer,
      friendAnswer + " to mi djeluje kao tačan odgovor"
    ];

    friendMessage = wrongLines[Math.floor(Math.random() * wrongLines.length)];
  }

  // 🤡 RARE TROLL (ne otkriva ništa sigurno)
  if (Math.random() > 0.94) {
    const troll = [
      "Brate klikni šta hoćeš, ja bih bježao 😭",
      "Ovo ni Google ne zna 😂",
      "Tačan odgovor je pod: A. Ako pogriješiš, ja nisam ništa rekao 😏",
      "Zovi 112, možda oni znaju 😂"
    ];

    friendMessage = troll[Math.floor(Math.random() * troll.length)];
  }

  document.getElementById('lifelineMessage').textContent =
    `${t.friendSays} ${friendMessage}`;
}

    // ⏱ STOP
    if (timeLeft <= 0) {
      clearInterval(phoneTimer);
      document.getElementById('timerCircle').classList.add('hidden');
      phoneSound.pause();
    }
  }, 1000);

  // 🚫 disable lifeline
  lifelines.phoneAFriend = false;
  document.getElementById('phoneAFriend').classList.add('lifeline-used');
  document.getElementById('joker2').style.opacity = '0.3';
  document.getElementById('joker2').classList.add('joker-crossed');
}

function updateMobileProgress() {
  const wrapper = document.getElementById("stepsWrapper");
  if (!wrapper) return;

  const milestones = [4, 9, 14]; // 5,10,15 (0-based)

  // prvi put kreiraj krugove
  if (wrapper.children.length === 0) {
    for (let i = 0; i < 15; i++) {
      const step = document.createElement("div");
      step.className = "step-circle";

      if (milestones.includes(i)) {
        step.classList.add("milestone");
      }

      step.dataset.index = i;
      wrapper.appendChild(step);
    }
  }

  // update stanja
  const steps = document.querySelectorAll(".step-circle");

  steps.forEach((step, i) => {
    step.classList.remove("active", "done");
    if (i < currentQuestion) {
      step.classList.add("done");
    }
    if (i === currentQuestion) {
      step.classList.add("active");
    }
  });
}
function useAskAudience() {
  if (!lifelines.askAudience) return;

  // 🎧 AUDIO
  const audio = document.getElementById("askAudienceSound");
  if (audio) {
    audio.currentTime = 0;
    audio.volume = 0.8;
playEffect("askAudienceSound");  }

  const q = selectedQuestions[currentQuestion];
  const correct = q.correct;

  let percentages = { A: 0, B: 0, C: 0, D: 0 };

  // 🎯 tačan odgovor (realan, ali ne prejak)
  percentages[correct] = 35 + Math.random() * 28; // 35–63%

  let remaining = 100 - percentages[correct];
  const others = ['A', 'B', 'C', 'D'].filter(a => a !== correct);

  // 📊 “ljudska” raspodjela (ne savršena matematika)
  others.forEach((letter, index) => {
    let value = 0;

    if (index === 0) {
      value = Math.random() * remaining * 0.5;
    } else if (index === 1) {
      value = Math.random() * remaining * 0.3;
    } else {
      value = remaining;
    }

    percentages[letter] = value;
    remaining -= value;
  });

  // 🎲 cleanup (da nema 0 i glupih vrijednosti)
  Object.keys(percentages).forEach(k => {
    percentages[k] = Math.max(3, Math.round(percentages[k]));
  });

  // 🔧 normalize na 100%
  let sum = Object.values(percentages).reduce((a, b) => a + b, 0);

  Object.keys(percentages).forEach(k => {
    percentages[k] = Math.round((percentages[k] / sum) * 100);
  });

  showAudienceGraph(percentages);

  lifelines.askAudience = false;
  document.getElementById('askAudience').classList.add('lifeline-used');
  document.getElementById('joker3').style.opacity = '0.3';
  document.getElementById('joker3').classList.add('joker-crossed');
}
function showAudienceGraph(percentages) {
  document.getElementById('lifelineTitle').textContent =
    translations[currentLanguage].audienceTitle;

document.getElementById('lifelineMessage').classList.add('hidden');
  document.getElementById('timerCircle').classList.add('hidden');
  document.getElementById('audienceGraph').classList.remove('hidden');
  document.getElementById('lifelineModal').classList.remove('hidden');

  setTimeout(() => {
    Object.keys(percentages).forEach((letter, i) => {
      const bar = document.getElementById(`bar${letter}`);
      const percent = document.getElementById(`percent${letter}`);
      const target = percentages[letter];

      let current = 0;

      setTimeout(() => {
        const interval = setInterval(() => {
          current++;

          bar.style.height = current + "%";
          percent.textContent = current + "%";

          if (current >= target) {
            clearInterval(interval);
          }
        }, 12);
      }, i * 180);
    });
  }, 250);
}

    function resetLifelines() {
      document.querySelectorAll('.lifeline-icon').forEach(btn => {
        btn.classList.remove('lifeline-used');
      });
      document.getElementById('joker1').style.opacity = '1';
      document.getElementById('joker2').style.opacity = '1';
      document.getElementById('joker3').style.opacity = '1';
      document.getElementById('joker1').classList.remove('joker-crossed');
      document.getElementById('joker2').classList.remove('joker-crossed');
      document.getElementById('joker3').classList.remove('joker-crossed');
    }

    document.querySelectorAll('.answer-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        if (!btn.disabled) {
          checkAnswer(btn.dataset.answer);
        }
      });
    });

    document.getElementById('fiftyFifty').addEventListener('click', useFiftyFifty);
    document.getElementById('phoneAFriend').addEventListener('click', usePhoneAFriend);
    document.getElementById('askAudience').addEventListener('click', useAskAudience);
    document.getElementById('playAgain').addEventListener('click', () => {
      document.getElementById('languageScreen').classList.remove('hidden');
      document.getElementById('gameScreen').classList.add('hidden');
      document.getElementById('explanationSection').classList.add('hidden');
      wrongQuestionData = null;
    });
    
    document.getElementById('shareScore').addEventListener('click', () => {
      const score = currentQuestion;
      const maxScore = 15;
      const percentage = Math.round((score / maxScore) * 100);
      const shareText = currentLanguage === 'bs' 
        ? `Upravo sam postigao ${score}/15 pitanja u Math Millionaire kvizu! 🎯 ${percentage}% tačnosti! Možeš li bolje? 🏆`
        : `I just scored ${score}/15 questions in Math Millionaire quiz! 🎯 ${percentage}% accuracy! Can you beat it? 🏆`;
      
      // Try to use Web Share API
      if (navigator.share) {
        navigator.share({
          title: 'Math Millionaire Quiz',
          text: shareText
        }).catch(() => {});
      } else {
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(shareText).then(() => {
          const btn = document.getElementById('shareScore');
          const originalText = btn.innerHTML;
          btn.innerHTML = currentLanguage === 'bs' ? '    Kopirano!' : '✅ Copied!';
          setTimeout(() => {
            btn.innerHTML = originalText;
          }, 2000);
        }).catch(() => {});
      }
    });
    
    document.getElementById('themeToggle').addEventListener('click', toggleTheme);
    
    // Load theme and stats on page load
    loadTheme();
    loadStats();
    document.getElementById('closeLifeline').addEventListener('click', () => {
      if (phoneTimer) {
        clearInterval(phoneTimer);
        phoneTimer = null;
      }
      document.getElementById('lifelineModal').classList.add('hidden');
      document.getElementById('timerCircle').classList.add('hidden');
      ['A', 'B', 'C', 'D'].forEach(letter => {
        document.getElementById(`bar${letter}`).style.height = '0%';
        document.getElementById(`percent${letter}`).textContent = '0%';
      });
    });

function hideIntro() {
  const intro = document.getElementById("introScreen");

  if (!intro) return;

  setTimeout(() => {
    intro.style.transition = "opacity 0.8s ease";
    intro.style.opacity = "0";

    setTimeout(() => intro.remove(), 800);
  }, 4200);
}

window.addEventListener("load", hideIntro);

    // Music Controls
    const music = document.getElementById('backgroundMusic');
let masterMuted = false;


function playEffect(id) {

  if (masterMuted) return;

  const audio = document.getElementById(id);

  if (!audio) return;

  audio.volume = music.volume;
  audio.currentTime = 0;
  audio.play().catch(()=>{});
}
    const musicToggle = document.getElementById('musicToggle');
    const volumeSlider = document.getElementById('volumeSlider');
    let isPlaying = true;
    let sliderTimeout;

    // Set initial volume
    music.volume = 0.5;

    // Show/hide slider when clicking music icon
musicToggle.addEventListener('click', () => {

  if (volumeSlider.classList.contains('hidden')) {

    volumeSlider.classList.remove('hidden');

    clearTimeout(sliderTimeout);

    sliderTimeout = setTimeout(() => {
      volumeSlider.classList.add('hidden');
    },3000);

  } else {


    if (!masterMuted) {

      // 🔇 MUTE SVE
      masterMuted = true;

      music.pause();

      document.querySelectorAll("audio").forEach(a=>{
        a.pause();
      });

      musicToggle.textContent = '🔇';

    } else {


      // 🔊 UNMUTE
      masterMuted = false;

      music.play().catch(()=>{});

      isPlaying = true;


      if(volumeSlider.value == 0){
        musicToggle.textContent='🔇';
      }
      else if(volumeSlider.value < 50){
        musicToggle.textContent='🔉';
      }
      else{
        musicToggle.textContent='🔊';
      }

    }

  }

});
 
 
 
 volumeSlider.addEventListener('input',(e)=>{

const volume = Number(e.target.value) / 100;

music.volume = volume;


if(volume === 0){

    masterMuted = true;
    soundEnabled = false;

    music.pause();

    document.querySelectorAll("audio").forEach(a=>{
        a.pause();
    });

    musicToggle.textContent='🔇';

}
else{

    // korisnik je ručno povećao zvuk
    masterMuted = false;
    soundEnabled = true;


music.play().catch(()=>{});


    if(volume < 0.5){
        musicToggle.textContent='🔉';
    }
    else{
        musicToggle.textContent='🔊';
    }

}


clearTimeout(sliderTimeout);

sliderTimeout=setTimeout(()=>{
volumeSlider.classList.add('hidden');
},3000);


});

    // Handle autoplay restrictions - try to play when user interacts
document.addEventListener('click', () => {

  if (
    music.paused &&
    isPlaying &&
    !masterMuted &&
    music.volume > 0
  ) {

    music.play().catch(() => {
      musicToggle.textContent='🔇';
      isPlaying=false;
    });

  }

}, { once:true });


    // Admin Panel Functions
    function showAdminLogin() {
      document.getElementById('adminLoginModal').classList.remove('hidden');
      document.getElementById('loginError').classList.add('hidden');
      document.getElementById('adminUsername').value = '';
      document.getElementById('adminPassword').value = '';
    }

    function closeAdminLogin() {
      document.getElementById('adminLoginModal').classList.add('hidden');
    }

    function adminLogin() {
      const username = document.getElementById('adminUsername').value;
      const password = document.getElementById('adminPassword').value;
      
      if (username === '' && password === '') {
        document.getElementById('adminLoginModal').classList.add('hidden');
        document.getElementById('languageScreen').classList.add('hidden');
        document.getElementById('adminPanel').classList.remove('hidden');
        loadAdminQuestions();
      } else {
        document.getElementById('loginError').classList.remove('hidden');
      }
    }

    function logoutAdmin() {
      document.getElementById('adminPanel').classList.add('hidden');
      document.getElementById('languageScreen').classList.remove('hidden');
    }
function setAdminLanguage(lang) {

  adminLanguage = lang;


  document.querySelectorAll('.quiz-btn').forEach(btn=>{
      btn.classList.remove('active');
  });


  if(lang==='bs'){
      document.getElementById('adminLangBs').classList.add('active');
  }

  if(lang==='en'){
      document.getElementById('adminLangEn').classList.add('active');
  }

  if(lang==='ge'){
      document.getElementById('adminLangGe').classList.add('active');
  }

  if(lang==='gk'){
      document.querySelector('[onclick="setAdminLanguage(\'gk\')"]')
      .classList.add('active');
  }


  loadAdminQuestions();

  updateAdminQuizCounts(adminLanguage);

}

function showCategory(category,event){

  currentAdminCategory = category;


  document.querySelectorAll('.category-tab').forEach(btn=>{
      btn.classList.remove('active');
  });


  if(event){
      event.currentTarget.classList.add('active');
  }


  loadAdminQuestions();

}

 function loadAdminQuestions() {
  const container = document.getElementById('questionsList');
  container.innerHTML = '';

  const category = questionBank[adminLanguage][currentAdminCategory];

  ['easy', 'hard', 'hardest'].forEach(difficulty => {

const difficultyDiv = document.createElement('div');

let colorClass = '';

if (difficulty === 'easy') {
  colorClass = 'border-green-500 bg-green-900 bg-opacity-20';
} else if (difficulty === 'hard') {
  colorClass = 'border-yellow-500 bg-yellow-900 bg-opacity-20';
} else if (difficulty === 'hardest') {
  colorClass = 'border-red-500 bg-red-900 bg-opacity-20';
}

difficultyDiv.className =
`
mb-6
rounded-2xl
p-4
border
border-white/10
bg-white/5
backdrop-blur-xl
shadow-xl
`;

// HEADER
const difficultyTitle = document.createElement('h3');
difficultyTitle.className =
'text-2xl font-bold text-yellow-400 mb-3 cursor-pointer flex justify-between';


const content = document.createElement('div');
content.className = 'hidden';


const arrow = document.createElement('span');
arrow.textContent='▼';
arrow.style.transition='0.2s';


let displayName = difficulty;

if(difficulty==='hard') displayName='medium';
if(difficulty==='hardest') displayName='hard';


difficultyTitle.textContent =
`${displayName.toUpperCase()} (${category[difficulty].length} questions)`;


difficultyTitle.appendChild(arrow);



difficultyTitle.onclick = () => {

content.classList.toggle('hidden');


arrow.style.transform =
content.classList.contains('hidden')
?
'rotate(0deg)'
:
'rotate(180deg)';

};

    category[difficulty].forEach((q, index) => {
      const questionCard = document.createElement('div');
questionCard.className =
`
bg-white/5
backdrop-blur-xl
rounded-2xl
p-5
mb-4
border
border-white/10
hover:border-yellow-400/40
hover:bg-white/10
transition-all
duration-300
shadow-lg
`;
  
      questionCard.innerHTML = `
        <div class="flex justify-between items-start">
          <div class="flex-1">
          <p class="text-white font-bold text-lg mb-3">
${q.question}
</p>
            <div class="grid grid-cols-2 gap-2 text-sm">
             <span class="text-emerald-300 font-semibold">${q.correct}: ${q.answers[q.correct]}</span>
              ${Object.keys(q.answers)
                .filter(k => k !== q.correct)
                .map(k => `<span class="text-slate-300">${k}: ${q.answers[k]}</span>`)
                .join('')}
            </div>
          </div>

          <div class="flex gap-2 ml-4">
            <button onclick="editQuestion('${currentAdminCategory}', '${difficulty}', ${index})"
     class="bg-yellow-500/20 text-yellow-300 border border-yellow-400/30 hover:bg-yellow-500/30 px-3 py-1 rounded-lg text-sm font-bold transition">
              Edit
            </button>

            <button onclick="deleteQuestion('${currentAdminCategory}', '${difficulty}', ${index})"
          class="bg-red-500/20 text-red-300 border border-red-400/30 hover:bg-red-500/30 px-3 py-1 rounded-lg text-sm font-bold transition">
              🗑️ Delete
            </button>
          </div>
        </div>
      `;

      content.appendChild(questionCard);
    });

    difficultyDiv.appendChild(difficultyTitle);
    difficultyDiv.appendChild(content);
    container.appendChild(difficultyDiv);
  });
updateCategoryCounts();
  updateAdminQuizCounts();
}

let currentActiveLang = 'bs';
let currentActiveCategory = 'history';

/* =========================
   CATEGORY COUNTS + ACTIVE
========================= */
function updateCategoryCounts() {
  const buttons = document.querySelectorAll('.category-tab');

  buttons.forEach(btn => {
    const match = btn.getAttribute('onclick')?.match(/showCategory\('(.+?)'\)/);
    if (!match) return;

    const catName = match[1];
    const cat = questionBank[adminLanguage]?.[catName];
    if (!cat) return;

    const total =
      (cat.easy?.length || 0) +
      (cat.hard?.length || 0) +
      (cat.hardest?.length || 0);

    const baseText = btn.textContent.replace(/\s*\(\d+\)\s*/, '').trim();
    btn.innerHTML = `${baseText} <span class="text-yellow-300">(${total})</span>`;

    // ACTIVE STATE
    if (catName === currentActiveCategory) {
      btn.classList.add('bg-green-600', 'border-green-400');
      btn.classList.remove('bg-purple-600', 'border-purple-400');
    } else {
      btn.classList.add('bg-purple-600', 'border-purple-400');
      btn.classList.remove('bg-green-600', 'border-green-400');
    }
  });
}

/* =========================
   SET ACTIVE CATEGORY
========================= */
function setActiveCategory(catName) {
  currentActiveCategory = catName;

  document.querySelectorAll('.category-tab').forEach(btn => {
    const match = btn.getAttribute('onclick')?.match(/showCategory\('(.+?)'\)/);
    if (!match) return;

    const name = match[1];

    if (name === catName) {
      btn.classList.add('bg-green-600', 'border-green-400');
      btn.classList.remove('bg-purple-600', 'border-purple-400');
    } else {
      btn.classList.add('bg-purple-600', 'border-purple-400');
      btn.classList.remove('bg-green-600', 'border-green-400');
    }
  });
}

/* =========================
   QUIZ COUNTS + ACTIVE LANG
========================= */
function updateAdminQuizCounts(activeLang = currentActiveLang) {
  const langs = ['en', 'bs', 'ge', 'gk'];

  currentActiveLang = activeLang;

  langs.forEach(lang => {
    const btn = document.querySelector(
      `button[onclick="setAdminLanguage('${lang}')"]`
    );

    if (!btn) return;

    const langData = questionBank[lang] || {};

    let total = 0;

    Object.keys(langData).forEach(cat => {
      const c = langData[cat];
      total += (c.easy?.length || 0)
             + (c.hard?.length || 0)
             + (c.hardest?.length || 0);
    });

    const baseText = btn.textContent.replace(/\s*\(\d+\)\s*/, '').trim();
    btn.innerHTML = `${baseText} <span class="text-yellow-300">(${total})</span>`;

// ACTIVE STATE
if (lang === currentActiveLang) {

  btn.className =
`
quiz-btn
active

px-8
py-3

rounded-xl

font-bold

text-black

bg-gradient-to-r
from-yellow-300
to-yellow-500

border
border-yellow-200

shadow-[0_0_30px_rgba(255,216,106,.35)]

transition
duration-300

scale-105
`;

} else {

  btn.className =
`
quiz-btn

px-8
py-3

rounded-xl

font-bold

text-white

bg-white/5

border
border-white/10

hover:bg-white/10

hover:border-yellow-400/40

transition
duration-300
`;

}
  });
}
    function showAddQuestion() {
      editingQuestionIndex = null;
      document.getElementById('editModalTitle').textContent = 'Dodaj novo pitanje';
      document.getElementById('editCategory').value = currentAdminCategory;
	  document.getElementById('editLanguage').value = adminLanguage;
      document.getElementById('editDifficulty').value = 'easy';
      document.getElementById('editQuestion').value = '';
      document.getElementById('editAnswerA').value = '';
      document.getElementById('editAnswerB').value = '';
      document.getElementById('editAnswerC').value = '';
      document.getElementById('editAnswerD').value = '';
      document.getElementById('editCorrect').value = 'A';
      document.getElementById('editQuestionModal').classList.remove('hidden');
    }

    function editQuestion(category, difficulty, index) {
	document.getElementById('editLanguage').value = adminLanguage;
      editingQuestionIndex = { category, difficulty, index };
      const q = questionBank[adminLanguage][category][difficulty][index];
      
      document.getElementById('editModalTitle').textContent = 'Uredi pitanje';
      document.getElementById('editCategory').value = category;
      document.getElementById('editDifficulty').value = difficulty;
      document.getElementById('editQuestion').value = q.question;
      document.getElementById('editAnswerA').value = q.answers.A;
      document.getElementById('editAnswerB').value = q.answers.B;
      document.getElementById('editAnswerC').value = q.answers.C;
      document.getElementById('editAnswerD').value = q.answers.D;
      document.getElementById('editCorrect').value = q.correct;
      document.getElementById('editQuestionModal').classList.remove('hidden');
    }

function deleteQuestion(category, difficulty, index) {
  if (confirm('Are you sure you want to delete this question?')) {

    // 1. briše iz memorije
    questionBank[adminLanguage][category][difficulty].splice(index, 1);

    // 2. 🔥 SNIMA u localStorage (KLJUČNO)
    localStorage.setItem("questionBank", JSON.stringify(questionBank));

    // 3. refresh admin liste
    loadAdminQuestions();
  }
}
   function saveQuestion() {
  const lang = document.getElementById('editLanguage').value;
  const category = document.getElementById('editCategory').value;
  const difficulty = document.getElementById('editDifficulty').value;
  const question = document.getElementById('editQuestion').value;
  const answerA = document.getElementById('editAnswerA').value;
  const answerB = document.getElementById('editAnswerB').value;
  const answerC = document.getElementById('editAnswerC').value;
  const answerD = document.getElementById('editAnswerD').value;
  const correct = document.getElementById('editCorrect').value;

  if (!question || !answerA || !answerB || !answerC || !answerD) {
    alert('Molimo popunite sva polja!');
    return;
  }

  const newQuestion = {
    question,
    answers: {
      A: answerA,
      B: answerB,
      C: answerC,
      D: answerD
    },
    correct
  };

  // 🔥 SAFETY CHECK (DA NE PUKNE)
  if (!questionBank[adminLanguage]) {
    questionBank[adminLanguage] = {};
  }

  if (!questionBank[adminLanguage][category]) {
    questionBank[adminLanguage][category] = { easy: [], hard: [], hardest: [] };
  }

  if (!questionBank[adminLanguage][category][difficulty]) {
    questionBank[adminLanguage][category][difficulty] = [];
  }

  // 🔥 ADD / UPDATE
  if (editingQuestionIndex) {
    questionBank[adminLanguage]
      [editingQuestionIndex.category]
      [editingQuestionIndex.difficulty]
      [editingQuestionIndex.index] = newQuestion;
  } else {
if (!questionBank[lang]) questionBank[lang] = {};
if (!questionBank[lang][category]) questionBank[lang][category] = { easy: [], hard: [], hardest: [] };
if (!questionBank[lang][category][difficulty]) questionBank[lang][category][difficulty] = [];

questionBank[lang][category][difficulty].push(newQuestion);
  }

  // 🔥 SAVE TO LOCAL STORAGE
  localStorage.setItem("questionBank", JSON.stringify(questionBank));

  closeEditModal();
  currentAdminCategory = category;
  loadAdminQuestions();

  // update tabs
  document.querySelectorAll('.category-tab').forEach(btn => {
    btn.className =
      'category-tab bg-purple-600 hover:bg-purple-500 px-4 py-2 rounded-lg font-bold border-2 border-purple-400';
  });

  const activeBtn = [...document.querySelectorAll('.category-tab')]
    .find(btn => btn.textContent.toLowerCase().includes(category.toLowerCase()));

  if (activeBtn) {
    activeBtn.className =
      'category-tab bg-green-600 hover:bg-green-500 px-4 py-2 rounded-lg font-bold border-2 border-green-400';
  }
}

// =========================

function closeEditModal() {
  const modal = document.getElementById('editQuestionModal');
  if (modal) modal.classList.add('hidden');
}

// =========================


function updateLifelineLanguage(type){

const lang = currentLanguage || "bs";


const texts = {

bs:{
phone:"Pozovi prijatelja",
audience:"Pitaj publiku",
lifeline:"POMOĆ",
close:"Zatvori"
},


en:{
phone:"Phone a Friend",
audience:"Ask the Audience",
lifeline:"LIFELINE",
close:"Close"
},

};


const t=texts[lang];


document.getElementById("lifelineType").textContent=t.lifeline;


document.querySelector(".close-text").textContent=t.close;


if(type==="phone"){

document.getElementById("lifelineTitle").textContent=t.phone;

}


if(type==="audience"){

document.getElementById("lifelineTitle").textContent=t.audience;

document.getElementById("audienceTitle").textContent=t.audience;

}


}








function confirmReturnHome() {

  const isBS = currentLanguage === "bs" || currentLanguage === "ge";

  const modal = document.createElement("div");

  modal.className =
    "fixed inset-0 z-[9999] flex items-center justify-center p-6";

  modal.style.background =
    "radial-gradient(circle at center, rgba(20,30,70,.45), rgba(0,0,0,.92))";
  modal.style.backdropFilter = "blur(10px)";
  modal.style.webkitBackdropFilter = "blur(10px)";

modal.innerHTML = `
<div style="
position:relative;
width:100%;
max-width:520px;
border-radius:24px;
overflow:hidden;
background:rgba(11,18,38,.82);
backdrop-filter:blur(24px);
-webkit-backdrop-filter:blur(24px);
border:1px solid rgba(255,214,102,.28);
box-shadow:
0 30px 80px rgba(0,0,0,.75),
0 0 80px rgba(36,91,255,.12),
inset 0 1px 0 rgba(255,255,255,.06);
">

<!-- top glow -->
<div style="
position:absolute;
left:0;
top:0;
width:100%;
height:2px;
background:linear-gradient(90deg,transparent,#FFD86A,transparent);
opacity:.9;
"></div>

<div style="padding:46px;">

<div style="
font-size:13px;
letter-spacing:4px;
text-transform:uppercase;
color:#9DA9C6;
margin-bottom:14px;
font-weight:600;
">
${(currentLanguage === 'bs' || currentLanguage === 'ge') ? 'Potvrda' : 'Confirmation'}
</div>

<h2 style="
margin:0;
font-size:34px;
font-weight:800;
color:white;
line-height:1.15;
">
${(currentLanguage === 'bs' || currentLanguage === 'ge')
? 'Napustiti igru?'
: 'Leave the game?'}
</h2>

<div style="
width:70px;
height:3px;
margin:22px 0 28px;
background:linear-gradient(90deg,#FFD86A,transparent);
border-radius:10px;
"></div>

<p style="
margin:0;
font-size:17px;
line-height:1.8;
color:#B9C4E2;
">
${(currentLanguage === 'bs' || currentLanguage === 'ge')
? 'Ako sada napustite igru, trenutni napredak neće biti sačuvan.'
: 'If you leave now, your current progress will not be saved.'}
</p>

<div style="
display:flex;
justify-content:flex-end;
gap:14px;
margin-top:42px;
">

<button
onclick="closeConfirmModal()"
style="
min-width:150px;
height:54px;
background:rgba(255,255,255,.05);
border:1px solid rgba(255,255,255,.08);
border-radius:14px;
color:#E5E7EB;
font-size:15px;
font-weight:700;
cursor:pointer;
transition:.25s;
"
onmouseover="
this.style.background='rgba(255,255,255,.09)';
this.style.transform='translateY(-2px)';
"
onmouseout="
this.style.background='rgba(255,255,255,.05)';
this.style.transform='translateY(0)';
">
${(currentLanguage === 'bs' || currentLanguage === 'ge') ? 'Nastavi igru' : 'Continue'}
</button>

<button
onclick="returnToHome()"
style="
min-width:170px;
height:54px;
background:linear-gradient(135deg,#D9B95B,#F6DD8C);
border:none;
border-radius:14px;
color:#111827;
font-size:15px;
font-weight:800;
letter-spacing:.4px;
cursor:pointer;
box-shadow:0 12px 35px rgba(217,185,91,.28);
transition:.25s;
"
onmouseover="
this.style.transform='translateY(-2px)';
this.style.boxShadow='0 18px 45px rgba(217,185,91,.45)';
"
onmouseout="
this.style.transform='translateY(0)';
this.style.boxShadow='0 12px 35px rgba(217,185,91,.28)';
">
${(currentLanguage === 'bs' || currentLanguage === 'ge') ? 'Napusti igru' : 'Leave Game'}
</button>

</div>

</div>

</div>
`;

  document.body.appendChild(modal);
  window.currentConfirmModal = modal;
}

// =========================

function closeConfirmModal() {
  if (window.currentConfirmModal) {
    window.currentConfirmModal.remove();
    window.currentConfirmModal = null;
  }
}

// =========================

function returnToHome() {
  closeConfirmModal();

  const game = document.getElementById('gameScreen');
  const lang = document.getElementById('languageScreen');
  if (game) game.classList.add('hidden');
  if (lang) lang.classList.remove('hidden');
  currentQuestion = 0;
  lifelines = {
    fiftyFifty: true,
    phoneAFriend: true,
    askAudience: true
  };
}


const baseViewers = 50;
const MAX_VIEWERS = 10000;

function updateViewers() {
  const el = document.getElementById("viewers");
  const progressionBoost = currentQuestion * 60; // jači rast po pitanju
  const fluctuation = (Math.random() - 0.5) * 80; // real TV varijacija
  viewers += progressionBoost * 0.05 + fluctuation;
  // granice
  if (viewers < 20) viewers = 20;
  if (viewers > MAX_VIEWERS) viewers = MAX_VIEWERS;
  el.textContent = Math.floor(viewers).toLocaleString();
  setTimeout(updateViewers, 1500 + Math.random() * 1000);
}

// start
viewers = baseViewers;
updateViewers();

document.addEventListener("DOMContentLoaded", function () {
  const btn = document.querySelector(".chat-fab");
  btn.style.opacity = "0";
  btn.style.transform = "scale(0)";

  setTimeout(() => {
    btn.style.transition = "0.5s ease";
    btn.style.opacity = "1";
    btn.style.transform = "scale(1)";
  }, 2000);
});

document.querySelectorAll(".language-card").forEach(card => {
    card.addEventListener("click", function (e) {

        if (this.dataset.lang === "mg") {
            e.stopPropagation();
            window.location.href = "minigames.html";
            return;
        }

        selectLanguage(this.dataset.lang);
    });
});

const backgroundMusic = document.getElementById("backgroundMusic");

if(backgroundMusic){
    backgroundMusic.volume = 0.13;
}

// ENTER LOGIN
document
.querySelectorAll('#adminUsername, #adminPassword')
.forEach(input => {

    input.addEventListener('keydown', function(e){

        if(e.key === "Enter"){

            adminLogin();

        }

    });

});