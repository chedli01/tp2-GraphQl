export const Query={
    hello:(parent:any,args:any,context:any,info:any)=> `hello ${args.name}`,
    getCVs:(parent:any,args:any,context:any,info:any)=>{

        return context.db.cvs

    },
    getCV : (parent:any,args:any,context:any,info:any) =>{
        return context.db.cvs.find((cv:any)=>cv.id==args.id)

    }
}