import { ReactNode } from 'react';
import { createRoot } from 'react-dom/client';

export const showDialog = ({ content }: { content: ReactNode }) => {
  const dialog = document.createElement('dialog');
  document.body.appendChild(dialog);
  const root = createRoot(dialog);
  root.render(content);

  const controller = new AbortController();
  function closeWithEffect() {
    dialog.style.animation = 'dialogEffect 0.6s ease-in-out';
    dialog.addEventListener(
      'animationend',
      () => {
        dialog.close();
        dialog.remove();
        root.unmount();
        controller.abort();
      },
      { once: true, signal: controller.signal }
    );
  }

  document.onclick = (event: MouseEvent) => {
    const firstChildrenDialog = document.querySelector('dialog')?.children[0];
    if (dialog.open && !firstChildrenDialog?.contains(event.target as Node)) {
      closeWithEffect();
    }
  };
};
