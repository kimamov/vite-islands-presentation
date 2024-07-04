# Skygate Islands

### tl;dr: The islands architecture encourages small, focused chunks of interactivity within server-rendered web pages. The output of islands is progressively enhanced HTML, with more specificity around how the enhancement occurs. Rather than a single application being in control of full-page rendering, there are multiple entry points. The script for these “islands” of interactivity can be delivered and hydrated independently, allowing the rest of the page to be just static HTML.

### “tl;dr: Die Architektur der Inseln fördert kleine, fokussierte Interaktionsbereiche innerhalb serverseitig gerenderter Webseiten. Die Ausgabe der Inseln besteht aus schrittweise verbessertem HTML, wobei die Spezifität für die Verbesserung genauer festgelegt ist. Anstatt dass eine einzelne Anwendung die vollständige Seitenrendering-Kontrolle hat, gibt es mehrere Einstiegspunkte. Das Skript für diese Interaktions-“Inseln” kann unabhängig geliefert und hydratisiert werden, sodass der Rest der Seite nur statisches HTML ist.”

## Rendering Patters
https://www.youtube.com/watch?v=Dkx5ydvtpCA&t=137s

- Static Website
- Multi Page Apps
- Single page App
- Server-Side Rendering with Hydration
- Static Site Generation with Hydration
- Incremental Static Regeneration

- Partial Hydration
- Islands


- Streaming SSR


https://www.youtube.com/embed/Dkx5ydvtpCA?si=dcYhvWeKR1_57nOi&amp;clip=UgkxT1HFtd0QC2gerOFFK11p0pVRRWBsV9Ru&amp;clipt=EJuuCBjRmQk
<iframe width="560" height="315" src="https://www.youtube.com/embed/Dkx5ydvtpCA?si=dcYhvWeKR1_57nOi&amp;clip=UgkxT1HFtd0QC2gerOFFK11p0pVRRWBsV9Ru&amp;clipt=EJuuCBjRmQk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>


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
- Baut stark auf Http2 und Http3 sowie der heutzutage leichten Syntax zum lazy loaden von Modulen
```js
    const ricarda=await ()=>import('DieFetteVonDenGruenen.js')
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



## Nachteile
- Momentan sehr stark an das JS Ökosystem gebunden. 
Hydrierug außerhalb von JS selber zu implementieren kann Tricky sen.

- Isomormisches Rendern ist außerhalb von JS möglich aber wahrscheinlich weniger performant

## Schluss
- Mit Verständniss über beide Seiten des Renders, wäre beste Leistung möglich.


## Beispiele
Marko https://markojs.com/

Astro https://astro.build/

https://islandjs.dev/en/

Preact Habitat https://github.com/zouhir/preact-habitat

NanoJsx https://nanojsx.io/

is-land https://github.com/11ty/is-land


## Grafiken
GIF https://res.cloudinary.com/practicaldev/image/fetch/s--sxiQy22K--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/918jn6corwytcekfhqv6.gif

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

The architecture is not suitable for highly interactive pages like social media apps which would probably require thousands of islands.

Performance: Reduces the amount of JavaScript code shipped to the client. The code sent only consists of the script required for interactive components, which is much less than the script needed to recreate the virtual DOM for the entire page and rehydrate all the elements on the page. The smaller size of JavaScript automatically corresponds to faster page loads and Time to Interactive (TTI).
Comparisons for Astro with documentation websites created for Next.js and Nuxt.js have shown an 83% reduction in JavaScript code. Other users have also reported performance improvements with Astro.


Image Courtesy: https://divriots.com/blog/our-experience-with-astro/

SEO: Since all of the static content is rendered on the server; pages are SEO friendly.
Prioritizes important content: Key content (especially for blogs, news articles, and product pages) is available almost immediately to the user. Secondary functionality for interactivity is usually required after consuming the key content becomes available gradually.
Accessibility: The use of standard static HTML links to access other pages helps to improve the accessibility of the website.
Component-based: The architecture offers all advantages of component-based architecture, such as reusability and maintainability.
Despite the advantages, the concept is still in a nascent stage. The limited support results in some disadvantages.

The only options available to developers to implement Islands are to use one of the few frameworks available or develop the architecture yourself. Migrating existing sites to Astro or Marko would require additional efforts.
Besides Jason’s initial post, there is little discussion available on the idea.
New frameworks claim to support the Islands architecture making it difficult to filter the ones which will work for you.
The architecture is not suitable for highly interactive pages like social media apps which would probably require thousands of islands.



https://js-astro-islands-demo.netlify.app/