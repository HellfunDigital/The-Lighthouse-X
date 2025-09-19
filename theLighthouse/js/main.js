// Lighthouse ARG interactions

document.addEventListener('DOMContentLoaded', () => {
    init();
});

function init() {
    setupBeaconPulse();
    setupTransmissions();
    setupLogbookPuzzle();
    setupConstellationPuzzle();
    setupUnderdeckPuzzle();
    setupNorthlightReveal();
}

function setupBeaconPulse() {
    const button = document.getElementById('start-signal');
    if (!button) {
        return;
    }

    let audioContext;
    const pattern = [
        { frequency: 320, duration: 0.45, delay: 0 },
        { frequency: 440, duration: 0.4, delay: 0.6 },
        { frequency: 560, duration: 0.8, delay: 1.4 }
    ];

    button.addEventListener('click', () => {
        if (button.dataset.playing === 'true') {
            return;
        }

        button.dataset.playing = 'true';
        button.textContent = 'Beacon Broadcasting';
        button.classList.add('button--active');

        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtx) {
            return;
        }

        audioContext = audioContext || new AudioCtx();
        const now = audioContext.currentTime;

        pattern.forEach(({ frequency, duration, delay }) => {
            const oscillator = audioContext.createOscillator();
            const gain = audioContext.createGain();

            oscillator.type = 'sine';
            oscillator.frequency.value = frequency;
            oscillator.connect(gain);
            gain.connect(audioContext.destination);

            const startTime = now + delay;
            const endTime = startTime + duration;

            gain.gain.setValueAtTime(0, startTime);
            gain.gain.linearRampToValueAtTime(0.32, startTime + 0.05);
            gain.gain.exponentialRampToValueAtTime(0.0001, endTime);

            oscillator.start(startTime);
            oscillator.stop(endTime + 0.05);
        });
    });
}

function setupTransmissions() {
    const transmissions = document.querySelectorAll('.transmission');
    transmissions.forEach((item) => {
        const button = item.querySelector('.transmission__action');
        const output = item.querySelector('.transmission__decoded');
        const cipher = item.dataset.cipher;
        const shift = Number.parseInt(item.dataset.shift ?? '0', 10) || 0;

        if (!button || !output || !cipher) {
            return;
        }

        button.addEventListener('click', () => {
            const decoded = caesarShift(cipher, -shift);
            output.textContent = decoded;
            output.classList.remove('hidden');
            output.setAttribute('aria-hidden', 'false');
            button.textContent = 'Decoded';
            button.disabled = true;
        });
    });
}

function setupLogbookPuzzle() {
    const form = document.getElementById('logbook-form');
    if (!form) {
        return;
    }

    const status = document.getElementById('logbook-status');
    const reveal = document.getElementById('logbook-solution');

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const formData = new FormData(form);
        const code = (formData.get('logbook-code') || '').toString();
        const numeric = code.replace(/\D+/g, '');

        if (numeric === '3141') {
            setStatus(status, 'The mechanism aligns with the beacon rhythm.', 'success');
            reveal?.classList.remove('hidden');
            reveal?.setAttribute('aria-hidden', 'false');
            form.querySelector('button')?.setAttribute('disabled', 'true');
        } else {
            setStatus(status, 'Access denied. Listen to the transmissions again.', 'error');
        }
    });
}

function setupConstellationPuzzle() {
    const form = document.getElementById('constellation-form');
    if (!form) {
        return;
    }

    const status = document.getElementById('constellation-status');
    const reveal = document.getElementById('constellation-success');

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const value = new FormData(form).get('constellation-answer') || '';
        const word = value.toString().trim().toUpperCase();

        if (word === 'BRINE') {
            setStatus(status, 'The resonance harmonics lock into place.', 'success');
            reveal?.classList.remove('hidden');
            reveal?.setAttribute('aria-hidden', 'false');
            form.querySelector('button')?.setAttribute('disabled', 'true');
        } else {
            setStatus(status, 'The lenses reject the sequence. Check the diary shards.', 'error');
        }
    });
}

function setupUnderdeckPuzzle() {
    const switches = document.querySelectorAll('[data-switch]');
    if (!switches.length) {
        return;
    }

    const order = ['up', 'down', 'right'];
    const target = ['up', 'up', 'down', 'down', 'right'];
    const status = document.getElementById('underdeck-status');
    const reveal = document.getElementById('underdeck-success');

    switches.forEach((button) => {
        button.addEventListener('click', () => {
            const current = button.getAttribute('data-state') || 'up';
            const next = order[(order.indexOf(current) + 1) % order.length];
            button.setAttribute('data-state', next);
            button.textContent = next.toUpperCase();
            button.setAttribute('aria-pressed', next !== 'up');
            checkPattern();
        });
    });

    function checkPattern() {
        const states = Array.from(switches).map((button) => button.getAttribute('data-state'));
        if (states.join('|') === target.join('|')) {
            setStatus(status, 'A chord thrums through the hull.', 'success');
            reveal?.classList.remove('hidden');
            reveal?.setAttribute('aria-hidden', 'false');
        } else {
            const formatted = states.map((state) => state?.toUpperCase() ?? '?').join(' • ');
            setStatus(status, `Current cadence: ${formatted}`, undefined);
        }
    }

    checkPattern();
}

function setupNorthlightReveal() {
    const button = document.getElementById('northlight-reveal');
    if (!button) {
        return;
    }

    const reveal = document.getElementById('northlight-message');
    button.addEventListener('click', () => {
        reveal?.classList.remove('hidden');
        reveal?.setAttribute('aria-hidden', 'false');
        button.setAttribute('disabled', 'true');
        button.textContent = 'Note decoded';
    });
}

function caesarShift(text, shift) {
    const alphabetLower = 'abcdefghijklmnopqrstuvwxyz';
    const alphabetUpper = alphabetLower.toUpperCase();
    const normalized = ((shift % 26) + 26) % 26;

    return text.split('').map((char) => {
        if (alphabetLower.includes(char)) {
            const index = alphabetLower.indexOf(char);
            return alphabetLower[(index + normalized) % 26];
        }
        if (alphabetUpper.includes(char)) {
            const index = alphabetUpper.indexOf(char);
            return alphabetUpper[(index + normalized) % 26];
        }
        return char;
    }).join('');
}

function setStatus(element, message, variant) {
    if (!element) {
        return;
    }

    element.textContent = message;
    element.classList.remove('status-message--success', 'status-message--error');
    if (variant) {
        element.classList.add(`status-message--${variant}`);
    }
}
