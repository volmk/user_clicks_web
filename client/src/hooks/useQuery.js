function useQuery(search, name, defaultValue) {
    return new URLSearchParams(search).get(name) || defaultValue;
}

export default useQuery