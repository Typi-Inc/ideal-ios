import React from 'react-native'
let {LayoutAnimation}=React
export let openAnimation={duration: 500,
		    create: {
		      type: LayoutAnimation.Types.easeOut,
		      property: LayoutAnimation.Properties.opacity,
		    },
		    update: {
		      type: LayoutAnimation.Types.spring,
		      springDamping:1,
		    }
		}

export let scrollToTopAnimation={duration: 300,
    create: {
      type: LayoutAnimation.Types.easeInEaseOut,
      property: LayoutAnimation.Properties.scaleXY,
    },
    update: {
      type: LayoutAnimation.Types.spring,
      springDamping:1,
    }
}

export let closeImageAnimation={duration: 300,
    create: {
      type: LayoutAnimation.Types.easeInEaseOut,
      property: LayoutAnimation.Properties.opacity,
    },
    update: {
      type: LayoutAnimation.Types.spring,
      springDamping:1,
    }
}

export let spring1={tension:80,friction:12}
export let spring2={tension:10,friction:6}