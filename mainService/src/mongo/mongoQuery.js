export function getMatchQuery(query){
    const matchQuery = {
        $match : query
    }
    return matchQuery
}

export function getProjectionQuery(projections = [], need){
    const projectionQuery = {};
    for (const projection of projections) {
        projectionQuery[projection] = need
    }
    return projectionQuery
}

export function getProjectionQueryAggregation(projections = [], need){
    const projectionQuery = getProjectionQuery(projections,need)
    return {
        $project : projectionQuery
    }
}