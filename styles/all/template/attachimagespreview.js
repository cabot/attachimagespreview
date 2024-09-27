function createPreviewImage(url) {
	const prevImage = $('<img>', {
		src: url,
		class: 'attach-img-preview'
	});
	return prevImage;
}

function attachImagePreview() {
	const $fileList = $('#file-list');
	const imageExtensions = phpbb.plupload.config.filters.mime_types.find(filter => filter.title === 'Images').extensions.split(',');
	const imageExtensionsSet = new Set(imageExtensions.map(ext => ext.trim().toLowerCase()));

	$fileList.find('.attach-row').each(function () {
		const $attachRow = $(this);
		const $attachLink = $('.file-name a', $attachRow);
		const $existingPreview = $('.attach-img-preview', $attachRow);

		if (!$existingPreview.length) {
			const attachName = $attachLink.text();
			const attachUrl = $attachLink.attr('href');
			const attachExt = attachName.substring(attachName.lastIndexOf('.') + 1).toLowerCase();

			if (imageExtensionsSet.has(attachExt)) {
				if (typeof lightbox !== 'undefined') {
					$attachLink.attr('data-lightbox', attachUrl).addClass('attach-img-lightbox-preview');
				} else {
					$attachLink.attr('target', '_blank');
				}

				const lineBreak = $('<br>');
				$attachLink.append(lineBreak);

				const prevImage = createPreviewImage(attachUrl);
				$attachLink.append(prevImage);
			}
		}
	});
}
