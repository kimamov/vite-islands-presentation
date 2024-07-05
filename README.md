# Skygate Inseln
![](https://png.pngtree.com/thumb_back/fh260/background/20230609/pngtree-it-is-an-island-on-the-ocean-with-an-island-on-image_2887971.jpg)


### tl;dr: The islands architecture encourages small, focused chunks of interactivity within server-rendered web pages. The output of islands is progressively enhanced HTML, with more specificity around how the enhancement occurs. Rather than a single application being in control of full-page rendering, there are multiple entry points. The script for these “islands” of interactivity can be delivered and hydrated independently, allowing the rest of the page to be just static HTML.

## Rendering Patters
[![IMAGE ALT TEXT](https://i3.ytimg.com/vi/Dkx5ydvtpCA/maxresdefault.jpg)](https://www.youtube.com/watch?v=Dkx5ydvtpCA&t=137s "Video Title")
https://www.youtube.com/watch?v=Dkx5ydvtpCA&t


- Static Website
- Multi Page Apps
- Single page App
- Server-Side Rendering with Hydration
- Static Site Generation with Hydration

![](https://res.cloudinary.com/practicaldev/image/fetch/s--2-p10SHi--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/ydl3k8yveg99avf1n06j.png)
### Für uns interessant
![](https://res.cloudinary.com/practicaldev/image/fetch/s--sxiQy22K--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/918jn6corwytcekfhqv6.gif)
- Incremental Static Regeneration
- Partial Hydration
- Islands

#### Nur teilweise nützlich
- Streaming SSR



## Incremental Static Regeneration
JS Runtime baut, sobald sich Daten ändern, die betroffenen statischen Seiten neu. Oftmals direkt aufn Server wo diese deployed werden oder in einem Gitlabtask.
Dadurch hat man die Vorteile von SSR und statischen Seiten gleichzeitig.

## Partial Hydration und Inseln
![](https://res.cloudinary.com/ddxwdqwkr/image/upload/f_auto/v1633284886/patterns.dev/theislandsarch--avuxy9rrkk8.png)
Seiten werden zunächst mit 0kb JS oder nur einem sehr kleinen JS Loader geladen und laden dann, wenn nötig JS Features nach, indem sie die statischen Inhalte mit kleinen Apps austauschen.
Interaktive Inseln sind eine Vereinfachung dieses Konzepts.

### fixed die Probleme von kompletter Rehydrierung
![](https://pbs.twimg.com/media/CiB1hhsWEAA0m1L?format=jpg&name=4096x4096)

## Nutzung
- Static Site Generators
- Content Driven Sites
- CMS
- Seiten mit dynamischen Content, die nicht 100% Serverside rendering brauchen

## Nicht gut geeignet
- Dashboards
- Soziale Medien
- Apps die wahrscheinlich eher nativ sein sollten. (Viel interaktive kommunikation und globaler State)


## Konzepte
Baut stark auf Http2 und Http3 sowie der heutzutage leichten Syntax zum lazy loaden von Modulen auf:
```js
    const ricardasFrachter=()=>import('DieFetteVonDenGruenen.js');
    // sobald wir das script brauchen:
    const ricarda=await ricardasFrachter();
```

### Minimaler Code um JS als Inseln zu laden
```ts
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
```

## Vorteile
- weniger initiales CSS / JS parsing

- Weniger Sorgen über das Scaling von Seiten. (Bleibt in der Regel statisch)

- Seiten können wieder Stück für Stück geladen (streamed) werden, 
sodass der nutzer schon frühzeitig teile der Seite sehen kann, bevor zB. der fancy JS Slider, Footer oder ähnliches außerhalb des Viewports sichtbar ist.

- Seiten können prinzipiel parallel geladen werden (sogar besser mit Http3). (prevent Network waterfall)
sollten initial mehrere Inseln sichtbar sein, laden diese parallel, wodurch sich die Last aufteilt aber effektivität von kompremierung leicht verringert.

- Verschiedenen Inseln / Komponenten sind unabhängig, wodurch ohne große Bedenken unterschiedlichen Teammitglieder verschiedene Libraries oder sogar Frameworks nutzen können.
Vorreiter war hier zB. Apple, die schon lange Preact also Insel für ihre Header und Footer nutzen aber an anderen stellen React und Vue.

- Durch diese Trennung wird man zu best practices gezwungen (verringern von globalen state und funktionalen prgrammieren)

- Mit isomorphischen rendern (JS Rendering aufn Server und Client) kann man den Workflow stark beschleunigen (1 Codebase für FE und BE mit freiwilligen enhancements auf der Clientseite)

### Von der Astro Seite
-Performance: Reduces the amount of JavaScript code shipped to the client. The code sent only consists of the script required for interactive components, which is much less than the script needed to recreate the virtual DOM for the entire page and rehydrate all the elements on the page. The smaller size of JavaScript automatically corresponds to faster page loads and Time to Interactive (TTI).
Comparisons for Astro with documentation websites created for Next.js and Nuxt.js have shown an 83% reduction in JavaScript code. Other users have also reported performance improvements with Astro.


-SEO: Since all of the static content is rendered on the server; pages are SEO friendly.
Prioritizes important content: Key content (especially for blogs, news articles, and product pages) is available almost immediately to the user. Secondary functionality for interactivity is usually required after consuming the key content becomes available gradually.
Accessibility: The use of standard static HTML links to access other pages helps to improve the accessibility of the website.
Component-based: The architecture offers all advantages of component-based architecture, such as reusability and maintainability.
Despite the advantages, the concept is still in a nascent stage. The limited support results in some disadvantages.


## Nachteile
- Momentan sehr stark an das JS Ökosystem gebunden. 
Hydrierug außerhalb von JS selber zu implementieren kann Tricky sen.

- Isomormisches Rendern ist außerhalb von JS möglich aber wahrscheinlich weniger performant

### Von der Astro Seite
-The architecture is not suitable for highly interactive pages like social media apps which would probably require thousands of islands.

-The only options available to developers to implement Islands are to use one of the few frameworks available or develop the architecture yourself. Migrating existing sites to Astro or Marko would require additional efforts.
Besides Jason’s initial post, there is little discussion available on the idea.
New frameworks claim to support the Islands architecture making it difficult to filter the ones which will work for you.
The architecture is not suitable for highly interactive pages like social media apps which would probably require thousands of islands.

## Beispiele
Astro (Vorreiter in so ziemlichen allen modernen Browser Features) https://astro.build/

Marko https://markojs.com/

Preact Habitat https://github.com/zouhir/preact-habitat

Islandjs (Standalone implementierung) https://islandjs.dev/en/

NanoJsx https://nanojsx.io/

is-land https://github.com/11ty/is-land

## Stats
https://lookerstudio.google.com/u/0/reporting/55bc8fad-44c2-4280-aa0b-5f3f0cd3d2be/page/M6ZPC?params=%7B%22df44%22:%22include%25EE%2580%25800%25EE%2580%2580IN%25EE%2580%2580WordPress%25EE%2580%2580Next.js%25EE%2580%2580TYPO3%2520CMS%25EE%2580%2580Nuxt.js%25EE%2580%2580Gatsby%25EE%2580%2580Astro%25EE%2580%2580SvelteKit%25EE%2580%2580Remix%22,%22df46%22:%22include%25EE%2580%25800%25EE%2580%2580IN%25EE%2580%2580mobile%22%7D


## Links
https://github.com/lxsmnsyc/awesome-islands?tab=readme-ov-file

https://www.patterns.dev/vanilla/islands-architecture/
https://dev.to/ryansolid/server-rendering-in-javascript-optimizing-performance-1jnk
https://markojs.com/
https://dev.to/this-is-learning/islands-server-components-resumability-oh-my-319d
https://github.com/mwood23/preact-island
https://github.com/barelyhuman/preact-island-plugins
https://iles-docs.netlify.app/
https://islandjs.dev/en/
https://dev.to/this-is-learning/islands-server-components-resumability-oh-my-319d
https://jasonformat.com/islands-architecture/
https://dev.to/this-is-learning/is-0kb-of-javascript-in-your-future-48og
https://is-land.11ty.dev/
https://deno.com/blog/intro-to-islands

https://docs.astro.build/en/concepts/why-astro/

https://dev.to/this-is-learning/islands-server-components-resumability-oh-my-319d




