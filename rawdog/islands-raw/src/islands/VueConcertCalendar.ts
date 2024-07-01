export default function createCalendar() {
    const styles = `
        * {
            outline: 2px solid red;
        }
    `
    const wrapper = document.createDocumentFragment();

    const styleElement = document.createElement('style')
    styleElement.innerHTML = styles;
    wrapper.appendChild(styleElement);

    const calendar = document.createElement('div')
    calendar.innerHTML = "client side rendered calendar"
    wrapper.appendChild(calendar);

    return wrapper;
}