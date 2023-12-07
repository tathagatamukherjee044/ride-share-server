

export function sendSuccessResult(res , data , req ) {
    const responseData = {
        code: 200,
        data,
        message: 'SUCCESS',
        success: true
    }
    return res.status(200).json(responseData)
}

export function sendInvalidResult (res , data , req ) {
    const responseData = {
        code: 200,
        message: data.message,
        msgCode: data.msgCode || '',
        success: false
    }
    return res.status(200).json( responseData)
}

