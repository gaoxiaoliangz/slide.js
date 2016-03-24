const Util = (() => {

  let Util = {

    isIE(ver){
      var b = document.createElement('b')
      b.innerHTML = '<!--[if IE ' + ver + ']><i></i><![endif]-->'
      return b.getElementsByTagName('i').length === 1
    },

    lockScroll(){
      document.body.style.overflow = "hidden"
    },

    unlockScroll(){
      document.body.style.overflow = "auto"
    }
  }

  return Util
})()

export default Util
