let step_ls=[]
let pointer=0

function Step(a,b){
    this.a=a
    this.b=b
}

function move(a, b) {
	step_ls.push(new Step(a,b))
}

function hanoi(n,a,b,c,d){ // 将n个圆盘从a借助c和d移动到b上
    if (n >= 2) {
        hanoi(n-2,a,d,b,c)
		move(a,c);
		move(a,b);
        move(c,b);
        hanoi(n-2, d, b, a, c)
	}else if(n==1){
        move(a, b);
    }
}

function initiateGame(level){
    // 清空盘子
    let plates=document.querySelectorAll('.plate')
    for(let i=0;i<plates.length;i++){
        plates[i].parentElement.removeChild(plates[i])
    }
    // 初始化变量
    step_ls=[]
    pointer=0
    document.querySelector('.counter span').innerHTML=pointer

    let first_tower=document.querySelectorAll('.tower')[0]
    hanoi(level,1,2,3,4);

    for(let i=1;i<=level;i++){
        first_tower.appendChild(createPlate(i))
    }
}

function createPlate(i){
    let newplate=document.createElement('div')
    newplate.setAttribute(`class`, `plate p${i}`)
    return newplate
}

document.querySelector('#next').addEventListener('click', function(){
    if(pointer>= step_ls.length){
        vm.$message.error('已经到达最后一步')
        return
    }
    let step=step_ls[pointer++]
    let towers=document.querySelectorAll('.tower')
    let source_tower=towers[step.a-1]
    let des_tower=towers[step.b-1]
    applyChange(source_tower,des_tower)
})

document.querySelector('#pre').addEventListener('click', function(){
    if(pointer==0){
        vm.$message.error('已经到达第一步')
        return
    }
    let step=step_ls[--pointer]
    let towers=document.querySelectorAll('.tower')
    let source_tower=towers[step.b-1]
    let des_tower=towers[step.a-1]
    applyChange(source_tower,des_tower)
})

function applyChange(source_tower,des_tower){
    try{
        let plate=source_tower.querySelectorAll('.plate')[0]
        source_tower.removeChild(plate)
        des_tower.prepend(plate)
        document.querySelector('.counter span').innerHTML=pointer
    }catch{
        vm.$message.error('移动错误')
    }
}