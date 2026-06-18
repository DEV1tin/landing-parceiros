/* app.js - Dexos Landing Page Lógica (V2) */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Controle da Barra de Navegação no Scroll
  const nav = document.querySelector('nav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      nav.classList.add('nav-scrolled');
    } else {
      nav.classList.remove('nav-scrolled');
    }
  });

  // 2. Animação de Surgimento de Elementos (Reveal)
  const reveals = document.querySelectorAll('.reveal');
  const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    reveals.forEach(el => {
      const elementTop = el.getBoundingClientRect().top;
      const elementVisible = 120; // margem de pixels para ativar
      if (elementTop < windowHeight - elementVisible) {
        el.classList.add('active');
      }
    });
  };
  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll(); // executar uma vez ao carregar para detectar elementos no topo

  // 3. Seleção Personalizada de Botões de Rádio (Formulário)
  const radioLabels = document.querySelectorAll('.radio-label');
  radioLabels.forEach(label => {
    label.addEventListener('click', function(e) {
      // Remover seleção anterior
      radioLabels.forEach(rl => rl.classList.remove('selected'));
      // Adicionar seleção atual
      this.classList.add('selected');
      // Marcar o input correspondente
      const radio = this.querySelector('input[type="radio"]');
      if (radio) radio.checked = true;
    });
  });

  // Configuração dos eventos de Checkbox personalizados
  document.querySelectorAll('.checkbox-label input[type="checkbox"]').forEach(input => {
    input.addEventListener('change', function() {
      const parent = this.closest('.checkbox-label');
      if (this.checked) {
        parent.classList.add('selected');
      } else {
        parent.classList.remove('selected');
      }
    });
  });

  // 3.1 Texto dinâmico que alterna no Hero
  const dynamicTextEl = document.getElementById('dynamic-text');
  if (dynamicTextEl) {
    const isSpanish = document.documentElement.lang === 'es';
    const words = isSpanish 
      ? ["drywall", "pintura", "mantenimiento"]
      : ["drywall", "pintura", "manutenção residencial"];
    let wordIndex = 0;
    
    dynamicTextEl.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
    dynamicTextEl.style.display = 'inline-block';
    
    setInterval(() => {
      dynamicTextEl.style.opacity = 0;
      dynamicTextEl.style.transform = 'translateY(8px)';
      
      setTimeout(() => {
        wordIndex = (wordIndex + 1) % words.length;
        dynamicTextEl.textContent = words[wordIndex];
        dynamicTextEl.style.transform = 'translateY(-8px)';
        dynamicTextEl.offsetHeight; // Forçar repaint
        
        dynamicTextEl.style.opacity = 1;
        dynamicTextEl.style.transform = 'translateY(0)';
      }, 350);
    }, 2800);
  }
});

// 4. Submissão do Formulário com Estado de Sucesso via Google Apps Script
function handleFormSubmit(event) {
  event.preventDefault();

  const nome = document.getElementById('nome').value.trim();
  const tel = document.getElementById('tel').value.trim();
  const email = document.getElementById('email').value.trim();
  const cidade = document.getElementById('cidade').value.trim();
  const expRadio = document.querySelector('input[name="exp"]:checked');
  const areasChecked = Array.from(document.querySelectorAll('input[name="areas"]:checked')).map(el => el.value);

  // Validação simples
  if (!nome || !tel || !email || !cidade || !expRadio || areasChecked.length === 0) {
    alert('Por favor, preencha todos os campos obrigatórios (*).');
    return;
  }

  const expVal = expRadio.value;

  // Desabilitar botão e mostrar loading real
  const btn = document.getElementById('submit-btn');
  const originalText = btn.innerHTML;
  btn.disabled = true;
  btn.innerHTML = 'Enviando seus dados...';

  // INSIRA A SUA URL DO WEB APP DO GOOGLE APPS SCRIPT AQUI
  const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyZ2ZqBFJRK8Lq5KIHHXkM44vNWs1UhpzyUd0td-iFZ5qlEdhqqwb99YX6nmazBGUYM/exec';

  if (GOOGLE_SCRIPT_URL === 'SUA_URL_DO_GOOGLE_APPS_SCRIPT_AQUI') {
    console.warn('Google Script URL não configurada. Simulando envio de dados...');
    setTimeout(() => {
      // Esconder conteúdo do formulário
      document.getElementById('form-body').style.display = 'none';
      // Mostrar visual de sucesso
      document.getElementById('success-state').style.display = 'block';
    }, 1200);
    return;
  }

  fetch(GOOGLE_SCRIPT_URL, {
    method: 'POST',
    mode: 'no-cors', // Evita problemas de CORS no redirecionamento do Google Apps Script
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      nome: nome,
      telefone: tel,
      email: email,
      cidade: cidade,
      experiencia: expVal,
      areas: areasChecked.join(', ')
    })
  })
  .then(() => {
    // Esconder conteúdo do formulário
    document.getElementById('form-body').style.display = 'none';
    // Mostrar visual de sucesso
    document.getElementById('success-state').style.display = 'block';
  })
  .catch(err => {
    console.error('Erro ao enviar dados para a planilha:', err);
    btn.disabled = false;
    btn.innerHTML = originalText;
    alert('Ocorreu um erro ao enviar sua inscrição. Por favor, tente novamente.');
  });
}
