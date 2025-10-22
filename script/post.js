var dir = 1
var scale = 1

checkfun = function(element) {
  if (element.checked) {
    fun()
  } else {
    unfun()
  }
}

fun = function() {
  Object.values(document.querySelectorAll("p,pre")).forEach(function(par) {
    par.style.setProperty("transform", "rotate("+scale*dir+"deg)")
    dir = -1 * dir
    scale = scale - 0.05
  })
};

unfun = function() {
  Object.values(document.querySelectorAll("p,pre")).forEach(function(par) {
    par.style.setProperty("transform", "")
  })
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", fun)
} else {
  fun()
}
