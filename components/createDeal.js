import React from 'react-native'
import TimerMixin from 'react-timer-mixin'
// var FS = require('react-native-fs');
var UIImagePickerManager = require('NativeModules').UIImagePickerManager;
let UIManager = require('NativeModules').UIManager;
import Combinator from './combinator'
import {toggleNewDeal} from '../intent/toggleNewDeal'
import ChoosePhoto from './choosePhoto'
let {
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
  CameraRoll,
  TouchableWithoutFeedback
} = React;
import Camera from 'react-native-camera';
export default class CreateDeal extends React.Component{
	state={cameraOn:false}
	static contextTypes={
		topNav:React.PropTypes.any,state$:React.PropTypes.any
		}
	static defaultProps={localDealId: Math.random()*Math.random()*1000000}
	// getDefaultProps() {
	// 	return {localDealId: Math.random()*Math.random()*1000000}
	// }
	takePicture() {
	    this.camera.capture()
	      .then((data) => {
	      	console.log('data is here ',data)
	      	this.setState({cameraOn:false,source:data})

	  		})
	      .catch(err => console.error(err));
	  }
	 addPhoto(){
	 	this.context.topNav.push({name:'Other',component:<ChoosePhoto localDealId={this.props.localDealId}/>,title:'',backButton:true})
	 }
	render(){
		// FS.readDir('/var/').then((result)=>{
		// 	console.log('result',result)
		// }).catch((err) => {
		//     console.log('error is here',err.message, err.code);
		//   });
		// fs.readFile('/var/mobile/Containers/Data/Application/E3F2A45A-4FE8-41CF-8898-4DD2940C6571/Documents/CB578814-28CC-46EA-AF0C-0B7A3F403398.jpg', 'utf8', (err,data)=>console.log(data));		
		
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
			
					<Combinator>
						{
							this.context.state$.map(state=>state.getIn(['unpublishedDeals',''+this.props.localDealId,'photos'])).distinctUntilChanged().
							map(photos=>{
								if(photos&&photos.size>0){
									let photosList=[]
									let imageURIs=photos.flip().toArray()
									let imageOrders=photos.toArray()
									for (let i=0; i<photos.size;i++){
										let obj={uri:imageURIs[i],order:imageOrders[i]}
										photosList.push(obj)
									}

									return <View><ScrollView 
										
										style={{backgroundColor:'gray'}}
										horizontal={true} 
										showsHorizontalScrollIndicator={false} pagingEnabled={true}>
										{photosList.map(photo=>{

											return <TouchableWithoutFeedback onPress={this.addPhoto.bind(this)}><Image style={{justifyContent:'flex-end',
												alignItems:'flex-start',width:320*k,height:280*h}} source={{uri:photo.uri}}>
													<View style={{borderRadius:4*k,height:35*k,width:35*k,backgroundColor:'rgba(0,132,180,0.8)',...center,margin:6*k}}>
													<Text style={{color:'white',fontSize:18,fontWeight:'500'}}>{photo.order}</Text></View>
												</Image>	

												</TouchableWithoutFeedback>

										})}


									</ScrollView>
										
									</View>
								}
								return <TouchableWithoutFeedback onPress={this.addPhoto.bind(this)}>
										<View style={{height:280*h,width:320*k,backgroundColor:'gray',...center}}>
											<Text style={{color:'white',fontSize:18,fontWeight:'600'}}>Добавить фото</Text>

										</View>
									</TouchableWithoutFeedback>
							})
						}

					</Combinator>

					


				<Text style={{alignSelf:'center',marginTop:10}} onPress={()=>this.setState({cameraOn:!this.state.cameraOn})}>TAKE PICTURE</Text>
				
				{this.state.cameraOn?cameraView:null}

				<Image source={{uri:this.state.source}} style={{height:230*h,width:320*k,marginTop:30}}/>


			</ScrollView>

			)
	

     		

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


