import { createStore, Store } from 'redux'

const initialState = {
    sidebarShow: true,
}

const changeState = (state: any = initialState, { type, ...rest }: { type: string }) => {
    switch (type) {
        case 'set':
            return { ...state, ...rest }
        case 'SESSION':
            return { ...state, ...rest }
        default:
            return state
    }
}

const store: Store = createStore(changeState)
export default store
