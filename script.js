fetch('checklist.json')
  .then(res => res.json())
  .then(data => buildChecklist(data));

function buildChecklist(categories) {
  const container = document.getElementById('checklist');

  Object.keys(categories).forEach((category, catIndex) => {
    const section = document.createElement('div');
    section.className = 'mb-4';

    section.innerHTML = `<h4 class="fw-bold text-primary mb-3">${category}</h4>`;

    const row = document.createElement('div');
    row.className = "row";

    categories[category].forEach((item, index) => {
      const col = document.createElement('div');
      col.className = "col-md-6";  // 2 per row

      col.innerHTML = `
        <div class="check-item">
          <div class="form-check mb-2 d-flex align-items-center">
            <input class="form-check-input" type="checkbox" id="chk_${catIndex}_${index}" />
            <label class="form-check-label fw-semibold ms-2" for="chk_${catIndex}_${index}">${item}</label>
          </div>
          <textarea id="cmt_${catIndex}_${index}" class="form-control" placeholder="Comments..." rows="2"></textarea>
        </div>
      `;
      row.appendChild(col);
    });

    section.appendChild(row);
    container.appendChild(section);
  });
}

document.getElementById('copyBtn').addEventListener('click', () => {
  let summary = 'Villa Checklist Summary\n\n';

  const sections = document.querySelectorAll('#checklist > div');

  sections.forEach((section, catIdx) => {
    const categoryTitle = section.querySelector('h4').innerText;
    summary += `=== ${categoryTitle} ===\n`;

    const items = section.querySelectorAll('.check-item');

    items.forEach((item, idx) => {
      const isChecked = document.getElementById(`chk_${catIdx}_${idx}`).checked;
      const comment = document.getElementById(`cmt_${catIdx}_${idx}`).value.trim();

      summary += `${isChecked ? '✔️' : '❌'} ${item.querySelector('label').innerText}\n`;
      if (comment) summary += `   ➤ Comment: ${comment}\n`;
    });

    summary += '\n';
  });

  navigator.clipboard.writeText(summary).then(() => {
    alert('Checklist copied! Paste into WhatsApp.');
  });
});
