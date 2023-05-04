class BaseMsg {
  static STATUSES = {
    Success: "Success",
    Failed: "Failed",
  };
  status;
  msg;

  constructor(status, msg, admin) {
    this.status = status;
    this.msg = msg;
    this.admin = admin;
  }
}

module.exports = BaseMsg;
