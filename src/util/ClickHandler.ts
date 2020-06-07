export const getTargetPath = (url: string) => {
    return new URL(url).pathname.replace('/api', '');
}

export const goHome = (history: any) => {
    history.push('/');
}

export const goError = (history: any) => {
    history.push('/error');
}