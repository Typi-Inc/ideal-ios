import React from 'react-native'
import TimerMixin from 'react-timer-mixin'
// var FS = require('react-native-fs');
import {openAnimation,fast} from './animations'
import shallowEqual from './shallowEqual'
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
export default class ChosenPhotosLenta extends React.Component{
	
	state={}
	// static contextTypes={
 //    	state$: React.PropTypes.any,topNav:React.PropTypes.any
 //  	}
 //  	componentWillReceiveProps(props){
 //  		// console.log(props.limitReached)
 //  		this.setState({opacity:props.limitReached?0.5:1})
 //  	}
	// shouldComponentUpdate(nextProps, nextState) {
	//     return !shallowEqual(this.props.order, nextProps.order) ||
	//          !shallowEqual(this.state, nextState);
	//   }
	// componentWillMount(){
	// 	this.context.state$.subscribe
	// }
  componentDidMount(){
    LayoutAnimation.configureNext(fast)

  }
  componentWillUpdate(nextProps,nextState){
    console.log('update')
    LayoutAnimation.configureNext(fast)
    if(this.props.photos && this.props.photos.length>2&&nextProps.photos.length>this.props.photos.length){
      let n=this.props.photos.length-2
      this.scroll.scrollTo(0,n*103*k)

    }


    
  }

	render(){
		// console.log('i am rendering',this.props.order)
				return <View style={{height:160,flex:0.5}}>
         {this.props.photos?<Text style={{fontSize:15,margin:6*k}}>Выбрано ({this.props.photos.length} из 6)</Text>:false} 
            <ScrollView ref={el=>this.scroll=el} showsHorizontalScrollIndicator={false} style={{height:0}} contentContainerStyle={{height:0}} horizontal={true}>
                 <View style={{flexWrap:'wrap',flexDirection:'row'}}>
                  {this.props.photos?
                    this.props.photos.map(photo=>{
                      // let image=photo.toJS()
                      // let uri=Object.keys(image)[0]
                      // LayoutAnimation.configureNext(fast)
                      return <TouchableWithoutFeedback onPress={()=>this.props.deSelectImage({uri:photo})}>
                      <Image style={styles.image} source={{uri:photo}}>
                          <View style={{width:25*k,height:25*k,margin:5*k,
                         borderRadius:3*k,borderWidth:1,borderColor:'0083b3',
                       backgroundColor:'rgba(0,132,180,0.8)',...center}}><Image source={{uri:'crossWhite',isStatic:true}} style={{height:12*k,width:12*k}}/></View>
                      </Image>
                      </TouchableWithoutFeedback>

                    }):false
                   

                  }
                  </View>
                  </ScrollView>
                  <Text style={{fontSize:15,margin:6*k}}>Все фото</Text>
        </View>
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
Object.assign(ChosenPhotosLenta.prototype, TimerMixin);


