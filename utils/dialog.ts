import { ReactNode } from 'react';
import { createRoot } from 'react-dom/client';

export const showDialog = ({ content }: { content: ReactNode }) => {
  const dialog = document.createElement('dialog');
  document.body.appendChild(dialog);
  const root = createRoot(dialog);
  root.render(content);

  dialog.showModal();

  const controller = new AbortController();

  const closeDialogWithAnimation = () => {
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
