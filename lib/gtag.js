export const GA_TRACKING_ID = 'G-M2GTM67Z2G'

export const pageview = url => {
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  })
}
