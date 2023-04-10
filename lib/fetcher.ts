interface fetchParams{
    url: string,
    method: string,
    body: any
    isJson?: boolean
}

export const fetcher = async ({url, method, body, isJson = true}: fetchParams) => {
    const response =  await fetch(url,{
        method,
        headers: {
            Accept: 'application/json',
            'Content-Type':'Application/json'
        },
        ...(body && {body}),
    })
    if(!response.ok){
        throw new Error('API fetch error')
    }

    if(isJson){
        const data = await response.json()
        return data.data
    }
}

export const register = (user: any) =>{
    return fetcher({ url: '/api/register', method: 'post', body: user, isJson: true})
}

export const signIn = (user: any) =>{
    return fetcher({ url: '/api/signin', method: 'post', body: user, isJson: true})
}