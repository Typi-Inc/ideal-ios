import React from 'react-native'
import TimerMixin from 'react-timer-mixin'
import {openAnimation,spring1,spring2,scrollToTopAnimation,closeImageAnimation} from './animations'
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
              style={{height:Math.max(55*k, (10*k+this.state.height)),borderWidth:1,flexDirection:'row',...center,
                borderColor:'#e4e4e4',width:320*k,marginBottom:bottom}}>
                  <TextInput
                    ref='text-input'
                    style={{height: Math.max(40*k, this.state.height),borderRadius:3*k,backgroundColor:'white',fontSize:15*k, borderColor: '#d3d3d3', borderWidth: 1,marginTop:6*k,width:250*k,paddingLeft:10*k}}
                    // onChangeText={(text) => this.setState({text})}
                    value={this.state.text}
                    onChange={(event) => {
                      console.log(event.nativeEvent)
                        this.setState({
                          text: event.nativeEvent.text,
                          height: event.nativeEvent.contentSize.height,
                        });
                      }}
                    clearButtonMode={'while-editing'}
                    multiline={true}
                    placeholder={'Написать комментарий'}
                  />
                  <TouchableOpacity>
                    <View style={{backgroundColor:'0084b4',borderRadius:3*k,height:39*k,width:45*k,marginLeft:8*k,marginBottom:2*k,...center}}>
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

