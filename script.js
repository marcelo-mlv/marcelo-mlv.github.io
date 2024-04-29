let audioContext = new (window.AudioContext || window.webkitAudioContext)();
let oscillator = null;
let gainNode = null;

function playWave() {
    let frequency = parseFloat(document.getElementById("frequency").value);
    let attack = parseFloat(document.getElementById("attack").value);
    let decay = parseFloat(document.getElementById("decay").value);
    let sustain = parseFloat(document.getElementById("sustain").value);
    let release = parseFloat(document.getElementById("release").value);

    if (oscillator) {
        oscillator.stop();
    }

    oscillator = audioContext.createOscillator();
    oscillator.type = 'sine';
    oscillator.frequency.value = frequency;

    gainNode = audioContext.createGain();
    gainNode.gain.setValueAtTime(0, audioContext.currentTime); // Garante que o som comece em zero
    gainNode.gain.linearRampToValueAtTime(1, audioContext.currentTime + attack); // Ataque
    gainNode.gain.linearRampToValueAtTime(sustain, audioContext.currentTime + attack + decay); // Decay
    gainNode.gain.setValueAtTime(sustain, audioContext.currentTime + attack + decay); // Sustain (mantém o valor durante a execução)
    gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + attack + decay + release); // Release

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.start();
}

function stopWave() {
    if (oscillator) {
        oscillator.stop();
        oscillator.disconnect();
        oscillator = null;
    }
}

// Atualiza os valores exibidos ao lado dos controles deslizantes
document.getElementById("frequency").addEventListener("input", function() {
    let frequency = parseFloat(this.value);
    document.getElementById("frequencyValue").textContent = frequency;
});

document.getElementById("attack").addEventListener("input", function() {
    let attack = parseFloat(this.value);
    document.getElementById("attackValue").textContent = attack.toFixed(2);
});

document.getElementById("decay").addEventListener("input", function() {
    let decay = parseFloat(this.value);
    document.getElementById("decayValue").textContent = decay.toFixed(2);
});

document.getElementById("sustain").addEventListener("input", function() {
    let sustain = parseFloat(this.value);
    document.getElementById("sustainValue").textContent = sustain.toFixed(2);
});

document.getElementById("release").addEventListener("input", function() {
    let release = parseFloat(this.value);
    document.getElementById("releaseValue").textContent = release.toFixed(2);
});
