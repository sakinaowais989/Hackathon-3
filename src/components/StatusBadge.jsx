import React from 'react';
import './StatusBadge.css';

const StatusBadge = ({ status }) => {
  const getStatusClass = () => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return 'badge-pending';
      case 'approved':
      case 'resolved':
        return 'badge-success';
      case 'rejected':
        return 'badge-danger';
      case 'in-progress':
        return 'badge-warning';
      default:
        return 'badge-default';
    }
  };

  return (
    <span className={`status-badge ${getStatusClass()}`}>
      {status}
    </span>
  );
};

export default StatusBadge;