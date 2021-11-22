const prepareQuery = ({ filters = [], ranges = [], search = '', page = 1, pageLimit = 9 }) => {
    const query = new URLSearchParams();

    query.set('_page', page);
    query.set('_limit', pageLimit);

    if(filters.length > 0) {
        const entries = filters.map(filter => filter.split('='));
        entries.forEach(entry => {
            const [key, value] = entry;
            query.append(key, value);
        });
    }

    if(ranges.length > 0) {
        ranges.forEach(range => {
            const { 
                title,
                selected: {
                    from,
                    to
                }
            } = range;

            const name = title.toLowerCase();
            query.set(`${name}_gte`, from);
            query.set(`${name}_lte`, to);
        })
    }
    
    if(search.length > 0) {
        query.set('q', search.toLowerCase());
    }

    return query;
}

const prepareFilters = (arr, prefix) => {
    return arr.map(item => {
        return {
          value: `${prefix}=` + item.toLowerCase().split(' ').join('_'),
          title: item
        }
    });
}

export {
    prepareQuery,
    prepareFilters
}