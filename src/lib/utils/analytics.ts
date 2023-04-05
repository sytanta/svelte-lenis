export const GTM_ID = process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID || 'G-XXZ273XT00';
export const GA_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS || '';

export const pageview = (url: string) => {
	if (!window.dataLayer) window.dataLayer = [];

	window.dataLayer.push({
		event: 'pageview',
		page: url
	});
};
