class APIFeatures {
    constructor(query, queryString) {
        this.query = query
        this.queryString = queryString

    }
    filter() {

        const queryObj = { ...this.queryString }

        const exclude = ['page', 'limit', 'fields', 'sort']
        exclude.forEach(el => delete queryObj[el])
        let queryString = JSON.stringify(queryObj)
        // console.log(queryString)
        queryString = queryString.replace(/\b(gte|ge|le|lte)\b/g, match => `$${match}`)

        this.query = this.query.find(JSON.parse(queryString))
        return this
    }

    sort() {
        if (this.queryString.sort) {
            let sortBy = this.queryString.sort.split(',').join(' ') /*'name duration price' */
            // console.log(sortBy)
            this.query = this.query.sort(sortBy)

        } else {
            this.query = this.query.sort('-createdAt')

        }
        return this

    }

    limitFields() {
        if (this.queryString.fields) {
            const fields = this.queryString.fields.split(',').join(' ')
            this.query = this.query.select(fields)
        } else {
            this.query = this.query.select('-__v')
        }
        return this
    }
    paginate() {
        const limit = this.queryString.limit * 1 || 100
        const page = this.queryString.page * 1 || 1
        const skip = (page - 1) * limit

        this.query = this.query.skip(skip).limit(limit)
        return this
    }

}

module.exports = APIFeatures