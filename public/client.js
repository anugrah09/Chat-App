let username;
let socket = io();
do{
    username = prompt("Enter your name")
}while(!username)

const textarea = document.querySelector("#textarea")
const submitbtn = document.querySelector("#submitbtn")
const commentbox = document.querySelector(".comment__box")

// submitbtn.addEventListener('click', (e)=>{
//     e.preventDefault();
//     const comment = textarea.value;
//     if(!comment){
//         return ;
//     }
//     postcomment(comment);
// })
function submit(){
    const comment = textarea.value;
    console.log(comment);
    if(!comment){
        return ;
    }
    postcomment(comment);

}
function postcomment(comment){
    //Append
    let data = {
        username: username,
        comment: comment,
        date: Date()
    }
    append(data);
    //Broadcast
    Broadcast(data);
}
function append(data){
    let lTag = document.createElement('li')
    lTag.classList.add('comment', 'mb-3')

    let markup = `
                        <div class="card border-light mb-3">
                            <div class="card-body">
                                <h6>${data.username}</h6>
                                <p>${data.comment}</p>
                                <div>
                                    <img src="/img/clock.png" alt="clock">
                                    <small>${data.date}</small>
                                </div>
                            </div>
                        </div>
    `
    lTag.innerHTML = markup

    commentbox.prepend(lTag)
    textarea.value= "";
}

let typing = document.querySelector('.typing')

function Broadcast(data){
    socket.emit("comment", data);
}
socket.on('comment', (data)=>{
    append(data);
})
let timerid = null;
function debounce(func, timer){
    if(timerid){
        clearTimeout(timerid);
    }
    timerid = setTimeout(() => {
        func();  //func call hoga timer(1000 ms) k baad or usse pehle hi dobara key press kar dega user or 1 sec k baad hi timerid milegi to cleartimeout hoga lekin usse pehle hi user key press kar de ra hai to func run nhi ho paa raha or timerid null hi reh ri hai
    }, timer);
}
textarea.addEventListener('keyup', (e)=>{
    socket.emit('typing', {username: username})
})
socket.on('typing', (username)=>{
    typing.innerText = `${username.username} is typing...`
    debounce(()=>{
        typing.innerText=''
    },1000);
})