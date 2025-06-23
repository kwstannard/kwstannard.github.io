var dir = 1
var scale = 1
fun = function() {
  Object.values(document.getElementsByTagName("p")).forEach(function(par) {
    par.style.setProperty("transform", "rotate("+scale*dir+"deg)")
    dir = -1 * dir
    scale = scale - 0.05
  })
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", fun)
} else {
  fun()
}
