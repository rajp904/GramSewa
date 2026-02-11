import React from 'react';

const StatusBadge = ({ status }) => {
  const getStatusClass = () => {
    switch (status) {
      case 'Pending':
        return 'status-pending';
      case 'Approved':
        return 'status-approved';
      case 'In Progress':
        return 'status-in-progress';
      case 'Solved':
        return 'status-solved';
      case 'Rejected':
        return 'status-rejected';
      default:
        return '';
    }
  };

  return (
    <span className={`status-badge ${getStatusClass()}`}>
      {status}
    </span>
  );
};

export default StatusBadge;
