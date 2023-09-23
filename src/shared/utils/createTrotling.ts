export function createTrotling( ms: number ){
    let idTimeout: any = null;
    let lastTime = Date.now();

    return ( callback: ()=>void )=> {
        const now = Date.now();
        const delta = now - lastTime;

        const activate = ()=>{
            lastTime = Date.now();
            callback();
        }

        if ( idTimeout !== null ) clearTimeout( idTimeout );
        if ( delta > ms ) return activate();

        const time = ms - delta;
        idTimeout = setTimeout( activate, time );
    }
}