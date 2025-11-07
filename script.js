// ===== ELEMENTOS DO DOM =====
const mensagemInput = document.getElementById('mensagem-input');
const deslocamentoInput = document.getElementById('deslocamento-input');
const btnEscolher = document.getElementById('btn-escolher');
const btnRetornar = document.getElementById('btn-retornar');
const resultSection = document.getElementById('result-section');
const resultContent = document.getElementById('result-content');
const themeAudio = document.getElementById('theme-audio');
const playAudioBtn = document.getElementById('play-audio');
const pauseAudioBtn = document.getElementById('pause-audio');

// ===== CONTROLE DE ÁUDIO =====
playAudioBtn.addEventListener('click', () => {
  themeAudio.play();
  playAudioBtn.style.opacity = '0.5';
  pauseAudioBtn.style.opacity = '1';
});

pauseAudioBtn.addEventListener('click', () => {
  themeAudio.pause();
  playAudioBtn.style.opacity = '1';
  pauseAudioBtn.style.opacity = '0.5';
});

// ===== FUNÇÃO PRINCIPAL: DESCRIPTOGRAFAR CIFRA DE CÉSAR =====
function descriptografarCesar(texto, deslocamento) {
  let resultado = '';
  const passos = [];

  // Normalizar deslocamento para evitar valores negativos
  deslocamento = ((deslocamento % 26) + 26) % 26;

  // Adicionar informações iniciais
  passos.push({
    titulo: '📋 Entrada',
    conteudo: `Texto criptografado: "${texto}"<br>Deslocamento: ${deslocamento}`
  });

  passos.push({
    titulo: '🔄 Processo de Decodificação',
    conteudo: 'Retrocedendo cada letra ' + deslocamento + ' posições no alfabeto...'
  });

  let detalhesCaracteres = '<div style="margin-top: 10px;">';

  for (let i = 0; i < texto.length; i++) {
    const char = texto[i];
    let novoChar = char;

    if (/[a-zA-Z]/.test(char)) {
      const codigo = char.charCodeAt(0);
      const ehMaiuscula = char === char.toUpperCase();
      const base = ehMaiuscula ? 65 : 97; // 'A' = 65, 'a' = 97

      // Calcular nova posição
      const posicaoAtual = codigo - base;
      let novaPosicao = (posicaoAtual - deslocamento + 26) % 26;
      novoChar = String.fromCharCode(base + novaPosicao);

      detalhesCaracteres += `<span class="step-char">'${char}' → '${novoChar}'</span>`;
    } else {
      detalhesCaracteres += `<span class="step-char">'${char}' (mantido)</span>`;
    }

    resultado += novoChar;
  }

  detalhesCaracteres += '</div>';

  passos.push({
    titulo: '🔤 Transformações Individuais',
    conteudo: detalhesCaracteres
  });

  passos.push({
    titulo: '✅ Validação',
    conteudo: `Todos os caracteres foram processados corretamente.<br>
                   Letras: retrocedidas ${deslocamento} posições<br>
                   Outros caracteres: preservados<br>
                   Maiúsculas/minúsculas: mantidas`
  });

  return { resultado, passos };
}

// ===== VALIDAR ENTRADA =====
function validarEntrada(mensagem, deslocamento) {
  if (!mensagem || mensagem.trim() === '') {
    alert('⚠️ Por favor, insira uma mensagem criptografada!');
    return false;
  }

  if (!deslocamento || isNaN(deslocamento) || deslocamento < 1 || deslocamento > 25) {
    alert('⚠️ Por favor, insira um deslocamento válido (1-25)!');
    return false;
  }

  return true;
}

// ===== EXIBIR RESULTADO =====
function exibirResultado(dados) {
  resultContent.innerHTML = '';

  // Adicionar cada passo
  dados.passos.forEach((passo, index) => {
    const stepDiv = document.createElement('div');
    stepDiv.className = 'step';
    stepDiv.style.animationDelay = `${index * 0.1}s`;

    stepDiv.innerHTML = `
            <div class="step-title">${passo.titulo}</div>
            <div class="step-content">${passo.conteudo}</div>
        `;

    resultContent.appendChild(stepDiv);
  });

  // Adicionar resultado final
  const finalDiv = document.createElement('div');
  finalDiv.className = 'final-result';
  finalDiv.innerHTML = `
        <div class="final-result-label">🎉 Mensagem Decodificada:</div>
        <div class="final-result-text">"${dados.resultado}"</div>
    `;

  resultContent.appendChild(finalDiv);

  // Mostrar seção de resultado
  resultSection.classList.add('show');

  // Scroll suave para o resultado
  setTimeout(() => {
    resultSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, 100);
}

// ===== LIMPAR RESULTADO =====
function limparResultado() {
  resultSection.classList.remove('show');
  resultContent.innerHTML = '';
  mensagemInput.value = '';
  deslocamentoInput.value = '';
  mensagemInput.focus();
}

// ===== EVENT LISTENERS =====
btnEscolher.addEventListener('click', () => {
  const mensagem = mensagemInput.value;
  const deslocamento = parseInt(deslocamentoInput.value);

  if (validarEntrada(mensagem, deslocamento)) {
    const dados = descriptografarCesar(mensagem, deslocamento);
    exibirResultado(dados);
  }
});

btnRetornar.addEventListener('click', limparResultado);

// Permitir Enter para processar
mensagemInput.addEventListener('keypress', e => {
  if (e.key === 'Enter') {
    btnEscolher.click();
  }
});

deslocamentoInput.addEventListener('keypress', e => {
  if (e.key === 'Enter') {
    btnEscolher.click();
  }
});

// ===== INICIALIZAÇÃO =====
document.addEventListener('DOMContentLoaded', () => {
  mensagemInput.focus();
  pauseAudioBtn.style.opacity = '0.5';
});
