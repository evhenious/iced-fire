export const getTargetPath = (url: string) => {
    return new URL(url).pathname.replace('/api', '');
}
