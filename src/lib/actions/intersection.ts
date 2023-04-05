export function intersection(node: HTMLElement, options?: IntersectionObserverInit) {
	let observer = observe(node, options || {});

	return {
		update(options: IntersectionObserverInit) {
			unobserve(observer);
			observer = observe(node, options);
		},

		destroy() {
			unobserve(observer);
		}
	};
}

function observe(node: HTMLElement, options?: IntersectionObserverInit) {
	// let intersectionObserverEntry: IntersectionObserverEntry | null = null;

	const handler = (entries: IntersectionObserverEntry[]) => {
		// intersectionObserverEntry = entries[0];

		if (entries[0]?.isIntersecting) {
			node.dispatchEvent(new Event('intersecting'));
		}
	};

	const observer = new IntersectionObserver(handler, options);
	observer.observe(node);

	return observer;
}

function unobserve(observer: IntersectionObserver | null) {
	observer && observer.disconnect();
}
