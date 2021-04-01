module.exports = app => {

    const errorFilter = (values, error, callback) => {

        values.forEach(value => {
            if (callback(value)) {
                throw error;
            }
        });

    };

    const exists = (value) => 
        (!value) ||
        (typeof value === 'string' && value.trim().length < 1) ||
        (Array.isArray(value) && value.length < 1);

    return { errorFilter, exists };

}