// ==========================================================
// CONTADOR DE TEMPO JUNTOS
// Troque a data abaixo pela data em que vocês começaram a namorar.
// Formato: ano, mês (1 a 12), dia, hora, minuto
// ==========================================================
const ANO = 2025;
const MES = 7;   // 1 = janeiro ... 12 = dezembro
const DIA = 11;
const HORA = 0;
const MINUTO = 0;

const inicio = new Date(ANO, MES - 1, DIA, HORA, MINUTO, 0);

const elDias = document.getElementById("dias");
const elHoras = document.getElementById("horas");
const elMinutos = document.getElementById("minutos");
const elSegundos = document.getElementById("segundos");

function doisDigitos(n) {
    return String(n).padStart(2, "0");
}

function atualizarContador() {
    const agora = new Date();
    let diff = Math.floor((agora - inicio) / 1000);

    if (diff < 0) diff = 0;

    const dias = Math.floor(diff / 86400);
    const horas = Math.floor((diff % 86400) / 3600);
    const minutos = Math.floor((diff % 3600) / 60);
    const segundos = diff % 60;

    elDias.textContent = dias;
    elHoras.textContent = doisDigitos(horas);
    elMinutos.textContent = doisDigitos(minutos);
    elSegundos.textContent = doisDigitos(segundos);
}

atualizarContador();
setInterval(atualizarContador, 1000);

// ==========================================================
// MÚSICA
// Navegadores bloqueiam autoplay com som. Se isso acontecer,
// a música toca no primeiro toque/clique na página.
// ==========================================================
const musica = document.getElementById("musicaFundo");

if (musica) {
    const tentar = musica.play();

    if (tentar !== undefined) {
        tentar.catch(() => {
            const iniciar = () => {
                musica.play();
                document.removeEventListener("click", iniciar);
                document.removeEventListener("touchstart", iniciar);
            };
            document.addEventListener("click", iniciar);
            document.addEventListener("touchstart", iniciar);
        });
    }
}

// CARTAS SURPRESA

const cartas = document.querySelectorAll(".carta");

cartas.forEach(function(carta) {

    carta.addEventListener("click", function() {

        const mensagem = carta.dataset.mensagem;

        document.getElementById("mensagemCarta").textContent = mensagem;

    });

});


// COFRE DO AMOR

document.getElementById("abrirCofre").addEventListener("click", function() {

    const senha = document.getElementById("senhaCofre").value;

    const mensagem = document.getElementById("mensagemCofre");

    if (senha === "11072025") {

        mensagem.textContent =
        "🔓 Cofre desbloqueado! Meu amor, essa é a data do nosso primeiro encontro. Uma lembrança que vou guardar para sempre. Eu te amo, meu bocó! ❤️";

    } else {

        mensagem.textContent =
        "Ops! Essa não é a senha. Tente novamente, meu amor! 💗";

    }

});


// POTE DE MOTIVOS PARA TE AMAR

const motivos = [

    "Porque você tem um coração lindo. ❤️",

    "Porque consegue me fazer sorrir até quando estou brava. 🥹",

    "Porque amo seu jeitinho de cuidar de mim.",

    "Porque você é meu melhor companheiro.",

    "Porque adoro nossas conversas e nossas brincadeiras.",

    "Porque você faz parte dos meus sonhos.",

    "Porque amo ter você na minha vida.",

    "Porque até suas bobagens me fazem feliz. 😂",

    "Porque quero construir muitas lembranças com você.",

    "Porque, entre tantas pessoas, meu coração escolheu você. ❤️"

];

document.getElementById("sortearMotivo").addEventListener("click", function() {

    const sorteado = Math.floor(Math.random() * motivos.length);

    document.getElementById("motivoAmor").textContent =
    motivos[sorteado];

});

// ===================================
// 1. RASPE E DESCUBRA
// ===================================

const canvas = document.getElementById("rasparCanvas");
const ctx = canvas.getContext("2d");

function prepararCartao() {

    const largura = canvas.clientWidth;
    const altura = canvas.clientHeight;
    const escala = window.devicePixelRatio || 1;

    canvas.width = largura * escala;
    canvas.height = altura * escala;

    ctx.scale(escala, escala);

    ctx.fillStyle = "#d9a4b8";
    ctx.fillRect(0, 0, largura, altura);

    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 20px Arial";
    ctx.textAlign = "center";
    ctx.fillText("✨ RASPE AQUI ✨", largura / 2, altura / 2);

    ctx.globalCompositeOperation = "destination-out";
}

prepararCartao();

let raspando = false;
let cartaoRevelado = false;

function raspar(evento) {

    if (!raspando || cartaoRevelado) return;

    const retangulo = canvas.getBoundingClientRect();

    const x = evento.clientX - retangulo.left;
    const y = evento.clientY - retangulo.top;

    ctx.beginPath();
    ctx.arc(x, y, 20, 0, Math.PI * 2);
    ctx.fill();

    // Verifica quanto do cartão já foi raspado.
    const pixels = ctx.getImageData(
        0, 0, canvas.width, canvas.height
    ).data;

    let apagados = 0;
    let total = 0;

    for (let i = 3; i < pixels.length; i += 32) {
        total++;

        if (pixels[i] < 128) {
            apagados++;
        }
    }

    if (apagados / total > 0.45) {
        cartaoRevelado = true;
        canvas.style.display = "none";
    }
}

canvas.addEventListener("pointerdown", function(evento) {
    raspando = true;
    canvas.setPointerCapture(evento.pointerId);
    raspar(evento);
});

canvas.addEventListener("pointermove", raspar);

canvas.addEventListener("pointerup", function() {
    raspando = false;
});

canvas.addEventListener("pointercancel", function() {
    raspando = false;
});


// ===================================
// 2. QUIZ DO NOSSO NAMORO
// ===================================

const perguntas = [

    {
        pergunta: "Em que dia começamos a nos conhecer?",
        opcoes: ["11/07/2025", "29/09/2025", "11/01/2026"],
        resposta: "11/07/2025"
    },

    {
        pergunta: "Quando foi nosso primeiro encontro pessoalmente?",
        opcoes: ["11/07/2025", "29/09/2025", "29/10/2025"],
        resposta: "29/09/2025"
    },

    {
        pergunta: "Onde aconteceu nosso primeiro encontro?",
        opcoes: [
            "Em um restaurante",
            "Em um shopping",
            "Em um banco da praça"
        ],
        resposta: "Em um banco da praça"
    },

    {
        pergunta: "Qual roupa eu estava usando no nosso primeiro encontro?",
        opcoes: [
            "Vestido vermelho",
            "Calça roxa e blusa preta",
            "Calça jeans e blusa branca"
        ],
        resposta: "Calça roxa e blusa preta"
    }

];

let numeroPergunta = 0;
let pontos = 0;
let respondeu = false;

const perguntaQuiz = document.getElementById("perguntaQuiz");
const opcoesQuiz = document.getElementById("opcoesQuiz");
const resultadoQuiz = document.getElementById("resultadoQuiz");
const proximaPergunta = document.getElementById("proximaPergunta");

proximaPergunta.hidden = true;

function mostrarPergunta() {

    respondeu = false;

    const atual = perguntas[numeroPergunta];

    perguntaQuiz.textContent =
        atual.pergunta;

    opcoesQuiz.innerHTML = "";

    resultadoQuiz.textContent = "";

    atual.opcoes.forEach(function(opcao) {

        const botao = document.createElement("button");

        botao.textContent = opcao;

        botao.addEventListener("click", function() {

            if (respondeu) return;

            respondeu = true;

            if (opcao === atual.resposta) {

                pontos++;

                resultadoQuiz.textContent =
                    "Acertou, meu amor! ❤️";

            } else {

                resultadoQuiz.textContent =
                    "Quase, meu amor! Vamos para a próxima. 💗";

            }

            proximaPergunta.hidden = false;

        });

        opcoesQuiz.appendChild(botao);

    });

}

mostrarPergunta();

proximaPergunta.addEventListener("click", function() {

    numeroPergunta++;

    if (numeroPergunta < perguntas.length) {

        mostrarPergunta();

        proximaPergunta.hidden = true;

    } else {

        perguntaQuiz.textContent =
            "Você terminou nosso quiz! 🥰";

        opcoesQuiz.innerHTML = "";

        resultadoQuiz.textContent =
            "Você acertou " + pontos + " de " +
            perguntas.length + " perguntas! ❤️";

        proximaPergunta.hidden = true;

    }

});


// ===================================
// 3. CARTA PARA O FUTURO
// ===================================

const botaoCarta = document.getElementById("abrirCartaFutura");

botaoCarta.addEventListener("click", function() {

    const dataAbertura = new Date(2027, 10, 4);
    const hoje = new Date();

    hoje.setHours(0, 0, 0, 0);

    const carta = document.getElementById("cartaFutura");

    if (hoje < dataAbertura) {

        carta.textContent =
            "Ainda não chegou o dia de abrir! 🥹 " +
            "Volte em 04/11/2027 para descobrir sua cartinha.";

    } else {

        carta.textContent =
            "Meu amor, se você está lendo isso, " +
            "já passou mais um ano desde que preparei " +
            "essa surpresa. Espero que tenhamos vivido " +
            "muitos momentos lindos. Quero continuar " +
            "escrevendo nossa história ao seu lado. " +
            "Eu te amo, meu bocó! ❤️";

        botaoCarta.textContent = "Carta aberta ❤️";

    }

});


// ===================================
// 4. PRESENTE SURPRESA
// ===================================

const caixa = document.getElementById("caixaPresente");
const botaoPresente = document.getElementById("abrirPresente");
const conteudo = document.getElementById("conteudoPresente");

botaoPresente.addEventListener("click", function() {

    caixa.classList.add("aberta");

    conteudo.classList.add("visivel");

    botaoPresente.textContent = "Presente aberto! ❤️";

});


// ===================================
// 5. FINAL SECRETO
// ===================================

document.getElementById("revelarFinal").addEventListener("click", function() {

    const final = document.getElementById("mensagemFinal");

    final.classList.add("visivel");

    this.textContent = "Eu te amo, meu bocó! ❤️";

    // Corações caindo pela tela.
    for (let i = 0; i < 25; i++) {

        const coracao = document.createElement("span");

        coracao.textContent = "❤️";

        coracao.style.position = "fixed";
        coracao.style.left = Math.random() * 100 + "vw";
        coracao.style.top = "-30px";
        coracao.style.fontSize = "20px";
        coracao.style.pointerEvents = "none";
        coracao.style.zIndex = "9999";
        coracao.style.transition = "transform 3s linear, opacity 3s";

        document.body.appendChild(coracao);

        requestAnimationFrame(function() {
            coracao.style.transform =
                "translateY(110vh) rotate(360deg)";
            coracao.style.opacity = "0";
        });

        setTimeout(function() {
            coracao.remove();
        }, 3200);

    }

});



// ==========================================================
// CARTINHA FOFA: envelope e botão "Não" que foge
// ==========================================================
const envelope = document.getElementById("envelope");
const conteudoPergunta = document.getElementById("perguntaConteudo");
const area = document.getElementById("perguntaArea");
const btnSim = document.getElementById("btnSim");
const btnNao = document.getElementById("btnNao");
const respostaAmor = document.getElementById("respostaAmor");
const perguntaTexto = document.getElementById("perguntaTexto");
 
if (envelope && conteudoPergunta && area && btnSim && btnNao) {
 
    const frasesNao = [
        "Não",
        "Tem certeza? 🤨",
        "Tá fugindo, hein 😏",
        "Quase! Tenta de novo",
        "Errou o botão, bocó 😜",
        "Esse botão tá quebrado",
        "Clica no Sim! 💖"
    ];
 
    const mensagemFinal =
        "Eu sabia! 🥰 Eu também te amo muito, meu bocó. " +
        "Obrigada por deixar meus dias mais felizes. " +
        "Feliz aniversário de namoro! ❤️";
 
    let fugas = 0;
    let escala = 1;
    let respondeu = false;
 
    // ---------- abrir o envelope ----------
    envelope.addEventListener("click", () => {
        envelope.classList.add("abrindo");
        brilhos(envelope);
 
        setTimeout(() => {
            envelope.style.display = "none";
            conteudoPergunta.hidden = false;
        }, 400);
    });
 
    // ---------- botão "Não" fugindo ----------
    function posicaoSegura() {
        const a = area.getBoundingClientRect();
        const s = btnSim.getBoundingClientRect();
        const w = btnNao.offsetWidth;
        const h = btnNao.offsetHeight;
        const maxX = Math.max(0, a.width - w);
        const maxY = Math.max(0, a.height - h);
 
        let x = 0;
        let y = 0;
 
        for (let i = 0; i < 25; i++) {
            x = Math.random() * maxX;
            y = Math.random() * maxY;
 
            const absX = a.left + x;
            const absY = a.top + y;
 
            const sobrepoe =
                absX < s.right + 10 && absX + w > s.left - 10 &&
                absY < s.bottom + 10 && absY + h > s.top - 10;
 
            if (!sobrepoe) break;
        }
 
        return { x, y };
    }
 
    function fugir(evento) {
        if (respondeu) return;
        if (evento) evento.preventDefault();
 
        fugas++;
 
        btnNao.style.position = "absolute";
        const pos = posicaoSegura();
        btnNao.style.left = pos.x + "px";
        btnNao.style.top = pos.y + "px";
 
        btnNao.textContent = frasesNao[Math.min(fugas, frasesNao.length - 1)];
 
        // o Sim cresce a cada fuga (limite de 1.8x)
        escala = Math.min(1.8, escala + 0.1);
        btnSim.style.transform = "scale(" + escala + ")";
    }
 
    btnNao.addEventListener("mouseenter", fugir);
    btnNao.addEventListener("touchstart", fugir, { passive: false });
    btnNao.addEventListener("click", fugir);
    btnNao.addEventListener("focus", fugir);
 
    // ---------- efeitos ----------
    function chuvaDeCoracoes() {
        const emojis = ["❤️", "💖", "💕", "💗", "🧸", "🥰"];
 
        for (let i = 0; i < 40; i++) {
            const c = document.createElement("span");
            c.className = "coracao-voando";
            c.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            c.style.left = Math.random() * 100 + "vw";
            c.style.animationDelay = Math.random() * 1.2 + "s";
            c.style.fontSize = 18 + Math.random() * 24 + "px";
            document.body.appendChild(c);
 
            setTimeout(() => c.remove(), 4500);
        }
    }
 
    function brilhos(elemento) {
        const r = elemento.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
 
        for (let i = 0; i < 14; i++) {
            const b = document.createElement("span");
            const ang = (Math.PI * 2 * i) / 14;
            const dist = 60 + Math.random() * 50;
 
            b.className = "brilho";
            b.textContent = i % 2 ? "✨" : "💖";
            b.style.left = cx + "px";
            b.style.top = cy + "px";
            b.style.setProperty("--dx", Math.cos(ang) * dist + "px");
            b.style.setProperty("--dy", Math.sin(ang) * dist + "px");
            document.body.appendChild(b);
 
            setTimeout(() => b.remove(), 1100);
        }
    }
 
    // escreve a mensagem letra por letra
    function digitar(texto, destino, velocidade) {
        let i = 0;
        destino.textContent = "";
 
        const timer = setInterval(() => {
            destino.textContent += texto.charAt(i);
            i++;
            if (i >= texto.length) clearInterval(timer);
        }, velocidade);
    }
 
    // ---------- clicou em "Sim" ----------
    btnSim.addEventListener("click", () => {
        respondeu = true;
 
        btnNao.style.display = "none";
        btnSim.style.transform = "scale(1)";
        btnSim.disabled = true;
        btnSim.textContent = "Eu sabia! 💖";
 
        perguntaTexto.textContent = "Resposta certíssima! 💕";
 
        brilhos(btnSim);
        chuvaDeCoracoes();
        digitar(mensagemFinal, respostaAmor, 45);
    });
}