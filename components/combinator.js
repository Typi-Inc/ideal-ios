import React from 'react-native';
import _ from 'lodash';
import combineTemplate from './combineTemplate';
import shallowEqual from './shallowEqual'
let {LayoutAnimation}=React
class Combinator extends React.Component {
  constructor(props, context) {
    super(props, context);
    // Keep track of whether the component has mounted
    this.componentHasMounted = false;
    // Subscribe to child prop changes so we know when to re-render
    if (props.children.subscribe) {
      this.subscription = props.children.subscribe(
        children => {
          // LayoutAnimation.easeInEaseOut()
          !this.componentHasMounted
            ? this.state = children
            : this.setState(children)
        }
      )
    } else {
      this.subscription = combineTemplate(props.children).subscribe(
        children => {
          // LayoutAnimation.easeInEaseOut()
          !this.componentHasMounted
            ? this.state = children
            : this.setState(children)
        }
      );      
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    return !shallowEqual(this.props, nextProps) ||
         !shallowEqual(this.state, nextState);
  }
  componentDidMount() {
    this.componentHasMounted = true;
  }
  componentWillUnmount() {
    // Clean-up subscription before un-mounting
    this.subscription.dispose();
  }
  render() {
    if (this.props.me === 'deals') {
      // console.log('rerendering')
    }
    return this.state;
  }
}

export default Combinator;