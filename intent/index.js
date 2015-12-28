import {getQuery$} from './getQuery'
import {tagSearchText$} from './tagSearchText'
import {toggleTag$} from './toggleTag'

const intent = () => ({
	getQuery$,
	tagSearchText$,
	toggleTag$
})

export default intent;