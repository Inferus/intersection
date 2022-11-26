const postsList = document.querySelector('.posts')

let newPosts = []
// "userId": 1,
//   "id": 1,
//   "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
//   "body":
let loadedPosts = 0
async function loadmorePosts(){
    if (loadedPosts > 96) return
    for (let i = loadedPosts + 1; i<loadedPosts+4; i++){
       await fetch(`https://jsonplaceholder.typicode.com/posts/${i}`)
        .then(response => response.json())
        .then(data => newPosts.push(data))
    }
    loadedPosts+= 3

    makeNodesFromPosts()
    newPosts = []
   
}
function makeNodesFromPosts(){

  newPosts.forEach((post,i)=>{
    const postElement = document.createElement('div')
    const postTitle = document.createElement('h1')
    const postBody = document.createElement('p')
    postTitle.innerText = post.title
    postBody.innerText = post.body
    postElement.append(postTitle,postBody)
    postElement.classList.add('post')
    postsList.append(postElement)
    if (i === newPosts.length-1){
        console.log(postsList.childNodes)
        postsList.childNodes.forEach(e=> e.classList?.remove('lastPost'))
        postElement.classList.add('lastPost')
        const lastPost = document.querySelector('.lastPost')
        postObserver.observe(lastPost)
    }
   })
}

loadmorePosts()

const postObserver = new IntersectionObserver((obs)=>{
    obs.forEach((e)=>{
       if (e.isIntersecting) loadmorePosts()
    })
},{
    threshold:1
})


