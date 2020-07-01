module.exports = {
  sendEmail: function (object_name, record_id) {
    $("body").addClass("loading");
    var userSession = Creator.USER_CONTEXT;
    var authorization = "Bearer " + userSession.spaceId + "," + userSession.user.authToken;
    $.ajax({
      type: "POST",
      url: Meteor.absoluteUrl("/api/odata/v4/" + userSession.spaceId + "/accounts/" + record_id + "/sendEmail"),
      data: JSON.stringify({}),
      dataType: "json",
      contentType: 'application/json',
      beforeSend: function (XHR) {
        XHR.setRequestHeader('Content-Type', 'application/json');
        XHR.setRequestHeader('Authorization', authorization);
      },
      success: function (data) {
        $("body").removeClass("loading");
        toastr.success("已发送邮件！");
      },
      error: function (XMLHttpRequest, textStatus, errorThrown) {
        $("body").removeClass("loading");
        toastr.error("发送邮件失败："+ errorThrown);
      }
    });
  },

  sendEmailVisible: function (object_name, record_id, record_permissions) {
    return true;
    // var email = Creator.getObjectRecord(object_name, record_id).email;
    // if (!email) {
    //   return false;
    // } 
    // return true;
  }
}