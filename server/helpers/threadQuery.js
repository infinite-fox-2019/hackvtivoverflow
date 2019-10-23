module.exports = (query) => {
    let { sort, order, page, limit } = query
    const sortOptions = ['title', 'createdAt', 'updatedAt']
    Number(page) ? page = Number(page) : page = 0
    page < 0 ? page = 0 : page

    sort ? sort : sort = 'updatedAt'
    sortOptions.filter(sort).length ? sort : sort = 'updatedAt'

    Number(order) ? order = Number(order) : order = -1
    Number(order) === 1 || Number(order) === -1 ? order = Number(order) : order = -1

    Number(limit) ? limit = Number(limit) : limit = 10
    return { sort: { [sort]: order }, skip: page * 10, limit }
}