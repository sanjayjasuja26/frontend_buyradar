var $ = {};
var divPos = {
  left: 0,
  top: 0,
};
var offset = $("#loader").offset();
$(document).mousemove(function (e) {
  divPos = {
    left: e.pageX - offset.left,
    top: e.pageY - offset.top,
  };
  console.log("x:" + divPos.left + " y: " + divPos.top);
});

var Zoom = function (imageZoom) {
  this.urlImage = imageZoom;
  this.img = undefined;
  this.$img = undefined;

  this.init = function () {
    this.loaders("on");
    this.calcs();
  };
  this.calcs = function () {
    var self = this;
    this.img = new Image();
    this.img.onload = function () {
      self.build();
    };
    this.img.src = this.urlImage;
  };
  this.loaders = function (status) {
    switch (status) {
      case "on":
        $("#loader").fadeIn(200);
        break;
      case "off":
        $("#loader").fadeOut(200);
        break;
    }
  };
  this.build = function () {
    var self = this;
    this.$img = $(self.img);

    $("#zoom").fadeIn(200).append(this.$img);

    this.$img.on("mousedown", function (e) {
      e.preventDefault();
    });

    // this is the problematic function
    $("body").on("mousemove", function (e) {
      e.preventDefault();

      var width = $(self.img).width();
      var height = $(self.img).height();
      // img center calculation
      var imgCenterX = width / 2;
      var imgCenterY = height / 2;
      // translate calculation
      var tx = imgCenterX - divPos.left;
      var ty = imgCenterY - divPos.top;

      // clip calculation
      var c0 = divPos.top / 2;
      var c1 = divPos.left / 2 + width / 2;
      var c2 = divPos.top / 2 + height / 2;
      var c3 = divPos.left / 2;

      console.log(c0 + "," + c1 + "," + c2 + "," + c3);

      var t = "translate(" + tx + "px, " + ty + "px)";
      var c = "rect(" + c0 + "px," + c1 + "px," + c2 + "px," + c3 + "px)";
      self.$img.css({
        transform: t + " scale(2,2)",
      });
      self.$img.css({
        clip: c,
      });
    });
    self.loaders("off");
  };
};

var zoom = new Zoom(
  "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-pro-11-select-wifi-spacegray-202104?wid=940&hei=1112&fmt=p-jpg&qlt=95"
);
zoom.init();



$(".img_producto_container")
  // tile mouse actions
  .on("mouseover", function () {
    $(this)
      .children(".img_producto")
      .css({ transform: "scale(" + $(this).attr("data-scale") + ")" });
  })
  .on("mouseout", function () {
    $(this).children(".img_producto").css({ transform: "scale(1)" });
  })
  .on("mousemove", function (e) {
    $(this)
      .children(".img_producto")
      .css({
        "transform-origin":
          ((e.pageX - $(this).offset().left) / $(this).width()) * 100 +
          "% " +
          ((e.pageY - $(this).offset().top) / $(this).height()) * 100 +
          "%"
      });
  });
