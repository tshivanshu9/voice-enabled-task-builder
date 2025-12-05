import { useState } from 'react';

function TaskForm({ defaultValues = {}, onSubmit }) {
  const [form, setForm] = useState({
    title: defaultValues.title || '',
    description: defaultValues.description || '',
    dueDate: defaultValues.dueDate || '',
    priority: defaultValues.priority || 'medium',
    status: defaultValues.status || 'todo',
  });

  function update(key, value) {
    setForm(prev => ({ ...prev, [key]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(form);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white p-5 rounded border shadow"
    >
      <div>
        <label className="font-medium">Title</label>
        <input
          value={form.title}
          onChange={e => update('title', e.target.value)}
          className="w-full mt-1 p-2 border rounded"
          required
        />
      </div>

      <div>
        <label className="font-medium">Description</label>
        <textarea
          value={form.description}
          onChange={e => update('description', e.target.value)}
          className="w-full mt-1 p-2 border rounded"
          rows="3"
        />
      </div>

      <div>
        <label className="font-medium">Due Date</label>
        <input
          type="date"
          value={form.dueDate}
          onChange={e => update('dueDate', e.target.value)}
          className="w-full mt-1 p-2 border rounded"
        />
      </div>

      <div className="flex gap-3">
        <div className="flex-1">
          <label className="font-medium">Priority</label>
          <select
            name="priority"
            id="priority"
            value={form.priority}
            onChange={e => update('priority', e.target.value)}
            className="w-full mt-1 p-2 border rounded"
          >
            <option>low</option>
            <option>medium</option>
            <option>high</option>
          </select>
        </div>

        <div className="flex-1">
          <label className="font-medium">Status</label>
          <select
            value={form.status}
            onChange={e => update('status', e.target.value)}
            className="w-full mt-1 p-2 border rounded"
          >
            <option>todo</option>
            <option>in-progress</option>
            <option>done</option>
          </select>
        </div>
      </div>

      <button
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        type="submit"
      >
        Save Task
      </button>
    </form>
  );
}

export default TaskForm;
