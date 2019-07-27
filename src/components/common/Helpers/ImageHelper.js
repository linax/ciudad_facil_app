'use strict';

import ImagePicker from 'react-native-image-picker';

function selectImage(customOptions, callback) {
	const options = {
	      		quality: 0.7,
	      		maxWidth: (customOptions.width) ? customOptions.width : 500,
	      		maxHeight: (customOptions.height) ? customOptions.height : 500,
	      		takePhotoButtonTitle: "Tomar foto...",
	      		chooseFromLibraryButtonTitle: "Elegir desde librería...",
	      		cancelButtonTitle: "Cancelar",
	     		title: "Seleccionar una foto",
	     		storageOptions: {
	        		skipBackup: true
	      		},
	    	};

	ImagePicker.showImagePicker(options, (response) => {
	    		console.log(response)

	      		if (response.didCancel) {
	        		console.log('User cancelled photo picker');
	      		}
	      		else if (response.error) {
	        		console.log('ImagePicker Error: ', response.error);
	      		}
	      		else if (response.customButton) {
	        		console.log('User tapped custom button: ', response.customButton);
	      		}
	      		else {
	      			var image = 'data:image/jpeg;base64,' + response.data
	      			callback(image)
	      		}
	    	});
}

module.exports = {
  selectImage
}