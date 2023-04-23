class BaseMsg {
  static STATUSES = {
    Success: "Success",
    Failed: "Failed",
  };
  status;
  msg;

  constructor(status, msg) {
    this.status = status;
    this.msg = msg;
  }
}

module.exports = BaseMsg;
