const dragables = document.querySelectorAll(".dragable");
const containers = document.querySelectorAll(".container")

dragables.forEach(dragable=>{
    dragable.addEventListener("dragstart" , ()=>{
       dragable.classList.add("dragging")
    })
    dragable.addEventListener("dragend" ,()=>{
        dragable.classList.remove("dragging")
    })
})

containers.forEach(container=>{
    container.addEventListener("dragover" ,(e)=>{
        e.preventDefault()
        const after = getFunction(container , e.clientY)
        // console.log(after)
        const dragable = document.querySelector(".dragging")
        if (after == null){container.appendChild(dragable)}
        else {container.insertBefore(dragable,after)}
    })
})

function getFunction (container , y ){

const dragableElement =[ ...container.querySelectorAll(".dragable:not(.dragging)")];
    return dragableElement.reduce((closest, child)=>{
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height/2
        // console.log(offset)
        if(offset < 0 && offset> closest.offset ){
            return {offset:offset,element:child}
        }else{
            return closest
        }
    }
    ,{offset:-999999999999999}).element
}