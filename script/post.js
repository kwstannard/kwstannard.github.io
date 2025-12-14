var dir = 1
var scale = 0.75

checkfun = function() {
  element = document.getElementById("fun")
  scale = 0.75
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
