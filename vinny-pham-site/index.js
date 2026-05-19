const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

const status = document.querySelector('#playerStatus');
const playBtn = document.querySelector('#playBtn');
const audio = new Audio('station/station.mp3');
audio.loop = true;
let playing = false;
let dotInterval;
const dots = document.querySelectorAll('.player-dot');

playBtn.onclick = function() {
    if (!playing) {
        audio.play();
        playBtn.textContent = '■ 승강장 음악 / Platform Music';
        status.textContent = '재생 중 / Playing';
        status.classList.add('playing');
        dotInterval = setInterval(() => {
            dots.forEach(d => d.classList.remove('active'));
            dots[Math.floor(Math.random() * dots.length)].classList.add('active');
        }, 300);
    } else {
        audio.pause();
        audio.currentTime = 0;
        playBtn.textContent = '▶ 승강장 음악 / Platform Music';
        status.textContent = '정지 / Stopped';
        status.classList.remove('playing');
        clearInterval(dotInterval);
        dots.forEach(d => d.classList.remove('active'));
    }
    playing = !playing;
};


document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

const updateTime= () =>{
    const time = new Date().toLocaleTimeString('en-US', {
        timeZone: 'America/Los_Angeles',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
    });
    const el = document.getElementById('localTime');
    if (el) el.textContent = time;
}

updateTime();
setInterval(updateTime, 1000);