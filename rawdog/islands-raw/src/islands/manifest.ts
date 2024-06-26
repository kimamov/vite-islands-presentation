const manifest: Record<string, () => any> = {
    VueConcertCalendar: () => import('./VueConcertCalendar.ts'),
}

export default manifest;