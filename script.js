
    const toastTypes = [
      {
        type: 'success',
        title: 'Success!',
        message: 'Your action was completed successfully.',
        icon: '✓'
      },
      {
        type: 'error',
        title: 'Error!',
        message: 'Something went wrong. Please try again.',
        icon: '✕'
      },
      {
        type: 'warning',
        title: 'Warning!',
        message: 'Please review your input and try again.',
        icon: '⚠'
      },
      {
        type: 'info',
        title: 'Info',
        message: 'Here is some important information for you.',
        icon: 'ℹ'
      }
    ];

    const toastStyles = {
      success: {
        background: 'linear-gradient(135deg, #10b981, #059669)',
        border: '#10b981',
        icon: '✓'
      },
      error: {
        background: 'linear-gradient(135deg, #ef4444, #dc2626)',
        border: '#ef4444',
        icon: '✕'
      },
      warning: {
        background: 'linear-gradient(135deg, #f59e0b, #d97706)',
        border: '#f59e0b',
        icon: '⚠'
      },
      info: {
        background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
        border: '#3b82f6',
        icon: 'ℹ'
      }
    };

    const container = document.getElementById('toast-container');
    const controls = document.getElementById('toast-controls');

    toastTypes.forEach(({ type, icon }) => {
      const btn = document.createElement('button');
      btn.innerHTML = `<span class="trigger-icon">${icon}</span>Show ${type}`;
      btn.className = `toast-trigger toast-trigger-${type}`;
      btn.addEventListener('click', () => showToast(type));
      controls.appendChild(btn);
    });

    function showToast(type) {
      const toastData = toastTypes.find(t => t.type === type);
      const styles = toastStyles[type];
      const toastId = Date.now();

      const toast = document.createElement('div');
      toast.className = `toast toast-${type}`;
      toast.style.background = styles.background;
      toast.style.borderLeft = `4px solid ${styles.border}`;
      toast.innerHTML = `
        <div class="toast-icon">
          <span>${styles.icon}</span>
          <div class="icon-pulse"></div>
        </div>
        <div class="toast-content">
          <h4 class="toast-title">${toastData.title}</h4>
          <p class="toast-message">${toastData.message}</p>
        </div>
        <button class="toast-close">×</button>
        <div class="toast-progress"><div class="progress-bar"></div></div>
        <div class="toast-glow"></div>
      `;

      const closeBtn = toast.querySelector('.toast-close');
      closeBtn.addEventListener('click', () => removeToast(toast));

      container.appendChild(toast);

      setTimeout(() => removeToast(toast), 5000);
    }

    function removeToast(toast) {
      toast.classList.add('removing');
      toast.addEventListener('animationend', () => toast.remove());
    }