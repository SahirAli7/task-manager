document.addEventListener('DOMContentLoaded', () => {
  const taskForm = document.getElementById('taskForm');
  const taskInput = document.getElementById('taskInput');
  const taskList = document.getElementById('taskList');
  const emptyState = document.getElementById('emptyState');

  taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = taskInput.value.trim();
    if (!text) return;
    addTask(text);
    taskInput.value = '';
    taskInput.focus();
    updateEmptyState();
  });

  function addTask(text) {
    const li = document.createElement('li');

    const span = document.createElement('span');
    span.className = 'task-text';
    span.textContent = text;

    const completeBtn = document.createElement('button');
    completeBtn.className = 'complete-btn';
    completeBtn.textContent = 'Complete';
    completeBtn.setAttribute('aria-label', `Mark "${text}" as complete`);
    completeBtn.addEventListener('click', () => {
      const isCompleted = li.classList.toggle('completed');
      completeBtn.textContent = isCompleted ? 'Undo' : 'Complete';
      completeBtn.setAttribute(
        'aria-label',
        isCompleted ? `Mark "${text}" as not complete` : `Mark "${text}" as complete`
      );
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = 'Delete';
    deleteBtn.setAttribute('aria-label', `Delete "${text}"`);
    deleteBtn.addEventListener('click', () => {
      li.remove();
      updateEmptyState();
    });

    li.appendChild(span);
    li.appendChild(completeBtn);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  }

  function updateEmptyState() {
    emptyState.classList.toggle('visible', taskList.children.length === 0);
  }

  updateEmptyState();
});