const formatDate = (dateString) => {
  if (!dateString) return "No due date";

  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

const formatPriority = (priority) => {
  if (!priority) return "No priority";
  return priority.charAt(0).toUpperCase() + priority.slice(1);
};

const formatTaskStatus = (status) => {
  if (!status) return "Unknown status";
  return status.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};

export { formatDate, formatPriority, formatTaskStatus };