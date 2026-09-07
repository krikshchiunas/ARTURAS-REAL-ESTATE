/**
 * Форма запроса. Валидация своя, а не браузерная (в разметке стоит novalidate),
 * чтобы формулировки совпадали с языком остального сайта.
 */
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function setError(field, message) {
  const err = field.querySelector('.field__error');
  field.dataset.invalid = message ? 'true' : 'false';
  if (!err) return;
  err.textContent = message || '';
  err.hidden = !message;
  const input = field.querySelector('input, textarea');
  if (input) input.setAttribute('aria-invalid', message ? 'true' : 'false');
}

function validate(form) {
  let firstBad = null;

  form.querySelectorAll('.field').forEach((field) => {
    const input = field.querySelector('input');
    if (!input) return;
    const value = input.value.trim();
    let message = '';

    if (input.required && !value) {
      message = 'Заполните это поле.';
    } else if (value && input.type === 'email' && !EMAIL.test(value)) {
      message = 'Проверьте адрес электронной почты.';
    }

    setError(field, message);
    if (message && !firstBad) firstBad = input;
  });

  return firstBad;
}

export function initForm() {
  const form = document.getElementById('enquiry-form');
  if (!form) return;
  const status = document.getElementById('form-status');

  // Ошибка снимается, как только посетитель начал править поле.
  form.addEventListener('input', (e) => {
    const field = e.target.closest('.field');
    if (field?.dataset.invalid === 'true') setError(field, '');
  });

  form.addEventListener('submit', (e) => {
    const bad = validate(form);
    if (bad) {
      e.preventDefault();
      status.textContent = '';
      bad.focus({ preventScroll: false });
      return;
    }

    // Endpoint не задан — уводим заполненную заявку в мессенджер, а не в
    // тупик. Раньше здесь честно писали «ничего не отправлено», но человек,
    // который уже заполнил форму, уходил ни с чем.
    if (form.dataset.handoff) {
      e.preventDefault();
      handoff(form, status);
    }
  });
}

/** Собирает заполненные поля в текст и открывает мессенджер с ним. */
function handoff(form, status) {
  let cfg;
  try { cfg = JSON.parse(form.dataset.handoff); } catch { cfg = null; }
  if (!cfg || !cfg.channel) return;

  const data = new FormData(form);
  const lines = [cfg.subject];

  form.querySelectorAll('.field').forEach((field) => {
    const input = field.querySelector('input, textarea, select');
    if (!input) return;
    const value = String(data.get(input.name) || '').trim();
    // Пустые необязательные поля и незаполненный селект в сообщение не идут.
    if (!value || value === 'Не выбран') return;
    const label = field.querySelector('.field__label');
    // У метки висит пометка «(необязательно)» на языке страницы — в сообщении
    // она лишняя. Снимаем любую скобочную пометку, а не только русскую.
    const name = label
      ? label.textContent.replace(/\s*\([^)]*\)\s*/g, ' ').trim()
      : input.name;
    lines.push(`${name}: ${value}`);
  });

  const url = `${cfg.channel}?text=${encodeURIComponent(lines.join('\n'))}`;
  const win = window.open(url, '_blank', 'noopener');
  status.textContent = win ? cfg.done : cfg.blocked;
}
