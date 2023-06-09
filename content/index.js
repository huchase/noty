// 想用这个 content 的样式，只引用 css 就可以了

export default
function CreateContent() {
  return {
    info: createShow('info'),
    success: createShow('success'),
    warn: createShow('warn'),
    error: createShow('error'),
    loading: createShow('loading', {
      duration: 0
    })
  }
}

function createShow(className, defaults) {
  return function(text, options = {}) {
    if(defaults)
      Object.assign(options, defaults)
    if(options.duration != void 0)
      this.duration = options.duration
    this.onClose = options.onClose
    
    const div = Div('', // content 部分再包一层，避免之上的样式影响动画效果
      `<div class='chase-noty-item1 chase-noty-item1-${className}'>
        <i class='chase-noty-icon chase-noty-icon-${className}'></i>
        <span class='text'></span>
      </div>`
    )
    div.querySelector('.text').append(text) // 使用 append 方法，省去 escape 操作
    const btn = Div('close-btn', 'x')
    btn.onclick = this.close
    div.querySelector('.chase-noty-item1').prepend(btn)
    if(options.closeBtn)
      btn.style.opacity = .5
    return div
  }
}

function Div(className, innerHTML) {
  const div = document.createElement('div')
  div.className = className
  div.innerHTML = innerHTML
  return div
}