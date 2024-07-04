const manifest: Record<string, () => any> = {
    VueConcertCalendar: () => import('./VueConcertCalendar.ts'),
    //@ts-ignore
    ReactImageSlider: () => import('./ReactImageSlider.jsx'),
    // ReactShirtConfig: () => import('./tshirt/index.jsx')
}

export default manifest;