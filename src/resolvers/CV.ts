export const CV ={
    owner : (parent:any,args:any,context:any,info:any)=>{
        return context.db.users.find((user:any)=>user.id==parent.owner)
    }
}