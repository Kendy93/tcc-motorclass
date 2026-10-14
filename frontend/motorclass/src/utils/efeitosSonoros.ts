const VOLUME_SELECAO = 0.5;
const VOLUME_ENVIO = 0.5;

export function tocarSomSelecao() {
    const audio = new Audio("/sounds/click_sound.mp3");
    audio.volume = VOLUME_SELECAO;
    void audio.play().catch(() => {});
}

export function tocarSomEnvio() {
    const audio = new Audio("/sounds/car_engine.mp3");
    audio.volume = VOLUME_ENVIO;
    void audio.play().catch(() => {});
}