// ==========================================
// Hassan Zaheer - Portfolio Clean JS
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Toggle
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
      });
    });
  }

  // 2. Project Category Filtering
  const filterTabs = document.querySelectorAll('.filter-tab');
  const projectBoxes = document.querySelectorAll('.project-box');

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filterVal = tab.getAttribute('data-filter');

      projectBoxes.forEach(box => {
        const categories = box.getAttribute('data-category') || '';
        if (filterVal === 'all' || categories.includes(filterVal)) {
          box.style.display = 'flex';
        } else {
          box.style.display = 'none';
        }
      });
    });
  });
});

// 3. Copy to Clipboard Utility
function copyToClipboard(text, triggerEl) {
  navigator.clipboard.writeText(text).then(() => {
    showToast(`Copied: ${text}`);
    if (triggerEl) {
      const originalHTML = triggerEl.innerHTML;
      triggerEl.innerHTML = `<i class="fa-solid fa-check" style="color: #10b981;"></i>`;
      setTimeout(() => {
        triggerEl.innerHTML = originalHTML;
      }, 1800);
    }
  }).catch(() => {
    showToast('Failed to copy. Please copy manually.');
  });
}

function showToast(message) {
  const toast = document.getElementById('toastNotification');
  if (!toast) return;
  toast.innerText = message;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 2400);
}

// 4. Contact Form Handlers
function getFormData() {
  const name = document.getElementById('formName')?.value.trim() || 'Colleague';
  const subject = document.getElementById('formSubject')?.value.trim() || 'General Inquiry';
  const message = document.getElementById('formMessage')?.value.trim() || 'Hello Hassan, I would like to get in touch with you.';
  return { name, subject, message };
}

function sendFormToWhatsApp() {
  const { name, subject, message } = getFormData();
  const text = `Hi Hassan,\nMy name is *${name}*.\nSubject: *${subject}*\n\nMessage:\n${message}`;
  const url = `https://wa.me/923437124758?text=${encodeURIComponent(text)}`;
  window.open(url, '_blank');
}

function handleFormSubmit(event) {
  event.preventDefault();
  const { name, subject, message } = getFormData();
  const mailSubject = encodeURIComponent(`${subject} — From ${name}`);
  const mailBody = encodeURIComponent(`Hi Hassan,\n\nName: ${name}\nSubject: ${subject}\n\nMessage:\n${message}\n\nBest regards,\n${name}`);
  window.location.href = `mailto:hassanzahee5@gmail.com?subject=${mailSubject}&body=${mailBody}`;
  showToast('Opening your email client...');
}
