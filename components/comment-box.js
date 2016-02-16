import React from 'react-native'
import TimerMixin from 'react-timer-mixin'
import {openAnimation,spring1,spring2,scrollToTopAnimation,closeImageAnimation,veryFast} from './animations'
let {
  LayoutAnimation,
  Text,
  View,
  TextInput,
  Image,
  Animated,
  TouchableOpacity
} = React;
export default class CommentBox extends React.Component{
	state={height:0}
	show(){
    Animated.spring(this.anim,{toValue:1,velocity:9,tension:48,friction:10}).start()
  }
  hide(){
    Animated.spring(this.anim,{toValue:0,velocity:-15,tension:58,friction:10}).start()
  }
  blurText(){
    this.refs['text-input'].blur()
  }
	render(){
    let bottom=this.props.justDeal?-2:h>0.99?k>1?81*h:92:89
    let height=h>.99?k>1?185*h:210:210
    this.anim=this.anim || new Animated.Value(0)
		return (
          <View style={{backgroundColor:'#e8e8ee'}}>
              <View ref='main-view' 
              style={{height:Math.max(55*k, (12*k+this.state.height)),borderWidth:1,flexDirection:'row',justifyContent:'center',alignItems:'flex-end',
                borderColor:'#e4e4e4',width:320*k,marginBottom:bottom}}>
                  <TextInput
                    ref='text-input'
                    style={{height: Math.max(40*k, this.state.height),
                      borderRadius:3*k,backgroundColor:'white',fontSize:16, 
                      borderColor: '#d3d3d3', borderWidth: 1,...center,
                      marginTop:this.state.height<41*k?6*k:4*k,paddingTop:this.state.height<41*k?4*k:1*k,paddingBottom:4,
                      width:250*k,paddingLeft:10*k}}
                    value={this.state.text}
                    onChange={(event) => {
                      event.nativeEvent.text.length===0?this.submit.setNativeProps({style:{backgroundColor:'gray'}}):this.submit.setNativeProps({style:{backgroundColor:'#0084b4'}})
                      LayoutAnimation.configureNext(veryFast)
                        this.setState({
                          text: event.nativeEvent.text,
                          height: Math.min(event.nativeEvent.contentSize.height,160*k)
                        });
                      }}
                    clearButtonMode={'while-editing'}
                    multiline={true}
                    placeholder={'Написать комментарий'}
                  />
                  <TouchableOpacity>
                    <View ref={el=>this.submit=el} 
                    style={{backgroundColor:'gray',
                    borderRadius:3*k,height:36*k,width:45*k,marginLeft:8*k,marginBottom:9*k,...center}}>
                      <Image source={{uri:'arrow-right',isStatic:true}} style={{height:15*k,width:23*k}}/>
                    </View>

                  </TouchableOpacity>
              </View> 
              <Animated.View ref='slide-up' style={{height:this.anim.interpolate({inputRange:[0,1],outputRange:[0,height]})}}/>
            </View>



      )
	}
}
Object.assign(CommentBox.prototype, TimerMixin);

