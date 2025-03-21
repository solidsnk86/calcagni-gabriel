import { ReactNode } from 'react';
import { createRoot } from 'react-dom/client';

export const closeDialogWithAnimation = () => {
  const dialog = document.createElement('dialog');
  const root = createRoot(dialog);
  const controller = new AbortController();
  dialog.style.animation = 'slideOutEffect 300ms ease-in-out';

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
};

export const showDialog = ({ content }: { content: ReactNode }) => {
  const dialog = document.createElement('dialog');
  const root = createRoot(dialog);
  const controller = new AbortController();
  document.body.appendChild(dialog);
  root.render(content);
  dialog.showModal();

  document.addEventListener(
    'click',
    (event: MouseEvent) => {
      const firstChildDialog = document.querySelector('dialog')?.children[0];
      if (dialog.open && !firstChildDialog?.contains(event.target as Node)) {
        closeDialogWithAnimation();
      }
    },
    { once: true, signal: controller.signal }
  );
};
