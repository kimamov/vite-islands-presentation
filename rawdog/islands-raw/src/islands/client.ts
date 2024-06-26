import islands from './manifest'

class Island extends HTMLElement {
    async connectedCallback() {
        const src = this.getAttribute('src') ?? '';
        const componentLoader = islands[src];


        if (!componentLoader) {
            throw new Error(`Could not find component for ${src}`);
        }
        const props = JSON.parse(this.getAttribute('props') ?? '{}');
        const component = (await componentLoader()).default;
        this.appendChild(component(props));
    }
}

customElements.define('vite-island', Island);

