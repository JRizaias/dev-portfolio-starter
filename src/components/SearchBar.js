// src/components/SearchBar.js
// Accessible, reusable search bar component

/**
 * Creates a search bar element.
 * @param {Function} onInput - Callback for input event, receives the current value.
 * @param {Object} [options] - Optional settings (placeholder, initialValue, ariaLabel).
 * @returns {HTMLElement} The search bar wrapper div.
 */
export function createSearchBar(onInput, options = {}) {
  const {
    placeholder = 'Search...',
    initialValue = '',
    ariaLabel = 'Global search',
    id = 'global-search-input',
    className = 'global-search-bar'
  } = options;

  const wrapper = document.createElement('div');
  wrapper.className = 'search-bar-wrapper';

  const input = document.createElement('input');
  input.type = 'text';
  input.id = id;
  input.className = className;
  input.placeholder = placeholder;
  input.setAttribute('aria-label', ariaLabel);
  input.value = initialValue;
  input.autocomplete = 'off';
  input.spellcheck = false;
  input.tabIndex = 0;

  // Optional: clear button for accessibility
  const clearBtn = document.createElement('button');
  clearBtn.type = 'button';
  clearBtn.className = 'search-clear-btn';
  clearBtn.setAttribute('aria-label', 'Clear search');
  clearBtn.innerHTML = '&times;';
  clearBtn.style.display = initialValue ? '' : 'none';

  clearBtn.onclick = () => {
    input.value = '';
    clearBtn.style.display = 'none';
    input.focus();
    if (typeof onInput === 'function') onInput('');
  };

  input.addEventListener('input', (e) => {
    clearBtn.style.display = e.target.value ? '' : 'none';
    if (typeof onInput === 'function') onInput(e.target.value);
  });

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      input.value = '';
      clearBtn.style.display = 'none';
      if (typeof onInput === 'function') onInput('');
    }
  });

  wrapper.appendChild(input);
  wrapper.appendChild(clearBtn);

  return wrapper;
}
