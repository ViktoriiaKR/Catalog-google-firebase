export const minCalendardate = () => {
    let today = new Date();
    let todayTS = new Date(today.setDate(today.getDate() + 1)).toISOString().split('T')[0];
    return todayTS
};