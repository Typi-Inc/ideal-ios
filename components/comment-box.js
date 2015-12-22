import React from 'react-native'
import TimerMixin from 'react-timer-mixin'
import {openAnimation,spring1,spring2,scrollToTopAnimation,closeImageAnimation} from './animations'
let {
  LayoutAnimation,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity
} = React;
export default class CommentBox extends React.Component{
	state={}
	show(){
    let height;
    if(k===1){
      height=203
    }else if (k>1){
      height=230
    }
    LayoutAnimation.configureNext(LayoutAnimation.create(200,LayoutAnimation.Types.keyboard,LayoutAnimation.Properties.scaleXY));
        this.refs['slide-up'].setNativeProps({

          style:{height:210}

        })

  }
  hide(){

    LayoutAnimation.configureNext(LayoutAnimation.create(200,LayoutAnimation.Types.keyboard,LayoutAnimation.Properties.opacity));
      this.refs['slide-up'].setNativeProps({
          style:{height:0*h}
        })

  }
  blurText(){
    this.refs['text-input'].blur()
  }


	render(){
    let bottom;
    if(k===1){
      bottom=this.props.pushedFromLenta ? 0:70
    }else if (k>1){
      bottom=this.props.pushedFromLenta ? 0:100
    }

		return (


          <View style={{backgroundColor:'transparent'}}>
              <View ref='main-view' 
              style={{backgroundColor:'transparent',height:55*k,borderWidth:1,flexDirection:'row',...center,
                borderColor:'#e4e4e4',width:320*k,marginBottom:this.props.pushedFromLenta ? bottom:bottom}}>
                  <TextInput
                    ref='text-input'
                    style={{height:40*k,borderRadius:3*k,backgroundColor:'white',fontSize:13*k, borderColor: '#d3d3d3', borderWidth: 1,marginTop:6*k,width:250*k,paddingLeft:10*k}}
                    onChangeText={(text) => this.setState({text})}
                    value={this.state.text}
                    clearButtonMode={'while-editing'}
                    placeholder={'Написать комментарий'}
                  />
                  <TouchableOpacity>
                    <View style={{backgroundColor:'0084b4',borderRadius:3*k,height:39*k,width:45*k,marginLeft:8*k,marginBottom:2*k,...center}}>
                      <Image source={{uri:'arrow-right',isStatic:true}} style={{height:20,width:30}}/>
                    </View>

                  </TouchableOpacity>
              </View> 
              <View ref='slide-up' style={{height:0,opacity:0}}/>
            </View>



      )
	}
}
Object.assign(CommentBox.prototype, TimerMixin);

