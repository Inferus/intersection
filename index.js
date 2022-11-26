const postsList = document.querySelector('.posts')
let loading = false
let newPosts = []
// "userId": 1,
//   "id": 1,
//   "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
//   "body":
let loadedPosts = 0
async function loadmorePosts(){
    if (loadedPosts > 96) return
    loading = true
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
    
    const preveousLast = document.querySelector('.lastPost')
    if (preveousLast) postObserver.unobserve(preveousLast)
  newPosts.forEach((post,i)=>{
    const postElement = document.createElement('div')
    const postTitle = document.createElement('h1')
    const postBody = document.createElement('p')
    postTitle.innerText = post.title
    postBody.innerText = post.body
    postElement.append(postTitle,postBody)
    postElement.classList.add('post')
    postsList.append(postElement)
    postsList.childNodes.forEach(e=> e.classList?.remove('lastPost'))
    if (i === newPosts.length-1){
        console.log(postsList.childNodes)
        
        postElement.classList.add('lastPost')
        const lastPost = document.querySelector('.lastPost')
        postObserver.observe(lastPost)
    }
   })
   loading = false
}

loadmorePosts()

const loader = document.createElement('h1')
loader.classList.add('loader')
const postObserver = new IntersectionObserver((obs)=>{
    obs.forEach((e)=>{
       if (e.isIntersecting) loadmorePosts()
       if (loading){
        loader.innerText = 'Loading posts...'
        postsList.append(loader)}
    })
        if (!loading && postsList.contains(loader)){
            postsList.removeChild(loader)
            
        }
},{
    threshold:0.5
})


