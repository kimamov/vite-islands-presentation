import islands from './manifest'



function visible(element: HTMLElement, offsetPx: number = 0) {
    return new Promise(function (resolve) {
        const io = new IntersectionObserver(entries => {
            for (const entry of entries) {
                if (entry.isIntersecting) {
                    io.disconnect()
                    resolve(true)
                }
            }
        }, {
            rootMargin: `${offsetPx}px`
        })
        io.observe(element)
    })
}



class Island extends HTMLElement {
    async connectedCallback() {
        const src = this.getAttribute('src') ?? '';
        const componentLoader = islands[src];


        if (!componentLoader) {
            throw new Error(`Could not find component for ${src}`);
        }
        // falls die Komponente client:visible hat, warte bis sie 200px vom viewport entfernt ist und lade sie dann.

        if (this.hasAttribute('client:visible')) {
            await visible(this, 200)
        }

        // hydriere die nun aufn client gerenderte Komponente mit den initialen Daten, vom Server.
        const props = JSON.parse(this.getAttribute('props') ?? '{}');
        const component = (await componentLoader()).default;
        this.appendChild(component(props));
    }
}

customElements.define('vite-island', Island);

