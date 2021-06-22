const KEYS={
    users:'users',
    userId:'userId'
}

export const getUserType=()=>([
    {id:'1',title:'Admin'},
    {id:'2',title:'Manager'},
    {id:'3',title:'Assistant'}
])

export function insertUser(data){
    let users=getALLUsers();
    data['id']=generateUserId();
    users.push(data);
    localStorage.setItem(KEYS.users,JSON.stringify(users))
}

export function generateUserId(){
    if(localStorage.getItem(KEYS.usersId)==null){
       localStorage.setItem(KEYS.userId,'0')
    }
    var id=parseInt(localStorage.getItem(KEYS.userId))
    localStorage.setItem(KEYS.userId,(++id).toString())
    return id;   
}

export function getALLUsers(){
    if(localStorage.getItem(KEYS.users)==null){
         localStorage.setItem(KEYS.users,JSON.stringify([]))
    }
    return JSON.parse(localStorage.getItem(KEYS.users));
    
    // let userTypes=getUserType();
    // return users.map(x=>({
    //     ...x,
    //     userType: userTypes[x.userType-1].title
    // }))
}