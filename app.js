/**
 * INSTA 2.0 — Interactive Logic & Agent Workspace Simulation
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Interactive Agent Card Switcher
  const agentCards = document.querySelectorAll('.agent-card');
  const projectTitle = document.querySelector('.workspace-project-title span');

  const agentWorkspaceData = {
    scout: {
      campaign: 'INSTA Studio — Campaign: "Deep Trend Surfacing"',
      command: '/crawl-trends --niche "B2B SaaS" --min-views 500k --velocity "+250%"',
      chipText: 'Scout: 4 trends identified'
    },
    scribe: {
      campaign: 'INSTA Studio — Campaign: "Viral Hook & Pacing Matrix"',
      command: '/write-script --structure "3s Hook -> Contrarian Shift -> Proof"',
      chipText: 'Scribe: 3 scripts drafted'
    },
    reelfx: {
      campaign: 'INSTA Studio — Campaign: "4K Motion & Kinetic Cut"',
      command: '/render-reel --resolution "4K" --captions "Hormozi Neon" --music "Phonk Beat"',
      chipText: 'ReelFX: 60fps render ready'
    },
    pulse: {
      campaign: 'INSTA Studio — Campaign: "Dynamic Peak Deployment & DMs"',
      command: '/schedule-dispatch --optimal-slot "6:42 PM" --enable-dm-triggers true',
      chipText: 'Pulse: 7/7 queued'
    }
  };

  agentCards.forEach(card => {
    card.addEventListener('click', () => {
      agentCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');

      const agentKey = card.getAttribute('data-agent');
      if (agentWorkspaceData[agentKey]) {
        const data = agentWorkspaceData[agentKey];
        if (projectTitle) {
          projectTitle.textContent = data.campaign;
        }
        const commandInput = document.querySelector('.command-input');
        if (commandInput) {
          commandInput.value = data.command;
        }
      }
    });
  });

  // 2. Hero Prompt Composer & Quick Chips
  const composerInput = document.getElementById('heroComposerInput');
  const promptBtn = document.getElementById('heroPromptBtn');
  const promptChips = document.querySelectorAll('.prompt-chip');

  promptChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const promptText = chip.getAttribute('data-prompt');
      if (composerInput && promptText) {
        composerInput.value = promptText;
        composerInput.focus();
        composerInput.parentElement.style.borderColor = 'var(--blue-primary)';
      }
    });
  });

  if (promptBtn && composerInput) {
    promptBtn.addEventListener('click', () => {
      const originalText = promptBtn.innerHTML;
      promptBtn.innerHTML = `<span>Deploying Cluster...</span>`;
      promptBtn.disabled = true;

      setTimeout(() => {
        promptBtn.innerHTML = `<span>Agents Deployed ✓</span>`;
        promptBtn.style.background = '#10b981';

        setTimeout(() => {
          promptBtn.innerHTML = originalText;
          promptBtn.style.background = '';
          promptBtn.disabled = false;
          // Smooth scroll to workspace preview
          const workspace = document.getElementById('workspace');
          if (workspace) {
            workspace.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }, 1200);
      }, 900);
    });
  }

  // 3. Billing Toggle (Monthly / Annual)
  const monthlyBtn = document.getElementById('monthlyBtn');
  const annualBtn = document.getElementById('annualBtn');
  const priceElements = document.querySelectorAll('.plan-price');

  function updatePrices(isAnnual) {
    priceElements.forEach(priceEl => {
      const monthlyVal = priceEl.getAttribute('data-monthly');
      const annualVal = priceEl.getAttribute('data-annual');
      priceEl.textContent = isAnnual ? annualVal : monthlyVal;
    });

    if (isAnnual) {
      annualBtn.classList.add('active');
      monthlyBtn.classList.remove('active');
    } else {
      monthlyBtn.classList.add('active');
      annualBtn.classList.remove('active');
    }
  }

  if (monthlyBtn && annualBtn) {
    monthlyBtn.addEventListener('click', () => updatePrices(false));
    annualBtn.addEventListener('click', () => updatePrices(true));
  }

  // 4. Accordion FAQ
  const accordionTriggers = document.querySelectorAll('.accordion-trigger');

  accordionTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const parentItem = trigger.closest('.accordion-item');
      const isOpen = parentItem.classList.contains('open');

      // Close all items
      document.querySelectorAll('.accordion-item').forEach(item => {
        item.classList.remove('open');
        const btn = item.querySelector('.accordion-trigger');
        if (btn) btn.setAttribute('aria-expanded', 'false');
      });

      // Toggle current
      if (!isOpen) {
        parentItem.classList.add('open');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // 5. Copy CLI command snippet
  const copyCliBtn = document.getElementById('copyCliBtn');
  if (copyCliBtn) {
    copyCliBtn.addEventListener('click', () => {
      const snippet = 'npm install -g @insta/agent-cli';
      navigator.clipboard.writeText(snippet).then(() => {
        const textSpan = copyCliBtn.querySelector('span');
        const originalText = textSpan.textContent;
        textSpan.textContent = 'Copied!';
        setTimeout(() => {
          textSpan.textContent = originalText;
        }, 2000);
      }).catch(err => {
        console.error('Failed to copy', err);
      });
    });
  }

  // 6. Mobile Nav Toggle
  const mobileNavToggle = document.getElementById('mobileNavToggle');
  const navLinks = document.querySelector('.nav-links');

  if (mobileNavToggle && navLinks) {
    mobileNavToggle.addEventListener('click', () => {
      const isVisible = navLinks.style.display === 'flex';
      navLinks.style.display = isVisible ? 'none' : 'flex';
      if (!isVisible) {
        navLinks.style.position = 'absolute';
        navLinks.style.top = '68px';
        navLinks.style.left = '0';
        navLinks.style.right = '0';
        navLinks.style.background = '#ffffff';
        navLinks.style.flexDirection = 'column';
        navLinks.style.padding = '1.5rem';
        navLinks.style.boxShadow = '0 10px 25px rgba(0,0,0,0.1)';
        navLinks.style.borderBottom = '1px solid #e2e8f0';
      }
    });
  }

  // 7. Command Input Interaction in Workspace
  const commandInput = document.querySelector('.command-input');
  const cmdChips = document.querySelectorAll('.cmd-chip');
  if (commandInput && cmdChips) {
    cmdChips.forEach(chip => {
      chip.addEventListener('click', () => {
        commandInput.value = chip.textContent.trim() + ' --execute';
        commandInput.focus();
      });
    });
  }
});

