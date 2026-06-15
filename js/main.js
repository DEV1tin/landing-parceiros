/* c:\Users\vhlim\Dexos Home Solutions\04. Sites e LPs\landing-parceiros\js\main.js */

let expVal = null;

// Function to handle custom radio group selection styles
function pickRadio(el, group) {
  document.querySelectorAll('#rg-' + group + ' .ropt').forEach(o => o.classList.remove('sel'));
  el.classList.add('sel');
  const radioInput = el.querySelector('input');
  if (radioInput) {
    radioInput.checked = true;
    expVal = radioInput.value;
  }
}

// Function to handle mock form submission
function doSubmit() {
  const nome   = document.getElementById('f-nome').value.trim();
  const tel    = document.getElementById('f-tel').value.trim();
  const email  = document.getElementById('f-email').value.trim();
  const cidade = document.getElementById('f-cidade').value.trim();
  const btn    = document.getElementById('submit-btn');

  if (!nome || !tel || !email || !cidade || !expVal) {
    btn.textContent = '⚠ Preencha todos os campos para continuar';
    btn.style.background = '#c0392b';
    setTimeout(() => {
      btn.textContent = 'Garantir minha vaga na lista de espera →';
      btn.style.background = '';
    }, 2200);
    return;
  }

  btn.disabled = true;
  btn.textContent = 'Enviando...';

  // Simulating network delay
  setTimeout(() => {
    document.getElementById('form-content').style.display = 'none';
    const sv = document.getElementById('success-view');
    sv.style.display = 'block';
    sv.style.animation = 'fadeUp 0.5s ease both';
  }, 800);
}

document.addEventListener('DOMContentLoaded', () => {
  console.log('Dexos Partner Landing Page Loaded successfully.');

  // Smooth scroll behavior for internal nav links
  const links = document.querySelectorAll('a[href^="#"]');
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Scroll Reveal Observer
  const revealCallback = (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  };
  
  const observer = new IntersectionObserver(revealCallback, {
    threshold: 0.1
  });
  
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // Phone input mask formatter (format: (XX) XXXXX-XXXX)
  const phoneInput = document.getElementById('f-tel');
  if (phoneInput) {
    phoneInput.addEventListener('input', function(e) {
      let v = e.target.value.replace(/\D/g, '').slice(0, 11);
      if (v.length > 6) {
        v = '(' + v.slice(0, 2) + ') ' + v.slice(2, 7) + '-' + v.slice(7);
      } else if (v.length > 2) {
        v = '(' + v.slice(0, 2) + ') ' + v.slice(2);
      } else if (v.length > 0) {
        v = '(' + v;
      }
      e.target.value = v;
    });
  }

  // Texto dinâmico que alterna no Hero
  const dynamicTextEl = document.getElementById('dynamic-text');
  if (dynamicTextEl) {
    const words = ["drywall", "pintura", "manutenção residencial"];
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
