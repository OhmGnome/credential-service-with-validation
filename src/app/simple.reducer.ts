import { Action } from '@ngrx/store'

export function simpleReducer(state: string, action: Action) {
    console.log(action.type, state)

    switch (action.type) {
        case 'authorized': {
            return state = 'Welcome '
        }
        case 'unauthorized': {
            return state = 'Login '
        }
        default: {
            return state = 'Please login '
        }
    }

}