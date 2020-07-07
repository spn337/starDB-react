const compose = (...funcs) => (comp) => {
    return funcs.reduceRight(
        (pervResult, f) => f(pervResult), comp);
};

export default compose;