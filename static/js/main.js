
// SWAPPING SELECT FACE
// Initialize Bootstrap Popover
const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl))

// Element Variables
const swapSelectFace_continueButton = document.getElementById("swap-select-face_continue-button");
const imageInputUpload = document.getElementById("image-input-upload");
const imageInputPreviewText = document.getElementById("image-input-preview-text");
const imageInputPlaceholder = document.getElementById("image-input-placeholder");

// Modal Variables
const modalDownloadButton = document.getElementById("modal-download-button");
const modalSnapButton = document.getElementById("modal-snap-button");
const modalVideoElement = document.getElementById("modal-video-element");
const modalCanvasElement = document.getElementById("modal-canvas-element");


function _continue() {
	if (imageInputUpload.files.length === 0) {
		popover(swapSelectFace_continueButton, 'Upload an image first!');
		return;
	}

	// TODO: Redirect to 'swapping-confirmation' page
	alert("Redirect to: 'swapping-confirmation' page \n with img value passed to database: " + getImage());
}


function getImage() {
	if (!validateImage()) {
		return
	}

	// * Image File Value
	const imageValue = imageInputUpload.files[0];
	const imageValueName = imageInputUpload.files[0].name;
	setTimeout(function () {
		imageInputPreviewText.innerText = `Uploaded image: ${imageValueName}`;
		imageInputPreviewText.style.display = "block";
		imageInputPlaceholder.style.display = "none";
	}, 1000);
	return imageValue;
}


function validateImage() {
	imageInputPreviewText.style.display = "none";
	imageInputPlaceholder.style.display = "inline-block";
	if (!imageInputUpload.files.length > 0) {
		imageInputPreviewText.innerText = "No file selected";
		imageInputPlaceholder.style.display = "none";
		return false
	}
	return true
}


function startMediaDevice() {
	navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
		modalVideoElement.srcObject = stream;
		modalVideoElement.addEventListener('loadedmetadata', () => {
			modalCanvasElement.width = modalVideoElement.videoWidth;
			modalCanvasElement.height = modalVideoElement.videoHeight;
		});
	}).catch((error) => {
		console.log(error);
	})
}


function snapImage() {
	const context = modalCanvasElement.getContext('2d');
	context.drawImage(modalVideoElement, 0, 0, modalCanvasElement.width, modalCanvasElement.height);
	const imageData = modalCanvasElement.toDataURL('image/png');
	modalDownloadButton.href = imageData;
	popover(modalSnapButton, "Snapped Image!");
}


function downloadImage(event) {
	if (!modalDownloadButton.href.startsWith("data:image/png;base64,")) {
		popover(modalDownloadButton, "Take a snap first!");
		event.preventDefault();
		return
	}
	popover(modalDownloadButton, "Image Captured!");
}


function popover(button_element, popover_text_value) {
	const popover = new bootstrap.Popover(button_element, {
		content: popover_text_value,
		placement: 'top',
		trigger: 'manual'
	});
	popover.show();
	setTimeout(function () {
		popover.hide();
	}, 3000);
}


imageInputUpload.addEventListener('change', getImage);

