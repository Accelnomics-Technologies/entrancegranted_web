class CustomError {
  constructor(error, errorAPI = "", errorCode = 500) {
    this.errorType = errorCode === 500 ? `Server Error` : `Client Error`;
    this.errorMsg = `${this.errorType}:${error}`;
    this.errorCode = errorCode;
    this.errorAPI = errorAPI?.trim();
    this.error = error;
  }

  setErrorMsg() {
    try {
      if (this.error?.isjoi) {
        this.errorCode = 422;
        this.errorMsg = `Joi ${this.error} => Passed Data: ${JSON.stringify(
          this.error?._original
        )}`;
      }
    } catch (error) {
      this.errorCode = 500;
      this.errorMsg = `UnExpected Server Error: ${error}`;
    }
  }
  async handleError() {
    this.setErrorMsg();
    return {
      errorMsg: this.errorMsg?.toString(),
      errorCode: this.errorCode?.toString(),
    };
  }
}

module.exports.responseHandler = (res, message = "Success", data = null) => {
  res.status(200).json({ message, data });
};

module.exports.errorHandler = async (res, error = "", errorCode = 400) => {
  const errorObj = new CustomError(error, "NA", errorCode);
  const { errorMsg } = await errorObj.handleError();

  return res.status(Number(errorCode)).json({
    error: errorMsg,
  });
};

module.exports.catchHandler = async (res, req, error = "") => {
  const errorAPI = `${req.method}: ${req.originalUrl} ${
    req?.decoded?.user_id ? `(${req?.decoded?.user_id})` : ""
  }`;
  const errorObj = new CustomError(error, errorAPI, 500);
  const { errorMsg, errorCode } = await errorObj.handleError();

  return res.status(Number(errorCode)).json({
    error: errorMsg,
    errorAPI,
  });
};
