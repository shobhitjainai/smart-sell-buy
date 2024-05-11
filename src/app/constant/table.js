export const initialPaginationState = {
    currentPage: 1,
    pageSize: 10
}

export function formatDate(dateString) {
    const options = { day: '2-digit', month: 'long', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

export function formatTime(dateString) {
    const options = { hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleTimeString('en-US', options);
}

export const sortMenuItems = [
    {
        label: 'Newest-on-top',
        value: 'newest-on-top'
    },
    {
        label: 'Oldest-on-top',
        value: 'oldest-on-top'
    },
    {
        label: 'Price:high-to-low',
        value: 'high-to-low'
    },
    {
        label: 'Price:low-to-high',
        value: 'low-to-high'
    },
]