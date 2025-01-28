const myObserver = new IntersectionObserver( (infos) => {
    infos.forEach((info) =>{
        if(info.isIntersecting){
            info.target.classList.remove('hidden')
            info.target.classList.add('show')
        } else {
            info.target.classList.remove('show')
            info.target.classList.add('hidden')
        }
    })
})

const elements = document.querySelectorAll('.hidden')

elements.forEach((element) => myObserver.observe(element))