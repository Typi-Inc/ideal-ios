import React from 'react-native'
import TimerMixin from 'react-timer-mixin'
// var FS = require('react-native-fs');
import {openAnimation,fast} from './animations'
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
  LayoutAnimation,
  CameraRoll,
  TouchableWithoutFeedback
} = React;
import ChosenPhotosLenta from './chosenPhotosLenta'
import CreateDealNewImage from './createDealNewImage'
import Combinator from './combinator'
import {toggleNewDeal} from '../intent/toggleNewDeal'
import Camera from 'react-native-camera';
export default class ChoosePhoto extends React.Component{
	
	state={cameraOn:false,images:[],loading:true}
	static contextTypes={
    	state$: React.PropTypes.any,topNav:React.PropTypes.any
  	}
	componentDidMount(){
		const fetchParams = {
	        first: 15,groupTypes:'All'

	    };
	    CameraRoll.getPhotos(fetchParams, this.storeImages.bind(this), this.logImageError.bind(this))
	    this.setTimeout(()=>{
	    	CameraRoll.getPhotos({first:400}, this.storeImages.bind(this), this.logImageError.bind(this))
	    	this.setState({loading:false})
	    	if(this.totalCount===6){
	    		this.cameraButton.setNativeProps({style:{left:320*k}})
	    	}
	    },500)
	}
	storeImages(data){
		const assets = data.edges;
    	const images = assets.map( asset => asset.node.image );
    	// LayoutAnimation.configureNext(openAnimation)
    	this.setState({
     	   images: images,
    	});
	}
	logImageError(err) {
	    console.log(err);
	}

	selectImage(image){
		// this[image.uri].setNativeProps({style:{backgroundColor:'rgba(0,132,180,0.8)'}})

		toggleNewDeal(

			{
				[this.props.localDealId]: {

					photos:{
					[image.uri]: this.totalCount+1
					}
				}


			}

		)
		if (this.totalCount===6){
			this.cameraButton.setNativeProps({style:{left:320*k}})
		}

	}
	deSelectImage(image){
		// LayoutAnimation.configureNext(fast)
		if(this.totalCount===6){
			this.cameraButton.setNativeProps({style:{left:240*k}})
		}
		toggleNewDeal([this.props.localDealId, 'photos', image.uri])


	}
	render(){
		
		// console.log('rerender')
		if(this.state.loading){
			return <View style={{flex:1,...center}}><Text>Подгружаем фотографии на телефоне...</Text></View>
		}
		return(
			<View style={{flex:1}}>

					<Combinator>
						{
							this.context.state$.map(state=>state.getIn(['unpublishedDeals',''+this.props.localDealId,'photos'])).distinctUntilChanged().
							map(photos=>{
								if(photos&&photos.size>0){
									// console.log('-0-0-0-0-',photos.toJS)
									let images=photos.flip().toArray()
									console.log('-0-0-0-0-',images)
									return <ChosenPhotosLenta photos={images} deSelectImage={this.deSelectImage.bind(this)}/>
								}
								LayoutAnimation.configureNext(openAnimation)
								return <View style={{height:0}}/>
							})
						}


					</Combinator>


				<ScrollView contentContainerStyle={{marginBottom:50*k}}>
					<View style={styles.imageGrid}>
          				  { this.state.images.map(image => 
          				  	

		          				  	<Combinator key={image.uri} >
		  				  				{	
		  				  					this.context.state$.map(state=>({
		  				  						order: state.getIn(['unpublishedDeals',''+this.props.localDealId,'photos',image.uri]),
		  				  						totalCount: state.getIn(['unpublishedDeals',''+this.props.localDealId,'photos']) ? state.getIn(['unpublishedDeals',''+this.props.localDealId,'photos']).size : 0
		  				  					})).
		      				  				  map(({order,totalCount})=>{
		      				  				  	this.totalCount=totalCount
		      				  				  	let limitReached=null
		      				  		
		      				  				  	if(totalCount===6){
		      				  				  		 limitReached=true
		      				  				  	}
		      				  				  	
		      				  				  	return  <CreateDealNewImage limitReached={limitReached} deSelectImage={this.deSelectImage.bind(this,image)} 
		      				  				  	order={order} image={image} selectImage={this.selectImage.bind(this,image)}/>
		      				  				  })
		  				  				}  	
		          				  	</Combinator>
          				  	) 

          				}
           			 </View>


				</ScrollView>
	

					<TouchableWithoutFeedback  >
					<View ref={el=>this.cameraButton=el} style={{backgroundColor:'#0679a2',
						height:60*k,width:60*k,borderRadius:28*k,...center,
						shadowColor:'#444444',top:390*h,left:240*k,
		       			shadowOffset:{width:2,height:2},
		        		shadowOpacity:1,
						position:'absolute',}}>

					<Image source={{uri:'camera',isStatic:true}} style={{height:25*k,width:25*k}}/>

					</View>
					</TouchableWithoutFeedback>
			</View>
			
				

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
   imageGrid: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        borderWidth:2,
        borderColor:'e4e4e4'
    },
    image: {
        width: 103*Dimensions.get('window').width/320,
        height: 103*Dimensions.get('window').width/320,
        margin: 1,
        justifyContent:'flex-start',
        alignItems:'flex-end',
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
Object.assign(ChoosePhoto.prototype, TimerMixin);


