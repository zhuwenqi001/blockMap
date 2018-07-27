export function _fetch(fetchPromise, timeout) {
	let abort_fn = null;
	const abortPromise = new Promise((resolve, reject) => {
		abort_fn = () => {
			reject('请求超时！')
		}
	})

	const abortablePromise = Promise.race([fetchPromise, abortPromise])

	setTimeout(function() {
		abort_fn()
	}, timeout)

	return abortablePromise;
}