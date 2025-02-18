export const showDialog = ({ content }: { content: string }) => {
  const dialog = document.createElement('dialog');
  dialog.innerHTML = content;
  document.body.appendChild(dialog);
  dialog.showModal();

  document.onclick = (event) => {
    event.stopPropagation();
    if (dialog && dialog.contains(event.target as Node)) {
      dialog.close();
    }
  };
};
