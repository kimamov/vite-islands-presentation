# Skygate Islands

### tl;dr: The islands architecture encourages small, focused chunks of interactivity within server-rendered web pages. The output of islands is progressively enhanced HTML, with more specificity around how the enhancement occurs. Rather than a single application being in control of full-page rendering, there are multiple entry points. The script for these “islands” of interactivity can be delivered and hydrated independently, allowing the rest of the page to be just static HTML.

### “tl;dr: Die Architektur der Inseln fördert kleine, fokussierte Interaktionsbereiche innerhalb serverseitig gerenderter Webseiten. Die Ausgabe der Inseln besteht aus schrittweise verbessertem HTML, wobei die Spezifität für die Verbesserung genauer festgelegt ist. Anstatt dass eine einzelne Anwendung die vollständige Seitenrendering-Kontrolle hat, gibt es mehrere Einstiegspunkte. Das Skript für diese Interaktions-“Inseln” kann unabhängig geliefert und hydratisiert werden, sodass der Rest der Seite nur statisches HTML ist.”


## Nutzung
- Static Site Generators
- CMS
- Seiten mit dynamischen Content, die nicht 100% Serverside rendering brauchen

## Vorteile
- Seiten können wieder Stück für Stück geladen (streamed) werden, 
sodass der nutzer schon frühzeitig teile der Seite sehen kann, bevor zB. der fancy JS Slider, Footer oder ähnliches außerhalb des Viewports sichtbar ist.

- Seiten können prinzipiel parallel geladen werden (sogar besser mit Http3).
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


## Grafiken
GIF https://res.cloudinary.com/practicaldev/image/fetch/s--sxiQy22K--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/918jn6corwytcekfhqv6.gif

## Links
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