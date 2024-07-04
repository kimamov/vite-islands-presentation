import { createApp } from 'vue'
//@ts-ignore
import VueCalendar from './Calendar.vue'

export default function createCalendar() {
    const styles = `
        * {
            //outline: 1px solid red;
        }
    `
    const wrapper = document.createDocumentFragment();

    const styleElement = document.createElement('style')
    styleElement.innerHTML = styles;
    wrapper.appendChild(styleElement);

    const calendar = document.createElement('div')

    createApp(VueCalendar).mount(calendar)

    wrapper.appendChild(calendar);

    return wrapper;
}