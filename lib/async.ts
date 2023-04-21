export const delay = (delayTime : number) => {
    new Promise((resolve) => {
        setTimeout(() => {
            resolve(1)
        }, delayTime)
    })
}