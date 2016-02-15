import React from 'react-native'
import TimerMixin from 'react-timer-mixin'
// var FS = require('react-native-fs');
var UIImagePickerManager = require('NativeModules').UIImagePickerManager;
let UIManager = require('NativeModules').UIManager;
let {
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback
} = React;
import Camera from 'react-native-camera';
export default class CreateDeal extends React.Component{
	state={cameraOn:false}
	takePicture() {
	    this.camera.capture()
	      .then((data) => {
	      	console.log('data is here ',data)
	      	this.setState({cameraOn:false,source:data})

	  		})
	      .catch(err => console.error(err));
	  }
	render(){
		// FS.readDir('/var/').then((result)=>{
		// 	console.log('result',result)
		// }).catch((err) => {
		//     console.log('error is here',err.message, err.code);
		//   });
		// fs.readFile('/var/mobile/Containers/Data/Application/E3F2A45A-4FE8-41CF-8898-4DD2940C6571/Documents/CB578814-28CC-46EA-AF0C-0B7A3F403398.jpg', 'utf8', (err,data)=>console.log(data));		
		this.options = {
		  title: '', // specify null or empty string to remove the title
		  cancelButtonTitle: 'Отмена',
		  takePhotoButtonTitle: 'Снять на камеру', // specify null or empty string to remove this button
		  chooseFromLibraryButtonTitle: 'Выбрать из имеющихся', // specify null or empty string to remove this button
		  cameraType: 'back', // 'front' or 'back'
		  mediaType: 'photo', // 'photo' or 'video'
		  returnBase64Image: true,
		  videoQuality: 'high', // 'low', 'medium', or 'high'
		  maxWidth: 400*k, // photos only
		  maxHeight: 400*h, // photos only
		  aspectX: 2, // aspectX:aspectY, the cropping image's ratio of width to height
		  aspectY: 1, // aspectX:aspectY, the cropping image's ratio of width to height
		  quality: 1, // photos only
		  angle: 0, // photos only
		  allowsEditing: false, // Built in functionality to resize/reposition the image
		  noData: true, // photos only - disables the base64 `data` field from being generated (greatly improves performance on large photos)
		  storageOptions: { // if this key is provided, the image will get saved in the documents/pictures directory (rather than a temporary directory)
		    skipBackup: true, // image will NOT be backed up to icloud
		    // path: 'images' // will save image at /Documents/images rather than the root
		  }
		};
		let cameraView=(
			 <View style={styles.container}>
				 <Camera
		          ref={(cam) => {
		            this.camera = cam;
		          }}
		          style={styles.preview}
		          // orientation={'landscapeLeft'}
		          captureTarget={Camera.constants.CaptureTarget.temp}
		          aspect={Camera.constants.Aspect.Fill}>
		          	<Text style={styles.capture} onPress={this.takePicture.bind(this)}>[CAPTURE]</Text>
		        </Camera>
		       </View>)
		return(
			<ScrollView >
			
				<View>
					<TouchableWithoutFeedback onPress={this.showCameraOptions.bind(this)} >
						<View style={{height:230*h,width:320*k,backgroundColor:'gray',...center}}>
							<Text style={{color:'white',fontSize:18,fontWeight:'600'}}>Добавить фото</Text>

						</View>
					</TouchableWithoutFeedback>


				</View>
				<Text style={{alignSelf:'center',marginTop:10}} onPress={()=>this.setState({cameraOn:!this.state.cameraOn})}>TAKE PICTURE</Text>
				
				{this.state.cameraOn?cameraView:null}

				<Image source={{uri:this.state.source}} style={{height:230*h,width:320*k,marginTop:30}}/>


			</ScrollView>

			)
	

     		

	}

	showCameraOptions(){
			UIImagePickerManager.showImagePicker(this.options, (response) => {
			  console.log('Response = ', response);

			  if (response.didCancel) {
			    console.log('User cancelled image picker');
			  }
			  else if (response.error) {
			    console.log('UIImagePickerManager Error: ', response.error);
			  }
			  else if (response.customButton) {
			    console.log('User tapped custom button: ', response.customButton);
			  }
			  else {
			    // const source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};

			    const source ={ uri: response.uri.replace('file://', ''), isStatic: true}
			    // uri (on android)
			    // const source = {uri: response.uri, isStatic: true};

			    this.setState({
			      avatarSource: source
			    });
			  }
			});
	}
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:40,	
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40
  }
});
Object.assign(CreateDeal.prototype, TimerMixin);


