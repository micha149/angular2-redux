/**
 * Wrapper for app store
 */
export class AppStore {

    /**
     * Get current state
     */
    public getState:()=>any;
    /**
     * subscribe to a callback with the state
     */
    public subscribe:(subscribeFunction:(state)=>void)=>()=>void;
    /**
     * Dispatch an action
     */
    public dispatch:(action)=>void;
    /**
     * Create a dispatcher as a curried function using the passed in action creator and an optional context
     */
    public createDispatcher:(actionCreator, context)=>(...n:any[])=>void;

    constructor(store:any) {
        this.getState = () => {
            return store.getState();
        };
        this.subscribe = (subscriber:(state)=>any) => {
            // decorate the subscriber with the state passed in as a parameter
            return store.subscribe(() => subscriber(store.getState()));
        };
        this.dispatch = (action) => {
            return store.dispatch(action);
        };
        this.createDispatcher = (actionCreator, context):(...n:any[])=>void => {
            return (...args) => store.dispatch(actionCreator.call(context, ...args));
        };
    }


}
