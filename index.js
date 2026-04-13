let title = document.getElementById('input')
let price = document.getElementById('price')
let taxes = document.getElementById('taxes')
let ads = document.getElementById('ads')
let discount = document.getElementById('discount')
let count = document.getElementById('count')
let category = document.getElementById('category')
let total = document.getElementById('total')
let create = document.getElementById('button-one')
let deleteall = document.getElementById('delete')
let time = document.getElementById('time')
let allbought = document.getElementById('allpricebought')
let search = document.getElementById('search')
let moodsearch='title'
// console.log(search)
let moodupdate='create'
onload=function(){
    total.innerHTML=''
}
function onwriteinputs(){
    if(price.value !=''){
      var result = (Number(price.value) + Number(ads.value) + Number(taxes.value)) /* (Number(discount.value || 0))*/
      result /= +discount.value || 1
      console.log(result);
        total.innerHTML= +result
        total.style.backgroundColor='green'
    }
    else{
        total.style.backgroundColor='red'
        total.textContent=''
    }  
}
let data =[]
if(localStorage.project != ''){
    
    try{
        data = JSON.parse(localStorage.project)
    }
    catch(e){
        console.log('sorry'+e)
    }
}
else{
    data = []
}
create.addEventListener('click',function(){
    let object = {
        title:title.value,
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        total:total.textContent,
        discount:discount.value,
        count:count.value,
        category:category.value,
        time:time.value,
    }
    if(title.value !='' && price.value != '')
    {
        if(moodupdate==='create'){
         if(count.value > 1){
             for(let i = 0 ;i<count.value;i++){
                 data.push(object)
                 localStorage.project=JSON.stringify(data)
             }
         }else{data.push(object)
             localStorage.project=JSON.stringify(data)
             console.log(data);
         }
         profist()
         ;cleaninputsdata()
        
        }else{
            data[upd]=object;
            moodupdate='create'
            create.textContent='create'
            cleaninputsdata()
            count.style.display='block'
            time.style.display='block'
            profist()
            readData()
        }
    }
readData()
// allpricebought()
    
})
function cleaninputsdata(){
    title.value=''
    count.value=''
    total.textContent=''
    taxes.value=''
    discount.value=''
    ads.value=''
    category.value=''
    price.value=''
    total.style.backgroundColor='red'
    time.value=''
    
}
function readData(){
    let a = ''
        for(let i =0 ; i< data.length ; i++){
            a +=`
             <tr>
                    <td>${i + 1}</td>
                    <td>${data[i].title}</td>
                    <td>${data[i].price}</td>
                    <td>${data[i].taxes}</td>
                    <td>${data[i].ads}</td>
                    <td>${data[i].discount}</td>
                    <td>${data[i].time}</td>
                    <td>${data[i].total}</td>
                    <td>${data[i].category}</td>
                    <td><button onclick="updatedatainputs(${i})">update</button></td>
                    <td><button onclick="deleteindex(${i})">buy</button></td>
               </tr>      
            `              
        }
        if(data.length >0){
            deleteall.style.display='block'
            deleteall.onclick=deleteALL
            allbought.style.backgroundColor='green'
       }else{
            deleteall.style.display='none'
            allbought.style.backgroundColor='red'


        }
document.getElementById('tbody').innerHTML=a   
}
readData()
function deleteindex(i){
    data.splice(i,1)
    localStorage.project=JSON.stringify(data)
    console.log(i);
  profist()
    readData()
}
function deleteALL(){
    data.splice(0)
    localStorage.clear()
    readData()
    allbought.innerText=''
}
function updatedatainputs(i){
    console.log(i);
    title.value=data[i].title
    price.value=data[i].price
    taxes.value=data[i].taxes
    ads.value=data[i].ads
    discount.value=data[i].discount
    category.value=data[i].category
    create.textContent='update'
    onwriteinputs()
   
    moodupdate='update'
    console.log(moodupdate);
    upd =i
    count.style.display='none'
    time.style.display='none'
    scroll({
        top:0,
        behavior:'smooth'
    })
   
   
    
   
    
}
function moodsearchdata(id){
    if(id === 'title'){
        moodsearch='title'
        console.log('mah')
    }
    else{
        moodsearch='category'
        console.log('mahamoud')
    }
    search.focus()
    search.placeholder=`search by ${id}`
}
function searchdata(value){
    console.log(value)
    let a=''
    if(moodsearch === 'title'){
        for(let i =  0;i<data.length;i++){
            if(data[i].title.includes(value.toLowerCase())){
                a+=` <tr>
                    <td>${i + 1}</td>
                    <td>${data[i].title}</td>
                    <td>${data[i].price}</td>
                    <td>${data[i].taxes}</td>
                    <td>${data[i].ads}</td>
                    <td>${data[i].discount}</td>
                    <td>${data[i].time}</td>
                    <td>${data[i].total}</td>
                    <td>${data[i].category}</td>
                    <td><button onclick="updatedatainputs(${i})">update</button></td>
                    <td><button onclick="deleteindex(${i})">buy</button></td>
               </tr> `
            }
        }
    }
    else{
        for(let i =  0;i<data.length;i++){
            if(data[i].category.includes(value.toLowerCase())){
                a+=` <tr>
                    <td>${i + 1}</td>
                    <td>${data[i].title}</td>
                    <td>${data[i].price}</td>
                    <td>${data[i].taxes}</td>
                    <td>${data[i].ads}</td>
                    <td>${data[i].discount}</td>
                    <td>${data[i].time}</td>
                    <td>${data[i].total}</td>
                    <td>${data[i].category}</td>
                    <td><button onclick="updatedatainputs(${i})">update</button></td>
                    <td><button onclick="deleteindex(${i})">buy</button></td>
               </tr> `

            }
        }
    }
   document.getElementById('tbody').innerHTML=a    
}
function profist(){
    let sum = 0
    for(let i = 0;i<data.length;i++){
        sum +=Number(data[i].total)    
    }
    allbought.textContent = sum;
    allbought.style.backgroundColor='green'
}


