# 🎼 O Enigma da Melodia Codificada

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Concluído-success?style=for-the-badge)

> **Uma implementação elegante e interativa do algoritmo de Cifra de César com interface temática oriental inspirada em compositora kitsune** 🦊

---

## 📜 Descrição do Desafio

### O Enigma da Melodia Codificada 🎼🦊

Diante de você está uma compositora misteriosa criando uma obra-prima, porém sua música foi criptografada com magia ancestral! Para desvendar a melodia, será preciso decifrar a mensagem oculta.

**Sua missão** é criar uma função em JavaScript para descriptografar um texto codificado com a cifra de César. Cada letra do texto foi avançada "n" posições no alfabeto. A função deve retornar a versão original, revelando a verdadeira composição.

#### Regras

* Letras que ultrapassam 'Z' ou 'z' continuam a contagem a partir de 'A' ou 'a' (ciclo alfabético).
* Preserve maiúsculas e minúsculas.
* Caracteres não alfabéticos (espaços, números, pontuações) permanecem inalterados.
* **Entrada:** Uma string criptografada e um número inteiro 'n' (deslocamento).
* **Saída:** Uma string decodificada.

#### Exemplo:

```javascript
// Entrada
const mensagem = "Fdhvdu! Dprvrvr!";
const n = 3;

// Saída esperada: "Cadeira! Amoroso!"
```

---

## 🎯 Função Principal

```javascript
function descriptografarCesar(texto, deslocamento) {
    let resultado = '';
    const passos = [];
    
    // Normalizar deslocamento para evitar valores negativos
    deslocamento = ((deslocamento % 26) + 26) % 26;
    
    for (let i = 0; i < texto.length; i++) {
        const char = texto[i];
        let novoChar = char;
        
        if (/[a-zA-Z]/.test(char)) {
            const codigo = char.charCodeAt(0);
            const ehMaiuscula = char === char.toUpperCase();
            const base = ehMaiuscula ? 65 : 97; // 'A' = 65, 'a' = 97
            
            // Calcular nova posição (retroceder no alfabeto)
            const posicaoAtual = codigo - base;
            let novaPosicao = (posicaoAtual - deslocamento + 26) % 26;
            novoChar = String.fromCharCode(base + novaPosicao);
        }
        
        resultado += novoChar;
    }
    
    return { resultado, passos };
}
```

---

## 🔬 Lógica e Análise Técnica

### Algoritmo de Decodificação

A solução implementa a **Cifra de César reversa** (descriptografia) utilizando aritmética modular e manipulação de códigos ASCII.

#### 1. **Normalização do Deslocamento**
```javascript
deslocamento = ((deslocamento % 26) + 26) % 26;
```
- Aplica **módulo 26** para garantir que o deslocamento esteja no intervalo [0, 25]
- A adição de 26 garante que deslocamentos negativos sejam convertidos para positivos
- **Complexidade:** O(1)

#### 2. **Processamento Caractere por Caractere**
```javascript
for (let i = 0; i < texto.length; i++) {
    const char = texto[i];
    // ...
}
```
- Iteração linear sobre cada caractere da string
- **Complexidade:** O(n), onde n é o comprimento do texto

#### 3. **Identificação de Caracteres Alfabéticos**
```javascript
if (/[a-zA-Z]/.test(char)) {
    // Processar apenas letras
}
```
- Utiliza **RegEx** para validar caracteres alfabéticos
- Caracteres não-alfabéticos (espaços, números, pontuação) são preservados
- **Complexidade por teste:** O(1)

#### 4. **Determinação da Base ASCII**
```javascript
const codigo = char.charCodeAt(0);
const ehMaiuscula = char === char.toUpperCase();
const base = ehMaiuscula ? 65 : 97;
```
- `charCodeAt(0)` retorna o código ASCII do caractere
- Diferencia maiúsculas (base 65 = 'A') de minúsculas (base 97 = 'a')
- Garante preservação do case original

#### 5. **Cálculo da Nova Posição (Aritmética Modular)**
```javascript
const posicaoAtual = codigo - base;
let novaPosicao = (posicaoAtual - deslocamento + 26) % 26;
novoChar = String.fromCharCode(base + novaPosicao);
```

**Passo a passo matemático:**

1. **Conversão para índice alfabético:** `posicaoAtual = codigo - base`
   - Exemplo: 'F' (código 70) → 70 - 65 = 5

2. **Retrocesso com wrap-around:** `(posicaoAtual - deslocamento + 26) % 26`
   - Subtrai o deslocamento
   - Adiciona 26 para evitar negativos
   - Aplica módulo 26 para wrap-around circular
   - Exemplo: (5 - 3 + 26) % 26 = 28 % 26 = 2

3. **Conversão de volta para ASCII:** `base + novaPosicao`
   - Exemplo: 65 + 2 = 67 → 'C'

#### Análise de Complexidade

| Operação | Complexidade Temporal | Complexidade Espacial |
|----------|----------------------|----------------------|
| Normalização | O(1) | O(1) |
| Iteração principal | O(n) | O(n) |
| Teste RegEx | O(1) por char | O(1) |
| Cálculo aritmético | O(1) por char | O(1) |
| **Total** | **O(n)** | **O(n)** |

Onde **n** é o comprimento da string de entrada.

#### Casos de Borda Tratados

1. **Wrap-around alfabético:** 'A' - 1 → 'Z'
2. **Deslocamentos maiores que 26:** Normalização com módulo
3. **Deslocamentos negativos:** Conversão para positivo equivalente
4. **Preservação de case:** Maiúsculas permanecem maiúsculas
5. **Caracteres especiais:** Mantidos intactos na posição original

---

## 💼 Aplicações em Projetos Reais

### 1. **Sistemas de Criptografia Básica**
- Proteção de dados sensíveis em logs temporários
- Ofuscação de informações em bancos de dados de desenvolvimento
- Comunicação segura em ambientes educacionais

### 2. **Gamificação e Puzzles**
- Criação de desafios em jogos de RPG e aventura
- Sistemas de pistas criptografadas em escape rooms virtuais
- Quebra-cabeças educacionais para ensino de criptografia

### 3. **Ferramentas de Segurança**
- Componente de análise de cifras simples em ferramentas de pentest
- Módulos educacionais sobre história da criptografia
- Demonstrações de vulnerabilidades de cifras clássicas

### 4. **Processamento de Texto**
- Rotação de caracteres para geração de variações de texto
- Algoritmos de ofuscação em sistemas de proteção de código
- Transformações reversíveis para sistemas de encoding

### 5. **APIs de Criptografia Educacional**
- Endpoints RESTful para ensino de criptografia clássica
- Serviços de demonstração de algoritmos históricos
- Ferramentas interativas para cursos de segurança

---

## 🚀 Como Usar

### Instalação

```bash
# Clone o repositório
git clone https://github.com/luizfxdev/desafio_341.git

# Entre no diretório
cd desafio_341

# Abra o index.html no navegador
# Ou use um servidor local
npx serve
```

### Estrutura de Arquivos

```
projeto/
├── index.html          # Interface principal
├── styles.css          # Estilos e tema visual
├── script.js           # Lógica da Cifra de César
└── assets/
    ├── background.mp4  # Vídeo de fundo
    └── theme.mp3       # Música tema
```

### Uso Básico

```javascript
// Importar ou copiar a função descriptografarCesar()

const mensagemCriptografada = "Rovvy Gybvn!";
const deslocamento = 10;

const resultado = descriptografarCesar(mensagemCriptografada, deslocamento);
console.log(resultado.resultado); // "Hello World!"
```

---

## 🎨 Features

✅ Interface interativa com tema oriental  
✅ Validação detalhada passo a passo  
✅ Suporte a maiúsculas e minúsculas  
✅ Preservação de caracteres especiais  
✅ Animações suaves e responsivas  
✅ Controles de áudio e vídeo  
✅ Design totalmente responsivo  
✅ Scroll automático para resultados  

---

## 🛠️ Tecnologias

- **HTML5** - Estrutura semântica
- **CSS3** - Animações e glassmorphism
- **JavaScript Vanilla** - Lógica pura sem frameworks
- **RegEx** - Validação de caracteres
- **Aritmética Modular** - Cálculo de posições

---

## 📊 Exemplos de Teste

| Entrada | Deslocamento | Saída Esperada |
|---------|-------------|----------------|
| `"Fdhvdu! Dprvrvr!"` | 3 | `"Cadeira! Amoroso!"` |
| `"Rovvy Gybvn!"` | 10 | `"Hello World!"` |
| `"Wkh txlfn eurzq ira"` | 3 | `"The quick brown fox"` |
| `"Mjqqt Btwqi!"` | 5 | `"Hello World!"` |

---

## 📝 Licença

Este projeto está sob a licença MIT. Consulte o arquivo `LICENSE` para mais detalhes.

---

## 👨‍💻 Autor

**Luiz Felipe de Oliveira**

- GitHub: [@luizfxdev](https://github.com/luizfxdev)
- Linkedin: [in/luizfxdev](https://www.linkedin.com/in/luizfxdev)
- Portfólio: [luizfxdev.com.br](https://luizfxdev.com.br)

---

## 🌟 Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests.

---

<div align="center">

**Desenvolvido com 💜 e ☕ por Luiz FX**

⭐ Se este projeto foi útil, considere dar uma estrela!

</div>

***Aprenda uma lição por dia. Em um ano terá aprendido 365 lições.*** (Ditado japonês)
