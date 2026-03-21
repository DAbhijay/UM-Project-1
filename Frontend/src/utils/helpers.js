// ——————————————— Date & Time ———————————————

export const formatDate = (dateString) => {
    const option = {
        year: 'numeric',
        month: 'long',
        date: 'numeric'
    };

    return new Date(dateString).toLocaleDateString('en-US', option);
};

export const formatTime = (timeString) => {
    if (!timeString) return '';
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`
};

export const getServiceIcon = (serviceType) => {
    const icons = {
        electrician: '🗲',
        plumber: '⚙︎',
        carpenter: '✎',
        tailor: '✂',
        maintenance: '🛠'
    };
    return icons[serviceType] || '🏠︎';
};

export const getStatusColor = (status) => {
    const colors = {
        PENDING: 'badge-pending',
        ACCEPTED: 'badge-accepted',
        IN_PROGRESS: 'badge-in-progress',
        COMPLETED: 'badge-completed',
        CANCELLED: 'badge-cancelled',
    };
    return colors[status] || 'badge-pending';
};

export const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};

export const validatePassword = (password) => {
    return password.length >= 8;  
};