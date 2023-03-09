import { REACT_ELEMENT_TYPE } from 'shared/ReactSymbols'

import {
	Type,
	Key,
	Ref,
	Props,
	ReactElementType,
	ElementType
} from 'shared/ReactTypes'

const ReactElement = function (
	type: Type,
	key: Key,
	ref: Ref,
	props: Props
): ReactElementType {
	const element = {
		$$typeof: REACT_ELEMENT_TYPE,
		type,
		key,
		ref,
		props,
		__mark: 'fyReact'
	}
	return element
}

export const createElement = (
	type: ElementType,
	config: any,
	...maybeChildren: any
) => {
	let key: Key = null
	let ref: Ref = null
	const props: Props = {}

	for (const prop in config) {
		const val = config[prop]
		if (prop === 'key') {
			if (val) {
				key = '' + val
			}
			continue
		}
		if (prop === 'ref') {
			if (val) {
				ref = val
			}
			continue
		}
		if ({}.hasOwnProperty.call(config, prop)) {
			props[prop] = val
		}

		const maybeChildrenLength = maybeChildren.length
		if (maybeChildrenLength) {
			if (maybeChildrenLength === 1) {
				props.children = maybeChildren[0]
			} else {
				props.children = maybeChildren
			}
		}

		return ReactElement(type, key, ref, props)
	}
}

const jsx = (type: ElementType, config: any, key: Key) => {
	let ref: Ref = null
	const props: Props = {}

	for (const prop in config) {
		const val = config[prop]
		if (prop === 'ref') {
			if (val) {
				ref = val
			}
			continue
		}
		if ({}.hasOwnProperty.call(config, prop)) {
			props[prop] = val
		}

		return ReactElement(type, key, ref, props)
	}
}

export const jsxDEV = jsx
