export function swDev(params) {
    const swUrl = `${process.env.PUBLIC_URL}/sw.js`;
    navigator.serviceWorker.register(swUrl)
        .then(res=>{
            console.log("res : ", res);
        }).catch(err=>console.log(err));
}